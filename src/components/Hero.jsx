import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, ChevronDown } from 'lucide-react';
import { brand, heroMetrics } from '../data/coffeeData';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Eyebrow badge
      tl.to('.hero__badge-wrap', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Split words entrance
      tl.to('.hero__title-word', {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out',
      }, '-=0.5');

      // Subtitle
      tl.to('.hero__subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.6');

      // Metric pills
      tl.to('.hero__metric', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.5');

      // Scroll indicator
      tl.to('.hero__scroll-indicator', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.3');

      // Parallax scroll-scrub
      gsap.to(bgRef.current, {
        yPercent: 25,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Text fade and shift on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '50% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    // Canvas Volcanic Dust / Mist Particle Simulation
    const canvas = canvasRef.current;
    if (canvas) {
      const c = canvas.getContext('2d');
      let animId;
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', handleResize);

      const particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * 0.02 + 0.005,
      }));

      const draw = () => {
        c.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += Math.sin(Date.now() * p.pulse) * 0.005;

          if (p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          c.beginPath();
          c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          c.fillStyle = `rgba(226, 184, 104, ${Math.max(0.05, Math.min(0.4, p.alpha))})`;
          c.shadowBlur = 8;
          c.shadowColor = '#D85820';
          c.fill();
        });
        animId = requestAnimationFrame(draw);
      };
      draw();

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animId);
      };
    }

    return () => ctx.revert();
  }, []);

  const words = brand.heroQuote.split(' ');

  return (
    <section className="hero" ref={sectionRef} id="hero">
      {/* 4K Cinematic Background */}
      <div className="hero__bg" ref={bgRef}>
        <img
          className="hero__bg-image"
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=2400&q=90&auto=format"
          alt="Virunga volcanic coffee highlands at dawn"
          loading="eager"
        />
        <div className="hero__overlay" />
        <div className="hero__radial-glow" />
      </div>

      {/* Organic Volcanic Mist Canvas */}
      <canvas ref={canvasRef} className="hero__canvas-mist" />

      {/* Hero Content */}
      <div className="hero__content" ref={contentRef}>
        {/* Micro-Location Pill */}
        <div className="hero__badge-wrap" style={{ opacity: 0, transform: 'translateY(25px)' }}>
          <div className="hero__badge">
            <Compass size={13} className="text-burnt-orange" />
            <span className="mono">{brand.location}</span>
            <span className="hero__badge-dot" />
            <span className="text-gold">Grand Cru Harvest</span>
          </div>
        </div>

        {/* Brand Display Title */}
        <h1 className="hero__title">
          <span className="hero__title-line">
            {words.map((word, i) => (
              <span
                key={i}
                className="hero__title-word"
                style={{
                  marginRight: '0.28em',
                  opacity: 0,
                  transform: 'translateY(100%)',
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="hero__subtitle"
          style={{ opacity: 0, transform: 'translateY(25px)' }}
        >
          {brand.heroSubquote} Hand-harvested across single-plot volcanic ridges, roasted under the exacting eye of master roaster {brand.founder}.
        </p>

        {/* Real-Time Roast Metrics Pill Group */}
        <div className="hero__metrics">
          {heroMetrics.map((metric) => (
            <div
              className="hero__metric"
              key={metric.label}
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <div className="hero__metric-value">
                {metric.value}
                <span className="hero__metric-unit">{metric.unit}</span>
              </div>
              <div className="hero__metric-label">{metric.label}</div>
              <div className="hero__metric-note">{metric.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Scroll Indicator */}
      <a
        href="#origin"
        className="hero__scroll-indicator"
        data-cursor="SCROLL"
        aria-label="Scroll to explore terroir"
      >
        <span className="hero__scroll-text">Enter The Reserve</span>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <ChevronDown size={14} className="hero__scroll-arrow" />
      </a>
    </section>
  );
}
