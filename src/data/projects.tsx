import React from 'react';
import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: "aster",
    title: "Aster House",
    category: "Brand Identity / Hospitality · Concept Project",
    summary: "A restrained hospitality identity shaped by architecture, natural light and quiet ritual.",
    brief: "Create a concept identity for a small design-led retreat that should feel warm and considered without relying on familiar rustic hospitality clichés.",
    direction: "Generous spacing, a quiet editorial wordmark and an image language led by shadow, texture and material. The identity uses restraint to make small details feel intentional.",
    deliverables: [
      "Primary and secondary logo suite",
      "Typography and colour direction",
      "Print and wayfinding concepts",
      "Social launch template direction"
    ],
    service: "design",
    filterCategories: ["identity"],
    cardLayout: "wide",
    image: {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=82",
      srcset: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80 700w, https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=82 1200w",
      sizes: "(max-width:700px) 100vw, 55vw",
      alt: "Sunlit minimalist interior with natural textures and sculptural furniture"
    }
  },
  {
    id: "common",
    title: "Common Ground",
    category: "Social Campaign / Coffee · Concept Project",
    summary: "A warm, repeatable social campaign built around the small rituals that bring people together.",
    brief: "Develop a concept content series for a neighbourhood coffee brand that wants to feel social and recognizable without turning every post into a promotion.",
    direction: "A bold editorial poster becomes a flexible content frame. Human rituals, short statements and one bright accent create a system that can shift between announcements, community stories and everyday moments.",
    deliverables: [
      "Campaign idea and message hierarchy",
      "Social poster template family",
      "Launch-content composition concepts",
      "Channel adaptation examples"
    ],
    service: "both",
    filterCategories: ["design", "digital"],
    cardLayout: "narrow",
    offset: true,
    delay: "90ms",
    image: {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=82",
      srcset: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=650&q=80 650w, https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=82 1000w",
      sizes: "(max-width:700px) 100vw, 45vw",
      alt: "Coffee being poured into a ceramic cup on a cafe table"
    }
  },
  {
    id: "noma",
    title: "Noma Skin",
    category: "Packaging & Identity / Beauty · Concept Project",
    summary: "A calm identity and packaging direction that replaces beauty noise with clarity and rhythm.",
    brief: "Imagine a focused skincare range that needs to communicate simplicity across packaging, product education and digital launch assets.",
    direction: "Low-noise typography, a clear naming hierarchy and soft material imagery make the range feel cohesive. Repetition and spacing become recognition devices instead of decorative claims.",
    deliverables: [
      "Wordmark and identity direction",
      "Packaging hierarchy concepts",
      "Product image art direction",
      "Digital launch creative concepts"
    ],
    service: "design",
    filterCategories: ["identity", "design"],
    cardLayout: "narrow",
    image: {
      src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=82",
      srcset: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=650&q=80 650w, https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=82 1000w",
      sizes: "(max-width:700px) 100vw, 45vw",
      alt: "Minimal skincare containers arranged against a neutral background"
    }
  },
  {
    id: "afterlight",
    title: "Afterlight Sessions",
    category: "Campaign Design / Culture · Concept Project",
    summary: "A high-contrast campaign language for an intimate music series, designed to move from poster to feed.",
    brief: "Create a flexible visual campaign for a concept music series where every edition may feature a different atmosphere, artist and venue.",
    direction: "Oversized split typography and solid-to-outline letterforms create a recognizable rhythm. Atmospheric imagery changes by edition while the composition holds the series together.",
    deliverables: [
      "Campaign visual language",
      "Poster composition system",
      "Social announcement adaptations",
      "Motion-ready typography principles"
    ],
    service: "design",
    filterCategories: ["design"],
    cardLayout: "wide",
    offset: true,
    delay: "90ms",
    image: {
      src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=82",
      srcset: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80 700w, https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=82 1200w",
      sizes: "(max-width:700px) 100vw, 55vw",
      alt: "Live music audience illuminated by atmospheric stage lights"
    }
  },
  {
    id: "fieldnotes",
    title: "Field Notes",
    category: "Digital Marketing / Editorial · Concept Project",
    summary: "A modular content-planning concept that turns one editorial idea into a coherent channel rhythm.",
    brief: "Develop a concept content framework for an expertise-led brand with useful ideas to share but no consistent way to organize them across channels.",
    direction: "Three recurring editorial themes create a planning rhythm without prescribing results. Each theme connects a message, a useful format and a role in the wider campaign.",
    deliverables: [
      "Content pillar framework",
      "Weekly planning structure",
      "Channel-ready creative templates",
      "Campaign review prompt framework"
    ],
    service: "marketing",
    filterCategories: ["digital"],
    cardLayout: "wide"
  },
  {
    id: "kanso",
    title: "Kanso Objects",
    category: "Brand Identity / Objects · Concept Project",
    summary: "A material-led identity exploring restraint, tactile typography and space as a brand asset.",
    brief: "Shape an identity concept for a small objects studio where irregular forms, natural finishes and thoughtful production are central to the appeal.",
    direction: "A soft serif signature contrasts with precise small typography. Cropping and negative space give the objects room, while a compact verbal system keeps the presentation grounded.",
    deliverables: [
      "Brand signature and logo system",
      "Editorial art direction",
      "Packaging and insert concepts",
      "Digital lookbook composition"
    ],
    service: "design",
    filterCategories: ["identity"],
    cardLayout: "narrow",
    offset: true,
    delay: "90ms",
    image: {
      src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=82",
      srcset: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=650&q=80 650w, https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=82 1000w",
      sizes: "(max-width:700px) 100vw, 45vw",
      alt: "Handmade neutral ceramic vessels with subtle organic forms"
    }
  }
];

