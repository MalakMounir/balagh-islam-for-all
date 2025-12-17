import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => navigate('/onboarding'), 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-adults-green via-adults-emerald to-adults-teal islamic-pattern-gold relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-adults-gold/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-10 w-40 h-40 bg-adults-gold/10 rounded-full blur-3xl" />
      
      {/* Logo */}
      <div className={`text-center transition-all duration-700 ${isAnimating ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
        {/* Geometric decoration */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border-2 border-adults-gold/30 rotate-45 rounded-3xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-adults-gold/20 rotate-[22.5deg] rounded-2xl" />
          </div>
          
          {/* Main logo */}
          <div className="relative z-10 w-36 h-36 mx-auto bg-gradient-to-br from-adults-gold to-adults-gold-light rounded-full flex items-center justify-center shadow-gold float-animation">
            <span className="text-5xl font-bold text-adults-green font-amiri">بلاغ</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-4 font-amiri">بلاغ</h1>
        
        {/* Tagline */}
        <p className="text-adults-gold text-xl font-tajawal">
          بلاغ… لفهم الإسلام
        </p>
        
        {/* Loading animation */}
        <div className="mt-12 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-adults-gold rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
