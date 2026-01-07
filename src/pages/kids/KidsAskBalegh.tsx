import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Send, Bot, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import KidsNavbar from '@/components/kids/KidsNavbar';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Language-aware AI response handler for kid-friendly answers
const getKidFriendlyAnswer = (question: string, t: any, language: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Check if question is too complex or sensitive
  const complexTermsAr = ['فلسفة', 'عقيدة', 'فقه', 'تفسير', 'فلسفي', 'معقد', 'معقدة', 'حكم', 'فتوى'];
  const complexTermsEn = ['philosophy', 'doctrine', 'jurisprudence', 'theology', 'complex', 'complicated', 'ruling', 'fatwa', 'judgment'];
  const sensitiveTermsAr = ['قتل', 'حرب', 'جهاد', 'قتال'];
  const sensitiveTermsEn = ['kill', 'war', 'jihad', 'fight', 'violence'];
  
  const isComplex = language === 'ar' 
    ? complexTermsAr.some(term => lowerQuestion.includes(term))
    : complexTermsEn.some(term => lowerQuestion.includes(term));
  
  const isSensitive = language === 'ar'
    ? sensitiveTermsAr.some(term => lowerQuestion.includes(term))
    : sensitiveTermsEn.some(term => lowerQuestion.includes(term));

  if (isComplex || isSensitive) {
    return language === 'ar' 
      ? t('kids.baleghChat.complexQuestion')
      : "That's an interesting question! 😊 I focus on helping you learn about good values and nice stories. Try asking about being kind, helping others, or interesting stories! 💝";
  }

  // Arabic answers (existing)
  if (language === 'ar') {
    const answers: Record<string, string> = {
      'نوح': 'نوح عليه السلام كان نبي طيب جداً! 🌊 كان بيحب الناس وبيخليهم يعملوا حاجات كويسة. ربنا بعته علشان يقول للناس يعملوا صح 😊',
      'ابراهيم': 'سيدنا إبراهيم كان بطل شجاع! ⭐ كان بيحب ربنا كتير وبيطيعه في كل حاجة. هو أبو الأنبياء الكتير وكبير جداً 💪',
      'موسى': 'سيدنا موسى كان نبي قوي! 🕊️ ربنا ساعده وفتح البحر قدامه. كان بيخلص الناس من الظلم ويديهم حرية 🌊',
      'صدق': 'الصدق معناه تقول الحقيقة دائماً! 😊 لما تكون صادق الناس تثق فيك وتحبك. الصدق صفة حلوة جداً وتخليك بطل ⭐',
      'مساعدة': 'نساعد الناس علشان نحب بعض! 💝 لما نساعد حد محتاج بنشعر بحب كبير. المساعدة تجيب فرحة في القلب 🌟',
      'طيب': 'الطيبة معناه تحب الناس وتعاملهم بحب! ❤️ لما تكون طيب مع حد، هو هيحبك ويهتم بيك. الطيبة تجيب أصدقاء حلوين 😊',
      'صلاة': 'في اليوم 5 صلوات! 🕌 الفجر، الظهر، العصر، المغرب، والعشاء. الصلاة بتحمي قلوبنا وتربطنا بربنا 💙',
      'رمضان': 'رمضان شهر حلو جداً! 🌙 بنصوم فيه من الفجر لحد المغرب. هو شهر الرحمة والمغفرة ونقرأ القرآن كتير ⭐',
      'خلق': 'الله خلقنا! 🌟 هو اللي عملنا وخلق كل حاجة حوالينا. الله قادر على كل حاجة وهو كريم معانا كتير 💙',
      'الله': 'الله هو ربنا الكريم! ✨ هو اللي خلقنا وبيحبنا كتير. الله موجود في كل مكان وهو دايماً معانا 😊',
      'مسلم': 'المسلم هو اللي بيصدق بربنا وبيحب دينه! 🕌 المسلم بيتعلم دينه ويعمل حاجات حلوة. كل مسلم بطل في دينه ⭐',
    };

    for (const [keyword, answer] of Object.entries(answers)) {
      if (lowerQuestion.includes(keyword)) {
        return answer;
      }
    }

    return 'سؤالك حلو! 😊 أنا بليغ، صديقك اللي هيجاوبك على أي سؤال بسيط! جرب تسألني عن الأنبياء، القيم الحلوة، أو أي حاجة تريد تعرفها 💙';
  }

  // English - Values-focused, simpler explanations
  const answersEn: Record<string, string> = {
    'noah': 'Noah was a good person who helped others! 🌊 He built a big boat to save people from a flood. This story teaches us to help others and be brave 😊',
    'abraham': 'Abraham was very brave! ⭐ He stood up for what was right and helped others. His story shows us that being kind and helping people is important 💪',
    'moses': 'Moses was strong and helped people! 🕊️ He helped free people who were treated unfairly. His story teaches us to stand up for others 🌊',
    'honest': 'Honesty means always telling the truth! 😊 When you are honest, people trust you and like you. Being honest makes you a good friend ⭐',
    'honesty': 'Honesty means always telling the truth! 😊 When you are honest, people trust you and like you. Being honest makes you a good friend ⭐',
    'help': 'We help people because we care about them! 💝 When we help someone in need, it makes us and them happy. Helping others brings joy 🌟',
    'kind': 'Being kind means being nice to others! ❤️ When you are kind to someone, they will like you and care about you. Kindness helps us make friends 😊',
    'kindness': 'Being kind means being nice to others! ❤️ When you are kind to someone, they will like you and care about you. Kindness helps us make friends 😊',
    'respect': 'Respect means treating others nicely! 😊 We should respect everyone, no matter where they come from. Respect makes the world a better place 🌟',
    'friend': 'A good friend is someone who is kind, honest, and helps you! 💝 Friends play together, share, and care about each other. Being a good friend means being nice 😊',
    'world': 'The world has many beautiful things! ✨ Trees, animals, stars, and people. We should be thankful for all the nice things around us 😊',
    'grateful': 'Being grateful means saying thank you for the good things! 💝 When we are grateful, we feel happy. There are many things to be grateful for ⭐',
    'good': 'Being good means doing nice things for others! 😊 We can be kind, honest, and helpful. When we are good to others, they are good to us too ⭐',
    'nice': 'We can do many nice things! 💝 Like helping others, being kind, sharing with friends, and saying nice words. Doing nice things makes everyone happy 😊',
  };

  // Simple keyword matching for English
  for (const [keyword, answer] of Object.entries(answersEn)) {
    if (lowerQuestion.includes(keyword)) {
      return answer;
    }
  }

  // Default friendly response for English
  return "That's a nice question! 😊 I'm Balegh, your friendly helper! I can answer simple questions about being kind, helping others, good values, and interesting stories. Try asking me something simple! 💙";
};

