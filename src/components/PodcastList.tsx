import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { PodcastData } from '../types/types';

interface PodcastListProps {
  data: PodcastData;
}

const PodcastList: React.FC<PodcastListProps> = ({ data }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredPodcasts = data.feed.entry.filter(podcast => 
    podcast["im:name"].label.toLowerCase().includes(filter.toLowerCase()) ||
    podcast["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
  );

  // (Apaño, ya que el segundo endpoint no contiene -summary- en el objeto, opté por almacenar para luego recuperarlo)
  const handlePodcastClick = (summary: string) => {
    localStorage.setItem('podcastSummary', summary);
  };
  
  return (
    <>
      <div className="filterWrap">
        <div className="filterWrap_box">
          <span className="lenght">
            {filteredPodcasts.length}
          </span>
          <TextField
            id="outlined-size-small"
            size="small"
            label="Find podcast:"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="podcastsWrap">
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((podcast, index) => {
            const podcastId = podcast.id.attributes?.['im:id'] ?? 'defaultId';
            return (
              <div key={index} className="podcastsWrap_item">
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
          })
        ) : (
          <p>No hay resultados.</p>
        )}
      </div>
    </>
  );
};

export default PodcastList;