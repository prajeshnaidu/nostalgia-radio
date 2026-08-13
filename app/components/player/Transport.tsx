"use client";

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6 5h2v14H6zM19 5v14l-11-7z" />
    </svg>
  );
}
function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16 5h2v14h-2zM5 5v14l11-7z" />
    </svg>
  );
}
function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

export default function Transport({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  size,
}: {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  size: "desktop" | "mobile";
}) {
  const tapTarget = size === "mobile" ? "h-11 w-11" : "h-8 w-8";
  const playSize =
    size === "mobile"
      ? "h-[52px] w-[52px] bg-gradient-to-b from-marigold to-marigold-deep ring-1 ring-white/25 shadow-[0_8px_20px_-4px_rgb(226_162_59_/_0.55)]"
      : "h-9 w-9 bg-gradient-to-b from-marigold to-marigold-deep shadow-[0_4px_12px_-2px_rgb(226_162_59_/_0.5)]";

  return (
    <div className="flex items-center gap-1.5 text-cream">
      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrev}
        className={`flex ${tapTarget} items-center justify-center rounded-full text-cream/80 transition hover:text-cream`}
      >
        <PrevIcon />
      </button>
      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={onPlayPause}
        className={`flex items-center justify-center rounded-full text-ink ${playSize}`}
      >
        {isPlaying ? (
          <PauseIcon className={size === "mobile" ? "h-5 w-5" : "h-4 w-4"} />
        ) : (
          <PlayIcon className={size === "mobile" ? "h-5 w-5 translate-x-0.5" : "h-4 w-4 translate-x-0.5"} />
        )}
      </button>
      <button
        type="button"
        aria-label="Next track"
        onClick={onNext}
        className={`flex ${tapTarget} items-center justify-center rounded-full text-cream/80 transition hover:text-cream`}
      >
        <NextIcon />
      </button>
    </div>
  );
}
