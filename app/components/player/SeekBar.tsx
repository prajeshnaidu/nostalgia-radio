"use client";

import { useCallback, useRef, useState } from "react";

export default function SeekBar({
  currentTime,
  duration,
  onSeek,
  className = "",
}: {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragRatio, setDragRatio] = useState(0);

  const ratioFromEvent = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const commit = useCallback(
    (ratio: number) => {
      if (duration > 0) onSeek(ratio * duration);
    },
    [duration, onSeek]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const ratio = ratioFromEvent(e.clientX);
      setDragging(true);
      setDragRatio(ratio);
    },
    [ratioFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      setDragRatio(ratioFromEvent(e.clientX));
    },
    [dragging, ratioFromEvent]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      const ratio = ratioFromEvent(e.clientX);
      setDragging(false);
      commit(ratio);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    },
    [dragging, ratioFromEvent, commit]
  );

  const liveRatio = duration > 0 ? currentTime / duration : 0;
  const shownRatio = dragging ? dragRatio : liveRatio;

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`group/seek relative flex h-6 w-full touch-none items-center ${className}`}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(currentTime)}
    >
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-marigold shadow-[0_0_8px_rgb(226_162_59_/_0.8)]"
          style={{ width: `${shownRatio * 100}%` }}
        />
      </div>
      <div
        className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 rounded-full bg-cream opacity-0 shadow transition-opacity group-hover/seek:opacity-100"
        style={{ left: `${shownRatio * 100}%` }}
      />
    </div>
  );
}
