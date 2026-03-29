import { Link } from "react-router-dom";
import { Search, Upload, BookOpen, MessageCircle } from "lucide-react";

const footerLinks = [
  { to: "/browse", label: "Browse", icon: Search },
  { to: "/upload", label: "Upload", icon: Upload },
  { href: "https://docs.shelby.xyz", label: "Docs", icon: BookOpen },
  { href: "https://discord.gg/shelbyprotocol", label: "Discord", icon: MessageCircle },
];

export function Footer() {
  return (
    <footer className="border-t border-border/30 py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-sm text-muted-foreground">
        <p>ShelbyData — Built on Shelby Protocol</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map((link) => {
            const Icon = link.icon;
            return "to" in link ? (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>
        <p>
          Powered by <span className="text-primary">Shelby</span> 🌐
        </p>
      </div>
    </footer>
  );
}
