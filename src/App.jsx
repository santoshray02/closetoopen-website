import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReadinessAssessment from './components/ReadinessAssessment';
import AdvisoryPillars from './components/AdvisoryPillars';
import RoiCalculator from './components/RoiCalculator';
import CaseStudies from './components/CaseStudies';
import MediaShowcase from './components/MediaShowcase';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import KnowledgeHub from './components/KnowledgeHub';
import Testimonials from './components/Testimonials';
import BookingModal from './components/BookingModal';
import DeploymentGuideModal from './components/DeploymentGuideModal';
import LeadMagnetModal from './components/LeadMagnetModal';
import AiMentorWidget from './components/AiMentorWidget';
import AmbientBackground from './components/AmbientBackground';
import Footer from './components/Footer';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState(false);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);

  const handleStartQuiz = () => {
    const el = document.getElementById('scorecard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090D16] text-slate-100 selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* Ambient Particle Background Canvas */}
      <AmbientBackground />

      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
        onOpenLeadMagnet={() => setIsLeadMagnetOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onOpenBooking={() => setIsBookingOpen(true)}
          onStartQuiz={handleStartQuiz}
        />

        <ReadinessAssessment
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <AdvisoryPillars
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <RoiCalculator
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <CaseStudies
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <MediaShowcase
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <AboutSection />

        <TimelineSection />

        <KnowledgeHub
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <Testimonials />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
      />

      {/* Floating AI Mentor Widget */}
      <AiMentorWidget
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Booking & Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Free Blueprint Lead Magnet Modal */}
      <LeadMagnetModal
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
      />

      {/* Netlify & GoDaddy Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={isDeploymentGuideOpen}
        onClose={() => setIsDeploymentGuideOpen(false)}
      />

    </div>
  );
}
