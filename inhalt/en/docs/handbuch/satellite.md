---
titel: Setting up Yapaia Satellite
kurz: Flash the ESP32 board, connect it to Home Assistant and choose the wake word.
reihenfolge: 6
---

## What you need

- **AI-Thinker ESP32 Audio Kit V2.2** with the **ES8388** codec (labelled “A436”). Older boards with “AC101” do not fit.
- A speaker on the white 2-pin connector.
- A micro-USB **data** cable.
- In Home Assistant: the **ESPHome Device Builder** add-on and a configured voice assistant.

## Flash

1. Connect the board via the **“UART”** socket to the Home Assistant computer.
2. **ESPHome Device Builder → New Device** → name `yapaia-satellite` → **ESP32** → don’t install yet.
3. On the new device, **Edit**: keep the generated `api` key, replace the rest with the example configuration from the Yapaia repository (folder `satellite/`).
4. **Install → Plug into the computer running ESPHome Device Builder** → choose the port.

If connecting fails: hold **BOOT**, briefly press **RST**, release BOOT, install again.

## Adopt

Home Assistant reports a new device “Yapaia Satellite” → **Add**. The voice satellite wizard guides you through voice assistant and wake word. After that the board can run on any USB power supply; updates arrive over Wi-Fi.

## Buttons

| Button | Action |
| --- | --- |
| KEY1 | Talk (again: cancel) |
| KEY3 | Mute microphone |
| KEY4 / KEY5 | quieter / louder |
| KEY6 | Stop |

## Which wake word?

- **In Home Assistant** (default): the openWakeWord add-on detects the word. Your own word like “Yapaia” works here too.
- **On the device**: “Okay Nabu” or “Hey Jarvis” – works even when Home Assistant is busy.
- **Button only**: listens only when you press KEY1.
