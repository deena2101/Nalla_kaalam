import React from 'react';
import { RASI_MEMES } from '../data/astrologyData';

export default function Rasichakram({ activeSign = "ചിങ്ങം" }) {
  // Traditional Kerala 4x4 Perimeter Houses:
  // Row 1: [11: Meenam] [0: Medam] [1: Idavam] [2: Mithunam]
  // Row 2: [10: Kumbham] [  CENTER HUB  ] [3: Karkadakam]
  // Row 3: [9: Makaram]  [  CENTER HUB  ] [4: Chingam]
  // Row 4: [8: Dhanu]   [7: Vrishchikam] [6: Thulam] [5: Kanni]
  const layout = [
    { ...RASI_MEMES[11], row: 1, col: 1 },
    { ...RASI_MEMES[0],  row: 1, col: 2 },
    { ...RASI_MEMES[1],  row: 1, col: 3 },
    { ...RASI_MEMES[2],  row: 1, col: 4 },

    { ...RASI_MEMES[10], row: 2, col: 1 },
    { ...RASI_MEMES[3],  row: 2, col: 4 },

    { ...RASI_MEMES[9],  row: 3, col: 1 },
    { ...RASI_MEMES[4],  row: 3, col: 4 },

    { ...RASI_MEMES[8],  row: 4, col: 1 },
    { ...RASI_MEMES[7],  row: 4, col: 2 },
    { ...RASI_MEMES[6],  row: 4, col: 3 },
    { ...RASI_MEMES[5],  row: 4, col: 4 },
  ];

  return (
    <div style={{ maxWidth: '340px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '0.4rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b1818', letterSpacing: '1px', textTransform: 'uppercase' }}>
          ✦ കേരളീയ മീം രാശിച്ചക്രം ✦
        </span>
      </div>

      <div className="kerala-rasi-grid">
        {layout.map((item, idx) => {
          const isTarget = item.name === activeSign;
          return (
            <div
              key={idx}
              className="rasi-cell"
              style={{
                gridRow: item.row,
                gridColumn: item.col,
                background: isTarget ? '#ffebc4' : '#fdfaf0',
                border: isTarget ? '2px solid #8b1818' : 'none'
              }}
            >
              <div style={{ fontSize: '1.2rem', lineHeight: 1 }}>{item.icon}</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#4a1212', whiteSpace: 'nowrap' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '0.55rem', color: '#7a3e1d', fontWeight: 600, whiteSpace: 'nowrap' }}>
                {item.label}
              </div>
            </div>
          );
        })}

        {/* 2x2 Center Hub */}
        <div className="rasi-cell-center">
          <div style={{ fontSize: '1.2rem' }}>🪬</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#4a1212', letterSpacing: '0.5px' }}>
            NALLA KAALAM
          </div>
          <div style={{ fontSize: '0.6rem', color: '#8b1818', fontWeight: 700 }}>
            ജാതക കളം
          </div>
          <div style={{ fontSize: '0.55rem', color: '#c42424', fontStyle: 'italic' }}>
            (ദോഷബാധിതം)
          </div>
        </div>
      </div>
    </div>
  );
}
