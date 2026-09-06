import React, { useEffect, useState } from 'react';
import { PLANETARY_LOGS } from '../data/astrologyData';
import { playKavadiRoll, playDramaticStinger } from '../utils/soundEffects';

export default function PlanetaryScanModal({ onComplete, soundEnabled }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [percentage, setPercentage] = useState(15);

  useEffect(() => {
    let timer = null;

    if (currentStep < PLANETARY_LOGS.length) {
      const stepData = PLANETARY_LOGS[currentStep];
      timer = setTimeout(() => {
        setLogs((prev) => [...prev, stepData.text]);
        setCurrentStep((s) => s + 1);
        setPercentage((p) => Math.min(100, Math.floor(((currentStep + 1) / PLANETARY_LOGS.length) * 100)));

        if (soundEnabled) {
          if (currentStep % 2 === 0) {
            playKavadiRoll();
          }
          if (currentStep === PLANETARY_LOGS.length - 2) {
            playDramaticStinger();
          }
        }
      }, stepData.delay);
    } else {
      timer = setTimeout(() => {
        onComplete();
      }, 1200);
    }

    return () => clearTimeout(timer);
  }, [currentStep, onComplete, soundEnabled]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="parchment-sheet" style={{ maxWidth: '520px', width: '100%', textAlign: 'center', border: '4px double #8b1818' }}>
        
        {/* Animated Rotating Celestial Kavadi Ring */}
        <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 1rem auto' }}>
          <div
            className="animate-spin-slow"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '3px dashed #d4af37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ fontSize: '1rem' }}>🪐</div>
          </div>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.8rem'
          }}>
            🐚
          </div>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#4a1212', marginBottom: '0.25rem' }}>
          നിങ്ങളുടെ ജാതകം ഗണിക്കുന്നു...
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#6e4726', fontStyle: 'italic', marginBottom: '1rem' }}>
          നവഗ്രഹങ്ങൾ അടിയന്തിര മീറ്റിംഗ് വിളിച്ചു ചേർത്തിരിക്കുന്നു.
        </p>

        {/* Diagnostic Progress Bar */}
        <div style={{
          width: '100%',
          height: '14px',
          background: '#ebd9b3',
          border: '1px solid #b89b70',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '1rem',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #991c1c, #d4af37)',
            transition: 'width 0.3s ease'
          }}></div>
          <span style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.65rem',
            fontWeight: 800,
            color: '#1a120b',
            fontFamily: 'monospace'
          }}>
            {percentage}%
          </span>
        </div>

        {/* Staged Console Log Window */}
        <div style={{
          background: '#150f0b',
          border: '2px solid #54391e',
          borderRadius: '8px',
          padding: '0.85rem',
          minHeight: '180px',
          textAlign: 'left',
          fontFamily: 'monospace',
          fontSize: '0.82rem',
          color: '#eedebb',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.7)'
        }}>
          {logs.map((log, idx) => (
            <div
              key={idx}
              style={{
                color: idx === logs.length - 1 ? '#ffd54f' : '#eedebb',
                fontWeight: idx === logs.length - 1 ? 800 : 400
              }}
            >
              {log}
            </div>
          ))}

          {currentStep < PLANETARY_LOGS.length && (
            <div style={{ color: '#ff9900', fontSize: '0.75rem', fontStyle: 'italic' }}>
              ⌛ കണക്കുകൂട്ടലുകൾ പുരോഗമിക്കുന്നു...
            </div>
          )}
        </div>

        {/* Footer Comment */}
        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed #c9b48c', fontSize: '0.8rem' }}>
          <span style={{ fontWeight: 800, color: '#4a1212' }}>ജ്യോതിഷിയുടെ കമന്റ്: </span>
          <span style={{ color: '#8b1818', fontStyle: 'italic' }}>
            "ദൈവമേ... ഇവന്റെ സമയം അത്ര നല്ലതല്ലല്ലോ!"
          </span>
        </div>
      </div>
    </div>
  );
}
