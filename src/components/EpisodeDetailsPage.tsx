import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

interface EpisodeDetailsPageProps {
    formatDuration: (millis: number) => string;
    episode: any;
    podcastId: any;
}

const EpisodeDetailsPage: React.FC<EpisodeDetailsPageProps> = ({ formatDuration, episode, podcastId }) => {

    if (!episode) {
        return <div>Episodio no encontrado.</div>;
    }

    return (
        <div className="podcastDetail_content">
            <h1>{episode.trackName}</h1>
            <p>Release Date: {episode.releaseDate ? format(parseISO(episode.releaseDate), 'MM/dd/yyyy') : 'N/A'}</p>
            <p>Duration: {formatDuration(episode.trackTimeMillis)}</p>
            <audio controls src={episode.episodeUrl}>
                Tu navegador no soporta el elemento <code>audio</code>.
            </audio>
            <br />
            <Link to={`/podcast/${podcastId}`}>Volver a los detalles del podcast</Link>
        </div>
    );
};

export default EpisodeDetailsPage;