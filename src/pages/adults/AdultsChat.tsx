import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Send, Bot, User, Sparkles, Bookmark, Download, BookOpen, Heart, Scale, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  bookmarked?: boolean;
  category?: 'quran' | 'hadith' | 'ethics' | 'biography' | 'fiqh' | 'general';
}

// Language-aware AI response handler for adults
const getAdultAnswer = (question: string, language: string, t: any): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Avoid sensitive topics and religious rulings
  const sensitiveTermsAr = ['حكم', 'فتوى', 'جهاد', 'قتل', 'قتال', 'حرب'];
  const sensitiveTermsEn = ['ruling', 'fatwa', 'jihad', 'kill', 'fight', 'war', 'violence'];
  
  const isSensitive = language === 'ar'
    ? sensitiveTermsAr.some(term => lowerQuestion.includes(term))
    : sensitiveTermsEn.some(term => lowerQuestion.includes(term));

  if (isSensitive) {
    return language === 'ar'
      ? 'شكراً لسؤالك. أنا بليغ، وأركز على التعليم والتفاهم. أنصحك بالتواصل مع عالم دين موثوق للحصول على إجابات حول المواضيع الحساسة. يمكنني مساعدتك في التعلم عن القيم والتعليم الإسلامي بشكل عام 😊'
      : "Thank you for your question. I focus on education and understanding. For sensitive topics, I recommend consulting with a trusted religious scholar. I can help you learn about Islamic values and general education 😊";
  }

  // Arabic responses (educational, values-focused)
  if (language === 'ar') {
    const responses: Record<string, string> = {
      'أركان الإسلام': 'أركان الإسلام خمسة:\n\n١. الشهادتان: شهادة أن لا إله إلا الله وأن محمداً رسول الله\n٢. إقام الصلاة\n٣. إيتاء الزكاة\n٤. صوم رمضان\n٥. حج البيت لمن استطاع إليه سبيلا\n\nهذه الأركان تعلمنا القيم والالتزام في حياتنا اليومية 💙',
      'المحافظة على الصلاة': 'للمحافظة على الصلاة، يمكنك:\n\n• تخصيص وقت محدد للصلاة\n• فهم معنى الصلاة وروحانيتها\n• الصلاة في المسجد إن أمكن\n• الاستعداد للصلاة قبل الأذان\n• قراءة الكتب المفيدة عن الصلاة\n\nالصلاة تساعدنا على الهدوء والتواصل الروحي 😊',
      'فضل قراءة القرآن': 'قراءة القرآن لها فضل عظيم:\n\n• تساعدنا على فهم الإسلام بشكل أفضل\n• تمنحنا الهدوء والطمأنينة\n• تعلمنا القيم الأخلاقية الجميلة\n• تربطنا بثقافتنا وتاريخنا\n• تساعدنا في اتخاذ قرارات صحيحة\n\nأقترح عليك البدء بقراءة جزء صغير كل يوم 🌟',
      'كتاب للمبتدئين': 'للمبتدئين، أنصحك بكتب مثل:\n\n• "الرحيق المختوم" - سيرة النبي صلى الله عليه وسلم\n• "مختصر تفسير ابن كثير" - فهم القرآن\n• "الأربعون النووية" - أحاديث نبوية شريفة\n• "فقه السنة" - الفقه المبسط\n\nابدأ بشيء بسيط وتقدم تدريجياً 📚',
      default: 'شكراً لسؤالك! 😊 أنا بليغ، مساعدك التعليمي. أركز على مساعدتك في فهم الإسلام من خلال التعليم والقيم الأخلاقية. يمكنني مساعدتك في:\n\n• فهم القيم الإسلامية\n• التعلم عن التاريخ الإسلامي\n• قراءة الكتب والمقالات\n• فهم أساسيات الإسلام\n\nكيف يمكنني مساعدتك؟ 💙',
    };

    // Try to match question
    for (const [key, answer] of Object.entries(responses)) {
      if (lowerQuestion.includes(key.toLowerCase())) {
        return answer;
      }
    }
    return responses.default;
  }

  // English responses (educational, values-focused, inclusive)
  const responsesEn: Record<string, string> = {
    'pillars of islam': 'The five pillars of Islam are:\n\n1. Shahada: Belief in one God and that Muhammad is His messenger\n2. Salat: Daily prayers\n3. Zakat: Charity to those in need\n4. Sawm: Fasting during Ramadan\n5. Hajj: Pilgrimage to Mecca (if able)\n\nThese pillars teach us values and commitment in our daily lives 💙',
    'prayer': 'To maintain your prayers:\n\n• Set a specific time for prayers\n• Understand the meaning and spirituality of prayer\n• Pray in a mosque if possible\n• Prepare yourself before the call to prayer\n• Read helpful books about prayer\n\nPrayer helps us find peace and spiritual connection 😊',
    'quran': 'Reading the Quran has great benefits:\n\n• Helps us understand Islam better\n• Gives us peace and tranquility\n• Teaches us beautiful moral values\n• Connects us to our culture and history\n• Helps us make good decisions\n\nI suggest starting with reading a small portion each day 🌟',
    'book': 'For beginners, I recommend books like:\n\n• "The Sealed Nectar" - Biography of the Prophet\n• "Tafsir Ibn Kathir" (abridged) - Understanding the Quran\n• "Forty Hadith" - Prophetic sayings\n• "Fiqh as-Sunnah" - Simplified Islamic jurisprudence\n\nStart with something simple and progress gradually 📚',
    'learn': 'Great! I can help you learn about:\n\n• Islamic values and ethics\n• Islamic history and culture\n• Reading books and articles\n• Understanding the basics of Islam\n• Stories of prophets and important figures\n\nWhat would you like to learn about? 📖',
    default: "Thank you for your question! 😊 I'm Balegh, your educational assistant. I focus on helping you understand Islam through education and moral values. I can help you with:\n\n• Understanding Islamic values\n• Learning about Islamic history\n• Reading books and articles\n• Understanding the basics of Islam\n\nHow can I help you today? 💙",
  };

  // Try to match question
  for (const [key, answer] of Object.entries(responsesEn)) {
    if (lowerQuestion.includes(key)) {
      return answer;
    }
  }
  return responsesEn.default;
};

