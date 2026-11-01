import React, { useRef, useEffect } from 'react';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const heroRef = useRef<HTMLElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = orbitalRef.current;
    if (!hero || !stage) return;

    const finePointer = window.matchMedia('(pointer: fine)');
    const motionPref = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame: number | null = null;
    let pointerTarget = { x: 0, y: 0 };

    const render = () => {
      stage.style.setProperty('--px', `${pointerTarget.x * 10}px`);
      stage.style.setProperty('--py', `${pointerTarget.y * 8}px`);
      frame = null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (motionPref.matches || window.innerWidth < 901) return;
      const rect = hero.getBoundingClientRect();
      pointerTarget = {
        x: Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2)),
        y: Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2))
      };
      if (!frame) {
        frame = requestAnimationFrame(render);
      }
    };

    const handlePointerLeave = () => {
      pointerTarget = { x: 0, y: 0 };
      if (!frame) {
        frame = requestAnimationFrame(render);
      }
    };

    if (finePointer.matches) {
      hero.addEventListener('pointermove', handlePointerMove);
      hero.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef} aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy-block">
          <div className="hero-kicker hero-fade" style={{ ['--hero-delay' as string]: '.1s' }}>
            <i aria-hidden="true" />
            Creative agency · Identity + growth
          </div>
          <h1 id="hero-title">
            <span className="hero-line"><span style={{ ['--hero-delay' as string]: '.18s' }}>Make your</span></span>
            <span className="hero-line"><span style={{ ['--hero-delay' as string]: '.28s' }}>mark.</span></span>
            <span className="hero-line hero-serif">
              <span style={{ ['--hero-delay' as string]: '.4s' }}>Move people<span className="hero-period">.</span></span>
            </span>
          </h1>
          <p className="hero-copy hero-fade" style={{ ['--hero-delay' as string]: '.65s' }}>
            Glomatic Space® connects distinctive brand identities with thoughtful digital marketing—so what people recognize and what moves them forward feel like one idea.
          </p>
          <div className="hero-actions hero-fade" style={{ ['--hero-delay' as string]: '.76s' }}>
            <a
              className="button button-lime"
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
            <a
              className="button button-outline"
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                onExploreWork();
              }}
            >
              Explore the Work
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="hero-footnote hero-fade" style={{ ['--hero-delay' as string]: '.86s' }}>
            Two disciplines / one creative orbit
          </div>
        </div>

        <div className="orbital-stage" id="orbital-stage" ref={orbitalRef} aria-hidden="true">
          <div className="orbit-parallax">
            <div className="orbit-float">
              <div className="orbit-halo" />
              <div className="orbit-plane plane-a">
                <div className="orbit-spin"><i className="satellite" /></div>
              </div>
              <div className="orbit-plane plane-b">
                <div className="orbit-spin reverse"><i className="satellite muted" /></div>
              </div>
              <div className="orbit-plane plane-c">
                <div className="orbit-spin"><i className="satellite" /></div>
              </div>
              <div className="orbit-core">
                <svg viewBox="0 0 100 100" fill="none">
                  <path
                    d="M70 24C62 15 51 12 41 15C25 19 15 33 17 49C19 66 34 78 51 75C63 73 72 66 76 56V44H53"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <small>SPACE®</small>
              </div>
              <span className="orbit-label one">Graphic Design</span>
              <span className="orbit-label two">Digital Growth</span>
              <span className="orbit-caption">Identity in motion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
