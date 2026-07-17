import { useState } from "react";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Estante } from "./components/Estante.jsx";
import { ReviewsSection } from "./components/ReviewsSection.jsx";
import { PublishForm } from "./components/PublishForm.jsx";
import { About } from "./components/About.jsx";
import { Footer } from "./components/Footer.jsx";
import { useReviews } from "./hooks/useReviews.js";

export default function App() {
  const { reviews, addReview, loadError } = useReviews();
  const [activeCategory, setActiveCategory] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="adp-root">
      <Header />
      {loadError && <div className="banner banner-error">{loadError}</div>}
      <Hero />
      <Estante activeCategory={activeCategory} onChangeCategory={setActiveCategory} />
      <ReviewsSection
        reviews={reviews}
        activeCategory={activeCategory}
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
      />
      <PublishForm onPublish={addReview} />
      <About />
      <Footer />
    </div>
  );
}
