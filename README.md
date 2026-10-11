# Yapaia Homebase

Die Webseite von **Yapaia**: Startseite, Modulseiten, Handbuch und Technik-Doku – auf Deutsch und Englisch, in **drei Designs**, die parallel laufen und sich per Knopfdruck umschalten lassen.

| Design | Stil |
| --- | --- |
| **Horizont** | hell, warm, Sonnenuntergang – freundlich für Einsteiger |
| **Kompass** | dunkel, modern, Bento-Raster – Premium-Produktseite |
| **Logbuch** | Reisetagebuch mit Papier, Stempeln, Serifenschrift – für Maker |

Die Seite läuft als **ein einziger Docker-Container** auf dem VPS, neben dem [Kartenserver](https://github.com/Yapaia/map-server). Sie ist die „Haustür“ des Servers: Sie holt die HTTPS-Zertifikate und leitet die Kartenserver-Adresse an den Kartenserver weiter. So streiten sich die beiden nie um die Ports 80 und 443.

```
Internet ──▶ :80/:443  Homebase (Caddy)
                        ├─ yapaia.de          → Webseite (3 Designs)
                        └─ karten.yapaia.de   → 127.0.0.1:8080  Kartenserver
```

---

## Installation auf dem VPS

### 1. DNS-Einträge setzen

Bei deinem Domain-Anbieter zwei **A-Einträge** auf die IP-Adresse des VPS anlegen:

| Name | Typ | Ziel |
| --- | --- | --- |
| `@` (also `yapaia.de`) | A | IP des VPS |
| `karten` (also `karten.yapaia.de`) | A | IP des VPS |

Es kann bis zu einer Stunde dauern, bis die Einträge überall bekannt sind.

### 2. Docker installieren (falls noch nicht da)

```bash
curl -fsSL https://get.docker.com | sh
```

### 3. Kartenserver so einstellen, dass er nur lokal lauscht

Im Ordner des Kartenservers in dessen `.env`:

```bash
BINDEN=127.0.0.1
OEFFENTLICHE_URL=https://karten.yapaia.de
```

und ihn **ohne** sein eigenes HTTPS starten (nicht mit `--profile https`):

```bash
docker compose up -d
```

### 4. Homebase holen und starten

```bash
cd /opt
git clone https://github.com/Yapaia/homebase.git
cd homebase
cp .env.beispiel .env
nano .env
```

In `.env` eintragen:

```bash
SEITE_DOMAIN=yapaia.de
KARTEN_DOMAIN=karten.yapaia.de
STANDARD_DESIGN=horizont
VORSCHAU=1
```

Speichern (`Strg+O`, `Enter`, `Strg+X`) und starten:

```bash
docker compose up -d
```

Fertig. Nach einer Minute ist die Seite unter `https://yapaia.de` erreichbar, der Kartenserver unter `https://karten.yapaia.de`.

> **Firewall:** Die Ports **80** und **443** müssen offen sein. Port 8080 bleibt zu – der Kartenserver ist nur noch über die Homebase erreichbar.

### Ohne Domain ausprobieren

`SEITE_DOMAIN` leer lassen – dann läuft die Seite per HTTP direkt unter `http://<IP-des-VPS>`.

---

## Die drei Designs vergleichen

Solange `VORSCHAU=1` gesetzt ist, steht unten auf jeder Seite eine kleine Leiste: **Horizont · Kompass · Logbuch**. Ein Tipp schaltet um; der Browser merkt sich die Wahl.

Zum Weitergeben gibt es feste Links, die das Design setzen:

- `https://yapaia.de/design/horizont`
- `https://yapaia.de/design/kompass`
- `https://yapaia.de/design/logbuch`

### Wenn das Design feststeht

In `.env`:

```bash
STANDARD_DESIGN=kompass   # das gewählte Design
VORSCHAU=0                # Leiste ausblenden
```

und `docker compose up -d`. Besucher, die vorher ein anderes Design angeklickt haben, sehen es weiter, bis sie ihr Cookie löschen – der Standard gilt für alle anderen.

---

## Aktualisieren

```bash
cd /opt/homebase
./aktualisieren.sh
```

Das holt die neueste Version vom GitHub-Container-Register und startet neu. Ganz automatisch jede Nacht um 4 Uhr – einmal `crontab -e` und diese Zeile anhängen:

```
0 4 * * * cd /opt/homebase && ./aktualisieren.sh >> aktualisieren.log 2>&1
```

---

## Texte ändern – ohne Programmieren

Alle Texte liegen als einfache Textdateien (Markdown) im Ordner [`inhalt/`](inhalt/). Ändern geht direkt auf GitHub im Browser, auch auf dem iPad:

1. Datei öffnen, z. B. `inhalt/de/docs/handbuch/installation.md`.
2. Auf den **Stift** (Edit) tippen, Text ändern.
3. **Commit changes** → „Create a new branch and start a pull request“ → **Propose changes** → **Create pull request**.
4. Die Prüfung läuft automatisch (baut alle Designs, prüft alle Links). Ist sie grün: **Merge**.
5. Nach dem Merge baut GitHub das neue Image. Auf dem VPS `./aktualisieren.sh` – oder bis zur nächsten Nacht warten.

| Was | Wo |
| --- | --- |
| Startseite (Überschriften, Szenarien, Fragen) | `inhalt/start.mjs` – je ein Block `de` und `en` |
| Modulseiten | `inhalt/<sprache>/module/<modul>.md` |
| Handbuch | `inhalt/<sprache>/docs/handbuch/*.md` |
| Technik | `inhalt/<sprache>/docs/technik/*.md` |
| Impressum, Datenschutz | `inhalt/<sprache>/seiten/*.md` |
| Bilder | `assets/bilder/` – im Text als `![Beschreibung](/assets/bilder/name.png)` |

Jede Markdown-Datei beginnt mit einem kleinen Kopf:

```markdown
---
titel: Installation
kurz: Ein Satz, der unter der Überschrift und in der Übersicht steht.
reihenfolge: 1
---
```

`reihenfolge` bestimmt die Position im Menü. Ein neues Kapitel = neue Datei in **beiden** Sprachen (die Prüfung meldet, wenn eine fehlt).

### Bitte zuerst: Impressum ausfüllen

`inhalt/de/seiten/impressum.md` und `inhalt/en/seiten/impressum.md` enthalten Platzhalter in eckigen Klammern (`[Vorname Nachname]` …). Eine deutsche Webseite braucht ein vollständiges Impressum. Solange Platzhalter drinstehen, warnt der Bau.

---

## Für Entwickler

```bash
npm ci
npm test            # baut alle Designs und prüft Seiten, Sprachen, Links
npm run vorschau    # lokal auf http://localhost:4321
```

| Ordner | Inhalt |
| --- | --- |
| `bau/` | der Generator (Node, ohne Framework): Markdown → HTML, gemeinsame Bausteine, Basis-CSS |
| `designs/<name>/` | je Design: `vorlage.mjs` (Startseite, Kopf, Fuß) und `stil.css` |
| `inhalt/` | alle Texte |
| `assets/` | Bilder |
| `server/start.sh` | erzeugt die Caddy-Konfiguration aus `.env` |

Ein Design bekommt dieselben Daten wie die anderen; nur Startseite, Kopf, Fuß und CSS unterscheiden sich. Unterseiten (Module, Doku) nutzen gemeinsame Bausteine aus `bau/html.mjs` – ein Text wird nur einmal gepflegt.

Kartendaten in Bildern: © OpenStreetMap-Mitwirkende.
