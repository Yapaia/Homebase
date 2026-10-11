---
titel: Capabilities
kurz: The contracts between modules – what a module promises when it announces a capability.
reihenfolge: 4
---

## Principle

A **capability** is a contract. A module announces it in its description, the integration passes it on in the partner list, and other modules use it **only if the partner announces it** – never by the module’s name.

## Overview

| Capability | Who | What it promises |
| --- | --- | --- |
| `navigation` | Go | Offline navigation; destination, arrival, distance remaining as entities |
| `radio` | Beat | FM/DAB+ radio as a media player |
| `ansage.einmischen` | Beat | Announcements are mixed into the running radio |
| `mobilfunk` | Router | Country, roaming, operator, signal as entities |
| `mobilfunk.sim_wechsel` | Router | Switch SIM 1/2 via an action |
| `sprache.eingabe` | Satellite | Microphone for the voice assistant |
| `sprache.ausgabe` | Satellite | Speaker as a media player |

## navigation

- **Actions:** `yapaia.go_ziel_setzen` (`ziel` as text or `ort` with coordinates), `yapaia.go_navigation_pausieren`, `…_fortsetzen`, `…_beenden`, `yapaia.go_profil_waehlen` (`wert`), `yapaia.go_befehl` (`text`; answer as `antwort` in the result).
- **States:** `ankunft`, `restweg`, `ziel`, `zustand`, `tempo`, `tempolimit`, `standort`.
- **Events:** `ziel_erreicht`, `zu_schnell`, `gps_verloren`, `neuberechnung_fehlgeschlagen`.

## ansage.einmischen

- **Call:** Home Assistant action `yapaia.beat_ansage` – through Home Assistant, because that is where the voice (TTS) is generated.
- **Fields:** `message` (required), `priority` (`info`, `hinweis`, `navigation`), optional `engine` and `language`.
- **Response:** `{"ok": true, "weg": "gemischt" | "lautsprecher"}` or `{"ok": false, "error": "…"}`. With `ok: false`, the caller speaks itself.

## mobilfunk.sim_wechsel

- **Call:** `yapaia.router_sim_waehlen` with `sim: 1 | 2`.
- **Result:** via the events `sim_gewechselt` or `sim_wechsel_fehlgeschlagen`.

## sprache.ausgabe

- **Call:** `tts.speak` with the `media_player` from the partner list.
