import Clock from "./components/Clock";
import ListenerCount from "./components/ListenerCount";
import SocialLinks from "./components/SocialLinks";
import GrainOverlay from "./components/GrainOverlay";
import PlayerShell from "./components/player/PlayerShell";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <div aria-hidden className="hero-bg fixed inset-0 z-0" />
      <GrainOverlay />

      <div className="safe-tl fixed z-10">
        <Clock />
      </div>
      <div
        className="fixed left-1/2 top-0 z-10 -translate-x-1/2"
        style={{ marginTop: "max(1rem, env(safe-area-inset-top))" }}
      >
        <ListenerCount />
      </div>
      <div className="safe-tr fixed z-10">
        <SocialLinks />
      </div>

      <div className="safe-b fixed inset-x-0 z-10 flex w-full justify-center px-4">
        <PlayerShell />
      </div>
    </main>
  );
}
