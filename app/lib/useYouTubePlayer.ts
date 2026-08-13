"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

// Minimal shape of the bits of the YT IFrame API we actually touch.
type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  loadVideoById: (videoId: string) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

type YTPlayerEvent = { data: number; target: YTPlayer };

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: YTPlayerEvent) => void;
            onStateChange?: (e: YTPlayerEvent) => void;
            onError?: (e: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Module-scope singleton so the <script> tag and API-ready callback are
// only ever set up once, no matter how many components mount.
let apiPromise: Promise<void> | null = null;
function loadYouTubeIframeApi(): Promise<void> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export type PlaybackState = "idle" | "playing" | "paused";

export type ErrorEvent = { code: number; videoId: string };

export function useYouTubePlayer(
  hostRef: RefObject<HTMLElement | null>,
  handlers: { onEnded?: () => void; onError?: (e: ErrorEvent) => void } = {}
) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;
  const playerRef = useRef<YTPlayer | null>(null);
  const rafRef = useRef<number | null>(null);
  const [playback, setPlayback] = useState<PlaybackState>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastError, setLastError] = useState<ErrorEvent | null>(null);
  const currentVideoIdRef = useRef<string>("");

  const tick = useCallback(() => {
    const player = playerRef.current;
    if (player) {
      setCurrentTime(player.getCurrentTime());
      const d = player.getDuration();
      if (d > 0) setDuration(d);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeIframeApi().then(() => {
      if (cancelled || !hostRef.current || !window.YT) return;

      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: currentVideoIdRef.current,
        playerVars: {
          playsinline: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            rafRef.current = requestAnimationFrame(tick);
          },
          onStateChange: (e) => {
            const YT = window.YT!;
            if (e.data === YT.PlayerState.PLAYING) setPlayback("playing");
            else if (e.data === YT.PlayerState.PAUSED) setPlayback("paused");
            else if (e.data === YT.PlayerState.ENDED) {
              setPlayback("paused");
              handlersRef.current.onEnded?.();
            }
          },
          onError: (e) => {
            const err = { code: e.data, videoId: currentVideoIdRef.current };
            setLastError(err);
            handlersRef.current.onError?.(err);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // hostRef.current is stable for the lifetime of the mounted host node.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostRef, tick]);

  const load = useCallback((videoId: string, autoplay: boolean) => {
    currentVideoIdRef.current = videoId;
    setCurrentTime(0);
    setDuration(0);
    const player = playerRef.current;
    if (!player) return;
    player.loadVideoById(videoId);
    if (!autoplay) {
      // loadVideoById auto-plays; pause immediately if we didn't want that.
      setTimeout(() => player.pauseVideo(), 50);
    }
  }, []);

  const play = useCallback(() => playerRef.current?.playVideo(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);
  const seek = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setCurrentTime(seconds);
  }, []);

  return { playback, currentTime, duration, lastError, load, play, pause, seek };
}
