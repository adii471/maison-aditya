import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { brand, navLinks } from '../data/coffeeData';
import { soundEngine } from '../utils/soundEngine';

export default function Navigation({ cartCount, onOpenCart }) {
  const navRef = useRef(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleToggleAudio = () => {
    const active = soundEngine.toggle();
    setIsPlayingAudio(active);
  };

  return (
    <>
      <nav
        className="nav"
        ref={navRef}
        style={{ transform: 'translateX(-50%) translateY(-20px)' }}
        aria-label="Main Navigation"
      >
        <a href="#hero" className="nav__brand" data-cursor="MAISON">
          <div className="nav__crest">
            <span className="nav__crest-initial">A</span>
          </div>
          <div className="nav__brand-text">
            <span className="nav__logo">{brand.name}</span>
            <span className="nav__badge">Grand Cru 2,150m</span>
          </div>
        </a>

        <div className="nav__links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav__link"
              data-cursor="EXPLORE"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav__actions">
          {/* Ambient Soundscape Toggle */}
          <button
            className={`nav__icon-btn ${isPlayingAudio ? 'nav__icon-btn--active' : ''}`}
            onClick={handleToggleAudio}
            aria-label={isPlayingAudio ? 'Mute ambient soundscape' : 'Enable roastery ambient soundscape'}
            title={isPlayingAudio ? 'Mute Ambience' : 'Roastery Hearth Ambience'}
            data-cursor={isPlayingAudio ? 'MUTE' : 'AMBIENCE'}
          >
            {isPlayingAudio ? (
              <div className="nav__audio-eq">
                <span className="nav__audio-bar nav__audio-bar--1" />
                <span className="nav__audio-bar nav__audio-bar--2" />
                <span className="nav__audio-bar nav__audio-bar--3" />
              </div>
            ) : (
              <VolumeX size={17} />
            )}
          </button>

          {/* Taste Flight Bag Button */}
          <button
            className="nav__bag-btn"
            onClick={onOpenCart}
            aria-label={`Open Taste Flight (${cartCount} items)`}
            data-cursor="FLIGHT"
          >
            <ShoppingBag size={16} />
            <span className="nav__bag-text">Flight</span>
            {cartCount > 0 && (
              <span className="nav__cart-count">{cartCount}</span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="nav__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-brand">
              <span className="mobile-nav-crest">A</span>
              <span className="mobile-nav-name">{brand.name}</span>
            </div>
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-nav-footer">
              <button
                className="mobile-nav-flight-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
              >
                <ShoppingBag size={18} /> View Taste Flight ({cartCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
