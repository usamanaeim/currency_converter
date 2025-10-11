import React, { useEffect, useState } from 'react'
import CurrencySelector from './components/CurrencySelector'
import AmountInput from './components/AmountInput'
import ConversionResult from './components/ConversionResult'
import RateInfo from './components/RateInfo'

function App() {
  const [base, setBase] = useState('USD')
  const [target, setTarget] = useState('EUR')
  const [amount, setAmount] = useState(1)
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY

  // fetch rates for base currency
  useEffect(() => {
    if (!API_KEY) {
      setError('Missing API key. Add VITE_EXCHANGE_API_KEY to your .env')
      return
    }

    let canceled = false
    async function getRates() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`)
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        // check for provider-specific fields
        const conversionRates = data.conversion_rates ?? data.rates ?? null
        if (!conversionRates) throw new Error('Invalid API response')
        if (!canceled) setRates(conversionRates)
      } catch (err) {
        if (!canceled) setError(String(err))
      } finally {
        if (!canceled) setLoading(false)
      }
    }
    getRates()
    return () => { canceled = true }
  }, [base, API_KEY])

  // compute converted amount
  const converted = React.useMemo(() => {
    if (!rates) return null
    const rate = rates[target]
    if (!rate) return null
    return (amount * rate).toFixed(4)
  }, [rates, target, amount])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <CurrencySelector
              value={base}
              onChange={setBase}
              rates={rates}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <CurrencySelector
              value={target}
              onChange={setTarget}
              rates={rates}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <AmountInput value={amount} onChange={setAmount} />
        </div>

        <div className="mb-4">
          <ConversionResult amount={amount} converted={converted} target={target} loading={loading} />
        </div>

        <RateInfo base={base} target={target} rates={rates} loading={loading} />

        <div className="mt-4 text-sm text-gray-500">
          <p>Powered by ExchangeRate-API (or similar). Do not commit your real API key.</p>
        </div>
      </div>
    </div>
  )
}

export default App
