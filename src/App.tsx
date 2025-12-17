import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import ExperienceSelection from "./pages/ExperienceSelection";
import KidsHome from "./pages/kids/KidsHome";
import KidsCategory from "./pages/kids/KidsCategory";
import KidsQuestion from "./pages/kids/KidsQuestion";
import KidsAchievement from "./pages/kids/KidsAchievement";
import KidsProfile from "./pages/kids/KidsProfile";
import AdultsHome from "./pages/adults/AdultsHome";
import AdultsCategory from "./pages/adults/AdultsCategory";
import AdultsArticle from "./pages/adults/AdultsArticle";
import AdultsChat from "./pages/adults/AdultsChat";
import AdultsGift from "./pages/adults/AdultsGift";
import AdultsProfile from "./pages/adults/AdultsProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="mobile-frame bg-background min-h-screen">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/select-experience" element={<ExperienceSelection />} />
              
              {/* Kids Routes */}
              <Route path="/kids" element={<KidsHome />} />
              <Route path="/kids/category/:id" element={<KidsCategory />} />
              <Route path="/kids/question" element={<KidsQuestion />} />
              <Route path="/kids/achievement" element={<KidsAchievement />} />
              <Route path="/kids/profile" element={<KidsProfile />} />
              
              {/* Adults Routes */}
              <Route path="/adults" element={<AdultsHome />} />
              <Route path="/adults/category/:id" element={<AdultsCategory />} />
              <Route path="/adults/article/:id" element={<AdultsArticle />} />
              <Route path="/adults/chat" element={<AdultsChat />} />
              <Route path="/adults/gift" element={<AdultsGift />} />
              <Route path="/adults/profile" element={<AdultsProfile />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