const AdultsChat = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Language-aware initial messages
  const initialMessages: Message[] = useMemo(() => [{
    id: 1,
    role: 'assistant',
    content: language === 'ar'
      ? 'السلام عليكم ورحمة الله وبركاته! أنا بليغ، مساعدك التعليمي للإجابة على أسئلتك. كيف يمكنني مساعدتك اليوم؟'
      : 'Peace be upon you! I\'m Balegh, your educational assistant. I focus on helping you learn about Islamic values and education. How can I help you today?',
  }], [language]);

  // Categorized suggested questions
  const categorizedQuestions = useMemo(() => 
    language === 'ar' 
      ? {
          quran: [
            { text: 'ما فضل قراءة القرآن؟', category: 'quran' as const },
            { text: 'كيف أتدبر القرآن؟', category: 'quran' as const },
          ],
          hadith: [
            { text: 'ما هي أحاديث عن الصبر؟', category: 'hadith' as const },
            { text: 'أحاديث عن الأخلاق', category: 'hadith' as const },
          ],
          ethics: [
            { text: 'ما هي الأخلاق الحسنة في الإسلام؟', category: 'ethics' as const },
            { text: 'كيف أكون صادقاً؟', category: 'ethics' as const },
          ],
          biography: [
            { text: 'أخبرني عن سيرة النبي', category: 'biography' as const },
            { text: 'من هم الصحابة؟', category: 'biography' as const },
          ],
          fiqh: [
            { text: 'ما هي أركان الإسلام؟', category: 'fiqh' as const },
            { text: 'كيف أحافظ على صلاتي؟', category: 'fiqh' as const },
          ],
        }
      : {
          quran: [
            { text: 'What are the benefits of reading the Quran?', category: 'quran' as const },
            { text: 'How to reflect on the Quran?', category: 'quran' as const },
          ],
          hadith: [
            { text: 'What are hadiths about patience?', category: 'hadith' as const },
            { text: 'Hadiths about ethics', category: 'hadith' as const },
          ],
          ethics: [
            { text: 'What are good morals in Islam?', category: 'ethics' as const },
            { text: 'How to be honest?', category: 'ethics' as const },
          ],
          biography: [
            { text: 'Tell me about the Prophet\'s biography', category: 'biography' as const },
            { text: 'Who are the companions?', category: 'biography' as const },
          ],
          fiqh: [
            { text: 'What are the pillars of Islam?', category: 'fiqh' as const },
            { text: 'How can I maintain my prayers?', category: 'fiqh' as const },
          ],
        },
    [language]
  );

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [language]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: messageText,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with language-aware answers
    setTimeout(() => {
      const answer = getAdultAnswer(messageText, language, t);
      const category = detectCategory(messageText, language);
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: answer,
        category,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const detectCategory = (text: string, lang: string): Message['category'] => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('quran') || lowerText.includes('قرآن')) return 'quran';
    if (lowerText.includes('hadith') || lowerText.includes('حديث')) return 'hadith';
    if (lowerText.includes('ethics') || lowerText.includes('أخلاق')) return 'ethics';
    if (lowerText.includes('prophet') || lowerText.includes('نبي') || lowerText.includes('سيرة')) return 'biography';
    if (lowerText.includes('prayer') || lowerText.includes('صلاة') || lowerText.includes('pillar') || lowerText.includes('ركن')) return 'fiqh';
    return 'general';
  };

  const handleBookmark = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, bookmarked: !msg.bookmarked } : msg
    ));
    toast.success(t('adults.chat.bookmarked'));
  };

  const handleSaveChat = () => {
    toast.success(t('adults.chat.saved'));
    // In real app, save to backend/context
  };

  return (
    <div className="min-h-screen theme-adults bg-adults-bg flex flex-col">
      <PersistentLanguageToggle />
      {/* Header */}
      <div className="bg-gradient-to-l from-adults-green to-adults-emerald p-4 flex items-center gap-4 sticky top-0 z-10">
        <button 
          onClick={() => navigate('/adults')}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-adults-gold rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-adults-green" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white font-amiri">{t('adults.askBalegh')}</h1>
            <p className="text-xs text-white/70 font-tajawal">{t('adults.smartAssistant')}</p>
          </div>
        </div>
        
        <button
          onClick={handleSaveChat}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <Download className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''} slide-up`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              message.role === 'assistant' 
                ? 'bg-adults-gold' 
                : 'bg-adults-green'
            }`}>
              {message.role === 'assistant' ? (
                <Bot className="w-4 h-4 text-adults-green" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              message.role === 'assistant'
                ? 'bg-white shadow-sm rounded-tr-none'
                : 'bg-adults-green text-white rounded-tl-none'
            }`}>
              {message.role === 'assistant' && message.category && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-adults-beige text-muted-foreground font-tajawal">
                    {message.category === 'quran' ? '📖 القرآن' :
                     message.category === 'hadith' ? '📜 الحديث' :
                     message.category === 'ethics' ? '💝 الأخلاق' :
                     message.category === 'biography' ? '👤 السيرة' :
                     message.category === 'fiqh' ? '⚖️ الفقه' : '📚 عام'}
                  </span>
                </div>
              )}
              <p className="font-tajawal text-sm whitespace-pre-line leading-relaxed">
                {message.content}
              </p>
              {message.role === 'assistant' && (
                <button
                  onClick={() => handleBookmark(message.id)}
                  className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-adults-gold transition-colors"
                >
                  <Bookmark className={`w-3 h-3 ${message.bookmarked ? 'fill-adults-gold text-adults-gold' : ''}`} />
                  {t('adults.chat.bookmark')}
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 slide-up">
            <div className="w-8 h-8 rounded-full bg-adults-gold flex items-center justify-center">
              <Bot className="w-4 h-4 text-adults-green" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-adults-green/50 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-adults-green/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-adults-green/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Categorized Suggested Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground mb-3 font-tajawal font-bold">
            {t('adults.chat.suggestedQuestions')}
          </p>
          
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
            {Object.keys(categorizedQuestions).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-3 py-1 rounded-full text-xs font-tajawal whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-adults-gold text-white'
                    : 'bg-adults-beige text-foreground hover:bg-adults-gold/20'
                }`}
              >
                {cat === 'quran' ? '📖 القرآن' :
                 cat === 'hadith' ? '📜 الحديث' :
                 cat === 'ethics' ? '💝 الأخلاق' :
                 cat === 'biography' ? '👤 السيرة' :
                 cat === 'fiqh' ? '⚖️ الفقه' : cat}
              </button>
            ))}
          </div>
          
          {/* Questions by Category */}
          <div className="flex flex-wrap gap-2">
            {(selectedCategory 
              ? categorizedQuestions[selectedCategory as keyof typeof categorizedQuestions]
              : Object.values(categorizedQuestions).flat()
            ).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.text)}
                className="px-3 py-2 bg-adults-beige rounded-full text-sm font-tajawal text-adults-green hover:bg-adults-gold/20 transition-colors"
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
            className="flex-1 bg-muted rounded-2xl py-3 px-4 text-foreground font-tajawal focus:outline-none focus:ring-2 focus:ring-adults-gold"
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-full bg-adults-green hover:bg-adults-emerald p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdultsChat;
