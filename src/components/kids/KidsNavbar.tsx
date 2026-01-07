import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gamepad2, Trophy, User } from 'lucide-react';

const KidsNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Simplified navigation: لعب – الإنجازات – حسابي
  const navItems = [
    { 
      path: '/kids/category/prophets', 
      icon: Gamepad2, 
      label: t('kids.navbar.games'),
      matchPaths: ['/kids', '/kids/category']
    },
    { 
      path: '/kids/achievement', 
      icon: Trophy, 
      label: t('kids.navbar.achievements'),
      matchPaths: ['/kids/achievement']
    },
    { 
      path: '/kids/profile', 
      icon: User, 
      label: t('kids.navbar.profile'),
      matchPaths: ['/kids/profile']
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    return item.matchPaths.some(path => location.pathname.startsWith(path));
  };

  return (
    <>
      {/* Mobile Bottom Navbar - ≤ 1024px */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-3xl border-t-2 border-kids-green/20 px-2 sm:px-4 py-3 sm:py-4 z-50 lg:hidden">
        <div className="flex justify-around items-center max-w-full">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 sm:gap-1.5 px-2 sm:px-4 md:px-6 py-2 rounded-2xl transition-all duration-300 relative min-w-[44px] min-h-[44px] ${
                  active 
                    ? 'bg-gradient-to-br from-kids-green to-kids-blue text-white scale-110 shadow-lg' 
                    : 'text-muted-foreground hover:text-kids-green hover:bg-kids-green/10'
                }`}
              >
                <item.icon className={`w-5 h-5 sm:w-6 sm:h-7 ${active ? 'drop-shadow-lg' : ''}`} />
                <span className={`text-[10px] sm:text-xs font-bold font-tajawal ${active ? 'drop-shadow' : ''}`}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute -top-1 w-8 sm:w-10 h-1 bg-kids-yellow rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* Tablet/Desktop Sidebar - ≥ 1025px */}
      <nav className="hidden lg:flex fixed right-0 top-0 h-screen w-56 xl:w-64 bg-white shadow-xl border-l border-kids-green/20 z-40 flex-col pt-20">
        <div className="flex flex-col gap-2 px-3 xl:px-4">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-3 xl:px-4 py-3 rounded-xl transition-all duration-300 min-h-[44px] ${
                  active 
                    ? 'bg-gradient-to-br from-kids-green to-kids-blue text-white shadow-lg' 
                    : 'text-muted-foreground hover:text-kids-green hover:bg-kids-green/10'
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? 'drop-shadow-lg' : ''}`} />
                <span className={`text-sm font-bold font-tajawal ${active ? 'drop-shadow' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default KidsNavbar;
