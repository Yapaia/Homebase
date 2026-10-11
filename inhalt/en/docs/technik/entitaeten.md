---
titel: Entities and actions
kurz: Look it up – which entities, actions and triggers every module creates in Home Assistant.
reihenfolge: 5
---

Entity ids use German keys on purpose – they stay the same whatever language your Home Assistant uses.

## Yapaia Go

| Entity | Meaning |
| --- | --- |
| `sensor.yapaia_go_anweisung` | next instruction (icon follows the turn) |
| `sensor.yapaia_go_anweisung_entfernung` | metres to it |
| `sensor.yapaia_go_ankunft` | arrival time |
| `sensor.yapaia_go_restweg` | distance remaining in km |
| `sensor.yapaia_go_ziel`, `sensor.yapaia_go_zustand` | destination, navigation state |
| `sensor.yapaia_go_tempo`, `…_tempolimit`, `…_tempolimit_fahrzeug`, `…_hoehe` | speed, limit, limit for your vehicle, altitude |
| `binary_sensor.yapaia_go_zu_schnell` | speeding (the lower limit counts) |
| `device_tracker.yapaia_go_standort` | the vehicle on the map |
| `select.yapaia_go_profil` | vehicle profile |
| `text.yapaia_go_ziel_eingabe` | type a destination → route and go |
| `button.yapaia_go_pausieren`, `…_fortsetzen`, `…_beenden` | control navigation |

**Actions:** `yapaia.go_ziel_setzen`, `yapaia.go_navigation_pausieren`, `…_fortsetzen`, `…_beenden`, `yapaia.go_profil_waehlen`, `yapaia.go_befehl`.

**Triggers:** destination reached · too fast · GPS lost · reroute failed.

## Yapaia Router

| Entity | Meaning |
| --- | --- |
| `select.yapaia_router_sim` | switch SIM 1 / SIM 2 |
| `switch.yapaia_router_automatik` | SIM by country on/off |
| `sensor.yapaia_router_land` | country of the network (attributes `land_code`, `mcc`) |
| `binary_sensor.yapaia_router_roaming` | roaming |
| `sensor.yapaia_router_aktive_sim`, `…_anbieter`, `…_netztyp`, `…_baender` | active SIM, operator, LTE/5G, bands |
| `sensor.yapaia_router_signalbalken`, `…_rsrp`, `…_rsrq`, `…_sinr` | signal |
| `sensor.yapaia_router_datenverbrauch` | data counter |
| `binary_sensor.yapaia_router_verbunden` | mobile connection |
| `sensor.yapaia_router_umschaltung` | state of SIM switching (diagnostic) |

**Actions:** `yapaia.router_sim_waehlen` (`sim`), `…_neu_verbinden`, `…_router_neustart`, `…_automatik_an`, `…_automatik_aus`, `yapaia.router_rpc` (raw router call for experts).

**Triggers:** country changed · SIM changed · SIM switch failed.

## Yapaia Beat

| Entity | Meaning |
| --- | --- |
| `media_player.yapaia_beat` | the radio (station, volume, output) |
| `sensor.yapaia_beat_station`, `…_frequency`, `…_radiotext`, `…_signal` … | station, frequency, radio text, reception quality |
| *Station following* switch | station following on/off |
| *Scan FM / DAB+ / all*, *next / previous station* buttons | control |

**Actions:** including `yapaia.beat_ansage` (see [Capabilities](/en/docs/technik/faehigkeiten/)).

## Yapaia Satellite

Satellites are ESPHome devices. They bring their own `media_player`, switches for **mute microphone**, **status LED** and **amplifier**, and the choice of **wake word detection**.
