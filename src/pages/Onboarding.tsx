import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowLeft, Info } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const Onboarding = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, setExperience } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<'kids' | 'adults' | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onboardingData = useMemo(() => [
    {
      title: t('onboarding.title1'),
      description: t('onboarding.description1'),
      illustration: '📖',
      color: 'from-[#87D1A4] via-[#158467] to-[#006754]',
    },
    {
      title: t('onboarding.title2'),
      description: t('onboarding.description2'),
      illustration: '✨',
      color: 'from-[#87D1A4] via-[#158467] to-[#006754]',
    },
    {
      title: t('onboarding.title3'),
      description: t('onboarding.description3'),
      illustration: '🚀',
      color: 'from-[#87D1A4] via-[#158467] to-[#006754]',
    },
  ], [t]);

  // Swipe gesture handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentStep < onboardingData.length - 1) {
      handleNext();
    } else if (isRightSwipe && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/select-experience');
    }
  };

  const handleButtonClick = () => {
    setIsButtonAnimating(true);
    setTimeout(() => {
      setIsButtonAnimating(false);
      handleNext();
    }, 200);
  };

  const handleStartNow = () => {
    if (selectedExperience) {
      setExperience(selectedExperience);
      navigate(selectedExperience === 'kids' ? '/kids' : '/adults');
    }
  };

  const handleCardSelect = (experience: 'kids' | 'adults') => {
    setSelectedExperience(experience);
  };

  const handleSkip = () => {
    navigate('/select-experience');
  };

  const current = onboardingData[currentStep];

  // Screen 2 specific design - Experience Selection
  if (currentStep === 1) {
    return (
      <div 
        className="min-h-screen flex flex-col bg-gradient-to-br from-[#87D1A4] via-[#158467] to-[#006754] relative overflow-hidden w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Skip button */}
        <div className={`absolute top-4 sm:top-6 z-10 ${language === 'ar' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}>
          <button 
            onClick={handleSkip}
            className="text-white/70 hover:text-white text-xs sm:text-sm font-tajawal transition-colors min-h-[44px] px-2"
          >
            {t('common.skip')}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-4 sm:px-6 pt-16 sm:pt-20 pb-6 sm:pb-8">
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3 sm:mb-4 font-amiri fade-in px-2">
            {t('onboarding.title2')}
          </h1>

          {/* Subtext */}
          <p className="text-white/90 text-center text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 font-tajawal fade-in px-2" style={{ animationDelay: '0.2s' }}>
            {t('onboarding.subtitle2')}
          </p>

          {/* Two Experience Cards */}
          <div className="flex-1 flex flex-col gap-3 sm:gap-4 justify-center max-w-md mx-auto w-full">
            {/* Kids Card */}
            <button
              onClick={() => handleCardSelect('kids')}
              className={`relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg transition-all duration-300 w-full min-h-[44px] ${
                selectedExperience === 'kids' 
                  ? 'scale-105 ring-4 ring-white/50 shadow-xl' 
                  : 'scale-100 hover:scale-[1.02]'
              }`}
            >
              <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                {/* Playful Icon */}
                <div className="text-4xl sm:text-5xl md:text-6xl">
                  🎮
                </div>
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-[#006754] font-amiri">
                  {t('experience.kids')}
                </h2>
                {/* Description */}
                <p className="text-[#158467] text-sm sm:text-base font-tajawal px-2">
                  {t('onboarding.kidsCardText')}
                </p>
              </div>
              {/* Selection Indicator */}
              {selectedExperience === 'kids' && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-[#006754] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>

            {/* Adults Card */}
            <button
              onClick={() => handleCardSelect('adults')}
              className={`relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg transition-all duration-300 w-full min-h-[44px] ${
                selectedExperience === 'adults' 
                  ? 'scale-105 ring-4 ring-white/50 shadow-xl' 
                  : 'scale-100 hover:scale-[1.02]'
              }`}
            >
              <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                {/* Calm Icon */}
                <div className="text-4xl sm:text-5xl md:text-6xl">
                  📚
                </div>
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-[#006754] font-amiri">
                  {t('experience.adults')}
                </h2>
                {/* Description */}
                <p className="text-[#158467] text-sm sm:text-base font-tajawal px-2">
                  {t('onboarding.adultsCardText')}
                </p>
              </div>
              {/* Selection Indicator */}
              {selectedExperience === 'adults' && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-[#006754] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          </div>

          {/* Tooltip */}
          <div className="flex justify-center mt-6 mb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-white/70 hover:text-white transition-colors p-2">
                  <Info className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-white text-[#006754] font-tajawal">
                {t('onboarding.tooltipText')}
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Bottom CTA Button */}
          <div className="px-4 w-full">
            <Button
              onClick={handleStartNow}
              disabled={!selectedExperience}
              className={`w-full bg-white hover:bg-white/90 text-[#006754] font-bold py-4 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-lg shadow-lg transition-all duration-200 min-h-[44px] ${
                isButtonAnimating ? 'scale-95' : 'scale-100'
              } ${
                !selectedExperience ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {t('common.start')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 1 specific design
  if (currentStep === 0) {
    return (
      <div 
        className="min-h-screen flex flex-col bg-gradient-to-br from-[#87D1A4] via-[#158467] to-[#006754] relative overflow-hidden w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Skip button */}
        <div className={`absolute top-4 sm:top-6 z-10 ${language === 'ar' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}>
          <button 
            onClick={handleSkip}
            className="text-white/70 hover:text-white text-xs sm:text-sm font-tajawal transition-colors min-h-[44px] px-2"
          >
            {t('common.skip')}
          </button>
        </div>

        {/* Content - Spacious and centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          {/* Top Illustration */}
          <div className="mb-6 sm:mb-8 md:mb-12 fade-in">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl pulse-soft">
              {current.illustration}
            </div>
          </div>

          {/* Centered Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 sm:mb-6 font-amiri fade-in px-4" style={{ animationDelay: '0.2s' }}>
            {t('onboarding.title1')}
          </h1>

          {/* Subtext */}
          <p className="text-white/90 text-center text-base sm:text-lg md:text-xl leading-relaxed max-w-md mx-auto font-tajawal mb-8 sm:mb-12 md:mb-16 fade-in px-4" style={{ animationDelay: '0.4s' }}>
            {t('onboarding.subtitle1')}
          </p>
        </div>

        {/* Bottom CTA Button */}
        <div className="pb-6 sm:pb-8 md:pb-12 px-4 sm:px-6 md:px-8 w-full">
          <Button
            onClick={handleButtonClick}
            className={`w-full bg-white hover:bg-white/90 text-[#006754] font-bold py-4 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-lg shadow-lg transition-all duration-200 min-h-[44px] ${
              isButtonAnimating ? 'scale-95' : 'scale-100'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {t('common.next')}
              {language === 'ar' ? (
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              )}
            </span>
          </Button>
        </div>
      </div>
    );
  }

  // Other screens (2 and 3)
  return (
    <div 
      className={`min-h-screen flex flex-col bg-gradient-to-br ${current.color} islamic-pattern-gold relative overflow-hidden w-full`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Skip button */}
      <div className={`absolute top-4 sm:top-6 z-10 ${language === 'ar' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}>
        <button 
          onClick={handleSkip}
          className="text-white/70 hover:text-white text-xs sm:text-sm font-tajawal transition-colors min-h-[44px] px-2"
        >
          {t('common.skip')}
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-16 sm:top-20 right-6 sm:right-10 w-16 h-16 sm:w-20 sm:h-24 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-32 sm:bottom-40 left-6 sm:left-10 w-24 h-24 sm:w-28 sm:h-32 bg-white/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-12 sm:pt-16">
        <div className="slide-up" key={currentStep}>
          {/* Icon */}
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 sm:mb-8 text-center bounce-in">
            {current.illustration}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4 font-amiri px-4">
            {current.title}
          </h1>

          {/* Description */}
          <p className="text-white/80 text-center text-sm sm:text-base md:text-lg leading-relaxed max-w-xs mx-auto font-tajawal px-4">
            {current.description}
          </p>
        </div>
      </div>

      {/* Progress and Navigation */}
      <div className="pb-6 sm:pb-8 md:pb-12 px-4 sm:px-6 md:px-8 w-full">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6 sm:mb-8">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'w-6 sm:w-8 bg-white' 
                  : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleNext}
          className="w-full bg-white hover:bg-white/90 text-[#006754] font-bold py-4 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-lg shadow-lg transition-all duration-300 hover:scale-[1.02] min-h-[44px]"
        >
          {currentStep === onboardingData.length - 1 ? (
            t('common.start')
          ) : (
            <span className="flex items-center gap-2">
              {t('common.next')}
              {language === 'ar' ? (
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
