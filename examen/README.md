# Oefenexamen

De vragen en teksten van het oefenexamen op [bakspa.nl/oefenexamen/](https://bakspa.nl/oefenexamen/) en de vervolgpagina [bakspa.nl/opfrissen-of-certificeren/](https://bakspa.nl/opfrissen-of-certificeren/).

| Bestand | Inhoud |
|---|---|
| `teksten.yml` | Instellingen (aantal vragen, seconden, slaaggrens), de rollen, alle teksten in NL en EN, en de pagina *Opfrissen of certificeren* |
| `basis.yml` | Algemene SAFe®-stellingen voor elke rol (ongeveer een derde van elk examen) |
| `rte.yml`, `sm.yml`, `po.yml`, `pm.yml`, `architect.yml`, `team.yml` | Stellingen per rol (ongeveer twee derde van een examen voor die rol). Business Owner (`bo.yml`) volgt nog. |

## Een stelling toevoegen of aanpassen

```yaml
- id: rte-142          # uniek, nooit hergebruiken
  antwoord: onwaar     # waar of onwaar
  nl: De RTE schrijft de PI objectives van de teams.
  en: The RTE writes the teams' PI objectives.
```

- **Kort houden.** Een speler heeft 7 seconden om te lezen én te antwoorden. Houd het onder de 14 woorden.
- **Id nooit hergebruiken.** Haal je een stelling weg, gebruik het id dan niet opnieuw. De browser van de speler onthoudt welke id's die al zag, en later tellen we per id hoe vaak een stelling getoond en goed beantwoord wordt.
- **Ongeveer 40% onwaar.** Anders slaagt iemand al door steeds "waar" te kiezen.
- **Geen officiële examenvragen.** Schrijf eigen stellingen, afgeleid van de stof.
- Begint de tekst met een aanhalingsteken, of staat er een dubbele punt (`:`) of `#` in, zet hem dan tussen aanhalingstekens.

Een fout (dubbel id, ontbrekend antwoord of ontbrekende vertaling) laat de build falen, met in de foutmelding welk bestand en welke stelling.

## Een nieuwe rol aanzetten

1. Maak een bestand met de code van de rol, bijvoorbeeld `sm.yml`, met id's als `sm-001`.
2. De code staat al in `teksten.yml` onder `rollen`. Zodra het bestand minstens `minimum_vragen_rol` stellingen heeft (nu 40), is de rol op de site te kiezen. Tot die tijd staat er "binnenkort".

Elk examen trekt eerst stellingen die de speler nog niet zag. Pas als alles voor die rol gezien is, begint de rol opnieuw. Per examen komen ongeveer 20 stellingen uit de rol. Met 140 RTE-stellingen speel je zo zeven keer zonder herhaling, met ongeveer 65 stellingen (de andere rollen) drie keer. Meer stellingen = vaker spelen.
