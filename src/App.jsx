import React from 'react';
import Converter from './components/Converter';
import History from './components/History';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Currency Converter</h1>
        <p>Live conversions using exchangerate.host</p>
      </header>

      <main className="main">
        <Converter />
        <History />
      </main>

      <footer className="footer">
        <small>Powered by exchangerate.host — no API key required</small>
      </footer>
    </div>
  );
}

export default App;
