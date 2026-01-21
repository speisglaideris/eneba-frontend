import { useState, useRef } from "react";
import { createPortal } from "react-dom";

function PriceInfoTooltip() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const getPos = () => {
    if (!ref.current) return {};
    const r = ref.current.getBoundingClientRect();
    return {
      position: "fixed",
      top: r.top - 150,
      left: r.left - 120,
      zIndex: 2000,
    };
  };

  return (
    <div
      ref={ref}
      className="info-button-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="info-button" aria-label="Price information">
        <img className="info-png" src="/info.png" alt="" />
      </button>

      {show &&
        createPortal(
          <div className="tooltip portal-tooltip" style={getPos()}>
            <p>
              Strike-through price is the recommended retail
              price, not a reduction of price.
            </p>
            <p>Price is not final. Service fee applies at checkout.</p>
          </div>,
          document.body
        )}
    </div>
  );
}

function WishCountTooltip({ count = 0 }) {
  const [show, setShow] = useState(false);
  const iconRef = useRef(null);

  const getPos = () => {
    if (!iconRef.current) return {};
    const r = iconRef.current.getBoundingClientRect();
    return {
      position: "fixed",
      top: r.top - 60,
      left: r.left + r.width / 2 - 80,
      zIndex: 2000,
    };
  };

  return (
    <div
      className="info-button-wrapper"
      onClick={(e) => e.stopPropagation()}
      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
    >
      <div
        className="likes"
        aria-hidden="true"
        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
      >
        <img
          ref={iconRef}
          className="like-icon"
          src="/heart.png"
          alt="Like Icon"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
        />
        <span className="like-count">{count}</span>
      </div>

      {show &&
        createPortal(
          <div className="tooltip portal-tooltip-likes" style={getPos()}>
            <p>Times wishlisted</p>
          </div>,
          document.body
        )}
    </div>
  );
}

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  const platformImages = {
    Rockstar: "/platforms/rockstargames.png",
    Xbox: "/platforms/xboxlive.png",
    Playstation: "/platforms/playstation.png",
    Nintendo: "/platforms/nintendo.png",
    Steam: "/platforms/steam.png",
  };

  const platformImgSrc =
    platformImages[product.platform] || "/platforms/default.png";

  const discount = Number(product.discount) || 0;
  const cashback = product.price * 0.11;
  const newPrice = product.price - product.price * (discount / 100);


  const handleClick = () => {
    window.location.href = `/product/${product.id}`;
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLiked((v) => !v);
  };

  return (
    <div className="product-shell">
      <div className="product-card" onClick={handleClick}>
        <div className="product-images">
          <div className="main-banner">
            <img src={product.image} alt={product.image} />
          </div>
          <div className="cashback-banner">
            <img
              className="cashback-icon"
              src="/cashback_icon.png"
              alt="Cashback Icon"
            />
          </div>
        </div>
        <div className="product-information">
          <div className="platform-banner">
            <img
              className="platform-icon"
              src={platformImgSrc}
              alt={product.platform}
            />
            <span className="platform-name">{product.platform}</span>
          </div>
          <div className="product-info-upper">
            <div className="product-info-1">
              <span className="product-name">
                {product.title} ({product.platform}) Key {product.region}
              </span>
              <span className="product-region">{product.region}</span>
            </div>
          </div>
          <div className="product-info-lower">
            <div className="product-info-2">
              <div className="product-info-2-1">
                {discount > 0 ? (
                  <>
                    <div className="discount-box">
                      <span className="discount-title">From:</span>
                      <span className="discount-value">
                        {product.price.toFixed(2)}€
                      </span>
                      <span className="discount-percentage">
                        -{product.discount}%
                      </span>
                    </div>
                    <div className="price-box">
                      <span className="new-price">
                        {newPrice.toFixed(2)}€
                      </span>
                      <PriceInfoTooltip />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="discount-box">
                      <span className="discount-title">From:</span>
                    </div>
                    <div className="price-box">
                      <span className="new-price">
                        {product.price.toFixed(2)}€
                      </span>
                      <PriceInfoTooltip />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="cashback-value">
              <span>Cashback: +{cashback.toFixed(2)}€</span>
            </div>
            <WishCountTooltip count={product.likes || 0} />

            <div className="product-info-buttons-1">
              <button
                className="card-button-1"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Add to cart
              </button>
            </div>
            <div className="product-info-buttons-2">
              <button
                className="card-button-2"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Explore options
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="heart-banner">
        <button
          type="button"
          className="heart-banner-button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          onClick={toggleLike}
        >
          <svg
            className="heart-banner-svg"
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path className="hb-shape" d="M0 0 H60 V68 L30 50 L0 68 Z" />
            <rect className="hb-bottom" x="0" y="48" width="60" height="6" rx="2" />
          </svg>

          <img
            className="heart_img"
            src={liked ? "/heart_banner_filled.png" : "/heart_banner.png"}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
