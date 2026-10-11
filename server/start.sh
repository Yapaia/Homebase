#!/bin/sh
# Schreibt die Caddy-Konfiguration aus den Umgebungsvariablen (.env) und
# startet Caddy. Eine Datei, die man nie von Hand anfassen muss.
#
#   SEITE_DOMAIN     yapaia.de        Adresse der Webseite. Leer = nur HTTP auf Port 80.
#   SEITE_WWW        ja|nein          www.<domain> auf <domain> umleiten (Standard: ja)
#   KARTEN_DOMAIN    karten.yapaia.de Optional: leitet auf den Kartenserver weiter.
#   KARTEN_ZIEL      127.0.0.1:8080   Wo der Kartenserver lauscht.
#   STANDARD_DESIGN  horizont         Design für alle, die keins gewählt haben.
#   VORSCHAU         1|0              Umschalt-Leiste für die Designs zeigen.
#   ACME_EMAIL       du@example.org   Optional: für Let's-Encrypt-Hinweise.
#   HTTP_PORT/HTTPS_PORT              Nur zum Testen ändern (Standard 80/443).
set -eu

WURZEL="${SEITE_WURZEL:-/srv}"
ZIEL="${CADDYFILE:-/etc/caddy/Caddyfile}"
STANDARD_DESIGN="${STANDARD_DESIGN:-horizont}"
case "$STANDARD_DESIGN" in horizont|kompass|logbuch) ;; *)
  echo "STANDARD_DESIGN=$STANDARD_DESIGN ist unbekannt (horizont, kompass, logbuch) – nehme horizont." >&2
  STANDARD_DESIGN=horizont ;;
esac
HTTP_PORT="${HTTP_PORT:-80}"
HTTPS_PORT="${HTTPS_PORT:-443}"

if [ -n "${SEITE_DOMAIN:-}" ]; then
  ADRESSE="$SEITE_DOMAIN"
else
  ADRESSE=":$HTTP_PORT"
fi

{
  echo "{"
  echo "  http_port $HTTP_PORT"
  echo "  https_port $HTTPS_PORT"
  [ -n "${ACME_EMAIL:-}" ] && echo "  email $ACME_EMAIL"
  [ -z "${SEITE_DOMAIN:-}" ] && echo "  auto_https off"
  echo "  servers {"
  echo "    protocols h1 h2"
  echo "  }"
  echo "}"
  echo
  cat <<CADDY
(seite) {
	encode zstd gzip
	root * $WURZEL/{design}
	header {
		X-Content-Type-Options nosniff
		Referrer-Policy strict-origin-when-cross-origin
		X-Frame-Options SAMEORIGIN
		Permissions-Policy "geolocation=(), camera=(), microphone=()"
		-Server
	}

	map {cookie.design} {design} {
		horizont horizont
		kompass kompass
		logbuch logbuch
		default $STANDARD_DESIGN
	}

	@designwahl path_regexp wahl ^/design/(horizont|kompass|logbuch)/?$
	handle @designwahl {
		header Set-Cookie "design={re.wahl.1}; Path=/; Max-Age=31536000; SameSite=Lax"
		redir * / 302
	}

	handle /_vorschau.js {
CADDY
  if [ "${VORSCHAU:-1}" = "1" ]; then
    echo "		root * $WURZEL/_vorschau"
    echo "		header Cache-Control no-store"
    echo "		file_server"
  else
    echo "		header Content-Type \"text/javascript; charset=utf-8\""
    echo "		respond \"\" 200"
  fi
  cat <<CADDY
	}

	handle /healthz {
		respond "ok" 200
	}

	@englisch {
		path /
		header_regexp Accept-Language ^en
	}
	redir @englisch /en/ 302
	redir / /de/ 302

	handle /assets/* {
		header Cache-Control "public, max-age=604800"
		file_server
	}

	handle {
		header Cache-Control "no-cache"
		header Vary Cookie
		try_files {path} {path}/index.html
		file_server
	}

	handle_errors 404 {
		@en path /en/*
		rewrite @en /en/404.html
		rewrite * /de/404.html
		file_server
	}
}

$ADRESSE {
	import seite
}
CADDY
  if [ -n "${SEITE_DOMAIN:-}" ] && [ "${SEITE_WWW:-ja}" = "ja" ]; then
    echo
    echo "www.$SEITE_DOMAIN {"
    echo "	redir https://$SEITE_DOMAIN{uri} 301"
    echo "}"
  fi
  if [ -n "${SEITE_DOMAIN:-}" ]; then
    # Für den Gesundheitscheck im Container (ohne Domain, ohne HTTPS).
    echo
    echo "http://127.0.0.1:$HTTP_PORT {"
    echo "	respond /healthz \"ok\" 200"
    echo "}"
  fi
  if [ -n "${KARTEN_DOMAIN:-}" ]; then
    echo
    echo "$KARTEN_DOMAIN {"
    echo "	reverse_proxy ${KARTEN_ZIEL:-127.0.0.1:8080} {"
    echo "		flush_interval -1"
    echo "	}"
    echo "}"
  fi
} > "$ZIEL"

echo "Yapaia Homebase: Webseite ${SEITE_DOMAIN:-auf Port $HTTP_PORT}, Standard-Design $STANDARD_DESIGN, Vorschau ${VORSCHAU:-1}${KARTEN_DOMAIN:+, Kartenserver unter $KARTEN_DOMAIN}"
[ "${NUR_KONFIG:-0}" = "1" ] && exit 0
exec caddy run --config "$ZIEL" --adapter caddyfile
