// Stylized "bling rapper" avatar for Money Boy — an original cartoon icon
// (silhouette + sunglasses + gold chain + flat-brim cap), not a photo or
// likeness of any real person, and no third-party logos/trademarks.
export function MoneyBoyAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Money Boy Avatar"
    >
      <defs>
        <linearGradient id="mb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id="mb-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe082" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#a97e0f" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" fill="url(#mb-bg)" />

      {/* head + neck */}
      <circle cx="32" cy="28" r="14" fill="#3c3c3c" />
      <rect x="26" y="38" width="12" height="10" fill="#3c3c3c" />

      {/* flat-brim cap */}
      <path d="M16 22 a16 16 0 0 1 32 0 z" fill="#111" />
      <rect x="12" y="20" width="40" height="4" rx="2" fill="#111" />
      <rect x="12" y="20" width="40" height="4" rx="2" fill="url(#mb-gold)" opacity="0.35" />

      {/* sunglasses */}
      <rect x="18" y="26" width="28" height="7" rx="3.5" fill="#0a0a0a" />
      <rect x="21" y="27.5" width="8" height="2.4" rx="1.2" fill="#fff" opacity="0.55" />

      {/* gold chain + pendant */}
      <path
        d="M22 46 q10 8 20 0"
        fill="none"
        stroke="url(#mb-gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="53" r="4.2" fill="url(#mb-gold)" />
      <text
        x="32"
        y="55.5"
        textAnchor="middle"
        fontSize="6"
        fontWeight="bold"
        fill="#3a2a00"
      >
        $
      </text>
    </svg>
  );
}
