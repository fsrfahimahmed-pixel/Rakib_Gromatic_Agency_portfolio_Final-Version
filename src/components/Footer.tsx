import React from 'react';
import { SiteConfig } from '../types';

interface FooterProps {
  siteConfig: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ siteConfig }) => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const configuredEmail = siteConfig.contactEmail.trim().replace(/[\r\n]/g, '');
  const configuredPhone = siteConfig.phone.trim();
  const whatsappDigits = siteConfig.whatsapp.replace(/\D/g, '');

  const hasContactLinks =
    configuredEmail || configuredPhone || whatsappDigits || (siteConfig.socials && siteConfig.socials.length > 0);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
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
            <p className="footer-statement">
              Make your mark.<br />Move people.
            </p>
          </div>

          <div>
            <h2 className="footer-heading">Explore</h2>
            <nav className="footer-nav" aria-label="Footer navigation">
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
              <a href="#service-identity" onClick={(e) => handleNavClick(e, 'service-identity')}>Brand Identity</a>
              <a href="#service-growth" onClick={(e) => handleNavClick(e, 'service-growth')}>Digital Growth</a>
              <a href="#work" onClick={(e) => handleNavClick(e, 'work')}>Work</a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
              <a href="#process" onClick={(e) => handleNavClick(e, 'process')}>Process</a>
              <a href="#inquiry" onClick={(e) => handleNavClick(e, 'inquiry')}>Project Inquiry</a>
            </nav>
          </div>

          <div className="footer-contact">
            <h2 className="footer-heading">Direct contact</h2>
            <div className="footer-contact-list" id="footer-contact-list">
              {configuredEmail && (
                <a href={`mailto:${configuredEmail}`}>{configuredEmail}</a>
              )}
              {configuredPhone && (
                <a href={`tel:${configuredPhone.replace(/[^+\d]/g, '')}`}>{configuredPhone}</a>
              )}
              {whatsappDigits && (
                <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              )}
              {siteConfig.socials &&
                siteConfig.socials.map((s, idx) => (
                  <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
            </div>

            {!hasContactLinks && (
              <span className="footer-config" id="footer-config">
                Business email, phone and social links are intentionally unlisted. Add confirmed details in{' '}
                <code>SITE_CONFIG</code> before publishing.
              </span>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Glomatic Space®. All rights reserved.</p>
          <p>Graphic Design &amp; Brand Identity / Digital Marketing &amp; Growth</p>
          <button className="back-to-top" id="back-to-top" type="button" onClick={handleBackToTop}>
            Back to top
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 16V4M5 9l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
