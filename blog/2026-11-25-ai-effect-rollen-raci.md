---
title: "Wat doet AI met de rollen in je ART? De RACI van nu en straks"
slug: ai-effect-rollen-raci
date: 2026-11-25T09:00:00
description: "Wie doet wat in een ART volgens de SAFe-trainingen, en wat verschuift er als je AI vergaand toepast? Een RACI van nu en een RACI met AI naast elkaar: welke rollen minder worden, welke veranderen en welke verdwijnen."
image: /img/blog/ai-effect-rollen-raci.png
hide_table_of_contents: true
unlisted: true
---

![Illustratie: twee kleine RACI-tabellen naast elkaar. Links "Nu, volgens de trainingen" met de kolommen PO, RTE, SM, Team en BO. Rechts "Met AI": de kolom SM is weggevallen, er is een kolom People Manager bij gekomen en een kolom AI met alleen R's. De A's van de Scrum Master liggen nu bij het team, en de RTE krijgt de retro en de AI-afspraken. Links staat: AI kan R of C zijn, de A blijft bij een mens.](/img/blog/ai-effect-rollen-raci.png)

Na mijn artikel over [een ART zonder Scrum Masters, maar met AI](/blog/art-zonder-scrum-masters-ai) kreeg ik steeds dezelfde vervolgvraag. En de andere rollen dan? Wordt de PO minder belangrijk als AI de stories schrijft? Heeft de PM nog analisten nodig? En wat blijft er over van de RTE als AI de metrics verzamelt?

<!-- truncate -->

In dit artikel leg ik twee RACI's naast elkaar. Eerst hoe het nu is, op basis van de officiële SAFe®-trainingen. Daarna hoe het eruitziet als een organisatie AI vergaand toepast: niet alleen als hulpmiddel voor een rapportage, maar overal in het werk, tot en met agents die zelf taken uitvoeren. Het verschil tussen de twee laat zien welke rollen minder worden, welke veranderen en welke verdwijnen.

Eén ding vooraf, want dat bepaalt alles wat volgt: **AI levert de inzichten, maar niet het gesprek over die inzichten.** En wie AI laat handelen, blijft zelf verantwoordelijk. AI kan dus R of C zijn, maar de A blijft altijd bij een mens.

## Deel 1: hoe het nu is, volgens de trainingen

SAFe® publiceert zelf geen RACI. In [Wie doet wat? PM, PO, RTE en SM in één RACI](/blog/raci-pm-po-rte-sm) heb ik er een gemaakt op basis van de trainingen die ik geef. Kort samengevat:

<div className="checks">

- **Product Management (PM)** bepaalt *wat* de ART levert en waarom, en is eigenaar van de ART-backlog.
- **De Product Owner (PO)** is de stem van de klant in het team, is eigenaar van de teambacklog en accepteert de stories.
- **De Release Train Engineer (RTE)** faciliteert de ART-events en zorgt dat de waarde door het systeem stroomt.
- **De Scrum Master/Team Coach (SM/TC)** doet dat voor het team: events, flow, obstakels en een high-performing team.
- **Het team** plant zelf, committeert zich zelf en is zelf verantwoordelijk voor het opleveren van werkende software.
- **Business Owners (BO)** geven de business context, kennen business value toe en blijven betrokken tijdens de PI.

</div>

Hieronder een ingekorte versie van die RACI, met de regels waar AI het meeste verschil maakt. Ik heb er één regel aan toegevoegd die in de oorspronkelijke tabel ontbrak: voortgang en rapportage. Volgens de RTE-training haalt de RTE daarvoor de metrics op bij de Scrum Masters.

<RaciLegenda />

<div className="raci-tabel">

