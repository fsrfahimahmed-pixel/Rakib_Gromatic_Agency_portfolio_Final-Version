import React from 'react';

export const Marquee: React.FC = () => {
  return (
    <div className="marquee" aria-label="Agency capabilities">
      <span className="sr-only">
        Brand identity, art direction, social media creatives, campaign design, content planning and digital growth.
      </span>
      <div className="marquee-track" aria-hidden="true">
        <div className="marquee-group">
          <span className="marquee-item">Brand Identity <i className="marquee-diamond" /></span>
          <span className="marquee-item">Art Direction <i className="marquee-diamond" /></span>
          <span className="marquee-item">Social Campaigns <i className="marquee-diamond" /></span>
          <span className="marquee-item">Digital Growth <i className="marquee-diamond" /></span>
          <span className="marquee-item">Content Planning <i className="marquee-diamond" /></span>
          <span className="marquee-item">Make Your Mark <i className="marquee-diamond" /></span>
        </div>
        <div className="marquee-group" aria-hidden="true">
          <span className="marquee-item">Brand Identity <i className="marquee-diamond" /></span>
          <span className="marquee-item">Art Direction <i className="marquee-diamond" /></span>
          <span className="marquee-item">Social Campaigns <i className="marquee-diamond" /></span>
          <span className="marquee-item">Digital Growth <i className="marquee-diamond" /></span>
          <span className="marquee-item">Content Planning <i className="marquee-diamond" /></span>
          <span className="marquee-item">Make Your Mark <i className="marquee-diamond" /></span>
        </div>
      </div>
    </div>
  );
};
