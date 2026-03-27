import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, Loader2 } from "lucide-react";
import { formatAddress } from "@/lib/format";

const navLinks = [
  { to: "/browse", label: "Browse" },
  { to: "/upload", label: "Upload" },
  { to: "/my-uploads", label: "My Uploads" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { account, connected, connect, disconnect, wallets } = useWallet();
  const walletAddress = account?.address?.toString() ?? null;

  const handleConnect = async () => {
    try {
      // If there's a wallet available, connect to the first one
      if (wallets && wallets.length > 0) {
        await connect(wallets[0].name);
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold gradient-text">
          ShelbyData
        </Link>

        {/* Testnet badge */}
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Live on Shelby Testnet
        </span>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground pb-1 border-b-2 border-transparent"
              activeClassName="!text-foreground !border-primary"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop wallet button */}
        <div className="hidden md:flex items-center">
          {walletAddress ? (
            <button
              onClick={handleDisconnect}
              className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-muted/50 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-green-400" />
              {formatAddress(walletAddress)}
            </button>
          ) : (
            <Button
              onClick={handleConnect}
              className="gradient-primary text-primary-foreground border-0 rounded-full px-6"
            >
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/30 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="!text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {walletAddress ? (
              <button
                onClick={() => { handleDisconnect(); setMobileOpen(false); }}
                className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 w-fit"
              >
                <span className="h-2 w-2 rounded-full bg-green-400" />
                {formatAddress(walletAddress)}
              </button>
            ) : (
              <Button
                onClick={() => { handleConnect(); setMobileOpen(false); }}
                className="gradient-primary text-primary-foreground border-0 rounded-full w-fit px-6"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
