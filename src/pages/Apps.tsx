import { ImageCard } from '@/components/ImageCard';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

const apps = [
  { title: 'notes', subtitle: 'text utility', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80' },
  { title: 'calculator', subtitle: 'math tool', image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&q=80' },
  { title: 'calendar', subtitle: 'time manager', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80' },
  { title: 'weather', subtitle: 'forecast tool', image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&q=80' },
  { title: 'converter', subtitle: 'unit utility', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80' },
  { title: 'timer', subtitle: 'countdown tool', image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=600&q=80' },
];

export default function Apps() {
  const { settings } = useSettings();

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
          utilities
        </h1>
        <p className="text-muted-foreground lowercase">
          tools and applications
        </p>
      </div>

      <div className={cn(
        'grid gap-6',
        settings.layoutDensity === 'compact'
          ? 'grid-cols-2 md:grid-cols-3 gap-4'
          : 'grid-cols-2 md:grid-cols-3 gap-6'
      )}>
        {apps.map((app, index) => (
          <div
            key={app.title}
            className={settings.enhancedAnimations ? 'animate-slide-up' : ''}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ImageCard
              title={app.title}
              subtitle={app.subtitle}
              image={app.image}
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
