import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  title: string;
  image: string;
  href?: string;
  onClick?: () => void;
  subtitle?: string;
}

export function ImageCard({ title, image, href, onClick, subtitle }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { settings } = useSettings();

  const content = (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl cursor-pointer group',
        'transition-all',
        settings.enhancedAnimations ? 'duration-400' : 'duration-200',
        settings.glowEnabled && isHovered && 'glow'
      )}
      style={{
        transform: isHovered ? `scale(${settings.enhancedAnimations ? 1.08 : 1.03})` : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="aspect-[4/3] overflow-hidden bg-card">
        <img
          src={image}
          alt={title}
          className={cn(
            'w-full h-full object-cover object-top',
            'transition-all',
            settings.enhancedAnimations ? 'duration-500' : 'duration-300'
          )}
          style={{
            filter: isHovered ? 'blur(8px)' : 'blur(0px)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      </div>

      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-background/70 flex flex-col items-center justify-center',
          'transition-opacity',
          settings.enhancedAnimations ? 'duration-400' : 'duration-200'
        )}
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <span className={cn(
          'font-button text-xl text-foreground lowercase',
          settings.glowEnabled && 'glow-text'
        )}>
          {title}
        </span>
        {subtitle && (
          <span className="text-sm text-muted-foreground mt-1 lowercase">
            {subtitle}
          </span>
        )}
      </div>

      {/* Border glow effect */}
      {settings.glowEnabled && (
        <div
          className={cn(
            'absolute inset-0 rounded-2xl pointer-events-none',
            'transition-opacity duration-400'
          )}
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: 'inset 0 0 0 1px hsl(var(--primary) / 0.5)',
          }}
        />
      )}
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return <div onClick={onClick}>{content}</div>;
}
