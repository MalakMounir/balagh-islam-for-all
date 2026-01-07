import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Users } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useApp } from '@/contexts/AppContext';

const AccountTypeSelection = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [selectedType, setSelectedType] = useState<'individual' | 'parent' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selectedType || !user) return;
    
    setIsSubmitting(true);
    
    // Update user with account type and role
    const updatedUser = {
      ...user,
      userType: selectedType,
      accountType: selectedType,
      role: selectedType === 'parent' ? 'Parent' as const : 'Adult' as const,
      hasChildren: selectedType === 'parent' ? user.hasChildren : false,
    };
    setUser(updatedUser);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubmitting(false);
    
    if (selectedType === 'parent') {
      navigate('/auth/setup/add-child');
    } else {
      // Individual account - go directly to experience selection
      navigate('/select-experience');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-palette-off-white via-palette-light-mint/20 to-palette-medium-green/10 relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern-green opacity-30" />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
        <LanguageSwitcher variant="icon" />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-palette-darker-green font-amiri mb-2">
            نوع الحساب
          </h1>
          <p className="text-palette-medium-gray text-sm sm:text-base font-tajawal">
            اختر نوع الحساب المناسب لك
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl space-y-4">
            {/* Individual Account Card */}
            <button
              onClick={() => setSelectedType('individual')}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-right ${
                selectedType === 'individual'
                  ? 'border-palette-darker-green bg-palette-darker-green/5 shadow-lg'
                  : 'border-palette-light-gray bg-white hover:border-palette-darker-green/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  selectedType === 'individual'
                    ? 'bg-palette-darker-green text-white'
                    : 'bg-palette-off-white text-palette-darker-green'
                }`}>
                  <User className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-palette-darker-green font-tajawal mb-2">
                    حساب فردي
                  </h3>
                  <p className="text-palette-medium-gray text-sm font-tajawal">
                    حساب شخصي للاستخدام الفردي
                  </p>
                </div>
                {selectedType === 'individual' && (
                  <div className="w-6 h-6 rounded-full bg-palette-darker-green flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            </button>

            {/* Parent Account Card */}
            <button
              onClick={() => setSelectedType('parent')}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-right ${
                selectedType === 'parent'
                  ? 'border-palette-darker-green bg-palette-darker-green/5 shadow-lg'
                  : 'border-palette-light-gray bg-white hover:border-palette-darker-green/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  selectedType === 'parent'
                    ? 'bg-palette-darker-green text-white'
                    : 'bg-palette-off-white text-palette-darker-green'
                }`}>
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-palette-darker-green font-tajawal mb-2">
                    حساب ولي أمر (لديه أطفال)
                  </h3>
                  <p className="text-palette-medium-gray text-sm font-tajawal">
                    حساب للوالدين مع إمكانية إضافة ملفات الأطفال
                  </p>
                </div>
                {selectedType === 'parent' && (
                  <div className="w-6 h-6 rounded-full bg-palette-darker-green flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            </button>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!selectedType || isSubmitting}
              className="w-full h-14 rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'جاري التحميل...' : 'متابعة'}
              {!isSubmitting && <ArrowRight className="mr-2 h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;

