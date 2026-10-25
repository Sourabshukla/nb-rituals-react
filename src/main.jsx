
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Heart, Instagram, Menu, Minus, Plus, Search, ShoppingBag,
  Sparkles, Trash2, X
} from "lucide-react";
import "./style.css";

const BASE = import.meta.env.BASE_URL;
const image = (name) => `${BASE}images/${name}`;

// Confirm this WhatsApp number before publishing.
const WHATSAPP_NUMBER = "919151613141";

const INSTAGRAM_URL = "https://www.instagram.com/nbritus/?hl=en";
const FACEBOOK_URL =
  "https://www.facebook.com/people/NB-RITUS/61595611201015/";

const products = [
  {
    id: 1,
    name: "Festive Door Torans",
    category: "Torans",
    image: "torans.jpg",
    description: "A beautiful welcome for every celebration.",
    featured: true
  },
  {
    id: 2,
    name: "Shubh Labh & Wall Décor",
    category: "Home Décor",
    image: "home-decor.jpg",
    description: "Traditional details for a welcoming home."
  },
  {
    id: 3,
    name: "Pooja Thali & Essentials",
    category: "Pooja",
    image: "pooja-thali.jpg",
    description: "Thoughtful touches for meaningful rituals."
  },
  {
    id: 4,
    name: "Curtain Holders & Tiebacks",
    category: "Accessories",
    image: "curtain-holders.jpg",
    description: "Finishing touches that bring a room together."
  },
  {
    id: 5,
    name: "Decorative Accents",
    category: "Accessories",
    image: "accessories.jpg",
    description: "Little details with a festive spirit."
  },
  {
    id: 6,
    name: "Seasonal Celebrations",
    category: "Festive",
    image: "festive-edits.jpg",
    description: "Discover décor for special moments."
  },
  {
    id: 7,
    name: "Thoughtful Gift Hampers",
    category: "Gifting",
    image: "gifting-hampers.jpg",
    description: "A little joy, beautifully presented."
  }
];

const categories = [
  "All Collections",
  "Torans",
  "Home Décor",
  "Pooja",
  "Accessories",
  "Festive",
  "Gifting"
];

function makeWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All Collections");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Collections" ||
        product.category === activeCategory;

      const matchesSearch =
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to your enquiry bag`);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function createEnquiryMessage() {
    const lines = cart.map(
      (item) => `• ${item.name} — Quantity: ${item.quantity}`
    );

    return [
      "Namaste NB RITUS!",
      "",
      "I would like to enquire about these products:",
      ...lines,
      "",
      "Please share the prices, availability and delivery details.",
      "Thank you!"
    ].join("\n");
  }

  function openWhatsApp(message) {
    window.open(makeWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  function checkout() {
    if (cart.length === 0) return;
    openWhatsApp(createEnquiryMessage());
  }

  function enquireAbout(product) {
    openWhatsApp(
      `Namaste NB RITUS!\n\nI am interested in ${product.name}.\nPlease share the price, availability and details.`
    );
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div className="site-shell" id="home">
      <div className="announcement-bar">
        <Sparkles size={14} />
        <span>Thoughtfully curated · Made for moments that matter</span>
        <Sparkles size={14} />
      </div>

      <header className="site-header">
        <a
          className="brand"
          href="#home"
          aria-label="NB RITUS home"
          onClick={closeMobileMenu}
        >
          <img
            className="brand-logo"
            src={image("logo.jpg")}
            alt="NB RITUS"
          />
          <span className="brand-words">
            <strong>NB RITUS</strong>
            <small>NANAD BHABHI SEASONAL STUDIO</small>
          </span>
        </a>

        <button
          className="icon-button mobile-menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`main-nav ${mobileMenuOpen ? "nav-open" : ""}`}>
          <a href="#home" onClick={closeMobileMenu}>Home</a>
          <a href="#collections" onClick={closeMobileMenu}>Collections</a>
          <a href="#story" onClick={closeMobileMenu}>Our Journey</a>
          <a href="#contact" onClick={closeMobileMenu}>Contact</a>
        </nav>

        <div className="header-actions">
          <button
            className="cart-trigger"
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open enquiry bag, ${cartCount} items`}
          >
            <ShoppingBag size={19} />
            <span>My Bag</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              A CELEBRATION OF TRADITION
            </span>

            <h1>
              Traditional elegance
              <br />
              for your <em>special moments.</em>
            </h1>

            <p className="hero-description">
              Discover thoughtfully curated festive décor and meaningful
              gifts that make your home feel warm, welcoming and uniquely yours.
            </p>

            <div className="hero-buttons">
              <a className="button button-primary" href="#collections">
                Explore Collection <ArrowUpRight size={17} />
              </a>
              <a className="button button-text" href="#story">
                Our Journey <ArrowDownRight size={17} />
              </a>
            </div>

            <div className="hero-signature">
              <span className="signature-icon">✳</span>
              <span>
                <strong>Two hearts. One creative bond.</strong>
                <small>Celebrating the beauty of togetherness.</small>
              </span>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-image-frame">
              <img
                className="hero-image"
                src={image("torans.jpg")}
                alt="Festive entrance décor from the NB RITUS collection"
                fetchPriority="high"
              />
            </div>
            <div className="hero-stamp" aria-hidden="true">
              <span>MADE WITH</span>
              <Heart size={20} fill="currentColor" />
              <span>TRADITION</span>
            </div>
            <div className="hero-caption">
              <span>THE FESTIVE EDIT</span>
              <span>Tradition, thoughtfully styled.</span>
            </div>
          </div>

          <span className="hero-decoration decoration-one" aria-hidden="true">
            ✳
          </span>
          <span className="hero-decoration decoration-two" aria-hidden="true">
            ✺
          </span>
        </section>

        <section className="values-strip" aria-label="Our values">
          <div><Sparkles /><span>Thoughtfully Curated</span></div>
          <span className="value-separator">✦</span>
          <div><Heart /><span>Made with Care</span></div>
          <span className="value-separator">✦</span>
          <div><ShoppingBag /><span>Beautiful for Gifting</span></div>
        </section>

        <section className="intro-section" id="highlights">
          <span className="eyebrow">THE ART OF CELEBRATING</span>
          <h2>
            Little details.
            <br />
            <em>Lasting memories.</em>
          </h2>
          <p>
            From a welcoming entrance to the finishing touch on your festive
            table, discover pieces that bring tradition and beauty into
            everyday moments.
          </p>
          <a className="underlined-link" href="#collections">
            Find your favourite pieces <ArrowRight size={16} />
          </a>
        </section>

        <section className="collection-section" id="collections">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A LITTLE SOMETHING SPECIAL</span>
              <h2>Explore our collection<span className="gold-dot">.</span></h2>
              <p>Meaningful pieces for homes, rituals and celebrations.</p>
            </div>
            <span className="collection-count">
              {visibleProducts.length.toString().padStart(2, "0")} PIECES
            </span>
          </div>

          <div className="catalogue-toolbar">
            <div className="category-filters" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    activeCategory === category
                      ? "category-chip selected"
                      : "category-chip"
                  }
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="search-box">
              <Search size={18} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search the collection"
                aria-label="Search products"
              />
              {search && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  <X size={16} />
                </button>
              )}
            </label>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img
                    className="product-image"
                    src={image(product.image)}
                    alt={product.name}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <span className="product-tag">
                    {product.featured ? "OUR FAVOURITE" : product.category}
                  </span>
                  <button
                    type="button"
                    className="quick-add"
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to enquiry bag`}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="product-details">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-bottom">
                    <span className="price-enquiry">Price on enquiry</span>
                    <button
                      type="button"
                      className="product-enquire"
                      onClick={() => enquireAbout(product)}
                    >
                      Enquire <ArrowUpRight size={15} />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="add-to-bag"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingBag size={16} /> Add to Enquiry Bag
                  </button>
                </div>
              </article>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="empty-results">
              <Search size={30} />
              <h3>No matching pieces found</h3>
              <p>Try another search term or choose a different category.</p>
              <button
                className="button button-primary"
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All Collections");
                }}
              >
                View all collections
              </button>
            </div>
          )}

          <p className="catalogue-note">
            Every piece is subject to availability. Contact us for current
            prices, custom requests and product details.
          </p>
        </section>

        <section className="quote-section">
          <span className="quote-flower" aria-hidden="true">✳</span>
          <span className="eyebrow">A THOUGHT TO CHERISH</span>
          <blockquote>
            “It’s the little things that turn a moment into a memory.”
          </blockquote>
          <span className="quote-rule" />
          <span className="quote-signoff">With love, NB RITUS</span>
        </section>

        <section className="story-section" id="story">
          <div className="story-image-wrap">
            <img
              src={image("festive-edits.jpg")}
              alt="Festive details and seasonal décor"
              loading="lazy"
            />
            <span className="story-image-note">A SHARED LOVE FOR BEAUTY</span>
          </div>

          <div className="story-copy">
            <span className="eyebrow">OUR JOURNEY</span>
            <h2>
              Two hearts,
              <br />
              <em>one creative bond.</em>
            </h2>
            <p>
              NB RITUS began with a special family bond: a Nanad and Bhabhi
              who share a love for making celebrations feel personal.
            </p>
            <p>
              Together, we thoughtfully curate festive décor that brings
              traditional charm into today’s homes. Every collection reflects
              our shared eye for detail, beauty and the joy of welcoming
              people in.
            </p>
            <p>
              From entrances that greet loved ones to little details that make
              rituals meaningful, our hope is to help you make every occasion
              feel a little more special.
            </p>
            <a className="button button-primary" href="#contact">
              Let’s make it special <ArrowUpRight size={17} />
            </a>
            <div className="story-signature">Made with love, always ♡</div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner">
            <span className="eyebrow">YOUR NEXT SPECIAL MOMENT</span>
            <h2>Found something <em>you love?</em></h2>
            <p>
              Ask us about prices, availability, gifting and the little
              details that make a piece yours.
            </p>
            <button
              type="button"
              className="button button-light"
              onClick={() =>
                openWhatsApp(
                  "Namaste NB RITUS! I would love to explore your collection. Please share current products, prices and availability."
                )
              }
            >
              Start a conversation <ArrowUpRight size={18} />
            </button>
            <span className="contact-note">
              No online payment · Details confirmed personally
            </span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a href="#home" className="footer-brand">
            <span className="footer-brand-name">NB RITUS</span>
            <span className="footer-brand-subtitle">
              NANAD BHABHI SEASONAL STUDIO
            </span>
          </a>
          <p className="footer-message">
            Handmade with love, for the moments that matter.
          </p>
          <div className="social-links">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="NB RITUS on Instagram"
            >
              <Instagram size={19} />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="NB RITUS on Facebook"
            >
              <span className="facebook-letter">f</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NB RITUS. All rights reserved.</span>
          <div>
            <a href="#collections">Collections</a>
            <a href="#story">Our Journey</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#home" className="back-to-top">
            Back to top ↑
          </a>
        </div>
      </footer>

      {notice && (
        <div className="toast-message" role="status">
          <Check size={18} /> {notice}
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <button
        className="floating-whatsapp"
        type="button"
        onClick={() =>
          openWhatsApp(
            "Namaste NB RITUS! Please help me explore your festive collection."
          )
        }
        aria-label="Enquire with NB RITUS on WhatsApp"
      >
        <WhatsAppMark />
        <span>Enquire</span>
      </button>

      {cartOpen && (
        <div
          className="drawer-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-heading"
          >
            <div className="drawer-heading">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2 id="cart-heading">Enquiry bag ({cartCount})</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close enquiry bag"
              >
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={38} />
                <h3>Your bag is waiting</h3>
                <p>Add pieces you love and enquire about them together.</p>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => {
                    setCartOpen(false);
                    document.getElementById("collections")?.scrollIntoView({
                      behavior: "smooth"
                    });
                  }}
                >
                  Explore collection <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img src={image(item.image)} alt="" />
                      <div className="cart-item-info">
                        <span className="product-category">{item.category}</span>
                        <h3>{item.name}</h3>
                        <span className="price-enquiry">Price on enquiry</span>
                        <div className="quantity-controls">
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </article>
                  ))}
                </div>

                <div className="cart-footer">
                  <p>
                    Prices and availability will be confirmed personally on
                    WhatsApp. No payment is collected on this website.
                  </p>
                  <button
                    type="button"
                    className="button button-primary checkout-button"
                    onClick={checkout}
                  >
                    Proceed to Enquiry <ArrowUpRight size={18} />
                  </button>
                  <button
                    type="button"
                    className="continue-shopping"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue browsing
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function WhatsAppMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" />
      <path d="M8.7 8.1c.2-.5.5-.5.8-.5h.4c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .7.5.9 1.3 1.6 2.2 2.1.3.2.5.1.7-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .3-.2 1.2-.8 1.6-.5.4-1.1.5-1.8.3-1-.2-2.3-.8-3.6-1.9-1.1-.9-2-2.1-2.3-3.1-.3-.9 0-1.8.5-2.3Z" />
    </svg>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