| Activiteit | PM | PO | RTE | SM/TC | Team | BO |
|---|---|---|---|---|---|---|
| **Inhoud en prioriteit** |  |  |  |  |  |  |
| Visie en roadmap | A | R | I | I | I | C |
| Klant en markt verkennen, inzichten vertalen | A | R | – | – | C | C |
| ART-backlog: features opstellen en prioriteren (WSJF) | A | C | C | I | I | C |
| Teambacklog: stories opstellen en prioriteren | C | A | I | C | R | – |
| Stories accepteren (Definition of Done) | I | A | – | I | R | – |
| **PI Planning** |  |  |  |  |  |  |
| Event voorbereiden en faciliteren | R | C | A | R | I | C |
| Team breakouts: plan en PI-doelen opstellen | C | R | C | R | A | C |
| Business value toekennen aan PI-doelen | C | C | I | I | C | A |
| Risico's ROAM'en | C | C | A | R | R | R |
| Commitment via de confidence vote | I | R | R | R | A | I |
| **PI-uitvoering** |  |  |  |  |  |  |
| Iteratie-events: planning, Team Sync, review, retro | – | R | I | R | A | – |
| Coach Sync | – | – | A | R | – | – |
| Voortgang en rapportage | I | C | A | R | C | I |
| Obstakels op teamniveau wegnemen | – | C | I | A | R | – |
| Obstakels op ART-niveau wegnemen en escaleren | C | I | A | R | I | R |
| **Demo, release en verbetering** |  |  |  |  |  |  |
| Werk integreren voor de System Demo | I | R | C | C | A | – |
| Releasemoment bepalen (Release on Demand) | A | R | I | I | C | C |
| Flow meten en verbeteren in het team | – | C | I | A | R | – |
| Flow en voorspelbaarheid van de ART verbeteren | C | I | A | R | C | I |

</div>

Wat opvalt: de Scrum Master staat op bijna elke regel van de uitvoering. Twee keer als A, vaak als R. En veel van die R's gaan over verzamelen, voorbereiden en bijhouden. Precies het soort werk dat AI goed kan.

## Deel 2: als je AI vergaand toepast

Stel nu dat AI in de hele organisatie is ingebed. AI verzamelt de voortgang en berekent de flow-metrics. AI schrijft de eerste versies van stories, acceptatiecriteria en PI-doelen. AI doet het analysewerk voor PM: klantinzichten, marktinformatie, een eerste inschatting van de cost of delay. En agents voeren zelf taken uit, bijvoorbeeld bij het testen en integreren.

In de RACI zie je dat terug in drie veranderingen:

<div className="checks">

- **Er komt een kolom AI bij**, met alleen R's en C's. Nooit een A.
- **De kolom Scrum Master valt weg.** De SM wordt een tijdelijke rol, geen vaste functie. De verantwoordelijkheden blijven, dus elke regel krijgt een nieuwe eigenaar.
- **Er komt een kolom People Manager (PeM) bij.** Iemand moet de mensen coachen in hun ontwikkeling, en zeker als hun werk door AI verandert.

</div>

<div className="raci-tabel">

| Activiteit | PM | PO | RTE | Team | BO | PeM | AI |
|---|---|---|---|---|---|---|---|
| **Inhoud en prioriteit** |  |  |  |  |  |  |  |
| Visie en roadmap | A | R | I | I | C | – | C |
| Klant en markt verkennen, inzichten vertalen | A | R | – | C | C | – | R |
| ART-backlog: features opstellen en prioriteren (WSJF) | A | C | C | I | C | – | C |
| Teambacklog: stories opstellen en prioriteren | C | A | I | R | – | – | R |
| Stories accepteren (Definition of Done) | I | A | – | R | – | – | C |
| **PI Planning** |  |  |  |  |  |  |  |
| Event voorbereiden en faciliteren | R | C | A | I | C | – | R |
| Team breakouts: plan en PI-doelen opstellen | C | R | C | A | C | – | C |
| Business value toekennen aan PI-doelen | C | C | I | C | A | – | – |
| Risico's ROAM'en | C | C | A | R | R | – | C |
| Commitment via de confidence vote | I | R | R | A | I | – | – |
| **PI-uitvoering** |  |  |  |  |  |  |  |
| Iteratie-events: planning, Team Sync, review | – | R | I | A | – | – | C |
| ART Sync (de Coach Sync vervalt) | C | R | A | R | – | – | R |
| Voortgang en rapportage | I | C | A | I | I | – | R |
| Obstakels op teamniveau wegnemen | – | C | C | A | – | – | – |
| Obstakels op ART-niveau wegnemen en escaleren | C | I | A | R | R | – | – |
| **Demo, release en verbetering** |  |  |  |  |  |  |  |
| Werk integreren voor de System Demo | I | R | C | A | – | – | R |
| Releasemoment bepalen (Release on Demand) | A | R | I | C | C | – | C |
| Flow meten en verbeteren in het team | – | C | C | A | – | – | R |
| Flow en voorspelbaarheid van de ART verbeteren | C | I | A | R | I | – | R |
| **Nieuw of anders** |  |  |  |  |  |  |  |
| Retro's: minder vaak, goed voorbereid, ook over teams heen | – | R | A | R | – | – | – |
| Het gesprek beginnen bij signalen in de metrics | – | R | A | R | – | – | C |
| AI-afspraken: welke tools, wat AI mag, wie eigenaar is van de uitkomst | C | C | A | C | C | – | – |
| Leren werken met AI in het team | – | C | C | A | – | R | C |
| Teamontwikkeling (high-performing team) | – | C | R | A | – | C | – |
| Persoonlijke ontwikkeling en loopbaan | – | – | C | – | – | A | – |

