import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { X, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const questions = [
  {
    id: 1,
    question: 'من هو أول نبي أرسله الله؟',
    illustration: '👤',
    options: ['نوح عليه السلام', 'آدم عليه السلام', 'إبراهيم عليه السلام', 'موسى عليه السلام'],
    correct: 1,
  },
  {
    id: 2,
    question: 'كم عدد أركان الإسلام؟',
    illustration: '🕌',
    options: ['ثلاثة', 'أربعة', 'خمسة', 'ستة'],
    correct: 2,
  },
  {
    id: 3,
    question: 'ما هو الركن الأول من أركان الإسلام؟',
    illustration: '🤲',
    options: ['الصلاة', 'الزكاة', 'الشهادتان', 'الصيام'],
    correct: 2,
  },
];

const KidsQuestion = () => {
  const navigate = useNavigate();
  const { updateKidsProgress, kidsProgress } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [earnedStars, setEarnedStars] = useState(0);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    const correct = index === currentQuestion.correct;
    setIsCorrect(correct);

    if (correct) {
      setEarnedStars(prev => prev + 10);
    } else {
      setHearts(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
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

  return (
    <div className="min-h-screen theme-kids bg-kids-bg flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <button 
          onClick={handleExit}
          className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-l from-kids-green to-kids-blue rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Hearts */}
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart 
              key={i}
              className={`w-6 h-6 transition-all duration-300 ${
                i < hearts 
                  ? 'text-kids-coral fill-kids-coral' 
                  : 'text-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stars earned */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-1 bg-kids-yellow-light px-4 py-2 rounded-full">
          <Star className="w-5 h-5 text-kids-yellow fill-kids-yellow" />
          <span className="font-bold text-foreground">{earnedStars}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 px-6">
        <div className="card-kids p-6 text-center slide-up">
          {/* Illustration */}
          <div className="text-7xl mb-6 float-animation">
            {currentQuestion.illustration}
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold text-foreground mb-8 font-tajawal leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correct;
              
              let bgColor = 'bg-muted hover:bg-muted/80';
              if (showFeedback) {
                if (isCorrectAnswer) {
                  bgColor = 'bg-kids-green text-white';
                } else if (isSelected && !isCorrectAnswer) {
                  bgColor = 'bg-kids-coral text-white shake';
                }
              } else if (isSelected) {
                bgColor = 'bg-kids-blue-light';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-2xl font-bold transition-all duration-300 ${bgColor}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-2xl text-center bounce-in ${
            isCorrect ? 'bg-kids-green-light' : 'bg-kids-coral-light'
          }`}>
            <p className="text-2xl mb-2">{isCorrect ? '🎉' : '😢'}</p>
            <p className="font-bold font-tajawal">
              {isCorrect ? 'أحسنت! إجابة صحيحة' : 'حاول مرة أخرى'}
            </p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {showFeedback && (
        <div className="p-6">
          <Button
            onClick={handleNext}
            className="w-full btn-kids bg-gradient-to-l from-kids-green to-kids-blue text-white text-lg py-6"
          >
            {currentIndex < questions.length - 1 ? 'السؤال التالي' : 'أنهي اللعبة'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default KidsQuestion;
