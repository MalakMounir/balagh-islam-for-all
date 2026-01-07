import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Shield, CheckCircle2, Clock, Heart, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';
import { toast } from 'sonner';

const KidsParentZone = () => {
  const navigate = useNavigate();
  const { kidsProgress, language, setLanguage, logout } = useApp();
  const { t } = useTranslation();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  
  // Mock data - in real app, this would come from context/API
  const [childInfo] = useState({
    name: 'البطل الصغير',
    age: 8,
    activeDays: 12,
  });
  
  const [preferences, setPreferences] = useState({
    childAge: '8',
    dailyUsageTime: '30',
    enableAskBalegh: true,
    preferredLanguage: language,
    preferredContent: ['prophets', 'values'],
  });

  const [learningData] = useState({
    dailySummary: {
      articlesRead: 3,
      questionsAnswered: 5,
      timeSpent: '25 دقيقة',
      valuesLearned: ['الصدق', 'المساعدة', 'الطيبة'],
    },
    weeklyStats: {
      totalTime: '3 ساعات',
      categoriesAccessed: ['القيم', 'قصص الأنبياء', 'القرآن'],
    },
  });

  const handlePasswordSubmit = () => {
    // Accept any password
    setIsUnlocked(true);
    setPasswordError(false);
  };

  const learningSummary = {
    activitiesCompleted: 45,
    baleghQuestions: 23,
    badgesEarned: 3,
  };

  const ageOptions = [
    { value: '5', label: '5 سنوات' },
    { value: '6', label: '6 سنوات' },
    { value: '7', label: '7 سنوات' },
    { value: '8', label: '8 سنوات' },
    { value: '9', label: '9 سنوات' },
    { value: '10', label: '10 سنوات' },
    { value: '11', label: '11 سنة' },
    { value: '12', label: '12 سنة' },
  ];

  const dailyUsageOptions = [
    { value: '15', label: '15 دقيقة' },
    { value: '30', label: '30 دقيقة' },
    { value: '45', label: '45 دقيقة' },
    { value: '60', label: 'ساعة واحدة' },
  ];

  const languageOptions = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'ur', label: 'اردو' },
    { value: 'id', label: 'Bahasa Indonesia' },
  ];

  const contentTypes = [
    { id: 'prophets', name: t('kids.categories.prophets'), icon: '📚' },
    { id: 'values', name: t('kids.categories.values'), icon: '💝' },
    { id: 'questions', name: t('kids.categories.questions'), icon: '❓' },
    { id: 'knowgod', name: t('kids.categories.knowgod'), icon: '✨' },
    { id: 'muslim', name: t('kids.categories.muslim'), icon: '🕌' },
  ];

  // Password Gate
  if (!isUnlocked) {
    return (
      <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-bg via-adults-beige/30 to-kids-green-light/10 pb-8 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <button 
            onClick={() => navigate('/kids/profile')}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-6 h-6 text-adults-green" />
          </button>

          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-adults-green/20">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-adults-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-adults-green" />
              </div>
              <h1 className="text-2xl font-bold text-foreground font-amiri mb-2">
                {t('kids.parentZone.parentGate')}
              </h1>
              <p className="text-muted-foreground font-tajawal text-sm">
                هذه المنطقة للأهل فقط
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder={t('kids.parentZone.parentGatePlaceholder')}
                className={`font-tajawal ${passwordError ? 'border-red-500' : ''}`}
              />
              
              {passwordError && (
                <p className="text-red-500 text-sm font-tajawal text-center">
                  {t('kids.parentZone.parentGateError')}
                </p>
              )}

              <Button
                onClick={handlePasswordSubmit}
                className="w-full bg-adults-green hover:bg-adults-emerald text-white font-bold py-6 rounded-2xl shadow-lg"
              >
                {t('kids.parentZone.parentGateSubmit')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-bg via-adults-beige/30 to-kids-green-light/10 pb-8">
      <PersistentLanguageToggle />
      {/* Back Button */}
      <button 
        onClick={() => navigate('/kids/profile')}
        className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <ChevronRight className="w-6 h-6 text-adults-green" />
      </button>

      {/* Header */}
      <div className="bg-gradient-to-br from-adults-green via-adults-emerald to-adults-teal p-8 pt-16 rounded-b-[3rem] text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-5xl opacity-10">👨‍👩‍👧</div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-10">💙</div>

        <h1 className="text-3xl font-bold text-white font-amiri mb-2 relative z-10">
          {t('kids.parentZone.title')}
        </h1>
        <p className="text-white/90 text-base font-tajawal relative z-10">
          {t('kids.parentZone.subtitle')}
        </p>
      </div>

      {/* Child Overview Card */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-adults-green/20">
          <h2 className="text-xl font-bold text-foreground mb-4 font-amiri">
            {t('kids.parentZone.childOverview')}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-muted-foreground font-tajawal">{t('kids.parentZone.childName')}</span>
              <span className="font-bold text-foreground font-tajawal">{childInfo.name}</span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-muted-foreground font-tajawal">{t('kids.parentZone.age')}</span>
              <span className="font-bold text-foreground font-tajawal">{childInfo.age} {t('kids.parentZone.years')}</span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-muted-foreground font-tajawal">{t('kids.level')}</span>
              <span className="font-bold text-foreground font-tajawal">{kidsProgress.level}</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground font-tajawal">{t('kids.parentZone.activeDays')}</span>
              <span className="font-bold text-foreground font-tajawal">{childInfo.activeDays} {t('kids.parentZone.days')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Learning Summary */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-foreground mb-4 font-amiri">
          {t('kids.parentZone.dailyLearningSummary')}
        </h2>
        
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-adults-green/20">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground font-tajawal mb-1">{t('kids.parentZone.activities')}</p>
              <p className="text-2xl font-bold text-foreground font-tajawal">{learningData.dailySummary.articlesRead}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-tajawal mb-1">{t('kids.parentZone.timeSpent')}</p>
              <p className="text-2xl font-bold text-foreground font-tajawal">{learningData.dailySummary.timeSpent}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-muted-foreground font-tajawal mb-2">{t('kids.parentZone.valuesLearned')}</p>
            <div className="flex flex-wrap gap-2">
              {learningData.dailySummary.valuesLearned.map((value, index) => (
                <span key={index} className="bg-kids-green/10 text-kids-green px-3 py-1 rounded-full text-sm font-tajawal">
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Summary Cards */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-foreground mb-4 font-amiri">
          {t('kids.parentZone.learningSummary')}
        </h2>
        
        <div className="grid grid-cols-3 gap-3">
          {/* Activities Completed */}
          <div className="bg-gradient-to-br from-kids-green/10 to-emerald-50 rounded-2xl p-4 text-center border-2 border-kids-green/20">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-2xl font-bold text-foreground font-tajawal">{learningSummary.activitiesCompleted}</p>
            <p className="text-xs text-muted-foreground font-tajawal mt-1">{t('kids.parentZone.activities')}</p>
          </div>

          {/* Balegh Questions */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center border-2 border-blue-200">
            <div className="text-3xl mb-2">🤖</div>
            <p className="text-2xl font-bold text-foreground font-tajawal">{learningSummary.baleghQuestions}</p>
            <p className="text-xs text-muted-foreground font-tajawal mt-1">{t('kids.profile.baleghQuestions')}</p>
          </div>

          {/* Badges Earned */}
          <div className="bg-gradient-to-br from-kids-yellow/10 to-amber-50 rounded-2xl p-4 text-center border-2 border-kids-yellow/20">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-2xl font-bold text-foreground font-tajawal">{learningSummary.badgesEarned}</p>
            <p className="text-xs text-muted-foreground font-tajawal mt-1">{t('kids.profile.badgesCount')}</p>
          </div>
        </div>
      </div>

      {/* Content Safety Card */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-br from-adults-green/5 to-adults-emerald/5 rounded-3xl p-6 shadow-lg border-2 border-adults-green/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-adults-green/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-adults-green" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-3 font-amiri">
                {t('kids.parentZone.safety.title')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-adults-green mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground font-tajawal leading-relaxed">
                    {t('kids.parentZone.safety.ageAppropriate')}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-adults-green mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground font-tajawal leading-relaxed">
                    {t('kids.parentZone.safety.noSensitive')}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-adults-green mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground font-tajawal leading-relaxed">
                    {t('kids.parentZone.safety.trustMessage')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Controls */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-foreground mb-4 font-amiri">
          {t('kids.parentZone.preferences')}
        </h2>

        {/* Child Age Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 mb-4">
          <h3 className="font-bold text-foreground font-tajawal mb-4">
            {t('kids.parentZone.selectChildAge')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {ageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPreferences({ ...preferences, childAge: option.value })}
                className={`px-4 py-2 rounded-full font-tajawal transition-all ${
                  preferences.childAge === option.value
                    ? 'bg-adults-green text-white shadow-md'
                    : 'bg-gray-100 text-foreground hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enable/Disable Ask Balegh */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              <div>
                <h3 className="font-bold text-foreground font-tajawal">
                  {t('kids.parentZone.enableAskBalegh')}
                </h3>
                <p className="text-sm text-muted-foreground font-tajawal">
                  السماح لطفلك باستخدام ميزة "اسأل بليغ"
                </p>
              </div>
            </div>
            <button
              onClick={() => setPreferences({ ...preferences, enableAskBalegh: !preferences.enableAskBalegh })}
              className={`w-14 h-8 rounded-full transition-all ${
                preferences.enableAskBalegh
                  ? 'bg-adults-green'
                  : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                preferences.enableAskBalegh
                  ? 'translate-x-7'
                  : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 mb-4">
          <h3 className="font-bold text-foreground font-tajawal mb-4">
            {t('kids.parentZone.selectLanguage')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setPreferences({ ...preferences, preferredLanguage: option.value });
                  setLanguage(option.value as 'ar' | 'en' | 'fr' | 'ur' | 'id');
                }}
                className={`px-4 py-2 rounded-full font-tajawal transition-all ${
                  preferences.preferredLanguage === option.value
                    ? 'bg-adults-green text-white shadow-md'
                    : 'bg-gray-100 text-foreground hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Usage Time */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-adults-green" />
            <h3 className="font-bold text-foreground font-tajawal">
              {t('kids.parentZone.dailyUsage')}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {dailyUsageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPreferences({ ...preferences, dailyUsageTime: option.value })}
                className={`px-4 py-2 rounded-full font-tajawal transition-all ${
                  preferences.dailyUsageTime === option.value
                    ? 'bg-adults-green text-white shadow-md'
                    : 'bg-gray-100 text-foreground hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Content Types */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-adults-green" />
            <h3 className="font-bold text-foreground font-tajawal">
              {t('kids.parentZone.selectContentTypes')}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  const newPrefs = preferences.preferredContent.includes(type.id)
                    ? preferences.preferredContent.filter(id => id !== type.id)
                    : [...preferences.preferredContent, type.id];
                  setPreferences({ ...preferences, preferredContent: newPrefs });
                }}
                className={`px-4 py-2 rounded-full font-tajawal transition-all flex items-center gap-2 ${
                  preferences.preferredContent.includes(type.id)
                    ? 'bg-adults-green text-white shadow-md'
                    : 'bg-gray-100 text-foreground hover:bg-gray-200'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Button */}
      <div className="px-6 mt-6">
        <Button
          onClick={() => {
            // Open feedback form or modal
            window.open('mailto:feedback@balagh.app?subject=تجربة طفلي في بلاغ', '_blank');
          }}
          className="w-full bg-adults-green hover:bg-adults-emerald text-white font-bold py-6 rounded-3xl shadow-lg border-2 border-adults-green/20"
        >
          <span className="flex items-center justify-center gap-2 font-tajawal text-lg">
            {t('kids.parentZone.feedback')}
          </span>
        </Button>
      </div>

      {/* Logout Button */}
      <div className="px-6 mt-4 mb-8">
        <Button
          onClick={() => {
            logout();
            toast.success('تم تسجيل الخروج', {
              description: 'نراك قريباً إن شاء الله',
              duration: 3000,
            });
            navigate('/auth');
          }}
          variant="outline"
          className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 font-bold py-6 rounded-3xl"
        >
          <span className="flex items-center justify-center gap-2 font-tajawal text-lg">
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </span>
        </Button>
      </div>
    </div>
  );
};

export default KidsParentZone;