</div>

Een paar keuzes licht ik toe:

<div className="checks">

- **AI heeft bewust een – bij business value en de confidence vote.** De RTE-training is daar duidelijk over: AI helpt bij de voorbereiding van PI Planning, maar "optimaliseert" geen plannen of commitments. Een commitment geef je als mens, of niet.
- **De People Manager heeft bewust een – bij de retro en bij de metrics.** Een retro werkt alleen als iedereen zich veilig voelt, dus zonder hiërarchisch leidinggevende. En flow-metrics zeggen iets over het team, niet over één persoon. Gebruik ze niet voor individuele beoordeling.
- **De Coach Sync vervalt.** Zonder Scrum Masters is er niemand meer om hem mee te houden. Voortgang en afhankelijkheden lopen via een ART Sync, met iemand uit elk team.
- **Elk AI-resultaat heeft een menselijke eigenaar.** Daar is geen aparte regel voor nodig, want het volgt uit de tabel: AI is nergens A. Of zoals de POPM-training het zegt: AI beweert soms dingen die niet kloppen, maar dat maakt je niet minder verantwoordelijk voor wat je ermee doet.

</div>

## Wat er per rol verschuift

Leg je de twee tabellen naast elkaar, dan zie je per rol een ander effect. Sommige rollen worden kleiner, sommige veranderen van inhoud, één verdwijnt als vaste functie en een paar groeien.

<div className="compare">

| Rol | Wat AI overneemt | Wat blijft, of groeit | Effect |
|---|---|---|---|
| Scrum Master/TC | Voortgang verzamelen, metrics, rapportages, events plannen, notuleren | Het coachen, maar dat verschuift naar het team, de RTE en de People Manager | Verdwijnt als vaste functie en wordt een tijdelijke rol |
| Team | Eerste versies van stories, tests en code; een deel van het integreren | Eigenaar van het eigen proces, de flow en de eigen ontwikkeling; kiest zelf de AI-tools | Groeit: van 4 naar 8 keer A |
| PO | Epics en features uitwerken tot stories, acceptatiecriteria voorbereiden | Contact met de klant, prioriteren, accepteren, het gesprek met het team | Verandert: minder schrijfwerk, meer klant en meer werken met metrics |
| PM | Markt- en klantanalyse, features doorrekenen, cost of delay inschatten | Het besluit, en dat kan sneller | Verandert: minder analyse, sneller besluiten |
| RTE | Metrics verzamelen, input voor de events samenvatten | Cijfers duiden, coachen over teams heen, retro's, AI-afspraken | Groeit: van 6 naar 9 keer A |
| Business Owners | Voorbereiding: samenvattingen, data, scenario's | Business context, business value, besluiten over geld en richting | Blijft vrijwel gelijk |
| People Manager | Niets | Coaching van mensen, ontwikkeling, nieuwe vaardigheden | Komt erbij |

</div>

Drie patronen springen eruit.

**Het werk van de R verschuift naar AI, de A blijft waar hij was.** Bij de PO en de PM verandert de A nergens. Wat verandert, is hoeveel van het uitvoerende werk ze zelf doen. Daardoor kan de PO meer tijd aan de klant besteden, en kan de PM sneller besluiten. Wie dan nog wacht met een besluit, wacht niet meer op informatie. Daarover schreef ik eerder in [Wat besluiteloosheid je ART kost](/blog/besluiteloosheid-budget-art).

**Waar een rol verdwijnt, gaat de A naar het team.** De twee A's van de Scrum Master, obstakels en flow in het team, komen bij het team terecht. Dat past bij wat een goed team al is: eigenaar van het eigen proces. Een goede Scrum Master maakt zichzelf overbodig. AI versnelt dat.

**Er komen regels bij die er eerst niet waren.** Wie begint het gesprek als de metrics achteruitgaan? Wie spreekt af wat AI mag? Wie helpt mensen hun werk opnieuw te leren? Die vragen bestonden altijd al, maar met een Scrum Master werden ze vaak ongemerkt beantwoord. Zonder Scrum Master moet je ze expliciet beleggen.

## De spanning: de RTE als flessenhals

