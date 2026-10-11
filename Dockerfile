# Yapaia Homebase: die Webseite, fertig gebaut, ausgeliefert von Caddy.
#
# Stufe 1 baut alle Designs mit Node, Stufe 2 ist nur Caddy plus die
# fertigen Dateien – kein Node im laufenden Container.

FROM node:22-alpine AS bau
WORKDIR /bau
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY bau ./bau
COPY designs ./designs
COPY inhalt ./inhalt
COPY assets ./assets
RUN npm run bau

FROM caddy:2.8-alpine
LABEL org.opencontainers.image.source="https://github.com/Yapaia/homebase" \
      org.opencontainers.image.description="Die Webseite von Yapaia – drei Designs, Deutsch und Englisch."
COPY --from=bau /bau/dist /srv
COPY server/start.sh /usr/local/bin/homebase-start
RUN chmod +x /usr/local/bin/homebase-start
ENV SEITE_WURZEL=/srv \
    CADDYFILE=/etc/caddy/Caddyfile \
    STANDARD_DESIGN=horizont \
    VORSCHAU=1
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD wget -qO- "http://127.0.0.1:${HTTP_PORT:-80}/healthz" >/dev/null || exit 1
ENTRYPOINT ["homebase-start"]
