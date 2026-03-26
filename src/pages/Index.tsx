import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageWrapper } from "@/components/PageWrapper";
import { Rocket, Shield, DollarSign } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Lightning Fast",
    description: "Sub-second reads from Shelby hot storage",
  },
  {
    icon: Shield,
    title: "Decentralized",
    description: "No central server, stored on-chain via Aptos",
  },
  {
    icon: DollarSign,
    title: "Open Access",
    description: "Anyone can browse and download freely",
  },
];

const Index = () => {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.15] blur-[100px]"
          style={{
            background: "hsl(330 81% 60%)",
            animation: "blob-drift-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-[0.15] blur-[100px]"
          style={{
            background: "hsl(270 60% 50%)",
            animation: "blob-drift-2 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-[0.15] blur-[100px]"
          style={{
            background: "hsl(187 94% 43%)",
            animation: "blob-drift-3 22s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            The Open{" "}
            <span className="gradient-text">Dataset</span>{" "}
            Marketplace
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Upload, share, and download datasets stored permanently on Shelby's
            decentralized hot storage network.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="gradient-primary text-primary-foreground border-0 rounded-full px-8 h-12 text-base">
              <Link to="/browse">Browse Datasets</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="glass border-primary/50 text-foreground rounded-full px-8 h-12 text-base hover:border-primary"
            >
              <Link to="/upload">Upload a Dataset</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="glass border-border/30">
              <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center mb-2">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Index;
