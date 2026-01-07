import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Bookmark, Gift, LogOut, ChevronLeft, Settings, History, Trophy, Users, Clock, BookOpen, Star, Award } from 'lucide-react';
import AdultsNavbar from '@/components/adults/AdultsNavbar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Badge } from '@/components/ui/badge';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';
import { toast } from 'sonner';

const AdultsProfile = () => {
  const navigate = useNavigate();
  const { adultsProfile, setExperience, language, isAuthenticated, childProfiles, logout } = useApp();
  const { t } = useTranslation();
  const [showParentView, setShowParentView] = useState(false);

  const savedContent = [
    { id: '1', title: 'أركان الإسلام الخمسة', type: t('adults.profile.article') },
    { id: '2', title: 'فضل قراءة القرآن', type: t('adults.profile.book') },
    { id: '3', title: 'آداب الدعاء', type: t('adults.profile.article') },
  ];

  const readingHistory = [
    { id: '1', title: 'أركان الإسلام الخمسة', date: 'اليوم', time: '5 دقائق' },
    { id: '2', title: 'فضل الصلاة في وقتها', date: 'أمس', time: '8 دقائق' },
    { id: '3', title: 'آداب الدعاء', date: 'منذ 3 أيام', time: '6 دقائق' },
  ];

  const achievements = [
    { id: '1', title: 'قارئ نشط', description: 'قرأت 10 مقالات', icon: '📚', unlocked: true },
    { id: '2', title: 'مشارك المعرفة', description: 'أرسلت 5 هدايا', icon: '🎁', unlocked: true },
    { id: '3', title: 'متعلم مثابر', description: '30 يوم متتالي', icon: '🔥', unlocked: false },
    { id: '4', title: 'باحث عن العلم', description: '100 سؤال لبليغ', icon: '🤖', unlocked: false },
  ];

  const handleSwitchExperience = () => {
    setExperience(null);
    navigate('/select-experience');
  };

  const handleLogout = () => {
    logout();
    toast.success('تم تسجيل الخروج', {
      description: 'نراك قريباً إن شاء الله',
      duration: 3000,
    });
    navigate('/auth');
  };

  return (
    <div className="min-h-screen theme-adults bg-adults-bg pb-24">
      <PersistentLanguageToggle />
      {/* Header */}
      <div className="bg-gradient-to-br from-adults-green via-adults-emerald to-adults-teal p-6 pt-10 rounded-b-[2.5rem] islamic-pattern-gold text-center relative">
        <button 
          onClick={() => navigate('/adults')}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Avatar */}
        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-adults-gold/30">
          <span className="text-4xl">👤</span>
        </div>

        <h1 className="text-xl font-bold text-white font-amiri mb-1">
          عبدالله محمد
        </h1>
        <p className="text-white/70 text-sm font-tajawal">
          {t('adults.profile.memberSince')}
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 mt-6">
        <div className="card-adults p-6">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-adults-beige rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Gift className="w-5 h-5 text-adults-gold" />
                <span className="text-2xl font-bold text-foreground">{adultsProfile.giftsSent}</span>
              </div>
              <p className="text-xs text-muted-foreground font-tajawal">{t('adults.profile.giftsSent')}</p>
            </div>
            
            <div className="bg-adults-beige rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Gift className="w-5 h-5 text-adults-green" />
                <span className="text-2xl font-bold text-foreground">{adultsProfile.giftsReceived}</span>
              </div>
              <p className="text-xs text-muted-foreground font-tajawal">{t('adults.profile.giftsReceived')}</p>
            </div>
            
            <div className="bg-adults-beige rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Bookmark className="w-5 h-5 text-adults-green" />
                <span className="text-2xl font-bold text-foreground">{savedContent.length}</span>
              </div>
              <p className="text-xs text-muted-foreground font-tajawal">{t('adults.profile.saved')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Content */}
      <div className="px-6 mt-6">
        <div className="card-adults p-6">
          <h2 className="font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-adults-gold" />
            {t('adults.profile.savedContent')}
          </h2>
          
          <div className="space-y-3">
            {savedContent.length > 0 ? (
              savedContent.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/adults/article/${item.id}`)}
                  className="w-full flex items-center gap-3 p-3 bg-adults-beige rounded-xl hover:bg-adults-gold/10 transition-colors"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    📄
                  </div>
                  <div className="flex-1 text-right">
                    <p className="font-bold text-foreground text-sm font-tajawal">{item.title}</p>
                    <p className="text-xs text-muted-foreground font-tajawal">{item.type}</p>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </button>
              ))
            ) : (
              <p className="text-center text-muted-foreground font-tajawal py-4">
                {t('adults.profile.noSavedContent')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reading History */}
      <div className="px-6 mt-6">
        <div className="card-adults p-6">
          <h2 className="font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
            <History className="w-5 h-5 text-adults-gold" />
            {t('adults.profile.readingHistory')}
          </h2>
          
          <div className="space-y-3">
            {readingHistory.map((item, index) => (
              <button
                key={item.id}
                onClick={() => navigate(`/adults/article/${item.id}`)}
                className="w-full flex items-center gap-3 p-3 bg-adults-beige rounded-xl hover:bg-adults-gold/10 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-adults-green" />
                </div>
                <div className="flex-1 text-right">
                  <p className="font-bold text-foreground text-sm font-tajawal">{item.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-tajawal">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements / Learning Milestones */}
      <div className="px-6 mt-6">
        <div className="card-adults p-6">
          <h2 className="font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
            <Trophy className="w-5 h-5 text-adults-gold" />
            {t('adults.profile.achievements')}
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-adults-gold/20 to-adults-gold/10 border border-adults-gold/30'
                    : 'bg-adults-beige opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="font-bold text-foreground text-sm font-tajawal mb-1">
                  {achievement.title}
                </h3>
                <p className="text-xs text-muted-foreground font-tajawal">
                  {achievement.description}
                </p>
                {!achievement.unlocked && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    {t('adults.profile.locked')}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gifts Received */}
      {adultsProfile.giftsReceived > 0 && (
        <div className="px-6 mt-6">
          <div className="card-adults p-6">
            <h2 className="font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
              <Gift className="w-5 h-5 text-adults-green" />
              {t('adults.profile.giftsReceived')}
            </h2>
            
            <div className="space-y-3">
              <div className="p-4 bg-adults-beige rounded-xl">
                <p className="text-sm text-muted-foreground font-tajawal text-center">
                  {t('adults.profile.giftsReceivedDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Parent View (if has children) */}
      {isAuthenticated && childProfiles.length > 0 && (
        <div className="px-6 mt-6">
          <button
            onClick={() => setShowParentView(!showParentView)}
            className="w-full card-adults p-4 flex items-center gap-4 hover:border-adults-gold/50 transition-colors"
          >
            <Users className="w-6 h-6 text-adults-green" />
            <span className="font-tajawal text-foreground flex-1 text-right rtl:text-right ltr:text-left">
              {t('adults.profile.parentView')}
            </span>
            {language === 'ar' ? (
              <ChevronLeft className={`w-5 h-5 text-muted-foreground transition-transform ${showParentView ? 'rotate-90' : ''}`} />
            ) : (
              <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${showParentView ? '-rotate-90' : ''}`} />
            )}
          </button>
          
          {showParentView && (
            <div className="mt-4 card-adults p-4 slide-up">
              <h3 className="font-bold text-foreground mb-3 font-amiri">{t('adults.profile.childrenProfiles')}</h3>
              <div className="space-y-2">
                {childProfiles.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      setExperience('kids');
                      navigate('/kids');
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-adults-beige rounded-xl hover:bg-adults-gold/10 transition-colors"
                  >
                    <div className="text-2xl">{child.avatar}</div>
                    <div className="flex-1 text-right">
                      <p className="font-bold text-foreground text-sm font-tajawal">{child.name}</p>
                      <p className="text-xs text-muted-foreground font-tajawal">{child.age} {t('adults.profile.yearsOld')}</p>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Settings */}
      <div className="px-6 mt-6 space-y-3">
        <LanguageSwitcher />
        
        <button className="w-full card-adults p-4 flex items-center gap-4 hover:border-adults-gold/50 transition-colors">
          <Settings className="w-6 h-6 text-muted-foreground" />
          <span className="font-tajawal text-foreground flex-1 text-right rtl:text-right ltr:text-left">{t('common.settings')}</span>
          {language === 'ar' ? (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
        
        <button 
          onClick={handleSwitchExperience}
          className="w-full card-adults p-4 flex items-center gap-4 hover:border-adults-gold/50 transition-colors"
        >
          <Settings className="w-6 h-6 text-muted-foreground" />
          <span className="font-tajawal text-foreground flex-1 text-right rtl:text-right ltr:text-left">{t('common.changeExperience')}</span>
          {language === 'ar' ? (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-full card-adults p-4 flex items-center gap-4 hover:border-destructive/50 transition-colors"
        >
          <LogOut className="w-6 h-6 text-destructive" />
          <span className="font-tajawal text-destructive flex-1 text-right rtl:text-right ltr:text-left">تسجيل الخروج</span>
          {language === 'ar' ? (
            <ChevronLeft className="w-5 h-5 text-destructive" />
          ) : (
            <ChevronRight className="w-5 h-5 text-destructive" />
          )}
        </button>
      </div>

      <AdultsNavbar />
    </div>
  );
};

export default AdultsProfile;
