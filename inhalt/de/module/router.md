---
titel: Yapaia Router
claim: Neues Land, richtige SIM. Von selbst.
kurz: Mobilfunk deines GL.iNet-Routers in Home Assistant – mit Signal, Roaming-Anzeige und automatischem SIM-Wechsel beim Grenzübertritt.
punkte: SIM 1 oder SIM 2 per Fingertipp | Wechselt automatisch nach Land | Signal, Netz, Roaming und Datenverbrauch im Blick | Lokal, ohne Cloud-Konto
icon: router
status: beta
reihenfolge: 3
handbuch: /docs/handbuch/router/
---

## Grenze? Kein Thema.

Wer viel in Europa unterwegs ist, hat oft zwei SIM-Karten: eine für zu Hause, eine fürs Lieblings-Reiseland. Nur umstecken oder umschalten vergisst man immer. Yapaia Router macht das für dich.

## So funktioniert der SIM-Wechsel nach Land

Das Modem bucht sich immer in ein Netz des Landes ein, in dem du gerade stehst – auch beim Roaming. Am **Ländercode des Netzes** erkennt Yapaia, wo du bist, ganz ohne GPS. Du legst einmal fest, welche SIM in welchem Land gelten soll, und schaltest **SIM nach Land** ein. Den Rest erledigt der Router beim Grenzübertritt.

## Was du in Home Assistant siehst

| | |
| --- | --- |
| **SIM-Auswahl** | Zeigt die aktive SIM, umschalten per Fingertipp. |
| **Land und Roaming** | In welchem Land du eingebucht bist, und ob du gerade roamst. |
| **Netz und Signal** | Anbieter, LTE oder 5G, Frequenzbänder, Signalstärke. |
| **Datenverbrauch** | Der Datenzähler des Routers. |
| **Auslöser** | „Land gewechselt“, „SIM gewechselt“, „SIM-Wechsel fehlgeschlagen“ – für deine Automationen. |

## Für welchen Router?

Gebaut für den **GL.iNet GL-X3000 (Spitz AX)** mit Firmware 4.x. Alles läuft lokal über die Schnittstelle des Routers – kein GL.iNet-Konto, keine Cloud.

> Der Befehl zum SIM-Wechsel ist von GL.iNet nicht dokumentiert. Yapaia probiert beim ersten Mal die bekannten Wege aus und merkt sich den, der bei deinem Router funktioniert.
