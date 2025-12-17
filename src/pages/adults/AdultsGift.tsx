import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Gift, BookOpen, User, Send, Check, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const books = [
  { id: '1', title: 'أركان الإسلام الخمسة', author: 'الشيخ محمد' },
  { id: '2', title: 'فضل الصلاة في وقتها', author: 'د. أحمد العلي' },
  { id: '3', title: 'آداب الدعاء وشروطه', author: 'الشيخ عبدالله' },
];

const recipients = [
  { id: '1', name: 'أحمد محمد', avatar: '👨' },
  { id: '2', name: 'فاطمة علي', avatar: '👩' },
  { id: '3', name: 'عمر خالد', avatar: '👨‍🦱' },
];

const AdultsGift = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setIsSent(true);
    toast.success('تم إرسال الهدية بنجاح! 🎁', {
      description: 'سيتم إشعار المستلم بهديتك',
    });
  };

  if (isSent) {
    return (
      <div className="min-h-screen theme-adults bg-adults-bg flex flex-col items-center justify-center p-6">
        <div className="text-center celebrate">
          <div className="w-24 h-24 bg-adults-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-adults-green" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-amiri mb-2">
            تم إرسال الهدية! 🎁
          </h1>
          <p className="text-muted-foreground font-tajawal mb-8">
            جزاك الله خيراً على نشر العلم النافع
          </p>
          <Button
            onClick={() => navigate('/adults')}
            className="btn-adults bg-adults-green text-white px-8"
          >
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-adults bg-adults-bg">
      {/* Header */}
      <div className="bg-gradient-to-l from-adults-green to-adults-emerald p-6 pt-10 rounded-b-[2rem] islamic-pattern-gold relative">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/adults')}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="text-center pt-6">
          <div className="w-16 h-16 bg-adults-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-adults-green" />
          </div>
          <h1 className="text-2xl font-bold text-white font-amiri">
            أهدِ معرفة
          </h1>
          <p className="text-white/70 text-sm font-tajawal mt-1">
            شارك العلم النافع مع من تحب
          </p>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-8 bg-adults-gold' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {step === 1 && (
          <div className="slide-up">
            <h2 className="text-lg font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-adults-gold" />
              اختر كتاباً أو مقالاً
            </h2>
            <div className="space-y-3">
              {books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => {
                    setSelectedBook(book.id);
                    setStep(2);
                  }}
                  className={`w-full card-adults p-4 flex items-center gap-4 transition-all ${
                    selectedBook === book.id ? 'ring-2 ring-adults-gold' : ''
                  }`}
                >
                  <div className="w-12 h-14 bg-adults-beige rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-adults-green" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-bold text-foreground font-amiri">{book.title}</h3>
                    <p className="text-sm text-muted-foreground font-tajawal">{book.author}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="slide-up">
            <h2 className="text-lg font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
              <User className="w-5 h-5 text-adults-gold" />
              اختر المستلم
            </h2>
            <div className="space-y-3">
              {recipients.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRecipient(r.id);
                    setStep(3);
                  }}
                  className={`w-full card-adults p-4 flex items-center gap-4 transition-all ${
                    selectedRecipient === r.id ? 'ring-2 ring-adults-gold' : ''
                  }`}
                >
                  <div className="w-12 h-12 bg-adults-beige rounded-full flex items-center justify-center text-2xl">
                    {r.avatar}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-bold text-foreground font-tajawal">{r.name}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="slide-up">
            <h2 className="text-lg font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-adults-gold" />
              أضف رسالة (اختياري)
            </h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالة للمستلم..."
              className="w-full bg-white rounded-2xl p-4 h-32 text-foreground font-tajawal focus:outline-none focus:ring-2 focus:ring-adults-gold resize-none"
            />
            
            <Button
              onClick={handleSend}
              className="w-full mt-6 btn-adults bg-adults-gold hover:bg-adults-gold-light text-adults-green font-bold py-6 text-lg rounded-2xl shadow-gold"
            >
              <Send className="w-5 h-5 ml-2" />
              إرسال الهدية
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdultsGift;
