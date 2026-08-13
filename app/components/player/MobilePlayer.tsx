"use client";

import type { RefObject } from "react";
import type { Track } from "@/app/lib/types";
import { formatTime } from "@/app/lib/useMediaQuery";
import SeekBar from "./SeekBar";
import Transport from "./Transport";

export default function MobilePlayer({
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
    <div className="glass flex w-full max-w-xl flex-col gap-3 rounded-[26px] p-4 sm:hidden">
      {/* Row 1 — vinyl + title/artist */}
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 self-start">
          <div
            className={`h-16 w-16 overflow-hidden rounded-full ${
              isPlaying ? "vinyl-spin" : ""
            }`}
            style={{ animationPlayState: isPlaying ? "running" : "paused" }}
          >
            <div className="relative h-full w-full">
              <div
                ref={!isDesktopActive ? vinylSlotRef : undefined}
                className="absolute top-1/2 left-1/2 aspect-video h-[178%] -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[15px] font-semibold text-cream">
            {track.title}
          </p>
          <p className="truncate text-[12.5px] text-cream/70">{track.artist || "Unknown artist"}</p>
        </div>
      </div>

      {/* Row 2 — full width seek bar */}
      <SeekBar currentTime={currentTime} duration={duration || track.duration} onSeek={onSeek} />

      {/* Row 3 — time left, transport centred */}
      <div className="grid grid-cols-3 items-center">
        <p className="font-body text-[10.5px] tabular-nums text-cream/60">
          {formatTime(currentTime)} / {formatTime(duration || track.duration)}
        </p>
        <div className="flex justify-center">
          <Transport
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            onNext={onNext}
            onPrev={onPrev}
            size="mobile"
          />
        </div>
        <div />
      </div>
    </div>
  );
}
