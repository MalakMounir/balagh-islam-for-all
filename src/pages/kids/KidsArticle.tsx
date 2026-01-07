import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import AudioPlayer from '@/components/AudioPlayer';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';

const categoryData: Record<string, { title: string; color: string; illustration: string }> = {
  prophets: { title: 'قصص الأنبياء', color: 'from-kids-green to-emerald-400', illustration: '📚' },
  values: { title: 'القيم والأخلاق', color: 'from-kids-coral to-pink-400', illustration: '💖' },
  questions: { title: 'أسئلة دينية', color: 'from-kids-blue to-cyan-400', illustration: '🤔' },
  knowgod: { title: 'اعرف ربك', color: 'from-kids-yellow to-amber-400', illustration: '🌟' },
  muslim: { title: 'أنا مسلم', color: 'from-violet-400 to-purple-500', illustration: '🎯' },
};

// Articles data (same as in KidsCategory)
const categoryArticles: Record<string, { id: string; title: string; description: string; emoji: string; illustration: string; content: string[]; keywords: string[] }[]> = {
  prophets: [
    {
      id: 'prophet-nuh',
      title: 'قصة سيدنا نوح',
      description: 'تعرف على قصة النبي نوح عليه السلام وكيف نجّاه الله',
      emoji: '🌊',
      illustration: '🚢',
      content: [
        'كان سيدنا نوح نبي طيب جداً! 🌟',
        'كان بيحب الناس وبيقولهم يعملوا صح.',
        'ربنا أمره يبني سفينة كبيرة.',
        'جت مية كتيرة ونوح والناس الطيبين نجوا! 💙',
        'القصة تعلمنا نسمع كلام ربنا دائماً.'
      ],
      keywords: ['نوح', 'نبي', 'سفينة', 'ربنا', 'نجاة']
    },
    {
      id: 'prophet-ibrahim',
      title: 'سيدنا إبراهيم البطل',
      description: 'قصة شجاعة سيدنا إبراهيم وحبه الكبير لربنا',
      emoji: '⭐',
      illustration: '🔥',
      content: [
        'سيدنا إبراهيم كان بطل شجاع! 💪',
        'كان بيحب ربنا كتير وبيطيعه.',
        'حتى لما الناس وضعوه في النار، ربنا حماه.',
        'النار بقيت برد وسلام عليه! 😊',
        'هو أبو الأنبياء الكتير.'
      ],
      keywords: ['إبراهيم', 'شجاع', 'حب', 'ربنا', 'نار']
    }
  ],
  values: [
    {
      id: 'honesty',
      title: 'الصدق صفة جميلة',
      description: 'تعلم أهمية الصدق وكيف نجعلها عادة يومية',
      emoji: '💎',
      illustration: '✨',
      content: [
        'الصدق معناه تقول الحقيقة دائماً! 😊',
        'لما تكون صادق، الناس تثق فيك وتحبك.',
        'الصدق يخليك بطل وواثق من نفسك.',
        'حتى لو كان صعب، الصدق دائماً أحلى.',
        'الرسول صلى الله عليه وسلم قال الصدق منجاة.'
      ],
      keywords: ['صدق', 'حقيقة', 'ثقة', 'بطل', 'منجاة']
    }
  ],
  questions: [
    {
      id: 'prayers',
      title: 'الصلوات الخمس',
      description: 'تعرف على الصلوات اليومية وأهميتها',
      emoji: '🕌',
      illustration: '🤲',
      content: [
        'في اليوم 5 صلوات! 🕌',
        'الفجر، الظهر، العصر، المغرب، والعشاء.',
        'الصلاة بتربطنا بربنا.',
        'بتحمينا وتخلي قلوبنا هادئة.',
        'كل صلاة لها وقت محدد.'
      ],
      keywords: ['صلاة', 'خمس', 'ربنا', 'حماية', 'وقت']
    }
  ],
  knowgod: [
    {
      id: 'god-creator',
      title: 'الله خلق كل شيء',
      description: 'تعرف على عظمة الخالق وفضله علينا',
      emoji: '🌟',
      illustration: '🌍',
      content: [
        'الله خلقنا وخلق كل حاجة! 🌟',
        'خلق السماء، الأرض، والشجر.',
        'خلقنا لنعيش سعداء.',
        'الله كريم ورحيم معانا كتير.',
        'نشكره على كل النعم.'
      ],
      keywords: ['الله', 'خلق', 'كريم', 'رحيم', 'نعمة']
    }
  ],
  muslim: [
    {
      id: 'being-muslim',
      title: 'أنا مسلم فخور',
      description: 'ما معنى أن تكون مسلماً وكيف تكون مسلماً صالحاً',
      emoji: '🕌',
      illustration: '💚',
      content: [
        'المسلم هو اللي بيصدق بربنا! 🕌',
        'بيحب دينه وبيتعلم منه.',
        'بيصلي وبيقرى القرآن.',
        'بيساعد الناس ويكون طيب.',
        'كل مسلم بطل في دينه.'
      ],
      keywords: ['مسلم', 'دين', 'صلاة', 'قرآن', 'مساعدة']
    }
  ]
};

