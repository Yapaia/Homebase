---
titel: Yapaia Router einrichten
kurz: GL.iNet-Router verbinden, SIM-Karten den Ländern zuordnen, automatisch wechseln lassen.
reihenfolge: 5
---

## Verbinden

1. **Einstellungen → Geräte & Dienste → Integration hinzufügen** → **Yapaia**.
2. **GL.iNet-Router** wählen.
3. Eintragen:
    - Adresse: `192.168.8.1` (oder die Adresse deines Routers)
    - Benutzername: `root`
    - Passwort: das Admin-Passwort der Router-Oberfläche

Danach erscheint das Gerät **Yapaia Router** mit allen Anzeigen.

## SIM nach Land

Beim Gerät auf **Konfigurieren**:

| Einstellung | Beispiel |
| --- | --- |
| SIM nach Land | an |
| Länder für SIM 1 | `DE` |
| Länder für SIM 2 | `AT, CH, IT` |
| Alle anderen Länder | nicht wechseln, SIM 1 oder SIM 2 |
| Wartezeit nach Landwechsel | 3 Minuten |

Die Wartezeit verhindert Hin und Her in Grenznähe: Erst wenn das neue Land einige Minuten stabil ist, wird gewechselt.

> **Wichtig:** Schalte in der Router-Oberfläche die eigene **Auto-Switch**-Funktion des Routers aus. Zwei, die umschalten, arbeiten gegeneinander.

## Das erste Umschalten

GL.iNet hat den Befehl zum SIM-Wechsel nicht veröffentlicht. Beim ersten Mal probiert Yapaia deshalb die bekannten Wege aus und wartet jeweils, ob der Router die neue SIM wirklich meldet. Das kann **ein paar Minuten** dauern. Danach merkt sich Yapaia den Weg und schaltet sofort um.

Klappt keiner, bekommst du eine Benachrichtigung. Dann unter **Geräte & Dienste → Yapaia → Yapaia Router → ⋮ → Diagnose herunterladen** – die Datei hilft uns, den richtigen Befehl zu finden. Passwörter und Kartennummern sind darin geschwärzt.

## Eigene Automationen

Statt der fertigen Automatik kannst du auch selbst bauen: Auslöser **Land gewechselt**, Aktion **SIM wählen**. Oder: Bei „Roaming an“ eine Nachricht aufs Handy.
