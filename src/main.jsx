import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const WHATSAPP_NUMBER = "919151613141"; // India country code + the number from your poster

const products = [
  { name: "Door Torans & Entrance Décor", category: "Torans", image: `${import.meta.env.BASE_URL}images/torans.jpg`, note: "Handmade welcome décor" },
  { name: "Shubh Labh & Wall Décor", category: "Home Décor", image: `${import.meta.env.BASE_URL}images/home-decor.jpg`, note: "Traditional festive accents" },
  { name: "Pooja Thali", category: "Pooja", image: `${import.meta.env.BASE_URL}images/pooja-thali.jpg`, note: "For your special rituals" },
  { name: "Curtain Holders & Tiebacks", category: "Accessories", image: `${import.meta.env.BASE_URL}images/curtain-holders.jpg`, note: "A handcrafted finishing touch" },
  { name: "Decorative Accessories", category: "Accessories", image: `${import.meta.env.BASE_URL}images/accessories.jpg`, note: "Little details for your home" },
  { name: "Festive & Seasonal Edits", category: "Festive", image: `${import.meta.env.BASE_URL}images/festive-edits.jpg`, note: "Celebrate every season" },
  { name: "Gifting & Hampers", category: "Gifting", image: `${import.meta.env.BASE_URL}images/gifting-hampers.jpg`, note: "Thoughtful gifts, made special" },
];

const categories = ["All", "Torans", "Home Décor", "Pooja", "Accessories", "Festive", "Gifting"];

function whatsappLink(productName) {
  const message = `Hi NB Rituals! I would like to know more about ${productName}. Please share details and price.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function App() {
  const [active, setActive] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const visible = products.filter(p =>
    (active === "All" || p.category === active) &&
    `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  );

  return <div>
    <div className="announcement">Handcrafted details. Heartfelt gifting. ✦</div>
    <header className="header">
      <a className="brand" href="#home" aria-label="NB Rituals home">
<img
  src={`${import.meta.env.BASE_URL}images/logo.jpg`}
  alt="NB Rituals logo"
/>        <span><strong>NB RITUALS</strong><small>Handmade with love</small></span>
      </a>
      <nav><a href="#collections">Collections</a><a href="#story">Our Story</a><a href="#contact">Contact</a></nav>
      <a className="header-cta" href={whatsappLink("your collection")} target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">NANAD BHABHI · SEASONAL STUDIO & CO.</p>
          <h1>Little details.<br/><em>Beautiful</em> traditions.</h1>
          <p className="hero-text">Thoughtfully handmade décor and meaningful gifts to make every corner feel like home.</p>
          <div className="hero-actions"><a className="primary-btn" href="#collections">Explore the collection <span>↗</span></a><a className="text-link" href="#story">Get to know us</a></div>
          <div className="hero-note"><span>✿</span> Made for celebrations, made to be cherished.</div>
        </div>
        <div className="hero-art">
          <div className="hero-image"><img src="/images/torans.jpg" alt="Handmade floral toran for a festive entrance" /></div>
          <div className="floating-note">See it<br/><em>Feel it</em><br/>Take it home ♡</div>
          <span className="decor decor-one">✳</span><span className="decor decor-two">✿</span>
        </div>
      </section>

      <section className="intro" id="story">
        <span className="eyebrow">A LITTLE SOMETHING SPECIAL</span>
        <h2>Beautiful home décor for<br/><em>every season & occasion</em></h2>
        <p>From festive torans to thoughtful gifts, discover handmade touches that bring warmth, colour and tradition into your home.</p>
      </section>

      <section className="catalogue" id="collections">
        <div className="section-heading">
          <div><span className="eyebrow">THE NB RITUALS EDIT</span><h2>Explore our collection</h2></div>
          <label className="search"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find something lovely..." /></label>
        </div>
        <div className="filters" aria-label="Filter products">
          {categories.map(c => <button key={c} className={active === c ? "filter active" : "filter"} onClick={() => setActive(c)}>{c}</button>)}
        </div>
        <div className="product-grid">
          {visible.map((p, i) => <article className="product-card" key={p.name}>
            <a className="product-image" href={whatsappLink(p.name)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${p.name}`}>
              <img src={p.image} alt={p.name} loading={i > 2 ? "lazy" : "eager"} /><span className="image-arrow">↗</span>
            </a>
            <div className="product-info"><span className="product-category">{p.category}</span><h3>{p.name}</h3><p>{p.note}</p><a href={whatsappLink(p.name)} target="_blank" rel="noreferrer" className="enquire-link">Ask for details <span>→</span></a></div>
          </article>)}
        </div>
        {visible.length === 0 && <p className="empty">No items found. Try another search.</p>}
      </section>

      <section className="contact-band" id="contact">
        <div><span className="eyebrow">LET'S MAKE IT SPECIAL</span><h2>Found something you love?</h2><p>Message us for product details, custom requests and gifting enquiries.</p></div>
        <a className="primary-btn light" href={whatsappLink("a product")} target="_blank" rel="noreferrer">Chat with us on WhatsApp ↗</a>
      </section>
    </main>

    <footer><a className="footer-brand" href="#home">NB RITUALS <span>✿</span></a><p>Handcrafted with love, for the moments that matter.</p><div className="footer-links"><a href="#collections">Shop collections</a><a href={whatsappLink("your collection")} target="_blank" rel="noreferrer">WhatsApp</a><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} NB Rituals. All rights reserved.</small></footer>
    <a className="whatsapp-float" href={whatsappLink("your collection")} target="_blank" rel="noreferrer" aria-label="Contact NB Rituals on WhatsApp">☏</a>
  </div>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
