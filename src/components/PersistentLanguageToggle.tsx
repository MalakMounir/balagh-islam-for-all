import LanguageSwitcher from '@/components/LanguageSwitcher';
import AccessibilityControls from '@/components/AccessibilityControls';
import { useApp } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Globe, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PersistentLanguageToggleProps {
  className?: string;
  variant?: 'kids' | 'adults';
}

const PersistentLanguageToggle = ({ className = '', variant }: PersistentLanguageToggleProps) => {
  const { experience } = useApp();
  const isMobile = useIsMobile();
  const currentVariant = variant || (experience === 'kids' ? 'kids' : 'adults');
  
  // On mobile, show in a bottom sheet or menu
  if (isMobile) {
    return (
      <div className={`fixed top-4 left-4 z-50 ${className}`}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-border/50 hover:bg-white"
              aria-label="Language and Settings"
            >
              <Globe className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-bold font-tajawal">الإعدادات</h3>
              </div>
              <div className="space-y-3">
                <LanguageSwitcher variant="button" />
                <AccessibilityControls variant={currentVariant} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
  
  // On tablet/desktop, show inline
  return (
    <div className={`fixed top-4 left-4 z-50 flex items-center gap-2 ${className}`}>
      <LanguageSwitcher variant="icon" />
      <AccessibilityControls variant={currentVariant} />
    </div>
  );
};

export default PersistentLanguageToggle;

