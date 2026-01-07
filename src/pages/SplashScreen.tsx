import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after a brief delay
    const fadeInTimer = setTimeout(() => setIsVisible(true), 100);
    
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        if (isAuthenticated) {
          navigate('/select-experience');
        } else {
          navigate('/auth');
        }
      }, 500);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeInTimer);
    };
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#87D1A4] via-[#158467] to-[#006754] relative overflow-hidden w-full px-4">
      {/* Logo container with fade-in animation */}
      <div className={`flex flex-col items-center justify-center transition-opacity duration-1000 ease-out w-full max-w-md ${isVisible && isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        {/* Main logo */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-amiri">بلاغ</h1>
        </div>
        
        {/* Tagline */}
        <p className="text-white/90 text-base sm:text-lg md:text-xl font-tajawal mb-8 sm:mb-12 md:mb-16 text-center px-4">
          بلاغ… مساحة آمنة لتعلّم الإسلام لك ولأطفالك
        </p>
      </div>
      
      {/* Minimal loading dots at the bottom */}
      <div className={`absolute bottom-8 sm:bottom-12 flex justify-center gap-2 transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-white/70 rounded-full loading-dots"
            style={{
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
