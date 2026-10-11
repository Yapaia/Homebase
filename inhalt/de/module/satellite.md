---
titel: Yapaia Satellite
claim: Sag einfach, wohin.
kurz: Ein kleiner Sprachlautsprecher für dein Wohnmobil – auf einer günstigen ESP32-Platine, eingerichtet komplett über Home Assistant.
punkte: Spracheingabe mit zwei Mikrofonen | Ansagen und Musik über den Lautsprecher | Eigenes Aktivierungswort wie „Yapaia“ | So viele Satelliten, wie du Ecken hast
icon: satellite
status: beta
reihenfolge: 4
handbuch: /docs/handbuch/satellite/
---

## Freie Hände, freier Kopf

Beim Fahren tippt man nicht auf Bildschirmen herum. Mit Yapaia Satellite sagst du einfach „Fahre mich nach Magdeburg“ – und Yapaia Go rechnet die Route. Oder du fragst nach dem Wetter, schaltest das Licht oder lässt dir die Ankunftszeit sagen.

## Was drinsteckt

| | |
| --- | --- |
| **Hardware** | AI-Thinker ESP32 Audio Kit V2.2 (A436) mit zwei Mikrofonen, Verstärker und sechs Tasten – für wenige Euro. |
| **Sprache rein** | Die Mikrofone hören zu; die Erkennung macht der Sprachassistent von Home Assistant. |
| **Sprache raus** | Antworten, Durchsagen und Musik über den angeschlossenen Lautsprecher. |
| **Aktivierungswort** | In Home Assistant – auch ein eigenes wie „Yapaia“ – oder direkt auf dem Gerät. |
| **Tasten und Licht** | Sprechen, stumm, lauter, leiser, Stopp. Die LED zeigt, ob er zuhört. |

## Mehrere Satelliten

Einer im Fahrerhaus, einer im Alkoven, einer draußen unter der Markise: Jeder Satellit ist ein eigenes Gerät. Die Yapaia-Integration erkennt sie alle und sagt den anderen Modulen Bescheid – so kann Go eine Ansage auf allen oder nur auf einem bestimmten ausgeben.
