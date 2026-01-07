import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { X, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const questions = [
  {
    id: 1,
    question: 'من هو أول نبي أرسله الله؟',
    illustration: '👨‍🦳',
    options: ['نوح عليه السلام', 'آدم عليه السلام', 'إبراهيم عليه السلام', 'موسى عليه السلام'],
    correct: 1,
    hint: 'هو أول إنسان خلقه الله',
  },
  {
    id: 2,
    question: 'كم عدد أركان الإسلام؟',
    illustration: '🕌',
    options: ['ثلاثة', 'أربعة', 'خمسة', 'ستة'],
    correct: 2,
    hint: 'الرقم بين أربعة وستة',
  },
  {
    id: 3,
    question: 'ما هو الركن الأول من أركان الإسلام؟',
    illustration: '🤲',
    options: ['الصلاة', 'الزكاة', 'الشهادتان', 'الصيام'],
    correct: 2,
    hint: 'تبدأ بكلمتين: أشهد أن...',
  },
];

const KidsQuestion = () => {
  const navigate = useNavigate();
  const { updateKidsProgress, kidsProgress } = useApp();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const totalStars = kidsProgress.stars + earnedStars;

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    const correct = index === currentQuestion.correct;
    setIsCorrect(correct);

    if (correct) {
      setEarnedStars(prev => prev + 10);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      setShowHint(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
      setShowConfetti(false);
    } else {
      // Game complete
      updateKidsProgress({ 
        stars: kidsProgress.stars + earnedStars,
        level: kidsProgress.level + (earnedStars >= 20 ? 1 : 0)
      });
      navigate('/kids/achievement');
    }
  };

  const handleExit = () => {
    navigate('/kids');
  };

  // Confetti animation
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-bg via-kids-green-light/10 to-kids-blue-light/10 flex flex-col relative overflow-hidden pb-32">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
                backgroundColor: ['#158467', '#87D1A4', '#FFD93D', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 5)],
                width: '12px',
                height: '12px',
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      )}

      {/* Stars Counter at Top */}
      <div className="bg-gradient-to-br from-kids-green via-kids-blue to-kids-yellow p-4 pt-12 rounded-b-[2rem] relative">
        <button 
          onClick={handleExit}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
            <Star className="w-6 h-6 text-kids-yellow fill-kids-yellow" />
            <span className="text-xl font-bold text-white font-tajawal">
              {totalStars}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-white/30 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-white via-white/90 to-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/90 text-sm text-center font-tajawal">
          السؤال {currentIndex + 1} من {questions.length}
        </p>
      </div>

      {/* Question Content */}
      <div className="flex-1 px-6 pt-8">
        {/* Cartoon Illustration */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-kids-green to-kids-blue rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
            <span className="text-8xl">{currentQuestion.illustration}</span>
          </div>
        </div>

        {/* Question Text */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 text-center">
          <h2 className="text-2xl font-bold text-foreground font-amiri leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Answer Cards */}
        <div className="space-y-4 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correct;
            
            let cardStyle = 'bg-white hover:bg-kids-green/10 border-2 border-gray-200';
            if (showFeedback) {
              if (isCorrectAnswer) {
                cardStyle = 'bg-gradient-to-br from-kids-green to-emerald-400 text-white border-4 border-kids-yellow shadow-2xl scale-105 celebrate';
              } else if (isSelected && !isCorrectAnswer) {
                cardStyle = 'bg-gradient-to-br from-kids-coral to-pink-400 text-white border-2 border-kids-coral shake';
              } else {
                cardStyle = 'bg-gray-100 border-2 border-gray-200 opacity-60';
              }
            } else if (isSelected) {
              cardStyle = 'bg-gradient-to-br from-kids-blue to-cyan-400 text-white border-4 border-kids-blue shadow-xl';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full p-5 rounded-3xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] ${cardStyle}`}
              >
                <span className="font-tajawal">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Hint for Wrong Answer */}
        {showFeedback && !isCorrect && showHint && (
          <div className="bg-gradient-to-br from-kids-yellow to-amber-400 rounded-3xl p-5 mb-6 bounce-in shadow-xl border-2 border-white">
            <div className="flex items-center gap-3 text-right">
              <span className="text-3xl">💡</span>
              <div className="flex-1">
                <p className="font-bold text-white text-sm font-tajawal mb-1">
                  {t('kids.question.hint')}
                </p>
                <p className="text-white font-tajawal">
                  {currentQuestion.hint}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showFeedback && isCorrect && (
          <div className="bg-gradient-to-br from-kids-green to-emerald-400 rounded-3xl p-5 mb-6 bounce-in shadow-xl border-2 border-white text-center">
            <p className="text-4xl mb-2">🎉</p>
            <p className="text-white font-bold text-lg font-tajawal">
              {t('kids.question.correctAnswer')}
            </p>
            <div className="mt-2 flex items-center justify-center gap-1">
              <Star className="w-5 h-5 text-kids-yellow fill-kids-yellow" />
              <span className="text-white font-bold font-tajawal">+10</span>
            </div>
          </div>
        )}
      </div>

      {/* Next Question Button */}
      {showFeedback && (
        <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto">
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-kids-green via-kids-blue to-kids-yellow hover:from-kids-blue hover:via-kids-green hover:to-kids-coral text-white font-bold text-xl py-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white"
          >
            <span className="flex items-center justify-center gap-3">
              {currentIndex < questions.length - 1 ? t('kids.question.nextQuestion') : 'أنهي اللعبة 🏆'}
              <ArrowLeft className="w-6 h-6 transform rotate-180" />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default KidsQuestion;
