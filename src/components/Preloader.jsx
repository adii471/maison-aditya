import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { brand } from '../data/coffeeData';

export default function Preloader({ isLoading, onComplete }) {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const barFillRef = useRef(null);
  const monogramRef = useRef(null);
  const quoteRef = useRef(null);
  const barTrackRef = useRef(null);

  useEffect(() => {
    if (!isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit curtain animation
          const exitTl = gsap.timeline({
            onComplete: onComplete,
          });

          exitTl
            .to(
              [
                monogramRef.current,
                counterRef.current,
                barTrackRef.current,
                quoteRef.current,
              ],
              {
                opacity: 0,
                y: -30,
                duration: 0.5,
                stagger: 0.06,
                ease: 'power3.in',
              }
            )
            .to(
              preloaderRef.current,
              {
                yPercent: -100,
                duration: 1.0,
                ease: 'power4.inOut',
              },
              '-=0.1'
            );
        },
      });

      // Monogram & badge reveal
      tl.to(monogramRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
        .to(
          counterRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          barTrackRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          quoteRef.current,
          {
            opacity: 0.75,
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=0.3'
        );

      // Counter numbers animation (0 to 100)
      const counter = { value: 0 };
      tl.to(
        counter,
        {
          value: 100,
          duration: 2.0,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counter.value)}%`;
            }
          },
        },
        '-=0.4'
      ).to(
        barFillRef.current,
        {
          width: '100%',
          duration: 2.0,
          ease: 'power2.inOut',
        },
        '<'
      );
    }, preloaderRef);

    return () => ctx.revert();
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="preloader" ref={preloaderRef}>
      <div
        className="preloader__monogram-wrap"
        ref={monogramRef}
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        <div className="preloader__crest">
          <span className="preloader__crest-monogram">{brand.monogram}</span>
        </div>
        <div className="preloader__brand-title">{brand.name}</div>
        <div className="preloader__brand-sub">{brand.tagline}</div>
      </div>

      <div className="preloader__counter" ref={counterRef}>
        0%
      </div>

      <div className="preloader__bar-track" ref={barTrackRef}>
        <div className="preloader__bar-fill" ref={barFillRef} />
      </div>

      <div className="preloader__quote" ref={quoteRef}>
        {brand.preloaderQuote}
      </div>

      <div className="preloader__curtain" />
    </div>
  );
}
