import { useState } from 'react';
import { X, Award, Flame, Droplets, Clock, Plus, Check } from 'lucide-react';
import { brand } from '../data/coffeeData';
import { soundEngine } from '../utils/soundEngine';

export default function CuppingModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [dose, setDose] = useState(18.5);
  const [selectedGrind, setSelectedGrind] = useState(product.grinds[0]);
  const [added, setAdded] = useState(false);

  // Ratio calculations: 1 : 16.2
  const waterAmount = Math.round(dose * 16.2);
  const brewTimeSeconds = Math.round(180 + (dose - 15) * 6);
  const brewMinutes = Math.floor(brewTimeSeconds / 60);
  const brewSeconds = brewTimeSeconds % 60;

  const handleAdd = () => {
    soundEngine.playChime();
    setAdded(true);
    onAddToCart(product, selectedGrind);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="cupping-backdrop" onClick={onClose}>
      <article
        className="cupping-modal"
        onClick={(e) => e.stopPropagation()}
        aria-label="Cupping Protocol & Tasting Sheet"
      >
        <button
          className="cupping-modal__close"
          onClick={onClose}
          aria-label="Close sheet"
        >
          <X size={20} />
        </button>

        <div className="cupping-modal__header">
          <div className="cupping-modal__brand-badge">
            {brand.name} · {product.lotNumber}
          </div>
          <h2 className="cupping-modal__title">{product.name}</h2>
          <p className="cupping-modal__subtitle">{product.subtitle}</p>
        </div>

        <div className="cupping-modal__grid">
          {/* Left Column: Visual & Q-Score */}
          <div className="cupping-modal__col-visual">
            <div className="cupping-modal__image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="cupping-modal__image"
              />
              <div className="cupping-modal__qscore">
                <Award size={18} className="text-gold" />
                <span className="cupping-modal__qscore-num">{product.qScore}</span>
                <span className="cupping-modal__qscore-label">SCA Q-GRADE</span>
              </div>
            </div>

            <div className="cupping-modal__specs">
              <div className="cupping-modal__spec-row">
                <span>Elevation</span>
                <strong>{product.elevation}</strong>
              </div>
              <div className="cupping-modal__spec-row">
                <span>Process</span>
                <strong>{product.process}</strong>
              </div>
              <div className="cupping-modal__spec-row">
                <span>Roast Level</span>
                <strong>{product.roastLevel}</strong>
              </div>
              <div className="cupping-modal__spec-row">
                <span>Lot Identification</span>
                <strong>{product.lotNumber}</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Radar Attributes & Interactive Brew Calculator */}
          <div className="cupping-modal__col-details">
            {/* Sensory Notes */}
            <div className="cupping-modal__section">
              <h4 className="cupping-modal__section-heading">Sensory Spectrum</h4>
              <div className="cupping-modal__notes-pills">
                {product.tastingNotes.map((note) => (
                  <span key={note} className="cupping-modal__note-pill">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Radar Score Breakdown */}
            <div className="cupping-modal__section">
              <h4 className="cupping-modal__section-heading">Cupping Radar Analysis (Out of 10)</h4>
              <div className="cupping-modal__radar-bars">
                {Object.entries(product.radar).map(([key, val]) => (
                  <div key={key} className="cupping-radar-bar">
                    <div className="cupping-radar-bar__info">
                      <span className="cupping-radar-bar__name">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      <span className="cupping-radar-bar__val">{val.toFixed(1)}</span>
                    </div>
                    <div className="cupping-radar-bar__track">
                      <div
                        className="cupping-radar-bar__fill"
                        style={{ width: `${(val / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Brew Recipe Slider */}
            <div className="cupping-modal__section cupping-modal__recipe-box">
              <div className="cupping-recipe__header">
                <Flame size={16} className="text-burnt-orange" />
                <h4 className="cupping-modal__section-heading" style={{ margin: 0 }}>
                  Master Roaster Brew Protocol
                </h4>
              </div>

              <div className="cupping-recipe__slider-wrap">
                <label className="cupping-recipe__label">
                  <span>Dose Calibration:</span>
                  <strong>{dose.toFixed(1)}g</strong>
                </label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  step="0.5"
                  value={dose}
                  onChange={(e) => setDose(parseFloat(e.target.value))}
                  className="cupping-recipe__range"
                />
              </div>

              <div className="cupping-recipe__metrics">
                <div className="cupping-recipe__metric">
                  <Droplets size={14} className="text-gold" />
                  <div>
                    <span className="cupping-recipe__metric-val">{waterAmount}g</span>
                    <span className="cupping-recipe__metric-lbl">Water (93.5°C)</span>
                  </div>
                </div>
                <div className="cupping-recipe__metric">
                  <Clock size={14} className="text-gold" />
                  <div>
                    <span className="cupping-recipe__metric-val">
                      {brewMinutes}:{brewSeconds < 10 ? `0${brewSeconds}` : brewSeconds}
                    </span>
                    <span className="cupping-recipe__metric-lbl">Contact Time</span>
                  </div>
                </div>
                <div className="cupping-recipe__metric">
                  <span className="mono text-gold" style={{ fontSize: '0.9rem' }}>1:16.2</span>
                  <div>
                    <span className="cupping-recipe__metric-val">Target Ratio</span>
                    <span className="cupping-recipe__metric-lbl">Golden Cup Standard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selection & Add to Flight */}
            <div className="cupping-modal__purchase-row">
              <div className="cupping-modal__grind-wrap">
                <label className="cupping-modal__label">Grind Precision:</label>
                <select
                  value={selectedGrind}
                  onChange={(e) => setSelectedGrind(e.target.value)}
                  className="cupping-modal__select"
                >
                  {product.grinds.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className={`cupping-modal__add-btn ${added ? 'cupping-modal__add-btn--added' : ''}`}
                onClick={handleAdd}
                data-cursor="ADD TO FLIGHT"
              >
                {added ? (
                  <>
                    <Check size={18} /> Added to Flight
                  </>
                ) : (
                  <>
                    <Plus size={18} /> Add to Flight — ${product.price}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
