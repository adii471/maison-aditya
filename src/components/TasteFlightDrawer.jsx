import { X, Plus, Minus, Trash2, Sparkles, ShieldCheck } from 'lucide-react';
import { brand } from '../data/coffeeData';
import { soundEngine } from '../utils/soundEngine';

export default function TasteFlightDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const threshold = 100;
  const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
  const remaining = Math.max(0, threshold - subtotal);

  return (
    <div className="taste-drawer-backdrop" onClick={onClose}>
      <aside
        className="taste-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Taste Flight & Reserve Bag"
      >
        <header className="taste-drawer__header">
          <div>
            <div className="taste-drawer__badge">{brand.crest} ALLOCATION</div>
            <h2 className="taste-drawer__title">Your Taste Flight</h2>
          </div>
          <button
            className="taste-drawer__close"
            onClick={onClose}
            aria-label="Close bag"
          >
            <X size={20} />
          </button>
        </header>

        {/* Free Gold Spoon Progress Bar */}
        <div className="taste-drawer__reward-bar">
          <div className="taste-drawer__reward-text">
            <Sparkles size={14} className="text-gold" />
            <span>
              {remaining === 0
                ? 'Heirloom 24k Gold Tasting Spoon Unlocked'
                : `Add $${remaining} more for the Hand-Forged Cupping Spoon`}
            </span>
          </div>
          <div className="taste-drawer__track">
            <div
              className="taste-drawer__fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="taste-drawer__body">
          {items.length === 0 ? (
            <div className="taste-drawer__empty">
              <p className="taste-drawer__empty-title">Your flight is empty</p>
              <p className="taste-drawer__empty-sub">
                Explore the Grand Cru harvest lots to compose your personal tasting flight.
              </p>
            </div>
          ) : (
            <ul className="taste-drawer__list">
              {items.map((item) => (
                <li key={`${item.id}-${item.grind}`} className="taste-drawer__item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="taste-drawer__item-img"
                  />
                  <div className="taste-drawer__item-info">
                    <div className="taste-drawer__item-name">{item.name}</div>
                    <div className="taste-drawer__item-meta">
                      <span>{item.grind}</span>
                      <span>·</span>
                      <span>{item.weight}</span>
                    </div>
                    <div className="taste-drawer__item-price">
                      ${item.price * item.quantity}
                    </div>

                    <div className="taste-drawer__item-controls">
                      <div className="taste-drawer__qty-group">
                        <button
                          onClick={() => {
                            soundEngine.playPop();
                            onUpdateQty(item.id, item.grind, item.quantity - 1);
                          }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => {
                            soundEngine.playPop();
                            onUpdateQty(item.id, item.grind, item.quantity + 1);
                          }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        className="taste-drawer__remove-btn"
                        onClick={() => onRemoveItem(item.id, item.grind)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer className="taste-drawer__footer">
            <div className="taste-drawer__summary-row">
              <span>Bespoke Matte Noir Canisters</span>
              <span className="text-gold">Complimentary</span>
            </div>
            <div className="taste-drawer__summary-row">
              <span>Express Climate-Vault Courier</span>
              <span className="text-cream">Calculated at Checkout</span>
            </div>
            <div className="taste-drawer__total-row">
              <span className="taste-drawer__total-label">Flight Total</span>
              <span className="taste-drawer__total-val">${subtotal}</span>
            </div>

            <button
              className="taste-drawer__checkout-btn"
              onClick={onCheckout}
              data-cursor="CHECKOUT"
            >
              Secure Allocation Checkout
            </button>

            <div className="taste-drawer__guarantee">
              <ShieldCheck size={14} />
              <span>Certified Single-Plot Micro-Lot · Hand-Numbered Bags</span>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
}
