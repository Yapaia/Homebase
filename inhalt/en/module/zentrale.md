---
titel: Yapaia in Home Assistant
claim: All modules. One hub.
kurz: The “Yapaia” integration brings every module into Home Assistant as a device – with sensors, switches, actions and triggers, no YAML required.
punkte: Comes automatically with every add-on | Modules are discovered by themselves | Actions and triggers in the automation editor | Modules know about each other and work together
icon: zentrale
mock: ha
status: neu
reihenfolge: 5
handbuch: /docs/handbuch/installation/
---

## Your motorhome, one dashboard

Home Assistant is the heart of many smart motorhomes: battery, water tank, heating, lights. Yapaia fits right in. Every module appears under **Settings → Devices & services → Yapaia** as a device of its own.

## Setup? One tap.

Every Yapaia add-on brings the integration along. After the first start, restart Home Assistant once – from then on, every module announces itself as “discovered”. Tap **Configure**, done. No address, no password.

## What you can do with it

- **See**: arrival time, distance remaining, speed, current station, country, signal – with history, and renamable.
- **Control**: enter a destination, pick a vehicle profile, change station, switch SIM.
- **Automate**: triggers like “destination reached”, “too fast” or “country changed” are right there on the device in the automation editor.
- **Talk**: “Take me to …” goes to Go as an action, and the answer comes back.

## Modules that know each other

The integration tells every module who else is around. So Go blends its announcement into the radio when Beat is running – and uses the speaker otherwise. If a module is missing, only that extra feature goes away. The details are in the [Yapaia protocol](/en/docs/technik/protokoll/).
