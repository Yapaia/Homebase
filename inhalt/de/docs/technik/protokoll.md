---
titel: Das Yapaia-Protokoll (v1)
kurz: Wie sich Module bei der Integration anmelden, beschreiben, ihre Werte liefern und Befehle empfangen – die Schnittstelle zum Mitbauen.
reihenfolge: 3
---

## Überblick

Das Protokoll verbindet jedes Yapaia-Modul mit der zentralen Home-Assistant-Integration **„Yapaia“**. Alle Wege laufen über **HTTP und WebSocket** im internen Home-Assistant-Netz.

```
 Modul (Add-on)                                      Integration „yapaia“
   │ 1. Anmeldung: Supervisor-Discovery „yapaia“  ─────▶ │
   │ 2. GET  /yapaia/v1/beschreibung              ◀───── │
   │ 3. WS   /yapaia/v1/live   (Zustände, Ereignisse) ══▶ │
   │ 4. POST /yapaia/v1/aktion/<name>             ◀───── │
   │ 5. POST /yapaia/v1/partner (wer ist noch da) ◀───── │
```

Alle Aufrufe tragen `Authorization: Bearer <token>`. Ohne gültiges Token antwortet die Schnittstelle mit `401`.

## Module und Instanzen

Von einem Modul kann es mehrere Instanzen geben (z. B. mehrere Satelliten). Jede Instanz trägt:

| Feld | Bedeutung |
| --- | --- |
| `modul` | Art des Bausteins: `go`, `beat`, `satellite` … |
| `instanz` | dauerhafte, eindeutige Kennung, vom Modul erzeugt; ändert sich nie |
| `name` | Anzeigename, vom Nutzer änderbar |

- Jede Instanz ist in Home Assistant ein eigenes **Gerät** und ein eigener Konfigurationseintrag.
- Unique-ID einer Entität: `yapaia_<modul>_<instanz>_<schluessel>`.
- Entity-ID: `<plattform>.yapaia_<modul>_<schluessel>`, z. B. `sensor.yapaia_go_ankunft`.
- Aktionen heißen `yapaia.<modul>_<name>`, z. B. `yapaia.go_ziel_setzen`.

## 1. Anmeldung

Beim Start meldet sich das Add-on beim Supervisor (`POST /discovery`):

```json
{
  "service": "yapaia",
  "config": {
    "modul": "go",
    "instanz": "7f3c9a2e",
    "name": "Yapaia Go",
    "host": "a0d7b954-yapaia-go",
    "port": 8080,
    "token": "…32 Byte, base64url…",
    "protokoll": 1,
    "version": "0.46.0"
  }
}
```

Home Assistant zeigt daraufhin „Yapaia Go gefunden“. Das Token erzeugt das Add-on einmal und speichert es in seinem privaten `/data`.

## 2. Beschreibung

`GET /yapaia/v1/beschreibung` sagt, was das Modul anbietet:

```json
{
  "protokoll": 1,
  "modul": "go",
  "instanz": "7f3c9a2e",
  "name": "Yapaia Go",
  "version": "0.46.0",
  "hersteller": "Yapaia",
  "faehigkeiten": ["navigation"],
  "entitaeten": [
    { "schluessel": "restweg", "plattform": "sensor",
      "name": { "de": "Restweg", "en": "Distance remaining" },
      "geraeteklasse": "distance", "einheit": "km", "zustandsklasse": "measurement" },
    { "schluessel": "profil", "plattform": "select",
      "name": { "de": "Fahrzeugprofil", "en": "Vehicle profile" },
      "optionen_aus": "profile", "aktion": "profil_waehlen" }
  ],
  "aktionen": [
    { "name": "ziel_setzen", "titel": { "de": "Ziel setzen", "en": "Set destination" },
      "felder": { "ziel": { "typ": "text", "titel": { "de": "Adresse oder Ort" } } } }
  ],
  "ereignisse": [
    { "name": "ziel_erreicht", "titel": { "de": "Ziel erreicht" }, "daten": ["ziel"] }
  ]
}
```

### Felder einer Entität

