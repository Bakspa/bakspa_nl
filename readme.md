# bakspa.nl

Statische website voor Bakspa: SAFe® trainingen (in-house en privé), RTE-inzet en YottaDots consultancy. Gehost op GitHub Pages, zonder build-stap.

## Structuur

| Bestand | Inhoud |
|---|---|
| `index.html` | Alle pagina-inhoud (secties: trainingen, vormen, rollen, over mij, FAQ, contact) |
| `assets/courses.js` | Het trainingsaanbod. Training toevoegen of wijzigen? Alleen dit bestand aanpassen. |
| `assets/main.js` | Filter, mobiel menu en contactformulier (opent e-mail, want GitHub Pages heeft geen server) |
| `assets/styles.css` | Vormgeving (kleuren staan bovenaan als CSS-variabelen) |
| `blog/` | Blogartikelen (`index.html` is het overzicht) |
| `assets/logo/` | Logo: origineel en een lichte variant voor de donkere achtergrond |
| `assets/blog/` | Illustraties per blog, ook gebruikt als LinkedIn-preview (1200×627) |
| `assets/og/` | Algemene preview-afbeelding voor de homepage en het blogoverzicht |
| `bron/illustraties/` | Bronbestanden (HTML) van de blogillustraties |

Kleuren en lettertype (Inter) volgen het YottaDots-thema; de kleurvariabelen staan bovenaan `assets/styles.css`.

## Publiceren op GitHub Pages

1. Repository → **Settings → Pages**
2. Source: **Deploy from a branch**, branch `main`, map `/ (root)`
3. Eigen domein (optioneel): vul `bakspa.nl` in bij Custom domain en vink **Enforce HTTPS** aan.
   Pas dan ook de absolute URL's aan: zoek op `bakspa.github.io/bakspa_nl` (LinkedIn-previews) en `/bakspa_nl/` in `404.html`.
4. DNS bij je domeinregistrar:
   - `A`-records voor `bakspa.nl`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` voor `www`: `bakspa.github.io`

## Lokaal bekijken

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Nieuw blogartikel

1. Kopieer `blog/raci-pm-po-rte-sm.html` naar een nieuwe bestandsnaam en vervang titel, meta-tags en tekst.
2. Maak een illustratie (1200×627) in `assets/blog/` en verwijs ernaar in `og:image`, in de `post-hero` bovenaan het artikel en in de kaarten. Voorbeelden en een renderscript staan in `bron/illustraties/` (`python3 render.py . ../../assets/blog`).
3. Voeg een kaart toe bovenaan `blog/index.html` (en eventueel op de homepage, sectie `#blog`).
4. Deel de link op LinkedIn; de titel, omschrijving en afbeelding komen uit de `og:`-tags.

## Werkwijze: wijzigingen via pull requests

Wijzigingen komen niet meer rechtstreeks op `main`, maar via een pull request (PR):

1. Elke wijziging krijgt een eigen branch en een PR met uitleg en screenshots.
2. Bekijk de PR onder **Pull requests** (tab *Files changed* toont precies wat er verandert).
3. Akkoord? Klik **Merge pull request**. Niet akkoord? Laat een opmerking achter of sluit de PR.
4. Na het mergen staat de wijziging binnen een paar minuten live.

### Iets terugdraaien

- **Een gemergede PR:** open de PR en klik **Revert**. GitHub maakt een nieuwe PR die de wijziging ongedaan maakt; merge die.
- **Een oudere versie bekijken:** tab *Code* → *Commits* toont de volledige geschiedenis per wijziging.

### Aanrader: bescherm `main`

*Settings → Branches → Add branch ruleset* (of *Add rule*) voor `main`, met *Require a pull request before merging*. Dan kan er niets meer op `main` komen zonder PR, ook niet per ongeluk.
