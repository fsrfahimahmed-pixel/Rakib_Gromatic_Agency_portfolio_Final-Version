import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onStartProject?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || document.documentElement.scrollTop;
          setIsScrolled(y > 16);
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          setProgress(Math.min(1, Math.max(0, y / max)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    if (onStartProject) {
      onStartProject();
    } else {
      const inquiry = document.getElementById('inquiry');
      if (inquiry) inquiry.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} id="site-header">
      <div className="container header-inner">
        <a
          className="brand"
          href="#home"
          aria-label="Glomatic Space home"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mini-orbit"><i /></span>
            <svg viewBox="0 0 100 100" fill="none">
              <path
                d="M70 24C62 15 51 12 41 15C25 19 15 33 17 49C19 66 34 78 51 75C63 73 72 66 76 56V44H53"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="brand-name">
            GLOMATIC <span>SPACE<sup>®</sup></span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
          <a href="#work" onClick={(e) => handleNavClick(e, 'work')}>Work</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
          <a href="#process" onClick={(e) => handleNavClick(e, 'process')}>Process</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
        </nav>

        <a className="button button-lime header-cta" href="#inquiry" onClick={handleStartProjectClick}>
          Start a Project
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 15L15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <button
          className="menu-toggle"
          id="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu" hidden={!menuOpen}>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>
            Services <span>01</span>
          </a>
          <a href="#work" onClick={(e) => handleNavClick(e, 'work')}>
            Work <span>02</span>
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
            About <span>03</span>
          </a>
          <a href="#process" onClick={(e) => handleNavClick(e, 'process')}>
            Process <span>04</span>
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
            Contact <span>05</span>
          </a>
        </nav>
        <a className="button button-lime" href="#inquiry" onClick={handleStartProjectClick}>
          Start a Project
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 15L15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <p className="mobile-menu-note">
          Graphic Design &amp; Brand Identity<br />
          Digital Marketing &amp; Growth
        </p>
      </div>

      <div className="page-progress" aria-hidden="true">
        <span id="page-progress-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
};
