import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Bookmark, Share2, Gift, User, Clock, Star, Bot, Sun, Moon, BookOpen, Type, Plus, Minus, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useApp } from '@/contexts/AppContext';
import AudioPlayer from '@/components/AudioPlayer';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';

const AdultsArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const { adultsProfile, language } = useApp();
  const [isSaved, setIsSaved] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);
  const [readingMode, setReadingMode] = useState<'light' | 'dark' | 'sepia'>('light');
  const [fontSize, setFontSize] = useState(16);
  const [showSettings, setShowSettings] = useState(false);
  
  // Combine all article content for audio
  const fullArticleText = articleData.content.map(section => section.text).join(' ');

  const articleData = {
    title: 'أركان الإسلام الخمسة',
    author: 'الشيخ محمد',
    date: '15 رمضان 1445',
    readTime: '5 دقائق',
    rating: 4.8,
    summary: 'هذا المقال يشرح الأركان الخمسة الأساسية للإسلام التي تُبنى عليها عقيدة المسلم وعمله اليومي.',
    keyPoints: [
      'الشهادتان: المفتاح لدخول الإسلام',
      'الصلاة: عمود الدين وفرض يومي',
      'الزكاة: تطهير المال والنفس',
      'صوم رمضان: شهر البركة والعبادة',
      'الحج: لمن استطاع إليه سبيلا',
    ],
    relatedContent: [
      { id: '2', title: 'فضل الصلاة في وقتها', type: 'article' },
      { id: '3', title: 'آداب الدعاء وشروطه', type: 'article' },
      { id: '4', title: 'التوبة وشروطها', type: 'article' },
    ],
    content: [
      {
        heading: 'مقدمة',
        text: 'بُني الإسلام على خمسة أركان أساسية تمثل الأساس الذي يقوم عليه الدين الإسلامي. هذه الأركان هي الأعمدة التي يُبنى عليها إيمان المسلم وعمله.',
      },
      {
        heading: 'الركن الأول: الشهادتان',
        text: 'شهادة أن لا إله إلا الله وأن محمداً رسول الله. وهي المفتاح الذي يدخل به الإنسان في الإسلام، ولا يصح إسلام أي شخص إلا بالنطق بها مع الإيمان القلبي بمعناها.',
      },
      {
        heading: 'الركن الثاني: الصلاة',
        text: 'وهي خمس صلوات في اليوم والليلة: الفجر، والظهر، والعصر، والمغرب، والعشاء. وهي عمود الدين ومن تركها فقد كفر.',
      },
      {
        heading: 'الركن الثالث: الزكاة',
        text: 'وهي حق مالي واجب في أموال معينة، يُخرج لمستحقيه في أوقات محددة. وتُطهر المال وتُزكي النفس من البخل والشح.',
      },
      {
        heading: 'الركن الرابع: صوم رمضان',
        text: 'الإمساك عن الطعام والشراب وسائر المفطرات من طلوع الفجر إلى غروب الشمس في شهر رمضان المبارك.',
      },
      {
        heading: 'الركن الخامس: الحج',
        text: 'وهو زيارة بيت الله الحرام لأداء مناسك مخصوصة في وقت مخصوص، وهو واجب على المستطيع مرة واحدة في العمر.',
      },
    ],
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'تم إزالة الحفظ' : 'تم الحفظ في مكتبتك', {
      description: isSaved ? 'تم إزالة المقال من المحفوظات' : 'يمكنك الوصول إليه من ملفك الشخصي',
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: articleData.title,
        text: articleData.content[0].text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('تم نسخ الرابط', {
        description: 'يمكنك مشاركته الآن',
      });
    }
  };

  const handleRecommend = () => {
    setIsRecommended(!isRecommended);
    navigate('/adults/gift', { state: { articleId: id } });
  };

  const handleAskBalagh = () => {
    navigate('/adults/chat', { state: { question: `أخبرني عن: ${articleData.title}` } });
  };

  return (
    <div className="min-h-screen theme-adults bg-adults-bg pb-32">
      <PersistentLanguageToggle />
      {/* Header */}
      <div className="bg-gradient-to-br from-adults-green to-adults-emerald p-6 pt-10 rounded-b-[2rem] islamic-pattern-gold relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="flex gap-2 absolute top-6 left-6">
          <div className="bg-white/10 rounded-full p-1">
            <AudioPlayer 
              text={fullArticleText} 
              language={language} 
              variant="adults"
              className="[&_button]:bg-transparent [&_button]:hover:bg-white/20 [&_button]:text-white [&_button]:border-white/20"
            />
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Type className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={handleSave}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isSaved ? 'bg-adults-gold' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'text-white' : 'text-white'}`} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={handleRecommend}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isRecommended ? 'bg-adults-gold' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Gift className={`w-5 h-5 ${isRecommended ? 'text-white' : 'text-white'}`} fill={isRecommended ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="text-center pt-8 pb-4">
          <h1 className="text-2xl font-bold text-white font-amiri mb-2">
            {articleData.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-white/70 text-sm flex-wrap">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {articleData.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {articleData.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-adults-gold fill-adults-gold" />
              {articleData.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Reading Settings */}
      {showSettings && (
        <div className="px-6 py-4 bg-white border-b border-border">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-tajawal text-muted-foreground">{t('adults.article.readingMode')}</span>
              <div className="flex gap-1 bg-adults-beige rounded-lg p-1">
                {(['light', 'sepia', 'dark'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setReadingMode(mode)}
                    className={`px-3 py-1 rounded-md text-xs font-tajawal transition-colors ${
                      readingMode === mode
                        ? 'bg-adults-green text-white'
                        : 'text-muted-foreground hover:bg-white'
                    }`}
                  >
                    {mode === 'light' ? <Sun className="w-4 h-4" /> : mode === 'dark' ? <Moon className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-tajawal text-muted-foreground">{t('adults.article.fontSize')}</span>
              <div className="flex items-center gap-2 bg-adults-beige rounded-lg px-2 py-1">
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="w-6 h-6 rounded flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-tajawal w-8 text-center">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="w-6 h-6 rounded flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini Summary / Key Points */}
      <div className="px-6 py-4">
        <div className="card-adults p-4 mb-4">
          <h3 className="font-bold text-foreground font-amiri mb-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-adults-gold" />
            {t('adults.article.summary')}
          </h3>
          <p className="text-sm text-muted-foreground font-tajawal leading-relaxed mb-3">
            {articleData.summary}
          </p>
          <div>
            <h4 className="text-xs font-bold text-foreground font-tajawal mb-2">{t('adults.article.keyPoints')}</h4>
            <ul className="space-y-1">
              {articleData.keyPoints.map((point, idx) => (
                <li key={idx} className="text-xs text-muted-foreground font-tajawal flex items-start gap-2">
                  <span className="text-adults-gold mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`px-6 py-8 ${
        readingMode === 'dark' ? 'bg-gray-900 text-white' :
        readingMode === 'sepia' ? 'bg-amber-50' : ''
      }`}>
        <article className="max-w-none" style={{ fontSize: `${fontSize}px` }}>
          {articleData.content.map((section, index) => (
            <div key={index} className="mb-8 last:mb-0">
              {section.heading && (
                <h2 className={`text-xl font-bold font-amiri mb-4 mt-8 first:mt-0 ${
                  readingMode === 'dark' ? 'text-white' : 'text-foreground'
                }`}>
                  {section.heading}
                </h2>
              )}
              <p className={`leading-relaxed font-tajawal mb-6 ${
                readingMode === 'dark' ? 'text-gray-200' : 'text-foreground'
              }`}>
                {section.text}
              </p>
              {index < articleData.content.length - 1 && (
                <div className={`h-px bg-gradient-to-r from-transparent via-border to-transparent my-6 ${
                  readingMode === 'dark' ? 'via-gray-700' : ''
                }`} />
              )}
            </div>
          ))}
        </article>
      </div>

      {/* Related Content */}
      {articleData.relatedContent.length > 0 && (
        <div className="px-6 py-4">
          <h3 className="font-bold text-foreground font-amiri mb-4">{t('adults.article.relatedContent')}</h3>
          <div className="space-y-3">
            {articleData.relatedContent.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/adults/article/${item.id}`)}
                className="w-full card-adults p-4 flex items-center gap-3 hover:border-adults-gold/50 transition-colors"
              >
                <div className="w-12 h-12 bg-adults-beige rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-adults-green" />
                </div>
                <div className="flex-1 text-right">
                  <p className="font-bold text-foreground text-sm font-tajawal">{item.title}</p>
                  <p className="text-xs text-muted-foreground font-tajawal">{t(`adults.profile.${item.type}`)}</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-adults-bg via-adults-bg/95 to-transparent max-w-md mx-auto space-y-3">
        <Button
          onClick={handleAskBalagh}
          className="w-full btn-adults bg-adults-green hover:bg-adults-emerald text-white font-bold py-6 text-lg rounded-2xl shadow-lg"
        >
          <Bot className="w-5 h-5 ml-2" />
          {t('adults.askBalaghAbout')}
        </Button>
        
        <Button
          onClick={handleRecommend}
          variant="outline"
          className="w-full btn-adults border-2 border-adults-gold text-adults-green hover:bg-adults-gold/10 font-bold py-4 text-base rounded-2xl"
        >
          <Gift className="w-5 h-5 ml-2" />
          {t('adults.recommendAsGift')}
        </Button>
      </div>
    </div>
  );
};

export default AdultsArticle;
