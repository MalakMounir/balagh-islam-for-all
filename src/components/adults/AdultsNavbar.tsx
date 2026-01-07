import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, MessageSquare, User } from 'lucide-react';

const AdultsNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/adults', icon: Home, label: t('adults.navbar.home') },
    { path: '/adults/category/library', icon: BookOpen, label: t('adults.navbar.library') },
    { path: '/adults/chat', icon: MessageSquare, label: t('adults.navbar.balegh') },
    { path: '/adults/profile', icon: User, label: t('adults.navbar.profile') },
  ];

  return (
    <>
      {/* Mobile Bottom Navbar - ≤ 1024px */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-border/50 px-2 sm:px-4 py-3 z-50 lg:hidden">
        <div className="flex justify-around max-w-full">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === '/adults' && location.pathname === '/adults');
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-2 sm:px-4 py-2 rounded-xl transition-all duration-300 min-w-[44px] min-h-[44px] ${
                  isActive 
                    ? 'text-adults-green' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`p-1.5 sm:p-2 rounded-xl transition-all ${
                  isActive ? 'bg-adults-gold/20' : ''
                }`}>
                  <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-adults-gold' : ''}`} />
                </div>
                <span className="text-[10px] sm:text-xs font-tajawal">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    
      {/* Tablet/Desktop Sidebar - ≥ 1025px */}
      <nav className="hidden lg:flex fixed right-0 top-0 h-screen w-56 xl:w-64 bg-white shadow-xl border-l border-border/50 z-40 flex-col pt-20">
        <div className="flex flex-col gap-2 px-3 xl:px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === '/adults' && location.pathname === '/adults');
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-3 xl:px-4 py-3 rounded-xl transition-all duration-300 min-h-[44px] ${
                  isActive 
                    ? 'bg-adults-gold/20 text-adults-green' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-adults-beige'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-adults-gold' : ''}`} />
                <span className="text-sm font-tajawal">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default AdultsNavbar;
