import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, BookOpen, MessageSquare, Gift, User, Bot, Bookmark, Sparkles } from 'lucide-react';
import AdultsNavbar from '@/components/adults/AdultsNavbar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useApp } from '@/contexts/AppContext';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';

const AdultsHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useApp();
  
  // Mock user name - in real app, get from context/auth
  const userName = 'عبدالله';
  
  const todayRecommendations = [
    { id: '1', title: 'أركان الإسلام الخمسة', category: 'quran', type: 'article' },
    { id: '2', title: 'فضل الصلاة في وقتها', category: 'library', type: 'article' },
    { id: '3', title: 'دليل المسلم الجديد', category: 'newmuslim', type: 'book' },
  ];

  const categories = [
    { 
      id: 'quran', 
      title: t('adults.categories.quran.title'), 
      subtitle: t('adults.categories.quran.subtitle'),
      icon: '📖',
      color: 'from-adults-green to-adults-emerald'
    },
    { 
      id: 'hadith', 
      title: t('adults.categories.hadith.title'), 
      subtitle: t('adults.categories.hadith.subtitle'),
      icon: '📜',
      color: 'from-adults-emerald to-adults-teal'
    },
    { 
      id: 'newmuslim', 
      title: t('adults.categories.newmuslim.title'), 
      subtitle: t('adults.categories.newmuslim.subtitle'),
      icon: '🌙',
      color: 'from-adults-teal to-adults-green'
    },
    { 
      id: 'library', 
      title: t('adults.categories.library.title'), 
      subtitle: t('adults.categories.library.subtitle'),
      icon: '📚',
      color: 'from-adults-gold to-amber-600'
    },
    { 
      id: 'balegh', 
      title: t('adults.categories.balegh.title'), 
      subtitle: t('adults.categories.balegh.subtitle'),
      icon: '🤖',
      color: 'from-purple-500 to-indigo-600',
      isGenAI: true
    },
  ];

  return (
    <div className="min-h-screen theme-adults bg-adults-bg pb-20 sm:pb-24 lg:pb-24 lg:pr-56 xl:pr-64 w-full overflow-x-hidden">
      <PersistentLanguageToggle />
      {/* Header */}
      <div className="bg-gradient-to-br from-adults-green via-adults-emerald to-adults-teal p-4 sm:p-6 pt-8 sm:pt-10 rounded-b-[2rem] sm:rounded-b-[2.5rem] islamic-pattern-gold w-full">
        <div className="flex items-start sm:items-center justify-between mb-4 gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-white font-amiri mb-1">
              {language === 'ar' 
                ? `أهلًا ${userName}، اكتشف محتوى اليوم`
                : `Welcome ${userName}, Discover Today's Content`
              }
            </h1>
            <p className="text-white/70 text-xs sm:text-sm font-tajawal">
              {t('adults.homeSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher variant="icon" />
            <button
              onClick={() => navigate('/adults/profile')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center border border-adults-gold/30 min-w-[44px] min-h-[44px]"
              aria-label="Profile"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-adults-gold" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4 w-full">
          <Search className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('adults.searchPlaceholder')}
            className="w-full bg-white rounded-xl sm:rounded-2xl py-3 sm:py-4 pr-10 sm:pr-12 pl-3 sm:pl-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground font-tajawal focus:outline-none focus:ring-2 focus:ring-adults-gold min-h-[44px]"
          />
        </div>
      </div>

      {/* Today's Recommendations */}
      <div className="px-4 sm:px-6 mt-4 sm:mt-6 w-full">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-adults-gold" />
          <h3 className="text-xs sm:text-sm font-bold text-white font-tajawal">
            {t('adults.todayRecommendations')}
          </h3>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 sm:-mx-6 px-4 sm:px-6">
          {todayRecommendations.map((rec) => (
            <button
              key={rec.id}
              onClick={() => navigate(`/adults/article/${rec.id}`)}
              className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 border border-white/20 hover:bg-white/20 transition-colors min-h-[44px]"
            >
              <p className="text-white text-xs font-tajawal whitespace-nowrap">{rec.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 sm:px-6 mt-6 sm:mt-8 w-full">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 font-amiri">
          {t('adults.exploreContent')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {categories.map((cat, index) => {
            const categoryRecs = todayRecommendations.filter(r => r.category === cat.id);
            return (
              <div key={cat.id} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <button
                  onClick={() => cat.isGenAI ? navigate('/adults/chat') : navigate(`/adults/category/${cat.id}`)}
                  className="w-full card-adults p-4 sm:p-5 flex items-center gap-3 sm:gap-4 group hover:shadow-lg transition-all min-h-[44px]"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                    {cat.isGenAI ? (
                      <Bot className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    ) : (
                      <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                    )}
                  </div>
                  <div className="flex-1 text-right rtl:text-right ltr:text-left min-w-0">
                    <h3 className="font-bold text-foreground text-base sm:text-lg font-amiri mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-tajawal">
                      {cat.subtitle}
                    </p>
                    {categoryRecs.length > 0 && (
                      <div className="mt-2 flex items-center gap-1">
                        <span className="text-[10px] sm:text-xs text-adults-gold font-tajawal">
                          {t('adults.recommended')}:
                        </span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground font-tajawal truncate">
                          {categoryRecs[0].title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-muted/50 rounded-full flex items-center justify-center group-hover:bg-adults-gold/20 transition-colors shrink-0">
                    {cat.isGenAI ? (
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-adults-gold" />
                    ) : (
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-adults-gold" />
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="px-4 sm:px-6 mt-6 sm:mt-8 w-full">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4 font-amiri">
          {t('adults.quickAccess')}
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/adults/chat')}
            className="card-adults p-3 sm:p-4 flex flex-col items-center gap-1.5 sm:gap-2 hover:border-adults-gold/50 transition-colors min-h-[44px]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/10 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <p className="font-bold text-foreground text-[10px] sm:text-xs font-tajawal text-center">{t('adults.askBalegh')}</p>
          </button>
          
          <button
            onClick={() => navigate('/adults/profile')}
            className="card-adults p-3 sm:p-4 flex flex-col items-center gap-1.5 sm:gap-2 hover:border-adults-gold/50 transition-colors min-h-[44px]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-adults-gold/10 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-adults-gold" />
            </div>
            <p className="font-bold text-foreground text-[10px] sm:text-xs font-tajawal text-center">{t('adults.savedContent')}</p>
          </button>
          
          <button
            onClick={() => navigate('/adults/gift')}
            className="card-adults p-3 sm:p-4 flex flex-col items-center gap-1.5 sm:gap-2 hover:border-adults-gold/50 transition-colors min-h-[44px]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-adults-green/10 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-adults-green" />
            </div>
            <p className="font-bold text-foreground text-[10px] sm:text-xs font-tajawal text-center">{t('adults.sendGift')}</p>
          </button>
        </div>
      </div>

      <AdultsNavbar />
    </div>
  );
};

export default AdultsHome;
