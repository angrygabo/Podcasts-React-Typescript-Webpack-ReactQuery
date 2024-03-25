import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchPodcasts } from '../fetch/fecth';
import { PodcastData } from '../types/types';
import '../assets/scss/home.scss';
import Loading from '../components/utils/Loading';
import Filter from '../components/utils/Filter';
import PodcastItem from '../components/PodcastItem';

const Home: React.FC = () => {
    // useQuery para fetchPodcasts
    const { data: podcastData, isLoading } = useQuery<PodcastData, Error>('podcasts', () => 
        fetchPodcasts<PodcastData>(() => {
            return fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
                .then(response => response.json());
        }),
        // Cache 24h
        {
            staleTime: 1000 * 60 * 60 * 24,
            cacheTime: 1000 * 60 * 60 * 24
        }
    );

    const [filter, setFilter] = useState('');

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const handlePodcastClick = (summary: string) => {
        localStorage.setItem('podcastSummary', summary);
    };

    if (isLoading) { 
        return <Loading info="Loading" />;
    }

    const filteredPodcasts = podcastData ? podcastData.feed.entry.filter(podcast => 
        podcast["im:name"].label.toLowerCase().includes(filter.toLowerCase()) ||
        podcast["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
    ) : [];

    return (
        <div className="container">
            <Filter
                filteredPodcastsLength={filteredPodcasts.length}
                filter={filter}
                handleFilterChange={handleFilterChange}
            />
            <div className="podcastsWrap">
                {filteredPodcasts.length > 0 ? (
                    filteredPodcasts.map((podcast, index) => {
                        const podcastId = podcast.id.attributes?.['im:id'] ?? 'defaultId';
                        return (
                            <PodcastItem key={index} podcast={podcast} handlePodcastClick={handlePodcastClick} />
                        );
                    })
                ) : (
                    <p>No hay resultados.</p>
                )}
            </div>
        </div>
    );
};

export default Home;