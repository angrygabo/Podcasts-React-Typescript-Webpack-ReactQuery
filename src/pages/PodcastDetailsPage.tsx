import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchPodcasts } from '../fetch/fecth';
import { PodcastDetailsResponse, PodcastEpisode } from '../types/types';
import EpisodeDetails from '../components/EpisodeDetails';
import Loading from '../components/utils/Loading';
import '../assets/scss/podcastDetail.scss';
import EpisodeList from '../components/EpisodeList';

const PodcastDetailsPage: React.FC = () => {
    const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId?: string }>();

    const [summary, setSummary] = useState('');
    useEffect(() => {

        // Get summary from localStorage
        const storedSummary = localStorage.getItem('podcastSummary');
        if (storedSummary) {
          setSummary(storedSummary);
        }
      }, []);

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
            // Cache 24h
            staleTime: 1000 * 60 * 60 * 24, 
            cacheTime: 1000 * 60 * 60 * 24
        }
    );
    
    if (isLoading) { return <Loading info="Loading" />}

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
        <div className="container">
            <div className="podcastDetail">
                {podcastDetails && (
                    <div key={podcastDetails.results[0].trackId} className="podcastDetail_aside">
                        <figure><img src={podcastDetails.results[0].artworkUrl600} alt={podcastDetails.results[0].artistName} /></figure>
                        <hr/>
                        <div className="podcastDetail_aside--collectionName">
                            <h3>{podcastDetails.results[0].collectionName}</h3>
                        </div>
                        <div className="podcastDetail_aside--artistName">by {podcastDetails.results[0].artistName}</div>
                        <hr/>
                        <div className="podcastDetail_aside--description">
                            <h3>Description</h3>
                            {summary}
                        </div>
                    </div>
                )}
                {episode ? (
                    <EpisodeDetails episode={episode} podcastId={podcastId as string} />
                ) : podcastDetails ? (
                    <EpisodeList podcastId={podcastId as string} podcastDetails={podcastDetails} />
                ) : null}
            </div>
        </div>
    );
};

export default PodcastDetailsPage;
