# Real-Time Crypto Price Tracker

A live, real-time crypto price tracker built with **React**, **Redux Toolkit**, and **Tailwind CSS**. This app allows users to view real-time updates of cryptocurrency prices, including top gainers, top losers, and their market cap and volume data. It also supports sorting, filtering, and features a dynamic 7-day price chart for each coin.

**Live Link**: [https://stock-tracker-flax.vercel.app/](https://stock-tracker-flax.vercel.app/)

---

## Features

- **Real-time Updates**: Crypto prices are updated every 2 seconds with simulated WebSocket data.
- **Search & Filter**: Search for coins by name or symbol and filter the data based on various criteria like top gainers, top losers, market cap, and price.
- **7-Day Price Chart**: A sparkline chart showing the price history for the last 7 days for each coin.
- **Responsive Design**: The app is fully responsive and works well on all devices.
- **Sorting**: Sort the cryptocurrency table by top gainers, top losers, market cap, or price.
- **User-Friendly Interface**: Designed with a clean UI and easy-to-navigate features using **Tailwind CSS**.

---

## Tech Stack

### Frontend:
- **React.js** - For building the UI.
- **Redux Toolkit** - For state management.
- **Tailwind CSS** - For styling.
- **JavaScript (ES6)** - For logic and functionality.

### Other Tools:
- **Simulated WebSocket** - For real-time data updates.
- **Vercel** - For deployment.

---

## Installation

To run the project locally, follow these steps:

### 1. Clone the Repository:
```bash
git clone https://github.com/Gourav123-sys/crypto-price-tracker.git
cd crypto-price-tracker
npm install
2. Install Dependencies:
This project uses the following dependencies:

React (for building the UI)

Redux Toolkit (for state management)

Tailwind CSS (for styling)

Lucide Icons (for icons like search and filter)

Other utilities for WebSocket simulation.

To install all dependencies, run:

npm install react react-dom react-redux @reduxjs/toolkit lucide-react

Tailwind CSS Setup

Follow these steps to set up Tailwind CSS in your project:

1. Install Tailwind CSS and Vite Plugin:
First, install Tailwind CSS and @tailwindcss/vite via npm:


npm install tailwindcss @tailwindcss/vite
2. Configure the Vite Plugin:
Add the @tailwindcss/vite plugin to your Vite configuration.

In the vite.config.js file, include the following:


import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
});
3. Import Tailwind CSS:
Create a CSS file (e.g., src/index.css) if it doesn't already exist. In this file, import Tailwind CSS:


@import "tailwindcss";
4. Start the Build Process:
Finally, run your build process to ensure everything is set up properly. In the terminal, execute:

npm run dev
