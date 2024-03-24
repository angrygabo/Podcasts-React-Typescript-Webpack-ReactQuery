import { useQuery } from 'react-query';
import { fetchPodcasts } from '../fetch/fecth'
import { PodcastData } from '../types/types';
import PodcastList from '../components/PodcastList';
import '../assets/scss/home.scss';
import Loading from '../components/utils/Loading';

const Home: React.FC = () => {

    // useQuery fetchPodcasts
    const { data: podcastData, isLoading, error } = useQuery<PodcastData, Error>('podcasts', () => 
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

    if (isLoading) { return <Loading info="Loading" />}
    
    return (
        <div className="container">
            {podcastData && <PodcastList data={podcastData} />}
        </div>
    );
};

export default Home;