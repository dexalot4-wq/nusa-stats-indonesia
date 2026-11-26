# NusaStats — Indonesia in Numbers

[![Make.fun competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/dexalot4-wq/nusa-stats-indonesia/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/dexalot4-wq/nusa-stats-indonesia/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia: population, the economy, prices,
work and wellbeing — the figures people actually look up, each with its
source and year. Built for the [make.fun best national statistics site
bounty](https://make.fun/c/best-national-statistics-site-20261126-0539).

## The site

Static files under `app/`, no build step, no network request: open
`app/index.html` in a browser, or serve it with `node serve.ts` and open
<http://localhost:8080>. Charts are hand-drawn SVG from the figures in
`app/data.js`; every control works — chart year ranges, the regions table's
search and sort, and every navigation link.

Pages: home (key indicators, population and GDP charts, latest releases),
population, economy, prices & inflation, work & poverty, regions, and
sources & methods.

## Data

All figures are compiled from public releases of BPS — Statistics Indonesia
(bps.go.id), 2021–2025, with each figure's source and year on the page that
shows it. NusaStats is an independent compilation, not affiliated with BPS.

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to `/output` and writes `/output/dossier.json` with the vendored make.fun
library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
