import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PodcastData } from '../types/types';
import Filter from '../components/utils/Filter'

interface PodcastListProps {
  data: PodcastData;
}

const PodcastList: React.FC<PodcastListProps> = ({ data }) => {
  const [filter, setFilter] = useState('');

  const filterPodcast = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredPodcasts = data.feed.entry.filter(podcast => 
    podcast["im:name"].label.toLowerCase().includes(filter.toLowerCase()) ||
    podcast["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
  );

  // (Apaño, ya que el segundo endpoint no contiene alguna descripción del podcast en el objeto, opté por almacenar -summary- del primer endpoint para luego recuperarlo)
  const handlePodcastSummary = (summary: string) => {
    localStorage.setItem('podcastSummary', summary);
  };
  
  return (
    <>
      <Filter
        filteredPodcastsLength={filteredPodcasts.length}
        filter={filter}
        handleFilterChange={filterPodcast} // Usa handleFilterChange aquí, asegurándote de que coincide con FilterProps
      />
      <div className="podcastsWrap">
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((podcast, index) => {
            const podcastId = podcast.id.attributes?.['im:id'] ?? 'defaultId';
            return (
              <div key={index} className="podcastsWrap_item">
                <figure className="podcastsWrap_item--banner">
                  <Link onClick={() => handlePodcastSummary(podcast.summary.label)} to={`/podcast/${podcastId}`}>
                    <img src={podcast["im:image"][2].label} alt={podcast["im:name"].label} />
                  </Link>
                </figure>
                <h2 className="podcastsWrap_item--title">
                  <Link onClick={() => handlePodcastSummary(podcast.summary.label)} to={`/podcast/${podcastId}`}>
                    {podcast["im:name"].label}
                  </Link>
                </h2>
                <p>Author: {podcast["im:artist"].label}</p>
              </div>
            );
          })
        ) : (
          <p>No results.</p>
        )}
      </div>
    </>
  );
};

export default PodcastList;