| Feld | Bedeutung |
| --- | --- |
| `schluessel` | dauerhafte Kennung im Modul – **nie umbenennen** |
| `plattform` | `sensor`, `binary_sensor`, `switch`, `select`, `number`, `button`, `text`, `device_tracker`, `image`, `event` oder `spezial` |
| `name` | Anzeigename je Sprache |
| `geraeteklasse`, `einheit`, `zustandsklasse`, `symbol` | wie in Home Assistant |
| `symbol_aus` | Zustandsschlüssel, dessen Wert das Symbol ersetzt |
| `kategorie` | `config` oder `diagnostic` |
| `standard_aktiv` | `false` = zunächst deaktiviert |
| `aktion`, `aktion_an`, `aktion_aus` | welche Aktion ein Bedienen auslöst |
| `optionen` / `optionen_aus` | feste Liste oder Zustandsschlüssel, der sie liefert |
| `min`, `max`, `schritt` | für `number` |
| `attribute` | Zustandsschlüssel, die als Attribute mitgehen |

Ein `device_tracker` hat als Wert `{"breite": 52.1, "laenge": 11.6, "genauigkeit": 5}` oder `null`.

### Aktionen und Ereignisse

- Feldtypen für Aktionen: `text`, `zahl`, `bool`, `auswahl` (mit `optionen`), `entitaet`, `ort`.
- Ereignisse feuert die Integration als Home-Assistant-Ereignis `yapaia_ereignis` (mit `modul`, `instanz`, `geraet_id`, `name`, `daten`) und bietet sie als **Geräte-Auslöser** an.

## 3. Live-Verbindung

`GET /yapaia/v1/live` (WebSocket). Das Modul schickt:

```json
{"typ": "zustand", "werte": {"ankunft": "2026-10-11T18:42:00+02:00", "restweg": 132.4}}
{"typ": "ereignis", "name": "ziel_erreicht", "daten": {"ziel": "Magdeburg"}}
{"typ": "beschreibung_geaendert"}
```

- Direkt nach dem Verbinden: **ein vollständiger** `zustand`, danach nur Änderungen.
- `null` heißt unbekannt.
- Bricht die Verbindung ab, werden die Entitäten *nicht verfügbar*; die Integration verbindet neu (1, 2, 4 … höchstens 60 s).
- Schnell wechselnde Werte (Tempo, Position) höchstens einmal je Sekunde.

## 4. Aktionen ausführen

`POST /yapaia/v1/aktion/<name>` mit den Feldern als JSON.

- Erfolg: `200 {"ok": true}`, optional mit `"ergebnis"`.
- Fehler: `4xx/5xx {"ok": false, "fehler": "Text für den Nutzer"}` – erscheint in Home Assistant als Fehlermeldung.
- Den neuen Zustand meldet das Modul über die Live-Verbindung, nicht in der Antwort. So gibt es nur **eine** Quelle für Zustände.

## 5. Partner

Die Integration sagt jedem Modul, wer sonst noch da ist:

`POST /yapaia/v1/partner`

```json
{"partner": [
  {"modul": "beat", "instanz": "c41b07d2", "name": "Yapaia Beat",
   "url": "http://a0d7b954-yapaia-beat:8099", "token": "…",
   "version": "1.14.1", "faehigkeiten": ["radio", "ansage.einmischen"]},
  {"modul": "satellite", "instanz": "a4cf12b3e8d0", "name": "Yapaia Satellite Küche",
   "media_player": "media_player.yapaia_satellite_kuche",
   "faehigkeiten": ["sprache.eingabe", "sprache.ausgabe"]}
]}
```

Gesendet nach dem Einrichten und bei jeder Änderung. Eine leere Liste heißt: allein. Module nutzen Partner **nur über gemeldete Fähigkeiten**.

## Versionen

- `protokoll` ist eine ganze Zahl. Neue Felder, Entitäten, Aktionen, Ereignisse und Fähigkeiten ändern sie **nicht** – beide Seiten ignorieren, was sie nicht kennen.
- Nur was Bestehendes bricht, erhöht sie. Die Integration unterstützt dann alte und neue Version mindestens eine Add-on-Generation lang.

## Ein eigenes Modul bauen

Ein neues Modul braucht keinen Integrationscode: Es meldet sich per Discovery an, liefert eine Beschreibung, hält eine Live-Verbindung und nimmt Aktionen an. Ohne Supervisor (Entwicklung, Docker) trägst du Host, Port und Token in der Integration von Hand ein.
