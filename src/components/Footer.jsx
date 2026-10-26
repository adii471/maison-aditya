import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check, Sparkles, MapPin, EyeOff } from 'lucide-react';
import { brand, footer } from '../data/coffeeData';
import { soundEngine } from '../utils/soundEngine';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer__newsletter', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.footer__bottom', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer__divider',
          start: 'top 90%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    soundEngine.playChime();
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  const toggleReducedMotion = () => {
    const nextState = !isReducedMotion;
    setIsReducedMotion(nextState);
    if (nextState) {
      document.documentElement.classList.add('reduced-motion-active');
    } else {
      document.documentElement.classList.remove('reduced-motion-active');
    }
  };

  return (
    <footer className="footer" ref={sectionRef}>
      {/* Roaster's Guild Private Allocation */}
      <div className="container">
        <div className="footer__newsletter">
          <div className="footer__newsletter-badge">
            <Sparkles size={12} className="text-gold" />
            <span>{footer.newsletter.badge}</span>
          </div>

          <h2 className="footer__newsletter-title">{footer.newsletter.title}</h2>
          <p className="footer__newsletter-desc">{footer.newsletter.description}</p>

          <form className="footer__newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer__newsletter-input"
              placeholder="Enter your personal or cupping desk email"
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              className="footer__newsletter-btn"
              data-cursor="REQUEST"
            >
              {isSubscribed ? (
                <>
                  <Check size={16} /> Allocation Requested
                </>
              ) : (
                <>
                  <Send size={15} /> Request Access
                </>
              )}
            </button>
          </form>

          {isSubscribed && (
            <p className="footer__newsletter-confirm">
              Your confidential cupping allocation request has been received. Our concierge will contact you with the seasonal micro-lot manifest.
            </p>
          )}
        </div>
      </div>

      <div className="footer__divider" />

      {/* Global Boutiques & Roasteries */}
      <div className="container">
        <div className="footer__roasteries-heading">
          <MapPin size={13} className="text-burnt-orange" />
          <span>Maison Aditya International Roasteries & Cupping Salons</span>
        </div>

        <div className="footer__roasteries-grid">
          {footer.roasteries.map((r) => (
            <div key={r.city} className="footer__roastery-card">
              <div className="footer__roastery-city">{r.city}</div>
              <div className="footer__roastery-country">{r.country}</div>
              <div className="footer__roastery-addr">{r.address}</div>
            </div>
          ))}
        </div>

        <div className="footer__divider footer__divider--subtle" />

        {/* Brand Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__brand-side">
            <span className="footer__brand-name">{brand.name}</span>
            <span className="footer__brand-tagline">{footer.tagline}</span>
          </div>

          <div className="footer__social">
            {footer.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer__social-link"
                data-cursor="LINK"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Reduced-Motion Control Pill */}
          <div className="footer__controls">
            <button
              className="footer__motion-toggle"
              onClick={toggleReducedMotion}
              aria-label="Toggle reduced motion preference"
              data-cursor="TOGGLE"
            >
              <EyeOff size={13} />
              <span>Motion: {isReducedMotion ? 'Reduced' : 'Fluid'}</span>
            </button>
          </div>
        </div>

        <div className="footer__copyright">
          <p className="footer__copyright-text">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
