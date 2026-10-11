---
titel: Entitäten und Aktionen
kurz: Nachschlagen – welche Entitäten, Aktionen und Auslöser jedes Modul in Home Assistant anlegt.
reihenfolge: 5
---

## Yapaia Go

| Entität | Bedeutung |
| --- | --- |
| `sensor.yapaia_go_anweisung` | nächste Anweisung (Symbol folgt der Abbiegung) |
| `sensor.yapaia_go_anweisung_entfernung` | Meter bis dorthin |
| `sensor.yapaia_go_ankunft` | Ankunftszeit |
| `sensor.yapaia_go_restweg` | Restweg in km |
| `sensor.yapaia_go_ziel`, `sensor.yapaia_go_zustand` | Ziel, Navigationszustand |
| `sensor.yapaia_go_tempo`, `…_tempolimit`, `…_tempolimit_fahrzeug`, `…_hoehe` | Tempo, Limit, Limit für dein Fahrzeug, Höhe |
| `binary_sensor.yapaia_go_zu_schnell` | zu schnell (das niedrigere Limit zählt) |
| `device_tracker.yapaia_go_standort` | das Fahrzeug auf der Karte |
| `select.yapaia_go_profil` | Fahrzeugprofil |
| `text.yapaia_go_ziel_eingabe` | Ziel eintippen → Route und los |
| `button.yapaia_go_pausieren`, `…_fortsetzen`, `…_beenden` | Navigation steuern |

**Aktionen:** `yapaia.go_ziel_setzen`, `yapaia.go_navigation_pausieren`, `…_fortsetzen`, `…_beenden`, `yapaia.go_profil_waehlen`, `yapaia.go_befehl`.

**Auslöser:** Ziel erreicht · Zu schnell · GPS verloren · Neuberechnung fehlgeschlagen.

## Yapaia Router

| Entität | Bedeutung |
| --- | --- |
| `select.yapaia_router_sim` | SIM 1 / SIM 2 umschalten |
| `switch.yapaia_router_automatik` | SIM nach Land an/aus |
| `sensor.yapaia_router_land` | Land des Netzes (Attribute `land_code`, `mcc`) |
| `binary_sensor.yapaia_router_roaming` | Roaming |
| `sensor.yapaia_router_aktive_sim`, `…_anbieter`, `…_netztyp`, `…_baender` | aktive SIM, Anbieter, LTE/5G, Bänder |
| `sensor.yapaia_router_signalbalken`, `…_rsrp`, `…_rsrq`, `…_sinr` | Signal |
| `sensor.yapaia_router_datenverbrauch` | Datenzähler |
| `binary_sensor.yapaia_router_verbunden` | Mobilfunkverbindung |
| `sensor.yapaia_router_umschaltung` | Stand der SIM-Umschaltung (Diagnose) |

**Aktionen:** `yapaia.router_sim_waehlen` (`sim`), `…_neu_verbinden`, `…_router_neustart`, `…_automatik_an`, `…_automatik_aus`, `yapaia.router_rpc` (roher Router-Aufruf für Fachleute).

**Auslöser:** Land gewechselt · SIM gewechselt · SIM-Wechsel fehlgeschlagen.

## Yapaia Beat

| Entität | Bedeutung |
| --- | --- |
| `media_player.yapaia_beat` | das Radio (Sender, Lautstärke, Ausgabe) |
| `sensor.yapaia_beat_station`, `…_frequency`, `…_radiotext`, `…_signal` … | Sender, Frequenz, Radiotext, Empfangsqualität |
| Schalter *Senderverfolgung* | Senderverfolgung an/aus |
| Knöpfe *Suchlauf UKW / DAB+ / alles*, *nächster / voriger Sender* | Bedienen |

**Aktionen:** u. a. `yapaia.beat_ansage` (siehe [Fähigkeiten](/de/docs/technik/faehigkeiten/)).

## Yapaia Satellite

Satelliten sind ESPHome-Geräte. Sie bringen ihren eigenen `media_player`, Schalter für **Mikrofon stumm**, **Status-LED** und **Verstärker** sowie die Auswahl der **Aktivierungswort-Erkennung** mit.
