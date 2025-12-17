import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, BookOpen, Clock, Star } from 'lucide-react';
import AdultsNavbar from '@/components/adults/AdultsNavbar';

const categoryData: Record<string, { title: string; subtitle: string; icon: string }> = {
  quran: { title: 'القرآن الكريم', subtitle: 'ترجمة • تفسير • المعاني', icon: '📖' },
  hadith: { title: 'الأحاديث النبوية', subtitle: 'صحيح البخاري ومسلم', icon: '📜' },
  newmuslim: { title: 'بيان الإسلام', subtitle: 'للمسلمين الجدد', icon: '🌙' },
  library: { title: 'جامع المحتوى الإسلامي', subtitle: 'مكتبة شاملة', icon: '📚' },
};

const articles = [
  { id: '1', title: 'أركان الإسلام الخمسة', author: 'الشيخ محمد', readTime: '5 دقائق', rating: 4.8 },
  { id: '2', title: 'فضل الصلاة في وقتها', author: 'د. أحمد العلي', readTime: '8 دقائق', rating: 4.9 },
  { id: '3', title: 'آداب الدعاء وشروطه', author: 'الشيخ عبدالله', readTime: '6 دقائق', rating: 4.7 },
  { id: '4', title: 'التوبة وشروطها', author: 'د. سعيد الغامدي', readTime: '10 دقائق', rating: 4.6 },
  { id: '5', title: 'فضائل قراءة القرآن', author: 'الشيخ ياسر', readTime: '7 دقائق', rating: 4.9 },
];

const AdultsCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const category = categoryData[id || 'quran'];

  return (
    <div className="min-h-screen theme-adults bg-adults-bg pb-24">
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

      {/* Subcategories for library */}
      {id === 'library' && (
        <div className="px-6 mt-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['سنة', 'عقيدة', 'فقه', 'الأخلاق', 'فضائل الأعمال', 'الكبائر'].map((tag) => (
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

      {/* Articles List */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-foreground mb-4 font-amiri">
          المقالات والكتب
        </h2>

        <div className="space-y-4">
          {articles.map((article, index) => (
            <button
              key={article.id}
              onClick={() => navigate(`/adults/article/${article.id}`)}
              className="w-full card-adults p-4 flex gap-4 slide-up text-right"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-16 h-20 bg-gradient-to-br from-adults-beige to-adults-gold/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-adults-green" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-foreground font-amiri mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground font-tajawal mb-2">
                  {article.author}
                </p>
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
              </div>
            </button>
          ))}
        </div>
      </div>

      <AdultsNavbar />
    </div>
  );
};

export default AdultsCategory;
