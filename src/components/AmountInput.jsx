import React from 'react'

export default function AmountInput({ value, onChange }) {
  return (
    <input
      type="number"
      min="0"
      step="any"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
    />
  )
}
