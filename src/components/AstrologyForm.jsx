import React, { useState, useRef, useEffect } from 'react';
import { PHOTO_SCAN_ROASTS } from '../data/astrologyData';
import { playKavadiRoll, playTempleBell, playComedyLaugh } from '../utils/soundEffects';

const SAMPLE_AVATARS = [
  {
    name: "എഞ്ചിനീയറിംഗ് വിദ്യാർത്ഥി",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    desc: "3 ദിവസമായി ഉറങ്ങിയിട്ടില്ല"
  },
  {
    name: "റീൽസ് അഡിക്റ്റ്",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    desc: "കണ്ണിൽ മുഴുവൻ സ്ക്രീൻ ഗ്ലെയർ"
  },
  {
    name: "ടെൻഷൻ മാസ്റ്റർ",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    desc: "ജീവിതത്തെക്കുറിച്ച് ചിന്തിക്കുന്നു"
  }
];

export default function AstrologyForm({ onSubmit, soundEnabled }) {
  const [photo, setPhoto] = useState(SAMPLE_AVATARS[0].url);
  const [photoName, setPhotoName] = useState(SAMPLE_AVATARS[0].name);
  const [isScanning, setIsScanning] = useState(false);
  const [hasChandan, setHasChandan] = useState(false);
  const [scanResult, setScanResult] = useState(PHOTO_SCAN_ROASTS[0].diagnosis);
  const [name, setName] = useState("നിഷ്കളങ്കനായ വ്യക്തി");
  const [dob, setDob] = useState("2003-05-18");
  const [birthTime, setBirthTime] = useState("ഉച്ചഭക്ഷണത്തിന് ശേഷം (മടി സമയം)");
  const [birthPlace, setBirthPlace] = useState("കോഴിക്കോട് (ബിരിയാണി നാട്)");

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Render photo onto canvas with optional Chandanam/Thilakam decoration
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = photo;

    img.onload = () => {
      canvas.width = 320;
      canvas.height = 320;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (hasChandan) {
        // Draw Kerala Sandalwood / Vibhuti (ചന്ദനക്കുറി)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(110, 85, 100, 6);
        ctx.fillRect(115, 96, 90, 6);
        ctx.fillRect(120, 107, 80, 6);

        // Red Kumkum Thilakam in Center
        ctx.beginPath();
        ctx.arc(160, 96, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#c42424';
        ctx.fill();
        ctx.strokeStyle = '#f3cf58';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Astrologer Tilak Label
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#ffecb3';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 4;
        ctx.fillText('✨ ജ്യോതിഷ തിലകം', 10, 25);
      }
    };
  }, [photo, hasChandan]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      triggerPhotoScan(url, file.name);
    }
  };

  const triggerPhotoScan = (url, label = "നിങ്ങളുടെ ഫോട്ടോ") => {
    setPhoto(url);
    setPhotoName(label);
    setIsScanning(true);
    if (soundEnabled) playKavadiRoll();

    const randomScan = PHOTO_SCAN_ROASTS[Math.floor(Math.random() * PHOTO_SCAN_ROASTS.length)];
    setTimeout(() => {
      setScanResult(randomScan.diagnosis);
      setIsScanning(false);
      if (soundEnabled) playComedyLaugh();
    }, 1200);
  };

  const toggleChandan = () => {
    setHasChandan(!hasChandan);
    if (soundEnabled) playTempleBell();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (soundEnabled) playTempleBell();

    let finalPhotoUrl = photo;
    if (canvasRef.current) {
      try {
        finalPhotoUrl = canvasRef.current.toDataURL('image/jpeg', 0.85);
      } catch (err) {
        finalPhotoUrl = photo;
      }
    }

    onSubmit({
      photo: finalPhotoUrl,
      photoName,
      hasChandan,
      scanResult,
      dob,
      birthTime,
      birthPlace,
      name: name.trim() || "നിഷ്കളങ്കനായ വ്യക്തി"
    });
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0.5rem 0' }}>
      <div className="parchment-sheet">
        {/* Certificate Header */}
        <div className="astro-header-border">
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b1818', letterSpacing: '2px', textTransform: 'uppercase' }}>
            ✦ ശ്രീ നവഗ്രഹ ഹാസ്യ ജ്യോതിഷ കാര്യാലയം ✦
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#4a1212', margin: '0.35rem 0' }}>
            ആദ്യം നിങ്ങളുടെ വിവരങ്ങൾ തരൂ...
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#453222', maxWidth: '580px', margin: '0 auto' }}>
            മുഖം കണ്ടാൽ തന്നെ ചില കാര്യങ്ങൾ മനസ്സിലാകും. DOB കൊടുത്താൽ ബാക്കി ഞങ്ങൾ കെട്ടിച്ചമയ്ക്കാം.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Photo Upload with Live Chandan & Laser */}
          <div style={{
            background: 'rgba(235, 220, 190, 0.75)',
            border: '2px solid rgba(139, 24, 24, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontWeight: 800, color: '#4a1212', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📸</span>
                <span>1. മുഖലക്ഷണം (ഫോട്ടോ കാണട്ടെ)</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#7a3e1d', fontStyle: 'italic' }}>
                ഗാലറിയിൽ നിന്നോ സാമ്പിളോ ഉപയോഗിക്കാം
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              {/* Photo Canvas with Laser Sweeper */}
              <div style={{ textAlign: 'center' }}>
                <div className="camera-scanner-wrapper">
                  <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {isScanning && (
                    <div className="scanner-laser-bar"></div>
                  )}

                  {/* Target Crosshairs */}
                  <div style={{ position: 'absolute', top: 8, left: 8, width: 14, height: 14, borderTop: '2px solid #f3cf58', borderLeft: '2px solid #f3cf58' }}></div>
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 14, height: 14, borderTop: '2px solid #f3cf58', borderRight: '2px solid #f3cf58' }}></div>
                  <div style={{ position: 'absolute', bottom: 8, left: 8, width: 14, height: 14, borderBottom: '2px solid #f3cf58', borderLeft: '2px solid #f3cf58' }}></div>
                  <div style={{ position: 'absolute', bottom: 8, right: 8, width: 14, height: 14, borderBottom: '2px solid #f3cf58', borderRight: '2px solid #f3cf58' }}></div>

                  {isScanning && (
                    <div style={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      right: 8,
                      background: 'rgba(0,0,0,0.8)',
                      color: '#f3cf58',
                      fontSize: '0.75rem',
                      padding: '4px',
                      borderRadius: '4px',
                      fontWeight: 700
                    }}>
                      സ്കാൻ ചെയ്യുന്നു...
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={toggleChandan}
                    className="btn-vedic-gold"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    <span>{hasChandan ? '❌ ചന്ദനം മാറ്റൂ' : '✨ ചന്ദനക്കുറി വരയ്ക്കൂ'}</span>
                  </button>
                </div>
              </div>

              {/* Photo Options and Presets */}
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-vedic-red"
                    style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', flex: 1 }}
                  >
                    <span>📤 സ്വന്തം ഫോട്ടോ ഇടുക</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4a1212', display: 'block', marginBottom: '0.35rem' }}>
                    അല്ലെങ്കിൽ സാമ്പിൾ മുഖം തിരഞ്ഞെടുക്കാം:
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                    {SAMPLE_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => triggerPhotoScan(av.url, av.name)}
                        style={{
                          background: photo === av.url ? '#ffecc2' : '#f7eed8',
                          border: photo === av.url ? '2px solid #8b1818' : '1px solid #c9b48c',
                          borderRadius: '6px',
                          padding: '6px 4px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ display: 'block', fontWeight: 800, fontSize: '0.75rem', color: '#4a1212' }}>
                          {av.name.split(' ')[0]}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: '#7a3e1d', display: 'block' }}>
                          {av.desc.slice(0, 15)}...
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Diagnostic Speech Bubble */}
                <div style={{
                  background: '#fdfaf2',
                  border: '1px solid #c9b48c',
                  borderLeft: '4px solid #8b1818',
                  borderRadius: '6px',
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.82rem'
                }}>
                  <div style={{ fontWeight: 800, color: '#8b1818', marginBottom: '2px' }}>
                    🤨 AI മുഖലക്ഷണ പരിശോധന:
                  </div>
                  <div style={{ color: '#2a1a0d', fontStyle: 'italic' }}>
                    "{scanResult}"
                  </div>
                </div>
              </div>
            </div>

            {/* Satirical Legal Disclaimer */}
            <div style={{
              marginTop: '0.75rem',
              paddingTop: '0.5rem',
              borderTop: '1px dashed rgba(139, 24, 24, 0.2)',
              fontSize: '0.72rem',
              color: '#6e4726',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span>⚠️</span>
              <span>
                <strong>നിയമപരമായ തമാശ അറിയിപ്പ്:</strong> ഈ ഫോട്ടോ ശാസ്ത്രീയമായി ഒന്നും പറയുന്നില്ല. ഞങ്ങൾ തികച്ചും വെറുതെ പറയുകയാണ്!
              </span>
            </div>
          </div>

          {/* Section 2: Personal Details & DOB */}
          <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
            <div>
              <label className="nk-label">
                പേര് (ആളുകൾ വിളിക്കുന്ന പേര്)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ഉദാഹരണത്തിന്: രാഹുൽ / അഞ്ജലി"
                className="nk-input"
              />
            </div>

            <div>
              <label className="nk-label">
                ജനിച്ച് ലോകത്തിന് ബുദ്ധിമുട്ട് തുടങ്ങിയ ദിവസം (DOB)
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="nk-input"
                style={{ fontFamily: 'monospace' }}
              />
            </div>

            <div>
              <label className="nk-label">
                ജനിച്ച സമയം (ഏകദേശ കണക്ക്)
              </label>
              <select
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="nk-input"
              >
                <option value="ഉച്ചഭക്ഷണത്തിന് ശേഷം (മടി സമയം)">ഉച്ചഭക്ഷണത്തിന് ശേഷം (മടി സമയം)</option>
                <option value="രാത്രി 2:30 (ഓവർതിങ്കിംഗ് സമയം)">രാത്രി 2:30 (ഓവർതിങ്കിംഗ് സമയം)</option>
                <option value="രാവിലെ 10 മണി (ക്ലാസ് കട്ട് ചെയ്ത സമയം)">രാവിലെ 10 മണി (ക്ലാസ് കട്ട് ചെയ്ത സമയം)</option>
                <option value="വൈകുന്നേരം ചായ കുടിക്കുന്ന സമയം">വൈകുന്നേരം ചായ കുടിക്കുന്ന സമയം</option>
              </select>
            </div>

            <div>
              <label className="nk-label">
                ജനിച്ച സ്ഥലം (ചിലവ് കുറഞ്ഞ സ്ഥലം)
              </label>
              <select
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="nk-input"
              >
                <option value="കോഴിക്കോട് (ബിരിയാണി നാട്)">കോഴിക്കോട് (ബിരിയാണി നാട്)</option>
                <option value="കൊച്ചി (മെട്രോ + ട്രാഫിക്)">കൊച്ചി (മെട്രോ + ട്രാഫിക്)</option>
                <option value="കട്ടപ്പന (തണുപ്പ് + കാപ്പി)">കട്ടപ്പന (തണുപ്പ് + കാപ്പി)</option>
                <option value="ബാംഗ്ലൂർ (ഐടി ദുരിതം)">ബാംഗ്ലൂർ (ഐടി ദുരിതം)</option>
                <option value="തിരുവനന്തപുരം (സെക്രട്ടേറിയറ്റ് പടിക്കൽ)">തിരുവനന്തപുരം (സെക്രട്ടേറിയറ്റ് പടിക്കൽ)</option>
              </select>
            </div>
          </div>

          {/* Big Action CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              type="submit"
              className="btn-vedic-red"
              style={{ width: '100%', fontSize: '1.3rem', padding: '1.1rem', borderRadius: '12px' }}
            >
              <span>🔮 ജാതകം നോക്കാം</span>
              <span style={{ fontSize: '0.75rem', background: '#f3cf58', color: '#4a1212', padding: '3px 8px', borderRadius: '4px', fontWeight: 900 }}>
                (NOT SUBMIT)
              </span>
            </button>
            <div style={{ fontSize: '0.75rem', color: '#6e4726', fontStyle: 'italic', marginTop: '0.5rem' }}>
              *ക്ലിക്ക് ചെയ്താൽ പിന്നീട് പശ്ചാത്തപിക്കാൻ പാടില്ല.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
