import React, { useEffect, useRef } from 'react';
import { Project, ServiceType } from '../types';
import { ProjectVisualContent } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectService: (service: ServiceType) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSelectService }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      document.body.classList.add('dialog-open');
      if (typeof dialog.showModal === 'function') {
        if (!dialog.open) {
          dialog.showModal();
        }
      }
    } else {
      document.body.classList.remove('dialog-open');
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      }
    }

    return () => {
      document.body.classList.remove('dialog-open');
    };
  }, [project]);

  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleStartSimilar = () => {
    onClose();
    setTimeout(() => {
      onSelectService(project.service);
    }, 80);
  };

  return (
    <dialog
      className="project-dialog"
      id="project-dialog"
      ref={dialogRef}
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          className="dialog-close"
          id="dialog-close"
          type="button"
          aria-label="Close case study"
          onClick={onClose}
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="modal-art" id="modal-art">
          <ProjectVisualContent projectId={project.id} />
        </div>

        <div className="modal-heading">
          <div>
            <span className="eyebrow lime" id="modal-category">
              {project.category}
            </span>
            <h2 id="modal-title">{project.title}</h2>
          </div>
          <p className="modal-summary" id="modal-summary">
            {project.summary}
          </p>
        </div>

        <div className="modal-details">
          <div>
            <h3>The brief</h3>
            <p id="modal-brief">{project.brief}</p>
          </div>
          <div>
            <h3>Creative direction</h3>
            <p id="modal-direction">{project.direction}</p>
          </div>
          <div>
            <h3>Concept deliverables</h3>
            <ul id="modal-deliverables">
              {project.deliverables.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <p>
            This is a self-initiated Concept Project. It does not represent a commissioned client engagement or measured campaign outcome.
          </p>
          <button
            className="button button-lime"
            id="modal-inquiry"
            type="button"
            data-inquiry-service={project.service}
            onClick={handleStartSimilar}
          >
            Start a Similar Project
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 15L15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </dialog>
  );
};
