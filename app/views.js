// Page renderers: each function takes the data it needs and returns the HTML
// for one hash route. Every figure on the page carries its source and year
// in a footnote or a caption, and every link on the page goes to a real route.

import {
  AGE_GROUPS, EMPLOYMENT_SECTORS, GDP_BY_INDUSTRY, GDP_GROWTH, GDP_NOMINAL_2024,
  GDP_PER_CAPITA_2024, HDI_2024, INFLATION, ISLANDS, LIFE_EXPECTANCY_2024,
  POOR_PEOPLE_SEP_2024, POVERTY, POVERTY_LINE_SEP_2024, POVERTY_RURAL_SEP_2024,
  POVERTY_URBAN_SEP_2024, POPULATION, PROVINCES, RELEASES, SCHOOLING_EXPECTED_2024,
  SCHOOLING_MEAN_2024, SOURCES, UNEMPLOYMENT,
} from './data.js';
import { barChart, lineChart, rankBars } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function sourceNote(text) {
  return `<p class="source">Source: ${esc(text)}</p>`;
}

function yearToggle(id, current) {
  return `<div class="toggle" role="group" aria-label="Year range">
  <button type="button" data-toggle="${id}" data-range="all" class="${current === 'all' ? 'active' : ''}">All years</button>
  <button type="button" data-toggle="${id}" data-range="recent" class="${current === 'recent' ? 'active' : ''}">Last 3 years</button>
</div>`;
}

function sliceYears(series, range) {
  return range === 'recent' ? series.slice(-3) : series;
}

export function home(state) {
  const pop = sliceYears(POPULATION, state.popRange);
  const gdp = sliceYears(GDP_GROWTH, state.gdpRange);
  const cards = [
    { label: 'Population', value: '281.6m', sub: 'Mid-2024 · BPS' },
    { label: 'GDP growth', value: '5.03%', sub: 'Full year 2024 · BPS' },
    { label: 'Inflation', value: '1.57%', sub: 'Calendar 2024 · BPS' },
    { label: 'Unemployment', value: '4.91%', sub: 'August 2024 · BPS' },
    { label: 'Poverty rate', value: '8.57%', sub: 'September 2024 · BPS' },
    { label: 'Human Development Index', value: '75.02', sub: '2024 · BPS' },
  ];
  return `<section class="hero">
  <p class="kicker">Indonesia · Official figures, plainly presented</p>
  <h1>Indonesia in numbers</h1>
  <p class="lede">Population, the economy, prices, work and wellbeing — the national
  statistics people actually look up, each with its source and year, on one
  fast site that works offline.</p>
  <p class="hero-links"><a class="btn" href="#/population">Explore population</a>
  <a class="btn ghost" href="#/economy">Explore the economy</a></p>
</section>
<section aria-label="Key indicators">
  <h2>Key indicators</h2>
  <div class="cards">${cards.map((c) => `<article class="card">
    <p class="card-label">${c.label}</p>
    <p class="card-value">${c.value}</p>
    <p class="card-sub">${c.sub}</p>
  </article>`).join('')}</div>
  ${sourceNote(SOURCES.bps + ', releases 2024–2025')}
</section>
<section class="chart-block">
  <h2>Population keeps growing</h2>
  <p>Mid-year population, millions of people. Growth has slowed to about 1% a
  year, and more than half the country still lives on Java.</p>
  ${yearToggle('pop', state.popRange)}
  ${lineChart(pop.map((p) => ({ label: String(p.year), value: p.value })), { unit: 'm' })}
  ${sourceNote(SOURCES.bpsPop)}
  <p><a href="#/population">Population in detail &rarr;</a></p>
</section>
<section class="chart-block">
  <h2>Growth held above 5%</h2>
  <p>Real GDP growth, percent year on year. The economy grew 5.03% in 2024 and
  5.11% in 2025, after 5.31% in 2022.</p>
  ${yearToggle('gdp', state.gdpRange)}
  ${barChart(gdp.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%' })}
  ${sourceNote(SOURCES.bpsNationalAccounts)}
  <p><a href="#/economy">The economy in detail &rarr;</a></p>
</section>
<section>
  <h2>Latest releases</h2>
  <ul class="releases">${RELEASES.map((r) => `<li>
    <span class="release-date">${esc(r.date)}</span>
    <strong>${esc(r.title)}</strong>
    <span>${esc(r.detail)}</span>
    <span class="release-source">${esc(r.source)}</span>
  </li>`).join('')}</ul>
</section>
<section class="browse">
  <h2>Browse by topic</h2>
  <ul class="topic-list">
    <li><a href="#/population">Population &rarr;</a><span>281.6 million people, islands, provinces, age structure</span></li>
    <li><a href="#/economy">Economy &rarr;</a><span>GDP, growth, industries, GDP per capita</span></li>
    <li><a href="#/prices">Prices &amp; inflation &rarr;</a><span>Inflation 2021–2025 and the poverty line</span></li>
    <li><a href="#/labour">Work &amp; poverty &rarr;</a><span>Unemployment, poverty, where people work</span></li>
    <li><a href="#/regions">Regions &rarr;</a><span>The ten largest provinces, searchable and sortable</span></li>
    <li><a href="#/sources">Sources &amp; methods &rarr;</a><span>Where every figure comes from</span></li>
  </ul>
</section>`;
}

