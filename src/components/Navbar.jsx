import React from 'react';
import { playTempleBell } from '../utils/soundEffects';

export default function Navbar({ soundEnabled, setSoundEnabled, onReset }) {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playTempleBell();
    }
  };

  return (
    <header className="nk-navbar">
      <div className="nk-nav-content">
        <div onClick={onReset} className="nk-brand" title="Home">
          <div className="nk-brand-icon">
            🔮
          </div>
          <div>
            <div className="nk-brand-title">
              NALLA KAALAM™
              <span className="nk-tag-badge">
                നല്ല കാലം
              </span>
            </div>
            <div className="nk-brand-sub">
              “നിങ്ങളുടെ ജാതകം നോക്കിയതാണ്... ഇനി അനുഭവിച്ചോളൂ.”
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{
            fontSize: '0.7rem',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#f3cf58',
            border: '1px solid #7d592f',
            borderRadius: '4px',
            padding: '4px 8px',
            background: '#2b1c14'
          }}>
            TinkerHub #108
          </span>

          <button
            type="button"
            onClick={toggleSound}
            style={{
              background: '#2b1c14',
              border: '1px solid #7d592f',
              borderRadius: '6px',
              color: '#eedebb',
              padding: '5px 10px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>{soundEnabled ? '🔊 ശബ്ദം: ഓൺ' : '🔇 ശബ്ദം: ഓഫ്'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
