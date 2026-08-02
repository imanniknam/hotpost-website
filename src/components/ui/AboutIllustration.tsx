/**
 * Fills the About section's image slot until the client sends real photography
 * (AI-generated shots are being commissioned — see the brief in project notes).
 * An abstract parcel motif in brand colors, not a stand-in meant to look like a
 * photo, so it reads as an intentional design choice rather than a placeholder.
 */
export function AboutIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 400" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="about-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-100)" />
          <stop offset="100%" stopColor="var(--color-brand-50)" />
        </linearGradient>
        <linearGradient id="about-box" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-brand-600)" />
        </linearGradient>
        <linearGradient id="about-box-lid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-500)" />
          <stop offset="100%" stopColor="var(--color-brand-700)" />
        </linearGradient>
      </defs>

      <rect width="480" height="400" rx="24" fill="url(#about-bg)" />

      {/* Soft depth blobs */}
      <circle cx="410" cy="70" r="90" fill="var(--color-brand-200)" opacity="0.35" />
      <circle cx="60" cy="340" r="110" fill="var(--color-brand-300)" opacity="0.25" />

      {/* Dotted flight path, evoking tracking/movement */}
      <path
        d="M70 300 C 150 220, 210 220, 240 200 S 330 140, 410 110"
        fill="none"
        stroke="var(--color-brand-400)"
        strokeWidth="3"
        strokeDasharray="2 12"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="410" cy="110" r="6" fill="var(--color-brand-500)" />

      {/* Main parcel */}
      <g transform="translate(150 150)">
        <rect x="0" y="40" width="180" height="130" rx="10" fill="url(#about-box)" />
        <path d="M0 70 L180 70" stroke="var(--color-brand-800)" strokeWidth="6" opacity="0.25" />
        <path d="M90 40 L90 170" stroke="var(--color-brand-800)" strokeWidth="6" opacity="0.25" />
        <path
          d="M-8 40 L90 -6 L188 40 L90 76 Z"
          fill="url(#about-box-lid)"
        />
      </g>

      {/* Smaller companion parcel */}
      <g transform="translate(60 230)">
        <rect x="0" y="20" width="76" height="60" rx="6" fill="var(--color-brand-300)" />
        <path d="M-4 20 L38 0 L80 20 L38 34 Z" fill="var(--color-brand-400)" />
      </g>
    </svg>
  );
}