export function populationPage(state) {
  const pop = sliceYears(POPULATION, state.popRange);
  const total2024 = POPULATION.find((p) => p.year === 2024).value;
  return `<p class="crumb"><a href="#/">&larr; Home</a></p>
<h1>Population</h1>
<p class="lede">281.6 million people at mid-2024 — the world's fourth-largest population —
spread very unevenly across 17,000 islands.</p>
<section class="chart-block">
  <h2>Population, 2020–2025</h2>
  <p>Mid-year population in millions. The 2025 figure is the BPS projection;
  the 2020 figure is the census-based count.</p>
  ${yearToggle('pop', state.popRange)}
  ${lineChart(pop.map((p) => ({ label: String(p.year), value: p.value })), { unit: 'm' })}
  ${sourceNote(SOURCES.bpsPop)}
</section>
<section class="chart-block">
  <h2>Where people live</h2>
  <p>The four largest islands hold about 85% of the population. Java alone holds
  151.59 million people — 53.8% of the country on 7% of its land.</p>
  ${barChart(ISLANDS.map((i) => ({ label: i.name, value: i.value })), { unit: 'm', color: '#d98a12' })}
  ${sourceNote(SOURCES.bpsPop + ' (mid-2024)')}
</section>
<section>
  <h2>Age structure, 2024</h2>
  <p>Indonesia is young: more than two in three people are of working age
  (15–64), and about one in four is a child.</p>
  ${rankBars(AGE_GROUPS.map((a) => ({ label: a.group, value: a.share, note: `≈${fmt((a.share / 100) * total2024, 1)}m people` })), { unit: '%' })}
  ${sourceNote(SOURCES.bps + ', 2024 (shares rounded)')}
</section>
<section>
  <h2>Largest provinces</h2>
  <p>The three provinces of Java — West, East and Central — hold 129.7 million
  people between them, 46% of the country.</p>
  <table class="data-table"><thead><tr>
    <th>Province</th><th>Population (m)</th><th>Share of Indonesia</th>
  </tr></thead><tbody>
  ${PROVINCES.slice(0, 5).map((p) => `<tr><td>${esc(p.name)}</td><td>${fmt(p.pop, 1)}</td><td>${fmt((p.pop / total2024) * 100, 1)}%</td></tr>`).join('')}
  </tbody></table>
  ${sourceNote(SOURCES.bpsPop + ' (mid-2024)')}
  <p><a href="#/regions">All ten largest provinces, with density &rarr;</a></p>
</section>`;
}

