import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: 'السلام عليكم ورحمة الله وبركاته! أنا بليغ، مساعدك الذكي للإجابة على أسئلتك الإسلامية. كيف يمكنني مساعدتك اليوم؟',
  },
];

const suggestedQuestions = [
  'ما هي أركان الإسلام؟',
  'كيف أحافظ على صلاتي؟',
  'ما فضل قراءة القرآن؟',
  'اقترح لي كتاباً للمبتدئين',
];

const AdultsChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'ما هي أركان الإسلام؟': 'أركان الإسلام خمسة:\n\n١. الشهادتان: شهادة أن لا إله إلا الله وأن محمداً رسول الله\n٢. إقام الصلاة\n٣. إيتاء الزكاة\n٤. صوم رمضان\n٥. حج البيت لمن استطاع إليه سبيلا\n\nهل تريد معرفة المزيد عن أي ركن منها؟',
        'كيف أحافظ على صلاتي؟': 'للمحافظة على الصلاة، أنصحك بـ:\n\n• استشعار عظمة الوقوف بين يدي الله\n• الصلاة في أول وقتها\n• الصلاة في المسجد إن أمكن\n• الاستعداد للصلاة قبل الأذان\n• الدعاء بالثبات والهداية\n\nأقترح عليك قراءة كتاب "33 سبباً للخشوع في الصلاة"',
        default: 'شكراً لسؤالك. دعني أبحث لك عن أفضل إجابة من المصادر الموثوقة...\n\nبناءً على ما فهمته من سؤالك، أنصحك بمراجعة قسم "جامع المحتوى الإسلامي" للاطلاع على مقالات وكتب متعلقة بهذا الموضوع.',
      };

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responses[messageText] || responses.default,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen theme-adults bg-adults-bg flex flex-col">
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
          <div>
            <h1 className="text-lg font-bold text-white font-amiri">اسأل بليغ</h1>
            <p className="text-xs text-white/70 font-tajawal">مساعدك الذكي</p>
          </div>
        </div>
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
              <p className="font-tajawal text-sm whitespace-pre-line leading-relaxed">
                {message.content}
              </p>
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

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground mb-2 font-tajawal">أسئلة مقترحة:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-3 py-2 bg-adults-beige rounded-full text-sm font-tajawal text-adults-green hover:bg-adults-gold/20 transition-colors"
              >
                {q}
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
            placeholder="اكتب سؤالك هنا..."
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
