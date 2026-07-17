import { useState } from "react";

const INITIAL_STATE = {
  title: "",
  author: "",
  category: "codificacao",
  rating: 4,
  text: "",
  reviewer: "",
};

export function PublishForm({ onPublish }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [status, setStatus] = useState({ message: "", type: null });
  const [isSaving, setIsSaving] = useState(false);

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.author.trim() || !form.text.trim() || !form.reviewer.trim()) {
      setStatus({ message: "Preencha todos os campos antes de publicar.", type: "err" });
      return;
    }

    setIsSaving(true);
    setStatus({ message: "", type: null });

    try {
      await onPublish({
        title: form.title.trim(),
        author: form.author.trim(),
        category: form.category,
        rating: form.rating,
        text: form.text.trim(),
        reviewer: form.reviewer.trim(),
      });
      setForm(INITIAL_STATE);
      setStatus({
        message: "Resenha publicada! Ela já está visível para todos os visitantes.",
        type: "ok",
      });
    } catch (err) {
      console.error(err);
      setStatus({ message: err.message || "Não foi possível publicar agora. Tente novamente.", type: "err" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="publish" id="publicar">
      <div className="wrap">
        <span className="eyebrow">Contribua</span>
        <div className="publish-inner">
          <div className="publish-note">
            <h2>Publique sua resenha</h2>
            <p>
              Compartilhe sua leitura de um livro espírita — o que ele esclareceu, consolou ou fez
              você repensar. Sua análise ajuda outros leitores a escolher a próxima obra.
            </p>
            <p className="disclaimer">
              Sua resenha ficará visível publicamente para todas as pessoas que visitarem esta página.
            </p>
          </div>

          <form className="review-form" onSubmit={handleSubmit}>
            <div className="full">
              <label htmlFor="fTitle">Título do livro</label>
              <input
                id="fTitle"
                type="text"
                required
                placeholder="Ex.: O Livro dos Espíritos"
                value={form.title}
                onChange={updateField("title")}
              />
            </div>
            <div>
              <label htmlFor="fAuthor">Autor / Psicógrafo</label>
              <input
                id="fAuthor"
                type="text"
                required
                placeholder="Ex.: Allan Kardec"
                value={form.author}
                onChange={updateField("author")}
              />
            </div>
            <div>
              <label htmlFor="fCategory">Categoria</label>
              <select id="fCategory" value={form.category} onChange={updateField("category")}>
                <option value="codificacao">Codificação kardequiana</option>
                <option value="psicografia">Psicografia</option>
                <option value="romance">Romance espírita</option>
                <option value="estudo">Estudo e doutrina</option>
              </select>
            </div>
            <div className="full">
              <label>Grau de luz (avaliação)</label>
              <div className="rating-select" role="group" aria-label="Grau de luz de 1 a 5">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    className="rating-btn"
                    aria-pressed={form.rating === v}
                    onClick={() => setForm((f) => ({ ...f, rating: v }))}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="full">
              <label htmlFor="fText">Sua resenha</label>
              <textarea
                id="fText"
                required
                placeholder="O que essa leitura trouxe para você?"
                value={form.text}
                onChange={updateField("text")}
              />
            </div>
            <div>
              <label htmlFor="fReviewer">Seu nome</label>
              <input
                id="fReviewer"
                type="text"
                required
                placeholder="Como quer assinar"
                value={form.reviewer}
                onChange={updateField("reviewer")}
              />
            </div>
            <div className="full form-footer">
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? "Publicando…" : "Publicar resenha"}
              </button>
              <span className={`form-status ${status.type ? status.type : ""}`}>{status.message}</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
