"use client";

import type { Playlist } from "@/app/lib/types";

export default function PlaylistSwitcher({
  playlists,
  activeIndex,
  onSelect,
}: {
  playlists: Playlist[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex gap-1.5 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-md">
      {playlists.map((p, i) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelect(i)}
          aria-pressed={i === activeIndex}
          className={`rounded-full px-3 py-1 font-body text-[11.5px] font-medium tracking-wide transition ${
            i === activeIndex
              ? "bg-marigold text-ink"
              : "text-cream/60 hover:text-cream"
          }`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
