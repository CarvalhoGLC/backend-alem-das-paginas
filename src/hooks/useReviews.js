import { useState, useEffect, useCallback, useRef } from "react";
import { SEED_REVIEWS } from "../data/seedReviews";
import { fetchReviews, createReview } from "../lib/api";

const POLL_INTERVAL_MS = 20000;

function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    category: row.category,
    rating: row.rating,
    text: row.text,
    reviewer: row.reviewer,
    date: (row.created_at || "").slice(0, 10),
  };
}

/**
 * Busca e publica resenhas usando a função serverless em /api/reviews,
 * que lê e grava num banco Postgres (Neon, via Vercel Marketplace).
 * As resenhas ficam visíveis para todos os visitantes do site.
 *
 * Como funções serverless não mantêm conexões abertas com o navegador,
 * este hook faz um polling leve (a cada 20s) para trazer resenhas
 * publicadas por outras pessoas sem precisar recarregar a página.
 */
export function useReviews() {
  const [dbReviews, setDbReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const knownIds = useRef(new Set());

  const refresh = useCallback(async ({ silent } = {}) => {
    try {
      const rows = await fetchReviews();
      const mapped = rows.map(mapRow);
      mapped.forEach((r) => knownIds.current.add(r.id));
      setDbReviews(mapped);
      if (!silent) setLoadError(null);
    } catch (err) {
      console.error("Erro ao carregar resenhas:", err);
      if (!silent) {
        setLoadError(
          "Não foi possível carregar as resenhas do banco de dados. Verifique se a variável DATABASE_URL está configurada."
        );
      }
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(() => refresh({ silent: true }), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refresh]);

  const addReview = useCallback(async (reviewData) => {
    const row = await createReview(reviewData);
    const review = mapRow(row);
    if (!knownIds.current.has(review.id)) {
      knownIds.current.add(review.id);
      setDbReviews((prev) => [review, ...prev]);
    }
    return review;
  }, []);

  const allReviews = [...dbReviews, ...SEED_REVIEWS];

  return {
    reviews: allReviews,
    addReview,
    isLoaded,
    loadError,
  };
}
