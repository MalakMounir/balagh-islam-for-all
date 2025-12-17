import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const categoryData: Record<string, { title: string; icon: string; color: string }> = {
  prophets: { title: 'قصص الأنبياء', icon: '📖', color: 'from-kids-green to-emerald-400' },
  values: { title: 'القيم والأخلاق', icon: '💝', color: 'from-kids-coral to-pink-400' },
  questions: { title: 'أسئلة دينية', icon: '❓', color: 'from-kids-blue to-cyan-400' },
  knowgod: { title: 'اعرف ربك', icon: '✨', color: 'from-kids-yellow to-amber-400' },
  muslim: { title: 'أنا مسلم', icon: '🕌', color: 'from-violet-400 to-purple-500' },
};

const levels = [
  { id: 'easy', label: 'سهل', emoji: '😊', description: '5 أسئلة بسيطة' },
  { id: 'medium', label: 'متوسط', emoji: '🤔', description: '7 أسئلة متنوعة' },
  { id: 'hard', label: 'صعب', emoji: '🧠', description: '10 أسئلة للأبطال' },
];

const KidsCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateKidsProgress } = useApp();
  const [selectedLevel, setSelectedLevel] = useState('easy');

  const category = categoryData[id || 'prophets'];

  const handleStartGame = () => {
    updateKidsProgress({ currentCategory: id || null });
    navigate('/kids/question');
  };

  return (
    <div className="min-h-screen theme-kids bg-kids-bg">
      {/* Header */}
      <div className={`bg-gradient-to-br ${category.color} p-6 pt-10 rounded-b-[3rem] islamic-pattern relative`}>
        <button 
          onClick={() => navigate('/kids')}
          className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="text-center pt-8">
          <div className="text-6xl mb-4 float-animation">{category.icon}</div>
          <h1 className="text-3xl font-bold text-white font-tajawal">
            {category.title}
          </h1>
        </div>
      </div>

      {/* Level Selection */}
      <div className="px-6 mt-8">
        <h2 className="text-xl font-bold text-foreground mb-4 font-tajawal text-center">
          اختر مستوى الصعوبة 🎯
        </h2>

        <div className="space-y-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`w-full card-kids p-5 flex items-center gap-4 transition-all duration-300 ${
                selectedLevel === level.id 
                  ? 'ring-4 ring-kids-green ring-offset-2 scale-[1.02]' 
                  : ''
              }`}
            >
              <div className="text-4xl">{level.emoji}</div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-foreground text-lg font-tajawal">
                  {level.label}
                </h3>
                <p className="text-muted-foreground text-sm font-tajawal">
                  {level.description}
                </p>
              </div>
              {selectedLevel === level.id && (
                <div className="w-6 h-6 bg-kids-green rounded-full flex items-center justify-center bounce-in">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="fixed bottom-8 left-6 right-6">
        <Button
          onClick={handleStartGame}
          className="w-full btn-kids bg-gradient-to-l from-kids-green to-kids-blue text-white text-xl py-7"
        >
          <Play className="w-6 h-6 ml-2" />
          ابدأ اللعب
        </Button>
      </div>
    </div>
  );
};

export default KidsCategory;
