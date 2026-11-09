# bakspa.nl

Website van Bakspa: SAFe® trainingen (in-house en privé), RTE-inzet en YottaDots consultancy.
Gebouwd met [Docusaurus](https://docusaurus.io), net als YottaDots, en gepubliceerd op GitHub Pages.

## Teksten aanpassen

Alle teksten staan in gewone tekstbestanden. Je hoeft geen HTML of code aan te raken.

| Wat | Bestand |
|---|---|
| Homepage: hero, voordelen, vormen, rollen, over mij, blogkaarten, FAQ, contact | [`inhoud/home.yml`](inhoud/home.yml) |
| Trainingsaanbod (titel, dagen, categorie, AI-label, tekst) | [`inhoud/trainingen.yml`](inhoud/trainingen.yml) |
| Blogartikelen | [`blog/`](blog/) (één `.md`-bestand per artikel) |

### Een taal- of tikfout herstellen, in je browser

1. Open het bestand op GitHub en klik op het potloodje (**Edit this file**).
2. Pas de tekst aan.
3. Klik op **Commit changes…**, kies *Create a new branch and start a pull request* en klik op **Propose changes**.
4. GitHub bouwt de site als controle. Groen vinkje? Klik **Merge pull request**. Binnen een paar minuten staat de wijziging live.

Onder elk blogartikel op de site staat ook een link **Deze pagina bewerken**, die je direct naar het juiste bestand brengt.

### Spelregels voor de `.yml`-bestanden

- Verander alleen de tekst achter de dubbele punt of na het streepje; laat de inspringing (spaties vooraan) staan.
- Bevat een tekst een dubbele punt (`:`) of begint hij met een aanhalingsteken, zet de hele tekst dan tussen aanhalingstekens: `tekst: "Let op: zo dus"`.
- In teksten werken **vet** (`**vet**`), *cursief* (`*cursief*`) en links (`[tekst](https://adres)`).

### Spelregels voor blogartikelen (`.md`)

- Bovenaan staat tussen `---` de informatie over het artikel: titel, adres (`slug`), omschrijving voor Google en LinkedIn, en de afbeelding.
- De datum in de bestandsnaam bepaalt alleen de volgorde; hij wordt nergens getoond.
- Alles boven `<!-- truncate -->` verschijnt als inleiding in het blogoverzicht.
- **RACI-tabel:** een gewone Markdown-tabel in een `<div className="raci-tabel">`. Typ in een cel alleen `A`, `R`, `C` of `I`; de kleur komt vanzelf.
- **Bolletjeslijst met oranje stippen:** zet de lijst tussen `<div className="checks">` en `</div>`, met een lege regel erboven en eronder.
- **Bouwstenen:** `<Cta titel="…">tekst</Cta>` (blok met trainingsknoppen), `<DeelOpLinkedIn tekst="Herkenbaar?" />` en `<RaciLegenda />`.
- Gebruik geen accolades `{ }` in gewone tekst; die betekenen iets speciaals.

### Nieuw blogartikel

1. Kopieer een bestaand bestand in `blog/` naar `JJJJ-MM-DD-korte-titel.md` en pas de gegevens bovenaan aan.
2. Maak een illustratie (1200×627) in `static/img/blog/`. Voorbeelden en een renderscript staan in [`illustraties/`](illustraties/).
3. Zet het artikel bovenaan bij `blog: uitgelicht:` in `inhoud/home.yml` als het op de homepage moet staan.

## Werkwijze: wijzigingen via pull requests

- Elke wijziging komt binnen via een pull request (PR). Bij elke PR bouwt GitHub de site als controle; een rood kruis betekent dat er iets niet klopt en dat de site ongewijzigd blijft.
- Pas na **Merge pull request** wordt de site bijgewerkt.
- **Terugdraaien:** open een gemergede PR en klik **Revert**; merge de nieuwe PR die GitHub dan maakt.
- **Aanrader:** *Settings → Branches* een regel voor `main` met *Require a pull request before merging*.

## Publiceren op GitHub Pages

De site wordt gebouwd en gepubliceerd door GitHub Actions (`.github/workflows/deploy.yml`).

- *Settings → Pages → Build and deployment → Source* moet op **GitHub Actions** staan.
- **Eigen domein:** de site draait op **https://bakspa.nl**. `www.bakspa.nl` en het oude adres `bakspa.github.io/bakspa_nl/` sturen daar automatisch naartoe.
  - In `docusaurus.config.js` staan `url: 'https://bakspa.nl'` en `baseUrl: '/'`; `static/CNAME` bevat `bakspa.nl`.
  - *Settings → Pages → Custom domain* staat op `bakspa.nl`, met **Enforce HTTPS** aan.
  - DNS bij de registrar: vier A-records voor `@` (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153), vier AAAA-records voor `@` (2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153) en een CNAME-record `www` → `bakspa.github.io`.

## Lokaal bekijken (optioneel)

```bash
npm install
npm start        # ontwikkelserver op http://localhost:3000/
npm run build    # bouwt de site in de map build/
```

## Structuur

| Map / bestand | Inhoud |
|---|---|
| `inhoud/` | Teksten van de homepage en het trainingsaanbod |
| `blog/` | Blogartikelen |
| `static/img/` | Logo, foto, blogillustraties, preview-afbeelding |
| `illustraties/` | Bronbestanden (HTML) van de blogillustraties |
| `src/pages/index.js` | Opbouw van de homepage (leest `inhoud/`) |
| `src/components/`, `src/theme/` | Bouwstenen en aanpassingen aan Docusaurus |
| `src/css/custom.css` | Vormgeving (kleuren volgen het YottaDots-thema) |
| `docusaurus.config.js` | Instellingen: menu, footer, adres van de site |
