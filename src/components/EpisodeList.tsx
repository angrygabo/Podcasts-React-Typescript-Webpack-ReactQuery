import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

// Tipado para los episodios recibidos como prop
interface EpisodeListTypes {
  trackId: number;
  trackName: string;
  releaseDate: string; // Asumiendo que viene en formato ISO
  trackTimeMillis: number;
}

interface EpisodeListProps {
  podcastId: string; // ID del podcast, necesario para construir el Link
  podcastDetails: {
    results: EpisodeListTypes[];
  };
}

// Función auxiliar para formatear la duración de milisegundos a horas, minutos y segundos
const formatDuration = (millis: number): string => {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
};

const EpisodeList: React.FC<EpisodeListProps> = ({ podcastId, podcastDetails }) => {
  return (
    <div className="podcastDetail_content">
      <div className="podcastDetail_content--item">
        <div className="podcastDetail_content--grid">
          <div className="title headline">Title</div>
          <div className="date headline">Date</div>
          <div className="duration headline">Duration</div>
        </div>
      </div>
      {podcastDetails?.results.slice(1).map((episode) => (
        <div key={episode.trackId} className="podcastDetail_content--item">
          <div className="podcastDetail_content--grid">
            <div>
              <Link to={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                {episode.trackName}
              </Link>
            </div>
            <div>{format(parseISO(episode.releaseDate), 'MM/dd/yyyy')}</div>
            <div>{formatDuration(episode.trackTimeMillis)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
