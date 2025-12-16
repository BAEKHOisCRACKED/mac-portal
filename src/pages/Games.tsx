import { ImageCard } from '@/components/ImageCard';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

const games = [
  { title: 'tetris', subtitle: 'block simulation', image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?w=600&q=80' },
  { title: 'snake', subtitle: 'growth module', image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&q=80' },
  { title: '2048', subtitle: 'number environment', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80' },
  { title: 'flappy', subtitle: 'navigation sim', image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&q=80' },
  { title: 'pong', subtitle: 'physics module', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80' },
  { title: 'minesweeper', subtitle: 'logic environment', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80' },
  { title: 'chess', subtitle: 'strategy simulation', image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80' },
  { title: 'sudoku', subtitle: 'pattern module', image: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=600&q=80' },
];

export default function Games() {
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
          interactive modules
        </h1>
        <p className="text-muted-foreground lowercase">
          simulations and environments
        </p>
      </div>

      <div className={cn(
        'grid gap-6',
        settings.layoutDensity === 'compact'
          ? 'grid-cols-2 md:grid-cols-4 gap-4'
          : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
      )}>
        {games.map((game, index) => (
          <div
            key={game.title}
            className={settings.enhancedAnimations ? 'animate-slide-up' : ''}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ImageCard
              title={game.title}
              subtitle={game.subtitle}
              image={game.image}
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