export function economyPage(state) {
  const gdp = sliceYears(GDP_GROWTH, state.gdpRange);
  return `<p class="crumb"><a href="#/">&larr; Home</a></p>
<h1>Economy</h1>
<p class="lede">Gross domestic product reached Rp ${fmt(GDP_NOMINAL_2024, 1)} trillion in
2024 — about Rp ${fmt(GDP_PER_CAPITA_2024, 1)} million per person — and the
economy has grown by more than 5% a year since 2022.</p>
<section class="chart-block">
  <h2>Real GDP growth, 2021–2025</h2>
  <p>Percent change year on year. Growth eased from 5.31% in 2022 to 5.03% in
  2024, then picked up to 5.11% in 2025.</p>
  ${yearToggle('gdp', state.gdpRange)}
  ${barChart(gdp.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%' })}
  ${sourceNote(SOURCES.bpsNationalAccounts)}
</section>
<section>
  <h2>What the economy is made of</h2>
  <p>Share of GDP by industry, 2024. Manufacturing is the largest single
  industry at 18.7%; services and trade together are larger still.</p>
  ${rankBars(GDP_BY_INDUSTRY.map((g) => ({ label: g.name, value: g.share })), { unit: '%' })}
  ${sourceNote(SOURCES.bpsNationalAccounts + ' (shares rounded)')}
</section>
<section>
  <h2>GDP at a glance</h2>
  <table class="data-table"><thead><tr><th>Measure</th><th>Value</th><th>Year</th></tr></thead><tbody>
    <tr><td>GDP, current prices</td><td>Rp ${fmt(GDP_NOMINAL_2024, 1)} trillion</td><td>2024</td></tr>
    <tr><td>GDP per capita</td><td>Rp ${fmt(GDP_PER_CAPITA_2024, 1)} million</td><td>2024</td></tr>
    <tr><td>Real GDP growth</td><td>5.03%</td><td>2024</td></tr>
    <tr><td>Real GDP growth</td><td>5.11%</td><td>2025</td></tr>
    <tr><td>Household consumption growth</td><td>4.94%</td><td>2024</td></tr>
    <tr><td>Investment (gross fixed capital formation) growth</td><td>4.61%</td><td>2024</td></tr>
  </tbody></table>
  ${sourceNote(SOURCES.bpsNationalAccounts)}
</section>`;
}

export function pricesPage() {
  return `<p class="crumb"><a href="#/">&larr; Home</a></p>
<h1>Prices &amp; inflation</h1>
<p class="lede">Inflation ran hot in 2022 at 5.51%, then fell back inside the central
bank's 2.5% ± 1% target band: 1.57% in 2024, 2.92% in 2025.</p>
<section class="chart-block">
  <h2>Inflation, 2021–2025</h2>
  <p>Consumer price inflation, percent year on year in December.</p>
  ${lineChart(INFLATION.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', color: '#b3402e' })}
  ${sourceNote(SOURCES.bpsPrices)}
</section>
<section>
  <h2>What prices did, year by year</h2>
  <table class="data-table"><thead><tr><th>Year</th><th>Inflation</th><th>What happened</th></tr></thead><tbody>
    <tr><td>2021</td><td>1.87%</td><td>Low demand during the pandemic recovery</td></tr>
    <tr><td>2022</td><td>5.51%</td><td>Fuel subsidy cuts pushed prices up</td></tr>
    <tr><td>2023</td><td>2.61%</td><td>Back inside the target band</td></tr>
    <tr><td>2024</td><td>1.57%</td><td>Lowest calendar-year inflation in the series</td></tr>
    <tr><td>2025</td><td>2.92%</td><td>Back toward the middle of the band</td></tr>
  </tbody></table>
  ${sourceNote(SOURCES.bpsPrices)}
</section>
<section>
  <h2>The poverty line</h2>
  <p>In September 2024 the poverty line stood at <strong>Rp ${POVERTY_LINE_SEP_2024.toLocaleString('en-US')}</strong>
  per person per month. Rice, cigarettes, housing and fuel contribute the most
  to it. Anyone spending less than that counts as poor — ${fmt(POOR_PEOPLE_SEP_2024)} million
  people, or 8.57% of the population, in September 2024.</p>
  ${sourceNote(SOURCES.bpsPoverty)}
</section>`;
}

