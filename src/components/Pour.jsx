import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gauge, Droplets, Flame, Sparkles } from 'lucide-react';
import { pourData } from '../data/coffeeData';

gsap.registerPlugin(ScrollTrigger);

export default function Pour() {
  const sectionRef = useRef(null);
  const [pressure, setPressure] = useState(9.0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.from('.pour__eyebrow', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.pour__title', {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.pour__subtitle', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.pour__description', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.to('.pour__stat', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pour__stats-side',
          start: 'top 75%',
        },
      });

      gsap.from('.pour__visual-card', {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pour__visual-card',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pour" ref={sectionRef} id="pour">
      <div className="pour__bg-ambient" />

      <div className="container">
        <div className="pour__grid">
          {/* Narrative Side */}
          <div className="pour__text-side">
            <p className="pour__eyebrow">Extraction Ritual</p>
            <h2 className="pour__title">{pourData.title}</h2>
            <p className="pour__subtitle">{pourData.subtitle}</p>
            <p className="pour__description">{pourData.description}</p>

            <div className="pour__stats-side">
              {pourData.stats.map((stat) => (
                <div key={stat.label} className="pour__stat">
                  <div className="pour__stat-value">
                    {stat.value}
                    <span className="pour__stat-unit">{stat.unit}</span>
                  </div>
                  <div className="pour__stat-label">{stat.label}</div>
                  <div className="pour__stat-detail">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Extraction Visualizer */}
          <div className="pour__visual-side">
            <div className="pour__visual-card">
              <div className="pour__gauge-header">
                <div className="pour__gauge-badge">
                  <Gauge size={14} className="text-cream" />
                  <span>Real-Time Hydrostatic Calibration</span>
                </div>
                <span className="mono text-gold">{pressure.toFixed(1)} BAR</span>
              </div>

              {/* Animated Espresso Stream & Crema Bloom SVG */}
              <div className="pour__espresso-chamber">
                <svg viewBox="0 0 300 240" className="pour__stream-svg">
                  <defs>
                    <linearGradient id="cremaGrad" x1="0" y1="0" x2="0" y2="100%">
                      <stop offset="0%" stopColor="#DFB15B" />
                      <stop offset="40%" stopColor="#C04A15" />
                      <stop offset="100%" stopColor="#2A170F" />
                    </linearGradient>
                    <radialGradient id="cupCrema" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F5E2B3" />
                      <stop offset="35%" stopColor="#DFB15B" />
                      <stop offset="70%" stopColor="#C04A15" />
                      <stop offset="100%" stopColor="#1E120B" />
                    </radialGradient>
                  </defs>

                  {/* Portafilter Spout */}
                  <rect x="135" y="10" width="30" height="15" rx="3" fill="#D3C5B4" />
                  <path d="M140 25 L160 25 L153 38 L147 38 Z" fill="#998877" />

                  {/* Flow Stream (pulsing width according to pressure) */}
                  <path
                    d="M150 38 Q148 90, 150 145"
                    stroke="url(#cremaGrad)"
                    strokeWidth={Math.max(2, pressure * 0.7)}
                    strokeLinecap="round"
                    className="pour__stream-line"
                  />

                  {/* Droplets */}
                  <circle cx="150" cy="70" r="2" fill="#DFB15B" className="pour__drop pour__drop--1" />
                  <circle cx="150" cy="110" r="2.5" fill="#C04A15" className="pour__drop pour__drop--2" />

                  {/* Luxury Porcelain Cup Base */}
                  <ellipse cx="150" cy="190" rx="80" ry="24" fill="#0E0A07" stroke="#3B2416" strokeWidth="2" />
                  {/* Crema Bloom Pool */}
                  <ellipse cx="150" cy="186" rx="66" ry="18" fill="url(#cupCrema)" />
                  {/* Tiger Striping Swirls */}
                  <path
                    d="M110 186 Q130 180, 150 186 T190 186"
                    stroke="#F5E2B3"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    fill="none"
                  />
                  <path
                    d="M125 189 Q145 183, 165 189"
                    stroke="#F5E2B3"
                    strokeWidth="1.2"
                    strokeOpacity="0.4"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Interactive Pressure Slider */}
              <div className="pour__slider-control">
                <div className="pour__slider-labels">
                  <span>Pre-Infusion (3 BAR)</span>
                  <span className="text-gold font-bold">Optimal Peak (9 BAR)</span>
                  <span>Over-Extract (12 BAR)</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="12.0"
                  step="0.1"
                  value={pressure}
                  onChange={(e) => setPressure(parseFloat(e.target.value))}
                  className="pour__pressure-range"
                />
              </div>

              <div className="pour__extraction-phase">
                <span className="pour__phase-pill">
                  {pressure < 6
                    ? 'Phase 1: Gentle Saturation & Pre-Infusion'
                    : pressure <= 9.5
                    ? 'Phase 2: Golden Lipid Bloom & Viscous Emulsion'
                    : 'Phase 3: High-Tannin Channeling Warning'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
