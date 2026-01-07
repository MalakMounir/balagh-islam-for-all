import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, BookOpen, Clock, Star, Search, Book, FileText, Volume2, Bookmark, Share2, Gift, Filter, ArrowUpDown, Check } from 'lucide-react';
import AdultsNavbar from '@/components/adults/AdultsNavbar';
import { Badge } from '@/components/ui/badge';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';
import AudioPlayer from '@/components/AudioPlayer';
import { useApp } from '@/contexts/AppContext';

const categoryData: Record<string, { title: string; subtitle: string; icon: string }> = {
  quran: { title: 'القرآن الكريم', subtitle: 'ترجمة • تفسير • المعاني', icon: '📖' },
  hadith: { title: 'الأحاديث النبوية', subtitle: 'ابحث عن الأحاديث الصحيحة', icon: '📜' },
  newmuslim: { title: 'بيان الإسلام للمسلمين الجدد', subtitle: 'كتب • تعلم الدين • ضيوف الرحمن • السيرة النبوية', icon: '🌙' },
  library: { title: 'جامع المحتوى الإسلامي', subtitle: 'سنة • عقيدة • فقه • أخلاق', icon: '📚' },
};

const hadiths = [
  { id: 'h1', text: 'عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت"', source: 'صحيح البخاري', topic: 'الأخلاق' },
  { id: 'h2', text: 'عن أنس بن مالك رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه"', source: 'صحيح البخاري', topic: 'الأخوة' },
  { id: 'h3', text: 'عن أبي هريرة رضي الله عنه أن رسول الله صلى الله عليه وسلم قال: "المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف"', source: 'صحيح مسلم', topic: 'القوة' },
];

const articles = [
  { id: '1', title: 'أركان الإسلام الخمسة', author: 'الشيخ محمد', readTime: '5 دقائق', rating: 4.8, summary: 'شرح شامل لأركان الإسلام الخمسة وأهميتها في حياة المسلم', type: 'article', level: 'beginner', saved: true, recommended: true, hasAudio: true },
  { id: '2', title: 'فضل الصلاة في وقتها', author: 'د. أحمد العلي', readTime: '8 دقائق', rating: 4.9, summary: 'بيان فضل المحافظة على الصلاة في أوقاتها المحددة', type: 'article', level: 'intermediate', saved: false, recommended: true, hasAudio: true },
  { id: '3', title: 'آداب الدعاء وشروطه', author: 'الشيخ عبدالله', readTime: '6 دقائق', rating: 4.7, summary: 'تعلم آداب الدعاء الصحيحة وشروط إجابة الدعاء', type: 'article', level: 'beginner', saved: false, recommended: false, hasAudio: false },
  { id: '4', title: 'التوبة وشروطها', author: 'د. سعيد الغامدي', readTime: '10 دقائق', rating: 4.6, summary: 'شرح شروط التوبة الصحيحة وكيفية التوبة النصوح', type: 'article', level: 'advanced', saved: true, recommended: false, hasAudio: true },
  { id: '5', title: 'فضائل قراءة القرآن', author: 'الشيخ ياسر', readTime: '7 دقائق', rating: 4.9, summary: 'بيان فضل قراءة القرآن الكريم وتدبره', type: 'article', level: 'intermediate', saved: false, recommended: true, hasAudio: true },
];

const newMuslimContent = [
  { id: 'nm1', title: 'دليل المسلم الجديد', author: 'دار الإسلام', type: 'book', summary: 'دليل شامل للمسلمين الجدد لفهم أساسيات الإسلام' },
  { id: 'nm2', title: 'ضيوف الرحمن', author: 'الشيخ عبدالله', type: 'book', summary: 'كتاب خاص للمسلمين الجدد يشرح الإسلام بطريقة مبسطة' },
  { id: 'nm3', title: 'السيرة النبوية للمبتدئين', author: 'د. محمد', type: 'book', summary: 'سيرة النبي صلى الله عليه وسلم بطريقة سهلة ومبسطة' },
  { id: 'nm4', title: 'تعلم الدين خطوة بخطوة', author: 'مؤسسة التعليم', type: 'article', summary: 'مقال شامل لتعلم الدين الإسلامي للمبتدئين' },
];

const AdultsCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const { language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'newest'>('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const category = categoryData[id || 'quran'];
  const isHadith = id === 'hadith';
  const isNewMuslim = id === 'newmuslim';
  const isLibrary = id === 'library';

  const filteredHadiths = hadiths.filter(h => 
    h.text.includes(searchQuery) || h.topic.includes(searchQuery) || h.source.includes(searchQuery)
  );

  const filteredArticles = articles
    .filter(a => {
      const matchesSearch = a.title.includes(searchQuery) || a.author.includes(searchQuery) || a.summary.includes(searchQuery);
      const matchesType = !filterType || a.type === filterType;
      const matchesLevel = !filterLevel || a.level === filterLevel;
      return matchesSearch && matchesType && matchesLevel;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return parseInt(a.readTime) - parseInt(b.readTime);
      return 0; // newest would be handled by date in real app
    });

  const filteredNewMuslim = newMuslimContent.filter(item =>
    item.title.includes(searchQuery) || item.author.includes(searchQuery) || item.summary.includes(searchQuery)
  );

  return (
    <div className="min-h-screen theme-adults bg-adults-bg pb-24">
      <PersistentLanguageToggle />
      {/* Header */}
      <div className="bg-gradient-to-br from-adults-green via-adults-emerald to-adults-teal p-6 pt-10 rounded-b-[2.5rem] islamic-pattern-gold relative">
        <button 
          onClick={() => navigate('/adults')}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="text-center pt-6">
          <span className="text-5xl mb-4 block">{category.icon}</span>
          <h1 className="text-2xl font-bold text-white font-amiri mb-1">
            {category.title}
          </h1>
          <p className="text-white/70 text-sm font-tajawal">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Search Bar for Hadith */}
      {isHadith && (
        <div className="px-6 mt-6">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن حديث..."
              className="w-full bg-white rounded-2xl py-4 pr-12 pl-4 text-foreground placeholder:text-muted-foreground font-tajawal focus:outline-none focus:ring-2 focus:ring-adults-gold"
            />
          </div>
        </div>
      )}

      {/* Filters and Sort */}
      {!isHadith && (
        <div className="px-6 mt-6">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-tajawal text-foreground hover:bg-adults-beige transition-colors"
            >
              <Filter className="w-4 h-4" />
              {t('adults.category.filters')}
            </button>
            <button
              onClick={() => {
                const options: ('rating' | 'time' | 'newest')[] = ['rating', 'time', 'newest'];
                const currentIndex = options.indexOf(sortBy);
                setSortBy(options[(currentIndex + 1) % options.length]);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-tajawal text-foreground hover:bg-adults-beige transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
              {t('adults.category.sort')}
            </button>
          </div>
          
          {showFilters && (
            <div className="card-adults p-4 mb-4 slide-up">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-tajawal text-muted-foreground mb-2">{t('adults.category.filterByType')}</p>
                  <div className="flex gap-2 flex-wrap">
                    {['article', 'book'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(filterType === type ? null : type)}
                        className={`px-3 py-1 rounded-full text-xs font-tajawal transition-colors ${
                          filterType === type
                            ? 'bg-adults-gold text-white'
                            : 'bg-adults-beige text-foreground hover:bg-adults-gold/20'
                        }`}
                      >
                        {type === 'article' ? t('adults.category.article') : t('adults.category.book')}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-tajawal text-muted-foreground mb-2">{t('adults.category.filterByLevel')}</p>
                  <div className="flex gap-2 flex-wrap">
                    {['beginner', 'intermediate', 'advanced'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFilterLevel(filterLevel === level ? null : level)}
                        className={`px-3 py-1 rounded-full text-xs font-tajawal transition-colors ${
                          filterLevel === level
                            ? 'bg-adults-green text-white'
                            : 'bg-adults-beige text-foreground hover:bg-adults-green/20'
                        }`}
                      >
                        {t(`adults.category.${level}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subcategories for library */}
      {isLibrary && (
        <div className="px-6 mt-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['سنة', 'عقيدة', 'فقه', 'الأخلاق', 'فضائل الأعمال', 'الكبائر', 'مقالات'].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-adults-beige rounded-full text-sm font-tajawal text-adults-green whitespace-nowrap hover:bg-adults-gold/20 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mini Articles Section - Displayed First */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
          <FileText className="w-5 h-5 text-adults-gold" />
          {t('adults.category.miniArticles')}
        </h2>
        
        <div className="space-y-3 mb-6">
          {(isHadith ? [] : isNewMuslim ? [] : articles.slice(0, 5)).map((article, index) => (
            <button
              key={article.id}
              onClick={() => navigate(`/adults/article/${article.id}`)}
              className="w-full card-adults p-4 slide-up hover:border-adults-gold/50 transition-all text-right group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-adults-beige to-adults-gold/20 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-adults-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground font-amiri mb-1 group-hover:text-adults-green transition-colors line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-tajawal mb-2 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-adults-gold fill-adults-gold" />
                        {article.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {article.hasAudio && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingAudio(playingAudio === article.id ? null : article.id);
                          }}
                          className="w-8 h-8 rounded-full bg-adults-green/10 flex items-center justify-center hover:bg-adults-green/20 transition-colors"
                        >
                          <Volume2 className={`w-4 h-4 ${playingAudio === article.id ? 'text-adults-green' : 'text-muted-foreground'}`} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-foreground mb-4 font-amiri">
          {isHadith ? 'الأحاديث النبوية' : isNewMuslim ? 'الكتب والمقالات' : 'المزيد من المحتوى'}
        </h2>

        <div className="space-y-4">
          {/* Hadiths */}
          {isHadith && filteredHadiths.map((hadith, index) => (
            <button
              key={hadith.id}
              onClick={() => navigate(`/adults/article/${hadith.id}`)}
              className="w-full card-adults p-4 slide-up text-right"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-adults-green/10 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-adults-green" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-tajawal leading-relaxed mb-2">
                    {hadith.text}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{hadith.source}</span>
                    <span>•</span>
                    <span>{hadith.topic}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* New Muslim Content */}
          {isNewMuslim && filteredNewMuslim.map((item, index) => (
            <button
              key={item.id}
              onClick={() => navigate(`/adults/article/${item.id}`)}
              className="w-full card-adults p-4 flex gap-4 slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-16 h-20 bg-gradient-to-br from-adults-beige to-adults-gold/20 rounded-xl flex items-center justify-center">
                {item.type === 'book' ? (
                  <Book className="w-8 h-8 text-adults-green" />
                ) : (
                  <FileText className="w-8 h-8 text-adults-green" />
                )}
              </div>
              
              <div className="flex-1 text-right">
                <h3 className="font-bold text-foreground font-amiri mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-tajawal mb-2">
                  {item.author}
                </p>
                <p className="text-xs text-muted-foreground font-tajawal leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </button>
          ))}

          {/* Regular Articles */}
          {!isHadith && !isNewMuslim && filteredArticles.map((article, index) => (
            <div
              key={article.id}
              className="w-full card-adults p-4 slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex gap-4">
                <div className="w-16 h-20 bg-gradient-to-br from-adults-beige to-adults-gold/20 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-8 h-8 text-adults-green" />
                </div>
                
                <div className="flex-1 text-right">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 
                      onClick={() => navigate(`/adults/article/${article.id}`)}
                      className="font-bold text-foreground font-amiri cursor-pointer hover:text-adults-green transition-colors"
                    >
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      {article.saved && (
                        <Badge variant="outline" className="text-xs bg-adults-gold/10 text-adults-gold border-adults-gold/30">
                          <Bookmark className="w-3 h-3 ml-1" />
                          {t('adults.category.saved')}
                        </Badge>
                      )}
                      {article.recommended && (
                        <Badge variant="outline" className="text-xs bg-adults-green/10 text-adults-green border-adults-green/30">
                          <Star className="w-3 h-3 ml-1 fill-adults-green" />
                          {t('adults.category.recommended')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-tajawal mb-2">
                    {article.author}
                  </p>
                  <p className="text-xs text-muted-foreground font-tajawal mb-2 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-adults-gold fill-adults-gold" />
                        {article.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {article.hasAudio && (
                        <AudioPlayer
                          text={`${article.title}. ${article.summary}`}
                          language={language}
                          variant="adults"
                          className="[&_button]:w-8 [&_button]:h-8 [&_button]:rounded-full [&_button]:bg-adults-green/10 [&_button]:hover:bg-adults-green/20"
                        />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle save
                        }}
                        className="w-8 h-8 rounded-full bg-adults-gold/10 flex items-center justify-center hover:bg-adults-gold/20 transition-colors"
                      >
                        <Bookmark className={`w-4 h-4 ${article.saved ? 'text-adults-gold fill-adults-gold' : 'text-muted-foreground'}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle share
                        }}
                        className="w-8 h-8 rounded-full bg-adults-beige flex items-center justify-center hover:bg-adults-gold/20 transition-colors"
                      >
                        <Share2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/adults/gift', { state: { articleId: article.id } });
                        }}
                        className="w-8 h-8 rounded-full bg-adults-green/10 flex items-center justify-center hover:bg-adults-green/20 transition-colors"
                      >
                        <Gift className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdultsNavbar />
    </div>
  );
};

export default AdultsCategory;
