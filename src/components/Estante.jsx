const CATEGORIES = [
  ["todas", "Todas"],
  ["codificacao", "Codificação kardequiana"],
  ["psicografia", "Psicografias"],
  ["romance", "Romances espíritas"],
  ["estudo", "Estudo e doutrina"],
];

export function Estante({ activeCategory, onChangeCategory }) {
  return (
    <section className="estante" id="estante">
      <div className="wrap estante-inner">
        <span className="eyebrow">A estante</span>
        <div className="chips" role="group" aria-label="Filtrar por categoria">
          {CATEGORIES.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className="chip"
              aria-pressed={activeCategory === value}
              onClick={() => onChangeCategory(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
