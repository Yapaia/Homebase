---
titel: Automationen mit Yapaia
kurz: Ideen und Beispiele, wie die Module dein Wohnmobil mitdenken lassen – im Editor zusammengeklickt.
reihenfolge: 7
---

## So findest du die Bausteine

Im **Automationen-Editor** (Einstellungen → Automationen & Szenen → Automation erstellen):

- **Auslöser** → **Gerät** → z. B. „Yapaia Go“ → *Ziel erreicht*, *Zu schnell*, *GPS verloren*.
- **Aktionen** → nach „Yapaia“ suchen → z. B. *Go: Ziel setzen*, *Router: SIM wählen*.
- **Bedingungen** und Auslöser mit Zahlen: die Entitäten wie *Restweg*, *Tempo*, *Land*.

## Rezepte

| Wenn … | dann … | Bausteine |
| --- | --- | --- |
| Restweg unter 30 km | Boiler einschalten | Go: Restweg · Schalter Boiler |
| Ziel erreicht | Licht an, Radio leiser | Go: Ziel erreicht · Beat: Lautstärke |
| Land gewechselt | Nachricht „Willkommen in …“ | Router: Land gewechselt · Benachrichtigung |
| Zu schnell | Ansage ins Radio | Go: Zu schnell · Beat: Ansage |
| GPS verloren | Hinweis aufs Handy | Go: GPS verloren |

## Beispiel zum Abschreiben

Für alle, die gern YAML sehen:

```yaml
alias: Warm ankommen
triggers:
  - trigger: numeric_state
    entity_id: sensor.yapaia_go_restweg
    below: 30
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.boiler
```

## Sprache

Mit einem Sprachassistenten in Home Assistant geht auch: „Fahre mich nach Magdeburg“, „Wo ist die nächste Tankstelle?“. Die Antwort kommt zurück und wird vorgelesen.
