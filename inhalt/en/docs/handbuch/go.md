---
titel: Using Yapaia Go
kurz: Enter your vehicle, find a destination, drive off – and what the buttons do on the way.
reihenfolge: 2
---

## The setup wizard

When you open Go for the first time, it asks five questions:

1. **Language and units**
2. **Map** – which region you need (see [Maps and map server](/en/docs/handbuch/karten/))
3. **Your vehicle** – height, width, length, weight
4. **Position** – how Go knows where you are
5. **Home Assistant** – usually happens by itself

## Your vehicle

Enter the dimensions **including roof box, air conditioner and bike rack** – whatever really has to fit under the bridge. You can create several profiles, e.g. “Camper” and “Camper with trailer”, and switch at the top left.

![Vehicle profile in Yapaia Go](/assets/bilder/go-fahrzeugprofil.png)

> From 2.70 m height, Go points out that height limits on small roads are not always mapped in OpenStreetMap. Keep your eyes open.

## Where does the position come from?

| Source | When it makes sense | Setting |
| --- | --- | --- |
| USB GPS receiver | built in, always reliable | add-on configuration: `gps_source: usb` |
| Phone with the Home Assistant app | no receiver available | `gps_source: companion_app` |
| Tablet browser | for trying things out | always works |

## Find a destination and go

1. Tap the search field at the top: address, place or campsite.
2. Tap a result → the route appears with arrival time and length.
3. **Go** – Yapaia switches to drive mode.

In drive mode you see the next turn, the speed limit, your speed, arrival, remaining time and distance. If you leave the route, Go recalculates by itself.

![Yapaia Go in drive mode](/assets/bilder/go-fahrmodus.png)

## Safe to operate

- Above **10 km/h**, search and settings lock. Favourites keep working.
- Buttons are big enough for a thumb on cobblestones.
- Left- or right-hand drive: the controls can be mirrored.
- The screen stays awake while driving.

## Destination by voice or from Home Assistant

- In Home Assistant, the device “Yapaia Go” has an **Enter destination** field.
- With a voice assistant (e.g. [Yapaia Satellite](/en/module/satellite/)): “Take me to Magdeburg”.
- In automations: action **Yapaia: Go set destination**.

## Test drive without moving

Under **Settings → Add-ons → Yapaia Go → Configuration**, in the *advanced* section, you can unlock `gps_simulator` (then restart the add-on). A dot then drives your route – ideal for trying announcements. Switch it off again afterwards.

## The health check

The stethoscope icon on the right opens the **installation check**. It tells you in plain words what is missing (map, routing, GPS) and what you can do.
