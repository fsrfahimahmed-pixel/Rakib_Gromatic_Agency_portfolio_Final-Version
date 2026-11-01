import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { ProjectModal } from './components/ProjectModal';
import { About } from './components/About';
import { Process } from './components/Process';
import { InquiryForm } from './components/InquiryForm';
import { ClosingCta } from './components/ClosingCta';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { SITE_CONFIG } from './data/config';
import { Project, ServiceType } from './types';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [preselectedService, setPreselectedService] = useState<ServiceType | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3400);
  };

  const scrollToInquiry = () => {
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: ServiceType) => {
    setPreselectedService(service);
    scrollToInquiry();
  };

  // Scroll reveal observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
      );

      revealElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    } else {
      revealElements.forEach((el) => el.classList.add('is-visible'));
    }
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <Header onStartProject={scrollToInquiry} />

      <main id="main">
        <Hero onStartProject={scrollToInquiry} onExploreWork={scrollToWork} />
        <Marquee />
        <Services onSelectService={handleSelectService} />
        <Work onOpenProject={setSelectedProject} />
        <About />
        <Process />
        <InquiryForm
          siteConfig={SITE_CONFIG}
          preselectedService={preselectedService}
          onClearPreselectedService={() => setPreselectedService(null)}
          onShowToast={showToast}
        />
        <ClosingCta onStartProject={scrollToInquiry} />
      </main>

      <Footer siteConfig={SITE_CONFIG} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectService={handleSelectService}
      />

      <Toast message={toastMessage} visible={toastVisible} />
    </>
  );
};

export default App;
