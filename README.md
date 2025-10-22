# Currency Converter
A simple and responsive **Currency Converter** web application built with **React (Vite)** and **Tailwind CSS**.  
This project fetches real-time exchange rates (ExchangeRate-API v6 example) from a public API and allows users to quickly convert between currencies.

---

## Live demo
https://osama-currencyconverter.netlify.app/ 
---

## Features
-  Convert between multiple currencies in real time.
-  Fetches live exchange rates from a public API.
-  Responsive design — works smoothly on desktop and mobile.
-  Styled with **Tailwind CSS** for a modern and consistent UI.
-  Error handling for API/network issues.

--- 

## New features added
- **Swap button** — click the Swap button between the currency selectors to swap From and To currencies instantly.
- **Dark mode toggle** — toggle between Light and Dark themes.
- **Search box** — users can simply type the currency name or code, like “USD” or “Euro,” and find it instantly.

---

## Tech Stack
- **React (Vite)** — fast and modern frontend build tool.  
- **Tailwind CSS** — utility-first CSS framework.  
- **Exchange Rate API** — provides real-time currency exchange data.  
- **Netlify (Deployment)** — hosts and deploys the live version of the app.  
 
---

## Project Structure
```text
currency-converter/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
├── .gitignore
├── .env.example
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    └── components/
        ├── AmountInput.jsx
        ├── ConversionResult.jsx
        ├── CurrencySelector.jsx
        └── RateInfo.jsx

