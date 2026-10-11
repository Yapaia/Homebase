---
titel: Automations with Yapaia
kurz: Ideas and examples of how the modules make your motorhome think ahead – clicked together in the editor.
reihenfolge: 7
---

## Where to find the building blocks

In the **automation editor** (Settings → Automations & scenes → Create automation):

- **Triggers** → **Device** → e.g. “Yapaia Go” → *Destination reached*, *Too fast*, *GPS lost*.
- **Actions** → search for “Yapaia” → e.g. *Go: set destination*, *Router: select SIM*.
- **Conditions** and numeric triggers: entities like *distance remaining*, *speed*, *country*.

## Recipes

| When … | then … | Building blocks |
| --- | --- | --- |
| Distance remaining below 30 km | switch on the water heater | Go: distance remaining · water heater switch |
| Destination reached | lights on, radio down | Go: destination reached · Beat: volume |
| Country changed | message “Welcome to …” | Router: country changed · notification |
| Too fast | announcement into the radio | Go: too fast · Beat: announcement |
| GPS lost | note to your phone | Go: GPS lost |

## Example to copy

For everyone who likes YAML:

```yaml
alias: Arrive warm
triggers:
  - trigger: numeric_state
    entity_id: sensor.yapaia_go_restweg
    below: 30
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.boiler
```

## Voice

With a voice assistant in Home Assistant you can also say: “Take me to Magdeburg”, “Where is the nearest petrol station?”. The answer comes back and is read out.
