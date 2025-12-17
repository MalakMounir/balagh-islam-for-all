import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Star, Trophy, User, Home } from 'lucide-react';
import KidsNavbar from '@/components/kids/KidsNavbar';

const categories = [
  { id: 'prophets', title: 'قصص الأنبياء', icon: '📖', color: 'from-kids-green to-emerald-400' },
  { id: 'values', title: 'القيم والأخلاق', icon: '💝', color: 'from-kids-coral to-pink-400' },
  { id: 'questions', title: 'أسئلة دينية', icon: '❓', color: 'from-kids-blue to-cyan-400' },
  { id: 'knowgod', title: 'اعرف ربك', icon: '✨', color: 'from-kids-yellow to-amber-400' },
  { id: 'muslim', title: 'أنا مسلم', icon: '🕌', color: 'from-violet-400 to-purple-500' },
];

const KidsHome = () => {
  const navigate = useNavigate();
  const { kidsProgress } = useApp();

  return (
    <div className="min-h-screen theme-kids bg-kids-bg pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-kids-green via-kids-blue to-kids-green-light p-6 pt-8 rounded-b-[3rem] islamic-pattern">
        {/* Greeting */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white font-tajawal">
              أهلاً يا بطل! 🌟
            </h1>
            <p className="text-white/80 text-sm font-tajawal">
              هيا نتعلم ونلعب
            </p>
          </div>
          <button
            onClick={() => navigate('/kids/profile')}
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
          >
            <User className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Progress Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-kids-yellow" />
              <span className="text-white font-bold font-tajawal">
                المستوى {kidsProgress.level}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-kids-yellow fill-kids-yellow" />
              <span className="text-white font-bold">{kidsProgress.stars}</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-4 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-l from-kids-yellow to-kids-coral rounded-full progress-animated"
              style={{ width: `${(kidsProgress.stars % 100)}%` }}
            />
          </div>
          <p className="text-white/80 text-xs mt-2 text-center font-tajawal">
            {100 - (kidsProgress.stars % 100)} نجمة للمستوى التالي
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mt-8">
        <h2 className="text-xl font-bold text-foreground mb-4 font-tajawal">
          اختر اللعبة 🎮
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/kids/category/${cat.id}`)}
              className="card-kids p-6 text-center slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                <span className="text-3xl">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-foreground font-tajawal text-sm">
                {cat.title}
              </h3>
            </button>
          ))}
        </div>
      </div>

      <KidsNavbar />
    </div>
  );
};

export default KidsHome;
