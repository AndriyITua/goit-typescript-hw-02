interface Urls {
  small: string;
  regular?: string;
}

export interface Image {
  id: string;
  urls: Urls;
  description: string;
}
