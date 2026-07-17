import { HeroArt } from "./HeroArt.jsx";

export function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="wrap" style={{ display: "contents" }}>
        <div>
          <span className="eyebrow">Leituras espíritas em resenha</span>
          <h1 style={{ marginTop: 14 }}>
            Todo livro é uma <em>vela acesa</em>
          </h1>
          <p className="thesis">
            Ilumina o que a razão pergunta e o que o coração já pressentia. Aqui reunimos resenhas
            sobre a codificação kardequiana, romances espirituais e obras psicografadas — para
            leitores que estudam, comparam e compartilham o que a leitura revelou.
          </p>
          <div className="cta-row">
            <a href="#resenhas" className="btn btn-primary">
              Ver resenhas
            </a>
            <a href="#publicar" className="btn btn-ghost">
              Publicar uma resenha
            </a>
          </div>
        </div>
        <div className="hero-art">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
