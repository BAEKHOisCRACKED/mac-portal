import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
}

interface MusicContextType {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  setTrack: (track: Track) => void;
}

const tracks: Track[] = [
  { id: '1', title: 'fever', artist: 'buckshot', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'fakemink', artist: 'unknown', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', title: 'the days (notion remix)', artist: 'avicii', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '4', title: 'rally house', artist: 'unknown', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
];

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(() => {
    const saved = localStorage.getItem('macunlocked-current-track');
    if (saved) {
      const id = JSON.parse(saved);
      return tracks.find(t => t.id === id) || tracks[0];
    }
    return tracks[0];
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('ended', () => {
        next();
      });
    }

    if (currentTrack) {
      const wasPlaying = isPlaying;
      audioRef.current.src = currentTrack.url;
      localStorage.setItem('macunlocked-current-track', JSON.stringify(currentTrack.id));
      if (wasPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);

  const play = () => {
    audioRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const next = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    if (isPlaying) {
      setTimeout(() => play(), 100);
    }
  };

  const previous = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    if (isPlaying) {
      setTimeout(() => play(), 100);
    }
  };

  const setTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  return (
    <MusicContext.Provider value={{
      tracks,
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      play,
      pause,
      toggle,
      next,
      previous,
      setTrack,
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
