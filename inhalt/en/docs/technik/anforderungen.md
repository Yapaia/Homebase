---
titel: Requirements and specifications
kurz: Hardware, memory, disk, supported devices – with numbers instead of “should be enough”.
reihenfolge: 2
---

## Platform

| | |
| --- | --- |
| Operating system | Home Assistant OS (recommended) or Home Assistant Supervised |
| Home Assistant | **2025.10** or newer |
| Architecture | x86-64 (`amd64`) or ARM64 (`aarch64`) |
| Reference machine | Intel N100 mini-PC, 8–16 GB RAM, SSD |

## Memory used by Yapaia Go

Measured for a country-sized region:

| Component | RAM |
| --- | --- |
| Core (Node.js/Fastify) | up to 300 MB |
| Valhalla (routing) | up to 1.5 GB |
| Photon (address search, default heap) | approx. 600 MB – 1 GB |
| **Yapaia Go total** | **approx. 2.4 – 2.9 GB** |

Add Home Assistant, the Supervisor and other add-ons – usually 1–1.5 GB. A Home Assistant VM should have **6 GB or more** for one country with search. Without Photon (option `photon_enabled: false`) the need drops considerably; you lose house-number search.

## Disk space

| What | Space |
| --- | --- |
| One region (country) with map, routing, search | up to approx. 10 GB |
| Building yourself (temporarily) | roughly twelve times the raw data |

## Devices

| Device | Module | Tested / recommended |
| --- | --- | --- |
| USB GPS (NMEA, via gpsd) | Go | e.g. u-blox receivers |
| Phone with the Home Assistant app | Go | Android, iOS (background location) |
| RTL-SDR (RTL2832U + R820T/R828D) | Beat | RTL-SDR Blog V3/V4, NooElec NESDR |
| Antenna FM + Band III (174–240 MHz) | Beat | active FM/DAB roof antenna |
| GL.iNet GL-X3000 (Spitz AX), firmware 4.x | Router | – |
| AI-Thinker ESP32 Audio Kit V2.2 (A436, ES8388) | Satellite | – |

## Browser for Yapaia Go

The map needs **WebGL 2**. All current browsers have it; very old tablets (iPad before iOS 15) show no map.

## Network

- On the road: **no internet needed**.
- Locally: Home Assistant talks to the add-ons on the Supervisor’s internal network; the router is reached on the LAN at its address (default `192.168.8.1`).
- For map packages: HTTPS to the map server, only while downloading.