const KidsAskBalegh = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useApp();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPlayCTA, setShowPlayCTA] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioMessageId, setAudioMessageId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Language-aware suggested questions
  const suggestedQuestions = language === 'ar' 
    ? [
        'من هو نبي الله نوح؟',
        'إيه معنى الصدق؟',
        'ليه لازم نساعد الناس؟',
        'إزاي أكون طيب؟',
        'إيه يعني احترام الآخرين؟',
      ]
    : [
        'Who was Noah?',
        'What does honesty mean?',
        'Why should we help people?',
        'How can I be kind?',
        'What is respect?',
      ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSendQuestion = (question: string) => {
    if (!question.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputQuestion('');
    setIsTyping(true);
    setShowPlayCTA(false);

    // Simulate AI thinking time
    setTimeout(() => {
      const answer = getKidFriendlyAnswer(question, t, language);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isUser: false,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      setShowPlayCTA(true);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendQuestion(question);
  };

  const handlePlayGame = () => {
    navigate('/kids/category/prophets');
  };

  const handleAudioToggle = (messageId: string) => {
    if (audioMessageId === messageId && isPlayingAudio) {
      setIsPlayingAudio(false);
      setAudioMessageId(null);
    } else {
      setIsPlayingAudio(true);
      setAudioMessageId(messageId);
      // In a real app, this would trigger text-to-speech for the message
    }
  };

  return (
    <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-bg via-blue-50/30 to-cyan-50/30 pb-32">
      <PersistentLanguageToggle />
      {/* Back Button */}
      <button 
        onClick={() => navigate('/kids')}
        className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <ChevronRight className="w-6 h-6 text-kids-green" />
      </button>

      {/* Top Header with Friendly Baligh Character */}
      <div className="bg-gradient-to-br from-blue-400 via-cyan-400 to-kids-green p-8 pt-16 rounded-b-[3rem] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-5xl opacity-20 animate-pulse">💬</div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-20 animate-bounce">✨</div>

        {/* Friendly Baligh Character */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-6">
          <div className="relative mb-4">
            <div className="w-32 h-32 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50">
              <span className="text-8xl balegh-wave balegh-blink">🤖</span>
            </div>
            {/* Sparkle effects */}
            <div className="absolute -top-2 -right-2 text-3xl animate-pulse">✨</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
          </div>
          
          {/* Welcome Text */}
          <h1 className="text-2xl font-bold text-white font-amiri text-center mb-2">
            {t('kids.baleghChat.title')}
          </h1>
          <p className="text-white/90 text-base font-tajawal text-center">
            {t('kids.baleghChat.subtitle')}
          </p>
        </div>
      </div>

      {/* Suggested Questions Chips */}
      {chatMessages.length === 0 && (
        <div className="px-6 mt-6 mb-4">
          <p className="text-sm text-muted-foreground font-tajawal mb-3 text-center">
            {language === 'ar' ? 'أسئلة مقترحة:' : 'Suggested questions:'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="bg-white border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 rounded-full px-5 py-3 text-sm font-tajawal text-foreground transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="px-6 mt-6 mb-4 flex-1">
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pb-4">
          {chatMessages.length === 0 && !isTyping && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-30">💭</div>
              <p className="text-muted-foreground font-tajawal">
                {language === 'ar' ? 'اسأل بليغ أي سؤال! 😊' : 'Ask Balegh any question! 😊'}
              </p>
            </div>
          )}
          
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-3xl p-5 shadow-xl ${
                  msg.isUser
                    ? 'bg-gradient-to-br from-kids-green to-kids-blue text-white'
                    : 'bg-white text-foreground border-2 border-blue-200'
                }`}
              >
                {!msg.isUser && (
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      <span className="text-sm font-bold text-blue-600 font-tajawal">Balegh</span>
                    </div>
                    <button
                      onClick={() => handleAudioToggle(msg.id)}
                      className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                    >
                      {audioMessageId === msg.id && isPlayingAudio ? (
                        <VolumeX className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  </div>
                )}
                <p className={`font-tajawal text-base leading-relaxed ${msg.isUser ? 'text-white' : ''}`}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white rounded-3xl p-5 shadow-xl border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🤖</span>
                    <span className="text-sm font-bold text-blue-600 font-tajawal">Balegh</span>
                  </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Play Game CTA after response */}
          {showPlayCTA && !isTyping && chatMessages.length > 0 && (
            <div className="flex justify-center pt-2 animate-fade-in">
              <Button
                onClick={handlePlayGame}
                className="bg-gradient-to-r from-kids-green via-kids-blue to-kids-yellow hover:from-kids-blue hover:via-kids-green hover:to-kids-coral text-white font-bold py-4 px-8 rounded-full shadow-xl transform hover:scale-105 transition-all border-2 border-white"
              >
                <span className="flex items-center gap-2">
                  {t('kids.baleghChat.playQuestionCTA')}
                </span>
              </Button>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-24 left-0 right-0 px-6 z-10">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl border-2 border-blue-200 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion(inputQuestion)}
              placeholder={t('kids.baleghChat.askQuestion')}
              className="flex-1 bg-transparent border-none outline-none font-tajawal text-foreground placeholder:text-muted-foreground text-base"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendQuestion(inputQuestion)}
              disabled={isTyping || !inputQuestion.trim()}
              className="w-12 h-12 bg-gradient-to-br from-blue-400 to-kids-green text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <KidsNavbar />
    </div>
  );
};

export default KidsAskBalegh;

