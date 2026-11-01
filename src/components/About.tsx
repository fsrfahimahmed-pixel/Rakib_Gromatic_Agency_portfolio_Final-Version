import React, { useState } from 'react';
import { OrbitMode } from '../types';

export const About: React.FC = () => {
  const [orbitMode, setOrbitMode] = useState<OrbitMode>('identity');

  const orbitCaptions = {
    identity: {
      word: "MEANING",
      caption: "A recognizable visual system with a clear idea at its center.",
      l1: "Purpose",
      l2: "Expression",
      l3: "Consistency",
      l4: "Recognition"
    },
    growth: {
      word: "MOMENTUM",
      caption: "A connected campaign system that carries the idea into relevant channels.",
      l1: "Audience",
      l2: "Message",
      l3: "Channels",
      l4: "Learning"
    }
  };

  const current = orbitCaptions[orbitMode];

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-layout">
          <div className="about-copy reveal">
            <span className="eyebrow lime">03 / Studio approach</span>
            <h2 className="section-heading" id="about-title">
              Creativity with<br /><span className="serif">somewhere to go.</span>
            </h2>
            <p className="about-lead">
              A strong identity earns recognition. A thoughtful marketing system gives that recognition momentum.
            </p>
            <p className="about-body">
              Glomatic Space brings both into the same conversation. Visual choices are shaped by positioning and audience; campaign choices are shaped by the character of the brand. The result is not simply more output, but a clearer connection between what a business means, how it looks and how it shows up.
            </p>
          </div>

          <div
            className="about-explorer reveal"
            style={{ ['--delay' as string]: '100ms' }}
            data-mode={orbitMode}
            id="about-explorer"
          >
            <div className="orbit-switcher" role="group" aria-label="Explore the Glomatic Space approach">
              <button
                className="orbit-choice"
                type="button"
                data-orbit-choice="identity"
                aria-pressed={orbitMode === 'identity'}
                onClick={() => setOrbitMode('identity')}
              >
                Identity lens
              </button>
              <button
                className="orbit-choice"
                type="button"
                data-orbit-choice="growth"
                aria-pressed={orbitMode === 'growth'}
                onClick={() => setOrbitMode('growth')}
              >
                Growth lens
              </button>
            </div>

            <div className="about-orbit-visual" aria-hidden="true">
              <div className="about-rings">
                <div className="about-ring a" />
                <div className="about-ring b" />
                <div className="about-ring c" />
              </div>
              <div className="about-core">
                <svg viewBox="0 0 100 100" fill="none">
                  <path
                    d="M70 24C62 15 51 12 41 15C25 19 15 33 17 49C19 66 34 78 51 75C63 73 72 66 76 56V44H53"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="about-center-word" id="about-center-word">
                {current.word}
              </span>
              <span className="about-orbit-label l1">{current.l1}</span>
              <span className="about-orbit-label l2">{current.l2}</span>
              <span className="about-orbit-label l3">{current.l3}</span>
              <span className="about-orbit-label l4">{current.l4}</span>
            </div>

            <p className="about-orbit-caption" id="about-orbit-caption" aria-live="polite">
              {current.caption}
            </p>
          </div>
        </div>

        <div className="standards reveal">
          <div className="standards-head">
            <h3>The standard behind the work.</h3>
            <p>Practical principles that shape the brief, the creative decisions and the handover.</p>
          </div>

          <div className="standards-grid">
            <article className="standard">
              <span className="standard-number">01 / SYSTEM</span>
              <h4>Built to hold together</h4>
              <p>Assets share a visual logic, so a logo, post, advert or campaign feels connected rather than collected.</p>
            </article>

            <article className="standard">
              <span className="standard-number">02 / RATIONALE</span>
              <h4>Strategy before decoration</h4>
              <p>Creative choices begin with the audience, message and context—not a passing visual trend.</p>
            </article>

            <article className="standard">
              <span className="standard-number">03 / CLARITY</span>
              <h4>Visible decisions</h4>
              <p>Priorities, review points and agreed deliverables keep collaboration clear throughout the scope.</p>
            </article>

            <article className="standard">
              <span className="standard-number">04 / USEFULNESS</span>
              <h4>Designed for real use</h4>
              <p>Production formats, templates and guidance are considered around how the work will actually be used.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
