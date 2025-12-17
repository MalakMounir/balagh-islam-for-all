import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Bookmark, Share2, Gift, User, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdultsArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSave = () => {
    toast.success('تم الحفظ في مكتبتك', {
      description: 'يمكنك الوصول إليه من ملفك الشخصي',
    });
  };

  const handleShare = () => {
    toast.success('تم نسخ الرابط', {
      description: 'يمكنك مشاركته الآن',
    });
  };

  const handleGift = () => {
    navigate('/adults/gift');
  };

  return (
    <div className="min-h-screen theme-adults bg-adults-bg">
      {/* Header */}
      <div className="bg-gradient-to-br from-adults-green to-adults-emerald p-6 pt-10 rounded-b-[2rem] islamic-pattern-gold relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="flex gap-2 absolute top-6 left-6">
          <button 
            onClick={handleSave}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
          >
            <Bookmark className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="text-center pt-8 pb-4">
          <h1 className="text-2xl font-bold text-white font-amiri mb-2">
            أركان الإسلام الخمسة
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              الشيخ محمد
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              5 دقائق
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-adults-gold fill-adults-gold" />
              4.8
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <article className="prose prose-lg max-w-none">
          <p className="text-foreground leading-relaxed font-tajawal text-lg mb-6">
            بُني الإسلام على خمسة أركان أساسية تمثل الأساس الذي يقوم عليه الدين الإسلامي. هذه الأركان هي الأعمدة التي يُبنى عليها إيمان المسلم وعمله.
          </p>

          <h2 className="text-xl font-bold text-foreground font-amiri mb-4 mt-8">
            الركن الأول: الشهادتان
          </h2>
          <p className="text-foreground leading-relaxed font-tajawal mb-6">
            شهادة أن لا إله إلا الله وأن محمداً رسول الله. وهي المفتاح الذي يدخل به الإنسان في الإسلام، ولا يصح إسلام أي شخص إلا بالنطق بها مع الإيمان القلبي بمعناها.
          </p>

          <h2 className="text-xl font-bold text-foreground font-amiri mb-4 mt-8">
            الركن الثاني: الصلاة
          </h2>
          <p className="text-foreground leading-relaxed font-tajawal mb-6">
            وهي خمس صلوات في اليوم والليلة: الفجر، والظهر، والعصر، والمغرب، والعشاء. وهي عمود الدين ومن تركها فقد كفر.
          </p>

          <h2 className="text-xl font-bold text-foreground font-amiri mb-4 mt-8">
            الركن الثالث: الزكاة
          </h2>
          <p className="text-foreground leading-relaxed font-tajawal mb-6">
            وهي حق مالي واجب في أموال معينة، يُخرج لمستحقيه في أوقات محددة. وتُطهر المال وتُزكي النفس من البخل والشح.
          </p>

          <h2 className="text-xl font-bold text-foreground font-amiri mb-4 mt-8">
            الركن الرابع: صوم رمضان
          </h2>
          <p className="text-foreground leading-relaxed font-tajawal mb-6">
            الإمساك عن الطعام والشراب وسائر المفطرات من طلوع الفجر إلى غروب الشمس في شهر رمضان المبارك.
          </p>

          <h2 className="text-xl font-bold text-foreground font-amiri mb-4 mt-8">
            الركن الخامس: الحج
          </h2>
          <p className="text-foreground leading-relaxed font-tajawal">
            وهو زيارة بيت الله الحرام لأداء مناسك مخصوصة في وقت مخصوص، وهو واجب على المستطيع مرة واحدة في العمر.
          </p>
        </article>
      </div>

      {/* Gift CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-adults-bg via-adults-bg to-transparent max-w-md mx-auto">
        <Button
          onClick={handleGift}
          className="w-full btn-adults bg-adults-gold hover:bg-adults-gold-light text-adults-green font-bold py-6 text-lg rounded-2xl shadow-gold"
        >
          <Gift className="w-5 h-5 ml-2" />
          أهدِ هذا المقال
        </Button>
      </div>
    </div>
  );
};

export default AdultsArticle;
