import { neon } from "@neondatabase/serverless";

// A Vercel injeta essa variável automaticamente ao instalar a integração
// Postgres (Neon) pelo Marketplace. Veja o README.md para o passo a passo.
const sql = neon(process.env.DATABASE_URL);

const REQUIRED_FIELDS = ["title", "author", "category", "rating", "text", "reviewer"];
const VALID_CATEGORIES = new Set(["codificacao", "psicografia", "romance", "estudo"]);
const MAX_LENGTHS = { title: 200, author: 200, reviewer: 120, text: 4000 };

// Domínio do frontend que pode chamar esta API (defina ALLOWED_ORIGIN nas
// variáveis de ambiente da Vercel, ex.: https://alem-das-paginas.vercel.app).
// Sem essa variável configurada, libera qualquer origem ("*") para não
// travar em desenvolvimento — troque para o domínio real em produção.
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  // Requisição de pré-checagem CORS que o navegador envia antes do POST
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    if (req.method === "GET") {
      const rows = await sql`
        SELECT id, title, author, category, rating, text, reviewer, created_at
        FROM reviews
        ORDER BY created_at DESC
      `;
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const body = req.body || {};
      const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
      if (missing.length > 0) {
        return res.status(400).json({
          error: `Campos obrigatórios ausentes: ${missing.join(", ")}.`,
        });
      }

      const title = String(body.title).trim();
      const author = String(body.author).trim();
      const category = String(body.category).trim();
      const reviewer = String(body.reviewer).trim();
      const text = String(body.text).trim();
      const ratingNumber = Number(body.rating);

      if (!VALID_CATEGORIES.has(category)) {
        return res.status(400).json({ error: "Categoria inválida." });
      }
      if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
        return res.status(400).json({ error: "O grau de luz deve ser um número entre 1 e 5." });
      }
      if (
        title.length > MAX_LENGTHS.title ||
        author.length > MAX_LENGTHS.author ||
        reviewer.length > MAX_LENGTHS.reviewer ||
        text.length > MAX_LENGTHS.text
      ) {
        return res.status(400).json({ error: "Um dos campos excede o tamanho máximo permitido." });
      }

      const [row] = await sql`
        INSERT INTO reviews (title, author, category, rating, text, reviewer)
        VALUES (${title}, ${author}, ${category}, ${ratingNumber}, ${text}, ${reviewer})
        RETURNING id, title, author, category, rating, text, reviewer, created_at
      `;
      return res.status(201).json(row);
    }

    res.setHeader("Allow", "GET, POST, OPTIONS");
    return res.status(405).json({ error: `Método ${req.method} não permitido.` });
  } catch (err) {
    console.error("Erro na API de resenhas:", err);
    return res.status(500).json({ error: "Erro interno ao acessar o banco de dados." });
  }
}