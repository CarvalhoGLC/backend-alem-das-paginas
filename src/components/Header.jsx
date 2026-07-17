import { FlameIcon } from "./FlameIcon.jsx";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="#topo" className="logo">
          <span className="flame flame-flicker" aria-hidden="true">
            <FlameIcon size={18} filled />
          </span>
          Além das Páginas
        </a>
        <nav className="main-nav">
          <a href="#estante">Estante</a>
          <a href="#resenhas">Resenhas</a>
          <a href="#publicar">Publicar</a>
          <a href="#sobre">Sobre</a>
        </nav>
      </div>
    </header>
  );
}
