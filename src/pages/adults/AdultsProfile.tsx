import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { ChevronRight, Bookmark, Gift, Globe, LogOut, ChevronLeft, Settings } from 'lucide-react';
import AdultsNavbar from '@/components/adults/AdultsNavbar';

const savedContent = [
  { id: '1', title: 'أركان الإسلام الخمسة', type: 'مقال' },
  { id: '2', title: 'فضل قراءة القرآن', type: 'كتاب' },
  { id: '3', title: 'آداب الدعاء', type: 'مقال' },
];

const AdultsProfile = () => {
  const navigate = useNavigate();
  const { adultsProfile, setExperience } = useApp();

  const handleSwitchExperience = () => {
    setExperience(null);
    navigate('/select-experience');
  };

  return (
    <div className="min-h-screen theme-adults bg-adults-bg pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-adults-green via-adults-emerald to-adults-teal p-6 pt-10 rounded-b-[2.5rem] islamic-pattern-gold text-center relative">
        <button 
          onClick={() => navigate('/adults')}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Avatar */}
        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-adults-gold/30">
          <span className="text-4xl">👤</span>
        </div>

        <h1 className="text-xl font-bold text-white font-amiri mb-1">
          عبدالله محمد
        </h1>
        <p className="text-white/70 text-sm font-tajawal">
          عضو منذ رمضان ١٤٤٥
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 mt-6">
        <div className="card-adults p-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-adults-beige rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Gift className="w-5 h-5 text-adults-gold" />
                <span className="text-2xl font-bold text-foreground">{adultsProfile.giftsSent}</span>
              </div>
              <p className="text-sm text-muted-foreground font-tajawal">هدايا مُرسلة</p>
            </div>
            
            <div className="bg-adults-beige rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Bookmark className="w-5 h-5 text-adults-green" />
                <span className="text-2xl font-bold text-foreground">{savedContent.length}</span>
              </div>
              <p className="text-sm text-muted-foreground font-tajawal">محفوظات</p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Content */}
      <div className="px-6 mt-6">
        <div className="card-adults p-6">
          <h2 className="font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-adults-gold" />
            المحفوظات
          </h2>
          
          <div className="space-y-3">
            {savedContent.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/adults/article/${item.id}`)}
                className="w-full flex items-center gap-3 p-3 bg-adults-beige rounded-xl hover:bg-adults-gold/10 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  📄
                </div>
                <div className="flex-1 text-right">
                  <p className="font-bold text-foreground text-sm font-tajawal">{item.title}</p>
                  <p className="text-xs text-muted-foreground font-tajawal">{item.type}</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-6 mt-6 space-y-3">
        <button className="w-full card-adults p-4 flex items-center gap-4 hover:border-adults-gold/50 transition-colors">
          <Globe className="w-6 h-6 text-muted-foreground" />
          <span className="font-tajawal text-foreground flex-1 text-right">اللغة</span>
          <span className="text-sm text-muted-foreground font-tajawal">العربية</span>
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <button className="w-full card-adults p-4 flex items-center gap-4 hover:border-adults-gold/50 transition-colors">
          <Settings className="w-6 h-6 text-muted-foreground" />
          <span className="font-tajawal text-foreground flex-1 text-right">الإعدادات</span>
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <button 
          onClick={handleSwitchExperience}
          className="w-full card-adults p-4 flex items-center gap-4 hover:border-destructive/50 transition-colors"
        >
          <LogOut className="w-6 h-6 text-destructive" />
          <span className="font-tajawal text-destructive flex-1 text-right">تغيير التجربة</span>
          <ChevronLeft className="w-5 h-5 text-destructive" />
        </button>
      </div>

      <AdultsNavbar />
    </div>
  );
};

export default AdultsProfile;
