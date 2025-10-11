import React from 'react'

export default function RateInfo({ base, target, rates, loading }) {
  if (loading) return null
  if (!rates) return null
  const rate = rates[target]
  if (!rate) return null

  return (
    <div className="mt-3 p-3 border rounded bg-white">
      <div className="text-sm text-gray-500">Exchange Rate</div>
      <div className="text-base">
        1 {base} = <span className="font-semibold">{rate}</span> {target}
      </div>
    </div>
  )
}
