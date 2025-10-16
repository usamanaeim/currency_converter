import React from 'react'

export default function ConversionResult({ amount, converted, target, loading }) {
  if (loading) {
    return <div className="p-3 bg-gray-50 rounded mb-3">Loading rates…</div>
  }
  if (converted === null) {
    return <div className="p-3 bg-gray-50 rounded mb-3 text-gray-500">Conversion not available yet.</div>
  }

  return (
    <div className="p-4 bg-indigo-50 rounded mb-3">
      <div className="text-sm text-gray-600">Converted</div>
      <div className="text-xl font-semibold text-indigo-700">
        {amount} → {converted} {target}
      </div>
    </div>
  )
}
