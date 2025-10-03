// src/services/currencyService.js
const BASE = 'https://api.exchangerate.host';

/**
 * Convert amount from one currency to another using exchangerate.host
 * Returns { result: number, info: {...} } or throws error
 */
export async function convertCurrency({ from, to, amount }) {
  if (!from || !to) throw new Error('Missing from/to currency');
  const url = `${BASE}/convert?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&amount=${encodeURIComponent(amount)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch conversion');
  const data = await res.json();
  // data.result is the converted value, data.info.rate is the exchange rate
  return data;
}

/**
 * Get latest rates for a base (optional symbols array). Returns raw JSON:
 * { base, date, rates: {...} }
 */
export async function getLatestRates(base = 'USD', symbols = []) {
  const qs = symbols.length ? `?base=${encodeURIComponent(base)}&symbols=${encodeURIComponent(symbols.join(','))}` : `?base=${encodeURIComponent(base)}`;
  const url = `${BASE}/latest${qs}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch latest rates');
  const data = await res.json();
  return data;
}

/**
 * Get supported symbols list
 */
export async function getSymbols() {
  const url = `${BASE}/symbols`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch symbols');
  const data = await res.json();
  return data.symbols; // object of symbol:{description, code}
}
