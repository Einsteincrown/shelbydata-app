import { Link } from "react-router-dom";

const footerLinks = [
  { to: "/browse", label: "Browse" },
  { to: "/upload", label: "Upload" },
  { href: "https://docs.shelby.xyz", label: "Docs" },
  { href: "https://discord.gg/shelbyprotocol", label: "Discord" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/30 py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-sm text-muted-foreground">
        <p>ShelbyData — Built on Shelby Protocol</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map((link) =>
            "to" in link ? (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>
        <p>
          Powered by <span className="text-primary">Shelby</span> 🌐
        </p>
      </div>
    </footer>
  );
}
