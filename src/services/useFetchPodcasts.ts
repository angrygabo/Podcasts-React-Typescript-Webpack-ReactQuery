import { useQuery } from 'react-query';
import { PodcastData } from '@/types';
import { fetchPodcasts } from '@/api/fetch';

const useFetchPodcasts = () => {
    return useQuery<PodcastData, Error>('podcasts', () => 
        fetchPodcasts<PodcastData>(() => {
            return fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
                .then(response => response.json());
        }),
        {
            staleTime: 1000 * 60 * 60 * 24, // Cache 24h
            cacheTime: 1000 * 60 * 60 * 24 // Cache 24h
        }
    );
};

export default useFetchPodcasts;