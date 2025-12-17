import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { ChevronRight, Star, Trophy, Medal, Crown, Settings, LogOut } from 'lucide-react';
import KidsNavbar from '@/components/kids/KidsNavbar';

const badges = [
  { id: 1, name: 'طالب علم', icon: '📚', unlocked: true },
  { id: 2, name: 'حافظ القرآن', icon: '🕋', unlocked: true },
  { id: 3, name: 'بطل الأخلاق', icon: '💎', unlocked: true },
  { id: 4, name: 'نجم متألق', icon: '⭐', unlocked: false },
  { id: 5, name: 'عالم صغير', icon: '🎓', unlocked: false },
  { id: 6, name: 'قائد المستقبل', icon: '👑', unlocked: false },
];

const KidsProfile = () => {
  const navigate = useNavigate();
  const { kidsProgress, setExperience } = useApp();

  const handleSwitchExperience = () => {
    setExperience(null);
    navigate('/select-experience');
  };

  return (
    <div className="min-h-screen theme-kids bg-kids-bg pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-kids-green via-kids-blue to-kids-yellow p-6 pt-10 rounded-b-[3rem] text-center relative">
        <button 
          onClick={() => navigate('/kids')}
          className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Avatar */}
        <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
          <span className="text-5xl">🧒🏻</span>
        </div>

        <h1 className="text-2xl font-bold text-white font-tajawal mb-1">
          البطل الصغير
        </h1>
        <p className="text-white/80 text-sm font-tajawal">
          عضو منذ 2024
        </p>

        {/* Level badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mt-4">
          <Crown className="w-5 h-5 text-kids-yellow" />
          <span className="text-white font-bold font-tajawal">
            المستوى {kidsProgress.level}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mt-6">
        <div className="card-kids p-6">
          <h2 className="font-bold text-foreground mb-4 font-tajawal">إنجازاتي</h2>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-kids-yellow-light rounded-2xl p-4">
              <Star className="w-8 h-8 text-kids-yellow fill-kids-yellow mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{kidsProgress.stars}</p>
              <p className="text-sm text-muted-foreground font-tajawal">نجمة</p>
            </div>
            
            <div className="bg-kids-green-light rounded-2xl p-4">
              <Trophy className="w-8 h-8 text-kids-green mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{kidsProgress.level}</p>
              <p className="text-sm text-muted-foreground font-tajawal">مستوى</p>
            </div>
            
            <div className="bg-kids-blue-light rounded-2xl p-4">
              <Medal className="w-8 h-8 text-kids-blue mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground font-tajawal">وسام</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="px-6 mt-6">
        <div className="card-kids p-6">
          <h2 className="font-bold text-foreground mb-4 font-tajawal">الأوسمة</h2>
          
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className={`text-center p-3 rounded-2xl transition-all ${
                  badge.unlocked 
                    ? 'bg-kids-yellow-light' 
                    : 'bg-muted opacity-50'
                }`}
              >
                <div className={`text-3xl mb-1 ${!badge.unlocked && 'grayscale'}`}>
                  {badge.icon}
                </div>
                <p className="text-xs font-tajawal text-foreground">
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 mt-6 space-y-3">
        <button className="w-full card-kids p-4 flex items-center gap-4">
          <Settings className="w-6 h-6 text-muted-foreground" />
          <span className="font-tajawal text-foreground">الإعدادات</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground mr-auto rotate-180" />
        </button>
        
        <button 
          onClick={handleSwitchExperience}
          className="w-full card-kids p-4 flex items-center gap-4"
        >
          <LogOut className="w-6 h-6 text-kids-coral" />
          <span className="font-tajawal text-kids-coral">تغيير التجربة</span>
          <ChevronRight className="w-5 h-5 text-kids-coral mr-auto rotate-180" />
        </button>
      </div>

      <KidsNavbar />
    </div>
  );
};

export default KidsProfile;
