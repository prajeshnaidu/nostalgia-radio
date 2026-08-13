"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export default function Clock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setNow(formatter.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    // Avoid a server/client markup mismatch before the first tick.
    return <span className="font-body text-sm text-cream/80">&nbsp;</span>;
  }

  const [time, meridiem] = now.split(" ");
  const [hour, minute] = time.split(":");

  return (
    <span className="flex items-baseline gap-1 font-body text-sm tabular-nums text-cream/85">
      <span>{hour}</span>
      <span className="animate-blink">:</span>
      <span>{minute}</span>
      {meridiem && <span className="ml-0.5 text-[11px] uppercase text-cream/60">{meridiem}</span>}
    </span>
  );
}
