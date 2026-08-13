export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  /** Fallback display duration in seconds, used only until the YouTube
   * player reports the real duration via getDuration(). */
  duration: number;
  /**
   * YouTube video ID. MUST be an official upload (label/rights-holder
   * channel) with embedding enabled. See the warning at the top of
   * `tracks.ts` before filling these in.
   */
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
};
