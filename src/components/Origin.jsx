import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mountain, SunMedium, Compass, Sparkles, Layers } from 'lucide-react';
import { originStages } from '../data/coffeeData';

gsap.registerPlugin(ScrollTrigger);

export default function Origin() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.origin-cream__eyebrow', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.origin-cream__header',
          start: 'top 80%',
        },
      });

      gsap.from('.origin-cream__title', {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.origin-cream__header',
          start: 'top 80%',
        },
      });

      // Layered cards animation
      originStages.forEach((_, index) => {
        const cardSelector = `.origin-cream-card--${index}`;

        gsap.from(`${cardSelector} .origin-cream-card__visual`, {
          opacity: 0,
          scale: 0.95,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardSelector,
            start: 'top 75%',
          },
        });

        gsap.from(`${cardSelector} .origin-cream-card__content`, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardSelector,
            start: 'top 75%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="origin-cream" ref={sectionRef} id="origin">
      {/* Decorative Warm Cream Top Border */}
      <div className="origin-cream__top-curve" />

      <div className="container">
        {/* Editorial Section Header */}
        <header className="origin-cream__header">
          <div className="origin-cream__eyebrow">
            <Compass size={13} className="text-burnt-orange" />
            <span className="mono">Scene D · High-Altitude Terroir</span>
          </div>
          <h2 className="origin-cream__title">Where Volcanic Basalt Meets The Mist</h2>
          <p className="origin-cream__lead">
            At 2,150 meters elevation, nature composes what heat can only reveal. Mineral-dense volcanic ash, slow equatorial cloud mists, and hand-sorted generational harvests.
          </p>
        </header>

        {/* Micro-Lot Terroir Cards */}
        <div className="origin-cream__cards">
          {originStages.map((stage, index) => (
            <article
              key={stage.id}
              className={`origin-cream-card origin-cream-card--${index} ${
                index % 2 !== 0 ? 'origin-cream-card--reverse' : ''
              }`}
            >
              {/* Visual Side */}
              <div className="origin-cream-card__visual" data-cursor="TERROIR">
                <img
                  className="origin-cream-card__img"
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                />
                <div className="origin-cream-card__badge">
                  <Mountain size={13} className="text-burnt-orange" />
                  <span>{stage.tag}</span>
                </div>
                <div className="origin-cream-card__stat-pill">
                  <span className="origin-cream-card__stat-num">{stage.stat.value}</span>
                  <span className="origin-cream-card__stat-lbl">{stage.stat.label}</span>
                </div>
              </div>

              {/* Text Side */}
              <div className="origin-cream-card__content">
                <div className="origin-cream-card__coord">
                  <MapPin size={12} className="text-burnt-orange" />
                  <span className="mono">{stage.coordinates}</span>
                </div>

                <div className="origin-cream-card__index-pill">Plot 0{index + 1}</div>
                <h3 className="origin-cream-card__title">{stage.title}</h3>
                <h4 className="origin-cream-card__subtitle">{stage.subtitle}</h4>
                <p className="origin-cream-card__desc">{stage.description}</p>

                <div className="origin-cream-card__features">
                  <div className="origin-cream-card__feature">
                    <Layers size={14} className="text-burnt-orange" />
                    <span>Basaltic Silicate Soil Matrix</span>
                  </div>
                  <div className="origin-cream-card__feature">
                    <SunMedium size={14} className="text-burnt-orange" />
                    <span>14-Month Slow Cell Maturation</span>
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
