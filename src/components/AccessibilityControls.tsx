import { useState, useEffect } from 'react';
import { Settings, Type, Eye, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

interface AccessibilityControlsProps {
  variant?: 'kids' | 'adults';
}

const AccessibilityControls = ({ variant = 'adults' }: AccessibilityControlsProps) => {
  const { t } = useTranslation();
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  useEffect(() => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Screen reader announcements
    if (screenReader) {
      document.documentElement.setAttribute('aria-live', 'polite');
    } else {
      document.documentElement.removeAttribute('aria-live');
    }
    
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [fontSize, highContrast, screenReader]);

  const buttonClass = variant === 'kids'
    ? 'bg-gradient-to-br from-kids-green to-kids-blue text-white hover:from-kids-green/90 hover:to-kids-blue/90 rounded-full shadow-lg'
    : 'bg-adults-gold text-white hover:bg-adults-gold/90 rounded-xl shadow-md';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className={buttonClass}
          aria-label={t('accessibility.settings') || 'Accessibility Settings'}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" dir="rtl">
        <div className="space-y-4">
          <h3 className="font-bold text-foreground font-amiri mb-4">
            {t('accessibility.title') || 'إعدادات إمكانية الوصول'}
          </h3>
          
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-muted-foreground" />
              <Label className="font-tajawal">
                {t('accessibility.fontSize') || 'حجم الخط'}
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-tajawal">12px</span>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={12}
                max={24}
                step={2}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground font-tajawal">24px</span>
            </div>
            <p className="text-xs text-muted-foreground font-tajawal text-center">
              {fontSize}px
            </p>
          </div>
          
          {/* High Contrast */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <Label className="font-tajawal cursor-pointer">
                {t('accessibility.highContrast') || 'تباين عالي'}
              </Label>
            </div>
            <Switch
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>
          
          {/* Screen Reader */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <Label className="font-tajawal cursor-pointer">
                {t('accessibility.screenReader') || 'قارئ الشاشة'}
              </Label>
            </div>
            <Switch
              checked={screenReader}
              onCheckedChange={setScreenReader}
            />
          </div>
          
          <p className="text-xs text-muted-foreground font-tajawal text-center pt-2 border-t">
            {t('accessibility.note') || 'الإعدادات تُطبق فوراً على جميع الصفحات'}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilityControls;

