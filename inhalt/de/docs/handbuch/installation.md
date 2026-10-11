---
titel: Installation
kurz: Was du brauchst und wie Yapaia in dein Home Assistant kommt – Schritt für Schritt, ohne Terminal.
reihenfolge: 1
---

## Das brauchst du

| Was | Wofür | Hinweis |
| --- | --- | --- |
| Rechner mit **Home Assistant OS** | alles | Ein N100-Mini-PC mit **8 GB RAM** und 128 GB SSD ist ideal. x86-64 oder ARM64. |
| **USB-GPS-Empfänger** | Yapaia Go | Ein günstiger u-blox-Empfänger reicht. Alternativ: das GPS deines Handys über die Home-Assistant-App. |
| **RTL-SDR-Stick** + Antenne für UKW und DAB | Yapaia Beat | z. B. RTL-SDR Blog V3/V4. Im Camper ideal: aktive Dachantenne. |
| **GL.iNet GL-X3000** | Yapaia Router | Firmware 4.x, mit zwei SIM-Karten. |
| **ESP32 Audio Kit V2.2 (A436)** + Lautsprecher | Yapaia Satellite | Platine mit Codec ES8388. |
| Internet | nur einmal | zum Installieren und für Karten. Unterwegs geht alles offline. |

Du brauchst **nicht** alles. Jedes Modul läuft für sich – nimm nur, was du willst.

## 1. Den Yapaia-Store hinzufügen

1. Home Assistant öffnen → **Einstellungen → Add-ons → Add-on-Store**.
2. Oben rechts **⋮ → Repositories**.
3. `https://github.com/Yapaia/yapaia` eintragen → **Hinzufügen**.
4. Fenster schließen, Seite neu laden. Ganz unten erscheint der Abschnitt **Yapaia**.

> Tipp: Schalte vorher unter deinem Profil (unten links) den **Erweiterten Modus** ein. Sonst zeigt Home Assistant manche Menüs nicht.

## 2. Module installieren

1. Im Store ein Modul antippen, z. B. **Yapaia Go** → **Installieren**.
2. Reiter **Info**: **In Seitenleiste anzeigen** einschalten → **Starten**.
3. Beim **ersten** Yapaia-Add-on erscheint eine Meldung: Home Assistant **einmal neu starten** (Einstellungen → System → Neu starten).

Die Installation kann ein paar Minuten dauern. Ein Fortschrittsbalken, der lange bei 0 % steht, ist normal.

## 3. In Home Assistant einrichten

Nach dem Neustart: **Einstellungen → Geräte & Dienste**. Dort steht oben **„Yapaia Go gefunden“**. Auf **Konfigurieren** tippen – fertig. Kein Passwort, keine Adresse.

Jedes weitere Modul erscheint genauso von selbst. Nur den **Router** fügst du von Hand hinzu: **Integration hinzufügen → Yapaia → GL.iNet-Router** (Details im Kapitel [Yapaia Router](/de/docs/handbuch/router/)).

## 4. Loslegen

- **Go**: In der Seitenleiste öffnen. Ein Assistent fragt nach Sprache, Karte, Fahrzeugmaßen und Positionsquelle. Weiter im Kapitel [Yapaia Go](/de/docs/handbuch/go/).
- **Beat**: In der Seitenleiste öffnen → **Suchlauf**. Weiter im Kapitel [Yapaia Beat](/de/docs/handbuch/beat/).

## Updates

Neue Versionen erscheinen wie gewohnt unter **Einstellungen → Add-ons** und in den Einstellungen bei den Updates. Deine Karten, Profile und Favoriten bleiben dabei erhalten.
