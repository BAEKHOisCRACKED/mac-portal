import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { MusicProvider } from "@/contexts/MusicContext";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Games from "./pages/Games";
import Apps from "./pages/Apps";
import Proxy from "./pages/Proxy";
import Widgets from "./pages/Widgets";
import Movies from "./pages/Movies";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SettingsProvider>
        <MusicProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/games" element={<Games />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/proxy" element={<Proxy />} />
                <Route path="/widgets" element={<Widgets />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </MusicProvider>
      </SettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
