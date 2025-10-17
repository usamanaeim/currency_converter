import React, { useEffect, useMemo, useRef, useState } from 'react'
export default function CurrencySelector({ value, onChange, rates }) {
  const fallback = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'BRL', 'ZAR']
  const options = useMemo(() => (rates ? Object.keys(rates) : fallback).slice(), [rates])
  options.sort()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  // filtered list based on query
  const filtered = useMemo(() => {
    if (!query) return options
    const q = query.trim().toLowerCase()
    return options.filter((c) => c.toLowerCase().includes(q))
  }, [options, query])

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // open & focus input when clicking container
  const handleOpen = () => {
    setOpen(true)
    setTimeout(() => {
      inputRef.current && inputRef.current.focus()
    }, 0)
  }
  useEffect(() => {
    setQuery('')
  }, [value])

  return (
    <div ref={containerRef} className="relative">
      <div
        className="flex items-center gap-2 w-full border rounded p-1 bg-white dark:bg-gray-300"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleOpen()
          }
        }}
      >
        {/* show currently selected currency code */}
        <div className="px-3 py-2 w-full">
          <div className="text-sm font-medium">{value}</div>
        </div>
        <div className="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* dropdown */}
      {open && (
        <div className="absolute z-40 mt-2 w-full bg-white dark:bg-gray-900 border rounded shadow-lg">
          <div className="p-2">
            <input
              ref={inputRef}
              type="search"
              inputMode="search"
              placeholder="Search currency"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:bg-gray-800 dark:text-white"
              aria-label="Search currencies"
            />
          </div>

          <div className="max-h-56 overflow-auto">
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text--500 dark:text-gray-400">No results</div>
            ) : (
              <ul className="divide-y">
                {filtered.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(c)
                        setOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:text-white"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{c}</div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}