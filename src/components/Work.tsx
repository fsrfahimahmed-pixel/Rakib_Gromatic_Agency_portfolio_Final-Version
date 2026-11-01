import React, { useState } from 'react';
import { Project, FilterCategory } from '../types';
import { PROJECTS, ProjectVisualContent } from '../data/projects';

interface WorkProps {
  onOpenProject: (project: Project) => void;
}

export const Work: React.FC<WorkProps> = ({ onOpenProject }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.filterCategories.includes(activeFilter as 'identity' | 'design' | 'digital');
  });

  const count = filteredProjects.length;

  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-intro reveal">
          <div>
            <span className="eyebrow lime">02 / Selected work</span>
            <h2 className="section-heading" id="work-title">
              Ideas with<br /><span className="serif">a visual pulse.</span>
            </h2>
          </div>
          <p className="section-description">
            An editorial collection of self-initiated identity, campaign and digital concepts. Each is clearly labeled as a Concept Project—created to explore a brief, not to claim client results.
          </p>
        </div>

        <div className="work-toolbar reveal">
          <div className="work-filters" role="group" aria-label="Filter concept projects">
            <button
              className="filter-button"
              type="button"
              data-filter="all"
              aria-pressed={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className="filter-button"
              type="button"
              data-filter="design"
              aria-pressed={activeFilter === 'design'}
              onClick={() => setActiveFilter('design')}
            >
              Graphic Design
            </button>
            <button
              className="filter-button"
              type="button"
              data-filter="digital"
              aria-pressed={activeFilter === 'digital'}
              onClick={() => setActiveFilter('digital')}
            >
              Digital Marketing
            </button>
          </div>
          <p className="work-count" id="work-count" aria-live="polite">
            {count} concept project{count === 1 ? '' : 's'}
          </p>
        </div>

        <div className={`work-grid ${activeFilter !== 'all' ? 'filtered-view' : ''}`} id="work-grid">
          {filteredProjects.map((project) => {
            const cardClasses = [
              'project-card',
              project.cardLayout === 'wide' ? 'project-wide' : 'project-narrow',
              project.offset ? 'project-offset' : '',
              'reveal',
              'is-visible'
            ].filter(Boolean).join(' ');

            return (
              <article
                key={project.id}
                className={cardClasses}
                data-category={project.filterCategories.join(' ')}
                data-project={project.id}
                style={project.delay ? ({ ['--delay' as string]: project.delay } as React.CSSProperties) : undefined}
              >
                <ProjectVisualContent projectId={project.id} />
                <div className="project-info">
                  <div className="project-meta">
                    <span>{project.category.replace(' · Concept Project', '')}</span>
                    <span className="concept-badge">Concept Project</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.summary}</p>
                  <button
                    className="project-open"
                    type="button"
                    aria-label={`View ${project.title} concept case study`}
                    onClick={() => onOpenProject(project)}
                  >
                    View case study
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M5 15L15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
