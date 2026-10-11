# Änderungen

## 0.1.0

Die erste Fassung der Yapaia-Webseite.

- **Startseite**, **Modulseiten** (Go, Beat, Router, Satellite, Home Assistant), **Handbuch** (8 Kapitel) und **Technik** (Architektur, Anforderungen, Protokoll, Fähigkeiten, Entitäten, Offenheit) – auf Deutsch und Englisch.
- **Drei Designs** zum Vergleichen: *Horizont* (hell, warm), *Kompass* (dunkel, modern), *Logbuch* (Reisetagebuch). Eine Leiste unten schaltet um; das Standard-Design und die Leiste stellt man in `.env` ein.
- Läuft als **ein Docker-Container** (Caddy) auf dem VPS, holt die Zertifikate selbst und leitet auf Wunsch die Domain des Kartenservers an diesen weiter.
- Keine Cookies außer der Design-Wahl, kein Tracking, keine fremden Server – auch die Schriften liegen auf dem eigenen Server.
