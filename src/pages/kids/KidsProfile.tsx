import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { ChevronRight, Star, Trophy, Medal, Crown, Edit, Users } from 'lucide-react';
import KidsNavbar from '@/components/kids/KidsNavbar';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';

const badges = [
  { id: 'kindFriend', name: 'صديق طيب', icon: '💝', unlocked: true, hint: 'ساعدت صديق' },
  { id: 'loverOfGood', name: 'محب للخير', icon: '🌟', unlocked: true, hint: 'عملت خير' },
  { id: 'honest', name: 'صادق', icon: '💎', unlocked: true, hint: 'كنت صادق' },
  { id: 'cooperative', name: 'متعاون', icon: '🤝', unlocked: false, hint: 'ساعدت 10 مرات' },
  { id: 'curiosity', name: 'وسام الفضول', icon: '🤔', unlocked: false, hint: 'سألت بليغ 5 أسئلة' },
  { id: 'student', name: 'طالب علم', icon: '📚', unlocked: false, hint: 'أكملت أول لعبة' },
];

const avatars = ['🧒🏻', '🧒🏼', '🧒🏽', '🧒🏾', '🧒🏿', '👧🏻', '👧🏼', '👧🏽', '👧🏾', '👧🏿'];

const KidsProfile = () => {
  const navigate = useNavigate();
  const { kidsProgress, setExperience, updateKidsProgress } = useApp();
  const { t } = useTranslation();
  const [selectedAvatar, setSelectedAvatar] = useState('🧒🏻');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [childName, setChildName] = useState('البطل الصغير'); // This would come from context/storage
  const [baleghQuestionsCount] = useState(8); // This would come from context/storage
  const [badgesCount] = useState(3);
  const [weeklyProgress] = useState(65);
  const dailyStreak = kidsProgress.dailyStreak || 0;
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSwitchExperience = () => {
    setExperience(null);
    navigate('/select-experience');
  };

  const handleEditAvatar = () => {
    setShowAvatarPicker(!showAvatarPicker);
  };

  const handleSelectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
    setShowAvatarPicker(false);
  };

  const getEncouragingMessage = () => {
    if (weeklyProgress >= 80) return t('kids.profile.encouragingMessages.great');
    if (weeklyProgress >= 50) return t('kids.profile.encouragingMessages.good');
    return t('kids.profile.encouragingMessages.keepGoing');
  };

  const favoriteTopics = [
    { id: 'prophets', name: t('kids.categories.prophets'), icon: '📚' },
    { id: 'values', name: t('kids.categories.values'), icon: '💝' },
    { id: 'questions', name: t('kids.categories.questions'), icon: '❓' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-bg via-kids-green-light/10 to-kids-blue-light/10 pb-32">
      <PersistentLanguageToggle />
      {/* Top Header with Avatar */}
      <div className={`bg-gradient-to-br from-kids-green via-kids-blue to-kids-yellow p-6 pt-12 rounded-b-[3rem] text-center relative overflow-hidden transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-5xl opacity-20 animate-pulse">⭐</div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-20 animate-bounce">🎮</div>

        <button 
          onClick={() => navigate('/kids')}
          className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Large Circular Avatar */}
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50 relative">
            <span className="text-7xl">{selectedAvatar}</span>
            
            {/* Edit Avatar Button */}
            <button
              onClick={handleEditAvatar}
              className="absolute -bottom-2 right-0 w-12 h-12 bg-gradient-to-br from-kids-green to-kids-blue rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white"
            >
              <Edit className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Avatar Picker Modal */}
        {showAvatarPicker && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 rounded-b-[3rem]">
            <div className="bg-white rounded-3xl p-6 m-4 max-w-sm w-full">
              <h3 className="font-bold text-foreground mb-4 font-tajawal text-center">
                {t('kids.profile.editAvatar')}
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {avatars.map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAvatar(avatar)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-3xl hover:scale-110 transition-transform ${
                      selectedAvatar === avatar ? 'ring-4 ring-kids-green' : ''
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Greeting with Child Name */}
        <h1 className="text-3xl font-bold text-white font-amiri mb-2 relative z-10">
          {t('kids.greeting')} {childName}
        </h1>

        {/* Level and Stars */}
        <div className="flex items-center justify-center gap-4 mt-4 relative z-10">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Crown className="w-5 h-5 text-kids-yellow" />
            <span className="text-white font-bold font-tajawal">
              {t('kids.level')} {kidsProgress.level}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Star className="w-5 h-5 text-kids-yellow fill-kids-yellow" />
            <span className="text-white font-bold font-tajawal">
              {kidsProgress.stars}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Overview Cards */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Stars Count */}
          <div className="bg-gradient-to-br from-kids-yellow to-amber-400 rounded-3xl p-4 text-center shadow-xl">
            <Star className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-2xl font-bold text-white font-tajawal">{kidsProgress.stars}</p>
            <p className="text-xs text-white/90 font-tajawal">{t('kids.profile.starsCount')}</p>
          </div>

          {/* Badges Count */}
          <div className="bg-gradient-to-br from-kids-green to-emerald-400 rounded-3xl p-4 text-center shadow-xl">
            <Medal className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-2xl font-bold text-white font-tajawal">{badgesCount}</p>
            <p className="text-xs text-white/90 font-tajawal">{t('kids.profile.badgesCount')}</p>
          </div>

          {/* Daily Streak */}
          <div className="bg-gradient-to-br from-kids-coral to-pink-400 rounded-3xl p-4 text-center shadow-xl">
            <span className="text-4xl mb-2 block">🔥</span>
            <p className="text-2xl font-bold text-white font-tajawal">{dailyStreak}</p>
            <p className="text-xs text-white/90 font-tajawal">{t('kids.profile.dailyStreak') || 'يوم متتالي'}</p>
          </div>

          {/* Balegh Questions */}
          <div className="bg-gradient-to-br from-kids-blue to-cyan-400 rounded-3xl p-4 text-center shadow-xl">
            <span className="text-4xl mb-2 block">🤖</span>
            <p className="text-2xl font-bold text-white font-tajawal">{baleghQuestionsCount}</p>
            <p className="text-xs text-white/90 font-tajawal">{t('kids.profile.baleghQuestions')}</p>
          </div>
        </div>
      </div>

      {/* Daily Streak Card */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-br from-kids-coral/20 to-pink-100 rounded-3xl p-6 shadow-xl border-2 border-kids-coral/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground font-amiri flex items-center gap-2">
              <span className="text-3xl">🔥</span>
              {t('kids.profile.dailyStreak') || 'سلسلة الأيام'}
            </h2>
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="text-sm text-kids-coral font-bold font-tajawal hover:underline"
            >
              {t('kids.profile.leaderboard') || 'لوحة المتصدرين'}
            </button>
          </div>
          
          {/* Streak Visualization */}
          <div className="flex items-center gap-2 mb-3">
            {Array.from({ length: Math.min(dailyStreak, 7) }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-12 bg-gradient-to-br from-kids-coral to-pink-400 rounded-xl flex items-center justify-center shadow-lg animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-white text-xl">🔥</span>
              </div>
            ))}
            {dailyStreak > 7 && (
              <div className="flex-1 h-12 bg-gradient-to-br from-kids-yellow to-amber-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold font-tajawal">+{dailyStreak - 7}</span>
              </div>
            )}
          </div>
          
          <p className="text-foreground font-tajawal text-center text-sm">
            {dailyStreak >= 7 
              ? t('kids.profile.streakGreat') || 'ممتاز! استمر في التعلم كل يوم! 🌟'
              : t('kids.profile.streakKeepGoing') || `استمر ${7 - dailyStreak} أيام أخرى للحصول على مكافأة! 💪`
            }
          </p>
        </div>
      </div>

      {/* Safe Leaderboard (Optional) */}
      {showLeaderboard && (
        <div className="px-6 mt-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-kids-green/20">
            <h3 className="text-lg font-bold text-foreground mb-4 font-amiri text-center">
              {t('kids.profile.leaderboard') || 'لوحة المتصدرين'}
            </h3>
            <div className="space-y-3">
              {/* Mock leaderboard entries - anonymized */}
              {[
                { rank: 1, name: 'بطل 1', streak: 15, isCurrent: false },
                { rank: 2, name: 'بطل 2', streak: 12, isCurrent: false },
                { rank: 3, name: childName, streak: dailyStreak, isCurrent: true },
                { rank: 4, name: 'بطل 3', streak: 5, isCurrent: false },
              ].map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    entry.isCurrent
                      ? 'bg-gradient-to-r from-kids-green/20 to-kids-blue/20 border-2 border-kids-green'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-tajawal ${
                    entry.rank === 1 ? 'bg-gradient-to-br from-kids-yellow to-amber-400 text-white' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                    entry.rank === 3 ? 'bg-gradient-to-br from-kids-coral to-pink-400 text-white' :
                    'bg-gray-200 text-foreground'
                  }`}>
                    {entry.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground font-tajawal">{entry.name}</p>
                    <p className="text-xs text-muted-foreground font-tajawal">
                      {entry.streak} {t('kids.profile.days') || 'يوم'}
                    </p>
                  </div>
                  <span className="text-2xl">🔥</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-tajawal text-center mt-4">
              {t('kids.profile.leaderboardNote') || 'الأسماء معتمة لحماية الخصوصية'}
            </p>
          </div>
        </div>
      )}

      {/* Weekly Progress Card */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-kids-green/20">
          <h2 className="text-xl font-bold text-foreground mb-4 font-amiri">
            {t('kids.profile.weeklyProgress')}
          </h2>
          
          {/* Progress Bar */}
          <div className="h-6 bg-kids-green/10 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-kids-green via-kids-blue to-kids-yellow rounded-full transition-all duration-500"
              style={{ width: `${weeklyProgress}%` }}
            />
          </div>
          
          {/* Encouraging Message */}
          <p className="text-foreground font-tajawal text-center">
            {getEncouragingMessage()}
          </p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-foreground mb-4 font-amiri">
          {t('kids.profile.achievements')}
        </h2>
        
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative rounded-3xl p-4 text-center transition-all ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-kids-yellow/20 to-amber-100 shadow-lg border-2 border-kids-yellow/30'
                  : 'bg-gray-100 opacity-60 border-2 border-gray-200'
              }`}
            >
              <div className={`text-5xl mb-2 ${!badge.unlocked && 'grayscale opacity-50'}`}>
                {badge.icon}
              </div>
              <p className="text-xs font-bold font-tajawal text-foreground mb-1">
                {badge.name}
              </p>
              {!badge.unlocked && (
                <p className="text-[10px] text-muted-foreground font-tajawal">
                  {badge.hint}
                </p>
              )}
              {badge.unlocked && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-kids-green rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Topics Section */}
      <div className="px-6 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🤖</span>
          <h2 className="text-xl font-bold text-foreground font-amiri">
            {t('kids.profile.favoriteTopics')}
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {favoriteTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => navigate(`/kids/category/${topic.id}`)}
              className="bg-white border-2 border-kids-green/30 hover:border-kids-green rounded-full px-5 py-3 flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <span className="text-2xl">{topic.icon}</span>
              <span className="font-bold font-tajawal text-foreground">{topic.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Parents Area Button */}
      <div className="px-6 mt-8 mb-6">
        <button
          onClick={() => navigate('/kids/parents-area')}
          className="w-full bg-white border-2 border-kids-green/30 hover:border-kids-green rounded-3xl p-4 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
        >
          <Users className="w-6 h-6 text-kids-green" />
          <span className="font-bold font-tajawal text-foreground text-lg">
            {t('kids.profile.parentsArea')}
          </span>
        </button>
      </div>

      <KidsNavbar />
    </div>
  );
};

export default KidsProfile;
