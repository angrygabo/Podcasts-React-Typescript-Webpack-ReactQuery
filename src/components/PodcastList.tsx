import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PodcastData } from '../types/types';

interface PodcastListProps {
  data: PodcastData;
}

const PodcastList: React.FC<PodcastListProps> = ({ data }) => {

  // Filtra según título
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredPodcasts = data.feed.entry.filter(podcast => 
    podcast["im:name"].label.toLowerCase().includes(filter.toLowerCase()) ||
    podcast["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="filter">
        <input
          type="text"
          placeholder="Filtrar por título..."
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="grid">
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((podcast, index) => {
            const podcastId = podcast.id.attributes?.['im:id'] ?? 'defaultId';

            return (
              <div key={index} className="card">
                <figure><Link to={`/podcast/${podcastId}`}><img src={podcast["im:image"][2].label} alt={podcast["im:name"].label} /></Link></figure>
                <h2 className="card-title"><Link to={`/podcast/${podcastId}`}>{podcast["im:name"].label}</Link></h2>
                <p>{podcast["im:artist"].label}</p>
              </div>
            );
          })
        ) : (
          <p>No se encontraron podcasts que coincidan con tu búsqueda.</p>
        )}
      </div>
    </>
  );
};

export default PodcastList;
