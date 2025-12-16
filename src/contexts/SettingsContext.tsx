import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AccentColor = 'blue' | 'purple' | 'cyan' | 'rose';
type LayoutDensity = 'compact' | 'comfortable';
type BackgroundStyle = 'solid' | 'gradient' | 'particles' | 'grid';

interface Settings {
  accentColor: AccentColor;
  layoutDensity: LayoutDensity;
  backgroundStyle: BackgroundStyle;
  glowEnabled: boolean;
  enhancedAnimations: boolean;
  tabName: string;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  accentColor: 'blue',
  layoutDensity: 'comfortable',
  backgroundStyle: 'solid',
  glowEnabled: true,
  enhancedAnimations: true,
  tabName: 'macunlocked',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('macunlocked-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('macunlocked-settings', JSON.stringify(settings));
    
    // Apply accent color
    document.documentElement.setAttribute('data-accent', settings.accentColor);
    
    // Apply glow
    document.documentElement.setAttribute('data-glow', String(settings.glowEnabled));
    
    // Update tab name
    document.title = settings.tabName;
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
