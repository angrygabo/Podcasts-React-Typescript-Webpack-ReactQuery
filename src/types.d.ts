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

export interface Podcast {
  "im:name": {
      label: string;
  };
  "im:artist": {
      label: string;
  };
  "summary": {
    label: string;
  };
}

export interface PodcastData {
  feed: {
      entry: Podcast[];
  };
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

export interface EpisodeListProps {
  podcastId: string;
  podcastDetails: {
    results: EpisodeListTypes[];
  };
}

export interface PodcastItemProps {
  podcast: Episode;
}

export interface FilterProps {
  filteredLength: number;
  filter: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PodcastContextType {
  data: PodcastData | undefined;
  isLoading: boolean;
}

export interface PodcastProviderProps {
  children: ReactNode;
}