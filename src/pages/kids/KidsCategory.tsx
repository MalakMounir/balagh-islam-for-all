import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { ChevronRight, ArrowRight, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PersistentLanguageToggle from '@/components/PersistentLanguageToggle';

const getCategoryData = (t: any): Record<string, { title: string; icon: string; color: string; illustration: string }> => ({
  // New categories
  values: { title: t('kids.categories.beautifulValues'), icon: '💝', color: 'from-kids-coral to-pink-400', illustration: '💖' },
  prophets: { title: t('kids.categories.bedtimeStories'), icon: '🌙', color: 'from-kids-green to-emerald-400', illustration: '📚' },
  quran: { title: t('kids.categories.quranSimple'), icon: '📖', color: 'from-kids-blue to-cyan-400', illustration: '📖' },
  hadith: { title: t('kids.categories.easyHadith'), icon: '✨', color: 'from-kids-yellow to-amber-400', illustration: '✨' },
  behavior: { title: t('kids.categories.howToBehave'), icon: '🤔', color: 'from-violet-400 to-purple-500', illustration: '🤔' },
  learnToday: { title: t('kids.categories.learnToday'), icon: '📚', color: 'from-kids-green to-emerald-400', illustration: '📚' },
  // Legacy categories (for backward compatibility)
  questions: { title: t('kids.categories.questions'), icon: '❓', color: 'from-kids-blue to-cyan-400', illustration: '🤔' },
  knowgod: { title: t('kids.categories.knowgod'), icon: '✨', color: 'from-kids-yellow to-amber-400', illustration: '🌟' },
  muslim: { title: t('kids.categories.muslim'), icon: '🕌', color: 'from-violet-400 to-purple-500', illustration: '🎯' },
});

// Articles for each category
const categoryArticles: Record<string, { id: string; title: string; description: string; emoji: string; illustration: string; content: string[]; keywords: string[] }[]> = {
  prophets: [
    {
      id: 'prophet-nuh',
      title: 'قصة سيدنا نوح',
      description: 'تعرف على قصة النبي نوح عليه السلام وكيف نجّاه الله',
      emoji: '🌊',
      illustration: '🚢',
      content: [
        'كان سيدنا نوح نبي طيب جداً! 🌟',
        'كان بيحب الناس وبيقولهم يعملوا صح.',
        'ربنا أمره يبني سفينة كبيرة.',
        'جت مية كتيرة ونوح والناس الطيبين نجوا! 💙',
        'القصة تعلمنا نسمع كلام ربنا دائماً.'
      ],
      keywords: ['نوح', 'نبي', 'سفينة', 'ربنا', 'نجاة']
    },
    {
      id: 'prophet-ibrahim',
      title: 'سيدنا إبراهيم البطل',
      description: 'قصة شجاعة سيدنا إبراهيم وحبه الكبير لربنا',
      emoji: '⭐',
      illustration: '🔥',
      content: [
        'سيدنا إبراهيم كان بطل شجاع! 💪',
        'كان بيحب ربنا كتير وبيطيعه.',
        'حتى لما الناس وضعوه في النار، ربنا حماه.',
        'النار بقيت برد وسلام عليه! 😊',
        'هو أبو الأنبياء الكتير.'
      ],
      keywords: ['إبراهيم', 'شجاع', 'حب', 'ربنا', 'نار']
    }
  ],
  values: [
    {
      id: 'honesty',
      title: 'الصدق صفة جميلة',
      description: 'تعلم أهمية الصدق وكيف نجعلها عادة يومية',
      emoji: '💎',
      illustration: '✨',
      content: [
        'الصدق معناه تقول الحقيقة دائماً! 😊',
        'لما تكون صادق، الناس تثق فيك وتحبك.',
        'الصدق يخليك بطل وواثق من نفسك.',
        'حتى لو كان صعب، الصدق دائماً أحلى.',
        'الرسول صلى الله عليه وسلم قال الصدق منجاة.'
      ],
      keywords: ['صدق', 'حقيقة', 'ثقة', 'بطل', 'منجاة']
    },
    {
      id: 'kindness',
      title: 'الطيبة واللطف',
      description: 'كيف تكون طيباً مع الآخرين وتجعلهم سعداء',
      emoji: '💝',
      illustration: '❤️',
      content: [
        'الطيبة معناه تحب الناس وتساعدهم! 💝',
        'لما تكون طيب مع حد، هو هيحبك ويهتم بيك.',
        'الطيبة تجيب أصدقاء حلوين وفرحة في القلب.',
        'حتى كلمة طيبة ممكن تخلي حد سعيد! 😊',
        'الرسول صلى الله عليه وسلم كان أطيب الناس.'
      ],
      keywords: ['طيبة', 'لطف', 'مساعدة', 'حب', 'سعادة']
    },
    {
      id: 'respect',
      title: 'احترام الآخرين',
      description: 'تعلم كيف تحترم الكبار والأصدقاء',
      emoji: '🤝',
      illustration: '🙏',
      content: [
        'الاحترام معناه تعامل الناس بحب! 🤝',
        'نحترم الكبار والأهل والمعلمين.',
        'نحترم أصدقائنا ونتكلم معاهم بلطف.',
        'الاحترام يخلي الناس تحبك وتثق فيك.',
        'الاحترام صفة جميلة في الإسلام.'
      ],
      keywords: ['احترام', 'لطف', 'كبار', 'أصدقاء', 'إسلام']
    }
  ],
  questions: [
    {
      id: 'prayers',
      title: 'الصلوات الخمس',
      description: 'تعرف على الصلوات اليومية وأهميتها',
      emoji: '🕌',
      illustration: '🤲',
      content: [
        'في اليوم 5 صلوات! 🕌',
        'الفجر، الظهر، العصر، المغرب، والعشاء.',
        'الصلاة بتربطنا بربنا.',
        'بتحمينا وتخلي قلوبنا هادئة.',
        'كل صلاة لها وقت محدد.'
      ],
      keywords: ['صلاة', 'خمس', 'ربنا', 'حماية', 'وقت']
    },
    {
      id: 'ramadan',
      title: 'شهر رمضان المبارك',
      description: 'تعرف على شهر رمضان وفضله',
      emoji: '🌙',
      illustration: '⭐',
      content: [
        'رمضان شهر حلو جداً! 🌙',
        'بنصوم فيه من الفجر لحد المغرب.',
        'هو شهر الرحمة والمغفرة.',
        'نقرأ القرآن كتير في رمضان.',
        'رمضان يجمع العائلة والأصدقاء.'
      ],
      keywords: ['رمضان', 'صوم', 'رحمة', 'قرآن', 'عائلة']
    },
    {
      id: 'zakat',
      title: 'الزكاة والصدقة',
      description: 'تعلم عن إعطاء المال للمحتاجين',
      emoji: '💰',
      illustration: '💝',
      content: [
        'الزكاة معناه نعطي جزء من مالنا للمحتاجين! 💰',
        'لما نساعد الناس المحتاجين، ربنا يبارك لنا.',
        'الصدقة تجيب فرحة في القلب.',
        'حتى لو قليل، المهم نعطي بحب.',
        'المساعدة صفة جميلة في الإسلام.'
      ],
      keywords: ['زكاة', 'صدقة', 'مساعدة', 'محتاج', 'بركة']
    }
  ],
  knowgod: [
    {
      id: 'god-creator',
      title: 'الله خلق كل شيء',
      description: 'تعرف على عظمة الخالق وفضله علينا',
      emoji: '🌟',
      illustration: '🌍',
      content: [
        'الله خلقنا وخلق كل حاجة! 🌟',
        'خلق السماء، الأرض، والشجر.',
        'خلقنا لنعيش سعداء.',
        'الله كريم ورحيم معنا كتير.',
        'نشكره على كل النعم.'
      ],
      keywords: ['الله', 'خلق', 'كريم', 'رحيم', 'نعمة']
    },
    {
      id: 'god-mercy',
      title: 'رحمة الله',
      description: 'تعرف على رحمة الله الكبيرة',
      emoji: '💙',
      illustration: '🌈',
      content: [
        'الله رحيم جداً معنا! 💙',
        'حتى لو عملنا حاجة غلط، الله يغفر لنا.',
        'الله يحبنا ويريد الخير لنا.',
        'نشكره على رحمته وفضله.',
        'الرحمة من أجمل صفات الله.'
      ],
      keywords: ['رحمة', 'غفران', 'حب', 'خير', 'فضل']
    },
    {
      id: 'god-names',
      title: 'أسماء الله الحسنى',
      description: 'تعرف على بعض أسماء الله الجميلة',
      emoji: '✨',
      illustration: '💎',
      content: [
        'لله أسماء حلوة كتير! ✨',
        'الرحمن، الرحيم، الكريم، الحليم.',
        'كل اسم يعلمنا صفة من صفات الله.',
        'نذكر الله بأسمائه الحسنى.',
        'الأسماء الحسنى تجيب بركة وفرحة.'
      ],
      keywords: ['أسماء', 'حسنى', 'رحمن', 'كريم', 'ذكر']
    }
  ],
  muslim: [
    {
      id: 'being-muslim',
      title: 'أنا مسلم فخور',
      description: 'ما معنى أن تكون مسلماً وكيف تكون مسلماً صالحاً',
      emoji: '🕌',
      illustration: '💚',
      content: [
        'المسلم هو اللي بيصدق بربنا! 🕌',
        'بيحب دينه وبيتعلم منه.',
        'بيصلي وبيقرى القرآن.',
        'بيساعد الناس ويكون طيب.',
        'كل مسلم بطل في دينه.'
      ],
      keywords: ['مسلم', 'دين', 'صلاة', 'قرآن', 'مساعدة']
    },
    {
      id: 'islamic-greeting',
      title: 'السلام عليكم',
      description: 'تعلم التحية الإسلامية الجميلة',
      emoji: '🤲',
      illustration: '👋',
      content: [
        'السلام عليكم تحية حلوة! 🤲',
        'لما نقول السلام عليكم، الناس ترد علينا.',
        'التحية تجيب محبة بين الناس.',
        'الرسول صلى الله عليه وسلم علمنا التحية.',
        'السلام يجمع الناس ويخليهم أصدقاء.'
      ],
      keywords: ['سلام', 'تحية', 'محبة', 'رسول', 'أصدقاء']
    },
    {
      id: 'helping-others',
      title: 'مساعدة الآخرين',
      description: 'كيف نساعد الناس ونكون مفيدين',
      emoji: '🤝',
      illustration: '💪',
      content: [
        'مساعدة الناس حاجة حلوة! 🤝',
        'لما نساعد حد محتاج، نشعر بفرحة كبيرة.',
        'المساعدة تجيب بركة في حياتنا.',
        'حتى مساعدة بسيطة ممكن تخلي حد سعيد.',
        'المسلم بيساعد الناس دائماً.'
      ],
      keywords: ['مساعدة', 'محتاج', 'فرحة', 'بركة', 'مسلم']
    }
  ]
};

const difficultyLevels = [
  { id: 'easy', label: 'سهل', emoji: '😊', questions: 5 },
  { id: 'medium', label: 'متوسط', emoji: '🤔', questions: 7 },
  { id: 'hard', label: 'صعب', emoji: '🧠', questions: 10 },
];

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Simple AI response handler for kid-friendly answers
const getKidFriendlyAnswer = (question: string, categoryId: string, t: any, language: string, categoryData: any): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Check if question is too complex or sensitive
  const complexTermsAr = ['فلسفة', 'عقيدة', 'فقه', 'تفسير', 'فلسفي', 'معقد', 'معقدة', 'حكم', 'فتوى'];
  const complexTermsEn = ['philosophy', 'doctrine', 'jurisprudence', 'theology', 'complex', 'complicated', 'ruling', 'fatwa'];
  const sensitiveTermsAr = ['قتل', 'حرب', 'جهاد', 'قتال', 'عنف'];
  const sensitiveTermsEn = ['kill', 'war', 'jihad', 'fight', 'violence', 'violent'];
  
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

  // Language-specific answers - Arabic (existing)
  if (language === 'ar') {
    const answers: Record<string, Record<string, string>> = {
      prophets: {
        'نوح': 'نوح عليه السلام كان نبي طيب جداً! 🌊 كان بيحب الناس وبيخليهم يعملوا حاجات كويسة. ربنا بعته علشان يقول للناس يعملوا صح 😊',
        'ابراهيم': 'سيدنا إبراهيم كان بطل شجاع! ⭐ كان بيحب ربنا كتير وبيطيعه في كل حاجة. هو أبو الأنبياء الكتير وكبير جداً 💪',
        'موسى': 'سيدنا موسى كان نبي قوي! 🕊️ ربنا ساعده وفتح البحر قدامه. كان بيخلص الناس من الظلم ويديهم حرية 🌊',
      },
      values: {
        'صدق': 'الصدق معناه تقول الحقيقة دائماً! 😊 لما تكون صادق الناس تثق فيك وتحبك. الصدق صفة حلوة جداً وتخليك بطل ⭐',
        'مساعدة': 'نساعد الناس علشان نحب بعض! 💝 لما نساعد حد محتاج بنشعر بحب كبير. المساعدة تجيب فرحة في القلب 🌟',
        'طيب': 'الطيبة معناه تحب الناس وتعاملهم بحب! ❤️ لما تكون طيب مع حد، هو هيحبك ويهتم بيك. الطيبة تجيب أصدقاء حلوين 😊',
      },
      questions: {
        'صلاة': 'في اليوم 5 صلوات! 🕌 الفجر، الظهر، العصر، المغرب، والعشاء. الصلاة بتحمي قلوبنا وتربطنا بربنا 💙',
        'رمضان': 'رمضان شهر حلو جداً! 🌙 بنصوم فيه من الفجر لحد المغرب. هو شهر الرحمة والمغفرة ونقرأ القرآن كتير ⭐',
      },
      knowgod: {
        'خلق': 'الله خلقنا! 🌟 هو اللي عملنا وخلق كل حاجة حوالينا. الله قادر على كل حاجة وهو كريم معانا كتير 💙',
        'الله': 'الله هو ربنا الكريم! ✨ هو اللي خلقنا وبيحبنا كتير. الله موجود في كل مكان وهو دايماً معانا 😊',
        'كريم': 'الله كريم معانا لأن بيحبنا! 💝 هو بيرزقنا ويعطينا كل حاجة حلوة. الله رحيم وعطوف مع كل واحد ⭐',
      },
      muslim: {
        'مسلم': 'المسلم هو اللي بيصدق بربنا وبيحب دينه! 🕌 المسلم بيتعلم دينه ويعمل حاجات حلوة. كل مسلم بطل في دينه ⭐',
        'حلوة': 'بنعمل حاجات حلوة كتير! 😊 بنصلي، بنقرأ القرآن، بنساعد الناس، وبنحب بعض. كل حاجة حلوة في الإسلام 💝',
        'كويس': 'عشان تكون مسلم كويس: صلي، اقرأ القرآن، وساعد الناس! 🙏 لو تعمل كده هتبقى بطل ومحبوب من ربنا ⭐',
      },
    };

    for (const [keyword, answer] of Object.entries(answers[categoryId] || {})) {
      if (lowerQuestion.includes(keyword)) {
        return answer;
      }
    }

    return `سؤالك حلو! 😊 خليني أقولك إن في ${categoryData[categoryId]?.title} حاجات حلوة كتير نتعلمها. جرب تسأل عن شيء بسيط أكثر علشان أشرحه لك بطريقة سهلة 💙`;
  }

  // English - Values-focused, child-friendly answers suitable for all children
  const answersEn: Record<string, Record<string, string>> = {
    prophets: {
      'noah': 'Noah was a good person who helped others! 🌊 He built a big boat to save people from a big flood. The story teaches us to help others and be brave 😊',
      'abraham': 'Abraham was very brave! ⭐ He stood up for what was right and helped others. He showed us that being kind and helping people is important 💪',
      'moses': 'Moses was strong and helped people! 🕊️ He helped free people from being treated unfairly. His story teaches us to stand up for others 🌊',
    },
    values: {
      'honest': 'Honesty means always telling the truth! 😊 When you are honest, people trust you and like you. Being honest makes you a good friend ⭐',
      'honesty': 'Honesty means always telling the truth! 😊 When you are honest, people trust you and like you. Being honest makes you a good friend ⭐',
      'help': 'We help people because we care about them! 💝 When we help someone in need, it makes us and them happy. Helping others brings joy 🌟',
      'kind': 'Being kind means being nice to others! ❤️ When you are kind to someone, they will like you and care about you. Kindness helps us make friends 😊',
      'kindness': 'Being kind means being nice to others! ❤️ When you are kind to someone, they will like you and care about you. Kindness helps us make friends 😊',
    },
    questions: {
      'habit': 'Good habits are things we do every day that help us! 😊 Like brushing our teeth, being nice to others, and helping at home. Good habits make us happy and healthy 🌟',
      'friend': 'A good friend is someone who is kind, honest, and helps you! 💝 Friends play together, share, and care about each other. Being a good friend means being nice 😊',
      'help': 'We help others because it\'s the right thing to do! 💝 When we help someone, we make them happy and feel good too. Helping is a nice thing to do 🌟',
    },
    knowgod: {
      'create': 'The world was created for us to live in! 🌟 There are beautiful things all around us - trees, animals, and people. We should be grateful for all the nice things 💙',
      'world': 'The world has many beautiful things! ✨ Trees, animals, stars, and people. We should be thankful for all the nice things around us 😊',
      'grateful': 'Being grateful means saying thank you for the good things! 💝 When we are grateful, we feel happy. There are many things to be grateful for ⭐',
      'gratitude': 'Being grateful means saying thank you for the good things! 💝 When we are grateful, we feel happy. There are many things to be grateful for ⭐',
    },
    muslim: {
      'good': 'Being good means doing nice things for others! 😊 We can be kind, honest, and helpful. When we are good to others, they are good to us too ⭐',
      'nice': 'We can do many nice things! 💝 Like helping others, being kind, sharing with friends, and saying nice words. Doing nice things makes everyone happy 😊',
      'help': 'We can help others in many ways! 🙏 Like sharing toys, helping at home, being kind to friends, and saying nice words. Helping others makes us feel good ⭐',
    },
  };

  // Simple keyword matching for English
  for (const [keyword, answer] of Object.entries(answersEn[categoryId] || {})) {
    if (lowerQuestion.includes(keyword)) {
      return answer;
    }
  }

  // Default friendly response for English
  return `That's a nice question! 😊 Let me tell you that in ${categoryData[categoryId]?.title} there are many nice things to learn. Try asking about something simpler so I can explain it in an easy way 💙`;
};

const KidsCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateKidsProgress, language } = useApp();
  const { t } = useTranslation();
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPlayCTA, setShowPlayCTA] = useState(false);

  const categoryData = useMemo(() => getCategoryData(t), [t]);
  // Map new category IDs to existing ones for backward compatibility
  const categoryIdMap: Record<string, string> = {
    'values': 'values',
    'prophets': 'prophets',
    'quran': 'questions',
    'hadith': 'knowgod',
    'behavior': 'muslim',
    'learnToday': 'prophets',
  };
  const mappedId = categoryIdMap[id || 'prophets'] || id || 'prophets';
  const category = categoryData[id || 'prophets'] || categoryData['prophets'];
  const selectedLevelData = difficultyLevels.find(level => level.id === selectedDifficulty) || difficultyLevels[0];
  const suggestedQuestions = (t(`kids.baleghChat.suggestedQuestions.${mappedId}`, { returnObjects: true }) as string[]) || [];

  const handleStartGame = () => {
    updateKidsProgress({ currentCategory: id || null });
    navigate('/kids/question');
  };

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
      const answer = getKidFriendlyAnswer(question, mappedId, t, language, categoryData);
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

  return (
    <div className="min-h-screen theme-kids bg-gradient-to-br from-kids-bg via-kids-green-light/10 to-kids-blue-light/10 pb-32">
      <PersistentLanguageToggle />
      {/* Back Button */}
      <button 
        onClick={() => navigate('/kids')}
        className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <ChevronRight className="w-6 h-6 text-kids-green" />
      </button>

      {/* Top Playful Illustration */}
      <div className={`bg-gradient-to-br ${category.color} p-8 pt-16 rounded-b-[3rem] relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 text-6xl opacity-20 animate-bounce">⭐</div>
        <div className="absolute bottom-4 right-4 text-5xl opacity-20 animate-pulse">🎮</div>
        
        {/* Illustration */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-4">
          <div className="text-9xl mb-4 float-animation transform hover:scale-110 transition-transform">
            {category.illustration}
          </div>
        </div>
      </div>

      {/* Category Title with Balagh */}
      <div className="px-6 mt-6 mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg">
            <span className="text-4xl balegh-wave">🤖</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground font-amiri text-center">
            {category.title}
          </h1>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-kids-green via-kids-blue to-kids-yellow rounded-full mx-auto"></div>
      </div>

      {/* 1️⃣ 📘 اقرأ وتعلّم Articles Section - AT TOP */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-amiri text-center">
          {t('kids.category.readAndLearn')}
        </h2>
        
        <div className="space-y-3">
          {(categoryArticles[mappedId] || categoryArticles['prophets'] || []).slice(0, 3).map((article) => (
            <button
              key={article.id}
              onClick={() => navigate(`/kids/article/${id}/${article.id}`)}
              className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg border-2 border-transparent hover:border-kids-green/30 transition-all duration-300 transform hover:scale-[1.01] text-right group"
            >
              <div className="flex items-start gap-3">
                {/* Emoji Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{article.emoji}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground font-amiri mb-1.5 group-hover:text-kids-green transition-colors line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground font-tajawal text-sm leading-relaxed mb-2 line-clamp-2">
                    {article.description}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="flex items-center gap-1.5 text-kids-green font-bold text-xs font-tajawal">
                    <span>{t('kids.category.readMore')}</span>
                    <ArrowRight className="w-3 h-3 transform rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2️⃣ 🎮 العب Games Section */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-amiri text-center">
          {t('kids.category.playGames')}
        </h2>

        {/* Difficulty Selector */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground mb-4 font-tajawal text-center">
            {t('kids.category.selectDifficulty')} 🎯
          </h3>

          <div className="flex gap-3 justify-center">
            {difficultyLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedDifficulty(level.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 min-w-[90px] ${
                  selectedDifficulty === level.id
                    ? 'bg-gradient-to-br from-kids-green to-kids-blue shadow-xl scale-105 ring-2 ring-kids-yellow/50'
                    : 'bg-white shadow-md hover:scale-105 hover:shadow-lg'
                }`}
              >
                <span className={`text-4xl transform transition-transform ${
                  selectedDifficulty === level.id ? 'scale-110' : ''
                }`}>
                  {level.emoji}
                </span>
                <span className={`font-bold text-sm font-tajawal ${
                  selectedDifficulty === level.id ? 'text-white' : 'text-foreground'
                }`}>
                  {t(`kids.category.${level.id}`)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Text */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-kids-green/20 text-center mb-4">
          <p className="text-xl font-bold text-foreground font-tajawal mb-2">
            {t('kids.category.questionsPreview')} {selectedLevelData.questions} {t('kids.category.questions')}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            {Array.from({ length: selectedLevelData.questions }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 bg-gradient-to-br from-kids-green to-kids-blue rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Game CTA Button */}
        <Button
          onClick={handleStartGame}
          className="w-full bg-gradient-to-r from-kids-green via-kids-blue to-kids-yellow hover:from-kids-blue hover:via-kids-green hover:to-kids-coral text-white font-bold text-lg py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white"
        >
          <span className="flex items-center justify-center gap-2">
            {t('kids.category.startPlaying')}
            <ArrowRight className="w-5 h-5 transform rotate-180" />
          </span>
        </Button>
      </div>

      {/* 3️⃣ 🤖 اسأل بليغ Chat Section */}
      <div className="px-6 mb-8">
        <div className="bg-gradient-to-br from-kids-blue/10 to-kids-green/10 rounded-3xl p-6 shadow-xl border-2 border-kids-blue/20">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground font-amiri mb-2">
              {t('kids.baleghChat.title')}
            </h2>
            <p className="text-muted-foreground font-tajawal text-sm">
              {t('kids.baleghChat.subtitle')}
            </p>
          </div>

          {/* Chat Messages */}
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
            {chatMessages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 text-kids-blue mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground font-tajawal text-sm">
                  اسأل بليغ أي سؤال بسيط! 😊
                </p>
              </div>
            )}
            
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-3xl p-4 shadow-lg ${
                    msg.isUser
                      ? 'bg-gradient-to-br from-kids-green to-kids-blue text-white'
                      : 'bg-white text-foreground border-2 border-kids-blue/20'
                  }`}
                >
                  <p className={`font-tajawal text-base ${msg.isUser ? 'text-white' : ''}`}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-3xl p-4 shadow-lg border-2 border-kids-blue/20">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-kids-blue rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-kids-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-kids-blue rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Play Question CTA after answer */}
            {showPlayCTA && !isTyping && chatMessages.length > 0 && (
              <div className="flex justify-center pt-2">
                <Button
                  onClick={handleStartGame}
                  className="bg-gradient-to-r from-kids-green to-kids-blue text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all"
                >
                  {t('kids.baleghChat.playQuestionCTA')}
                </Button>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {chatMessages.length === 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground font-tajawal mb-3 text-center">
                أسئلة مقترحة:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="bg-white border-2 border-kids-blue/30 hover:border-kids-blue hover:bg-kids-blue/5 rounded-full px-4 py-2 text-sm font-tajawal text-foreground transition-all transform hover:scale-105"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion(inputQuestion)}
              placeholder={t('kids.baleghChat.askQuestion')}
              className="flex-1 bg-white border-2 border-kids-blue/30 rounded-full px-4 py-3 font-tajawal text-foreground focus:outline-none focus:border-kids-blue"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendQuestion(inputQuestion)}
              disabled={isTyping || !inputQuestion.trim()}
              className="w-12 h-12 bg-gradient-to-br from-kids-green to-kids-blue text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default KidsCategory;
