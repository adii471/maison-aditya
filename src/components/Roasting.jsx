import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Thermometer, Timer, Activity, Disc, Sparkles } from 'lucide-react';
import { roastStages } from '../data/coffeeData';
import { soundEngine } from '../utils/soundEngine';

gsap.registerPlugin(ScrollTrigger);

export default function Roasting() {
  const sectionRef = useRef(null);
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to Aditya Golden Roast
  const activeStage = roastStages[activeStageIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.roasting__eyebrow', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.roasting__header',
          start: 'top 80%',
        },
      });

      gsap.from('.roasting__title', {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.roasting__header',
          start: 'top 80%',
        },
      });

      gsap.from('.roasting__interactive-box', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.roasting__interactive-box',
          start: 'top 75%',
        },
      });

      gsap.to('.roasting__card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.roasting__stages',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelectStage = (index) => {
    setActiveStageIndex(index);
    soundEngine.playPop();
  };

  // Bean visual parameters based on roast stage
  const beanScales = [0.85, 0.95, 1.05, 1.15];
  const beanColors = ['#6D8F5C', '#A97A48', '#C2893F', '#281710'];
  const beanCreviceGlow = ['#8FB67A', '#DDA26A', '#F7B75D', '#643922'];

  return (
    <section className="roasting" ref={sectionRef} id="roasting">
      <div className="container">
        <div className="roasting__header">
          <p className="roasting__eyebrow">The Aditya Alchemy</p>
          <h2 className="roasting__title">The Metamorphosis of Fire</h2>
          <p className="roasting__lead">
            Fourteen months of slow volcanic maturation, unlocked in twelve precision minutes. Select a phase to explore the molecular transformation.
          </p>
        </div>

        {/* Interactive Master Roaster Stage Console */}
        <div className="roasting__interactive-box">
          {/* Phase Selector Tabs */}
          <div className="roasting__tabs">
            {roastStages.map((stage, idx) => (
              <button
                key={stage.id}
                className={`roasting__tab ${idx === activeStageIndex ? 'roasting__tab--active' : ''}`}
                onClick={() => handleSelectStage(idx)}
                data-cursor="SELECT"
              >
                <span className="roasting__tab-num">0{idx + 1}</span>
                <span className="roasting__tab-name">{stage.name}</span>
                <span
                  className="roasting__tab-pip"
                  style={{ backgroundColor: stage.color }}
                />
              </button>
            ))}
          </div>

          {/* Center Stage: Interactive Roasted Bean & Molecular Telemetry */}
          <div className="roasting__console-grid">
            {/* 3D-Styled Coffee Bean Visual */}
            <div className="roasting__bean-view">
              <div
                className="roasting__bean-glow"
                style={{
                  background: `radial-gradient(circle, ${activeStage.color}44 0%, transparent 70%)`,
                }}
              />
              <svg
                viewBox="0 0 200 240"
                className="roasting__bean-svg"
                style={{
                  transform: `scale(${beanScales[activeStageIndex]})`,
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <defs>
                  <radialGradient id="beanGrad" cx="35%" cy="30%" r="75%">
                    <stop offset="0%" stopColor={beanColors[activeStageIndex]} stopOpacity="0.9" />
                    <stop offset="65%" stopColor={beanColors[activeStageIndex]} />
                    <stop offset="100%" stopColor="#0B0705" />
                  </radialGradient>
                  <filter id="beanShadow">
                    <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#000000" floodOpacity="0.7" />
                  </filter>
                </defs>

                {/* Bean Body */}
                <ellipse
                  cx="100"
                  cy="120"
                  rx="68"
                  ry="95"
                  fill="url(#beanGrad)"
                  filter="url(#beanShadow)"
                />

                {/* Signature Organic Crevice / S-Curve Fissure */}
                <path
                  d="M100 35 C90 70, 115 100, 95 130 S108 175, 100 205"
                  stroke={beanCreviceGlow[activeStageIndex]}
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    transition: 'stroke 0.8s ease',
                  }}
                />
                <path
                  d="M100 35 C90 70, 115 100, 95 130 S108 175, 100 205"
                  stroke="#050302"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Specular Oil Sheen for Dark Roast */}
                {activeStageIndex === 3 && (
                  <ellipse
                    cx="80"
                    cy="80"
                    rx="25"
                    ry="35"
                    fill="rgba(255, 255, 255, 0.15)"
                    transform="rotate(-20 80 80)"
                  />
                )}
              </svg>

              <div className="roasting__bean-status">
                <span className="roasting__bean-phase-badge">{activeStage.phase}</span>
                <h3 className="roasting__bean-title">{activeStage.name}</h3>
              </div>
            </div>

            {/* Molecular Telemetry & Aroma Spectrum */}
            <div className="roasting__telemetry">
              <div className="roasting__telemetry-metrics">
                <div className="roasting__telemetry-metric">
                  <Thermometer size={16} className="text-burnt-orange" />
                  <span className="roasting__telemetry-val">{activeStage.temp}</span>
                  <span className="roasting__telemetry-lbl">Drum Temperature</span>
                </div>
                <div className="roasting__telemetry-metric">
                  <Timer size={16} className="text-gold" />
                  <span className="roasting__telemetry-val">{activeStage.time}</span>
                  <span className="roasting__telemetry-lbl">Roast Elapsed</span>
                </div>
                <div className="roasting__telemetry-metric">
                  <Activity size={16} className="text-cream" />
                  <span className="roasting__telemetry-val">{activeStage.density}</span>
                  <span className="roasting__telemetry-lbl">Bean Bulk Density</span>
                </div>
                <div className="roasting__telemetry-metric">
                  <Disc size={16} className="text-burnt-orange" />
                  <span className="roasting__telemetry-val">{activeStage.acousticFreq}</span>
                  <span className="roasting__telemetry-lbl">Acoustic Signal</span>
                </div>
              </div>

              <p className="roasting__telemetry-desc">{activeStage.description}</p>

              <div className="roasting__telemetry-aromas">
                <span className="roasting__aroma-header">
                  <Sparkles size={13} className="text-gold" /> Volatile Aroma Compounds:
                </span>
                <div className="roasting__aroma-pills">
                  {activeStage.aromaNotes.map((note) => (
                    <span key={note} className="roasting__aroma-tag">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roasting Curve Heat Path */}
        <div className="roasting__curve">
          <div className="roasting__curve-caption">
            <span>Maillard Roasting Curve (Time vs Temperature)</span>
            <span className="text-gold mono">Maison Aditya Drum Profile</span>
          </div>
          <svg viewBox="0 0 1200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120 C150 115, 280 100, 360 90 S520 50, 660 38 S840 22, 940 16 S1080 8, 1200 4"
              stroke="rgba(247, 242, 235, 0.15)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              className="roasting__curve-path"
              d="M0 120 C150 115, 280 100, 360 90 S520 50, 660 38 S840 22, 940 16 S1080 8, 1200 4"
              stroke="url(#roastCurveGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Interactive Points */}
            {[
              { cx: 80, cy: 118, label: 'Charge (22°C)' },
              { cx: 420, cy: 75, label: '1st Crack (196°C)' },
              { cx: 780, cy: 28, label: 'Aditya Drop (212°C)' },
              { cx: 1120, cy: 6, label: 'Obsidian (228°C)' },
            ].map((pt, i) => (
              <g
                key={i}
                onClick={() => handleSelectStage(i)}
                style={{ cursor: 'pointer' }}
                data-cursor="INSPECT"
              >
                <circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r={i === activeStageIndex ? '9' : '5'}
                  fill={beanColors[i]}
                  stroke="#F7F2EB"
                  strokeWidth={i === activeStageIndex ? '2.5' : '1'}
                />
                <text
                  x={pt.cx}
                  y={pt.cy - 16}
                  fill={i === activeStageIndex ? '#DFB15B' : '#D3C5B4'}
                  fontSize="11"
                  fontFamily="'JetBrains Mono', monospace"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}

            <defs>
              <linearGradient id="roastCurveGrad" x1="0" y1="120" x2="1200" y2="0">
                <stop offset="0%" stopColor="#6D8F5C" />
                <stop offset="35%" stopColor="#A97A48" />
                <stop offset="65%" stopColor="#C2893F" />
                <stop offset="100%" stopColor="#D85820" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
