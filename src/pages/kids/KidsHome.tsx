import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { Star, Trophy, User, Rocket } from 'lucide-react';
import KidsNavbar from '@/components/kids/KidsNavbar';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';

const KidsHome = () => {
  const navigate = useNavigate();
  const { kidsProgress } = useApp();
  const { t } = useTranslation();

  const starsNeededForNextLevel = 100;
  const currentProgress = kidsProgress.stars % starsNeededForNextLevel;
  const starsToNext = starsNeededForNextLevel - currentProgress;
  const progressPercentage = (currentProgress / starsNeededForNextLevel) * 100;

  const categories = [
    { id: 'values', title: t('kids.categories.beautifulValues'), subtitle: t('kids.categories.beautifulValuesSub'), icon: '💝', color: 'from-kids-coral to-pink-400', bgColor: 'bg-kids-coral/10' },
    { id: 'prophets', title: t('kids.categories.bedtimeStories'), subtitle: t('kids.categories.bedtimeStoriesSub'), icon: '🌙', color: 'from-kids-green to-emerald-400', bgColor: 'bg-kids-green/10' },
    { id: 'quran', title: t('kids.categories.quranSimple'), subtitle: t('kids.categories.quranSimpleSub'), icon: '📖', color: 'from-kids-blue to-cyan-400', bgColor: 'bg-kids-blue/10' },
    { id: 'hadith', title: t('kids.categories.easyHadith'), subtitle: t('kids.categories.easyHadithSub'), icon: '✨', color: 'from-kids-yellow to-amber-400', bgColor: 'bg-kids-yellow/10' },
    { id: 'behavior', title: t('kids.categories.howToBehave'), subtitle: t('kids.categories.howToBehaveSub'), icon: '🤔', color: 'from-violet-400 to-purple-500', bgColor: 'bg-violet-100' },
    { id: 'learnToday', title: t('kids.categories.learnToday'), subtitle: t('kids.categories.learnTodaySub'), icon: '📚', color: 'from-kids-green to-emerald-400', bgColor: 'bg-kids-green/10' },
    { id: 'balegh', title: t('kids.categories.askBalegh'), subtitle: t('kids.categories.askBaleghSubtext'), icon: '🤖', color: 'from-blue-400 via-cyan-400 to-kids-green', bgColor: 'bg-blue-100', isNew: true, special: true },
  ];

  const handleStartDailyTask = () => {
    // Navigate to first category or a daily task page
    navigate('/kids/category/prophets');
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'balegh') {
      // Navigate to standalone Ask Balegh page
      navigate('/kids/ask-balegh');
    } else {
      navigate(`/kids/category/${categoryId}`);
    }
  };

  return (
    <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-bg via-kids-green-light/20 to-kids-blue-light/20 pb-20 sm:pb-24 lg:pb-24 lg:pr-56 xl:pr-64 w-full overflow-x-hidden">
      <PersistentLanguageToggle />
      {/* Welcome Section with Balagh Character */}
      <div className="bg-gradient-to-br from-kids-green via-kids-blue to-kids-yellow p-4 sm:p-6 pt-10 sm:pt-12 rounded-b-[2rem] sm:rounded-b-[3rem] relative overflow-hidden w-full">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-6xl opacity-20">⭐</div>
        <div className="absolute bottom-4 left-4 text-5xl opacity-20">🎮</div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full">
          {/* Balagh Welcome Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6 bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 border-white/30 shadow-xl w-full">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/50 shadow-lg">
                <span className="text-4xl sm:text-5xl md:text-6xl balegh-wave balegh-blink">🤖</span>
              </div>
              <div className="absolute -top-1 -right-1 text-xl sm:text-2xl animate-pulse">✨</div>
            </div>
            <div className="flex-1 text-center sm:text-right w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-amiri mb-1 sm:mb-2">
                {t('kids.balaghWelcome.title')}
              </h2>
              <p className="text-white/90 text-sm sm:text-base font-tajawal leading-relaxed">
                {t('kids.balaghWelcome.message')}
              </p>
            </div>
          </div>

          {/* Avatar and Greeting */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 w-full">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/50 shadow-lg shrink-0">
              <span className="text-3xl sm:text-4xl">🧒🏻</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-tajawal mb-1 truncate sm:whitespace-normal">
                {t('kids.greeting')}
              </h1>
              <p className="text-white/90 text-sm sm:text-base font-tajawal">
                {t('kids.letsLearn')}
              </p>
            </div>
            <button
              onClick={() => navigate('/kids/profile')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg shrink-0 min-w-[44px] min-h-[44px]"
              aria-label="Profile"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Level and Stars */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 mb-4 border-2 border-white/30 shadow-xl w-full">
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-kids-yellow to-kids-coral rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-7 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white/80 text-[10px] sm:text-xs font-tajawal mb-0.5 sm:mb-1">
                    {t('kids.level')}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white font-tajawal">
                    {kidsProgress.level}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 shrink-0">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-kids-yellow fill-kids-yellow" />
                <span className="text-lg sm:text-xl font-bold text-white font-tajawal">
                  {kidsProgress.stars}
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="h-5 sm:h-6 bg-white/30 rounded-full overflow-hidden shadow-inner w-full">
                <div 
                  className="h-full bg-gradient-to-r from-kids-yellow via-kids-coral to-kids-blue rounded-full progress-animated flex items-center justify-end pr-1.5 sm:pr-2 shadow-lg"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {progressPercentage > 15 && (
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
                  )}
                </div>
              </div>
            </div>
            <p className="text-white/90 text-xs sm:text-sm text-center font-tajawal font-medium">
              {starsToNext} {t('kids.starsToNext')}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Task Card */}
      <div className="px-4 sm:px-6 mt-4 sm:mt-6 w-full">
        <button
          onClick={handleStartDailyTask}
          className="w-full bg-gradient-to-br from-kids-coral via-kids-yellow to-kids-green rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-2 sm:border-4 border-white transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group min-h-[44px]"
        >
          {/* Animated background decorations */}
          <div className="absolute top-2 right-2 text-5xl opacity-30 group-hover:scale-110 transition-transform">🚀</div>
          <div className="absolute bottom-2 left-2 text-4xl opacity-30 group-hover:scale-110 transition-transform">⭐</div>
          
          <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1 text-right min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-amiri mb-1 sm:mb-2">
                {t('kids.dailyTask')}
              </h2>
              <p className="text-white/90 text-sm sm:text-base font-tajawal">
                {t('kids.startTask')}
              </p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/30 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </button>
      </div>

      {/* Categories Section */}
      <div className="px-4 sm:px-6 mt-6 sm:mt-8 w-full">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="text-2xl sm:text-3xl">🤖</span>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground font-amiri text-center">
            {t('kids.whatToLearnToday')}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat, index) => {
            // Special handling for Balegh category
            if (cat.special) {
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="relative bg-gradient-to-br from-blue-400 via-cyan-400 to-kids-green rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 sm:border-4 border-white/50 group col-span-2 min-h-[44px]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* New Badge */}
                  {cat.isNew && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-kids-yellow to-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                      <span>{t('kids.categories.newBadge')}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    {/* Balegh Mascot with Animation */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border-2 sm:border-4 border-white/50">
                        <span className="text-4xl sm:text-5xl md:text-6xl balegh-wave balegh-blink">{cat.icon}</span>
                      </div>
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex-1 text-right min-w-0">
                      <h3 className="font-bold text-white font-amiri text-lg sm:text-xl mb-1 group-hover:scale-105 transition-transform">
                        {cat.title}
                      </h3>
                      {cat.subtext && (
                        <p className="text-white/90 font-tajawal text-xs sm:text-sm">
                          {cat.subtext}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-2 left-2 text-3xl opacity-20 group-hover:opacity-30 transition-opacity">💬</div>
                  <div className="absolute bottom-2 right-2 text-2xl opacity-20 group-hover:opacity-30 transition-opacity">✨</div>
                </button>
              );
            }
            
            // Regular category cards
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-kids-green/30 group relative w-full min-h-[44px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl sm:text-4xl transform group-hover:scale-110 transition-transform">{cat.icon}</span>
                </div>
                <h3 className="font-bold text-foreground font-tajawal text-xs sm:text-sm group-hover:text-kids-green transition-colors mb-1">
                  {cat.title}
                </h3>
                {cat.subtitle && (
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-tajawal line-clamp-2">
                    {cat.subtitle}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <KidsNavbar />
    </div>
  );
};

export default KidsHome;
