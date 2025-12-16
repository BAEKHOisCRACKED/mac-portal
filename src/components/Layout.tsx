import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { MusicPlayer } from './MusicPlayer';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'home' },
  { path: '/games', label: 'games' },
  { path: '/apps', label: 'apps' },
  { path: '/proxy', label: 'proxy' },
  { path: '/widgets', label: 'widgets' },
  { path: '/movies', label: 'movies' },
  { path: '/settings', label: 'settings' },
];

export function Layout({ children }: { children: ReactNode }) {
  const { settings } = useSettings();

  const bgClass = {
    solid: '',
    gradient: 'bg-gradient-animated',
    particles: 'bg-particles',
    grid: 'bg-grid',
  }[settings.backgroundStyle];

  return (
    <div className={cn(
      'min-h-screen bg-background text-foreground relative',
      bgClass,
      settings.backgroundStyle === 'solid' && 'bg-noise'
    )}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="glass-card mx-4 mt-4 px-6 py-3">
          <div className="flex items-center justify-center gap-8">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  'text-sm font-medium transition-all duration-300 lowercase tracking-wide',
                  'hover:text-primary',
                  isActive 
                    ? 'text-primary' + (settings.glowEnabled ? ' glow-text' : '')
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className={cn(
        'pt-24 pb-32 px-4',
        settings.layoutDensity === 'compact' ? 'max-w-5xl' : 'max-w-6xl',
        'mx-auto'
      )}>
        {children}
      </main>

      {/* Music player */}
      <MusicPlayer />
    </div>
  );
}
