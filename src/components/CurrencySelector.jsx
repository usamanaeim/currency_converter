import React from 'react'

export default function CurrencySelector({ value, onChange, rates }) {
  // Build options list either from rates (keys) or fallback common currencies
  const currencyOptions = rates ? Object.keys(rates) : ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD']

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 rounded"
    >
      {currencyOptions.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  )
}
