// NusaStats router: hash routes, one page per topic, and the controls that
// make the site work — year-range toggles on the charts, and the regions
// page's live search and sort. No network: every page is rendered from data.js.
//
//   #/              home: key indicators, population and GDP charts
//   #/population    population, islands, age structure, provinces
//   #/economy       GDP growth, industries, GDP at a glance
//   #/prices        inflation and the poverty line
//   #/labour        unemployment, poverty, employment sectors
//   #/regions       the ten largest provinces, searchable and sortable
//   #/sources       sources, definitions, about
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  economyPage, home, labourPage, missingPage, populationPage, pricesPage,
  regionsPage, sourcesPage,
} from './views.js';

const app = document.getElementById('app');

// Chart year ranges and the regions page's search/sort survive navigation.
const state = { popRange: 'all', gdpRange: 'all', regionQuery: '', regionSort: 'pop' };

const ROUTES = {
  '': home,
  population: populationPage,
  economy: economyPage,
  prices: pricesPage,
  labour: labourPage,
  regions: regionsPage,
  sources: sourcesPage,
};

const TITLES = {
  '': 'NusaStats — Indonesia in Numbers',
  population: 'Population | NusaStats',
  economy: 'Economy | NusaStats',
  prices: 'Prices & Inflation | NusaStats',
  labour: 'Work & Poverty | NusaStats',
  regions: 'Regions | NusaStats',
  sources: 'Sources & Methods | NusaStats',
};

function route() {
  const slug = (location.hash.match(/^#\/([a-z-]*)?\/?$/) || [])[1] || '';
  return ROUTES[slug] ? slug : null;
}

function render() {
  window.__shotReady = false;
  const slug = route();
  document.title = TITLES[slug] || 'Page not found | NusaStats';
  app.innerHTML = slug === null ? missingPage() : ROUTES[slug](state);
  document.querySelectorAll('.nav a').forEach((a) => {
    a.classList.toggle('current', a.getAttribute('href') === `#/${slug}`);
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Year-range toggle buttons re-render with the chosen slice of the series.
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-toggle]');
  if (!button) return;
  const key = button.getAttribute('data-toggle') === 'pop' ? 'popRange' : 'gdpRange';
  state[key] = button.getAttribute('data-range');
  render();
});

// Regions page: typing in the search box filters at once; changing the sort
// re-orders the table. The input keeps focus because only the table area
// would need a re-render — we re-render the whole page, then restore focus.
document.addEventListener('input', (event) => {
  if (event.target.id !== 'region-search') return;
  state.regionQuery = event.target.value;
  render();
  const box = document.getElementById('region-search');
  box.focus();
  box.setSelectionRange(box.value.length, box.value.length);
});

document.addEventListener('change', (event) => {
  if (event.target.id !== 'region-sort') return;
  state.regionSort = event.target.value;
  render();
});

window.addEventListener('hashchange', render);
render();
