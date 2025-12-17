import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Star, BookOpen } from 'lucide-react';

const ExperienceSelection = () => {
  const navigate = useNavigate();
  const { setExperience } = useApp();

  const handleSelectKids = () => {
    setExperience('kids');
    navigate('/kids');
  };

  const handleSelectAdults = () => {
    setExperience('adults');
    navigate('/adults');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 islamic-pattern flex flex-col px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10 slide-up">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-adults-green to-adults-emerald rounded-full flex items-center justify-center mb-4 shadow-adults">
          <span className="text-3xl font-bold text-white font-amiri">ب</span>
        </div>
        <h1 className="text-2xl font-bold text-adults-green font-amiri mb-2">
          اختر تجربتك
        </h1>
        <p className="text-muted-foreground font-tajawal">
          من سيستخدم التطبيق؟
        </p>
      </div>

      {/* Experience Cards */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Kids Card */}
        <button
          onClick={handleSelectKids}
          className="group relative flex-1 min-h-[200px] rounded-4xl overflow-hidden shadow-kids hover:shadow-kids-lg transition-all duration-500 hover:scale-[1.02]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-kids-green via-kids-blue to-kids-yellow opacity-90" />
          <div className="absolute inset-0 islamic-pattern opacity-30" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Mascot */}
            <div className="mb-4 text-6xl float-animation">🧒🏻</div>
            
            {/* Stars decoration */}
            <div className="absolute top-6 right-6 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-5 h-5 text-kids-yellow fill-kids-yellow animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2 font-tajawal">
              الأطفال
            </h2>
            <p className="text-white/90 text-sm font-tajawal">
              تعلم ممتع مع الألعاب والمكافآت
            </p>
            
            {/* Playful decorations */}
            <div className="absolute bottom-4 left-4 text-4xl opacity-50">⭐</div>
            <div className="absolute top-4 left-4 text-3xl opacity-50">🎮</div>
          </div>
        </button>

        {/* Adults Card */}
        <button
          onClick={handleSelectAdults}
          className="group relative flex-1 min-h-[200px] rounded-4xl overflow-hidden shadow-adults hover:shadow-adults-lg transition-all duration-500 hover:scale-[1.02]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-adults-green via-adults-emerald to-adults-teal" />
          <div className="absolute inset-0 islamic-pattern-gold opacity-40" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Icon */}
            <div className="mb-4 w-20 h-20 bg-adults-gold/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-adults-gold" />
            </div>
            
            {/* Gold accent */}
            <div className="absolute top-6 right-6">
              <div className="w-3 h-3 bg-adults-gold rounded-full" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2 font-amiri">
              الكبار
            </h2>
            <p className="text-white/80 text-sm font-tajawal">
              محتوى علمي شامل ومعرفة عميقة
            </p>
            
            {/* Elegant decorations */}
            <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-adults-gold/30 rounded-lg rotate-45" />
            <div className="absolute top-4 left-4 w-6 h-6 border border-adults-gold/20 rounded-full" />
          </div>
        </button>
      </div>

      {/* Footer note */}
      <p className="text-center text-sm text-muted-foreground mt-6 font-tajawal">
        يمكنك التبديل بين التجربتين في أي وقت
      </p>
    </div>
  );
};

export default ExperienceSelection;