De tabel laat ook een risico zien. De RTE gaat van 6 naar 9 keer A: de retro's, het gesprek over de metrics, de AI-afspraken en alles wat er al was. In het artikel over een ART zonder Scrum Masters noemde ik het al: impediments gaan direct naar de RTE, en daar kan het vastlopen.

Twee manieren om daarmee om te gaan:

<div className="checks">

- **Leg meer A's bij het team.** Bijvoorbeeld de retro van het eigen team en het gesprek over de eigen metrics. De RTE wordt dan R: coach en vangnet. Dat ontlast de RTE, maar vraagt wel afspraken over welke signalen het gesprek in gang zetten. Anders ziet iedereen de cijfers en begint niemand het gesprek.
- **Zet tijdelijk een Scrum Master of agile coach in.** Niet als vaste functie, maar met een duidelijk doel: het team helpen tot het die A's zelf aankan, en dan weer weg.

</div>

Welke keuze past, hangt af van je ART. Maar maak de keuze bewust, en schrijf hem op.

## De kanttekening

Ik wil hier dezelfde kanttekening maken als in [Een ART zonder Scrum Masters, maar met AI](/blog/art-zonder-scrum-masters-ai). Dit artikel is geen pleidooi om rollen weg te halen. Een goede Scrum Master doet precies wat in de tweede tabel bij anderen terechtkomt: de flow verbeteren, het gesprek op gang brengen en het team helpen zichzelf beter te maken. Een goede PO en een goede PM worden met AI niet overbodig, maar beter.

Ook is AI geen wondermiddel. Het onderzoek van DORA laat zien dat [AI vooral werkt als versterker](https://dora.dev/dora-report-2025/): sterke organisaties worden sterker en zwakke organisaties zwakker. Bijna iedereen gebruikt het inmiddels, maar [weinig mensen vertrouwen de output echt](https://www.infoq.com/news/2025/09/dora-state-of-ai-in-dev-2025). Een ART die de verantwoordelijkheden niet op orde heeft, krijgt met AI vooral mooiere dashboards waar niemand naar vraagt.

En de tweede tabel is een richting, geen eindstation. Het zal nog wel even duren voordat AI echt is ingebed in organisaties, maar de ontwikkeling gaat snel. Hoe verder je AI laat handelen, met agents in plaats van alleen hulpmiddelen, hoe groter de verantwoordelijkheid van de mensen die dat toestaan. Dat zegt ook de RTE-training.

## Zelf aan de slag

Leg beide tabellen naast de werkelijkheid in je eigen ART. Waar doet AI nu al het werk van een R? Welke regels uit "Nieuw of anders" heeft niemand belegd? En op hoeveel regels staat de A bij de RTE? Bespreek het in je volgende Inspect & Adapt, met PM, PO's, RTE, een paar teamleden en een Business Owner.

Hoe ziet de tweede tabel er in jouw organisatie uit, en welke rol verandert bij jullie het meest?

<Cta titel="Rollen opnieuw verdelen in jullie ART?">

In de AI-Empowered SAFe® Release Train Engineer-, POPM- en Advanced Scrum Master-training, in SAFe® Agile Product Management en in SAFe® for Teams werken we aan precies deze vragen: wie doet wat, hoe gebruik je AI verantwoord, en waar blijft de A? In-house of privé, met jullie eigen ART als casus.

</Cta>

<DeelOpLinkedIn tekst="Herkenbaar?" />

*Lees ook:* [Wie doet wat? PM, PO, RTE en SM in één RACI](/blog/raci-pm-po-rte-sm) · [Een ART zonder Scrum Masters, maar met AI](/blog/art-zonder-scrum-masters-ai)

## Bronnen

- [DORA – State of AI-assisted Software Development 2025](https://dora.dev/dora-report-2025/)
- [InfoQ – DORA Report Finds AI Is an Amplifier in Software Development, But Trust Remains Low](https://www.infoq.com/news/2025/09/dora-state-of-ai-in-dev-2025)
- [Scaled Agile Framework – Scrum Master/Team Coach](https://scaledagileframework.com/scrum-master)
- [Scaled Agile Framework – The Role of People Managers in SAFe (community contribution)](https://scaledagileframework.com/the-role-of-people-managers-in-safe)
- Scaled Agile, Inc. – AI-Empowered SAFe® Release Train Engineer, AI-Empowered SAFe® POPM, AI-Empowered SAFe® Advanced Scrum Master, SAFe® Agile Product Management, SAFe® for Teams en SAFe® Business Owner (cursusmateriaal)
