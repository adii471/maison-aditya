import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mountain, SunMedium, Users, ArrowUpRight } from 'lucide-react';
import { originStages } from '../data/coffeeData';

gsap.registerPlugin(ScrollTrigger);

export default function Origin() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.origin__eyebrow', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.origin__header',
          start: 'top 80%',
        },
      });

      gsap.from('.origin__title', {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.origin__header',
          start: 'top 80%',
        },
      });

      originStages.forEach((_, index) => {
        const stage = `.origin__stage--${index}`;

        gsap.from(`${stage} .origin__stage-visual`, {
          opacity: 0,
          scale: 0.94,
          x: index % 2 === 0 ? -40 : 40,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stage,
            start: 'top 70%',
          },
        });

        gsap.from(`${stage} .origin__stage-content`, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stage,
            start: 'top 65%',
          },
        });

        // Parallax image scrub
        gsap.to(`${stage} .origin__stage-image`, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="origin" ref={sectionRef} id="origin">
      <div className="container">
        <div className="origin__header">
          <p className="origin__eyebrow">Terroir & Sanctuary</p>
          <h2 className="origin__title">The Volcanic Cradle</h2>
          <p className="origin__lead">
            Where tectonic activity meets equatorial cloud mist at 2,150 meters altitude.
          </p>
        </div>
      </div>

      <div className="origin__stages">
        {originStages.map((stage, index) => (
          <div
            key={stage.id}
            className={`origin__stage origin__stage--${index}`}
          >
            <div
              className={`origin__stage-inner ${
                index % 2 !== 0 ? 'origin__stage-inner--reverse' : ''
              }`}
            >
              {/* Visual Card with Parallax Image */}
              <div className="origin__stage-visual" data-cursor="TERROIR">
                <img
                  className="origin__stage-image"
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                />
                <div className="origin__stage-gradient" />

                <div className="origin__stage-tag">
                  <Mountain size={12} className="text-burnt-orange" />
                  <span>{stage.tag}</span>
                </div>

                <div className="origin__stage-stat">
                  <div className="origin__stage-stat-value">
                    {stage.stat.value}
                  </div>
                  <div className="origin__stage-stat-label">
                    {stage.stat.label}
                  </div>
                </div>
              </div>

              {/* Editorial Description */}
              <div className="origin__stage-content">
                <div className="origin__stage-coord">
                  <MapPin size={12} className="text-burnt-orange" />
                  <span className="mono">{stage.coordinates}</span>
                </div>

                <p className="origin__stage-subtitle">{stage.subtitle}</p>
                <h3 className="origin__stage-title">{stage.title}</h3>
                <p className="origin__stage-description">
                  {stage.description}
                </p>

                <div className="origin__stage-footer">
                  <div className="origin__stage-divider" />
                  <span className="origin__stage-num">0{index + 1} / 03</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
