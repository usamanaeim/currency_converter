import React from 'react'

export default function CurrencySelector({ value, onChange, rates }) {
  const fallback = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD']
  const options = rates ? Object.keys(rates) : fallback

  // sort alphabetically
  options.sort()

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
    >
      {options.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  )
}
