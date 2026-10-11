---
titel: Fragen und Hilfe
kurz: Häufige Fragen und was du tust, wenn etwas klemmt.
reihenfolge: 8
---

## Häufige Fragen

**Brauche ich unterwegs Internet?**
Nein. Nur zum Installieren und für Kartenupdates.

**Läuft Yapaia auf einem Raspberry Pi?**
Yapaia läuft auf x86-64 und ARM64. Für Navigation mit einer Länderkarte brauchst du aber genug Arbeitsspeicher – plane 8 GB ein. Ein N100-Mini-PC ist die Referenz.

**Kann ich Yapaia Go ohne Home Assistant nutzen?**
Ja, Go läuft auch eigenständig mit Docker. Die meisten Funktionen rund ums Fahrzeug entfalten sich aber erst mit Home Assistant.

**Was kostet das?**
Nichts. Kein Abo, kein Konto, keine Cloud.

## Wenn etwas klemmt

| Du siehst | Das hilft |
| --- | --- |
| „Yapaia“ fehlt im Add-on-Store | Store → ⋮ → **Nach Updates suchen**, Seite neu laden |
| „Yapaia Go gefunden“ erscheint nicht | Home Assistant einmal neu starten, das Add-on muss laufen |
| Go zeigt keine Karte | Karten verwalten → ist eine Karte installiert? Installationsprüfung öffnen |
| Route wird nicht berechnet | Nach einem Karten-Update 30 Sekunden warten; sonst Add-on neu starten |
| Kartenserver: „Token abgelehnt“ | Token neu kopieren, ohne Leerzeichen |
| Beat: kein Ton | Ausgabe prüfen (Mini-PC oder dieses Gerät?), Stick neu einstecken |
| Router schaltet nicht | Sensor **Umschaltung** ansehen; Diagnose herunterladen |

## Hilfe holen

Öffne ein Issue auf [GitHub](https://github.com/Yapaia/yapaia/issues). Hänge am besten das **Protokoll** des Add-ons an (Add-on → Reiter „Protokoll“) – damit lässt sich fast alles finden.
