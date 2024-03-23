import { useQuery } from 'react-query';

import { fetchPodcasts } from '../fetch/fecth'
import { PodcastData } from '../types/types';

import PodcastList from '../components/PodcastList';

const Home: React.FC = () => {

    // useQuery fetchPodcasts
    const { data: podcastData, isLoading, error } = useQuery<PodcastData, Error>('podcasts', () => 
        fetchPodcasts<PodcastData>(() => {
            return fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
                .then(response => response.json());
        })
    );

    if (isLoading) return <p>Cargando...</p>;

    return (
        <div className="App">
            {podcastData && <PodcastList data={podcastData} />}
        </div>
    );
};

export default Home;