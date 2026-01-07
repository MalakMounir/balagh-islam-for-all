import { useApp } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSwitcherProps {
  variant?: 'button' | 'dropdown' | 'icon';
  className?: string;
}

type Language = 'ar' | 'en' | 'fr' | 'ur' | 'id';

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
];

const LanguageSwitcher = ({ variant = 'dropdown', className = '' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useApp();
  const { t } = useTranslation();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  if (variant === 'icon') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors ${className}`}
            aria-label="Change language"
          >
            <span className="text-lg">🌐</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={language === lang.code ? 'bg-muted' : ''}
            >
              <div className="flex items-center justify-between w-full">
                <span className={lang.code === 'ar' || lang.code === 'ur' ? 'font-tajawal' : ''}>
                  {lang.nativeName}
                </span>
                {language === lang.code && (
                  <span className="text-adults-gold">✓</span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'button') {
    // Cycle to next language
    const currentIndex = languages.findIndex(l => l.code === language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex].code;
    const isRTL = language === 'ar' || language === 'ur';
    
    return (
      <button 
        className={`w-full card-adults p-4 flex items-center gap-4 hover:border-adults-gold/50 transition-colors ${className}`}
        onClick={() => handleLanguageChange(nextLanguage)}
      >
        <Globe className="w-6 h-6 text-muted-foreground" />
        <span className="font-tajawal text-foreground flex-1 text-right rtl:text-right ltr:text-left">
          {t('common.language')}
        </span>
        <span className="text-sm text-muted-foreground font-tajawal">
          {currentLanguage.nativeName}
        </span>
        {isRTL ? (
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`w-full card-adults p-4 flex items-center gap-4 hover:border-adults-gold/50 transition-colors ${className}`}>
          <Globe className="w-6 h-6 text-muted-foreground" />
          <span className="font-tajawal text-foreground flex-1 text-right rtl:text-right ltr:text-left">
            {t('common.language')}
          </span>
          <span className="text-sm text-muted-foreground font-tajawal">
            {currentLanguage.nativeName}
          </span>
          {(language === 'ar' || language === 'ur') ? (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={language === lang.code ? 'bg-muted' : ''}
          >
            <div className="flex items-center justify-between w-full">
              <span className={lang.code === 'ar' || lang.code === 'ur' ? 'font-tajawal' : ''}>
                {lang.nativeName}
              </span>
              {language === lang.code && (
                <span className="text-adults-gold">✓</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;








