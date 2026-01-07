import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Eye, EyeOff, Chrome, Apple, Loader2 } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

type LoginFormData = z.infer<ReturnType<typeof getLoginSchema>>;

const getLoginSchema = (t: any) => z.object({
  email: z.string().email(t('auth.validation.emailInvalid')),
  password: z.string().min(1, t('auth.validation.passwordRequired')),
  rememberMe: z.boolean().default(false),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { login } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const loginSchema = getLoginSchema(t);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    
    try {
      // Use the fake login from context (includes 500ms delay)
      const userData = await login(data.email, data.password);
      
      // Show success toast
      toast.success('تم تسجيل الدخول بنجاح', {
        description: `مرحباً ${userData.name || 'بك'}!`,
        duration: 3000,
      });
      
      setIsSubmitting(false);
      
      // Handle redirect
      const from = (location.state as any)?.from?.pathname || null;
      
      if (userData.isFirstTime) {
        // First time user - go to language confirmation
        navigate('/auth/setup/language');
      } else if (from && from !== '/auth' && from !== '/auth/login') {
        // Redirect to the page they were trying to access
        navigate(from);
      } else {
        // Returning user - go to experience selection
        navigate('/select-experience');
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error('حدث خطأ', {
        description: 'يرجى المحاولة مرة أخرى',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-palette-off-white via-palette-light-mint/20 to-palette-medium-green/10 relative overflow-hidden w-full">
      <div className="absolute inset-0 islamic-pattern-green opacity-30" />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
        <LanguageSwitcher variant="icon" />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 py-6 sm:py-8 md:py-12 w-full">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-palette-darker-green font-amiri mb-2">{t('auth.login.title')}</h1>
          <p className="text-palette-medium-gray text-xs sm:text-sm md:text-base font-tajawal">{t('auth.login.subtitle')}</p>
        </div>

        <div className="flex-1 flex items-center justify-center w-full">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-palette-light-gray/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-palette-darker-green font-tajawal font-medium text-sm">
                  {t('auth.login.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="h-11 sm:h-12 rounded-lg sm:rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal text-sm sm:text-base min-h-[44px]"
                  placeholder="example@email.com"
                  dir="ltr"
                  aria-label={t('auth.login.email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 font-tajawal">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-palette-darker-green font-tajawal font-medium text-sm">
                  {t('auth.login.password')}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className="h-11 sm:h-12 rounded-lg sm:rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal text-sm sm:text-base pr-10 min-h-[44px]"
                    placeholder="••••••••"
                    aria-label={t('auth.login.password')}
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
                  <p className="text-sm text-red-500 font-tajawal">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={watch('rememberMe')}
                    onCheckedChange={(checked) => setValue('rememberMe', checked as boolean)}
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm text-palette-darker-green font-tajawal font-medium cursor-pointer"
                  >
                    تذكرني
                  </Label>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-palette-darker-green hover:underline font-tajawal"
                >
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal mt-4 min-h-[44px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    {t('auth.validation.loggingIn')}
                  </>
                ) : (
                  <>
                    {t('auth.login.loginButton')}
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </>
                )}
              </Button>

              {/* Social Login */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-palette-light-gray" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-palette-medium-gray font-tajawal">{t('auth.login.or')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // TODO: Implement Google OAuth
                    console.log('Google login');
                  }}
                  className="w-full h-11 sm:h-12 rounded-lg sm:rounded-xl border-2 border-palette-light-gray hover:bg-palette-off-white text-palette-darker-green font-medium font-tajawal min-h-[44px] text-sm sm:text-base"
                >
                  <Chrome className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  {t('auth.login.continueWithGoogle')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // TODO: Implement Apple OAuth
                    console.log('Apple login');
                  }}
                  className="w-full h-11 sm:h-12 rounded-lg sm:rounded-xl border-2 border-palette-light-gray hover:bg-palette-off-white text-palette-darker-green font-medium font-tajawal min-h-[44px] text-sm sm:text-base"
                >
                  <Apple className="ml-2 h-5 w-5" />
                  {t('auth.login.continueWithApple')}
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <Link
                to="/auth/signup"
                className="text-sm text-palette-darker-green hover:underline font-tajawal"
              >
                {t('auth.login.noAccount')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

