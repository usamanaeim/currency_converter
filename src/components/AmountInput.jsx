import React from 'react'

export default function AmountInput({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min="0"
      className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-gray-300 dark:text-gray-900"
      placeholder="Enter amount"
    />
  )
}
