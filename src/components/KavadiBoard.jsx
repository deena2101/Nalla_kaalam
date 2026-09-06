import React, { useState } from 'react';
import { playKavadiRoll, playDramaticStinger } from '../utils/soundEffects';

const KAVADI_FATES = [
  { up: 4, down: 2, title: "4 എണ്ണം മലർന്നു!", result: "അടുത്ത ആഴ്ച കടം വരാൻ കടുത്ത സാധ്യത. സൂക്ഷിക്കുക." },
  { up: 6, down: 0, title: "6 എണ്ണം മലർന്നു!", result: "ഭാഗ്യത്തിന്റെ രാജയോഗം! പക്ഷേ ഇന്ന് വൈകിട്ട് ബിരിയാണി വാങ്ങാൻ കാശില്ല." },
  { up: 1, down: 5, title: "1 എണ്ണം മാത്രം മലർന്നു!", result: "ഭീകരമായ മടി യോഗം. നാളെയും കട്ടിലിൽ കിടന്ന് റീൽസ് കാണും." },
  { up: 3, down: 3, title: "3 സമം!", result: "ജീവിതം എങ്ങനെ പോകുന്നു എന്ന് നിങ്ങൾക്കും അറിയില്ല, ദൈവത്തിനും അറിയില്ല." },
  { up: 0, down: 6, title: "എല്ലാം കമിഴ്ന്നു വീണു!", result: "അതിഗുരുതരം! ജ്യോതിഷി പോലും കവടി വാരി ഭാണ്ഡത്തിൽ വെച്ചു." },
];

export default function KavadiBoard({ soundEnabled }) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentFate, setCurrentFate] = useState(KAVADI_FATES[0]);
  const [rollsCount, setRollsCount] = useState(0);

  const rollKavadi = () => {
    if (isRolling) return;
    setIsRolling(true);
    if (soundEnabled) playKavadiRoll();

    setTimeout(() => {
      const randomFate = KAVADI_FATES[Math.floor(Math.random() * KAVADI_FATES.length)];
      setCurrentFate(randomFate);
      setIsRolling(false);
      setRollsCount((c) => c + 1);
      if (soundEnabled && randomFate.up === 0) {
        playDramaticStinger();
      }
    }, 700);
  };

  return (
    <div className="kavadi-board">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ color: '#f3cf58', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          🐚 തത്സമയ കവടി നിരത്തൽ (Live Kavadi Roll)
        </span>
        <span style={{ fontSize: '0.75rem', color: '#ffc4c4', background: '#541111', padding: '2px 8px', borderRadius: '4px' }}>
          റോളുകൾ: {rollsCount}
        </span>
      </div>

      <div className="kavadi-tray">
        {[...Array(6)].map((_, idx) => {
          const isUp = idx < currentFate.up;
          return (
            <div
              key={idx}
              onClick={rollKavadi}
              className={`kavadi-shell ${isRolling ? 'rolling' : ''}`}
              title={isUp ? 'കവടി മലർന്നു' : 'കവടി കമിഴ്ന്നു'}
              style={{
                background: isUp
                  ? 'radial-gradient(circle at 35% 35%, #fffdf7 0%, #e6d8ba 60%, #a8946e 100%)'
                  : 'radial-gradient(circle at 35% 35%, #7a6341 0%, #4a3821 70%, #2b1f11 100%)',
                color: isUp ? '#3a2712' : '#f0d9b5'
              }}
            >
              {isUp ? '🐚' : '🌑'}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '0.5rem', minHeight: '44px' }}>
        <div style={{ color: '#ffecb3', fontWeight: 800, fontSize: '0.95rem' }}>
          {currentFate.title}
        </div>
        <p style={{ color: '#eedebb', fontSize: '0.85rem', fontStyle: 'italic', margin: '2px 0 8px 0' }}>
          "{currentFate.result}"
        </p>
      </div>

      <button
        type="button"
        onClick={rollKavadi}
        disabled={isRolling}
        className="btn-vedic-gold"
        style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
      >
        <span>🐚 കവടി കുലുക്കി എറിയൂ!</span>
      </button>
    </div>
  );
}
