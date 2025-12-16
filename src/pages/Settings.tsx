import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';
import { Check, Palette, Layout, Sparkles, Type, MonitorCog } from 'lucide-react';

const accentColors = [
  { id: 'blue', label: 'blue', color: 'hsl(239, 84%, 67%)' },
  { id: 'purple', label: 'purple', color: 'hsl(270, 70%, 60%)' },
  { id: 'cyan', label: 'cyan', color: 'hsl(185, 80%, 55%)' },
  { id: 'rose', label: 'rose', color: 'hsl(350, 70%, 60%)' },
] as const;

const backgrounds = [
  { id: 'solid', label: 'solid' },
  { id: 'gradient', label: 'animated gradient' },
  { id: 'particles', label: 'particles' },
  { id: 'grid', label: 'grid' },
] as const;

export default function Settings() {
  const { settings, updateSettings } = useSettings();

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
          settings
        </h1>
        <p className="text-muted-foreground lowercase">
          system preferences
        </p>
      </div>

      <div className="space-y-8 max-w-2xl">
        {/* Accent Color */}
        <section className={cn(
          'glass-card p-6',
          settings.enhancedAnimations && 'animate-slide-up'
        )}>
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="font-medium lowercase">accent color</h2>
          </div>
          <div className="flex gap-3">
            {accentColors.map((color) => (
              <button
                key={color.id}
                onClick={() => updateSettings({ accentColor: color.id })}
                className={cn(
                  'w-12 h-12 rounded-xl relative',
                  'transition-all',
                  settings.enhancedAnimations ? 'duration-300 hover:scale-110 active:scale-95 animate-ripple' : 'duration-200',
                  settings.accentColor === color.id && settings.glowEnabled && 'shadow-[0_0_20px_var(--tw-shadow-color)]'
                )}
                style={{ 
                  backgroundColor: color.color,
                  '--tw-shadow-color': color.color,
                } as React.CSSProperties}
              >
                {settings.accentColor === color.id && (
                  <Check className={cn(
                    'w-5 h-5 absolute inset-0 m-auto text-white',
                    settings.enhancedAnimations && 'check-animate'
                  )} />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Layout Density */}
        <section className={cn(
          'glass-card p-6',
          settings.enhancedAnimations && 'animate-slide-up'
        )} style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Layout className="w-5 h-5 text-primary" />
            <h2 className="font-medium lowercase">layout density</h2>
          </div>
          <div className="flex gap-3">
            {(['compact', 'comfortable'] as const).map((density) => (
              <button
                key={density}
                onClick={() => updateSettings({ layoutDensity: density })}
                className={cn(
                  'px-6 py-3 rounded-xl',
                  'font-button text-sm lowercase',
                  'transition-all',
                  settings.enhancedAnimations ? 'duration-300 hover:scale-105 active:scale-95 animate-ripple' : 'duration-200',
                  settings.layoutDensity === density
                    ? 'bg-primary/20 text-primary' + (settings.glowEnabled ? ' shadow-[0_0_15px_hsl(var(--primary)/0.3)]' : '')
                    : 'bg-secondary hover:bg-secondary/80'
                )}
              >
                {density}
              </button>
            ))}
          </div>
        </section>

        {/* Background Style */}
        <section className={cn(
          'glass-card p-6',
          settings.enhancedAnimations && 'animate-slide-up'
        )} style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-4">
            <MonitorCog className="w-5 h-5 text-primary" />
            <h2 className="font-medium lowercase">background style</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                onClick={() => updateSettings({ backgroundStyle: bg.id })}
                className={cn(
                  'px-4 py-3 rounded-xl',
                  'font-button text-sm lowercase',
                  'transition-all',
                  settings.enhancedAnimations ? 'duration-300 hover:scale-105 active:scale-95 animate-ripple' : 'duration-200',
                  settings.backgroundStyle === bg.id
                    ? 'bg-primary/20 text-primary' + (settings.glowEnabled ? ' shadow-[0_0_15px_hsl(var(--primary)/0.3)]' : '')
                    : 'bg-secondary hover:bg-secondary/80'
                )}
              >
                {bg.label}
              </button>
            ))}
          </div>
        </section>

        {/* Effects */}
        <section className={cn(
          'glass-card p-6',
          settings.enhancedAnimations && 'animate-slide-up'
        )} style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-medium lowercase">effects</h2>
          </div>
          <div className="space-y-4">
            <ToggleSetting
              label="glow effects"
              description="adds glow to accent elements"
              checked={settings.glowEnabled}
              onChange={(checked) => updateSettings({ glowEnabled: checked })}
            />
            <ToggleSetting
              label="enhanced animations"
              description="smoother, more dynamic interactions"
              checked={settings.enhancedAnimations}
              onChange={(checked) => updateSettings({ enhancedAnimations: checked })}
            />
          </div>
        </section>

        {/* Tab Name */}
        <section className={cn(
          'glass-card p-6',
          settings.enhancedAnimations && 'animate-slide-up'
        )} style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Type className="w-5 h-5 text-primary" />
            <h2 className="font-medium lowercase">tab name</h2>
          </div>
          <input
            type="text"
            value={settings.tabName}
            onChange={(e) => updateSettings({ tabName: e.target.value })}
            placeholder="enter tab name..."
            className={cn(
              'w-full bg-secondary/50 rounded-xl py-3 px-4',
              'text-foreground placeholder:text-muted-foreground lowercase',
              'border border-border focus:border-primary outline-none',
              'transition-all duration-300'
            )}
          />
          <p className="text-xs text-muted-foreground mt-2 lowercase">
            changes the browser tab title
          </p>
        </section>
      </div>
    </div>
  );
}

function ToggleSetting({ 
  label, 
  description, 
  checked, 
  onChange 
}: { 
  label: string; 
  description: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
}) {
  const { settings } = useSettings();

  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between text-left"
    >
      <div>
        <p className="font-medium lowercase">{label}</p>
        <p className="text-sm text-muted-foreground lowercase">{description}</p>
      </div>
      <div className={cn(
        'w-12 h-7 rounded-full relative',
        'transition-all',
        settings.enhancedAnimations ? 'duration-300' : 'duration-200',
        checked 
          ? 'bg-primary' + (settings.glowEnabled ? ' shadow-[0_0_15px_hsl(var(--primary)/0.4)]' : '')
          : 'bg-secondary'
      )}>
        <div className={cn(
          'w-5 h-5 rounded-full bg-foreground absolute top-1',
          'transition-all',
          settings.enhancedAnimations ? 'duration-300' : 'duration-200',
          checked ? 'left-6' : 'left-1'
        )}>
          {checked && (
            <Check className={cn(
              'w-3 h-3 absolute inset-0 m-auto text-primary',
              settings.enhancedAnimations && 'check-animate'
            )} />
          )}
        </div>
      </div>
    </button>
  );
}
