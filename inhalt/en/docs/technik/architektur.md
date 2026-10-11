---
titel: Architecture
kurz: How Yapaia is built – and why exactly this way. The key decisions with their reasons.
reihenfolge: 1
---

## The big picture

```
┌──────────────────────── Computer in the vehicle (Home Assistant OS) ────────────────────┐
│                                                                                         │
│   ┌──────────── Add-on Yapaia Go ────────────┐    ┌────── Add-on Yapaia Beat ──────┐    │
│   │ Core (Node.js/Fastify, SQLite)           │    │ Radio service + web interface  │    │
│   │  ├─ Valhalla   (routing)                 │    │  ├─ redsea  (FM, RDS)          │    │
│   │  ├─ Photon / Lite-Index (address search) │    │  └─ welle.io (DAB+)            │    │
│   │  ├─ PMTiles    (vector maps)             │    └───────────────┬────────────────┘    │
│   │  └─ gpsd       (USB-GPS)                 │                    │                     │
│   │ Web app (React, MapLibre) in browser     │                    │                     │
│   └───────────────────┬──────────────────────┘                    │                     │
│                       │  Yapaia protocol v1 (HTTP + WebSocket, token)                   │
│                       ▼                                           ▼                     │
│   ┌──────────────────── “Yapaia” integration in Home Assistant ─────────────────────┐   │
│   │  Devices · entities · actions · triggers · partners                             │   │
│   │  Router module (JSON-RPC to GL.iNet) · finds ESPHome satellites                 │   │
│   └─────────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
        ▲ Browser (tablet, phone)        ▲ USB: GPS, SDR        ▲ LAN: GL.iNet router, satellites
```

## Principles

1. **Every module stands on its own.** Go runs without Beat, Beat without Go. If a partner is present, it is used; if not, only the shared feature goes away.
2. **Modules talk through documented interfaces**, never through another module’s internals.
3. **One hub.** Everything Home Assistant should see goes through the “Yapaia” integration – not through written states, MQTT conventions or helpers.
4. **Offline is not a mode, it is the assumption.** Nothing may wait for the internet on the road.

## Decisions and why

### Home Assistant add-ons instead of a separate box

Many campers already have a Home Assistant computer for battery, tanks and lights. An add-on shares that hardware, and gets updates, backups and login from Home Assistant for free – no terminal needed. The price: Yapaia shares RAM and CPU with Home Assistant – which is why the [requirements](/en/docs/technik/anforderungen/) are spelled out so precisely.

### Valhalla for routing

Valhalla takes vehicle dimensions (height, width, length, weight) into account **at query time** – several vehicle profiles do not need their own graph. It works on a compact tiled graph (one country: around 1–1.5 GB RAM) and delivers turn instructions and speed limits along the route as well. Engines like OSRM fix the profile during preprocessing.

### PMTiles for the map

One single file per region, served via HTTP range requests straight from the core. No tile server, no database, update = swap a file. Rendering happens in the browser with **MapLibre GL** (WebGL), so maps can rotate and tilt in drive mode.

### Two ways to search addresses

**Photon** finds house numbers and forgives typos, but needs a Java VM with around 1 GB. For tight machines there is a built-in **lite index** (SQLite) that finds places and streets with little memory. Both are built from the same OSM data.

### An own protocol instead of MQTT

MQTT discovery creates entities, but no real devices with actions, triggers and return values. The [Yapaia protocol](/en/docs/technik/protokoll/) lets modules **describe themselves**; the integration builds devices, entities, actions and device triggers from that. New module features need no new integration code. MQTT stays available in Go as an extra option.

### Capabilities instead of module names

Modules use each other only through **announced capabilities** (e.g. `ansage.einmischen`), never by name. That way, another module can offer the same capability tomorrow without Go having to change. See [Capabilities](/en/docs/technik/faehigkeiten/).

### Satellites stay ESPHome

ESPHome is the established way in Home Assistant for microphones and speakers on microcontrollers. Instead of building a protocol into the firmware, the integration recognises satellites by their **project id** `yapaia.satellite` and announces them to the other modules as partners.

### The router without an add-on

The GL.iNet router already has a local JSON-RPC interface. An extra add-on would only be a translator. So the integration talks to the router itself and presents it like any other module.

### Map packages from a server

Building the routing graph and search index for a large country takes hours and a lot of RAM – on the computer in the vehicle that you need for other things. A map server builds the same files with the same tools ahead of time. Go downloads them, verifies each with **SHA-256** and only swaps them in once everything is complete. The routing archive is only extracted to allowed paths.

## Security

- The protocol interface `/yapaia/v1/*` always requires a **bearer token**, generated randomly by the add-on on first start (32 bytes).
- The interfaces run through **Home Assistant ingress** – Home Assistant’s login applies.
- No module phones home. Go has a test that requires **zero foreign network requests** while navigating.
