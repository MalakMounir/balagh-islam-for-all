import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Star, Trophy, Medal, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const KidsAchievement = () => {
  const navigate = useNavigate();
  const { kidsProgress } = useApp();
  const { t } = useTranslation();
  const [showConfetti, setShowConfetti] = useState(true);
  const [badgeScale, setBadgeScale] = useState(0);

  useEffect(() => {
    // Start confetti immediately
    const confettiTimer = setTimeout(() => setShowConfetti(false), 4000);
    
    // Animate badge appearance
    setTimeout(() => setBadgeScale(1), 100);
    
    return () => clearTimeout(confettiTimer);
  }, []);

  return (
    <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-green via-kids-blue to-kids-yellow flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Enhanced Celebration Animation - Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: ['#158467', '#87D1A4', '#FFD93D', '#FF6B6B', '#4ECDC4', '#FF9FF3'][Math.floor(Math.random() * 6)],
                width: `${8 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          ))}
        </div>
      )}

      {/* Large Badge Display */}
      <div className="relative mb-8 z-20">
        {/* Animated badge container */}
        <div 
          className="relative"
          style={{
            transform: `scale(${badgeScale})`,
            transition: 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-kids-yellow/30 rounded-full blur-3xl animate-pulse" style={{ transform: 'scale(1.5)' }} />
          
          {/* Badge */}
          <div className="relative w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-kids-yellow/50">
            <div className="w-40 h-40 bg-gradient-to-br from-kids-yellow via-amber-400 to-kids-coral rounded-full flex items-center justify-center shadow-inner">
              {/* Trophy icon */}
              <div className="relative">
                <Trophy className="w-24 h-24 text-white drop-shadow-lg animate-bounce" style={{ animationDuration: '2s' }} />
                
                {/* Sparkle effects */}
                {[...Array(3)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className="absolute w-6 h-6 text-white animate-pulse"
                    style={{
                      top: `${-20 + i * 20}px`,
                      right: `${-30 + i * 15}px`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Rotating stars around badge */}
          {[...Array(8)].map((_, i) => (
            <Star
              key={i}
              className="absolute w-10 h-10 text-kids-yellow fill-kids-yellow star-spin"
              style={{
                top: `${50 + 75 * Math.sin((i * Math.PI) / 4)}%`,
                left: `${50 + 75 * Math.cos((i * Math.PI) / 4)}%`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Congratulations Text */}
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 font-amiri slide-up z-20 px-4 drop-shadow-lg">
        {t('kids.achievement.congratulations')}
      </h1>

      {/* Stats Cards */}
      <div className="w-full max-w-md space-y-4 mb-8 z-20">
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-white/30 slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-8 h-8 text-kids-yellow fill-kids-yellow animate-pulse" />
                <span className="text-3xl font-bold text-white font-tajawal">{kidsProgress.stars}</span>
              </div>
              <p className="text-white/90 text-base font-bold font-tajawal">{t('kids.stars')}</p>
            </div>
            
            <div className="w-px h-16 bg-white/40" />
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Medal className="w-8 h-8 text-white drop-shadow-lg" />
                <span className="text-3xl font-bold text-white font-tajawal">{kidsProgress.level}</span>
              </div>
              <p className="text-white/90 text-base font-bold font-tajawal">{t('kids.level')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Message Card */}
      <div className="bg-white rounded-3xl p-6 mb-8 shadow-2xl border-4 border-kids-yellow/30 max-w-md w-full slide-up z-20" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-4 text-right">
          <div className="w-16 h-16 bg-gradient-to-br from-kids-green to-kids-blue rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl">🏆</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground text-lg font-amiri mb-1">
              وسام جديد!
            </p>
            <p className="text-muted-foreground text-sm font-tajawal">
              أنت الآن طالب علم مجتهد 🌟
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button - Continue Playing */}
      <Button
        onClick={() => navigate('/kids')}
        className="w-full max-w-md bg-white hover:bg-white/90 text-kids-green font-bold text-xl py-7 rounded-3xl shadow-2xl border-4 border-kids-yellow/30 transform hover:scale-105 transition-all duration-300 slide-up z-20"
        style={{ animationDelay: '0.4s' }}
      >
        <span className="flex items-center justify-center gap-3">
          {t('kids.achievement.continuePlaying')} 🎮
        </span>
      </Button>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-20 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🎉</div>
        <div className="absolute bottom-32 left-20 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute top-40 left-16 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-48 right-24 text-5xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}>🌟</div>
      </div>
    </div>
  );
};

export default KidsAchievement;
