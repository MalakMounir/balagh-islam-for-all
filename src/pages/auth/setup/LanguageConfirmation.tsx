import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const LanguageConfirmation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, setLanguage, user, setUser } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(user?.language || language);

  const handleContinue = async () => {
    setIsSubmitting(true);
    
    // Update language in context
    setLanguage(selectedLanguage as 'ar' | 'en' | 'fr' | 'ur' | 'id');
    
    // Update user language if user exists
    if (user) {
      const updatedUser = {
        ...user,
        language: selectedLanguage as 'ar' | 'en' | 'fr' | 'ur' | 'id',
      };
      setUser(updatedUser);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubmitting(false);
    
    // Navigate to account type selection
    navigate('/auth/setup/account-type');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-palette-off-white via-palette-light-mint/20 to-palette-medium-green/10 relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern-green opacity-30" />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
        <LanguageSwitcher variant="icon" />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-palette-darker-green font-amiri mb-2">
            تأكيد اللغة
          </h1>
          <p className="text-palette-medium-gray text-sm sm:text-base font-tajawal">
            اختر اللغة المفضلة لك
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-palette-light-gray/50">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-palette-darker-green font-tajawal font-medium text-sm">
                  اللغة المفضلة
                </Label>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="h-12 rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal" dir="rtl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ur">اردو</SelectItem>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleContinue}
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal"
              >
                {isSubmitting ? 'جاري التحميل...' : 'متابعة'}
                {!isSubmitting && <ArrowRight className="mr-2 h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageConfirmation;

