import React from 'react'

export default function AmountInput({ value, onChange }) {
  return (
    <input
      type="number"
      min="0"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full border p-2 rounded"
    />
  )
}
