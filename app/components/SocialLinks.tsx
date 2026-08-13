const LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export default function SocialLinks() {
  return (
    <nav className="flex items-center gap-4 font-body text-[11px] uppercase tracking-wider text-cream/70">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          className="transition hover:text-marigold"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
