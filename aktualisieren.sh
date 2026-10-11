#!/bin/sh
# Holt die neueste Version der Webseite und startet sie neu.
# Auf dem VPS im Ordner der Homebase:  ./aktualisieren.sh
# Automatisch jede Nacht um 4 Uhr (crontab -e):
#   0 4 * * * cd /opt/homebase && ./aktualisieren.sh >> aktualisieren.log 2>&1
set -e
cd "$(dirname "$0")"
git pull --ff-only
docker compose pull
docker compose up -d
docker image prune -f >/dev/null
echo "$(date '+%F %T') Homebase aktuell: $(docker compose exec -T homebase cat /srv/version.txt 2>/dev/null || echo '?')"
