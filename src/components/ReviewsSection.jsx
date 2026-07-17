import { useMemo } from "react";
import { ReviewCard } from "./ReviewCard.jsx";

export function ReviewsSection({ reviews, activeCategory, searchTerm, onChangeSearch }) {
  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return reviews
      .filter((r) => activeCategory === "todas" || r.category === activeCategory)
      .filter(
        (r) =>
          !term ||
          r.title.toLowerCase().includes(term) ||
          r.author.toLowerCase().includes(term) ||
          r.reviewer.toLowerCase().includes(term)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [reviews, activeCategory, searchTerm]);

  return (
    <section className="reviews" id="resenhas">
      <div className="wrap">
        <div className="reviews-head">
          <h2>Resenhas recentes</h2>
          <input
            type="text"
            className="search-box"
            placeholder="Buscar por título, autor ou resenhista…"
            value={searchTerm}
            onChange={(e) => onChangeSearch(e.target.value)}
          />
        </div>

        {filtered.length > 0 ? (
          <div className="grid">
            {filtered.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            Nenhuma resenha encontrada com esse filtro. Que tal ser o primeiro a escrever sobre esse
            livro?
          </div>
        )}
      </div>
    </section>
  );
}
