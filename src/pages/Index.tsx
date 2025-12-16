import { ImageCard } from '@/components/ImageCard';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

const navCards = [
  { title: 'games', href: '/games', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80' },
  { title: 'apps', href: '/apps', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80' },
  { title: 'proxy', href: '/proxy', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80' },
  { title: 'widgets', href: '/widgets', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80' },
  { title: 'movies', href: '/movies', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80' },
  { title: 'settings', href: '/settings', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80' },
];

export default function Index() {
  const { settings } = useSettings();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      {/* Hero */}
      <div className={cn(
        'text-center mb-16',
        settings.enhancedAnimations && 'animate-fade-in'
      )}>
        <h1 className={cn(
          'text-5xl md:text-6xl font-medium mb-4 lowercase tracking-tight',
          settings.glowEnabled && 'glow-text'
        )}>
          macunlocked
        </h1>
        <p className="text-muted-foreground text-lg lowercase">
          access, simplified.
        </p>
      </div>

      {/* Navigation grid */}
      <div className={cn(
        'grid gap-6 w-full',
        settings.layoutDensity === 'compact' 
          ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4' 
          : 'grid-cols-2 md:grid-cols-3 gap-6'
      )}>
        {navCards.map((card, index) => (
          <div
            key={card.title}
            className={settings.enhancedAnimations ? 'animate-slide-up' : ''}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ImageCard
              title={card.title}
              image={card.image}
              href={card.href}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
