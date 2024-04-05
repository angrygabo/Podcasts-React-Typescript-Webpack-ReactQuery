import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePodcasts } from '@/context/PodcastContext';

// Hooks
import usePodcastDetails from '@/hooks/useQuery/usePodcastDetails';

// Components
import Loading from '@/components/utils/Loading';
import EpisodeList from '@/pages/details/components/EpisodeList';
import EpisodeDetails from '@/pages/details/components/EpisodeDetails';

const PodcastDetailsPage: React.FC = () => {

    // Get params from URL
    const { podcastId = '', episodeId } = useParams<{ podcastId: string; episodeId?: string }>();

    // Hook usePodcastDetails, params 'podcastId'
    const { podcastDetails, isLoading } = usePodcastDetails(podcastId);
        
    // Get summary from context
    const { data: podcastData } = usePodcasts(); 

    const podcastSummary = podcastData?.feed.entry.find(p => p.id.attributes?.["im:id"] === podcastId)?.summary.label;

    // Find episode
    const episode = episodeId ? podcastDetails?.results.find(ep => ep.trackId.toString() === episodeId) : null;

    if (isLoading) { return <Loading />}
         
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
                            <p>{podcastSummary}</p>
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