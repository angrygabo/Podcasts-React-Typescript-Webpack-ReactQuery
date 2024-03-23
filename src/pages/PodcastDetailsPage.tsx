import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { format, parseISO } from 'date-fns';
import { fetchPodcasts } from '../fetch/fecth';
import { PodcastDetailsResponse, PodcastEpisode } from '../types/types';
import EpisodeDetailsPage from './EpisodeDetailsPage';


const PodcastDetailsPage: React.FC = () => {
    const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId?: string }>();

    // ReactQuery
    const getPodcatsDetail = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
    const encodedGetPodcatsDetail = encodeURIComponent(getPodcatsDetail);
    const allOriginsUrl = `https://api.allorigins.win/get?url=${encodedGetPodcatsDetail}`;

    const { data: podcastDetails, isLoading, error } = useQuery<PodcastDetailsResponse, Error>(
        ['podcastDetails', podcastId],
        () => fetchPodcasts<PodcastDetailsResponse>(() => fetch(allOriginsUrl)
            .then(response => response.json())
            .then(jsonResponse => JSON.parse(jsonResponse.contents))),
        {
            enabled: !!podcastId,
        }
    );

    if (isLoading) return <div>Cargando detalles del podcast...</div>;

    const episode = episodeId ? podcastDetails?.results.find(ep => ep.trackId.toString() === episodeId) : null;
    
    function formatDuration(millis: number): string {
        const totalSeconds = Math.floor(millis / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
      
        // Duration format
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
      
    return (
        <div>
            <h1>Detalles del Podcast</h1>
            <Link to={'/'}>Volver inicio</Link>
            {podcastDetails && (
                <div key={podcastDetails.results[0].trackId} className="aside">
                    <figure><img src={podcastDetails.results[0].artworkUrl600} alt={podcastDetails.results[0].artistName} /></figure>
                
                    {podcastDetails.results[0].artistName}

                </div>
            )}
            {episode ? (
                <EpisodeDetailsPage formatDuration={formatDuration} />
            ) : (
                <div className="grid">
                    {podcastDetails?.results.slice(1).map((episode: PodcastEpisode) => (
                        <div key={episode.trackId} className="card">
                            <p>
                                <Link to={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                                    {episode.trackName}
                                </Link>
                            </p>
                            <p>Release Date: {format(parseISO(episode.releaseDate), 'MM/dd/yyyy')}</p>
                            <p>Duration: {formatDuration(episode.trackTimeMillis)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PodcastDetailsPage;
