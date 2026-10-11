---
titel: Maps and map server
kurz: How the map gets into Go – built yourself or downloaded ready-made from the Yapaia map server.
reihenfolge: 3
---

## What a “map” is in Yapaia Go

A map has three parts:

| Part | For |
| --- | --- |
| **Map image** | what you see on screen |
| **Address search** | so you can find “Main Street 5, Rosenheim” |
| **Routing** | so Go can calculate the way for your vehicle |

All three live on your computer. On the road, Go needs no internet.

## Way 1: Finished packages from the map server (recommended)

A **Yapaia map server** builds map packages from current OpenStreetMap data – e.g. “Germany”, or “Alps” combining several countries. Go downloads such a package with one tap.

1. Open Yapaia Go → **Manage maps** (map icon).
2. Scroll down to **Kartenserver** (map server).
3. Enter the map server’s **address** and **token** → **Verbinden** (connect).
4. Go checks the connection right away. Green means: connected, packages available.
5. Every package now appears in the map list marked “from the map server” → **Install**.

Go downloads map, search and routing completely, **verifies every file by checksum** and only then swaps them in. If the download breaks off, everything stays as it was. About 30 seconds later, routing is ready too.

> The token is never shown again after saving. If you leave the field empty later, it is kept.

### Map updates

When the map server has built a package with new data, tap **Update** on the package in Go. Done.

### Good to know

- There is **one** routing graph. A package from the map server replaces the previous one. If you need several countries, use a package that combines them.
- A large country needs several gigabytes of space. Go checks beforehand whether there is enough.

## Way 2: Build it yourself

Without a map server, Go builds maps from an OpenStreetMap extract on your own computer. That works, but for a large country it takes **several hours** and a lot of memory.

1. **Manage maps** → pick a region → **Install**.
2. Then tap **Build routing and search**.

You can leave the page, the build keeps running. When you come back, you see the progress again.

## Where the data comes from

All maps come from [OpenStreetMap](https://www.openstreetmap.org/) – made by millions of volunteers. Map data © OpenStreetMap contributors, licence ODbL.
