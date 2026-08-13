import type { Playlist } from "./types";

/**
 * ⚠️  COPYRIGHT — READ BEFORE FILLING IN videoId
 * ------------------------------------------------------------------
 * Every track below is a commercially released Bollywood film song.
 * I have not searched YouTube for these and have not filled in any
 * videoId — per your instructions I only use videos you've confirmed
 * you have the right to use, or the rights holder's own upload with
 * embedding enabled.
 *
 * Before you ship, for each track:
 *   1. Find the official upload (the film's label — e.g. T-Series,
 *      Saregama, Zee Music, Sony Music India — not a fan re-upload).
 *   2. Confirm embedding is allowed (try it in an <iframe> locally;
 *      if YouTube blocks it, `onError` will just skip the track).
 *   3. Paste the 11-character video ID into `videoId` below.
 *   4. Double check `film` / `year` — I've left them blank rather
 *      than guess, since I can't verify them without searching.
 *
 * Adding a new song later is a one-line addition to the relevant
 * array below.
 */

const playlistOne: Playlist = {
  id: "rain-soaked-reels",
  name: "Rain-Soaked Reels",
  tracks: [
    { id: "t1-01", title: "Yaaron", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-02", title: "Pal", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-03", title: "Sach Keh Raha Hai Deewana", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-04", title: "Kya Mujhe Pyaar Hai", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-05", title: "Beete Lamhein", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-06", title: "Awarapan Banjarapan", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-07", title: "Alvida", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-08", title: "Tu Hi Meri Shab Hai", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-09", title: "Zara Sa", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-10", title: "Tadap Tadap", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-11", title: "Dil Ibaadat", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-12", title: "Tu Aashiqui Hai", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t1-13", title: "Aankhon Mein Teri", artist: "", film: "", year: 0, duration: 300, videoId: "" },
  ],
};

const playlistTwo: Playlist = {
  id: "golden-era-serenades",
  name: "Golden Era Serenades",
  tracks: [
    { id: "t2-01", title: "Gulabi Aankhen", artist: "Mohd Rafi", film: "The Train", year: 1970, duration: 300, videoId: "6Z3DO-OFIjQ" },
    { id: "t2-02", title: "O Mere Dil Ke Chain", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-03", title: "Yeh Shaam Mastani", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-04", title: "Pal Pal Dil Ke Paas", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-05", title: "Neele Neele Ambar Par", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-06", title: "Humein Tumse Pyaar Kitna", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-07", title: "Raat Kali Ek Khwaab Mein Aayi", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-08", title: "Musafir Hoon Yaaron", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-09", title: "Kya Yahi Pyaar Hai", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-10", title: "Aap Ki Aankhon Mein Kuch", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-11", title: "Chookar Mere Man Ko", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-12", title: "Zindagi Ke Safar Mein", artist: "", film: "", year: 0, duration: 300, videoId: "" },
    { id: "t2-13", title: "Yeh Jo Mohabbat Hai", artist: "", film: "", year: 0, duration: 300, videoId: "" },
  ],
};

export const playlists: Playlist[] = [playlistOne, playlistTwo];
