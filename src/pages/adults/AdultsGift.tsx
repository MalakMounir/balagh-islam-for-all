import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Gift, BookOpen, User, Send, Check, MessageSquare, Calendar, Users, Heart, UserPlus, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useApp } from '@/contexts/AppContext';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';

const books = [
  { id: '1', title: 'أركان الإسلام الخمسة', author: 'الشيخ محمد', snippet: 'شرح شامل لأركان الإسلام الخمسة وأهميتها في حياة المسلم', cover: '📖' },
  { id: '2', title: 'فضل الصلاة في وقتها', author: 'د. أحمد العلي', snippet: 'بيان فضل المحافظة على الصلاة في أوقاتها المحددة', cover: '🕌' },
  { id: '3', title: 'آداب الدعاء وشروطه', author: 'الشيخ عبدالله', snippet: 'تعلم آداب الدعاء الصحيحة وشروط إجابة الدعاء', cover: '🤲' },
];

const suggestedRecipients = {
  family: [
    { id: '1', name: 'أحمد محمد', avatar: '👨', relation: 'أخ', type: 'family' as const },
    { id: '2', name: 'فاطمة علي', avatar: '👩', relation: 'أخت', type: 'family' as const },
  ],
  friends: [
    { id: '3', name: 'عمر خالد', avatar: '👨‍🦱', relation: 'صديق', type: 'friend' as const },
    { id: '4', name: 'سارة أحمد', avatar: '👩‍🦰', relation: 'صديقة', type: 'friend' as const },
  ],
  contacts: [
    { id: '5', name: 'محمد حسن', avatar: '👨‍💼', relation: 'معارف', type: 'contact' as const },
  ],
};

const AdultsGift = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { adultsProfile } = useApp();
  const [step, setStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState<string | null>(location.state?.articleId || null);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [isSent, setIsSent] = useState(false);
  const [recipientCategory, setRecipientCategory] = useState<'all' | 'family' | 'friends' | 'contacts'>('all');

  const handleSend = () => {
    setIsSent(true);
    // In a real app, this would update the context/backend
    toast.success(t('adults.gift.sent'), {
      description: t('adults.gift.sentDesc'),
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
            {t('adults.gift.success')} 🎁
          </h1>
          <p className="text-muted-foreground font-tajawal mb-8">
            {t('adults.gift.successDesc')}
          </p>
          <Button
            onClick={() => navigate('/adults')}
            className="btn-adults bg-adults-green text-white px-8"
          >
            {t('adults.gift.backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-adults bg-adults-bg">
      <PersistentLanguageToggle />
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
            {t('adults.gift.title')}
          </h1>
          <p className="text-white/70 text-sm font-tajawal mt-1">
            {t('adults.gift.subtitle')}
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
              {t('adults.gift.selectContent')}
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
                  <div className="w-16 h-20 bg-gradient-to-br from-adults-beige to-adults-gold/20 rounded-lg flex items-center justify-center text-3xl">
                    {book.cover}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-bold text-foreground font-amiri mb-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground font-tajawal mb-1">{book.author}</p>
                    <p className="text-xs text-muted-foreground font-tajawal">{book.snippet}</p>
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
              {t('adults.gift.selectRecipient')}
            </h2>
            
            {/* Recipient Categories */}
            <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
              {(['all', 'family', 'friends', 'contacts'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setRecipientCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-tajawal whitespace-nowrap transition-colors ${
                    recipientCategory === cat
                      ? 'bg-adults-gold text-white'
                      : 'bg-adults-beige text-foreground hover:bg-adults-gold/20'
                  }`}
                >
                  {cat === 'all' ? t('adults.gift.all') :
                   cat === 'family' ? '👨‍👩‍👧 ' + t('adults.gift.family') :
                   cat === 'friends' ? '👥 ' + t('adults.gift.friends') :
                   '📇 ' + t('adults.gift.contacts')}
                </button>
              ))}
            </div>
            
            <div className="space-y-3">
              {(recipientCategory === 'all'
                ? [...suggestedRecipients.family, ...suggestedRecipients.friends, ...suggestedRecipients.contacts]
                : recipientCategory === 'family'
                ? suggestedRecipients.family
                : recipientCategory === 'friends'
                ? suggestedRecipients.friends
                : suggestedRecipients.contacts
              ).map((r) => (
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
                    <p className="text-xs text-muted-foreground font-tajawal">{r.relation}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="slide-up">
            {/* Gift Preview */}
            {selectedBook && (
              <div className="card-adults p-4 mb-4">
                <h3 className="text-sm font-bold text-foreground font-tajawal mb-3">{t('adults.gift.preview')}</h3>
                <div className="flex gap-3">
                  <div className="w-16 h-20 bg-gradient-to-br from-adults-beige to-adults-gold/20 rounded-lg flex items-center justify-center text-3xl">
                    {books.find(b => b.id === selectedBook)?.cover}
                  </div>
                  <div className="flex-1 text-right">
                    <h4 className="font-bold text-foreground font-amiri text-sm">
                      {books.find(b => b.id === selectedBook)?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-tajawal">
                      {books.find(b => b.id === selectedBook)?.author}
                    </p>
                    <p className="text-xs text-muted-foreground font-tajawal mt-1 line-clamp-2">
                      {books.find(b => b.id === selectedBook)?.snippet}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <h2 className="text-lg font-bold text-foreground mb-4 font-amiri flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-adults-gold" />
              {t('adults.gift.addMessage')}
            </h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('adults.gift.messagePlaceholder')}
              className="w-full bg-white rounded-2xl p-4 h-32 text-foreground font-tajawal focus:outline-none focus:ring-2 focus:ring-adults-gold resize-none mb-4"
            />
            
            {/* Scheduled Delivery (Optional) */}
            <div className="card-adults p-4 mb-4">
              <label className="flex items-center gap-2 text-sm font-tajawal text-foreground mb-2">
                <Calendar className="w-4 h-4 text-adults-gold" />
                {t('adults.gift.scheduleDelivery')} ({t('adults.gift.optional')})
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-white rounded-xl p-3 text-foreground font-tajawal focus:outline-none focus:ring-2 focus:ring-adults-gold"
              />
            </div>
            
            <Button
              onClick={handleSend}
              className="w-full btn-adults bg-adults-gold hover:bg-adults-gold-light text-adults-green font-bold py-6 text-lg rounded-2xl shadow-gold"
            >
              <Send className="w-5 h-5 ml-2" />
              {t('adults.gift.send')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdultsGift;
