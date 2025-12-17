import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Star, Trophy, Medal } from 'lucide-react';
import { useEffect, useState } from 'react';

const KidsAchievement = () => {
  const navigate = useNavigate();
  const { kidsProgress } = useApp();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-green via-kids-blue to-kids-yellow flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#7BC67E', '#87CEEB', '#FFD93D', '#FF6B6B'][Math.floor(Math.random() * 4)],
                width: '10px',
                height: '10px',
                borderRadius: '2px',
              }}
            />
          ))}
        </div>
      )}

      {/* Badge */}
      <div className="relative mb-8 celebrate">
        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <div className="w-32 h-32 bg-gradient-to-br from-kids-yellow to-amber-400 rounded-full flex items-center justify-center">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </div>
        
        {/* Stars around badge */}
        {[...Array(6)].map((_, i) => (
          <Star
            key={i}
            className="absolute w-8 h-8 text-kids-yellow fill-kids-yellow star-spin"
            style={{
              top: `${50 + 60 * Math.sin((i * Math.PI) / 3)}%`,
              left: `${50 + 60 * Math.cos((i * Math.PI) / 3)}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white text-center mb-4 font-tajawal slide-up">
        🎉 مبروك يا بطل!
      </h1>

      {/* Stats */}
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 w-full max-w-xs mb-8 slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-around">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-6 h-6 text-kids-yellow fill-kids-yellow" />
              <span className="text-2xl font-bold text-white">{kidsProgress.stars}</span>
            </div>
            <p className="text-white/80 text-sm font-tajawal">نجمة</p>
          </div>
          
          <div className="w-px bg-white/30" />
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Medal className="w-6 h-6 text-white" />
              <span className="text-2xl font-bold text-white">{kidsProgress.level}</span>
            </div>
            <p className="text-white/80 text-sm font-tajawal">المستوى</p>
          </div>
        </div>
      </div>

      {/* Badge unlocked message */}
      <div className="bg-white rounded-3xl p-4 mb-8 flex items-center gap-4 slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="w-12 h-12 bg-kids-green-light rounded-full flex items-center justify-center">
          <span className="text-2xl">🏅</span>
        </div>
        <div>
          <p className="font-bold text-foreground font-tajawal">وسام جديد!</p>
          <p className="text-sm text-muted-foreground font-tajawal">طالب علم مجتهد</p>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={() => navigate('/kids')}
        className="w-full max-w-xs btn-kids bg-white text-kids-green text-xl py-7 slide-up"
        style={{ animationDelay: '0.4s' }}
      >
        كمّل اللعب 🎮
      </Button>
    </div>
  );
};

export default KidsAchievement;
