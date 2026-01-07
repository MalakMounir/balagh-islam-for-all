import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

type SignUpFormData = z.infer<ReturnType<typeof getSignUpSchema>>;

const getSignUpSchema = (t: any) => z.object({
  name: z.string().min(2, t('auth.validation.nameMin')),
  email: z.string().email(t('auth.validation.emailInvalid')),
  password: z.string().min(6, t('auth.validation.passwordMin')),
  confirmPassword: z.string(),
  isParent: z.boolean().default(false),
  language: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: t('auth.validation.passwordMismatch'),
  path: ['confirmPassword'],
});

// Password strength checker
const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; score: number; feedback: string[] } => {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score += 1;
  else feedback.push('كلمة المرور يجب أن تكون 8 أحرف على الأقل');

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  else if (/[a-z]/.test(password) || /[A-Z]/.test(password)) {
    score += 0.5;
    feedback.push('استخدم أحرف كبيرة وصغيرة');
  }

  if (/\d/.test(password)) score += 1;
  else feedback.push('أضف أرقام');

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push('أضف رموز خاصة');

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (score >= 3) strength = 'strong';
  else if (score >= 2) strength = 'medium';

  return { strength, score, feedback };
};

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signup, setLanguage } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const signUpSchema = getSignUpSchema(t);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      language: 'ar',
      isParent: false,
    },
  });

  const password = watch('password') || '';
  const passwordStrength = password ? getPasswordStrength(password) : null;
  const isParent = watch('isParent');

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    
    try {
      // Set language if selected
      if (data.language) {
        setLanguage(data.language as 'ar' | 'en' | 'fr' | 'ur' | 'id');
      }
      
      // Use the fake signup from context (includes 500ms delay)
      const userData = await signup(data.name, data.email, data.password, data.isParent);
      
      // Show success toast
      toast.success('تم إنشاء الحساب بنجاح', {
        description: `مرحباً ${userData.name}! ${data.isParent ? 'حساب ولي أمر' : 'حساب شخصي'}`,
        duration: 3000,
      });
      
      setIsSubmitting(false);
      
      // Navigate based on account type
      if (data.isParent) {
        // Parent account - go to add child profile (first-time setup)
        navigate('/auth/setup/add-child');
      } else {
        // Individual account - go to language confirmation then experience selection
        navigate('/auth/setup/language');
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error('حدث خطأ', {
        description: 'يرجى المحاولة مرة أخرى',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-palette-off-white via-palette-light-mint/20 to-palette-medium-green/10 relative overflow-hidden">
      {/* Subtle Islamic pattern background */}
      <div className="absolute inset-0 islamic-pattern-green opacity-30" />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
        <LanguageSwitcher variant="icon" />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-palette-darker-green font-amiri mb-2">{t('auth.signUp.title')}</h1>
          <p className="text-palette-medium-gray text-sm sm:text-base font-tajawal">{t('auth.signUp.subtitle')}</p>
        </div>

        {/* Form Card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-palette-light-gray/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-palette-darker-green font-tajawal font-medium text-sm">
                  {t('auth.signUp.name')}
                </Label>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="h-12 rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal text-base"
                  placeholder={t('auth.validation.namePlaceholder')}
                  dir="rtl"
                  aria-label={t('auth.signUp.name')}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 font-tajawal flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-palette-darker-green font-tajawal font-medium text-sm">
                  {t('auth.signUp.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="h-12 rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal text-base"
                  placeholder="example@email.com"
                  dir="ltr"
                  aria-label={t('auth.signUp.email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 font-tajawal flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-palette-darker-green font-tajawal font-medium text-sm">
                  {t('auth.signUp.password')}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className="h-12 rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal text-base pr-10"
                    placeholder="••••••••"
                    aria-label={t('auth.signUp.password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-palette-medium-gray hover:text-palette-darker-green"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 font-tajawal flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {errors.password.message}
                  </p>
                )}
                
                {/* Password Strength Indicator */}
                {password && passwordStrength && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-palette-light-gray rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength.strength === 'strong'
                              ? 'bg-green-500 w-full'
                              : passwordStrength.strength === 'medium'
                              ? 'bg-yellow-500 w-2/3'
                              : 'bg-red-500 w-1/3'
                          }`}
                        />
                      </div>
                      <span className={`text-xs font-tajawal font-medium ${
                        passwordStrength.strength === 'strong'
                          ? 'text-green-600'
                          : passwordStrength.strength === 'medium'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {passwordStrength.strength === 'strong' ? 'قوي' : passwordStrength.strength === 'medium' ? 'متوسط' : 'ضعيف'}
                      </span>
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="text-xs text-palette-medium-gray font-tajawal space-y-1 pr-4">
                        {passwordStrength.feedback.map((msg, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-red-400 mt-0.5">•</span>
                            <span>{msg}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-palette-darker-green font-tajawal font-medium text-sm">
                  {t('auth.signUp.confirmPassword')}
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    className="h-12 rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal text-base pr-10"
                    placeholder="••••••••"
                    aria-label={t('auth.signUp.confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-palette-medium-gray hover:text-palette-darker-green"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 font-tajawal flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    {errors.confirmPassword.message}
                  </p>
                )}
                {watch('confirmPassword') && watch('password') === watch('confirmPassword') && (
                  <p className="text-sm text-green-600 font-tajawal flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    كلمات المرور متطابقة
                  </p>
                )}
              </div>

              {/* Parent Account Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-palette-off-white/50 rounded-xl border border-palette-light-gray/50">
                <Checkbox
                  id="isParent"
                  checked={isParent}
                  onCheckedChange={(checked) => setValue('isParent', checked as boolean)}
                  className="mt-1"
                />
                <Label
                  htmlFor="isParent"
                  className="text-sm text-palette-darker-green font-tajawal font-medium cursor-pointer leading-relaxed"
                >
                  أنا ولي أمر / Parent Account
                </Label>
              </div>

              {/* Language Selector (Optional) */}
              <div className="space-y-2">
                <Label className="text-palette-darker-green font-tajawal font-medium text-sm">
                  {t('auth.signUp.language')} <span className="text-palette-medium-gray font-normal">(اختياري)</span>
                </Label>
                <Select
                  value={watch('language')}
                  onValueChange={(value) => setValue('language', value)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal" dir="rtl">
                    <SelectValue placeholder={t('auth.validation.selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ur">اردو</SelectItem>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal mt-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    {t('auth.validation.creating')}
                  </>
                ) : (
                  <>
                    {t('auth.signUp.createAccount')}
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <Link
                to="/auth/login"
                className="text-sm text-palette-darker-green hover:underline font-tajawal"
              >
                {t('auth.signUp.alreadyHaveAccount')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

