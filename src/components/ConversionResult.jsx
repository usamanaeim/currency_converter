import React from 'react'

export default function ConversionResult({ amount, converted, target, loading }) {
  if (loading) return <div className="p-3">Loading rates...</div>
  if (converted === null) return <div className="p-3 text-gray-500">No conversion available yet.</div>

  return (
    <div className="p-3 bg-gray-50 rounded">
      <div className="text-sm text-gray-500">Result</div>
      <div className="text-lg font-semibold">
        {amount} → {converted} {target}
      </div>
    </div>
  )
}