const KidsArticle = () => {
  const navigate = useNavigate();
  const { categoryId, articleId } = useParams();
  const { t } = useTranslation();
  const { updateKidsProgress, kidsProgress, language } = useApp();
  const [selectedActivityOption, setSelectedActivityOption] = useState<string | null>(null);
  
  // Combine all article content for audio
  const fullArticleText = article ? article.content.join(' ') : '';

  const category = categoryData[categoryId || 'prophets'];
  const articles = categoryArticles[categoryId || 'prophets'] || [];
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen theme-kids bg-kids-bg flex items-center justify-center">
        <p className="text-foreground font-tajawal">المقال غير موجود</p>
      </div>
    );
  }

  // Highlight keywords in content
  const highlightKeywords = (text: string, keywords: string[]) => {
    let highlightedText = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<span class="bg-kids-yellow/30 font-bold px-1 rounded">$1</span>'
      );
    });
    return highlightedText;
  };

  const handleAskBalegh = () => {
    navigate(`/kids/ask-balegh`);
  };


  const handleActivityOption = (option: string) => {
    setSelectedActivityOption(option);
    // Award star for participating
    updateKidsProgress({ stars: kidsProgress.stars + 1 });
  };

  return (
    <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-bg via-kids-green-light/10 to-kids-blue-light/10 pb-32">
      <PersistentLanguageToggle />
      {/* Back Button */}
      <button 
        onClick={() => navigate(`/kids/category/${categoryId}`)}
        className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <ChevronRight className="w-6 h-6 text-kids-green" />
      </button>

      {/* Friendly Illustration */}
      <div className={`bg-gradient-to-br ${category.color} p-8 pt-16 rounded-b-[3rem] relative overflow-hidden`}>
        <div className="absolute top-4 left-4 text-6xl opacity-20 animate-bounce">📖</div>
        <div className="absolute bottom-4 right-4 text-5xl opacity-20 animate-pulse">✨</div>
        
        <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-4">
          <div className="text-9xl mb-4 float-animation">
            {article.illustration}
          </div>
        </div>
      </div>

      {/* Article Title */}
      <div className="px-6 mt-6 mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-4xl">{article.emoji}</span>
          <h1 className="text-3xl font-bold text-foreground font-amiri text-center">
            {article.title}
          </h1>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-kids-green via-kids-blue to-kids-yellow rounded-full mx-auto"></div>
      </div>

      {/* Article Content */}
      <div className="px-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-kids-green/20">
          {/* Audio Player */}
          <div className="flex justify-end mb-4">
            <AudioPlayer 
              text={fullArticleText} 
              language={language} 
              variant="kids"
            />
          </div>

          <div className="space-y-4">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg font-tajawal text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightKeywords(paragraph, article.keywords) }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-br from-kids-yellow/20 to-kids-coral/20 rounded-3xl p-6 shadow-xl border-2 border-kids-yellow/30">
          <h3 className="text-xl font-bold text-foreground font-amiri mb-4 text-center">
            {t('kids.article.activityQuestion')}
          </h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleActivityOption('help')}
              className={`w-full bg-white rounded-2xl p-4 text-right font-tajawal font-bold transition-all ${
                selectedActivityOption === 'help'
                  ? 'bg-gradient-to-r from-kids-green to-kids-blue text-white shadow-lg scale-105'
                  : 'text-foreground hover:bg-kids-green/10 hover:scale-[1.02]'
              }`}
            >
              {t('kids.article.activityOption1')}
            </button>
            <button
              onClick={() => handleActivityOption('ignore')}
              className={`w-full bg-white rounded-2xl p-4 text-right font-tajawal font-bold transition-all ${
                selectedActivityOption === 'ignore'
                  ? 'bg-gradient-to-r from-kids-green to-kids-blue text-white shadow-lg scale-105'
                  : 'text-foreground hover:bg-kids-green/10 hover:scale-[1.02]'
              }`}
            >
              {t('kids.article.activityOption2')}
            </button>
            <button
              onClick={() => handleActivityOption('laugh')}
              className={`w-full bg-white rounded-2xl p-4 text-right font-tajawal font-bold transition-all ${
                selectedActivityOption === 'laugh'
                  ? 'bg-gradient-to-r from-kids-green to-kids-blue text-white shadow-lg scale-105'
                  : 'text-foreground hover:bg-kids-green/10 hover:scale-[1.02]'
              }`}
            >
              {t('kids.article.activityOption3')}
            </button>
          </div>
        </div>
      </div>

      {/* Balagh Encouragement */}
      {selectedActivityOption && (
        <div className="px-6 mt-6">
          <div className="bg-gradient-to-br from-blue-400/20 to-kids-green/20 rounded-3xl p-6 shadow-xl border-2 border-blue-300/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
                <span className="text-4xl balegh-wave">🤖</span>
              </div>
              <p className="flex-1 text-lg font-tajawal text-foreground font-bold">
                {t('kids.article.encouragement')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ask Balegh CTA */}
      <div className="px-6 mt-6">
        <Button
          onClick={handleAskBalegh}
          className="w-full bg-gradient-to-br from-blue-400 via-cyan-400 to-kids-green hover:from-blue-500 hover:via-cyan-500 hover:to-kids-green text-white font-bold py-6 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white"
        >
          <span className="flex items-center justify-center gap-3 font-tajawal text-lg">
            <Bot className="w-6 h-6" />
            {t('kids.article.askBalegh')}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default KidsArticle;

