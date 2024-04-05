import React, { createContext, useContext } from 'react';

/*
  El propósito de este contexto es servir datos del podcast a toda la app, ya que por ejemplo el "summary" solo se obtiene del primer fetch.
*/ 

// Hook useQuery
import useFetchPodcasts from '@/hooks/useQuery/useFetchPodcasts';

// Types.d
import { PodcastContextType, PodcastProviderProps } from '@/types';

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export const usePodcasts = (): PodcastContextType => {
  const context = useContext(PodcastContext);
  if (context === undefined) {
    throw new Error('usePodcasts must be used within a PodcastProvider');
  }
  return context;
};

export const PodcastProvider: React.FC<PodcastProviderProps> = ({ children }) => {
  const { data: podcastData, isLoading } = useFetchPodcasts();

  return (
    <PodcastContext.Provider value={{ data: podcastData, isLoading }}>
      {children}
    </PodcastContext.Provider>
  );
};