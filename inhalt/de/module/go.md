---
titel: Yapaia Go
claim: Navigation, die weiß, wie groß dein Camper ist.
kurz: Offline-Navigation fürs Wohnmobil – mit deinen echten Maßen, auf deinem eigenen Rechner, ohne Netz und ohne Konto.
punkte: Routen nach Höhe, Breite, Länge und Gewicht | Karten, Suche und Routing komplett offline | Ansagen, Neuberechnung, Tempolimit-Warnung | Ziel per Sprache oder aus Home Assistant
icon: go
status: beta
mock: handy
reihenfolge: 1
handbuch: /docs/handbuch/go/
---

## Warum noch eine Navigation?

Die Handy-Navigation hört dort auf, wo das Netz aufhört – meist genau am Pass. Lkw-Navis kennen zwar dein Gewicht, kosten aber viel und altern schlecht. Yapaia Go ist der dritte Weg: die Routing-Technik, die auch Logistiker einsetzen, gefüttert mit den echten Maßen **deines** Fahrzeugs, auf einem Rechner, den du wahrscheinlich schon an Bord hast.

## Was Go für dich tut

| | |
| --- | --- |
| **Fährt nach deinen Maßen** | Ein 3,20 m hoher Camper wird nicht unter eine 3-Meter-Brücke geschickt. Höhe, Breite, Länge und Gewicht stecken in jeder Route. |
| **Wirklich offline** | Kein „klappt offline, wenn vorher geladen“. Karte, Routing und Adresssuche liegen auf deiner Platte. Es gibt keinen Online-Modus, auf den Go zurückfallen müsste. |
| **Abbiegen mit Ansage** | Gesprochene Hinweise, automatische Neuberechnung, Ankunftszeit, Tempolimit und eine Warnung, wenn du zu schnell bist. |
| **Jede Positionsquelle** | USB-GPS-Empfänger, das GPS deines Browsers oder die Home-Assistant-App auf dem Handy. |
| **Gebaut für die Fahrt** | Große Tasten, Bedienung für Links- und Rechtslenker, Einstellungen sperren sich ab 10 km/h. Der Bildschirm bleibt wach. |
| **Mit Home Assistant verbunden** | Ankunft, Restweg, nächste Anweisung und Standort werden zu Entitäten – und „Ziel erreicht“ zum Auslöser für deine Automationen. |

![Yapaia Go auf dem Handy im Fahrmodus](/assets/bilder/go-telefon-fahrmodus.png)

## Einfach im Browser

Go läuft auf dem Mini-PC und öffnet sich in jedem Browser: das Tablet am Armaturenbrett, dein Handy, das iPad auf dem Beifahrersitz. Keine App, kein Store, kein Update-Zwang.

## Karten, fertig gebacken

Karten kannst du direkt in Go bauen – oder fertige Pakete vom **Yapaia-Kartenserver** laden: Karte, Adresssuche und Routing in einem Rutsch, geprüft per Prüfsumme. Wie das geht, steht im Handbuch unter [Karten und Kartenserver](/de/docs/handbuch/karten/).

## Ehrlich gesagt

- Go ist **keine Handy-App**. Es läuft auf einem Rechner im Fahrzeug und wird im Browser bedient.
- Es gibt **keine Live-Staus**. Das ist der Preis für echtes Offline.
- Die Karten sind so gut wie **OpenStreetMap**. Höhen- und Gewichtsgrenzen sind auf Hauptstraßen gut erfasst, auf kleinen Straßen lückenhaft. Go weist dich darauf hin.
