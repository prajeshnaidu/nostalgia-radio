"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { playlists } from "@/app/lib/tracks";
import { useYouTubePlayer, type ErrorEvent } from "@/app/lib/useYouTubePlayer";
import { useMediaQuery } from "@/app/lib/useMediaQuery";
import DesktopPlayer from "./DesktopPlayer";
import MobilePlayer from "./MobilePlayer";
import PlaylistSwitcher from "./PlaylistSwitcher";

export default function PlayerShell() {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const playlist = playlists[playlistIndex];
  const track = playlist.tracks[trackIndex];

  // A single, stable host node for the YT.Player. It never unmounts on
  // resize — we just portal it between the desktop and mobile slots so
  // there is only ever one live (visible) player, never a hidden one.
  const hostRef = useRef<HTMLDivElement | null>(null);
  if (!hostRef.current && typeof document !== "undefined") {
    hostRef.current = document.createElement("div");
    hostRef.current.style.width = "100%";
    hostRef.current.style.height = "100%";
  }

  const desktopSlotRef = useRef<HTMLDivElement | null>(null);
  const mobileSlotRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const advance = useCallback((direction: 1 | -1) => {
    setTrackIndex((i) => {
      const len = playlists[playlistIndex].tracks.length;
      return (i + direction + len) % len;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistIndex]);

  const handleEnded = useCallback(() => advance(1), [advance]);

  const handleError = useCallback(
    (err: ErrorEvent) => {
      // Video was deleted or embedding got switched off after we shipped —
      // skip forward instead of stalling the player, and log it.
      if (typeof window !== "undefined" && "gtag" in window) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
          "event",
          "youtube_playback_error",
          { code: err.code, video_id: err.videoId }
        );
      } else {
        console.warn("[nostalgia-radio] playback error, skipping", err);
      }
      advance(1);
    },
    [advance]
  );

  const player = useYouTubePlayer(hostRef, { onEnded: handleEnded, onError: handleError });

  useEffect(() => setMounted(true), []);

  // Move the single live host node (plain DOM, not React-rendered) into
  // whichever slot is currently visible. This keeps one real YT.Player
  // instance alive across the breakpoint switch instead of destroying and
  // recreating it — and guarantees it's never parked inside a hidden node.
  useLayoutEffect(() => {
    const target = isDesktop ? desktopSlotRef.current : mobileSlotRef.current;
    const host = hostRef.current;
    if (target && host && target !== host.parentElement) {
      target.appendChild(host);
    }
  });

  const handlePlayPause = useCallback(() => {
    if (player.playback === "playing") player.pause();
    else player.play();
  }, [player]);

  const handleSwitchPlaylist = useCallback((index: number) => {
    setPlaylistIndex(index);
    setTrackIndex(0);
  }, []);

  // Load whichever track is now selected (skips the very first mount,
  // since the player already boots with this videoId).
  const loadedKeyRef = useRef<string | null>(null);
  const key = `${playlistIndex}:${trackIndex}`;
  useEffect(() => {
    if (!mounted) return;
    if (loadedKeyRef.current === null) {
      loadedKeyRef.current = key;
      return;
    }
    if (loadedKeyRef.current !== key) {
      loadedKeyRef.current = key;
      player.load(track.videoId, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, mounted]);

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3">
      <PlaylistSwitcher
        playlists={playlists}
        activeIndex={playlistIndex}
        onSelect={handleSwitchPlaylist}
      />

      <DesktopPlayer
        vinylSlotRef={desktopSlotRef}
        isDesktopActive={isDesktop}
        track={track}
        isPlaying={player.playback === "playing"}
        currentTime={player.currentTime}
        duration={player.duration}
        onPlayPause={handlePlayPause}
        onNext={() => advance(1)}
        onPrev={() => advance(-1)}
        onSeek={player.seek}
      />
      <MobilePlayer
        vinylSlotRef={mobileSlotRef}
        isDesktopActive={isDesktop}
        track={track}
        isPlaying={player.playback === "playing"}
        currentTime={player.currentTime}
        duration={player.duration}
        onPlayPause={handlePlayPause}
        onNext={() => advance(1)}
        onPrev={() => advance(-1)}
        onSeek={player.seek}
      />

      {!track.videoId && (
        <p className="max-w-xs text-center font-body text-[11px] leading-relaxed text-cream/50">
          This track has no videoId yet — add an official, embedding-enabled
          upload in <code className="text-cream/70">app/lib/tracks.ts</code>.
        </p>
      )}
    </div>
  );
}
