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
  "im:name": {
    label: string;
  };
  "im:image": Image[];
  "im:artist": {
    label: string;
  };
  title: {
    label: string;
  };
  id: Id;
}

export interface Feed {
  entry: Entry[];
}

export interface PodcastData {
  feed: Feed;
}