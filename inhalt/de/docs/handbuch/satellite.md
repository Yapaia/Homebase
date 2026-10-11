---
titel: Yapaia Satellite einrichten
kurz: Die ESP32-Platine aufspielen, mit Home Assistant verbinden und das Aktivierungswort wählen.
reihenfolge: 6
---

## Das brauchst du

- **AI-Thinker ESP32 Audio Kit V2.2** mit Codec **ES8388** (Aufdruck „A436“). Ältere Platinen mit „AC101“ passen nicht.
- Einen Lautsprecher am weißen 2-poligen Stecker.
- Ein Micro-USB-**Daten**kabel.
- In Home Assistant: das Add-on **ESPHome Device Builder** und einen eingerichteten Sprachassistenten.

## Aufspielen

1. Platine über die Buchse **„UART“** an den Home-Assistant-Rechner stecken.
2. **ESPHome Device Builder → New Device** → Name `yapaia-satellite` → **ESP32** → noch nicht installieren.
3. Beim neuen Gerät **Edit**: den erzeugten `api`-Schlüssel behalten, den Rest durch die Beispiel-Konfiguration aus dem Yapaia-Repository ersetzen (Ordner `satellite/`).
4. **Install → Plug into the computer running ESPHome Device Builder** → Anschluss wählen.

Klappt das Verbinden nicht: **BOOT** gedrückt halten, kurz **RST** drücken, BOOT loslassen, nochmal installieren.

## Übernehmen

Home Assistant meldet ein neues Gerät „Yapaia Satellite“ → **Hinzufügen**. Der Assistent für Sprachsatelliten führt durch Sprachassistent und Aktivierungswort. Danach darf die Platine an jedes USB-Netzteil; Updates kommen per WLAN.

## Tasten

| Taste | Wirkung |
| --- | --- |
| KEY1 | Sprechen (nochmal: abbrechen) |
| KEY3 | Mikrofon stumm |
| KEY4 / KEY5 | leiser / lauter |
| KEY6 | Stopp |

## Welches Aktivierungswort?

- **In Home Assistant** (Standard): Das Add-on openWakeWord erkennt das Wort. Hier geht auch ein eigenes Wort wie „Yapaia“.
- **Auf dem Gerät**: „Okay Nabu“ oder „Hey Jarvis“ – funktioniert auch, wenn Home Assistant gerade beschäftigt ist.
- **Nur Taste**: hört nur zu, wenn du KEY1 drückst.
