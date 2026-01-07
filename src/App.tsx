import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SplashScreen from "./pages/SplashScreen";
import LanguageSelection from "./pages/LanguageSelection";
import Onboarding from "./pages/Onboarding";
import ExperienceSelection from "./pages/ExperienceSelection";
import AuthWelcome from "./pages/auth/AuthWelcome";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AddChildProfile from "./pages/auth/setup/AddChildProfile";
import ParentPreferences from "./pages/auth/setup/ParentPreferences";
import LanguageConfirmation from "./pages/auth/setup/LanguageConfirmation";
import AccountTypeSelection from "./pages/auth/setup/AccountTypeSelection";
import SetupConfirmation from "./pages/auth/setup/SetupConfirmation";
import KidsHome from "./pages/kids/KidsHome";
import KidsCategory from "./pages/kids/KidsCategory";
import KidsQuestion from "./pages/kids/KidsQuestion";
import KidsAchievement from "./pages/kids/KidsAchievement";
import KidsProfile from "./pages/kids/KidsProfile";
import KidsAskBalegh from "./pages/kids/KidsAskBalegh";
import KidsParentZone from "./pages/kids/KidsParentZone";
import KidsArticle from "./pages/kids/KidsArticle";
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
        <BrowserRouter basename={import.meta.env.PROD ? "/balagh-islam-for-all" : ""}>
          <div className="mobile-frame bg-background w-full overflow-x-hidden">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<SplashScreen />} />
              <Route path="/auth" element={<ProtectedRoute requireAuth={false}><AuthWelcome /></ProtectedRoute>} />
              <Route path="/auth/signup" element={<ProtectedRoute requireAuth={false}><SignUp /></ProtectedRoute>} />
              <Route path="/auth/login" element={<ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>} />
              <Route path="/auth/forgot-password" element={<ProtectedRoute requireAuth={false}><ForgotPassword /></ProtectedRoute>} />
              
              {/* Setup Routes (require auth but allow during setup) */}
              <Route path="/auth/setup/language" element={<ProtectedRoute requireAuth={false}><LanguageConfirmation /></ProtectedRoute>} />
              <Route path="/auth/setup/account-type" element={<ProtectedRoute requireAuth={false}><AccountTypeSelection /></ProtectedRoute>} />
              <Route path="/auth/setup/add-child" element={<ProtectedRoute requireAuth={false}><AddChildProfile /></ProtectedRoute>} />
              <Route path="/auth/setup/preferences" element={<ProtectedRoute requireAuth={false}><ParentPreferences /></ProtectedRoute>} />
              <Route path="/auth/setup/confirmation" element={<ProtectedRoute requireAuth={false}><SetupConfirmation /></ProtectedRoute>} />
              
              {/* Optional Routes */}
              <Route path="/language-selection" element={<LanguageSelection />} />
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route path="/select-experience" element={<ProtectedRoute><ExperienceSelection /></ProtectedRoute>} />
              
              {/* Kids Routes - Require Authentication */}
              <Route path="/kids" element={<ProtectedRoute><KidsHome /></ProtectedRoute>} />
              <Route path="/kids/category/:id" element={<ProtectedRoute><KidsCategory /></ProtectedRoute>} />
              <Route path="/kids/article/:categoryId/:articleId" element={<ProtectedRoute><KidsArticle /></ProtectedRoute>} />
              <Route path="/kids/question" element={<ProtectedRoute><KidsQuestion /></ProtectedRoute>} />
              <Route path="/kids/achievement" element={<ProtectedRoute><KidsAchievement /></ProtectedRoute>} />
              <Route path="/kids/profile" element={<ProtectedRoute><KidsProfile /></ProtectedRoute>} />
              <Route path="/kids/ask-balegh" element={<ProtectedRoute><KidsAskBalegh /></ProtectedRoute>} />
              <Route path="/kids/parents-area" element={<ProtectedRoute requireParent={true}><KidsParentZone /></ProtectedRoute>} />
              
              {/* Adults Routes - Require Authentication */}
              <Route path="/adults" element={<ProtectedRoute><AdultsHome /></ProtectedRoute>} />
              <Route path="/adults/category/:id" element={<ProtectedRoute><AdultsCategory /></ProtectedRoute>} />
              <Route path="/adults/article/:id" element={<ProtectedRoute><AdultsArticle /></ProtectedRoute>} />
              <Route path="/adults/chat" element={<ProtectedRoute><AdultsChat /></ProtectedRoute>} />
              <Route path="/adults/gift" element={<ProtectedRoute><AdultsGift /></ProtectedRoute>} />
              <Route path="/adults/profile" element={<ProtectedRoute><AdultsProfile /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
