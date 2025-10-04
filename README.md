# Currency Converter

A simple and responsive **Currency Converter** web application built with **React (Vite)** and **Tailwind CSS**.  
This project fetches real-time exchange rates from a public API and allows users to quickly convert between currencies.

---

## Features
-  Convert between multiple currencies in real time.
-  Fetches live exchange rates from a public API.
-  Responsive design — works smoothly on desktop and mobile.
-  Styled with **Tailwind CSS** for a modern and consistent UI.
-  Error handling for API/network issues.

---

##  Tech Stack
- **React (Vite)** — fast and modern frontend build tool.
- **Tailwind CSS** — utility-first CSS framework.
- **Exchange Rate API** — provides real-time currency exchange data.

---

## Project Structure
```text
currency_converter/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable React components (CurrencySelector, Result, etc.)
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # React entry point
│   └── index.css       # Tailwind CSS styles
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
