import React from 'react';

interface ClosingCtaProps {
  onStartProject: () => void;
}

export const ClosingCta: React.FC<ClosingCtaProps> = ({ onStartProject }) => {
  return (
    <section className="closing-cta" id="contact" aria-labelledby="contact-title">
      <div className="cta-orbit" aria-hidden="true">
        <span />
      </div>
      <div className="container reveal">
        <span className="eyebrow">A good place to begin</span>
        <h2 id="contact-title">
          <span className="serif">Got a good feeling?</span>
          <span>Let’s build it.</span>
        </h2>
        <div className="closing-bottom">
          <p>
            Bring the ambition, the rough idea or the unfinished brief. The inquiry planner will help shape the starting point.
          </p>
          <a
            className="button button-dark"
            href="#inquiry"
            onClick={(e) => {
              e.preventDefault();
              onStartProject();
            }}
          >
            Start a Project
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 15L15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
