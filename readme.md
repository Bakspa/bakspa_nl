# bakspa.nl

Statische website voor Bakspa: SAFe® trainingen (in-house en privé), RTE-inzet en YottaDots consultancy. Gehost op GitHub Pages, zonder build-stap.

## Structuur

| Bestand | Inhoud |
|---|---|
| `index.html` | Alle pagina-inhoud (secties: trainingen, vormen, rollen, over mij, FAQ, contact) |
| `assets/courses.js` | Het trainingsaanbod. Training toevoegen of wijzigen? Alleen dit bestand aanpassen. |
| `assets/main.js` | Filter, mobiel menu en contactformulier (opent e-mail, want GitHub Pages heeft geen server) |
| `assets/styles.css` | Vormgeving (kleuren staan bovenaan als CSS-variabelen) |
| `CNAME` | Eigen domein `bakspa.nl` |

Kleuren en lettertype (Inter) volgen het YottaDots-thema; de kleurvariabelen staan bovenaan `assets/styles.css`.

## Publiceren op GitHub Pages

1. Repository → **Settings → Pages**
2. Source: **Deploy from a branch**, branch `main`, map `/ (root)`
3. Custom domain: `bakspa.nl` (staat al in `CNAME`), vink **Enforce HTTPS** aan zodra het kan
4. DNS bij je domeinregistrar:
   - `A`-records voor `bakspa.nl`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` voor `www`: `bakspa.github.io`

## Lokaal bekijken

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
