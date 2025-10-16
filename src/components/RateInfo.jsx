import React from 'react'

export default function RateInfo({ base, target, rates, loading }) {
  if (loading || !rates) return null

  const rate = rates[target]
  if (!rate) return null

  return (
    <div className="mt-2 p-3 border rounded bg-white">
      <div className="text-sm text-gray-500">Exchange Rate</div>
      <div className="text-base">
        1 <span className="font-medium">{base}</span> = <span className="font-semibold">{rate}</span> <span className="text-gray-600">{target}</span>
      </div>
    </div>
  )
}
