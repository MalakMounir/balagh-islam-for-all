import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Gamepad2, Trophy, User } from 'lucide-react';

const navItems = [
  { path: '/kids', icon: Home, label: 'الرئيسية' },
  { path: '/kids/category/prophets', icon: Gamepad2, label: 'الألعاب' },
  { path: '/kids/achievement', icon: Trophy, label: 'الإنجازات' },
  { path: '/kids/profile', icon: User, label: 'حسابي' },
];

const KidsNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-3xl border-t border-border/50 px-2 py-3 max-w-md mx-auto">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-kids-green to-kids-blue text-white scale-110' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-tajawal">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default KidsNavbar;
