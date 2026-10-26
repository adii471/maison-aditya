import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Award, Eye, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { products } from '../data/coffeeData';
import { soundEngine } from '../utils/soundEngine';

gsap.registerPlugin(ScrollTrigger);

export default function Products({ onAddToCart, onInspectProduct }) {
  const sectionRef = useRef(null);
  const [selectedGrinds, setSelectedGrinds] = useState({});
  const [addedMap, setAddedMap] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.products__eyebrow', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products__header',
          start: 'top 80%',
        },
      });

      gsap.from('.products__title', {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products__header',
          start: 'top 80%',
        },
      });

      gsap.to('.product-card', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products__grid',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleGrindChange = (productId, grind) => {
    setSelectedGrinds((prev) => ({ ...prev, [productId]: grind }));
  };

  const handleAdd = (product, e) => {
    soundEngine.playChime();

    // Trigger subtle luxury gold confetti burst
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { x, y },
        colors: ['#DFB15B', '#D85820', '#F7F2EB'],
        disableForReducedMotion: true,
      });
    }

    const grind = selectedGrinds[product.id] || product.grinds[0];
    onAddToCart(product, grind);

    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section className="products" ref={sectionRef} id="collection">
      <div className="container">
        <div className="products__header">
          <p className="products__eyebrow">The Aditya Grand Cru Allocation</p>
          <h2 className="products__title">Single-Plot Reserve Lots</h2>
          <p className="products__lead">
            Certified above 94+ Q-Grade. Hand-roasted in numbered micro-batches of twelve kilograms each.
          </p>
        </div>

        <div className="products__grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              {/* Product Visual Container */}
              <div
                className="product-card__image-wrap"
                onClick={() => onInspectProduct(product)}
                data-cursor="CUPPING"
              >
                <img
                  className="product-card__image"
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />

                {/* Micro-Badges */}
                <div className="product-card__badges">
                  <span className="product-card__q-badge">
                    <Award size={12} className="text-gold" />
                    <span>{product.qScore} Q</span>
                  </span>
                  <span className="product-card__roast-badge">
                    {product.roastLevel}
                  </span>
                </div>

                <div className="product-card__overlay-btn">
                  <Eye size={15} />
                  <span>Inspect Cupping Sheet</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="product-card__body">
                <div className="product-card__meta-row">
                  <span className="product-card__lot">{product.lotNumber}</span>
                  <span className="product-card__elevation">{product.elevation}</span>
                </div>

                <h3
                  className="product-card__name"
                  onClick={() => onInspectProduct(product)}
                  style={{ cursor: 'pointer' }}
                >
                  {product.name}
                </h3>
                <p className="product-card__subtitle">{product.subtitle}</p>

                <p className="product-card__description">
                  {product.description}
                </p>

                {/* Flavor Tag Badges */}
                <div className="product-card__notes">
                  {product.tastingNotes.map((note) => (
                    <span key={note} className="product-card__note">
                      {note}
                    </span>
                  ))}
                </div>

                {/* Footer / Purchasing Controls */}
                <div className="product-card__footer">
                  <div className="product-card__price">
                    <span className="product-card__price-amount">
                      ${product.price}
                    </span>
                    <span className="product-card__price-weight">
                      / {product.weight}
                    </span>
                  </div>

                  <div className="product-card__actions">
                    <select
                      className="product-card__grind-select"
                      value={selectedGrinds[product.id] || product.grinds[0]}
                      onChange={(e) =>
                        handleGrindChange(product.id, e.target.value)
                      }
                      aria-label={`Select grind for ${product.name}`}
                    >
                      {product.grinds.map((grind) => (
                        <option key={grind} value={grind}>
                          {grind}
                        </option>
                      ))}
                    </select>

                    <button
                      className={`product-card__add-btn ${
                        addedMap[product.id] ? 'product-card__add-btn--added' : ''
                      }`}
                      onClick={(e) => handleAdd(product, e)}
                      aria-label={`Add ${product.name} to bag`}
                      data-cursor="ADD"
                    >
                      {addedMap[product.id] ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
