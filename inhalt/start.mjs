/**
 * Die Startseite als Daten. Jedes Design ordnet diese Bausteine anders an –
 * der Text wird trotzdem nur hier gepflegt.
 *
 * Die Module selbst (Name, Versprechen, Punkte) kommen aus
 * inhalt/<sprache>/module/*.md, damit Startseite und Modulseite nie
 * voneinander abweichen.
 */

export default {
  de: {
    titel: 'Yapaia – dein Wohnmobil wird smart',
    beschreibung:
      'Offline-Navigation für dein Fahrzeug, Radio ohne Internet, automatischer SIM-Wechsel an der Grenze – alles in Home Assistant, alles lokal in deinem Camper.',
    held: {
      kicker: 'Smart RV Solutions',
      titel: 'Dein Zuhause auf Rädern wird smart.',
      titelKurz: 'Freiheit braucht kein Netz.',
      untertitel:
        'Navigation, die weiß, wie hoch dein Camper ist. Radio ohne Internet. SIM-Karten, die an der Grenze von selbst wechseln. Alles in Home Assistant – und alles läuft offline in deinem Fahrzeug.',
      knopf: 'Jetzt installieren',
      knopf2: 'Module entdecken',
      fakten: [
        { zahl: '100 %', text: 'offline unterwegs' },
        { zahl: '0', text: 'Cloud-Konten, 0 Abos' },
        { zahl: '1', text: 'Zentrale: Home Assistant' },
      ],
    },
    versprechen: {
      titel: 'Gebaut für die Straße, nicht fürs Rechenzentrum',
      punkte: [
        { icon: 'offline', titel: 'Funktioniert auch am Ende der Welt', text: 'Karten, Routen, Suche und Radio laufen auf dem Rechner in deinem Fahrzeug. Kein Netz am Pass? Kein Roaming in Norwegen? Egal.' },
        { icon: 'massband', titel: 'Kennt deine Maße', text: 'Höhe, Breite, Länge, Gewicht: Yapaia Go schickt dich nicht unter die 3-Meter-Brücke, wenn dein Camper 3,20 m hoch ist.' },
        { icon: 'haus', titel: 'Alles an einem Ort', text: 'Jedes Modul erscheint in Home Assistant als Gerät mit Anzeigen, Schaltern und Auslösern. Antippen statt programmieren.' },
        { icon: 'offen', titel: 'Offen gebaut', text: 'Quelltext auf GitHub, dokumentierte Schnittstellen, Karten von OpenStreetMap. Reinschauen, mitbauen, erweitern.' },
      ],
    },
    module: {
      titel: 'Ein Baukasten für dein mobiles Zuhause',
      text: 'Nimm, was du brauchst. Jedes Modul läuft für sich – zusammen können sie mehr.',
    },
    schritte: {
      titel: 'In drei Schritten startklar',
      liste: [
        { titel: 'Rechner einbauen', text: 'Ein kleiner Mini-PC mit Home Assistant – viele Camper haben ihn schon an Bord.' },
        { titel: 'Yapaia hinzufügen', text: 'Eine Adresse im Add-on-Store eintragen, Module antippen, installieren. Kein Terminal, kein Code.' },
        { titel: 'Losfahren', text: 'Karte laden, Fahrzeug eintragen, fertig. Den Rest erledigt Yapaia unterwegs.' },
      ],
    },
    szenarien: {
      titel: 'Dein Camper denkt mit',
      text: 'Weil alle Module in Home Assistant zusammenlaufen, wird aus „Ich muss noch …“ ein „Ist schon passiert“.',
      liste: [
        { icon: 'ziel', wenn: 'Noch 30 Minuten bis zum Stellplatz', dann: 'Boiler und Heizung gehen an – du kommst in ein warmes Zuhause.' },
        { icon: 'sim', wenn: 'Grenze nach Österreich', dann: 'Der Router wechselt von selbst auf deine österreichische SIM.' },
        { icon: 'tacho', wenn: 'Zu schnell für 7,5 Tonnen', dann: 'Eine Ansage mischt sich leise ins laufende Radio.' },
        { icon: 'haus', wenn: 'Angekommen', dann: 'Licht an, Radio leiser, Erinnerung an die Stützen.' },
      ],
    },
    maker: {
      kicker: 'Für Maker und Bastler',
      titel: 'Alles offen. Alles erweiterbar.',
      text: 'Du baust an deinem Fahrzeug, bis es genau so ist, wie du willst? Dann wirst du dich hier wohlfühlen.',
      punkte: [
        'Ein offenes Protokoll: Module beschreiben sich selbst – Home Assistant baut daraus Geräte und Entitäten.',
        'Jede Funktion als Aktion und Auslöser für deine Automationen – im Editor, ohne YAML.',
        'Eigene Kartenpakete: Regionen kombinieren und fertig gebaut herunterladen.',
        'Läuft auf x86-64 und ARM64, als Home-Assistant-Add-on.',
      ],
      knopf: 'Zur Technik-Doku',
      code: `alias: "Warm ankommen"
triggers:
  - trigger: numeric_state
    entity_id: sensor.yapaia_go_restweg
    below: 30   # km
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.boiler`,
    },
    kartenserver: {
      kicker: 'Kartenserver',
      titel: 'Karten, fertig gebacken',
      text: 'Ganz Deutschland selbst berechnen dauert auf einem Mini-PC Stunden. Mit dem Yapaia-Kartenserver lädt Go fertige Pakete – Karte, Adresssuche und Routing in einem – und prüft jedes Byte, bevor es eingewechselt wird.',
      knopf: 'So funktioniert’s',
    },
    fragen: {
      titel: 'Gute Fragen',
      liste: [
        { frage: 'Brauche ich unterwegs Internet?', antwort: 'Nein. Internet brauchst du nur zum Installieren und für Kartenupdates. Navigation, Suche und Radio laufen komplett offline.' },
        { frage: 'Welche Hardware brauche ich?', antwort: 'Einen Rechner mit Home Assistant OS – ein N100-Mini-PC mit 8 GB RAM ist ideal. Dazu einen USB-GPS-Empfänger, fürs Radio einen RTL-SDR-Stick.' },
        { frage: 'Muss ich programmieren können?', antwort: 'Nein. Alles geht über die Oberfläche von Home Assistant. Wer mag, kann trotzdem tief einsteigen.' },
        { frage: 'Muss ich alle Module nehmen?', antwort: 'Nein. Jedes Modul läuft für sich. Zusammen können sie mehr – etwa Navigationsansagen, die sich ins Radio mischen.' },
        { frage: 'Gibt es ein Abo?', antwort: 'Nein. Kein Abo, kein Konto, keine Cloud. Deine Daten bleiben in deinem Fahrzeug.' },
      ],
    },
    schluss: {
      titel: 'Bereit für die nächste Tour?',
      text: 'Installiert an einem Nachmittag – ohne Terminal, ohne Cloud.',
      knopf: 'Installation starten',
    },
  },

  en: {
    titel: 'Yapaia – your motorhome gets smart',
    beschreibung:
      'Offline navigation for your vehicle, radio without internet, automatic SIM switching at the border – all in Home Assistant, all running locally in your camper.',
    held: {
      kicker: 'Smart RV Solutions',
      titel: 'Your home on wheels gets smart.',
      titelKurz: 'Freedom needs no signal.',
      untertitel:
        'Navigation that knows how tall your camper is. Radio without internet. SIM cards that switch by themselves at the border. All in Home Assistant – and all running offline in your vehicle.',
      knopf: 'Install now',
      knopf2: 'Explore modules',
      fakten: [
        { zahl: '100 %', text: 'offline on the road' },
        { zahl: '0', text: 'cloud accounts, 0 subscriptions' },
        { zahl: '1', text: 'hub: Home Assistant' },
      ],
    },
    versprechen: {
      titel: 'Built for the road, not the data centre',
      punkte: [
        { icon: 'offline', titel: 'Works at the end of the world', text: 'Maps, routes, search and radio run on the computer in your vehicle. No signal on the pass? No roaming in Norway? Doesn’t matter.' },
        { icon: 'massband', titel: 'Knows your size', text: 'Height, width, length, weight: Yapaia Go won’t send your 3.20 m camper under a 3 m bridge.' },
        { icon: 'haus', titel: 'Everything in one place', text: 'Every module shows up in Home Assistant as a device with sensors, switches and triggers. Tap instead of code.' },
        { icon: 'offen', titel: 'Built in the open', text: 'Source on GitHub, documented interfaces, maps from OpenStreetMap. Look inside, build along, extend it.' },
      ],
    },
    module: {
      titel: 'A toolkit for your mobile home',
      text: 'Take what you need. Every module works on its own – together they do more.',
    },
    schritte: {
      titel: 'Ready in three steps',
      liste: [
        { titel: 'Add a computer', text: 'A small mini-PC running Home Assistant – many campers already have one on board.' },
        { titel: 'Add Yapaia', text: 'Enter one address in the add-on store, tap the modules, install. No terminal, no code.' },
        { titel: 'Hit the road', text: 'Load a map, enter your vehicle, done. Yapaia takes care of the rest on the way.' },
      ],
    },
    szenarien: {
      titel: 'Your camper thinks ahead',
      text: 'Because every module meets in Home Assistant, “I still need to …” becomes “already done”.',
      liste: [
        { icon: 'ziel', wenn: '30 minutes to the campsite', dann: 'Water heater and heating switch on – you arrive to a warm home.' },
        { icon: 'sim', wenn: 'Crossing into Austria', dann: 'The router switches to your Austrian SIM by itself.' },
        { icon: 'tacho', wenn: 'Too fast for 7.5 tonnes', dann: 'A gentle announcement blends into the radio.' },
        { icon: 'haus', wenn: 'Arrived', dann: 'Lights on, radio down, a reminder about the levelling jacks.' },
      ],
    },
    maker: {
      kicker: 'For makers and tinkerers',
      titel: 'Everything open. Everything extensible.',
      text: 'You keep building on your vehicle until it is exactly how you want it? You’ll feel at home here.',
      punkte: [
        'An open protocol: modules describe themselves – Home Assistant builds devices and entities from that.',
        'Every feature as an action and trigger for your automations – in the editor, no YAML required.',
        'Your own map packages: combine regions and download them ready-built.',
        'Runs on x86-64 and ARM64, as a Home Assistant add-on.',
      ],
      knopf: 'Technical docs',
      code: `alias: "Arrive warm"
triggers:
  - trigger: numeric_state
    entity_id: sensor.yapaia_go_restweg
    below: 30   # km
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.boiler`,
    },
    kartenserver: {
      kicker: 'Map server',
      titel: 'Maps, ready-baked',
      text: 'Building all of Germany on a mini-PC takes hours. With the Yapaia map server, Go downloads finished packages – map, address search and routing in one – and verifies every byte before swapping them in.',
      knopf: 'How it works',
    },
    fragen: {
      titel: 'Good questions',
      liste: [
        { frage: 'Do I need internet on the road?', antwort: 'No. You only need internet to install and to update maps. Navigation, search and radio run completely offline.' },
        { frage: 'What hardware do I need?', antwort: 'A computer running Home Assistant OS – an N100 mini-PC with 8 GB RAM is ideal. Plus a USB GPS receiver and, for radio, an RTL-SDR stick.' },
        { frage: 'Do I have to code?', antwort: 'No. Everything works through the Home Assistant interface. If you want to, you can still dive deep.' },
        { frage: 'Do I need every module?', antwort: 'No. Each module works on its own. Together they do more – like navigation announcements blending into the radio.' },
        { frage: 'Is there a subscription?', antwort: 'No. No subscription, no account, no cloud. Your data stays in your vehicle.' },
      ],
    },
    schluss: {
      titel: 'Ready for the next trip?',
      text: 'Installed in an afternoon – no terminal, no cloud.',
      knopf: 'Start installing',
    },
  },
};
