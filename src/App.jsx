import React, { useState, useEffect } from 'react';
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
import CommunityPortal from './components/CommunityPortal';
import Testimonials from './components/Testimonials';
import BookingModal from './components/BookingModal';
import DeploymentGuideModal from './components/DeploymentGuideModal';
import LeadMagnetModal from './components/LeadMagnetModal';
import AuthModal from './components/AuthModal';
import AiMentorWidget from './components/AiMentorWidget';
import AmbientBackground from './components/AmbientBackground';
import Footer from './components/Footer';
import { getCurrentUser, signOutUser } from './services/authService';
import { supabase, isSupabaseConfigured } from './utils/supabaseClient';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState(false);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Initial fetch user
    getCurrentUser().then(user => setCurrentUser(user));

    // Listen for Supabase OAuth changes
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentUser(session?.user || null);
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

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
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
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

        <CommunityPortal
          onOpenBooking={() => setIsBookingOpen(true)}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
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

      {/* Supabase Authentication Modal (Google / LinkedIn / Email) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />

    </div>
  );
}
