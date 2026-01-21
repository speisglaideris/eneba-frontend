import React, { useState, useRef, useEffect } from "react";

function Header({ query, setQuery }) {
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search for games, top ups and more"
  );
  const wrapperRef = useRef(null);
  const [heartHover, setHeartHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container" ref={wrapperRef}>
        <div className="header-left">
          <img className="header-logo" src="/logoFull.svg" alt="logo" />

          <form
            className="search-bar"
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            role="search"
          >
            <button type="button" className="search-button" aria-label="Search">
              <img className="search-icon" src="/search.png" alt="Search" />
            </button>

            <input
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setOpen(false);
                  e.currentTarget.blur();
                }
              }}
              onFocus={() => {
                setOpen(true);
                setPlaceholder("");
              }}
              onBlur={() => setPlaceholder("Search for games, top ups and more")}
              placeholder={placeholder}
              aria-label="Search"
            />

            {open && (
              <div
                className="search-dropdown"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="search-section">
                  <h4>Recent searches</h4>
                </div>
                <div className="search-section">
                  <h4>Trending searches</h4>
                </div>
              </div>
            )}
          </form>

          <button className="header-control header-lang" aria-label="Language">
            <img className="language-icon" src="/language.svg" alt="Language" />
            <span className="lang-text-1">English EU</span> | <span className="lang-text-2">EUR</span>
          </button>
        </div>

        <div className="header-right">
          <button
            className="header-control"
            aria-label="Wishlist"
            onMouseEnter={() => setHeartHover(true)}
            onMouseLeave={() => setHeartHover(false)}
            onFocus={() => setHeartHover(true)}
            onBlur={() => setHeartHover(false)}
          >
            <img
              src={heartHover ? "/header-heart-hover.png" : "/header-heart.png"}
              className="header-heart-icon"
              alt=""
            />
          </button>

          <button
            className="header-control"
            aria-label="Cart"
            onMouseEnter={() => setCartHover(true)}
            onMouseLeave={() => setCartHover(false)}
            onFocus={() => setCartHover(true)}
            onBlur={() => setCartHover(false)}
          >
            <img
              src={cartHover ? "/shopping-cart-hover.png" : "/shopping-cart.png"}
              className="header-icon"
              alt="Cart"
            />
          </button>
          <button className="header-control header-avatar" aria-label="Account">
            <img src="/people.png" className="header-icon header-avatar" alt="Account" />
          </button>
        </div>
      </div>

      {open && <div className="dim-overlay" onClick={() => setOpen(false)} />}
    </header>
  );
}

export default Header;
