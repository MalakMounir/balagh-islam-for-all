import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Chrome, Apple } from 'lucide-react';

const AuthWelcome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-palette-off-white via-palette-light-mint/20 to-palette-medium-green/10 relative overflow-hidden px-4 sm:px-6 w-full">
      {/* Subtle Islamic pattern background */}
      <div className="absolute inset-0 islamic-pattern-green opacity-30" />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
        <LanguageSwitcher variant="icon" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-md w-full py-8 sm:py-12">
        {/* Logo */}
        <div className="mb-4 sm:mb-6 fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-palette-darker-green font-amiri">بلاغ</h1>
        </div>
        
        {/* Tagline */}
        <p className="text-palette-darker-green/90 text-base sm:text-lg md:text-xl font-tajawal mb-3 sm:mb-4 text-center leading-relaxed fade-in px-2" style={{ animationDelay: '0.2s' }}>
          بلاغ… لفهم الإسلام
        </p>
        
        {/* Supportive Message */}
        <p className="text-palette-medium-gray text-sm sm:text-base font-tajawal mb-6 sm:mb-8 text-center fade-in px-2" style={{ animationDelay: '0.3s' }}>
          رحلة معرفية آمنة للأطفال والكبار
        </p>
        
        {/* Action Buttons */}
        <div className="w-full space-y-2 sm:space-y-3 fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Primary Button - Sign Up */}
          <Button
            onClick={() => navigate('/auth/signup')}
            className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal min-h-[44px]"
          >
            {t('auth.welcome.signUp')}
          </Button>
          
          {/* Secondary Button - Login */}
          <Button
            onClick={() => navigate('/auth/login')}
            variant="outline"
            className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 border-palette-darker-green/30 bg-white/80 backdrop-blur-sm text-palette-darker-green hover:bg-palette-darker-green/5 hover:border-palette-darker-green/50 font-bold text-base sm:text-lg transition-all duration-300 font-tajawal min-h-[44px]"
          >
            {t('auth.welcome.login')}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative w-full my-6 fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-palette-light-gray" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-palette-off-white px-4 text-palette-medium-gray font-tajawal">{t('auth.login.or')}</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="w-full space-y-2 sm:space-y-3 fade-in" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={() => {
              // TODO: Implement Google OAuth
              console.log('Google login');
            }}
            variant="outline"
            className="w-full h-11 sm:h-12 rounded-lg sm:rounded-xl border-2 border-palette-light-gray bg-white hover:bg-palette-off-white text-palette-darker-green font-medium transition-all duration-300 font-tajawal min-h-[44px] text-sm sm:text-base"
          >
            <Chrome className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            {t('auth.login.continueWithGoogle')}
          </Button>
          
          <Button
            onClick={() => {
              // TODO: Implement Apple OAuth
              console.log('Apple login');
            }}
            variant="outline"
            className="w-full h-11 sm:h-12 rounded-lg sm:rounded-xl border-2 border-palette-light-gray bg-white hover:bg-palette-off-white text-palette-darker-green font-medium transition-all duration-300 font-tajawal min-h-[44px] text-sm sm:text-base"
          >
            <Apple className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            {t('auth.login.continueWithApple')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthWelcome;

