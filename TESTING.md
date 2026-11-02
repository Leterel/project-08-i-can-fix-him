# Tests und Reproduzierbarkeit — I Can Fix Him

## Voraussetzungen
Node 22+; Playwright und Chrome nur für Browserregressionen.

## Befehle
```text
npm test
node test/browser-pause.mjs
node test/browser-focus.mjs
```

Start/Build: npm start; lokale URL öffnen. Eigene Spielstände vor Experimenten exportieren.

## Tatsächlicher Befund vom 02.11.2026
11 Modelltests bestanden; Browser-Save/Navigation und vollständige Pauseprobe bestanden. Neuer echter Tabwechseltest besteht mit ausgeschalteter CDP-Fokusemulation; keine synthetischen Fokusereignisse. Kein universeller OS-Sperrtest.

Bei fehlenden Paketen/Hardware/Betriebssystemen ist das Ergebnis „nicht ausgeführt“, kein Pass. Plattformnachweise aus älteren Detailberichten gelten nur für die dort genannten Versionen. Android-Automatisierung ausschließlich mit expliziter emulator-Seriennummer und bestätigtem ro.kernel.qemu=1. Physische Geräte, persönliche Medien und Produktionskonten sind keine Testfixtures.

## Vor Merge
`git diff --check` ausführen; relevante Funktionstests wiederholen, wenn Codeänderungen ihren Befund entwerten. Speicherdaten/alte Versionen erhalten. Fehlende externe Abnahmen in HANDOFF.md benennen.

## Neue Folgebegegnung am 02.11.2026

`node --test test/*.test.mjs`: 14 Gruppen bestanden. Drei neue Gruppen prüfen Kontextbedingungen, unterschiedliche Kosten/Folgen, kein mehrfacher Grenzgewinn, Geldmangel, Erschöpfung und Rekonstruktion aus vorhandenen V1-Feldern.

`node test/browser-encounter.mjs`: drei Gruppen bestanden. Tatsächliche Dialogbuttons führen von Grenze→Zuhören→Eigenverantwortung, Save/Reload bewahrt den Kontext, fremden Fortschritt vermarkten senkt Vertrauen, erneute Finanzierung kostet Ressourcen, Touch öffnet weiterhin den Dialog bei 390px. Synthetischer V1-Startstand nahe Ronny; keine Nutzer-Spielstände verwendet. Bestehende `browser-save.mjs`- und `browser-pause.mjs`-Regressionsläufe anschließend bestanden. Neuer Fokusverlust-/OS-Sperrtest wurde nicht wiederholt, weil dessen Logik unverändert ist. Screenshotnachweise in test-results/encounter.
