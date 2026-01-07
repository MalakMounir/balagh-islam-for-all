import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

type SupportedLanguage = {
  code: 'ar' | 'en' | 'fr' | 'tr' | 'id' | 'ur' | 'bn';
  name: string;
  nativeName: string;
  flag: string;
};

const languages: SupportedLanguage[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
];

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, setLanguage } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    // Set language if it's supported
    if (langCode === 'ar' || langCode === 'en' || langCode === 'fr' || langCode === 'ur' || langCode === 'id') {
      setLanguage(langCode as 'ar' | 'en' | 'fr' | 'ur' | 'id');
    }
  };

  const handleContinue = () => {
    // Navigate to onboarding or experience selection
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#87D1A4] via-[#158467] to-[#006754] flex flex-col">
      {/* Header */}
      <div className="pt-16 px-6 pb-8">
        <h1 className="text-4xl font-bold text-white text-center mb-2 font-amiri">
          {t('languageSelection.title')}
        </h1>
        <div className="w-24 h-1 bg-white/30 rounded-full mx-auto"></div>
      </div>

      {/* Language Cards */}
      <div className="flex-1 px-6 pb-6">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                selectedLanguage === lang.code
                  ? 'ring-4 ring-white/50 scale-105 shadow-2xl'
                  : ''
              }`}
            >
              {/* Flag */}
              <div className="text-6xl mb-4 text-center">
                {lang.flag}
              </div>

              {/* Language Name */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-foreground font-tajawal mb-1">
                  {lang.nativeName}
                </h3>
                {lang.nativeName !== lang.name && (
                  <p className="text-sm text-muted-foreground font-tajawal">
                    {lang.name}
                  </p>
                )}
              </div>

              {/* Selected Indicator */}
              {selectedLanguage === lang.code && (
                <div className={`absolute top-3 w-6 h-6 bg-gradient-to-br from-[#87D1A4] to-[#006754] rounded-full flex items-center justify-center ${
                  language === 'ar' ? 'left-3' : 'right-3'
                }`}>
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Micro Text */}
      <div className="px-6 pb-4">
        <p className="text-center text-white/70 text-sm font-tajawal">
          {t('languageSelection.canChangeLater')}
        </p>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-8">
        <Button
          onClick={handleContinue}
          className="w-full max-w-md mx-auto bg-white hover:bg-white/90 text-[#006754] font-bold py-6 rounded-2xl text-lg shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <span>{t('languageSelection.continue')}</span>
          {language === 'ar' ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelection;

