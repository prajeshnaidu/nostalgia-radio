"use client";

import type { RefObject } from "react";
import type { Track } from "@/app/lib/types";
import { formatTime } from "@/app/lib/useMediaQuery";
import SeekBar from "./SeekBar";
import Transport from "./Transport";

export default function DesktopPlayer({
  vinylSlotRef,
  isDesktopActive,
  track,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
}: {
  vinylSlotRef: RefObject<HTMLDivElement | null>;
  isDesktopActive: boolean;
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (s: number) => void;
}) {
  return (
    <div className="glass hidden w-full max-w-xl items-center gap-4 rounded-full p-3 pr-5 sm:flex">
      {/* Vinyl / artwork slot — the live YT host is portaled in here on desktop */}
      <div className="relative h-20 w-20 shrink-0 self-start">
        <div
          className={`h-20 w-20 overflow-hidden rounded-full ${
            isPlaying ? "vinyl-spin" : ""
          }`}
          style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        >
          {/* aspect-video-sized host, scaled to fill+crop the circle evenly
              on both sides rather than squashing a 16:9 frame into a square */}
          <div className="relative h-full w-full">
            <div
              ref={isDesktopActive ? vinylSlotRef : undefined}
              className="absolute top-1/2 left-1/2 aspect-video h-[178%] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-[15px] font-semibold text-cream">
              {track.title}
            </p>
            <p className="truncate text-[12.5px] text-cream/70">{track.artist || "Unknown artist"}</p>
          </div>
          <p className="shrink-0 font-body text-[10.5px] tabular-nums text-cream/60">
            {formatTime(currentTime)} / {formatTime(duration || track.duration)}
          </p>
        </div>
        <SeekBar
          currentTime={currentTime}
          duration={duration || track.duration}
          onSeek={onSeek}
          className="mt-1.5"
        />
      </div>

      <Transport
        isPlaying={isPlaying}
        onPlayPause={onPlayPause}
        onNext={onNext}
        onPrev={onPrev}
        size="desktop"
      />
    </div>
  );
}
