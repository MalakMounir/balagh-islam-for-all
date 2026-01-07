import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const SetupConfirmation = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  useEffect(() => {
    // Mark setup as complete
    if (user && user.isFirstTime) {
      const updatedUser = {
        ...user,
        isFirstTime: false,
      };
      setUser(updatedUser);
      
      // Show success toast
      toast.success('تم إعداد حسابك بنجاح!', {
        description: 'مرحباً بك في بلاغ',
        duration: 3000,
      });
    }
  }, []);

  const handleContinue = () => {
    // Navigate to experience selection
    navigate('/select-experience');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-palette-off-white via-palette-light-mint/20 to-palette-medium-green/10 relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern-green opacity-30" />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
        <LanguageSwitcher variant="icon" />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-palette-light-gray/50 text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            {/* Success Message */}
            <h2 className="text-2xl sm:text-3xl font-bold text-palette-darker-green font-amiri mb-4">
              تم إعداد حسابك بنجاح
            </h2>
            <p className="text-palette-medium-gray text-base font-tajawal mb-8">
              أنت الآن جاهز للبدء في رحلتك التعليمية مع بلاغ
            </p>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full h-14 rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal"
            >
              ابدأ الآن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupConfirmation;

