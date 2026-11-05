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
| `assets/og/` | Preview-afbeeldingen voor LinkedIn (1200×627) |

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
2. Maak een preview-afbeelding (1200×627) in `assets/og/` en verwijs ernaar in `og:image`.
3. Voeg een kaart toe bovenaan `blog/index.html` (en eventueel op de homepage, sectie `#blog`).
4. Deel de link op LinkedIn; de titel, omschrijving en afbeelding komen uit de `og:`-tags.
