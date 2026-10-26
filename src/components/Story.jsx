import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Feather, ShieldCheck } from 'lucide-react';
import { manifesto, impactStats, brand } from '../data/coffeeData';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.story__eyebrow', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story__header',
          start: 'top 80%',
        },
      });

      gsap.from('.story__title', {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story__header',
          start: 'top 80%',
        },
      });

      // Manifesto block
      gsap.from('.story__manifesto-image-wrap', {
        opacity: 0,
        x: -50,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story__manifesto',
          start: 'top 70%',
        },
      });

      gsap.from('.story__manifesto-content', {
        opacity: 0,
        x: 40,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story__manifesto',
          start: 'top 70%',
        },
      });

      // Stats cards stagger
      const statEls = document.querySelectorAll('.story__stat');
      gsap.to(statEls, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story__stats',
          start: 'top 80%',
        },
      });

      // Animated counters
      statEls.forEach((el, i) => {
        const valEl = el.querySelector('.story__stat-value-num');
        const targetVal = impactStats[i].value;

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: targetVal,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            if (valEl) {
              valEl.textContent =
                targetVal % 1 !== 0
                  ? counterObj.val.toFixed(1)
                  : Math.round(counterObj.val).toLocaleString();
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="story" ref={sectionRef} id="story">
      <div className="container">
        <div className="story__header">
          <p className="story__eyebrow">Terroir Ethics & Heritage</p>
          <h2 className="story__title">The Aditya Manifesto</h2>
        </div>

        {/* Master Roaster Feature */}
        <div className="story__manifesto">
          <div className="story__manifesto-image-wrap">
            <img
              className="story__manifesto-image"
              src={manifesto.image}
              alt={manifesto.founder}
              loading="lazy"
            />
            <div className="story__manifesto-seal">
              <span className="story__manifesto-seal-inner">
                {brand.crest} · FOUNDER ROASTER
              </span>
            </div>
          </div>

          <div className="story__manifesto-content">
            <Quote size={32} className="story__quote-icon text-burnt-orange" />
            <p className="story__manifesto-pullquote">
              &ldquo;{manifesto.quote}&rdquo;
            </p>

            <div className="story__manifesto-text">
              {manifesto.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="story__signature-block">
              <div className="story__founder-name">{manifesto.founder}</div>
              <div className="story__founder-role">{manifesto.role} · {brand.name}</div>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="story__stats">
          {impactStats.map((stat) => (
            <div key={stat.label} className="story__stat">
              <div className="story__stat-value">
                <span className="story__stat-value-num">0</span>
                <span className="story__stat-suffix">{stat.suffix}</span>
              </div>
              <div className="story__stat-label">{stat.label}</div>
              <div className="story__stat-detail">{stat.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
