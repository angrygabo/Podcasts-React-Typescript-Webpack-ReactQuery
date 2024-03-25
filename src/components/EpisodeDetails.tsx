import {useEffect} from 'react';
import { Link } from 'react-router-dom';

// d.types
interface EpisodeDetailsPageProps {
    episode: any;
    podcastId: any;
}

const EpisodeDetailsPage: React.FC<EpisodeDetailsPageProps> = ({ episode, podcastId }) => {

    if (!episode) {
        return <div>Episode no found.</div>;
    }

    // scroll top on open episode
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="podcastDetail_content">
            <div className="podcastDetail_content--detail">
                <h2 className="detail_title">{episode.trackName}</h2>
                <div className="detail_description">{episode.description}</div>
                <audio controls src={episode.episodeUrl}>
                    Your browser does not support the element <code>audio</code>.
                </audio>
                <Link to={`/podcast/${podcastId}`}>Go back</Link>
            </div>
        </div>
    );
};

export default EpisodeDetailsPage;