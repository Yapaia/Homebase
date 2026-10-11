---
titel: Architektur
kurz: Wie Yapaia aufgebaut ist – und warum genau so. Die wichtigsten Entscheidungen mit Begründung.
reihenfolge: 1
---

## Das Gesamtbild

```
┌──────────────────────── Rechner im Fahrzeug (Home Assistant OS) ────────────────────────┐
│                                                                                         │
│   ┌──────────── Add-on Yapaia Go ────────────┐    ┌────── Add-on Yapaia Beat ──────┐    │
│   │ Core (Node.js/Fastify, SQLite)           │    │ Radio-Dienst + Web-Oberfläche  │    │
│   │  ├─ Valhalla   (Routing)                 │    │  ├─ redsea  (UKW, RDS)         │    │
│   │  ├─ Photon / Lite-Index (Adresssuche)    │    │  └─ welle.io (DAB+)            │    │
│   │  ├─ PMTiles    (Vektorkarten)            │    └───────────────┬────────────────┘    │
│   │  └─ gpsd       (USB-GPS)                 │                    │                     │
│   │ Web-App (React, MapLibre) im Browser     │                    │                     │
│   └───────────────────┬──────────────────────┘                    │                     │
│                       │  Yapaia-Protokoll v1 (HTTP + WebSocket, Token)                  │
│                       ▼                                           ▼                     │
│   ┌──────────────────── Integration „Yapaia“ in Home Assistant ─────────────────────┐   │
│   │  Geräte · Entitäten · Aktionen · Auslöser · Partnerliste                        │   │
│   │  Router-Modul (JSON-RPC zum GL.iNet) · erkennt ESPHome-Satelliten               │   │
│   └─────────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
        ▲ Browser (Tablet, Handy)        ▲ USB: GPS, SDR        ▲ LAN: GL.iNet-Router, Satelliten
```

## Grundsätze

1. **Jedes Modul ist eigenständig.** Go läuft ohne Beat, Beat ohne Go. Ist ein Partner da, wird er genutzt; fehlt er, fällt nur die gemeinsame Funktion weg.
2. **Module sprechen über dokumentierte Schnittstellen**, nie über die Interna eines anderen Moduls.
3. **Eine Zentrale.** Alles, was Home Assistant sehen soll, läuft über die Integration „Yapaia“ – nicht über geschriebene Zustände, MQTT-Konventionen oder Helfer.
4. **Offline ist kein Modus, sondern die Annahme.** Nichts darf unterwegs auf das Internet warten.

## Entscheidungen und warum

### Home-Assistant-Add-ons statt eigener Box

Viele Camper haben bereits einen Home-Assistant-Rechner für Batterie, Tanks und Licht. Ein Add-on nutzt diese Hardware mit, bekommt Updates, Backups und Anmeldung von Home Assistant geschenkt und braucht kein Terminal. Der Preis: Yapaia teilt sich RAM und CPU mit Home Assistant – deshalb sind die [Anforderungen](/de/docs/technik/anforderungen/) so genau angegeben.

### Valhalla für das Routing

Valhalla berücksichtigt Fahrzeugmaße (Höhe, Breite, Länge, Gewicht) **zur Laufzeit** – mehrere Fahrzeugprofile brauchen keinen eigenen Graphen. Es rechnet auf einem kompakten Kachelgraphen (ein Land: rund 1–1,5 GB RAM) und liefert Abbiegehinweise und Tempolimits entlang der Route gleich mit. Engines wie OSRM legen das Profil schon bei der Vorverarbeitung fest.

### PMTiles für die Karte

Eine einzige Datei je Region, ausgeliefert per HTTP-Range-Request direkt vom Core. Kein Kachelserver, keine Datenbank, Update = Datei tauschen. Gezeichnet wird im Browser mit **MapLibre GL** (WebGL), damit Karten im Fahrmodus drehen und kippen können.

### Zwei Wege zur Adresssuche

**Photon** findet Hausnummern und verzeiht Tippfehler, braucht aber eine Java-VM mit rund 1 GB. Für knappe Rechner gibt es einen eingebauten **Lite-Index** (SQLite), der Orte und Straßen findet und wenig Speicher braucht. Beides wird aus denselben OSM-Daten gebaut.

### Ein eigenes Protokoll statt MQTT

MQTT-Discovery erzeugt Entitäten, aber keine echten Geräte mit Aktionen, Auslösern und Rückgabewerten. Das [Yapaia-Protokoll](/de/docs/technik/protokoll/) lässt Module sich **selbst beschreiben**; die Integration baut daraus Geräte, Entitäten, Aktionen und Geräte-Auslöser. Neue Funktionen eines Moduls brauchen keinen neuen Integrationscode. MQTT bleibt bei Go als zusätzliche Option.

### Fähigkeiten statt Modulnamen

Module nutzen einander nur über **gemeldete Fähigkeiten** (z. B. `ansage.einmischen`), nie anhand des Namens. So kann morgen ein anderes Modul dieselbe Fähigkeit anbieten, ohne dass Go geändert werden muss. Siehe [Fähigkeiten](/de/docs/technik/faehigkeiten/).

### Satelliten bleiben ESPHome

ESPHome ist in Home Assistant der etablierte Weg für Mikrofone und Lautsprecher auf Mikrocontrollern. Statt ein eigenes Protokoll in die Firmware zu bauen, erkennt die Integration Satelliten an ihrer **Projektkennung** `yapaia.satellite` und meldet sie den anderen Modulen als Partner.

### Der Router ohne Add-on

Der GL.iNet-Router hat bereits eine lokale JSON-RPC-Schnittstelle. Ein zusätzliches Add-on wäre nur ein Übersetzer. Deshalb spricht die Integration selbst mit dem Router und stellt ihn wie jedes andere Modul dar.

### Kartenpakete vom Server

Das Bauen von Routinggraph und Suchindex für ein großes Land braucht Stunden und viel RAM – auf dem Rechner im Fahrzeug, den man eigentlich für anderes braucht. Ein Kartenserver baut dieselben Dateien mit denselben Werkzeugen vor. Go lädt sie, prüft jede per **SHA-256** und wechselt erst ein, wenn alles vollständig ist. Das Routing-Archiv wird nur mit erlaubten Pfaden entpackt.

## Sicherheit

- Die Protokoll-Schnittstelle `/yapaia/v1/*` verlangt immer ein **Bearer-Token**, das das Add-on beim ersten Start zufällig erzeugt (32 Byte).
- Die Oberflächen laufen über **Home-Assistant-Ingress** – es gilt die Anmeldung von Home Assistant.
- Kein Modul telefoniert nach Hause. Go hat einen Test, der während der Navigation **null fremde Netzwerkanfragen** verlangt.
