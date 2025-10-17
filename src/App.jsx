import React, { useEffect, useMemo, useState } from 'react'
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

  // dark mode: 'light' , 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('cc_theme') || 'light'
    } catch {
      return 'light'
    }
  })

  const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY ?? null

  // apply theme to document root
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('cc_theme', theme)
    } catch {}
  }, [theme])

  // fetch rates whenever base changes
  useEffect(() => {
    if (!API_KEY) {
      setError('Missing API key. Please set VITE_EXCHANGE_API_KEY in your .env')
      setRates(null)
      return
    }

    let cancelled = false
    async function loadRates() {
      setLoading(true)
      setError(null)
      try {
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Network error: ${res.status}`)
        const data = await res.json()
        const conversionRates = data.conversion_rates ?? data.rates ?? null
        if (!conversionRates) throw new Error('Invalid API response shape')
        if (!cancelled) setRates(conversionRates)
      } catch (err) {
        if (!cancelled) setError(String(err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadRates()
    return () => {
      cancelled = true
    }
  }, [base, API_KEY])

  const converted = useMemo(() => {
    if (!rates) return null
    const rate = rates[target]
    if (!rate) return null
    const numericAmount = Number(amount) || 0
    return (numericAmount * rate).toFixed(4)
  }, [rates, target, amount])

  // swap base and target
  const handleSwap = () => {
    setBase((prevBase) => {
      // swap: setBase to current target
      const oldBase = prevBase
      setTarget(oldBase) 
      return target 
    })
  }

  // toggle theme
  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-card rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Currency Converter</h1>
            <p className="text-sm text-muted">Convert amounts between currencies using real-time rates.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="inline-flex items-center px-3 py-2 border rounded-md text-sm bg-white dark:bg-transparent hover:ring-2 focus:outline-none"
            >
              {theme === 'dark' ? '☀️' : '🌙 '}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-500 dark:text-muted mb-1">From</label>
            <CurrencySelector value={base} onChange={setBase} rates={rates} />
          </div>

          <div className="flex items-center gap-2 justify-center">
            {/* Swap button centered between selectors (on md screens it sits between) */}
            <button
              onClick={handleSwap}
              aria-label="Swap Currencies"
              title="Swap Currencies"
              className="px-3 py-2 rounded-md border bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
            >
              ⇄ 
            </button>
            <div className="hidden md:block w-4" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-muted mb-1">To</label>
            <CurrencySelector value={target} onChange={setTarget} rates={rates} />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 dark:text-muted mb-1">Amount</label>
          <AmountInput value={amount} onChange={setAmount} />
        </div>

        <ConversionResult amount={amount} converted={converted} target={target} loading={loading} />

        <RateInfo base={base} target={target} rates={rates} loading={loading} />

        <div className="mt-6 text-xs text-muted">
          <p>Powered by ExchangeRate-API.</p>
        </div>
      </div>
    </div>
  )
}

export default App
