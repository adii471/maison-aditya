import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gauge, Droplets, Flame, Wind, Sparkles } from 'lucide-react';
import { pourData } from '../data/coffeeData';

const CoffeeBrew3D = lazy(() => import('./CoffeeBrew3D'));

gsap.registerPlugin(ScrollTrigger);

export default function BrewScene() {
  const containerRef = useRef(null);
  const pinSectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic telemetry based on scroll progress
  const pressure = (3.0 + scrollProgress * 6.0).toFixed(1); // 3.0 BAR -> 9.0 BAR
  const temp = (91.0 + scrollProgress * 2.5).toFixed(1); // 91°C -> 93.5°C
  const yieldMl = Math.round(scrollProgress * 240); // 0ml -> 240ml
  const tds = (1.15 + scrollProgress * 0.23).toFixed(2); // 1.15% -> 1.38% TDS

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and scrub across the pouring storytelling timeline
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2200',
        pin: pinSectionRef.current,
        scrub: 0.8,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Animate Step 1 (Bloom)
      gsap.fromTo(
        '.brew-step--1',
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=600',
            scrub: true,
          },
        }
      );

      // Animate Step 2 (Flow)
      gsap.fromTo(
        '.brew-step--2',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: '+=500',
            end: '+=1100',
            scrub: true,
          },
        }
      );
      gsap.to('.brew-step--2', {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: '+=1200',
          end: '+=1600',
          scrub: true,
        },
      });

      // Animate Step 3 (Golden Crema)
      gsap.fromTo(
        '.brew-step--3',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: '+=1500',
            end: '+=2100',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="brew-section" ref={containerRef} id="pour">
      <div className="brew-pin-wrapper" ref={pinSectionRef}>
        {/* Ambient Burnt Orange & Ember Backing */}
        <div className="brew-bg-ember" />
        <div className="brew-radial-light" />

        <div className="container brew-container">
          {/* Header Row */}
          <header className="brew-header">
            <div className="brew-header__eyebrow">
              <span className="mono">Phase II & III</span>
              <span className="brew-header__sep">·</span>
              <span>The Extraction Ritual</span>
            </div>
            <h2 className="brew-header__title">The Sacred Geometry of Flow</h2>
          </header>

          <div className="brew-stage-grid">
            {/* Left: Step-by-Step Narrative (Fades as you scroll) */}
            <div className="brew-narrative-column">
              {/* Step 1: Pre-Infusion Bloom */}
              <div className="brew-step brew-step--1">
                <span className="brew-step__num">Step 01 / 03</span>
                <h3 className="brew-step__title">The Pre-Infusion Bloom</h3>
                <p className="brew-step__desc">
                  Water calibrated to precisely 93.5°C contacts the volcanic SL28 grounds. The bed swells, releasing trapped carbon dioxide in a fragrant burst of wild acacia honey and bergamot.
                </p>
                <div className="brew-step__pill">
                  <Flame size={13} className="text-gold" />
                  <span>Optimal Saturation: 45ml Pre-infusion</span>
                </div>
              </div>

              {/* Step 2: Continuous Flow */}
              <div className="brew-step brew-step--2">
                <span className="brew-step__num">Step 02 / 03</span>
                <h3 className="brew-step__title">The Hydrostatic Stream</h3>
                <p className="brew-step__desc">
                  Through precision spiral flutes, gravity pulls the hot liquor in a laminar column. Soluble sugars and delicate fruit acids dissolve into the borosilicate decanter below.
                </p>
                <div className="brew-step__pill">
                  <Droplets size={13} className="text-gold" />
                  <span>Laminar Spiral Flow: 2.4 ml / sec</span>
                </div>
              </div>

              {/* Step 3: Golden Crema & Decanter Yield */}
              <div className="brew-step brew-step--3">
                <span className="brew-step__num">Step 03 / 03</span>
                <h3 className="brew-step__title">The Golden Equilibrium</h3>
                <p className="brew-step__desc">
                  The extraction reaches its golden ratio. Heavy lipid emulsions and caramelized disaccharides coalesce into liquid velvet. The decanter holds the purest expression of the Kivu volcanic basin.
                </p>
                <div className="brew-step__pill">
                  <Sparkles size={13} className="text-gold" />
                  <span>Final Yield: 240g · TDS 1.38% Golden Standard</span>
                </div>
              </div>

              {/* Live Telemetry HUD */}
              <div className="brew-hud">
                <div className="brew-hud__item">
                  <Gauge size={14} className="text-gold" />
                  <div>
                    <span className="brew-hud__val">{pressure} BAR</span>
                    <span className="brew-hud__lbl">Hydrostatic Pressure</span>
                  </div>
                </div>
                <div className="brew-hud__item">
                  <Flame size={14} className="text-burnt-orange" />
                  <div>
                    <span className="brew-hud__val">{temp} °C</span>
                    <span className="brew-hud__lbl">Thermal Precision</span>
                  </div>
                </div>
                <div className="brew-hud__item">
                  <Droplets size={14} className="text-cream" />
                  <div>
                    <span className="brew-hud__val">{yieldMl} ml</span>
                    <span className="brew-hud__lbl">Decanter Yield</span>
                  </div>
                </div>
                <div className="brew-hud__item">
                  <span className="mono text-gold" style={{ fontSize: '0.85rem' }}>TDS</span>
                  <div>
                    <span className="brew-hud__val">{tds} %</span>
                    <span className="brew-hud__lbl">Dissolved Solids</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Three.js 3D Photorealistic Coffee Apparatus */}
            <div className="brew-canvas-column">
              <div className="brew-canvas-card">
                <Suspense
                  fallback={
                    <div className="coffee-brew-fallback">
                      <div className="coffee-brew-skeleton">
                        <span className="mono text-gold" style={{ fontSize: '0.75rem' }}>
                          INITIALIZING MAISON ADITYA 3D BREW ENGINE...
                        </span>
                      </div>
                    </div>
                  }
                >
                  <CoffeeBrew3D scrollProgress={scrollProgress} interactive={true} />
                </Suspense>

                <div className="brew-canvas-footer">
                  <div className="brew-canvas-progress-track">
                    <div
                      className="brew-canvas-progress-fill"
                      style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                    />
                  </div>
                  <div className="brew-canvas-meta">
                    <span className="mono text-sandstone">Extraction Progress</span>
                    <span className="mono text-gold font-bold">
                      {Math.round(scrollProgress * 100)}% Complete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
