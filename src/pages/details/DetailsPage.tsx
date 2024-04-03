import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';

// Types.d
import { PodcastDetailsResponse } from '../../types';

// Api
import { fetchPodcasts } from '../../api/fecth';

// Components & template parts
import Loading from '../../components/utils/Loading';
import EpisodeList from './template-parts/EpisodeList';
import EpisodeDetails from './template-parts/EpisodeDetails';

const PodcastDetailsPage: React.FC = () => {

    // useParams from react-router-dom
    const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId?: string }>();

    // Get summary from localStorage    
    const [summary, setSummary] = useState('');
    useEffect(() => {
        const storedSummary = localStorage.getItem('podcastSummary');
        if (storedSummary) {
          setSummary(storedSummary);
        }
      }, []);

    // useQuery podcastDetails
    const getPodcatsDetail = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
    const encodedGetPodcatsDetail = encodeURIComponent(getPodcatsDetail);
    const allOriginsUrl = `https://api.allorigins.win/get?url=${encodedGetPodcatsDetail}`;

    const { data: podcastDetails, isLoading } = useQuery<PodcastDetailsResponse, Error>(
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

    // Find episode
    const episode = episodeId ? podcastDetails?.results.find(ep => ep.trackId.toString() === episodeId) : null;
         
    return (
        <div className="container">
            <div className="podcastDetail">
                {podcastDetails && (
                    <div key={podcastDetails.results[0].trackId} className="podcastDetail_aside">
                        <figure>
                            <Link to={`/podcast/${podcastId}`}>
                                <img src={podcastDetails.results[0].artworkUrl600} alt={podcastDetails.results[0].artistName} />
                            </Link>
                        </figure>
                        <hr/>
                        <div className="podcastDetail_aside--collectionName">
                            <h3>
                                <Link to={`/podcast/${podcastId}`}>{podcastDetails.results[0].collectionName}</Link>
                            </h3>
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