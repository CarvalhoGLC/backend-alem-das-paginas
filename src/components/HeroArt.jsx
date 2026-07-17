export function HeroArt() {
  return (
    <svg width="320" height="260" viewBox="0 0 320 260" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="adp-glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#e6c479" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e6c479" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="90" r="110" fill="url(#adp-glow)" />
      <g className="flame flame-flicker" style={{ transformOrigin: "160px 60px" }}>
        <path
          d="M160 20C160 40 140 48 140 70C140 88 150 100 160 108C170 100 180 88 180 70C180 60 172 54 170 44C168 54 163 58 163 66C163 50 160 40 160 20Z"
          fill="#e6c479"
        />
      </g>
      <path d="M60 130 L155 118 L155 210 L60 222 Z" fill="#f4ead7" />
      <path d="M260 130 L165 118 L165 210 L260 222 Z" fill="#ece0c6" />
      <line x1="160" y1="119" x2="160" y2="216" stroke="#5b4b75" strokeWidth="2" />
      {[150, 168, 186].map((y) => (
        <line key={`l${y}`} x1="70" y1={y} x2="145" y2={y - 9} stroke="#c9a24b" strokeWidth="1" opacity="0.5" />
      ))}
      {[150, 168, 186].map((y) => (
        <line key={`r${y}`} x1="175" y1={y - 9} x2="250" y2={y} stroke="#c9a24b" strokeWidth="1" opacity="0.5" />
      ))}
    </svg>
  );
}
