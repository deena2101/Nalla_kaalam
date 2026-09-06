import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '2px solid rgba(212, 175, 55, 0.25)',
      background: '#0d0a07',
      color: '#c7b79e',
      padding: '2rem 1rem',
      textAlign: 'center',
      fontSize: '0.8rem',
      marginTop: '3rem'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <div style={{ color: '#f3cf58', fontWeight: 900, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span>🔮</span>
          <span>NALLA KAALAM™ (നല്ല കാലം)</span>
          <span>•</span>
          <span>TinkerHub Useless Project Edition</span>
        </div>

        <p style={{ color: '#a8947b', fontSize: '0.75rem', lineHeight: 1.4 }}>
          <strong>നിയമപരമായ മുന്നറിയിപ്പ്:</strong> ഈ വെബ്‌സൈറ്റിലെ പ്രവചനങ്ങൾ കാരണം ആർക്കെങ്കിലും ജോലി കിട്ടുകയോ, പണം വരികയോ, ജീവിതം നന്നാകുകയോ ചെയ്താൽ അതിൽ ഡെവലപ്പർമാർക്ക് യാതൊരു ഉത്തരവാദിത്തവും ഉണ്ടായിരിക്കുന്നതല്ല.
        </p>

        <div style={{ fontSize: '0.7rem', color: '#7a6854', borderTop: '1px solid #2b1f14', paddingTop: '0.5rem', fontFamily: 'monospace' }}>
          Developed with zero practical value, maximum entertainment & Kerala Meme energy © 2026
        </div>
      </div>
    </footer>
  );
}
