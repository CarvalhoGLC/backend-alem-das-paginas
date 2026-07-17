import { FlameRating } from "./FlameIcon.jsx";
import { CATEGORY_LABELS } from "../data/seedReviews.js";

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export function ReviewCard({ review }) {
  return (
    <article className="card">
      <span className="category-tag">{CATEGORY_LABELS[review.category] || review.category}</span>
      <h3>{review.title}</h3>
      <div className="author">{review.author}</div>
      <FlameRating rating={review.rating} />
      <p className="excerpt">{review.text}</p>
      <div className="card-meta">
        <span>{review.reviewer}</span>
        <span>{formatDate(review.date)}</span>
      </div>
    </article>
  );
}
