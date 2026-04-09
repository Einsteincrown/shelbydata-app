# ShelbyVerse 

A decentralized dataset marketplace built on Shelby Protocol — 
upload, browse, and download datasets stored on Shelby's 
hot storage network, powered by Aptos.

## Live Demo
https://shelby-sparkle-share.vercel.app/

## What It Does

- **Decentralized Dataset Upload** — Upload CSV, JSON, PDF, and TXT 
files directly to Shelby's decentralized hot storage network via 
your Aptos wallet.

- **Open Dataset Browsing** — Browse, search, and filter datasets 
stored on the Shelby network — no wallet needed.

- **Instant File Download** — Download any dataset in near real-time 
directly from Shelby's hot storage with a single click.

- **Personal Upload Dashboard** — Track your upload history, total 
storage used, and manage all your published datasets in one place.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Shelby Protocol SDK (@shelby-protocol/sdk)
- Aptos Wallet Adapter (@aptos-labs/wallet-adapter-react)
- Aptos TypeScript SDK (@aptos-labs/ts-sdk)
- Deployed on Vercel

## Getting Started

### Prerequisites
- Node.js v18+
- An Aptos wallet (Petra recommended)
- Shelby API key (from Shelby Discord)
- Aptos API key (from geomi.dev)

### Installation

1. Clone the repo
git clone https://github.com/YOUR_USERNAME/shelbydata.git

2. Install dependencies
npm install

3. Set up environment variables
cp .env.example .env

4. Fill in your API keys in the .env file
VITE_SHELBY_API_KEY=your_shelby_api_key_here
VITE_APTOS_API_KEY=your_aptos_api_key_here

5. Run the development server
npm run dev

## Environment Variables

| Variable | Description |
|---|---|
| VITE_SHELBY_API_KEY | Your Shelby Protocol API key |
| VITE_APTOS_API_KEY | Your Aptos API key from Geomi |

## Current Limitations

- Testnet only — not on mainnet yet
- Requires ShelbyUSD tokens for uploads (request via Shelby Discord)
- Files expire after 30 days by default
- Browse page is scoped to connected wallet address
- No on-chain payment mechanic between users yet



