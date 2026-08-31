import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(
      'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='
    );
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (enabled) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setEnabled(!enabled);
  };

  return (
    <button
      onClick={toggle}
      data-cursor="click"
      className="flex items-center gap-2 group"
      aria-label={enabled ? 'Mute audio' : 'Play audio'}
    >
      <span className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/20 group-hover:border-[#ff3b00] transition-colors">
        {enabled ? (
          <Volume2 className="w-4 h-4 text-[#ff3b00]" />
        ) : (
          <VolumeX className="w-4 h-4 text-white/60" />
        )}
        {enabled && (
          <span className="absolute inset-0 rounded-full border border-[#ff3b00] animate-ping opacity-30" />
        )}
      </span>
      <span className="text-[10px] font-display uppercase tracking-widest text-white/50 group-hover:text-white transition-colors hidden sm:block">
        {enabled ? 'Sound On' : 'Sound Off'}
      </span>
    </button>
  );
}
