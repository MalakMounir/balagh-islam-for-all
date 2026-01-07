import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { toast } from 'sonner';

type ChildFormData = z.infer<ReturnType<typeof getChildSchema>>;

const getChildSchema = (t: any) => z.object({
  name: z.string().min(2, t('auth.validation.childNameMin')),
  age: z.string().min(1, t('auth.validation.ageRequired')),
  avatar: z.string().min(1, t('auth.validation.avatarRequired')),
});

const avatars = ['🧒', '👧', '🧒🏻', '👧🏻', '🧒🏼', '👧🏼', '🧒🏽', '👧🏽', '🧒🏾', '👧🏾', '🧒🏿', '👧🏿'];

const AddChildProfile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addChildProfile } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  
  const childSchema = getChildSchema(t);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ChildFormData>({
    resolver: zodResolver(childSchema),
  });

  const onSubmit = async (data: ChildFormData) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add child profile to context (this also updates localStorage and hasChildren)
    const childProfile = {
      id: Date.now().toString(),
      name: data.name,
      age: data.age,
      avatar: data.avatar,
    };
    
    addChildProfile(childProfile);
    
    // Show success toast
    toast.success('تم إضافة الطفل بنجاح', {
      description: `${data.name} - ${data.age} سنوات`,
      duration: 3000,
    });
    
    setIsSubmitting(false);
    
    // Navigate to experience selection (first-time setup complete)
    navigate('/select-experience');
  };

  const handleAddAnother = async (data: ChildFormData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const childProfile = {
      id: Date.now().toString(),
      name: data.name,
      age: data.age,
      avatar: data.avatar,
    };
    
    addChildProfile(childProfile);
    
    // Show success toast
    toast.success('تم إضافة الطفل', {
      description: `${data.name} - يمكنك إضافة طفل آخر`,
      duration: 2000,
    });
    
    // Reset form
    setValue('name', '');
    setValue('age', '');
    setValue('avatar', '');
    setSelectedAvatar('');
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
          <h1 className="text-2xl sm:text-3xl font-bold text-palette-darker-green font-amiri mb-2">{t('auth.setup.addChild.title')}</h1>
          <p className="text-palette-medium-gray text-sm sm:text-base font-tajawal">{t('auth.setup.addChild.subtitle')}</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-palette-light-gray/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Child Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-palette-darker-green font-tajawal font-medium text-sm">
                  {t('auth.setup.addChild.childName')}
                </Label>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="h-12 rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal text-base"
                  placeholder={t('auth.validation.childNamePlaceholder')}
                  dir="rtl"
                  aria-label={t('auth.setup.addChild.childName')}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 font-tajawal">{errors.name.message}</p>
                )}
              </div>

              {/* Age Selection */}
              <div className="space-y-2">
                <Label className="text-palette-darker-green font-tajawal font-medium text-sm">
                  العمر
                </Label>
                <Select
                  value={watch('age')}
                  onValueChange={(value) => setValue('age', value)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-2 border-palette-light-gray focus:border-palette-darker-green font-tajawal" dir="rtl">
                    <SelectValue placeholder="اختر العمر" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectItem value="5-7">5–7 سنوات</SelectItem>
                    <SelectItem value="8-10">8–10 سنوات</SelectItem>
                    <SelectItem value="11-12">11–12 سنة</SelectItem>
                  </SelectContent>
                </Select>
                {errors.age && (
                  <p className="text-sm text-red-500 font-tajawal">{errors.age.message}</p>
                )}
              </div>

              {/* Avatar Selection */}
              <div className="space-y-3">
                <Label className="text-palette-darker-green font-tajawal font-medium text-sm">
                  اختر الصورة الرمزية
                </Label>
                <div className="grid grid-cols-6 gap-3">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setValue('avatar', avatar);
                      }}
                      className={`w-14 h-14 rounded-2xl text-3xl flex items-center justify-center transition-all duration-300 ${
                        selectedAvatar === avatar
                          ? 'ring-4 ring-palette-darker-green ring-offset-2 scale-110 bg-palette-off-white'
                          : 'hover:scale-105 bg-palette-off-white hover:bg-palette-light-mint/20'
                      }`}
                      aria-label={`Select avatar ${avatar}`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
                {errors.avatar && (
                  <p className="text-sm text-red-500 font-tajawal">{errors.avatar.message}</p>
                )}
              </div>

              {/* Security Message */}
              <div className="bg-palette-light-mint/20 rounded-xl p-4 border border-palette-medium-green/30">
                <p className="text-sm text-palette-darker-green font-tajawal text-center">
                  <span className="font-bold">محتوى آمن ومناسب للأطفال</span>
                  <br />
                  <span className="text-xs mt-1 block text-palette-medium-gray">الطفل لا يمكنه الخروج أو تغيير الإعدادات</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl bg-palette-darker-green hover:bg-palette-medium-green text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-tajawal"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري الإضافة...
                    </>
                  ) : (
                    <>
                      إضافة الطفل والمتابعة
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSubmit(handleAddAnother)}
                  className="w-full h-12 rounded-xl border-2 border-palette-darker-green text-palette-darker-green hover:bg-palette-darker-green/10 font-tajawal"
                >
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة طفل آخر
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/select-experience')}
                  className="w-full h-12 rounded-xl text-palette-medium-gray hover:bg-palette-off-white font-tajawal"
                >
                  تخطي الآن
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChildProfile;

