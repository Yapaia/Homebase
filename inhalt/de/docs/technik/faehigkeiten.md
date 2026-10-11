---
titel: Fähigkeiten
kurz: Die Verträge zwischen den Modulen – was ein Modul zusagt, wenn es eine Fähigkeit meldet.
reihenfolge: 4
---

## Prinzip

Eine **Fähigkeit** ist ein Vertrag. Ein Modul meldet sie in seiner Beschreibung, die Integration gibt sie in der Partnerliste weiter, und andere Module nutzen sie **nur, wenn der Partner sie meldet** – nie anhand des Modulnamens.

## Übersicht

| Fähigkeit | Wer | Was sie zusagt |
| --- | --- | --- |
| `navigation` | Go | Offline-Navigation; Ziel, Ankunft, Restweg als Entitäten |
| `radio` | Beat | UKW/DAB+-Radio als Mediaplayer |
| `ansage.einmischen` | Beat | Ansagen werden ins laufende Radio gemischt |
| `mobilfunk` | Router | Land, Roaming, Anbieter, Signal als Entitäten |
| `mobilfunk.sim_wechsel` | Router | SIM 1/2 umschalten per Aktion |
| `sprache.eingabe` | Satellite | Mikrofon für den Sprachassistenten |
| `sprache.ausgabe` | Satellite | Lautsprecher als Mediaplayer |

## navigation

- **Aktionen:** `yapaia.go_ziel_setzen` (`ziel` als Text oder `ort` mit Koordinaten), `yapaia.go_navigation_pausieren`, `…_fortsetzen`, `…_beenden`, `yapaia.go_profil_waehlen` (`wert`), `yapaia.go_befehl` (`text`; Antwort als `antwort` im Ergebnis).
- **Zustände:** `ankunft`, `restweg`, `ziel`, `zustand`, `tempo`, `tempolimit`, `standort`.
- **Ereignisse:** `ziel_erreicht`, `zu_schnell`, `gps_verloren`, `neuberechnung_fehlgeschlagen`.

## ansage.einmischen

- **Aufruf:** Home-Assistant-Aktion `yapaia.beat_ansage` – über Home Assistant, weil dort die Stimme (TTS) erzeugt wird.
- **Felder:** `message` (Pflicht), `priority` (`info`, `hinweis`, `navigation`), optional `engine` und `language`.
- **Antwort:** `{"ok": true, "weg": "gemischt" | "lautsprecher"}` oder `{"ok": false, "error": "…"}`. Bei `ok: false` spricht der Aufrufer selbst.

## mobilfunk.sim_wechsel

- **Aufruf:** `yapaia.router_sim_waehlen` mit `sim: 1 | 2`.
- **Ergebnis:** über die Ereignisse `sim_gewechselt` bzw. `sim_wechsel_fehlgeschlagen`.

## sprache.ausgabe

- **Aufruf:** `tts.speak` mit dem `media_player` aus der Partnerliste.
