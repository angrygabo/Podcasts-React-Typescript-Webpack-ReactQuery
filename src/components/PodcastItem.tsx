import React from 'react';
import { Link } from 'react-router-dom';

// d.types
import { PodcastItemProps } from '../types'

const PodcastItem: React.FC<PodcastItemProps> = ({ podcast, handlePodcastClick }) => {
    
    const podcastId = podcast.id.attributes?.['im:id'] ?? 'defaultId';

    return (
        <div className="podcastsWrap_item">
            <figure className="podcastsWrap_item--banner">
                <Link onClick={() => handlePodcastClick(podcast.summary.label)} to={`/podcast/${podcastId}`}>
                    <img src={podcast["im:image"][2].label} alt={podcast["im:name"].label} />
                </Link>
            </figure>
            <h2 className="podcastsWrap_item--title">
                <Link onClick={() => handlePodcastClick(podcast.summary.label)} to={`/podcast/${podcastId}`}>
                    {podcast["im:name"].label}
                </Link>
            </h2>
            <p>Author: {podcast["im:artist"].label}</p>
        </div>
    );
};

export default PodcastItem;