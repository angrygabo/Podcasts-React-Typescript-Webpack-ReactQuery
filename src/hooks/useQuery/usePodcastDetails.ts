import { useQuery } from 'react-query';
import { fetchPodcasts } from '@/api/fetch';
import { PodcastDetailsResponse } from '@/types';

const usePodcastDetails = (podcastId: string) => {
    const getPodcastDetailUrl = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
    const encodedGetPodcastDetailUrl = encodeURIComponent(getPodcastDetailUrl);
    const allOriginsUrl = `https://api.allorigins.win/get?url=${encodedGetPodcastDetailUrl}`;

    const { data: podcastDetails, isLoading } = useQuery<PodcastDetailsResponse, Error>(
        ['podcastDetails', podcastId],
        () => fetchPodcasts<PodcastDetailsResponse>(() => fetch(allOriginsUrl)
            .then(response => response.json())
            .then(jsonResponse => JSON.parse(jsonResponse.contents))),
        {
            enabled: !!podcastId,
            staleTime: 1000 * 60 * 60 * 24, // Cache 24h
            cacheTime: 1000 * 60 * 60 * 24 // Cache 24h
        }
    );

    return { podcastDetails, isLoading };
};

export default usePodcastDetails;