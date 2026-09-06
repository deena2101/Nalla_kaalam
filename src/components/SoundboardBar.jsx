import React from 'react';
import {
  playTempleBell,
  playKavadiRoll,
  playDramaticStinger,
  playComedyLaugh,
  playAmmavanVoiceBabble,
  playBuzzer
} from '../utils/soundEffects';

export default function SoundboardBar() {
  return (
    <div style={{
      background: 'rgba(28, 21, 16, 0.85)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      borderRadius: '10px',
      padding: '0.6rem 1rem',
      margin: '0.75rem auto 1.5rem auto',
      maxWidth: '850px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1rem' }}>🎛️</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f3cf58', letterSpacing: '0.5px' }}>
          സൗണ്ട് ബോർഡ് (Soundboard):
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={playTempleBell}
          style={soundBtnStyle}
          title="ക്ഷേത്ര മണി മുഴക്കൂ"
        >
          🔔 മണി
        </button>

        <button
          type="button"
          onClick={playKavadiRoll}
          style={soundBtnStyle}
          title="കവടി കുലുക്കുക"
        >
          🐚 കവടി
        </button>

        <button
          type="button"
          onClick={playDramaticStinger}
          style={{ ...soundBtnStyle, borderColor: '#c42424', color: '#ffb3b3' }}
          title="ഭീകരമായ പശ്ചാത്തല സംഗീതം"
        >
          💀 ദും-തനന
        </button>

        <button
          type="button"
          onClick={playComedyLaugh}
          style={soundBtnStyle}
          title="ഹാസ്യ ചിരി"
        >
          😂 ചിരി
        </button>

        <button
          type="button"
          onClick={playAmmavanVoiceBabble}
          style={{ ...soundBtnStyle, borderColor: '#25d366', color: '#baffcf' }}
          title="അമ്മാവന്റെ ശബ്ദം"
        >
          👴 അമ്മാവൻ
        </button>

        <button
          type="button"
          onClick={playBuzzer}
          style={{ ...soundBtnStyle, borderColor: '#ff9900', color: '#ffe0b2' }}
          title="തെറ്റായ തീരുമാനം ബസർ"
        >
          🚨 ബസർ
        </button>
      </div>
    </div>
  );
}

const soundBtnStyle = {
  background: '#2d1a12',
  border: '1px solid #7d592f',
  borderRadius: '6px',
  color: '#eedebb',
  fontSize: '0.75rem',
  fontWeight: 700,
  padding: '4px 10px',
  cursor: 'pointer',
  transition: 'all 0.15s ease'
};
