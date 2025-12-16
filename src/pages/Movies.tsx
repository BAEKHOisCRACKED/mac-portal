import { useState } from 'react';
import { ImageCard } from '@/components/ImageCard';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';
import { Search, Film } from 'lucide-react';

const movies = [
  { title: 'inception', year: '2010', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80' },
  { title: 'interstellar', year: '2014', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80' },
  { title: 'the matrix', year: '1999', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80' },
  { title: 'blade runner', year: '2017', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80' },
  { title: 'dune', year: '2021', image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=600&q=80' },
  { title: 'tenet', year: '2020', image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&q=80' },
  { title: 'arrival', year: '2016', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80' },
  { title: 'gravity', year: '2013', image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=600&q=80' },
];

export default function Movies() {
  const { settings } = useSettings();
  const [search, setSearch] = useState('');

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase())
  );

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
          movies
        </h1>
        <p className="text-muted-foreground lowercase">
          streaming library
        </p>
      </div>

      {/* Search */}
      <div className={cn(
        'glass-card p-4 mb-8',
        settings.enhancedAnimations && 'animate-slide-up',
        settings.glowEnabled && 'glow'
      )}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              'w-full bg-secondary/50 rounded-xl py-3 pl-12 pr-4',
              'text-foreground placeholder:text-muted-foreground lowercase',
              'border border-border focus:border-primary outline-none',
              'transition-all duration-300'
            )}
          />
        </div>
      </div>

      {/* Movies grid */}
      {filteredMovies.length > 0 ? (
        <div className={cn(
          'grid gap-6',
          settings.layoutDensity === 'compact'
            ? 'grid-cols-2 md:grid-cols-4 gap-4'
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
        )}>
          {filteredMovies.map((movie, index) => (
            <div
              key={movie.title}
              className={settings.enhancedAnimations ? 'animate-slide-up' : ''}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ImageCard
                title={movie.title}
                subtitle={movie.year}
                image={movie.image}
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Film className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground lowercase">no movies found</p>
        </div>
      )}
    </div>
  );
}
