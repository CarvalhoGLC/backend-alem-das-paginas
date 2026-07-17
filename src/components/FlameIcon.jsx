export function FlameIcon({ filled = true, size = 14 }) {
  const color = filled ? "var(--gold)" : "#d9cfba";
  return (
    <svg width={size} height={size * 1.28} viewBox="0 0 18 24" fill="none" aria-hidden="true">
      <path
        d="M9 0C9 5 3 7 3 13.5C3 18.75 6.5 22 9 24C11.5 22 15 18.75 15 13.5C15 10.5 13 9 12.5 6.5C12 9.5 10.5 10 10.5 12C10.5 8 9 6 9 0Z"
        fill={color}
      />
    </svg>
  );
}

export function FlameRating({ rating }) {
  return (
    <div className="flames-row" aria-label={`Grau de luz: ${rating} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <FlameIcon key={i} filled={i <= rating} />
      ))}
    </div>
  );
}
