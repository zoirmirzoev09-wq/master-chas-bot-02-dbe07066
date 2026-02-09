import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { PageTransition } from "@/components/layout/PageTransition";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ClientCabinet from "./pages/ClientCabinet";
import MasterCabinet from "./pages/MasterCabinet";
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";
import HowItWorksPage from "./pages/HowItWorksPage";
import Categories from "./pages/Categories";
import Contacts from "./pages/Contacts";
import BecomeMaster from "./pages/BecomeMaster";
import Documentation from "./pages/Documentation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/become-master" element={<BecomeMaster />} />
                  <Route path="/cabinet/client" element={<ClientCabinet />} />
                  <Route path="/cabinet/master" element={<MasterCabinet />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/docs" element={<Documentation />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
