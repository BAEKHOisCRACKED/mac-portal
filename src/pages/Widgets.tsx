import { useState, useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';
import { Clock, Calculator, FileText, Bookmark, Timer, Calendar } from 'lucide-react';

const bookmarklets = [
  { name: 'dark reader', description: 'force dark mode on any site', code: 'javascript:(function(){...})()' },
  { name: 'read mode', description: 'clean reading view', code: 'javascript:(function(){...})()' },
  { name: 'video speed', description: 'control video playback speed', code: 'javascript:(function(){...})()' },
  { name: 'password reveal', description: 'show hidden passwords', code: 'javascript:(function(){...})()' },
  { name: 'cookie editor', description: 'view and edit cookies', code: 'javascript:(function(){...})()' },
  { name: 'element picker', description: 'inspect page elements', code: 'javascript:(function(){...})()' },
];

function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
      <p className="text-3xl font-medium lowercase">
        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
      </p>
      <p className="text-sm text-muted-foreground mt-1 lowercase">
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
      </p>
    </div>
  );
}

function TimerWidget() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <Timer className="w-8 h-8 mx-auto mb-3 text-primary" />
      <p className="text-3xl font-medium mb-4">{formatTime(seconds)}</p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={cn(
            'px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30',
            'font-button text-sm text-primary lowercase',
            'transition-all duration-300',
            settings.enhancedAnimations && 'active:scale-95 animate-ripple'
          )}
        >
          {isRunning ? 'pause' : 'start'}
        </button>
        <button
          onClick={() => { setSeconds(0); setIsRunning(false); }}
          className={cn(
            'px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80',
            'font-button text-sm lowercase',
            'transition-all duration-300',
            settings.enhancedAnimations && 'active:scale-95'
          )}
        >
          reset
        </button>
      </div>
    </div>
  );
}

function NotesWidget() {
  const [note, setNote] = useState(() => localStorage.getItem('macunlocked-note') || '');

  useEffect(() => {
    localStorage.setItem('macunlocked-note', note);
  }, [note]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-5 h-5 text-primary" />
        <span className="font-medium lowercase">quick notes</span>
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="type your notes here..."
        className={cn(
          'w-full h-24 bg-secondary/50 rounded-lg p-3',
          'text-sm text-foreground placeholder:text-muted-foreground lowercase',
          'border border-border focus:border-primary outline-none',
          'resize-none transition-colors duration-300'
        )}
      />
    </div>
  );
}

function CalculatorWidget() {
  const [display, setDisplay] = useState('0');
  const { settings } = useSettings();

  const handleClick = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
    } else if (val === '=') {
      try {
        setDisplay(String(eval(display)));
      } catch {
        setDisplay('error');
      }
    } else {
      setDisplay(display === '0' ? val : display + val);
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-5 h-5 text-primary" />
        <span className="font-medium lowercase">calculator</span>
      </div>
      <div className="bg-secondary/50 rounded-lg p-2 mb-2 text-right text-xl font-medium">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={cn(
              'p-2 rounded-lg text-sm font-medium',
              'transition-all duration-200',
              btn === '=' ? 'bg-primary/20 text-primary' : 'bg-secondary/50 hover:bg-secondary',
              settings.enhancedAnimations && 'active:scale-90'
            )}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Widgets() {
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
          widgets
        </h1>
        <p className="text-muted-foreground lowercase">
          dashboard utilities
        </p>
      </div>

      {/* Main widgets */}
      <div className={cn(
        'grid gap-6 mb-12',
        settings.layoutDensity === 'compact'
          ? 'grid-cols-2 md:grid-cols-4 gap-4'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
      )}>
        <div className={cn(
          'glass-card p-6',
          settings.enhancedAnimations && 'animate-slide-up',
          settings.glowEnabled && 'hover:glow transition-shadow duration-400'
        )}>
          <ClockWidget />
        </div>
        <div className={cn(
          'glass-card p-6',
          settings.enhancedAnimations && 'animate-slide-up',
          settings.glowEnabled && 'hover:glow transition-shadow duration-400'
        )} style={{ animationDelay: '0.1s' }}>
          <TimerWidget />
        </div>
        <div className={cn(
          'glass-card p-6',
          settings.enhancedAnimations && 'animate-slide-up',
          settings.glowEnabled && 'hover:glow transition-shadow duration-400'
        )} style={{ animationDelay: '0.2s' }}>
          <NotesWidget />
        </div>
        <div className={cn(
          'glass-card p-6',
          settings.enhancedAnimations && 'animate-slide-up',
          settings.glowEnabled && 'hover:glow transition-shadow duration-400'
        )} style={{ animationDelay: '0.3s' }}>
          <CalculatorWidget />
        </div>
      </div>

      {/* Bookmarklets */}
      <div className={cn('mb-8', settings.enhancedAnimations && 'animate-fade-in')}>
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-medium lowercase">bookmarklets</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 lowercase">
          drag these to your bookmarks bar to use
        </p>
        <div className={cn(
          'grid gap-4',
          settings.layoutDensity === 'compact'
            ? 'grid-cols-2 md:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}>
          {bookmarklets.map((bm, index) => (
            <a
              key={bm.name}
              href={bm.code}
              onClick={(e) => e.preventDefault()}
              draggable
              className={cn(
                'glass-card p-4 block',
                'transition-all',
                settings.enhancedAnimations ? 'duration-400 hover:scale-105 animate-slide-up' : 'duration-200',
                settings.glowEnabled && 'hover:glow'
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <h3 className="font-button text-sm text-primary lowercase mb-1">
                {bm.name}
              </h3>
              <p className="text-xs text-muted-foreground lowercase">
                {bm.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
