import React from 'react';
import { ServiceType } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceType) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-intro reveal">
          <div>
            <span className="eyebrow lime">01 / Services</span>
            <h2 className="section-heading" id="services-title">
              One idea.<br /><span className="serif">Two ways forward.</span>
            </h2>
          </div>
          <p className="section-description">
            Build the visual system people remember, then give it a deliberate path into the world. Choose one discipline or connect both around a shared brief.
          </p>
        </div>

        <div className="service-stack">
          {/* Service 01: Brand Identity */}
          <article className="service-card service-identity reveal" id="service-identity">
            <div className="service-copy">
              <span className="service-index">Service 01 / Visual identity</span>
              <h3>Graphic Design &amp; <em>Brand Identity</em></h3>
              <p className="service-description">
                Build a brand people can recognize—and a visual system made for real use. We connect the central idea to every expression, from the mark itself to the campaign around it.
              </p>
              <div className="deliverable-tags" aria-label="Brand identity deliverables">
                <span>Brand identity</span>
                <span>Logo systems</span>
                <span>Art direction</span>
                <span>Social creatives</span>
                <span>Advertising graphics</span>
                <span>Campaign design</span>
              </div>
              <a
                className="button button-dark"
                href="#inquiry"
                data-inquiry-service="design"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectService('design');
                }}
              >
                Plan an Identity Project
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 15L15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="service-scope">Final deliverables are tailored to the brief and agreed before production.</p>
            </div>
            <div className="service-visual">
              <div className="identity-board" aria-hidden="true">
                <div className="board-index">
                  <span>GLOMATIC / BRAND SYSTEM</span>
                  <span>EDITION 01</span>
                </div>
                <div className="board-aa">Aa</div>
                <div className="board-form">Form / feeling<br />Voice / visibility<br />System / story</div>
                <div className="board-ring" />
                <div className="board-lime">Make your mark · Move people</div>
                <div className="mock-card dark">
                  <strong>G/</strong>
                  <small>Identity in orbit</small>
                </div>
                <div className="mock-card light">
                  <strong>Aa</strong>
                  <small>Typography / Tone / Use</small>
                </div>
              </div>
            </div>
          </article>

          {/* Service 02: Digital Growth */}
          <article className="service-card service-growth reveal" id="service-growth">
            <div className="service-copy">
              <span className="service-index">Service 02 / Digital growth</span>
              <h3>Digital Marketing &amp; <em>Growth</em></h3>
              <p className="service-description">
                Turn attention into a clearer path forward. We shape channel-ready content and campaign plans around your audience, message and goals—so creative and distribution work together.
              </p>
              <div className="deliverable-tags" aria-label="Digital marketing deliverables">
                <span>Social strategy</span>
                <span>Content planning</span>
                <span>Paid campaigns</span>
                <span>Campaign creative</span>
                <span>Growth planning</span>
              </div>
              <a
                className="button button-lime"
                href="#inquiry"
                data-inquiry-service="marketing"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectService('marketing');
                }}
              >
                Plan a Growth Project
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 15L15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="service-scope">Channels and scope are selected around your actual goals and capabilities.</p>
            </div>
            <div className="service-visual">
              <div className="growth-board" aria-hidden="true">
                <div className="growth-header">
                  <span>Connected campaign system</span>
                  <span>Plan / 01</span>
                </div>
                <svg className="growth-network" viewBox="0 0 500 300" fill="none">
                  <path className="network-line data-path" d="M58 201C119 200 117 91 187 105C248 117 238 206 307 183C372 162 364 65 448 63" />
                  <path className="network-line accent data-path" d="M54 81C127 48 149 198 223 187C300 175 294 76 372 110C405 125 428 177 453 203" />
                  <path className="network-line" d="M187 105L223 187L307 183L372 110L448 63M58 201L54 81M453 203L448 63" />
                  <circle className="network-node lime network-pulse" cx="58" cy="201" r="7" />
                  <circle className="network-node" cx="54" cy="81" r="6" />
                  <circle className="network-node lime network-pulse" cx="187" cy="105" r="8" />
                  <circle className="network-node" cx="223" cy="187" r="6" />
                  <circle className="network-node" cx="307" cy="183" r="7" />
                  <circle className="network-node lime network-pulse" cx="372" cy="110" r="8" />
                  <circle className="network-node" cx="448" cy="63" r="6" />
                  <circle className="network-node" cx="453" cy="203" r="6" />
                </svg>
                <div className="growth-center-label">One idea<br />many touchpoints</div>
                <div className="channel-row">
                  <div className="channel-card"><b>01 / ATTRACT</b><span>Audience &amp; message</span></div>
                  <div className="channel-card"><b>02 / ENGAGE</b><span>Content &amp; campaigns</span></div>
                  <div className="channel-card"><b>03 / REFINE</b><span>Review &amp; next steps</span></div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
