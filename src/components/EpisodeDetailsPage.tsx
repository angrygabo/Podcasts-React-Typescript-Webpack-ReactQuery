import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { format, parseISO } from 'date-fns';
import { fetchPodcasts } from '../fetch/fecth'
import { PodcastDetailsResponse } from '../types/types';

interface EpisodeDetailsPageProps {
    formatDuration: (millis: number) => string;
}

const EpisodeDetailsPage: React.FC<EpisodeDetailsPageProps> = ({ formatDuration }) => {
    const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId?: string }>();


    const { data: podcastDetails, isLoading, error } = useQuery<PodcastDetailsResponse, Error>(
        ['podcastDetails', podcastId],
        () => fetchPodcasts<PodcastDetailsResponse>(() => fetch(podcastId!)
            .then(response => response.json())
            .then(jsonResponse => JSON.parse(jsonResponse.contents))),
        {
            enabled: !!podcastId,
        }
    );

    if (isLoading) return <div>Cargando detalles del episodio...</div>;

    // Find espisode
    const episode = episodeId ? podcastDetails?.results.find(ep => ep.trackId.toString() === episodeId) : null;

    if (!episode) {
        return <div>Episodio no encontrado.</div>;
    }

    return (
        <div className="episode-details">
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