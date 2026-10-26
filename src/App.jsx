import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Origin from './components/Origin';
import Roasting from './components/Roasting';
import Pour from './components/Pour';
import Products from './components/Products';
import Story from './components/Story';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import TasteFlightDrawer from './components/TasteFlightDrawer';
import CuppingModal from './components/CuppingModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([
    // Start with 1 default luxury reserve item so drawer is immediately compelling
    {
      id: 1,
      name: "Aditya Reserve No. 1",
      price: 48,
      weight: "250g",
      grind: "Whole Bean (Recommended)",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=85&auto=format",
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCuppingProduct, setActiveCuppingProduct] = useState(null);
  const mainRef = useRef(null);

  // Initialize Buttery Smooth Inertia Scroll with Lenis
  useEffect(() => {
    document.body.classList.add('loading');

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.body.classList.remove('loading');
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.classList.remove('loading');
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  // Cart operations
  const handleAddToCart = (product, grind) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.grind === grind
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.grind === grind
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          weight: product.weight,
          grind: grind || product.grinds[0],
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQty = (productId, grind, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, grind);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.grind === grind
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId, grind) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.grind === grind))
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* 4K Analog Film Grain & Dust Overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Luxury Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Preloader */}
      <Preloader isLoading={isLoading} onComplete={handleLoadingComplete} />

      {!isLoading && (
        <>
          <Navigation
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />

          <main ref={mainRef}>
            <Hero />
            <Origin />
            <Roasting />
            <Pour />
            <Products
              onAddToCart={handleAddToCart}
              onInspectProduct={(prod) => setActiveCuppingProduct(prod)}
            />
            <Story />
            <Footer />
          </main>

          {/* Taste Flight Drawer (Cart) */}
          <TasteFlightDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => {
              alert(
                'Allocation Order Confirmed. Your Maison Aditya Grand Cru reservation has been registered with our Concierge Desk.'
              );
              setIsCartOpen(false);
            }}
          />

          {/* Interactive Cupping Notes & Tasting Sheet Modal */}
          {activeCuppingProduct && (
            <CuppingModal
              product={activeCuppingProduct}
              onClose={() => setActiveCuppingProduct(null)}
              onAddToCart={handleAddToCart}
            />
          )}
        </>
      )}
    </>
  );
}
