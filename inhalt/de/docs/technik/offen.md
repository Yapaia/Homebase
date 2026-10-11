---
titel: Offen entwickelt
kurz: Wo der Quelltext liegt, wie Yapaia geprüft wird und wie du mitmachen kannst.
reihenfolge: 6
---

## Alles auf GitHub

Der komplette Quelltext liegt öffentlich im Monorepo [github.com/Yapaia/yapaia](https://github.com/Yapaia/yapaia):

| Ordner | Inhalt |
| --- | --- |
| `go/` | Yapaia Go: Core, Web-App, Add-on |
| `beat/` | Yapaia Beat: Radio-Dienst, Add-on |
| `satellite/` | ESPHome-Konfiguration für den Sprachsatelliten |
| `integration/` | die Home-Assistant-Integration „Yapaia“ inkl. Router-Modul |
| `docs/` | Protokoll und Fähigkeiten |

Ein einziger Add-on-Store, eine Integration, gemeinsame Regeln – und trotzdem hat jedes Modul seine eigene Version und Änderungsliste.

## Geprüft, bevor es zu dir kommt

Jede Änderung läuft durch automatische Prüfungen, nur die der betroffenen Module:

- Unit- und Integrationstests (Go allein: mehrere tausend)
- End-to-End-Tests im Browser
- **Golden Routes**: echte Routen auf echten Karten, die sich nicht verschlechtern dürfen
- Bau des Add-on-Images und ein Blick hinein
- Sicherheitstests (Sandbox, Authentifizierung, Abhängigkeiten)

Erst wenn alles grün ist, wird zusammengeführt.

## Offene Daten

Alle Karten kommen von [OpenStreetMap](https://www.openstreetmap.org/). Fehlt eine Höhenbeschränkung an einer Brücke, kannst du sie dort selbst eintragen – davon profitieren alle.

## Mitmachen

- **Fehler melden oder Ideen einbringen:** [Issues auf GitHub](https://github.com/Yapaia/yapaia/issues)
- **Eigenes Modul bauen:** Das [Yapaia-Protokoll](/de/docs/technik/protokoll/) ist genau dafür da.
- **Code beitragen:** Bitte zuerst ein Issue öffnen. Die Lizenz für Beiträge wird gerade festgelegt; bis dahin halten wir Pull Requests zurück, damit sie später sauber gilt.
