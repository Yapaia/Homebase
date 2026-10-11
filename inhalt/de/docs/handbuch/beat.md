---
titel: Yapaia Beat benutzen
kurz: Sender suchen, Favoriten anlegen, Ton dahin schicken, wo du ihn hören willst.
reihenfolge: 4
---

## Anschließen

- RTL-SDR-Stick an den Home-Assistant-Rechner stecken – am besten über ein kurzes USB-Verlängerungskabel und nicht direkt neben USB-3-Anschlüssen (die stören den Empfang).
- Antenne für **UKW und DAB+**: Für starke Sender reicht eine Teleskopantenne, im Camper ist eine aktive Dachantenne ideal.

## Erster Suchlauf

1. Seitenleiste → **Yapaia Beat**.
2. **Suchlauf** → UKW, DAB+ oder beides.
3. Nach ein paar Minuten steht die Senderliste. Mit ☆ machst du einen Sender zum Favoriten.

## Wo kommt der Ton raus?

Wie bei „Mit einem Gerät verbinden“ wählst du die Ausgabe:

- **Mini-PC** – Lautsprecher am Home-Assistant-Rechner
- **Dieses Gerät** – das Tablet oder Handy, mit dem du gerade bedienst
- **Andere Lautsprecher** – jeder Mediaplayer in Home Assistant, der Musik von einer Adresse spielen kann

## Die Radiokarte fürs Dashboard

Im Dashboard **Karte hinzufügen → „Yapaia Beat“**. Wähle „retro“ (Holz und LCD) oder „modern“.

```yaml
type: custom:yapaia-beat-card
entity: media_player.yapaia_beat
style: retro
```

![Die Radiokarten im Dashboard](/assets/bilder/beat-dashboard.png)

## Unterwegs: Senderverfolgung

Wird der Empfang schlecht, sucht Beat denselben Sender auf einer besseren Frequenz, auf einem anderen DAB-Kanal oder wechselt zwischen UKW und DAB+. Ein- und ausschalten lässt sich das mit dem Schalter **Senderverfolgung**.

> Mit einem **zweiten Stick** sucht Beat im Hintergrund, während das Radio weiterspielt – ohne Unterbrechung.
