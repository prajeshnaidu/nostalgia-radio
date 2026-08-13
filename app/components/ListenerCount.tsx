"use client";

import { useEffect, useState } from "react";

const BASE = 128;

export default function ListenerCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(BASE + Math.floor(Math.random() * 12));
    const id = setInterval(() => {
      setCount((c) => {
        const current = c ?? BASE;
        const step = Math.floor(Math.random() * 5) - 2; // -2..+2
        return Math.max(1, current + step);
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-1.5 font-body text-[11px] text-cream/70">
      <span className="h-1.5 w-1.5 rounded-full bg-marigold shadow-[0_0_6px_rgb(226_162_59_/_0.9)]" />
      {count ?? "—"} listening now
    </span>
  );
}
