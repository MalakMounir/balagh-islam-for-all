import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const ParentPreferences = () => {
  const navigate = useNavigate();
  const { setParentPreferences, childProfiles } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferences, setPreferences] = useState({
    childLanguage: 'ar',
    askBalegh: true,
    sound: true,
    bedtimeStories: true,
  });

  const handleContinue = async () => {
    setIsSubmitting(true);
    
    // Store preferences
    setParentPreferences(preferences);
    localStorage.setItem('parentPreferences', JSON.stringify(preferences));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubmitting(false);
    
    // Navigate to setup confirmation
    navigate('/auth/setup/confirmation');
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
          <h1 className="text-2xl sm:text-3xl font-bold text-palette-darker-green font-amiri mb-2">تفضيلات الأهل</h1>
          <p className="text-palette-medium-gray text-sm sm:text-base font-tajawal">اختر الإعدادات المناسبة لطفلك</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-palette-light-gray/50">
            <div className="space-y-5">
              {/* Child Language */}
              <div className="space-y-2">
                <Label className="text-palette-darker-green font-tajawal font-medium text-sm">
                  اللغة الأساسية للطفل
                </Label>
                <Select
                  value={preferences.childLanguage}
                  onValueChange={(value) => setPreferences({ ...preferences, childLanguage: value })}
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

              {/* Ask Balegh Toggle */}
              <div className="flex items-center justify-between p-4 bg-palette-off-white rounded-xl border border-palette-light-gray/50">
                <div className="flex-1">
                  <Label className="text-palette-darker-green font-tajawal font-medium cursor-pointer text-sm">
                    اسأل بليغ
                  </Label>
                  <p className="text-xs text-palette-medium-gray font-tajawal mt-1">
                    تفعيل المساعد الذكي للأطفال
                  </p>
                </div>
                <Switch
                  checked={preferences.askBalegh}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, askBalegh: checked })}
                />
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between p-4 bg-palette-off-white rounded-xl border border-palette-light-gray/50">
                <div className="flex-1">
                  <Label className="text-palette-darker-green font-tajawal font-medium cursor-pointer text-sm">
                    الصوت
                  </Label>
                  <p className="text-xs text-palette-medium-gray font-tajawal mt-1">
                    تفعيل الأصوات والتأثيرات
                  </p>
                </div>
                <Switch
                  checked={preferences.sound}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, sound: checked })}
                />
              </div>

              {/* Bedtime Stories Toggle */}
              <div className="flex items-center justify-between p-4 bg-palette-off-white rounded-xl border border-palette-light-gray/50">
                <div className="flex-1">
                  <Label className="text-palette-darker-green font-tajawal font-medium cursor-pointer text-sm">
                    القصص قبل النوم
                  </Label>
                  <p className="text-xs text-palette-medium-gray font-tajawal mt-1">
                    تفعيل القصص المسموعة
                  </p>
                </div>
                <Switch
                  checked={preferences.bedtimeStories}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, bedtimeStories: checked })}
                />
              </div>

              {/* Security Message */}
              <div className="bg-palette-light-mint/20 rounded-xl p-4 border border-palette-medium-green/30">
                <p className="text-sm text-palette-darker-green font-tajawal text-center">
                  <span className="font-bold">محتوى آمن ومناسب للأطفال</span>
                  <br />
                  <span className="text-xs mt-1 block text-palette-medium-gray">الطفل لا يمكنه الخروج أو تغيير الإعدادات</span>
                </p>
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal mt-6"
              >
                {isSubmitting ? 'جاري الحفظ...' : 'متابعة'}
                {!isSubmitting && <ArrowRight className="mr-2 h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPreferences;

