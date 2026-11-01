import React from 'react';

export const Process: React.FC = () => {
  return (
    <section className="section light-section process" id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-intro reveal">
          <div>
            <span className="eyebrow">04 / Process</span>
            <h2 className="section-heading" id="process-title">
              From first thought<br /><span className="serif">to forward motion.</span>
            </h2>
          </div>
          <p className="section-description">
            A clear four-stage framework keeps the work focused without making it formulaic. The depth of each stage flexes around the project.
          </p>
        </div>

        <div className="process-track reveal">
          <div className="process-connector" aria-hidden="true">
            <span className="process-line-fill" />
            <span className="process-traveler" />
          </div>

          <ol className="process-steps">
            <li className="process-step reveal" style={{ ['--delay' as string]: '80ms' }}>
              <span className="process-node">01</span>
              <div className="process-content">
                <h3>Discover</h3>
                <p>Clarify the business context, audience, goals, constraints and what a useful outcome looks like.</p>
                <span className="process-output">Output / Focused creative brief</span>
              </div>
            </li>

            <li className="process-step reveal" style={{ ['--delay' as string]: '160ms' }}>
              <span className="process-node">02</span>
              <div className="process-content">
                <h3>Strategize</h3>
                <p>Set priorities, define the central idea and choose the visual or channel direction before production expands.</p>
                <span className="process-output">Output / Clear creative direction</span>
              </div>
            </li>

            <li className="process-step reveal" style={{ ['--delay' as string]: '240ms' }}>
              <span className="process-node">03</span>
              <div className="process-content">
                <h3>Create</h3>
                <p>Develop the system, refine through agreed feedback and prepare the required design or campaign assets.</p>
                <span className="process-output">Output / Production-ready assets</span>
              </div>
            </li>

            <li className="process-step reveal" style={{ ['--delay' as string]: '320ms' }}>
              <span className="process-node">04</span>
              <div className="process-content">
                <h3>Launch &amp; Improve</h3>
                <p>Coordinate rollout, organize the handover and identify useful next iterations where review is in scope.</p>
                <span className="process-output">Output / Launch kit &amp; next steps</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};
