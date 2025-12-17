import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageSquare, User } from 'lucide-react';

const navItems = [
  { path: '/adults', icon: Home, label: 'الرئيسية' },
  { path: '/adults/category/library', icon: BookOpen, label: 'المكتبة' },
  { path: '/adults/chat', icon: MessageSquare, label: 'بليغ' },
  { path: '/adults/profile', icon: User, label: 'حسابي' },
];

const AdultsNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-border/50 px-4 py-3 max-w-md mx-auto">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/adults' && location.pathname === '/adults');
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-adults-green' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${
                isActive ? 'bg-adults-gold/20' : ''
              }`}>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-adults-gold' : ''}`} />
              </div>
              <span className="text-xs font-tajawal">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default AdultsNavbar;
