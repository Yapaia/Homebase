---
titel: Karten und Kartenserver
kurz: Wie die Karte in Go kommt – selbst gebaut oder fertig vom Yapaia-Kartenserver geladen.
reihenfolge: 3
---

## Was eine „Karte“ in Yapaia Go ist

Eine Karte besteht aus drei Teilen:

| Teil | Wofür |
| --- | --- |
| **Kartenbild** | was du auf dem Bildschirm siehst |
| **Adresssuche** | damit du „Hauptstraße 5, Rosenheim“ findest |
| **Routing** | damit Go den Weg für dein Fahrzeug berechnet |

Alle drei liegen auf deinem Rechner. Unterwegs braucht Go kein Internet.

## Weg 1: Fertige Pakete vom Kartenserver (empfohlen)

Ein **Yapaia-Kartenserver** baut Kartenpakete aus aktuellen OpenStreetMap-Daten vor – etwa „Deutschland“ oder „Alpen“ aus mehreren Ländern zusammen. Go lädt so ein Paket mit einem Fingertipp herunter.

1. Yapaia Go öffnen → **Karten verwalten** (Kartensymbol).
2. Nach unten zu **Kartenserver** scrollen.
3. **Adresse** und **Token** des Kartenservers eintragen → **Verbinden**.
4. Go prüft die Verbindung sofort. Grün heißt: verbunden, Pakete sind da.
5. In der Kartenliste steht jetzt jedes Paket mit „Vom Kartenserver“ → **Installieren**.

Go lädt Karte, Suche und Routing komplett herunter, **prüft jede Datei per Prüfsumme** und wechselt erst dann ein. Bricht der Download ab, bleibt alles wie vorher. Etwa 30 Sekunden später ist auch das Routing bereit.

> Das Token wird nach dem Speichern nie wieder angezeigt. Lässt du das Feld später leer, bleibt es erhalten.

### Kartenupdates

Wird auf dem Kartenserver ein Paket mit neuen Daten gebaut, tippst du in Go beim Paket auf **Update**. Fertig.

### Gut zu wissen

- Es gibt **einen** Routinggraphen. Ein Paket vom Kartenserver ersetzt den bisherigen. Brauchst du mehrere Länder, nimm ein Paket, das sie zusammenfasst.
- Ein großes Land braucht mehrere Gigabyte Platz. Go prüft vorher, ob genug frei ist.

## Weg 2: Selbst bauen

Ohne Kartenserver baut Go Karten aus einem OpenStreetMap-Auszug auf deinem eigenen Rechner. Das funktioniert, dauert aber bei einem großen Land **mehrere Stunden** und braucht viel Arbeitsspeicher.

1. **Karten verwalten** → Region aussuchen → **Installieren**.
2. Danach **Routing und Suche bauen** antippen.

Du kannst die Seite verlassen, der Bau läuft weiter. Kommst du zurück, siehst du wieder den Fortschritt.

## Woher die Daten kommen

Alle Karten stammen von [OpenStreetMap](https://www.openstreetmap.org/) – erstellt von Millionen Freiwilligen. Kartendaten © OpenStreetMap-Mitwirkende, Lizenz ODbL.
