import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import Rasichakram from './Rasichakram';
import KavadiBoard from './KavadiBoard';
import { DOSHAMS, MEME_LEVELS, STAT_CATEGORIES, AMMAVAN_ROASTS, UPCOMING_EVENTS } from '../data/astrologyData';
import {
  playTempleBell,
  playDramaticStinger,
  playAmmavanVoiceBabble,
  playComedyLaugh,
  playBuzzer
} from '../utils/soundEffects';

export default function JathakamResult({ userData, onReset, soundEnabled }) {
  const [ammavanMode, setAmmavanMode] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Deterministic result data
  const [currentDosham] = useState(() => {
    return DOSHAMS[Math.floor(Math.random() * DOSHAMS.length)];
  });

  const [memeLevel] = useState(() => {
    return MEME_LEVELS[Math.floor(Math.random() * MEME_LEVELS.length)];
  });

  const [stats] = useState(() => {
    return STAT_CATEGORIES.map((cat) => ({
      ...cat,
      value: cat.getValue()
    }));
  });

  const [ammavanQuote, setAmmavanQuote] = useState(() => {
    return AMMAVAN_ROASTS[Math.floor(Math.random() * AMMAVAN_ROASTS.length)];
  });

  const [upcomingEvent, setUpcomingEvent] = useState(() => {
    return UPCOMING_EVENTS[Math.floor(Math.random() * UPCOMING_EVENTS.length)];
  });

  const cardRef = useRef(null);

  // Auto trigger celebratory audio on load
  useEffect(() => {
    if (soundEnabled) {
      playTempleBell();
    }
  }, [soundEnabled]);

  const toggleAmmavanMode = () => {
    const next = !ammavanMode;
    setAmmavanMode(next);
    if (next) {
      const nextQuote = AMMAVAN_ROASTS[Math.floor(Math.random() * AMMAVAN_ROASTS.length)];
      setAmmavanQuote(nextQuote);
      if (soundEnabled) {
        playAmmavanVoiceBabble();
      }
    }
  };

  const playVoiceNote = () => {
    setIsPlayingVoice(true);
    if (soundEnabled) {
      playAmmavanVoiceBabble();
    }
    setTimeout(() => {
      setIsPlayingVoice(false);
      if (soundEnabled) playComedyLaugh();
    }, 1800);
  };

  const rerollEvent = () => {
    const nextEv = UPCOMING_EVENTS[Math.floor(Math.random() * UPCOMING_EVENTS.length)];
    setUpcomingEvent(nextEv);
    if (soundEnabled) playTempleBell();
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      if (soundEnabled) playTempleBell();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2
      });

      const link = document.createElement('a');
      link.download = `Nalla-Kaalam-${userData.name.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image:', err);
      alert('സ്ക്രീൻഷോട്ട് എടുക്കാവുന്നതാണ്!');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    const shareText = `🔮 NALLA KAALAM™ - എന്റെ ജാതകം കിട്ടി!\n\n⚠️ പ്രധാന ദോഷം: ${currentDosham.title}\n🏆 നിലവാരം: ${memeLevel.title}\n\n"നിങ്ങളുടെ ഭാവി ഞങ്ങൾക്കും അറിയില്ല. പക്ഷേ നോക്കാം."\nനിങ്ങളുടെ ജാതകം കൂടി നോക്കൂ!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0.5rem 0' }}>
      
      {/* Top Interactive Controls Bar */}
      <div style={{
        background: 'rgba(25, 18, 14, 0.95)',
        border: '1px solid rgba(212, 175, 55, 0.4)',
        borderRadius: '12px',
        padding: '0.85rem 1.25rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.6rem' }}>📜</span>
          <div>
            <div style={{ color: '#f3cf58', fontWeight: 800, fontSize: '1rem' }}>
              ഔദ്യോഗിക ജാതക പത്രിക തയ്യാറായി!
            </div>
            <div style={{ color: '#c7b79e', fontSize: '0.75rem' }}>
              WhatsApp Status / Instagram Story പങ്കിടാൻ റെഡി.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={toggleAmmavanMode}
            style={{
              background: ammavanMode ? '#8b1818' : '#2b1c14',
              color: ammavanMode ? '#fff' : '#f3cf58',
              border: ammavanMode ? '2px solid #ffd54f' : '1px solid #7d592f',
              borderRadius: '8px',
              padding: '0.5rem 0.9rem',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>👴</span>
            <span>{ammavanMode ? 'അമ്മാവൻ മോഡ്: ഓൺ 🔥' : 'അമ്മാവനോട് ചോദിക്കൂ'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn-vedic-red"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            <span>📥</span>
            <span>{isDownloading ? 'സേവിംഗ്...' : 'ഡൗൺലോഡ് (PNG)'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="btn-vedic-gold"
            style={{ padding: '0.5rem 0.9rem', fontSize: '0.8rem' }}
          >
            <span>{copied ? '✅ കോപ്പി ചെയ്തു!' : '🔗 ഷെയർ ചെയ്യൂ'}</span>
          </button>
        </div>
      </div>

      {/* AMMAVAN SAVAGE WHATSAPP VOICE NOTE (If Active) */}
      {ammavanMode && (
        <div style={{
          background: 'linear-gradient(135deg, #0b1a10 0%, #06120a 100%)',
          border: '2px solid #25d366',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          color: '#fff',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem' }}>👴</span>
              <div>
                <span style={{ fontSize: '0.7rem', background: '#25d366', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 900 }}>
                  WHATSAPP AUDIO NOTE
                </span>
                <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: '#8de8a7', fontWeight: 700 }}>
                  കുടുംബത്തിലെ മൂത്ത അമ്മാവൻ
                </span>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#a0e4b5' }}>ഇന്ന് 2:45 PM</span>
          </div>

          {/* Interactive Voice Player */}
          <div className="ammavan-voice-note" style={{ margin: '0.5rem 0' }}>
            <button
              type="button"
              onClick={playVoiceNote}
              className="voice-note-play-btn"
              title="വോയ്സ് നോട്ട് കേൾക്കൂ"
            >
              {isPlayingVoice ? '⏸️' : '▶️'}
            </button>

            <div className="voice-note-waves">
              {[8, 14, 20, 10, 16, 22, 12, 18, 24, 14, 20, 16, 12, 18, 22, 15, 10, 6].map((h, i) => (
                <div
                  key={i}
                  className={`wave-bar ${isPlayingVoice ? 'active' : ''}`}
                  style={{
                    height: `${h}px`,
                    animationDelay: `${i * 0.05}s`
                  }}
                ></div>
              ))}
            </div>

            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#8de8a7' }}>
              {isPlayingVoice ? '0:03 / 0:03' : '0:00 / 0:03'}
            </span>
          </div>

          <div style={{
            background: 'rgba(37, 211, 102, 0.1)',
            borderLeft: '4px solid #25d366',
            borderRadius: '4px',
            padding: '0.6rem 0.8rem',
            marginTop: '0.5rem',
            fontSize: '0.95rem',
            fontStyle: 'italic',
            color: '#e6ffed',
            lineHeight: 1.4
          }}>
            "{ammavanQuote}"
          </div>
        </div>
      )}

      {/* THE MASTER JATHAKAM CERTIFICATE (Exportable Target) */}
      <div
        ref={cardRef}
        className="parchment-sheet"
        style={{
          color: '#1a120b',
          position: 'relative',
          border: '4px double #8b1818',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
        }}
      >
        {/* Giant Watermark */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(5rem, 15vw, 12rem)',
          fontWeight: 900,
          color: 'rgba(139, 24, 24, 0.04)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          നല്ല കാലം
        </div>

        {/* Certificate Header with Rubber Stamps */}
        <div className="astro-header-border">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#8b1818', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              ✦ ഭാരതീയ ഹാസ്യ ജ്യോതിഷ കാര്യാലയം ✦
            </span>
            <div className="rubber-stamp huge">
              USELESS 100%
            </div>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 900,
            color: '#4a1212',
            letterSpacing: '1px',
            margin: '0.25rem 0',
            fontFamily: "'Cinzel', serif"
          }}>
            NALLA KAALAM™
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#6e4726', fontStyle: 'italic', fontWeight: 700 }}>
            “നിങ്ങളുടെ ഭാവി ഞങ്ങൾക്കും അറിയില്ല. പക്ഷേ നോക്കാം.”
          </p>

          <div style={{ fontSize: '0.7rem', color: '#8b1818', fontFamily: 'monospace', marginTop: '0.4rem' }}>
            രജിസ്ട്രേഷൻ: NK-TINKERHUB-2026-404 | പരിശോധന തീയതി: {new Date().toLocaleDateString('ml-IN')}
          </div>
        </div>

        {/* User Dossier (Photo with Chandanam + Bio) */}
        <div style={{
          background: 'rgba(238, 222, 187, 0.8)',
          border: '2px solid rgba(139, 24, 24, 0.25)',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          gap: '1.25rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Photo Frame */}
          <div style={{ textAlign: 'center', margin: '0 auto' }}>
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '3px solid #8b1818',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              position: 'relative'
            }}>
              <img
                src={userData.photo}
                alt={userData.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(74, 18, 18, 0.85)',
                color: '#fff',
                fontSize: '0.55rem',
                fontWeight: 700,
                padding: '2px 0'
              }}>
                AI സ്കാൻ ചെയ്ത മുഖം
              </div>
            </div>
          </div>

          {/* Dossier Text */}
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #c9b48c', paddingBottom: '0.4rem', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#6e4726', fontWeight: 700 }}>ജാതകൻ: </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#4a1212' }}>{userData.name}</span>
              </div>
              <div className="rubber-stamp green" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                ഗതികെട്ട ജാതകം VERIFIED
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.4rem', fontSize: '0.75rem' }}>
              <div>
                <span style={{ color: '#7a3e1d', fontWeight: 700 }}>ജനന തീയതി:</span>{' '}
                <span style={{ color: '#1a120b', fontWeight: 800, fontFamily: 'monospace' }}>{userData.dob}</span>
              </div>
              <div>
                <span style={{ color: '#7a3e1d', fontWeight: 700 }}>സമയം:</span>{' '}
                <span style={{ color: '#1a120b', fontWeight: 800 }}>{userData.birthTime}</span>
              </div>
              <div>
                <span style={{ color: '#7a3e1d', fontWeight: 700 }}>സ്ഥലം:</span>{' '}
                <span style={{ color: '#1a120b', fontWeight: 800 }}>{userData.birthPlace}</span>
              </div>
            </div>

            <div style={{
              background: '#fdfaf2',
              border: '1px solid #c9b48c',
              borderRadius: '6px',
              padding: '0.4rem 0.6rem',
              marginTop: '0.5rem',
              fontSize: '0.75rem'
            }}>
              <span style={{ color: '#8b1818', fontWeight: 800 }}>🤨 മുഖലക്ഷണ വിധി: </span>
              <span style={{ color: '#1a120b', fontStyle: 'italic' }}>"{userData.scanResult}"</span>
            </div>
          </div>
        </div>

        {/* Rasichakram and Meme Level Grid */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <Rasichakram activeSign="ചിങ്ങം" />
          </div>

          <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Meme Level Card */}
            <div style={{
              background: 'rgba(238, 222, 187, 0.8)',
              border: '2px solid rgba(139, 24, 24, 0.3)',
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6e4726', letterSpacing: '1px', textTransform: 'uppercase' }}>
                ✦ നിങ്ങളുടെ ജാതക നിലവാരം ✦
              </span>
              <div style={{
                display: 'inline-block',
                background: '#4a1212',
                color: '#f3cf58',
                padding: '3px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 900,
                margin: '0.4rem 0'
              }}>
                {memeLevel.badge}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#4a1212', marginBottom: '0.25rem' }}>
                "{memeLevel.title}"
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#453222', lineHeight: 1.3 }}>
                {memeLevel.sub}
              </p>
            </div>

            {/* Special Relatable Dosham Card */}
            <div style={{
              background: '#4a1212',
              color: '#fff',
              border: '2px solid #d4af37',
              borderRadius: '10px',
              padding: '1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1.1rem' }}>⚠️</span>
                <span style={{ color: '#ffd54f', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  പ്രധാന ദോഷം (KUNDALI DEFECT)
                </span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff', marginBottom: '0.35rem' }}>
                {currentDosham.title}
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#ffebc4', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                {currentDosham.desc}
              </p>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #7d2020',
                borderRadius: '6px',
                padding: '0.4rem 0.6rem',
                fontSize: '0.75rem',
                color: '#ffe082'
              }}>
                {currentDosham.pariharam}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Statistics with Roasts */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 900,
            color: '#4a1212',
            borderBottom: '2px solid rgba(139, 24, 24, 0.3)',
            paddingBottom: '0.35rem',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span>📊</span>
            <span>നവഗ്രഹ ഗുണദോഷ വിശകലനം (The 6 Pillars of Fate)</span>
          </h3>

          <div className="grid-2">
            {stats.map((item, idx) => (
              <div key={idx} className="stat-bar-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 800, color: '#4a1212' }}>{item.label}</span>
                  <span style={{ fontWeight: 900, color: '#8b1818', fontFamily: 'monospace', background: '#ffecc4', padding: '1px 6px', borderRadius: '4px' }}>
                    {item.value}%
                  </span>
                </div>

                <div className="stat-bar-track">
                  <div className="stat-bar-fill" style={{ width: `${item.value}%` }}></div>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#2a1a0d', fontStyle: 'italic', lineHeight: 1.3 }}>
                  "{item.roast}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Fate Predictor (Interactive Re-roll) */}
        <div style={{
          background: 'rgba(238, 222, 187, 0.8)',
          border: '2px solid rgba(139, 24, 24, 0.25)',
          borderRadius: '10px',
          padding: '0.85rem 1.1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '1.6rem' }}>🔮</span>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#8b1818', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                അടുത്ത 7 ദിവസത്തെ രഹസ്യ പ്രവചനം:
              </span>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4a1212', fontStyle: 'italic' }}>
                "{upcomingEvent}"
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={rerollEvent}
            className="btn-vedic-gold"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}
          >
            <span>🔄 വിധി മാറ്റൂ</span>
          </button>
        </div>

        {/* Final Official Verdict */}
        <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '2px dashed rgba(139, 24, 24, 0.3)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6e4726', textTransform: 'uppercase', letterSpacing: '1px' }}>
            🔮 അന്തിമ വിധി
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#4a1212', margin: '0.25rem 0' }}>
            “ജീവിതം മോശമല്ല... പക്ഷേ potential ഉണ്ട്.”
          </h2>
          <p style={{ fontSize: '0.78rem', color: '#7a3e1d', fontStyle: 'italic' }}>
            (എല്ലാം നിങ്ങളുടെ കൈയിലാണ്... പക്ഷേ ആ ഫോൺ ആദ്യം താഴെ വെക്കൂ!)
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            fontSize: '0.7rem',
            color: '#7a3e1d',
            marginTop: '0.75rem',
            fontFamily: 'monospace',
            flexWrap: 'wrap'
          }}>
            <span>ജ്യോതിഷി: എ.ഐ തിരുമേനി</span>
            <span>•</span>
            <span>തപോവനം: TinkerHub ശാഖ</span>
            <span>•</span>
            <span>ഫീസ്: ₹0.00 (ഫ്രീ)</span>
          </div>
        </div>
      </div>

      {/* Interactive Kavadi Board Inside Result for Quick Play */}
      <div style={{ marginTop: '1.5rem' }}>
        <KavadiBoard soundEnabled={soundEnabled} />
      </div>

      {/* Bottom Floating Navigation CTA */}
      <div style={{
        marginTop: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          type="button"
          onClick={onReset}
          className="btn-vedic-gold"
          style={{ fontSize: '0.95rem', padding: '0.85rem 1.6rem' }}
        >
          <span>🔄 എന്റെ ജാതകം വീണ്ടും നോക്കൂ</span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="btn-vedic-red"
          style={{ fontSize: '1.05rem', padding: '0.85rem 2rem' }}
        >
          <span>📥 ഇമേജ് ആയി ഡൗൺലോഡ് ചെയ്യൂ</span>
        </button>
      </div>
    </div>
  );
}
