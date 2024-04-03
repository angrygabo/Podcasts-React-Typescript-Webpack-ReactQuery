export interface Image {
  label: string;
  attributes: {
    height: string;
  };
}

export interface Id {
  label: string;
  attributes?: {
    "im:id": string;
  };
}

export interface Entry {
  "im:name": { label: string };
  "im:image": Image[];
  "im:artist": { label: string };
  title: { label: string };
  id: Id;
  summary: { label: string };
}

export interface Feed {
  entry: Entry[];
}

export interface PodcastData {
  feed: Feed;
}

export interface PodcastEpisode {
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  episodeUrl: string;
  collectionId: number;
  artistName: string;
  collectionName: string;
  artworkUrl600: string;
  title: { label: string };
}

export interface PodcastDetailsResponse {
  resultCount: number;
  results: PodcastEpisode[];
  artistName: string;
  "im:name": { label: string };
  "im:image": Image[];
  "im:artist": { label: string };
  title: { label: string };
}

export interface EpisodeDetailsPageProps {
  episode: Episode;
  podcastId: string;
}

export interface EpisodeListTypes {
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

export interface PodcastItemProps {
  podcast: Episode;
  handlePodcastClick: (summary: string) => void;
}

export interface LoadingProps {
  info: string;
}