export function ProjectVisualContent({ projectId }: { projectId: string }) {
  switch (projectId) {
    case 'aster':
      return (
        <div className="project-visual">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=82"
            srcSet="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80 700w, https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=82 1200w"
            sizes="(max-width:700px) 100vw, 55vw"
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            alt="Sunlit minimalist interior with natural textures and sculptural furniture"
          />
          <div className="image-shade" />
          <div className="aster-word" aria-hidden="true">ASTER</div>
          <div className="aster-sub" aria-hidden="true">
            <span>HOUSE / RETREAT</span>
            <span>LIGHT · MATERIAL · PAUSE</span>
          </div>
        </div>
      );
    case 'common':
      return (
        <div className="project-visual">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=82"
            srcSet="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=650&q=80 650w, https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=82 1000w"
            sizes="(max-width:700px) 100vw, 45vw"
            width={1000}
            height={1200}
            loading="lazy"
            decoding="async"
            alt="Coffee being poured into a ceramic cup on a cafe table"
          />
          <div className="image-shade" />
          <div className="common-poster" aria-hidden="true">
            <small>Neighbourhood coffee / Social series</small>
            <strong>COMMON<br />GROUND</strong>
            <small>Good days are shared</small>
            <span className="common-dot">MEET<br />SIP<br />SHARE</span>
          </div>
        </div>
      );
    case 'noma':
      return (
        <div className="project-visual">
          <img
            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=82"
            srcSet="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=650&q=80 650w, https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=82 1000w"
            sizes="(max-width:700px) 100vw, 45vw"
            width={1000}
            height={1200}
            loading="lazy"
            decoding="async"
            alt="Minimal skincare containers arranged against a neutral background"
          />
          <div className="image-shade" />
          <div className="noma-word" aria-hidden="true">noma</div>
          <div className="noma-caption" aria-hidden="true">SKIN / SIMPLIFIED</div>
        </div>
      );
    case 'afterlight':
      return (
        <div className="project-visual">
          <img
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=82"
            srcSet="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80 700w, https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=82 1200w"
            sizes="(max-width:700px) 100vw, 55vw"
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            alt="Live music audience illuminated by atmospheric stage lights"
          />
          <div className="image-shade" />
          <div className="afterlight-title" aria-hidden="true">AFTER<span>LIGHT</span></div>
          <div className="afterlight-foot" aria-hidden="true">SESSIONS / MUSIC AFTER DARK</div>
        </div>
      );
    case 'fieldnotes':
      return (
        <div className="project-visual field-visual">
          <div className="strategy-sheet" aria-hidden="true">
            <div className="strategy-sheet-head">
              <strong>FIELD<br />NOTES</strong>
              <span>CONTENT SYSTEM<br />PLAN / CONNECT / REFINE</span>
            </div>
            <div className="content-cadence">
              <div className="cadence-column"><b>W01 / MEANING</b><i /><i /><i /></div>
              <div className="cadence-column"><b>W02 / USEFULNESS</b><i /><i /><i /></div>
              <div className="cadence-column"><b>W03 / COMMUNITY</b><i /><i /><i /></div>
            </div>
            <div className="strategy-footer">
              <span>MESSAGE → MOMENT</span>
              <span>CHANNEL-READY</span>
            </div>
          </div>
        </div>
      );
    case 'kanso':
      return (
        <div className="project-visual">
          <img
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=82"
            srcSet="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=650&q=80 650w, https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=82 1000w"
            sizes="(max-width:700px) 100vw, 45vw"
            width={1000}
            height={1200}
            loading="lazy"
            decoding="async"
            alt="Handmade neutral ceramic vessels with subtle organic forms"
          />
          <div className="image-shade" />
          <div className="kanso-tag" aria-hidden="true">OBJECTS FOR<br />CONSIDERED LIVING</div>
          <div className="kanso-word" aria-hidden="true">Kanso</div>
        </div>
      );
    default:
      return null;
  }
}
