import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface AudioPlayerProps {
  text: string;
  language?: string;
  className?: string;
  variant?: 'kids' | 'adults';
}

const AudioPlayer = ({ text, language = 'ar', className = '', variant = 'adults' }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (synthRef.current && isPlaying) {
        synthRef.current.cancel();
      }
    };
  }, [isPlaying]);

  const getVoice = () => {
    if (!synthRef.current) return null;
    
    const voices = synthRef.current.getVoices();
    // Try to find a voice matching the language
    const langCode = language === 'ar' ? 'ar' : 
                     language === 'en' ? 'en' : 
                     language === 'fr' ? 'fr' : 
                     language === 'ur' ? 'ur' : 'id';
    
    // Find voice by language code
    let voice = voices.find(v => v.lang.startsWith(langCode));
    
    // Fallback to any available voice
    if (!voice && voices.length > 0) {
      voice = voices[0];
    }
    
    return voice;
  };

  const handlePlay = () => {
    if (!synthRef.current) {
      // Fallback: show message that audio is not supported
      alert(t('audio.notSupported') || 'Audio playback is not supported in your browser');
      return;
    }

    if (isPlaying) {
      // Pause/Stop
      synthRef.current.cancel();
      setIsPlaying(false);
    } else {
      // Play
      setIsLoading(true);
      
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getVoice();
      
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.lang = language === 'ar' ? 'ar-SA' : 
                       language === 'en' ? 'en-US' : 
                       language === 'fr' ? 'fr-FR' : 
                       language === 'ur' ? 'ur-PK' : 'id-ID';
      
      utterance.rate = variant === 'kids' ? 0.8 : 0.9;
      utterance.pitch = variant === 'kids' ? 1.2 : 1.0;
      utterance.volume = isMuted ? 0 : 1;
      
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsLoading(false);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
      };
      
      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (synthRef.current && utteranceRef.current) {
      // Restart with new volume
      synthRef.current.cancel();
      handlePlay();
    }
  };

  // Load voices when component mounts
  useEffect(() => {
    if (synthRef.current) {
      // Chrome needs this to load voices
      const loadVoices = () => {
        synthRef.current?.getVoices();
      };
      loadVoices();
      synthRef.current.onvoiceschanged = loadVoices;
    }
  }, []);

  const buttonClass = variant === 'kids' 
    ? 'bg-gradient-to-br from-kids-green to-kids-blue text-white hover:from-kids-green/90 hover:to-kids-blue/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
    : 'bg-adults-gold text-white hover:bg-adults-gold/90 rounded-xl shadow-md hover:shadow-lg transition-all duration-300';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        onClick={handlePlay}
        disabled={isLoading}
        size="sm"
        className={buttonClass}
        aria-label={isPlaying ? t('audio.pause') || 'Pause' : t('audio.play') || 'Play'}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>
      
      <Button
        onClick={handleMute}
        variant="ghost"
        size="sm"
        className="p-2 hover:bg-muted/50 rounded-full"
        aria-label={isMuted ? t('audio.unmute') || 'Unmute' : t('audio.mute') || 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Volume2 className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
};

export default AudioPlayer;

