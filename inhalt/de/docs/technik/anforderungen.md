---
titel: Anforderungen und Spezifikationen
kurz: Hardware, Arbeitsspeicher, Platz, unterstützte Geräte – mit Zahlen statt „sollte reichen“.
reihenfolge: 2
---

## Plattform

| | |
| --- | --- |
| Betriebssystem | Home Assistant OS (empfohlen) oder Home Assistant Supervised |
| Home Assistant | **2025.10** oder neuer |
| Architektur | x86-64 (`amd64`) oder ARM64 (`aarch64`) |
| Referenzrechner | Intel N100 Mini-PC, 8–16 GB RAM, SSD |

## Arbeitsspeicher von Yapaia Go

Gemessen für eine Region in Ländergröße:

| Bestandteil | RAM |
| --- | --- |
| Core (Node.js/Fastify) | bis 300 MB |
| Valhalla (Routing) | bis 1,5 GB |
| Photon (Adresssuche, Standard-Heap) | ca. 600 MB – 1 GB |
| **Yapaia Go gesamt** | **ca. 2,4 – 2,9 GB** |

Dazu kommen Home Assistant, Supervisor und andere Add-ons – meist 1–1,5 GB. Eine Home-Assistant-VM sollte für ein Land mit Suche **6 GB oder mehr** haben. Ohne Photon (Option `photon_enabled: false`) sinkt der Bedarf deutlich; du verlierst dann die Hausnummern-Suche.

## Speicherplatz

| Was | Platz |
| --- | --- |
| Eine Region (Land) mit Karte, Routing, Suche | bis ca. 10 GB |
| Selbst bauen (zeitweise) | etwa das Zwölffache der Rohdaten |

## Geräte

| Gerät | Modul | Getestet / empfohlen |
| --- | --- | --- |
| USB-GPS (NMEA, über gpsd) | Go | z. B. u-blox-Empfänger |
| Handy mit Home-Assistant-App | Go | Android, iOS (Standort im Hintergrund) |
| RTL-SDR (RTL2832U + R820T/R828D) | Beat | RTL-SDR Blog V3/V4, NooElec NESDR |
| Antenne UKW + Band III (174–240 MHz) | Beat | aktive FM/DAB-Dachantenne |
| GL.iNet GL-X3000 (Spitz AX), Firmware 4.x | Router | – |
| AI-Thinker ESP32 Audio Kit V2.2 (A436, ES8388) | Satellite | – |

## Browser für Yapaia Go

Die Karte braucht **WebGL 2**. Das haben alle aktuellen Browser; sehr alte Tablets (iPad vor iOS 15) zeigen keine Karte.

## Netzwerk

- Unterwegs: **kein Internet nötig**.
- Lokal: Home Assistant spricht mit den Add-ons im internen Netz des Supervisors; der Router wird im LAN unter seiner Adresse erreicht (Standard `192.168.8.1`).
- Für Kartenpakete: HTTPS zum Kartenserver, nur beim Herunterladen.
