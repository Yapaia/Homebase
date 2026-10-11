---
titel: Using Yapaia Beat
kurz: Scan for stations, save favourites, send the sound where you want to hear it.
reihenfolge: 4
---

## Connect

- Plug the RTL-SDR stick into the Home Assistant computer – ideally via a short USB extension cable and not right next to USB 3 ports (they interfere with reception).
- Antenna for **FM and DAB+**: a telescopic antenna is enough for strong stations; in a camper, an active roof antenna is ideal.

## First scan

1. Sidebar → **Yapaia Beat**.
2. **Scan** → FM, DAB+ or both.
3. After a few minutes the station list is ready. Use ☆ to make a station a favourite.

## Where does the sound come out?

Like “connect to a device”, you choose the output:

- **Mini-PC** – speakers on the Home Assistant computer
- **This device** – the tablet or phone you are using right now
- **Other speakers** – any media player in Home Assistant that can play music from an address

## The radio card for your dashboard

In the dashboard: **Add card → “Yapaia Beat”**. Choose “retro” (wood and LCD) or “modern”.

```yaml
type: custom:yapaia-beat-card
entity: media_player.yapaia_beat
style: retro
```

![The radio cards in the dashboard](/assets/bilder/beat-dashboard.png)

## On the road: station following

When reception gets bad, Beat looks for the same station on a better frequency, on another DAB channel, or switches between FM and DAB+. Turn it on and off with the **station following** switch.

> With a **second stick**, Beat searches in the background while the radio keeps playing – without interruption.
