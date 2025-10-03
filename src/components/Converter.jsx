// src/components/Converter.jsx
import React, { useEffect, useState } from 'react';
import { convertCurrency, getSymbols } from '../services/currencyService';

const STORAGE_KEY = 'currency_converter_history_v1';

export default function Converter() {
  const [symbols, setSymbols] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // fetch list of currency symbols
    let mounted = true;
    getSymbols().then(s => {
      if (!mounted) return;
      const keys = Object.keys(s).sort();
      setSymbols(keys);
      // default from/to only if not set
      if (!from && keys.length) setFrom(keys[0]);
      if (!to && keys.includes('EUR')) setTo('EUR');
    }).catch(() => {
      // fallback to common list
      setSymbols(['USD','EUR','GBP','JPY','CAD','AUD']);
    });
    return () => mounted = false;
  }, []);

  async function handleConvert(e) {
    e && e.preventDefault();
    setError('');
    setResult(null);
    setRate(null);
    setLoading(true);
    try {
      const amt = parseFloat(amount) || 0;
      const data = await convertCurrency({ from, to, amount: amt });
      // data.result and data.info.rate
      setResult(data.result);
      setRate(data.info ? data.info.rate : (data.result && amt ? data.result/amt : null));
      // save to history
      const entry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        from, to, amount: amt,
        result: data.result,
        rate: data.info ? data.info.rate : null
      };
      const next = [entry, ...history].slice(0, 50);
      setHistory(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      setError('Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleSwap() {
    setFrom(prev => {
      setTo(prev);
      return to;
    });
  }

  return (
    <section className="card converter">
      <h2>Convert Currency</h2>

      <form onSubmit={handleConvert} className="form">
        <div className="row">
          <label>Amount</label>
          <input type="number" min="0" step="any" value={amount} onChange={e=>setAmount(e.target.value)} />
        </div>

        <div className="row">
          <label>From</label>
          <select value={from} onChange={e=>setFrom(e.target.value)}>
            {symbols.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="row">
          <label>To</label>
          <select value={to} onChange={e=>setTo(e.target.value)}>
            {symbols.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="row buttons">
          <button type="button" onClick={handleSwap} className="btn secondary">Swap</button>
          <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Converting...' : 'Convert'}</button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      {result !== null && (
        <div className="result">
          <p><strong>{amount} {from} = {Number(result).toFixed(4)} {to}</strong></p>
          {rate && <small>1 {from} = {Number(rate).toFixed(6)} {to}</small>}
        </div>
      )}
    </section>
  );
}
