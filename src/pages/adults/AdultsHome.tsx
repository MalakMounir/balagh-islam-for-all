import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, MessageSquare, Gift, User } from 'lucide-react';
import AdultsNavbar from '@/components/adults/AdultsNavbar';

const categories = [
  { 
    id: 'quran', 
    title: 'القرآن الكريم', 
    subtitle: 'ترجمة • تفسير • المعاني',
    icon: '📖',
    color: 'from-adults-green to-adults-emerald'
  },
  { 
    id: 'hadith', 
    title: 'الأحاديث النبوية', 
    subtitle: 'ابحث عن الأحاديث الصحيحة',
    icon: '📜',
    color: 'from-adults-emerald to-adults-teal'
  },
  { 
    id: 'newmuslim', 
    title: 'بيان الإسلام', 
    subtitle: 'للمسلمين الجدد',
    icon: '🌙',
    color: 'from-adults-teal to-adults-green'
  },
  { 
    id: 'library', 
    title: 'جامع المحتوى الإسلامي', 
    subtitle: 'سنة • عقيدة • فقه • أخلاق',
    icon: '📚',
    color: 'from-adults-gold to-amber-600'
  },
];

const AdultsHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen theme-adults bg-adults-bg pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-adults-green via-adults-emerald to-adults-teal p-6 pt-10 rounded-b-[2.5rem] islamic-pattern-gold">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white font-amiri">
              السلام عليكم
            </h1>
            <p className="text-white/70 text-sm font-tajawal">
              أهلاً بك في بلاغ
            </p>
          </div>
          <button
            onClick={() => navigate('/adults/profile')}
            className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-adults-gold/30"
          >
            <User className="w-6 h-6 text-adults-gold" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="ابحث عن آية، حديث، أو موضوع..."
            className="w-full bg-white rounded-2xl py-4 pr-12 pl-4 text-foreground placeholder:text-muted-foreground font-tajawal focus:outline-none focus:ring-2 focus:ring-adults-gold"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/adults/chat')}
            className="flex-1 card-adults p-4 flex items-center gap-3 hover:border-adults-gold/50 transition-colors"
          >
            <div className="w-12 h-12 bg-adults-gold/10 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-adults-gold" />
            </div>
            <div className="text-right">
              <p className="font-bold text-foreground font-tajawal">اسأل بليغ</p>
              <p className="text-xs text-muted-foreground font-tajawal">مساعدك الذكي</p>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/adults/gift')}
            className="flex-1 card-adults p-4 flex items-center gap-3 hover:border-adults-gold/50 transition-colors"
          >
            <div className="w-12 h-12 bg-adults-green/10 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-adults-green" />
            </div>
            <div className="text-right">
              <p className="font-bold text-foreground font-tajawal">أهدِ كتاباً</p>
              <p className="text-xs text-muted-foreground font-tajawal">شارك المعرفة</p>
            </div>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mt-8">
        <h2 className="text-xl font-bold text-foreground mb-4 font-amiri">
          استكشف المحتوى
        </h2>
        
        <div className="space-y-4">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/adults/category/${cat.id}`)}
              className="w-full card-adults p-5 flex items-center gap-4 slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{cat.icon}</span>
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-foreground text-lg font-amiri">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground font-tajawal">
                  {cat.subtitle}
                </p>
              </div>
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center group-hover:bg-adults-gold/20 transition-colors">
                <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-adults-gold" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <AdultsNavbar />
    </div>
  );
};

export default AdultsHome;
