

## ShelbyData — Full App Build

The project is currently a blank scaffold. This plan builds the complete ShelbyData app with all pages, navigation, and polish.

### Dependencies to Install
`@shelby-protocol/sdk`, `@aptos-labs/ts-sdk`, `@aptos-labs/wallet-adapter-react`

### Files to Create/Modify

| File | Purpose |
|------|---------|
| `.env.example` | Document required env vars |
| `src/index.css` | Dark pink/purple/cyan design system |
| `tailwind.config.ts` | Custom colors, glassmorphism, blob/shimmer/fade animations |
| `src/lib/shelby.ts` | ShelbyClient singleton (TESTNET) |
| `src/lib/format.ts` | formatFileSize, formatAddress, formatDate, getFileType |
| `src/lib/constants.ts` | Shelby API base URL |
| `src/components/Navbar.tsx` | Frosted glass navbar — gradient logo, nav links with pink active underline, wallet connect/disconnect, mobile hamburger menu |
| `src/components/Footer.tsx` | Links to Browse, Upload, Docs, Discord + "Powered by Shelby" |
| `src/components/PageWrapper.tsx` | Fade-in animation wrapper (200ms) |
| `src/components/CopyButton.tsx` | Copy to clipboard, green checkmark flash |
| `src/components/FileTypeIcon.tsx` | Colored icon badge per file type |
| `src/components/DatasetCard.tsx` | Glassmorphism card for browse/my-uploads grids |
| `src/App.tsx` | AptosWalletAdapterProvider + all routes + Navbar/Footer layout |
| `src/pages/Index.tsx` | Hero with animated blobs, gradient headline, 2 CTAs, 3 feature cards |
| `src/pages/Browse.tsx` | Fetch blobs from connected wallet, search bar, file type filter chips, dataset grid, skeleton/empty/error states |
| `src/pages/Upload.tsx` | 3-step stepper (Encode → Register → Upload), drag-drop zone, success screen with Shelby URL |
| `src/pages/MyUploads.tsx` | Same as Browse but scoped to connected wallet, connect prompt if disconnected |
| `src/pages/DatasetDetail.tsx` | Back link, metadata card (2-col grid with copy buttons), download button with pulsing glow + loading/success states, collapsible file preview |

### Key Technical Details

- **Wallet**: `useWallet()` hook for connect/disconnect, account address access, `signAndSubmitTransaction`
- **Data fetching**: `@tanstack/react-query` wrapping `shelbyClient.coordination.getAccountBlobs()`
- **Upload SDK calls**: erasure coding → on-chain registration → RPC upload (exact SDK imports per user spec)
- **Download**: fetch blob URL → create object URL → trigger download link click
- **Preview**: TXT/JSON → code block, CSV → table (10 rows), PDF → "download to view" message; only for files < 500KB
- **Toasts**: Sonner (already installed) styled to match dark pink theme
- **Routing**: React Router with `/`, `/browse`, `/upload`, `/my-uploads`, `/dataset/:accountAddress/:fileName`

