# Discordbot
# Pawianberaters Praktikant by MaksymilianOE / Pawiancoder

Bissl Text zum lesen damit es nicht langweilig wird:
Hallo! Ich bin Maksy und programmiere aktiv seit 2 Jahren (2021)
Als ich mit JS angefangen habe, habe ich recht schnell die Discord API entdeckt.
Also hab ich mit hingesetzt und programmiert

Es hat viel Spaß gemacht und zum lernen ist das super!

**Statistiken für die, die es interessiert:**
- Zeilen Code:
      
  - Commands: 202 Zeilen Code
  - anderes (index.js & commandDeploy etc): 230 Zeilen Code
- Anzahl Commands: 5:
1. Event erstellen per Command
2. Minigames (Subcommand => 2 Commands in einem)
3. Status (Per rolle)
4. ping (test)
          

Um den Bot selber zu nutzen:
1. Im Discord Developer Portal einen Bot erstellen (https://discord.com/developers/applications)
2. Einen Server erstellen/beitreten (In Discord)
3. Die unteren Daten in eine .env Datei packen (!wichtig sie MUSS .env heißen und nicht .env.txt!)
    - Falls das nicht geht: Windows Explorer: Oben auf Ansicht -> und Haken bei "Dateinamenerweiterung"

- Diese Daten in eine .env Datei schreiben:

- application_id 
- BOTTOKEN 
- CLIENTID 
- GUILDID

- Bsp:
- application_id = 1234567890
- BOTTOKEN = 123456789
- CLIENTID = 1234567890
- GUILDID = 1234567890
- dndrole* = 1234567890
- offlinerole* = 1234567890
- onlinerole* = 1234567890

*DND = DoNotDisturb (Bitte nicht stören) => Die IDS mit Stern sind Rollen! Die kann man frei erstellen muss aber die ID der Rolle einfügen!

- **Die Namen müssen GENAUSO sein! Sonst wird es nicht funktionieren!**
  

  Bitte Credits geben und nicht als eigenes Projekt ausgeben!
  
  Das Projekt ist mit NodeJS (Javascript) erstellt. Falls du das noch nicht installiert hast:
  https://nodejs.org/de (Seite stand 10/2023)
  
  - Um den Bot zu starten:
  1. **npm run Server**
  2. **npm run Bot**
     - Die Reihenfolge ist aber egal
  
  Ansonsten viel Spaß bei nutzen des Bots
  Fragen und Ideen/Fehlermeldungen sind erwünscht :D