export function labourPage() {
  return `<p class="crumb"><a href="#/">&larr; Home</a></p>
<h1>Work &amp; poverty</h1>
<p class="lede">Unemployment has fallen every year since 2021, to 4.85% in August 2025 —
and poverty to 8.25% in September 2025, the lowest BPS has recorded.</p>
<section class="chart-block">
  <h2>Open unemployment rate, 2021–2025</h2>
  <p>Percent of the labour force, August rounds. The rate fell 1.64 points in
  four years.</p>
  ${lineChart(UNEMPLOYMENT.map((p) => ({ label: String(p.year), value: p.value })), { unit: '%', min: 0 })}
  ${sourceNote(SOURCES.bpsLabour)}
</section>
<section class="chart-block">
  <h2>Poverty rate, 2024–2025</h2>
  <p>Percent of the population below the poverty line, March and September
  rounds. Poverty is far higher in rural areas (11.34% in September 2024)
  than in cities (6.66%).</p>
  ${barChart(POVERTY.map((p) => ({ label: p.period, value: p.value })), { unit: '%', color: '#0e4f4a' })}
  ${sourceNote(SOURCES.bpsPoverty)}
</section>
<section>
  <h2>Where people work</h2>
  <p>Share of employed persons by sector, 2024. Agriculture still employs more
  than one in four workers; trade and manufacturing employ about one in three
  between them.</p>
  ${rankBars(EMPLOYMENT_SECTORS.map((s) => ({ label: s.name, value: s.share })), { unit: '%' })}
  ${sourceNote(SOURCES.bpsLabour + ' (shares rounded)')}
</section>`;
}

export function regionsPage(state) {
  const total2024 = POPULATION.find((p) => p.year === 2024).value;
  const q = (state.regionQuery || '').toLowerCase();
  const rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q));
  const sorted = [...rows].sort((a, b) => {
    const key = state.regionSort || 'pop';
    if (key === 'name') return a.name.localeCompare(b.name);
    if (key === 'density') return b.pop * 1000000 / b.area - a.pop * 1000000 / a.area;
    return b.pop - a.pop;
  });
  const sortLabel = { pop: 'population', name: 'name', density: 'density' }[state.regionSort || 'pop'];
  return `<p class="crumb"><a href="#/">&larr; Home</a></p>
<h1>Regions</h1>
<p class="lede">The ten largest of Indonesia's 38 provinces, mid-2024. Search the list, or
sort it — by population, by name, or by how crowded each province is.</p>
<div class="controls">
  <label>Search provinces
    <input type="search" id="region-search" placeholder="e.g. Java" value="${esc(state.regionQuery || '')}" autocomplete="off">
  </label>
  <label>Sort by
    <select id="region-sort">
      <option value="pop" ${state.regionSort === 'pop' ? 'selected' : ''}>Population, largest first</option>
      <option value="name" ${state.regionSort === 'name' ? 'selected' : ''}>Name, A to Z</option>
      <option value="density" ${state.regionSort === 'density' ? 'selected' : ''}>Density, densest first</option>
    </select>
  </label>
</div>
<p class="result-count">${sorted.length} province${sorted.length === 1 ? '' : 's'} shown, sorted by ${sortLabel}.</p>
<table class="data-table"><thead><tr>
  <th>Province</th><th>Population (m)</th><th>Share</th><th>Area (km²)</th><th>Density (per km²)</th>
</tr></thead><tbody>
${sorted.length ? sorted.map((p) => {
    const density = Math.round((p.pop * 1000000) / p.area);
    return `<tr><td>${esc(p.name)}</td><td>${fmt(p.pop, 1)}</td><td>${fmt((p.pop / total2024) * 100, 1)}%</td><td>${p.area.toLocaleString('en-US')}</td><td>${density.toLocaleString('en-US')}</td></tr>`;
  }).join('') : `<tr><td colspan="5">No province matches “${esc(state.regionQuery)}”. Try “Java” or “Sumatra”.</td></tr>`}
</tbody></table>
${sourceNote(SOURCES.bpsPop + '; areas as published by BPS; density calculated from these figures.')}
<section class="chart-block">
  <h2>Java dominates</h2>
  <p>The island chart again, for comparison: the four largest islands and how
  many millions live on each.</p>
  ${barChart(ISLANDS.map((i) => ({ label: i.name, value: i.value })), { unit: 'm', color: '#d98a12' })}
  ${sourceNote(SOURCES.bpsPop + ' (mid-2024)')}
</section>`;
}

