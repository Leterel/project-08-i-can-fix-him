# Agentenleitfaden — I Can Fix Him

## Einstieg
Satirische lokale Sandbox mit NPCs, Entscheidungen, Konsequenzen, Karte, Spielständen und bewusster Pause.

Lies README.md, TESTING.md und HANDOFF.md. Anforderungen und vorhandene Funktionen unterscheiden. Technische Grundlagen: README.md. Die bestehenden Detaildokumente bleiben maßgeblich; keine leeren SPEC-/ARCHITECTURE-/TODO-Kopien erzeugen. Offene Arbeit und Verlauf: PROGRESS.md; konkrete Einnahmegrenzen: MONETIZATION.md, soweit vorhanden.

## Umgebung und Start
Node 22+; Playwright und Chrome nur für Browserregressionen.

npm start; lokale URL öffnen. Eigene Spielstände vor Experimenten exportieren.

Tests: `npm test; node test/browser-pause.mjs; node test/browser-focus.mjs`. Bei mehreren Befehlen einzeln ausführen und jeden Exitcode prüfen. Vorhandene Installationen verwenden; fehlende Voraussetzungen melden statt automatisch globale Pakete oder Modelle zu installieren.

## Grenzen
- Größere Änderungen auf einem eigenen Branch; zuerst git status und fremde Änderungen prüfen. Keine parallelen widersprüchlichen Arbeiten am selben Branch.
- Keine Dateien/Repos löschen oder verschieben, keine Historien umschreiben, kein Force-Push. Keine Lizenzänderungen ohne konkrete Freigabe.
- Keine Secrets, privaten Daten, echten Nutzerinhalte oder großen generierten Dateien committen. Keine Sichtbarkeitsänderungen oder zusätzlichen Veröffentlichungen ohne Freigabe.
- Keine bezahlten Dienste, Werbenetzwerke, Zahlungsanbieter oder externe Nachrichten aktivieren.
- Saveformat/IDs erhalten. Schwierige Themen als Fiktion behandeln, Gewalt nicht verherrlichen. Keine Nutzer-Spielstände löschen oder überschreiben.
- Projektwerkzeuge ändern keine anderen Projektquellen. Build-/Testartefakte in isolierten, ignorierten Arbeitsordnern halten. Vorhandene Ausgaben nicht unbesehen überschreiben.

## Nächste sichere Etappe
Ronnys Folgebegegnung ist implementiert und lokal geprüft. Als Nächstes Spielfluss, verständliche Konsequenzen und Schwierigkeit mit einer Testperson abnehmen.

## Übergabe
HANDOFF.md aktualisieren: Ausgangscommit/Branch, konkrete Änderungsliste, ausgeführte Befehle, Ergebnis, ausgelassene Tests samt Grund, Risiken und nächste Etappe. Nur tatsächlich ausgeführte Tests als bestanden ausweisen. Vor Merge Diff und Tests prüfen; externe Freigaben bleiben offen.
