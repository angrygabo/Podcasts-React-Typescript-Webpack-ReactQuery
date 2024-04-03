import { useState } from 'react';
import { useQuery } from 'react-query';
import { PodcastData } from '../types/types';

// Components
import { fetchPodcasts } from '../api/fecth';
import Loading from '../components/utils/Loading';
import Filter from '../components/utils/Filter';
import PodcastItem from '../components/PodcastItem';

// styles
import '../assets/scss/home.scss';

const Home: React.FC = () => {

    // useQuery fetchPodcasts
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
    
    // Filter action podcasts
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const filteredPodcasts = podcastData ? podcastData.feed.entry.filter(podcast => 
        podcast["im:name"].label.toLowerCase().includes(filter.toLowerCase()) ||
        podcast["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
    ) : [];

    // Set summary podcast in Localstorage
    const handlePodcastClick = (summary: string) => {
        localStorage.setItem('podcastSummary', summary);
    };


    if (isLoading) { 
        return <Loading info="Loading" />;
    }

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