export function sourcesPage() {
  return `<p class="crumb"><a href="#/">&larr; Home</a></p>
<h1>Sources &amp; methods</h1>
<p class="lede">Every figure on this site comes from a public release of BPS — Statistics
Indonesia. Nothing is estimated by this site except where the page says so
(“derived” or “rounded”).</p>
<section>
  <h2>Where the figures come from</h2>
  <table class="data-table"><thead><tr><th>Topic</th><th>Source</th><th>Latest year shown</th></tr></thead><tbody>
    <tr><td>Population, islands, provinces</td><td>${esc(SOURCES.bpsPop)}</td><td>2025</td></tr>
    <tr><td>GDP, growth, industries</td><td>${esc(SOURCES.bpsNationalAccounts)}</td><td>2025</td></tr>
    <tr><td>Inflation</td><td>${esc(SOURCES.bpsPrices)}</td><td>2025</td></tr>
    <tr><td>Unemployment, employment sectors</td><td>${esc(SOURCES.bpsLabour)}</td><td>2025</td></tr>
    <tr><td>Poverty, poverty line</td><td>${esc(SOURCES.bpsPoverty)}</td><td>2025</td></tr>
    <tr><td>Human development</td><td>${esc(SOURCES.bpsHdi)}</td><td>2024</td></tr>
  </tbody></table>
</section>
<section>
  <h2>Definitions</h2>
  <dl class="defs">
    <dt>Mid-year population</dt><dd>The population at 30 June, from the census-based projection.</dd>
    <dt>Real GDP growth</dt><dd>Change in GDP at constant 2010 prices, year on year.</dd>
    <dt>Inflation</dt><dd>Change in the consumer price index, December against December.</dd>
    <dt>Open unemployment rate (TPT)</dt><dd>Unemployed people as a share of the labour force, August survey round.</dd>
    <dt>Poverty rate</dt><dd>Share of the population spending below the poverty line.</dd>
    <dt>Human Development Index</dt><dd>Composite of life expectancy, schooling and per-capita expenditure, 0–100.</dd>
  </dl>
</section>
<section>
  <h2>About this site</h2>
  <p>NusaStats is an independent compilation of public BPS releases, built to
  make the country's headline numbers easy to find and to check. It is not
  affiliated with BPS or the Government of Indonesia, and it is not an official
  publication: for the full tables, see bps.go.id. Figures are shown as
  published; where a figure is derived from two published ones (GDP per capita,
  density, shares), the page says so.</p>
  <p>Figures are updated when BPS publishes a new release — population each
  year, GDP each quarter, inflation each month, poverty twice a year.</p>
</section>`;
}

export function missingPage() {
  return `<h1>Page not found</h1>
<p>There is no statistics page at this address. Try the <a href="#/">home page</a>,
or browse <a href="#/population">population</a>, <a href="#/economy">the economy</a>,
<a href="#/prices">prices</a>, <a href="#/labour">work &amp; poverty</a> or
<a href="#/regions">regions</a>.</p>`;
}
