import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import Upload from "./pages/Upload";
import MyUploads from "./pages/MyUploads";
import DatasetDetail from "./pages/DatasetDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: Network.TESTNET }}
      onError={(error) => console.error("Wallet error:", error)}
    >
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen dark">
            <Navbar />
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/my-uploads" element={<MyUploads />} />
                <Route path="/dataset/:accountAddress/:fileName" element={<DatasetDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AptosWalletAdapterProvider>
  </QueryClientProvider>
);

export default App;
