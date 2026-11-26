// NusaStats data: Indonesia's national figures, compiled from public releases
// of BPS — Statistics Indonesia (bps.go.id). Every series carries its source
// and year; values shown with "≈" are rounded from the published figures.
// Nothing here is fetched at run time: the site ships its data in this file.

export const SOURCES = {
  bps: 'BPS — Statistics Indonesia',
  bpsPop: 'BPS, Population Projection 2020–2035 (mid-year)',
  bpsNationalAccounts: 'BPS, Gross Domestic Product 2024 (release 5 Feb 2025)',
  bpsPrices: 'BPS, Consumer Price Index / inflation releases 2021–2025',
  bpsLabour: 'BPS, National Labour Force Survey (Sakernas), August rounds',
  bpsPoverty: 'BPS, Poverty Profile releases, March & September rounds',
  bpsHdi: 'BPS, Human Development Index 2024 (release 2024)',
};

// Population, mid-year, millions of people.
export const POPULATION = [
  { year: 2020, value: 270.2 },
  { year: 2021, value: 272.68 },
  { year: 2022, value: 275.77 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
  { year: 2025, value: 284.44 },
];

// Four largest islands, population in millions, mid-2024 (BPS projection).
export const ISLANDS = [
  { name: 'Java', value: 151.59 },
  { name: 'Sumatra', value: 57.76 },
  { name: 'Kalimantan', value: 16.15 },
  { name: 'Sulawesi', value: 12.19 },
];

// Age structure, share of population in percent, 2024 (BPS, rounded).
export const AGE_GROUPS = [
  { group: '0–14 years', share: 24.6 },
  { group: '15–64 years', share: 68.7 },
  { group: '65 years and over', share: 6.7 },
];

// Ten largest provinces, population in millions and land area in km², mid-2024
// (BPS population projection; province areas as published by BPS).
export const PROVINCES = [
  { name: 'West Java', pop: 50.0, area: 35378 },
  { name: 'East Java', pop: 41.8, area: 47803 },
  { name: 'Central Java', pop: 37.9, area: 32801 },
  { name: 'North Sumatra', pop: 16.0, area: 72981 },
  { name: 'Banten', pop: 12.4, area: 9663 },
  { name: 'Jakarta', pop: 10.6, area: 664 },
  { name: 'South Sulawesi', pop: 9.5, area: 46717 },
  { name: 'Lampung', pop: 9.4, area: 34624 },
  { name: 'South Sumatra', pop: 9.0, area: 91592 },
  { name: 'Riau', pop: 7.0, area: 87024 },
];

// Real GDP growth, percent year on year (BPS national accounts).
export const GDP_GROWTH = [
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
  { year: 2025, value: 5.11 },
];

export const GDP_NOMINAL_2024 = 22139.9; // trillion rupiah, current prices (BPS)
export const GDP_PER_CAPITA_2024 = 78.6; // million rupiah, derived from BPS figures

// Share of GDP by industry, percent, 2024 (BPS; rounded, "Other" is the rest).
export const GDP_BY_INDUSTRY = [
  { name: 'Manufacturing', share: 18.7 },
  { name: 'Wholesale & retail trade', share: 13.0 },
  { name: 'Agriculture, forestry & fishing', share: 12.5 },
  { name: 'Construction', share: 10.0 },
  { name: 'Mining & quarrying', share: 9.0 },
  { name: 'All other industries', share: 36.8 },
];

// Consumer price inflation, percent year on year, December (BPS).
export const INFLATION = [
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
  { year: 2025, value: 2.92 },
];

// Open unemployment rate (TPT), percent, August rounds (BPS Sakernas).
export const UNEMPLOYMENT = [
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
  { year: 2025, value: 4.85 },
];

// Poverty rate, percent of population (BPS poverty profile).
export const POVERTY = [
  { period: 'Mar 2024', value: 9.03 },
  { period: 'Sep 2024', value: 8.57 },
  { period: 'Mar 2025', value: 8.47 },
  { period: 'Sep 2025', value: 8.25 },
];

export const POVERTY_LINE_SEP_2024 = 595242; // rupiah per person per month (BPS)
export const POOR_PEOPLE_SEP_2024 = 24.06; // million people (BPS)
export const POVERTY_URBAN_SEP_2024 = 6.66; // percent (BPS)
export const POVERTY_RURAL_SEP_2024 = 11.34; // percent (BPS)

// Share of employed persons by sector, percent, 2024 (BPS Sakernas, rounded).
export const EMPLOYMENT_SECTORS = [
  { name: 'Agriculture, forestry & fishing', share: 28.6 },
  { name: 'Wholesale & retail trade', share: 19.0 },
  { name: 'Manufacturing', share: 13.8 },
  { name: 'Construction', share: 7.8 },
  { name: 'Accommodation & food services', share: 6.9 },
  { name: 'All other sectors', share: 23.9 },
];

// Human development, 2024 (BPS).
export const HDI_2024 = 75.02;
export const LIFE_EXPECTANCY_2024 = 73.9; // years
export const SCHOOLING_EXPECTED_2024 = 13.2; // years
export const SCHOOLING_MEAN_2024 = 8.9; // years

// Latest releases the home page lists, newest first.
export const RELEASES = [
  {
    date: '5 Feb 2025',
    title: 'Economy grew 5.03% in 2024',
    detail: 'Real GDP growth for the full year 2024; Q4 2024 grew 5.02% year on year.',
    source: SOURCES.bpsNationalAccounts,
  },
  {
    date: 'Jan 2025',
    title: 'Poverty fell to 8.57% in September 2024',
    detail: '24.06 million people below the poverty line — the lowest rate BPS has recorded.',
    source: SOURCES.bpsPoverty,
  },
  {
    date: '2 Jan 2025',
    title: 'Inflation 1.57% in 2024',
    detail: 'Calendar-year inflation, down from 2.61% in 2023.',
    source: SOURCES.bpsPrices,
  },
  {
    date: 'Nov 2024',
    title: 'Open unemployment 4.91% (August 2024)',
    detail: 'Down from 5.32% in August 2023; labour force participation kept rising.',
    source: SOURCES.bpsLabour,
  },
  {
    date: '2024',
    title: 'Human Development Index 75.02',
    detail: 'Up from 74.39 in 2023; life expectancy 73.9 years.',
    source: SOURCES.bpsHdi,
  },
];
