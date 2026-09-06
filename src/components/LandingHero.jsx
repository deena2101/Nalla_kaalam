import React from 'react';
import { playTempleBell, playComedyLaugh } from '../utils/soundEffects';
import KavadiBoard from './KavadiBoard';

export default function LandingHero({ onStart, onQuickDemo, soundEnabled }) {
  const handleStart = () => {
    if (soundEnabled) playTempleBell();
    onStart();
  };

  const handleQuickDemo = () => {
    if (soundEnabled) playComedyLaugh();
    onQuickDemo();
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center', padding: '1rem 0' }}>
      {/* Altar Header with Nilavilakku Lamps */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.25rem' }}>
        <div className="temple-lamp">
          <span className="oil-lamp-flame">🪔</span>
        </div>

        {/* Celestial Mystic Orb */}
        <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto' }}>
          <div
            className="animate-spin-slow"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px dashed #d4af37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f3cf58',
                fontSize: '0.75rem',
                letterSpacing: '2px'
              }}
            >
              ✦ 🪐 ✦ ☀️
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3.8rem',
              animation: 'mystic-pulse 3s infinite ease-in-out'
            }}
          >
            🔮
          </div>
        </div>

        <div className="temple-lamp">
          <span className="oil-lamp-flame">🪔</span>
        </div>
      </div>

      {/* Retro 1990s Tagline Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '5px 14px',
        borderRadius: '20px',
        background: '#451010',
        border: '1px solid #a32222',
        color: '#ffc8c8',
        fontSize: '0.85rem',
        fontWeight: 800,
        marginBottom: '1rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.4)'
      }}>
        <span>🔥</span>
        <span>100% ശാസ്ത്രീയതയില്ലാത്ത AI ജ്യോതിഷശാല</span>
        <span>✨</span>
      </div>

      {/* Main Headline */}
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.4rem)',
        fontWeight: 900,
        color: '#f7d879',
        lineHeight: 1.2,
        marginBottom: '1rem',
        fontFamily: "'Manjari', sans-serif",
        textShadow: '0 3px 12px rgba(0,0,0,0.8)'
      }}>
        നിങ്ങളുടെ ഭാവി അറിയണോ?
      </h1>

      {/* Subtitles */}
      <p style={{
        fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
        color: '#fff5e0',
        fontWeight: 600,
        maxWidth: '650px',
        margin: '0 auto 0.75rem auto',
        lineHeight: 1.4
      }}>
        NASA പോലും അറിയാത്ത കാര്യങ്ങൾ ഞങ്ങൾ{' '}
        <span style={{ color: '#ffd54f', textDecoration: 'underline', textDecorationColor: '#c42424', fontWeight: 800 }}>
          5 സെക്കന്റിൽ
        </span>{' '}
        പറയും.
      </p>

      <div style={{
        background: 'rgba(56, 10, 10, 0.4)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: '10px',
        padding: '0.75rem 1.25rem',
        maxWidth: '580px',
        margin: '0 auto 1.5rem auto',
        color: '#eedebb',
        fontStyle: 'italic',
        fontSize: '0.95rem'
      }}>
        “ജനിച്ച തീയതിയും ഒരു ഫോട്ടോയും മാത്രം മതി. ബാക്കി ഞങ്ങൾ ഉണ്ടാക്കിക്കോളാം.” 😭
      </div>

      {/* Primary Action Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        <button
          type="button"
          onClick={handleStart}
          className="btn-vedic-red"
          style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
        >
          <span>🔮 എന്റെ ജീവിതം നശിപ്പിക്കൂ</span>
          <span>➔</span>
        </button>

        <button
          type="button"
          onClick={handleQuickDemo}
          className="btn-vedic-gold"
          style={{ fontSize: '1rem', padding: '1rem 1.6rem' }}
        >
          <span>⚡ സാമ്പിൾ ജാതകം കാണൂ</span>
        </button>
      </div>

      {/* Interactive Kavadi Board right on Landing Altar! */}
      <KavadiBoard soundEnabled={soundEnabled} />

      {/* Feature Highlights Grid */}
      <div className="grid-3" style={{ marginTop: '2rem', textAlign: 'left' }}>
        <div style={{
          background: 'rgba(28, 21, 16, 0.9)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '10px',
          padding: '1rem'
        }}>
          <div style={{ color: '#f3cf58', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>📸</span> മുഖലക്ഷണം & ചന്ദനം
          </div>
          <p style={{ color: '#c7b79e', fontSize: '0.82rem', lineHeight: 1.4 }}>
            ഫോട്ടോ സ്കാൻ ചെയ്ത് ഉറക്കക്കുറവും സങ്കടങ്ങളും അളക്കും. ലൈവ് ചന്ദനം തിലകവും ചാർത്തും.
          </p>
        </div>

        <div style={{
          background: 'rgba(28, 21, 16, 0.9)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '10px',
          padding: '1rem'
        }}>
          <div style={{ color: '#f3cf58', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>⚠️</span> പ്രധാന ദോഷങ്ങൾ
          </div>
          <p style={{ color: '#c7b79e', fontSize: '0.82rem', lineHeight: 1.4 }}>
            "നാളെ മുതൽ പഠിക്കാം ദോഷം", "5 മിനിറ്റ് റീൽസ് ദോഷം" ശാസ്ത്രീയമായി കണ്ടെത്തും.
          </p>
        </div>

        <div style={{
          background: 'rgba(28, 21, 16, 0.9)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '10px',
          padding: '1rem'
        }}>
          <div style={{ color: '#f3cf58', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>👴</span> സാവേജ് അമ്മാവൻ വോയ്സ്
          </div>
          <p style={{ color: '#c7b79e', fontSize: '0.82rem', lineHeight: 1.4 }}>
            "ആദ്യം ആ ഫോൺ താഴെ വെക്ക്" എന്ന WhatsApp വോയ്സ് നോട്ടും കുടുംബ ഉപദേശവും.
          </p>
        </div>
      </div>
    </div>
  );
}
