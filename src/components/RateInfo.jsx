import React from 'react'

export default function RateInfo({ base, target, rates, loading }) {
  if (loading || !rates) return null
  const rate = rates[target]
  if (!rate) return null

  return (
    <div className="mt-3 p-4 rounded-lg text-gray-900 dark:bg-gray-300">
      <p className="text-sm">
        1 {base} = <span className="font-medium">{rate}</span> {target}
      </p>
    </div>
  )
}
