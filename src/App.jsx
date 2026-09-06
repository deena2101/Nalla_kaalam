import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SoundboardBar from './components/SoundboardBar';
import LandingHero from './components/LandingHero';
import AstrologyForm from './components/AstrologyForm';
import PlanetaryScanModal from './components/PlanetaryScanModal';
import JathakamResult from './components/JathakamResult';
import Footer from './components/Footer';
import { playTempleBell } from './utils/soundEffects';

export default function App() {
  const [currentStep, setCurrentStep] = useState('landing'); // 'landing' | 'form' | 'scanning' | 'result'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userData, setUserData] = useState(null);

  const handleStart = () => {
    setCurrentStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickDemo = () => {
    const demoData = {
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      photoName: "എഞ്ചിനീയറിംഗ് വിദ്യാർത്ഥി",
      scanResult: "ഉറക്കം കുറവാണ്. അർദ്ധരാത്രി റീൽസ് കണ്ടതിന്റെ വ്യക്തമായ തെളിവ്.",
      dob: "2003-08-15",
      birthTime: "രാത്രി 2:30 (ഓവർതിങ്കിംഗ് സമയം)",
      birthPlace: "കോഴിക്കോട് (ബിരിയാണി നാട്)",
      name: "അനന്തു കൃഷ്ണൻ"
    };
    setUserData(demoData);
    setCurrentStep('scanning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (data) => {
    setUserData(data);
    setCurrentStep('scanning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanComplete = () => {
    setCurrentStep('result');
    if (soundEnabled) {
      playTempleBell();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentStep('landing');
    setUserData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onReset={handleReset}
      />

      <main className="app-container" style={{ flex: 1, width: '100%' }}>
        {/* Malayalam Meme Astrological Soundboard */}
        <SoundboardBar />

        {currentStep === 'landing' && (
          <LandingHero
            onStart={handleStart}
            onQuickDemo={handleQuickDemo}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStep === 'form' && (
          <AstrologyForm
            onSubmit={handleFormSubmit}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStep === 'scanning' && (
          <PlanetaryScanModal
            onComplete={handleScanComplete}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStep === 'result' && userData && (
          <JathakamResult
            userData={userData}
            onReset={handleReset}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
