import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

export function MusicPlayer() {
  const { currentTrack, isPlaying, toggle, next, previous } = useMusic();
  const { settings } = useSettings();

  return (
    <div className={cn(
      'fixed bottom-4 left-4 z-50',
      'glass-card p-3 min-w-[200px]',
      settings.glowEnabled && 'glow',
      settings.enhancedAnimations && 'transition-all duration-400'
    )}>
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={cn(
          'w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center',
          isPlaying && 'animate-pulse-glow'
        )}>
          <Music className="w-5 h-5 text-primary" />
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate lowercase">
            {currentTrack?.title || 'no track'}
          </p>
          <p className="text-xs text-muted-foreground truncate lowercase">
            {currentTrack?.artist || 'unknown'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={previous}
            className={cn(
              'p-2 rounded-lg hover:bg-secondary transition-all',
              settings.enhancedAnimations && 'active:scale-90 duration-200'
            )}
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={toggle}
            className={cn(
              'p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-all',
              settings.enhancedAnimations && 'active:scale-90 duration-200',
              settings.glowEnabled && isPlaying && 'shadow-[0_0_15px_hsl(var(--primary)/0.4)]'
            )}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-primary" />
            ) : (
              <Play className="w-4 h-4 text-primary" />
            )}
          </button>
          <button
            onClick={next}
            className={cn(
              'p-2 rounded-lg hover:bg-secondary transition-all',
              settings.enhancedAnimations && 'active:scale-90 duration-200'
            )}
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
