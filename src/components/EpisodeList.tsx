import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

// types
interface EpisodeListTypes {
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
}

interface EpisodeListProps {
  podcastId: string;
  podcastDetails: {
    results: EpisodeListTypes[];
  };
 
}

// Format time podcast
const formatDuration = (millis: number): string => {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  if (hours > 0) {
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
};



const EpisodeList: React.FC<EpisodeListProps> = ({ podcastId, podcastDetails }) => {

  // Episodes Length
  const numberOfEpisodes = podcastDetails?.results.length || 0;

  return (
    <div className="podcastDetail_content">
      <div className="podcastDetail_content--length">Episodes: {numberOfEpisodes}</div>
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
