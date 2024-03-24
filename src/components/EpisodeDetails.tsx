import React from 'react';
import { Link } from 'react-router-dom';

interface EpisodeDetailsPageProps {
    episode: any;
    podcastId: any;
}

const EpisodeDetailsPage: React.FC<EpisodeDetailsPageProps> = ({ episode, podcastId }) => {

    if (!episode) {
        return <div>Episodio no encontrado.</div>;
    }

    return (
        <div className="podcastDetail_content">
            <div className="podcastDetail_content--detail">
                <h2 className="detail_title">{episode.trackName}</h2>
                <div className="detail_description">{episode.description}</div>
                <audio controls src={episode.episodeUrl}>
                    Tu navegador no soporta el elemento <code>audio</code>.
                </audio>
                <Link to={`/podcast/${podcastId}`}>Go back</Link>
            </div>
        </div>
    );
};

export default EpisodeDetailsPage;