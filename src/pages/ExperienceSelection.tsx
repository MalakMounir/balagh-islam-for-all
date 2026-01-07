import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { Star, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ExperienceSelection = () => {
  const navigate = useNavigate();
  const { setExperience, childProfiles, setSelectedChildProfile } = useApp();
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState<'kids' | 'adults' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showChildSelectDialog, setShowChildSelectDialog] = useState(false);
  const [pendingExperience, setPendingExperience] = useState<'kids' | 'adults' | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleCardTap = (experience: 'kids' | 'adults') => {
    setSelectedCard(experience);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setPendingExperience(experience);
      
      // If kids experience and we have child profiles, show selection dialog
      if (experience === 'kids' && childProfiles.length > 0) {
        setShowChildSelectDialog(true);
      } else if (experience === 'kids' && childProfiles.length === 0) {
        // No child profiles, navigate to add child
        navigate('/auth/setup/add-child');
      } else {
        // Adults experience or no profiles needed
        setShowConfirmDialog(true);
      }
    }, 300);
  };

  const handleChildSelect = (childId: string) => {
    const child = childProfiles.find(c => c.id === childId);
    if (child) {
      setSelectedChildProfile(child);
      setExperience('kids');
      navigate('/kids');
    }
    setShowChildSelectDialog(false);
    setPendingExperience(null);
  };

  const handleConfirm = () => {
    if (pendingExperience) {
      setExperience(pendingExperience);
      navigate(pendingExperience === 'kids' ? '/kids' : '/adults');
    }
    setShowConfirmDialog(false);
    setPendingExperience(null);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setPendingExperience(null);
    setSelectedCard(null);
  };

  // Swipe gesture handlers (optional, mainly for kids card)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || showConfirmDialog) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Optional swipe to switch between cards
    if (isLeftSwipe && selectedCard === 'adults') {
      handleCardTap('kids');
    } else if (isRightSwipe && selectedCard === 'kids') {
      handleCardTap('adults');
    }
  };

  return (
    <>
      <div 
        className="min-h-screen bg-gradient-to-br from-[#87D1A4] via-[#158467] to-[#006754] flex flex-col px-4 sm:px-6 py-8 sm:py-12 relative w-full overflow-x-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Language Switcher - Top Right */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
          <LanguageSwitcher variant="icon" />
        </div>
        
        {/* Experience Cards */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6 justify-center max-w-lg mx-auto w-full">
          {/* Kids Card */}
          <button
            onClick={() => handleCardTap('kids')}
            className={`group relative flex-1 min-h-[240px] sm:min-h-[280px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 w-full ${
              selectedCard === 'kids'
                ? 'ring-4 ring-adults-gold shadow-[0_0_30px_rgba(212,175,55,0.5)] scale-105'
                : 'shadow-lg hover:shadow-xl hover:scale-[1.02]'
            } ${isAnimating && selectedCard === 'kids' ? 'scale-110' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-kids-green via-kids-blue to-kids-yellow opacity-90" />
            <div className="absolute inset-0 islamic-pattern opacity-30" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
              {/* Mascot */}
              <div className="mb-3 sm:mb-4 text-5xl sm:text-6xl md:text-7xl float-animation">🧒🏻</div>
              
              {/* Stars decoration */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-kids-yellow fill-kids-yellow animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 font-tajawal">
                {t('experience.kids')}
              </h2>
              <p className="text-white/90 text-sm sm:text-base font-tajawal px-2">
                {t('experience.kidsDescription')}
              </p>
              
              {/* Playful decorations */}
              <div className="absolute bottom-4 left-4 text-4xl opacity-50">⭐</div>
              <div className="absolute top-4 left-4 text-3xl opacity-50">🎮</div>
            </div>
          </button>

          {/* Adults Card */}
          <button
            onClick={() => handleCardTap('adults')}
            className={`group relative flex-1 min-h-[240px] sm:min-h-[280px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 w-full ${
              selectedCard === 'adults'
                ? 'ring-4 ring-adults-gold shadow-[0_0_30px_rgba(212,175,55,0.5)] scale-105'
                : 'shadow-lg hover:shadow-xl hover:scale-[1.02]'
            } ${isAnimating && selectedCard === 'adults' ? 'scale-110' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#006754] via-[#158467] to-[#065446]" />
            <div className="absolute inset-0 islamic-pattern-gold opacity-40" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
              {/* Icon */}
              <div className="mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-24 bg-adults-gold/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-adults-gold" />
              </div>
              
              {/* Gold accent */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-adults-gold rounded-full" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 font-amiri">
                {t('experience.adults')}
              </h2>
              <p className="text-white/80 text-sm sm:text-base font-tajawal px-2">
                {t('experience.adultsDescription')}
              </p>
              
              {/* Elegant decorations */}
              <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-adults-gold/30 rounded-lg rotate-45" />
              <div className="absolute top-4 left-4 w-6 h-6 border border-adults-gold/20 rounded-full" />
            </div>
          </button>
        </div>

        {/* Micro-text */}
        <p className="text-center text-[10px] sm:text-xs text-white/70 mt-4 sm:mt-6 font-tajawal px-4">
          {t('experience.microText')}
        </p>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="rounded-2xl" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-[#006754] font-amiri text-center">
              {pendingExperience === 'kids' 
                ? t('experience.confirmKids')
                : t('experience.confirmAdults')}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 justify-center">
            <AlertDialogCancel 
              onClick={handleCancel}
              className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-tajawal rounded-xl"
            >
              {t('experience.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirm}
              className="bg-[#006754] hover:bg-[#158467] text-white font-bold font-tajawal rounded-xl"
            >
              {t('experience.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Child Profile Selection Dialog */}
      <AlertDialog open={showChildSelectDialog} onOpenChange={setShowChildSelectDialog}>
        <AlertDialogContent className="rounded-2xl" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-[#006754] font-amiri text-center">
              اختر ملف الطفل
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-3 py-4">
            {childProfiles.map((child) => (
              <button
                key={child.id}
                onClick={() => handleChildSelect(child.id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[#006754] hover:bg-[#006754]/5 transition-all duration-300"
              >
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-kids-green to-kids-blue">
                    {child.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-right">
                  <p className="font-bold text-[#006754] font-tajawal text-lg">{child.name}</p>
                  <p className="text-sm text-gray-600 font-tajawal">{child.age} سنوات</p>
                </div>
              </button>
            ))}
            <button
              onClick={() => {
                setShowChildSelectDialog(false);
                navigate('/auth/setup/add-child');
              }}
              className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#006754] text-gray-600 hover:text-[#006754] transition-all duration-300 font-tajawal"
            >
              + إضافة طفل جديد
            </button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setShowChildSelectDialog(false);
                setPendingExperience(null);
                setSelectedCard(null);
              }}
              className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-tajawal rounded-xl"
            >
              {t('experience.cancel')}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExperienceSelection;
