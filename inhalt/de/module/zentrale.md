---
titel: Yapaia in Home Assistant
claim: Alle Module. Eine Zentrale.
kurz: Die Integration „Yapaia“ bringt jedes Modul als Gerät in Home Assistant – mit Anzeigen, Schaltern, Aktionen und Auslösern, ganz ohne YAML.
punkte: Kommt automatisch mit jedem Add-on | Module werden von selbst gefunden | Aktionen und Auslöser im Automationen-Editor | Module wissen voneinander und arbeiten zusammen
icon: zentrale
mock: ha
status: neu
reihenfolge: 5
handbuch: /docs/handbuch/installation/
---

## Dein Wohnmobil, ein Dashboard

Home Assistant ist das Herz vieler smarter Wohnmobile: Batterie, Wassertank, Heizung, Licht. Yapaia fügt sich genau dort ein. Jedes Modul erscheint unter **Einstellungen → Geräte & Dienste → Yapaia** als eigenes Gerät.

## Einrichten? Ein Tipp.

Jedes Yapaia-Add-on bringt die Integration mit. Nach dem ersten Start einmal Home Assistant neu starten – danach meldet sich jedes Modul als „gefunden“. Ein Tipp auf **Konfigurieren**, fertig. Keine Adresse, kein Passwort.

## Was du damit machst

- **Anzeigen**: Ankunftszeit, Restweg, Tempo, aktueller Sender, Land, Signal – mit Verlauf und umbenennbar.
- **Bedienen**: Ziel eingeben, Fahrzeugprofil wählen, Sender wechseln, SIM umschalten.
- **Automatisieren**: Auslöser wie „Ziel erreicht“, „Zu schnell“ oder „Land gewechselt“ stehen im Automationen-Editor direkt beim Gerät.
- **Sprechen**: „Fahre mich nach …“ geht als Aktion an Go, die Antwort kommt zurück.

## Module, die voneinander wissen

Die Integration sagt jedem Modul, wer sonst noch da ist. So mischt Go seine Ansage ins Radio, wenn Beat läuft – und spricht sonst über den Lautsprecher. Fehlt ein Modul, fällt nur diese Zusatzfunktion weg. Wie das genau funktioniert, steht im [Yapaia-Protokoll](/de/docs/technik/protokoll/).
