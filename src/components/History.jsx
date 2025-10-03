// src/components/History.jsx
import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'currency_converter_history_v1';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(()=> {
    try {
      setHistory(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);
    } catch {
      setHistory([]);
    }
  }, []);

  function handleClear() {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }

  if (!history || history.length === 0) {
    return (
      <aside className="card history">
        <h3>Conversion History</h3>
        <p>No conversions yet — make one!</p>
      </aside>
    );
  }

  return (
    <aside className="card history">
      <h3>Conversion History</h3>
      <button onClick={handleClear} className="btn small">Clear</button>
      <ul>
        {history.map(item => (
          <li key={item.id} className="history-item">
            <div>
              <strong>{item.amount} {item.from}</strong> → <strong>{Number(item.result).toFixed(4)} {item.to}</strong>
            </div>
            <div className="muted">{new Date(item.timestamp).toLocaleString()}</div>
            {item.rate && <div className="muted">Rate: {Number(item.rate).toFixed(6)}</div>}
          </li>
        ))}
      </ul>
    </aside>
  );
}
