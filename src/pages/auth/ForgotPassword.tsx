import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type ForgotPasswordFormData = z.infer<ReturnType<typeof getForgotPasswordSchema>>;

const getForgotPasswordSchema = (t: any) => z.object({
  email: z.string().email(t('auth.validation.emailInvalid')),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const forgotPasswordSchema = getForgotPasswordSchema(t);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-palette-off-white via-palette-light-mint/20 to-palette-medium-green/10 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-green opacity-30" />
        
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
          <LanguageSwitcher variant="icon" />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-palette-light-gray/50 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-green-600">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-palette-darker-green font-amiri mb-2">
                  {t('auth.forgotPassword.linkSent')}
                </h2>
                <p className="text-palette-medium-gray font-tajawal">
                  {t('auth.forgotPassword.checkEmail')}
                </p>
              </div>
              
              <Button
                onClick={() => navigate('/auth/login')}
                className="w-full h-14 rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal"
              >
                {t('auth.forgotPassword.backToLogin')}
                <ArrowLeft className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-palette-off-white via-palette-light-mint/20 to-palette-medium-green/10 relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern-green opacity-30" />
      
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
        <LanguageSwitcher variant="icon" />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-palette-darker-green font-amiri mb-2">{t('auth.forgotPassword.title')}</h1>
          <p className="text-palette-medium-gray text-sm sm:text-base font-tajawal">{t('auth.forgotPassword.subtitle')}</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-palette-light-gray/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-palette-darker-green font-tajawal font-medium text-sm">
                  {t('auth.forgotPassword.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="h-12 rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal text-base"
                  placeholder="example@email.com"
                  dir="ltr"
                  aria-label={t('auth.forgotPassword.email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 font-tajawal">{errors.email.message}</p>
                )}
              </div>

              <p className="text-sm text-palette-medium-gray font-tajawal text-center bg-palette-off-white/50 rounded-xl p-4">
                أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
              </p>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal"
              >
                {isSubmitting ? t('auth.validation.sending') : t('auth.forgotPassword.sendResetLink')}
                {!isSubmitting && <ArrowRight className="mr-2 h-5 w-5" />}
              </Button>
            </form>

            <div className="text-center mt-6">
              <Link
                to="/auth/login"
                className="text-sm text-palette-darker-green hover:underline font-tajawal inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('auth.forgotPassword.backToLogin')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

