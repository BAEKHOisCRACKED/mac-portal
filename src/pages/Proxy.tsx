import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';
import { Globe, ExternalLink } from 'lucide-react';

const proxies = [
  { name: 'ultraviolet', description: 'standard web interface' },
  { name: 'rammerhead', description: 'session-based interface' },
  { name: 'dynamic', description: 'lightweight interface' },
];

export default function Proxy() {
  const { settings } = useSettings();
  const [url, setUrl] = useState('');
  const [activeProxy, setActiveProxy] = useState<string | null>(null);

  return (
    <div>
      <div className={cn(
        'mb-12',
        settings.enhancedAnimations && 'animate-fade-in'
      )}>
        <h1 className={cn(
          'text-3xl font-medium mb-2 lowercase',
          settings.glowEnabled && 'glow-text'
        )}>
          web interface
        </h1>
        <p className="text-muted-foreground lowercase">
          secure browsing utilities
        </p>
      </div>

      {/* URL Input */}
      <div className={cn(
        'glass-card p-6 mb-8',
        settings.enhancedAnimations && 'animate-slide-up',
        settings.glowEnabled && 'glow'
      )}>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="enter url or search..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={cn(
                'w-full bg-secondary/50 rounded-xl py-3 pl-12 pr-4',
                'text-foreground placeholder:text-muted-foreground lowercase',
                'border border-border focus:border-primary outline-none',
                'transition-all duration-300'
              )}
            />
          </div>
          <button
            className={cn(
              'px-6 py-3 rounded-xl bg-primary/20 hover:bg-primary/30',
              'font-button text-primary lowercase',
              'transition-all duration-300',
              settings.enhancedAnimations && 'active:scale-95 animate-ripple',
              settings.glowEnabled && 'hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]'
            )}
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Proxy options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {proxies.map((proxy, index) => (
          <button
            key={proxy.name}
            onClick={() => setActiveProxy(proxy.name)}
            className={cn(
              'glass-card p-6 text-left',
              'transition-all',
              settings.enhancedAnimations ? 'duration-400 animate-slide-up' : 'duration-200',
              settings.enhancedAnimations && 'hover:scale-105 active:scale-95 animate-ripple',
              activeProxy === proxy.name && 'border-primary',
              settings.glowEnabled && activeProxy === proxy.name && 'glow'
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className={cn(
              'font-button text-lg mb-2 lowercase',
              activeProxy === proxy.name && 'text-primary'
            )}>
              {proxy.name}
            </h3>
            <p className="text-sm text-muted-foreground lowercase">
              {proxy.description}
            </p>
          </button>
        ))}
      </div>

      {/* Proxy frame placeholder */}
      {activeProxy && (
        <div className={cn(
          'mt-8 glass-card p-4 aspect-video',
          settings.enhancedAnimations && 'animate-scale-in'
        )}>
          <div className="w-full h-full bg-secondary/30 rounded-xl flex items-center justify-center">
            <p className="text-muted-foreground lowercase">
              {activeProxy} interface ready
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
