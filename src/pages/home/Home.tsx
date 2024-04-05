import React, { useState } from 'react';

// Hooks
import useFetchPodcasts from '@/hooks/useQuery/useFetchPodcasts';
import useFilterPodcasts from '@/hooks/useFilterPodcasts';

// Components
import Loading from '@/components/utils/Loading';
import Filter from '@/components/utils/Filter';
import PodcastItem from '@/pages/home/components/PodcastItem';

const Home: React.FC = () => {

    const { data: podcastData, isLoading } = useFetchPodcasts();

    // Filter
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const filteredPodcasts = useFilterPodcasts(podcastData, filter);

    // Loading
    if (isLoading) { 
        return <Loading />;
    }

    return (
        <div className="container">
            <Filter
                filteredLength={filteredPodcasts.length}
                filter={filter}
                handleFilterChange={handleFilterChange}
            />
            <div className="podcastsWrap">
                {filteredPodcasts.length > 0 ? (
                    filteredPodcasts.map((podcast, index) => {
                        return (
                            <PodcastItem key={index} podcast={podcast} />
                        );
                    })
                ) : (
                    <p>No resuls.</p>
                )}
            </div>
        </div>
    );
};

export default Home;