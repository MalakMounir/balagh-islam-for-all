import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const onboardingData = [
  {
    title: 'مرحباً بك في بلاغ',
    description: 'تطبيق تعليمي إسلامي مصمم لمساعدتك أنت وأطفالك على فهم الإسلام بطريقة ممتعة وسهلة',
    icon: '🕌',
    color: 'from-adults-green to-adults-emerald',
  },
  {
    title: 'تجربة مخصصة',
    description: 'اختر بين تجربة الأطفال التفاعلية المليئة بالألعاب، أو تجربة الكبار الغنية بالمحتوى العلمي',
    icon: '✨',
    color: 'from-adults-emerald to-adults-teal',
  },
  {
    title: 'ابدأ رحلتك',
    description: 'تعلم، العب، واكتشف جمال الإسلام مع بلاغ',
    icon: '🚀',
    color: 'from-adults-teal to-adults-green',
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/select-experience');
    }
  };

  const handleSkip = () => {
    navigate('/select-experience');
  };

  const current = onboardingData[currentStep];

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${current.color} islamic-pattern-gold relative overflow-hidden`}>
      {/* Skip button */}
      <div className="absolute top-6 left-6 z-10">
        <button 
          onClick={handleSkip}
          className="text-white/70 hover:text-white text-sm font-tajawal transition-colors"
        >
          تخطي
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-adults-gold/20 rounded-full blur-2xl" />
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16">
        <div className="slide-up" key={currentStep}>
          {/* Icon */}
          <div className="text-8xl mb-8 text-center bounce-in">
            {current.icon}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white text-center mb-4 font-amiri">
            {current.title}
          </h1>

          {/* Description */}
          <p className="text-white/80 text-center text-lg leading-relaxed max-w-xs mx-auto font-tajawal">
            {current.description}
          </p>
        </div>
      </div>

      {/* Progress and Navigation */}
      <div className="pb-12 px-8">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'w-8 bg-adults-gold' 
                  : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleNext}
          className="w-full bg-adults-gold hover:bg-adults-gold-light text-adults-green font-bold py-6 rounded-2xl text-lg shadow-gold transition-all duration-300 hover:scale-[1.02]"
        >
          {currentStep === onboardingData.length - 1 ? (
            'ابدأ الآن'
          ) : (
            <span className="flex items-center gap-2">
              التالي
              <ChevronLeft className="w-5 h-5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
