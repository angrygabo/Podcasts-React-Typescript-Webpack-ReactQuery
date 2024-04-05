import { PodcastData  } from '@/types';

const useFilterPodcasts = (podcasts: PodcastData | undefined, filter: string) => {
    // Proporciona un objeto predeterminado si `podcasts` es `undefined`
    const safePodcasts = podcasts || { feed: { entry: [] } };

    const filtered = safePodcasts.feed.entry.filter(podcast =>
        podcast["im:name"].label.toLowerCase().includes(filter.toLowerCase()) ||
        podcast["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
    );

    return filtered;
};

export default useFilterPodcasts;