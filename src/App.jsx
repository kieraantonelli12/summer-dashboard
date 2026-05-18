import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Plus, Sparkles, GraduationCap, Box, Palette, BookOpen, Briefcase, DollarSign, Music, ExternalLink, Calendar as CalendarIcon, X, Trash2 } from 'lucide-react';

// ─── EDIT THESE TO MATCH YOUR LIFE ─────────────────────────────────────
const GRADUATION_DATE = '2026-06-13';
const SUMMER_END_DATE = '2026-08-31';
// ───────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'summer-dashboard-buckets-v1';

const APPS = [
  { name: 'Canvas',    url: 'https://canvas.instructure.com',   domain: 'instructure.com',     color: '#E72429' },
  { name: 'Outlook',   url: 'https://outlook.office.com/mail',  domain: 'outlook.office.com',  color: '#0078D4' },
  { name: 'Gmail',     url: 'https://mail.google.com',          domain: 'mail.google.com',     color: '#EA4335' },
  { name: 'Calendar',  url: 'https://calendar.google.com',      domain: 'calendar.google.com', color: '#1A73E8' },
  { name: 'Teams',     url: 'https://teams.microsoft.com',      domain: 'teams.microsoft.com', color: '#4B53BC' },
  { name: 'Claude',    url: 'https://claude.ai',                domain: 'claude.ai',           color: '#D97757' },
  { name: 'ChatGPT',   url: 'https://chat.openai.com',          domain: 'chat.openai.com',     color: '#10A37F' },
  { name: 'Spotify',   url: 'https://open.spotify.com',         domain: 'spotify.com',         color: '#1DB954' },
  { name: 'LinkedIn',  url: 'https://linkedin.com/feed',        domain: 'linkedin.com',        color: '#0A66C2' },
  { name: 'Instagram', url: 'https://instagram.com',            domain: 'instagram.com',       color: '#E4405F' },
  { name: 'Pinterest', url: 'https://pinterest.com',            domain: 'pinterest.com',       color: '#E60023' },
];

const GREETINGS = [
  "hey, you got this.",
  "small steps, big season.",
  "soft hustle, real growth.",
  "you're doing the work.",
  "rooted and rising.",
  "one beautiful summer.",
  "you're never wrong to do the right thing.",
];

const MY_PHOTOS = {
  slot1: 'https://raw.githubusercontent.com/kieraantonelli12/summer-dashboard/main/photo3.jpeg',
  slot2: 'https://raw.githubusercontent.com/kieraantonelli12/summer-dashboard/main/photo1.jpeg',
  slot3: 'https://raw.githubusercontent.com/kieraantonelli12/summer-dashboard/main/photo2.jpeg',
  slot4: 'https://raw.githubusercontent.com/kieraantonelli12/summer-dashboard/main/photo4.jpeg',
};

// ─── MEDITERRANEAN GRADIENT PALETTE ────────────────────────────────────
// Each bucket: gradient (for the card bg) + deep (for accents & text)
const MED_PALETTE = {
  graduation: { gradient: 'linear-gradient(135deg, #E85C3F 0%, #F2B544 100%)', deep: '#9C2E1A', soft: '#FCE4D6' },
  moveout:    { gradient: 'linear-gradient(135deg, #2E5C5C 0%, #5C8B8B 100%)', deep: '#1A3838', soft: '#D6E8E8' },
  room:       { gradient: 'linear-gradient(135deg, #8B6F47 0%, #B89B6A 100%)', deep: '#4A3A20', soft: '#E8DCC4' },
  classes:    { gradient: 'linear-gradient(135deg, #F2B544 0%, #FFD683 100%)', deep: '#7A4F0A', soft: '#FCE9C4' },
  career:     { gradient: 'linear-gradient(135deg, #5C8B8B 0%, #8FB5B5 100%)', deep: '#274545', soft: '#D9EAEA' },
  income:     { gradient: 'linear-gradient(135deg, #A6925A 0%, #C9B47E 100%)', deep: '#4A3D1F', soft: '#E8DDC0' },
  activities: { gradient: 'linear-gradient(135deg, #C84C2E 0%, #E85C3F 100%)', deep: '#7A1E08', soft: '#FAD7CB' },
};
// ───────────────────────────────────────────────────────────────────────

const STYLES = `
  .font-display { font-family: 'Bricolage Grotesque', system-ui, sans-serif; letter-spacing: -0.025em; }
  .font-editorial { font-family: 'Instrument Serif', Georgia, serif; letter-spacing: -0.01em; }
  .font-body { font-family: 'Inter', system-ui, sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .fade-in { animation: fadeIn 0.2s ease both; }
  .scale-in { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) both; }

  .grid-tile {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    will-change: transform;
  }
  .grid-tile:hover { transform: translateY(-3px); box-shadow: 0 12px 30px -10px rgba(120, 60, 30, 0.25); }
  .grid-tile:active { transform: translateY(-1px); }
  .film { filter: saturate(0.96) contrast(1.02); }
  .pill-btn { transition: all 0.2s ease; }
  .pill-btn:hover { transform: scale(1.02); }

  .app-tile { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .app-tile:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 8px 20px -8px rgba(120, 60, 30, 0.2); }
  .app-tile:active { transform: translateY(-1px) scale(1.02); }

  .icon-btn { transition: all 0.18s ease; opacity: 0.5; }
  .icon-btn:hover { opacity: 1; transform: scale(1.12); }
  .delete-btn:hover { color: #C84C2E !important; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: rgba(120,80,40,0.2); border-radius: 99px; }

  @media (max-width: 720px) {
    .bento-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      grid-auto-rows: 130px !important;
    }
    .bento-grid > * { grid-column: span 2 !important; grid-row: span 1 !important; }
    .hero-headline { font-size: 44px !important; }
    .kanban-grid { grid-template-columns: 1fr !important; }
  }
`;

const DEFAULT_BUCKETS = [
  {
    id: 'graduation', title: 'Graduation', iconName: 'GraduationCap',
    paletteKey: 'graduation', note: '1 class needs love',
    tasks: [
      { id: 1, text: 'Meet financial planning prof for extra credit', done: false, col: 'doing' },
      { id: 2, text: 'Bring materiality grade from C to B-', done: false, col: 'todo' },
      { id: 3, text: 'Finish climate change final paper', done: false, col: 'todo' },
      { id: 4, text: 'Order cap, gown, and tassel', done: false, col: 'todo' },
      { id: 5, text: 'Confirm graduation ceremony tickets', done: false, col: 'todo' },
      { id: 6, text: 'Maintain A in indigenous peoples NW', done: true, col: 'done' },
    ],
  },
  {
    id: 'moveout', title: 'Move-out', iconName: 'Box',
    paletteKey: 'moveout', note: 'EBT pending',
    tasks: [
      { id: 1, text: 'Cancel EBT benefits', done: false, col: 'todo' },
      { id: 2, text: 'Schedule lease end inspection', done: false, col: 'todo' },
      { id: 3, text: 'Forward mail to home address', done: false, col: 'todo' },
      { id: 4, text: 'Update address: bank, DMV, voter reg', done: false, col: 'todo' },
      { id: 5, text: 'Cancel utilities (wifi, electric)', done: false, col: 'todo' },
      { id: 6, text: 'Pack, donate, sort belongings', done: false, col: 'doing' },
      { id: 7, text: 'Book truck or movers', done: false, col: 'todo' },
    ],
  },
  {
    id: 'room', title: 'New room', iconName: 'Palette',
    paletteKey: 'room', note: '4 pins saved',
    tasks: [
      { id: 1, text: 'Build Pinterest mood board', done: true, col: 'done' },
      { id: 2, text: 'Measure room dimensions', done: false, col: 'todo' },
      { id: 3, text: 'Pick bedding + color story', done: false, col: 'todo' },
      { id: 4, text: 'Wall art and posters', done: false, col: 'todo' },
      { id: 5, text: 'Lighting (lamp, fairy lights)', done: false, col: 'todo' },
      { id: 6, text: 'Plants for the space', done: false, col: 'todo' },
    ],
  },
  {
    id: 'summer-classes', title: 'Summer classes', iconName: 'BookOpen',
    paletteKey: 'classes', note: 'Starts June 24',
    tasks: [
      { id: 1, text: 'Confirm registration and credits', done: false, col: 'todo' },
      { id: 2, text: 'Order textbooks early', done: false, col: 'todo' },
      { id: 3, text: 'Set up class portal logins', done: false, col: 'todo' },
      { id: 4, text: 'Plan weekly study schedule', done: false, col: 'todo' },
    ],
  },
  {
    id: 'career', title: 'Career launch', iconName: 'Briefcase',
    paletteKey: 'career', note: 'AI cert + portfolio',
    tasks: [
      { id: 1, text: 'Refresh LinkedIn photo and headline', done: false, col: 'todo' },
      { id: 2, text: 'Pick AI certification (Google, MSFT, IBM)', done: false, col: 'doing' },
      { id: 3, text: 'Build portfolio website', done: false, col: 'todo' },
      { id: 4, text: 'Polish resume for AI/PM roles', done: false, col: 'todo' },
      { id: 5, text: 'Add 3 case studies to portfolio', done: false, col: 'todo' },
      { id: 6, text: 'Practice behavioral interview answers', done: false, col: 'todo' },
    ],
  },
  {
    id: 'income', title: 'Summer income', iconName: 'DollarSign',
    paletteKey: 'income', note: '$0 of $3k goal',
    tasks: [
      { id: 1, text: 'Set up Upwork or Contra profile', done: false, col: 'todo' },
      { id: 2, text: 'Define freelance PM packages', done: false, col: 'todo' },
      { id: 3, text: 'Build outreach list of 10 contacts', done: false, col: 'todo' },
      { id: 4, text: 'Send first 3 pitches', done: false, col: 'todo' },
      { id: 5, text: 'Build 2 sample AI projects', done: false, col: 'doing' },
    ],
  },
  {
    id: 'activities', title: 'Summer fun', iconName: 'Music',
    paletteKey: 'activities', note: '3 concerts saved',
    tasks: [
      { id: 1, text: 'Concert tickets locked in', done: false, col: 'todo' },
      { id: 2, text: 'Plug in with home church', done: false, col: 'todo' },
      { id: 3, text: 'Summer reading list (3 books)', done: false, col: 'todo' },
      { id: 4, text: 'Reconnect with hometown friends', done: false, col: 'todo' },
      { id: 5, text: 'Weekly workout routine', done: false, col: 'doing' },
      { id: 6, text: 'Family trip or weekend away', done: false, col: 'todo' },
    ],
  },
];

const ICON_MAP = { GraduationCap, Box, Palette, BookOpen, Briefcase, DollarSign, Music };
function attachIcons(buckets) {
  return buckets.map(b => ({ ...b, icon: ICON_MAP[b.iconName] }));
}

function loadBuckets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return attachIcons(DEFAULT_BUCKETS);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return attachIcons(DEFAULT_BUCKETS);
    // Migration: if old buckets don't have paletteKey, attach by id
    const migrated = parsed.map(b => {
      if (b.paletteKey) return b;
      const map = { graduation: 'graduation', moveout: 'moveout', room: 'room', 'summer-classes': 'classes', career: 'career', income: 'income', activities: 'activities' };
      return { ...b, paletteKey: map[b.id] || 'graduation' };
    });
    return attachIcons(migrated);
  } catch {
    return attachIcons(DEFAULT_BUCKETS);
  }
}

function saveBuckets(buckets) {
  try {
    const serializable = buckets.map(({ icon, ...rest }) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  } catch (e) {
    console.warn('Could not save:', e);
  }
}

const BING_DAILY_URL = 'https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=en-US';

function daysUntil(dateString) {
  const target = new Date(dateString);
  const today = new Date();
  return Math.max(0, Math.ceil((target - today) / (1000 * 60 * 60 * 24)));
}

function progressOf(bucket) {
  if (bucket.tasks.length === 0) return 0;
  const done = bucket.tasks.filter(t => t.done).length;
  return Math.round((done / bucket.tasks.length) * 100);
}

function buildGoogleCalUrl({ title, date, time, durationMin = 60, details = '' }) {
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '').slice(0, 15);
  let dates;
  if (time) {
    const start = new Date(`${date}T${time}:00`);
    const end = new Date(start.getTime() + durationMin * 60 * 1000);
    dates = `${fmt(start)}/${fmt(end)}`;
  } else {
    const start = date.replace(/-/g, '');
    const endDate = new Date(`${date}T00:00:00`);
    endDate.setDate(endDate.getDate() + 1);
    const end = endDate.toISOString().slice(0, 10).replace(/-/g, '');
    dates = `${start}/${end}`;
  }
  const params = new URLSearchParams({ action: 'TEMPLATE', text: title, dates, details });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function AddToCalendarPopup({ taskText, onClose, accentColor }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('');
  const [allDay, setAllDay] = useState(true);

  const handleAdd = () => {
    const url = buildGoogleCalUrl({
      title: taskText, date, time: allDay ? '' : time,
      details: 'Added from your Summer 2026 dashboard',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div onClick={onClose} className="fade-in" style={{
      position: 'fixed', inset: 0, background: 'rgba(60, 30, 15, 0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
    }}>
      <div onClick={(e) => e.stopPropagation()} className="scale-in" style={{
        background: '#FFFBF5', borderRadius: '24px', padding: '28px',
        width: '100%', maxWidth: '420px', boxShadow: '0 20px 50px -10px rgba(120, 60, 30, 0.4)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div className="font-display" style={{ fontSize: '24px', fontWeight: 700, color: '#3D2817', lineHeight: 1.1 }}>
              Schedule it
            </div>
            <div className="font-editorial" style={{ fontSize: '14px', color: '#9C7A5C', fontStyle: 'italic', marginTop: '4px' }}>
              add this to Google Calendar
            </div>
          </div>
          <button onClick={onClose} style={{
            background: '#F5E6D3', border: 'none', width: '34px', height: '34px',
            borderRadius: '12px', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#9C7A5C',
          }}>
            <X size={18} />
          </button>
        </div>
        <div style={{
          background: '#FAEFE0', padding: '14px 16px', borderRadius: '14px',
          fontSize: '14px', color: '#3D2817', marginBottom: '20px', lineHeight: 1.4,
        }}>
          <div style={{ fontSize: '11px', color: '#9C7A5C', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Task</div>
          {taskText}
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#5C3D1F', marginBottom: '6px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Date
          </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{
            width: '100%', padding: '12px 14px', border: '1px solid #E8D5BC',
            borderRadius: '12px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', color: '#3D2817',
            background: '#fff',
          }}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <input type="checkbox" id="allday" checked={allDay} onChange={(e) => setAllDay(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: accentColor, cursor: 'pointer' }}/>
          <label htmlFor="allday" style={{ fontSize: '14px', color: '#5C3D1F', cursor: 'pointer', fontWeight: 500 }}>
            All-day event
          </label>
        </div>
        {!allDay && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#5C3D1F', marginBottom: '6px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              Time
            </label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{
              width: '100%', padding: '12px 14px', border: '1px solid #E8D5BC',
              borderRadius: '12px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', color: '#3D2817',
              background: '#fff',
            }}/>
          </div>
        )}
        <button onClick={handleAdd} disabled={!allDay && !time} className="pill-btn" style={{
          background: accentColor, color: '#fff', border: 'none', width: '100%',
          padding: '14px', borderRadius: '14px', fontSize: '15px', fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '8px', fontFamily: 'inherit', opacity: (!allDay && !time) ? 0.5 : 1,
        }}>
          <CalendarIcon size={17} />
          Open in Google Calendar
        </button>
        <div className="font-editorial" style={{ fontSize: '12px', color: '#9C7A5C', textAlign: 'center', marginTop: '12px', fontStyle: 'italic' }}>
          opens in a new tab, just hit save there
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmPopup({ taskText, onConfirm, onCancel }) {
  return (
    <div onClick={onCancel} className="fade-in" style={{
      position: 'fixed', inset: 0, background: 'rgba(60, 30, 15, 0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
    }}>
      <div onClick={(e) => e.stopPropagation()} className="scale-in" style={{
        background: '#FFFBF5', borderRadius: '24px', padding: '28px',
        width: '100%', maxWidth: '380px', boxShadow: '0 20px 50px -10px rgba(120, 60, 30, 0.4)',
      }}>
        <div style={{
          background: '#FAD7CB', color: '#C84C2E',
          width: '48px', height: '48px', borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <Trash2 size={22} />
        </div>
        <div className="font-display" style={{ fontSize: '24px', fontWeight: 700, color: '#3D2817', lineHeight: 1.1, marginBottom: '8px' }}>
          Delete this task?
        </div>
        <div style={{ fontSize: '14px', color: '#9C7A5C', marginBottom: '4px' }}>
          This will permanently remove:
        </div>
        <div style={{
          background: '#FAEFE0', padding: '12px 14px', borderRadius: '12px',
          fontSize: '14px', color: '#3D2817', marginBottom: '20px', lineHeight: 1.4,
        }}>
          {taskText}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onCancel} className="pill-btn" style={{
            background: '#F5E6D3', color: '#5C3D1F', border: 'none', flex: 1,
            padding: '12px', borderRadius: '14px', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Cancel
          </button>
          <button onClick={onConfirm} className="pill-btn" style={{
            background: '#C84C2E', color: '#fff', border: 'none', flex: 1,
            padding: '12px', borderRadius: '14px', fontSize: '14px', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}>
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function BucketBlock({ bucket, onOpen, delay, gridCol, gridRow }) {
  const Icon = bucket.icon;
  const pct = progressOf(bucket);
  const palette = MED_PALETTE[bucket.paletteKey] || MED_PALETTE.graduation;

  return (
    <button onClick={onOpen} className="grid-tile fade-up" style={{
      gridColumn: gridCol, gridRow: gridRow,
      background: palette.gradient, color: '#fff', border: 'none',
      borderRadius: '24px', padding: '20px', textAlign: 'left',
      cursor: 'pointer', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', fontFamily: 'inherit',
      animationDelay: `${delay}s`, boxShadow: '0 2px 6px rgba(120, 60, 30, 0.12)',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          color: '#fff', width: '38px', height: '38px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {Icon && <Icon size={18} strokeWidth={2.2} />}
        </div>
        <div className="font-display" style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1, textShadow: '0 1px 6px rgba(0,0,0,0.12)' }}>
          {pct}%
        </div>
      </div>
      <div>
        <div className="font-display" style={{ fontSize: '26px', fontWeight: 700, lineHeight: 1, marginBottom: '4px', textShadow: '0 1px 8px rgba(0,0,0,0.15)' }}>
          {bucket.title}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.92, fontWeight: 500, marginBottom: '10px' }}>{bucket.note}</div>
        <div style={{ height: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: '#fff', transition: 'width 0.4s ease' }} />
        </div>
      </div>
    </button>
  );
}

function ImagePanel({ photo, delay, gridCol, gridRow, caption }) {
  return (
    <div className="grid-tile fade-up film" style={{
      gridColumn: gridCol, gridRow: gridRow,
      background: `linear-gradient(135deg, rgba(0,0,0,0.05), rgba(60, 30, 15, 0.2)), url('${photo}'), #E8D5BC`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      borderRadius: '24px', animationDelay: `${delay}s`,
      boxShadow: '0 2px 6px rgba(120, 60, 30, 0.12)', position: 'relative', overflow: 'hidden',
    }}>
      {caption && (
        <div className="font-editorial" style={{
          position: 'absolute', bottom: '14px', left: '16px', right: '16px',
          color: '#fff', fontSize: '14px', fontStyle: 'italic',
          textShadow: '0 1px 8px rgba(0,0,0,0.5)', opacity: 0.95,
        }}>
          {caption}
        </div>
      )}
    </div>
  );
}

function AppTile({ app, delay }) {
  const handleImgError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.parentElement.querySelector('.fallback-letter');
    if (fallback) fallback.style.display = 'block';
  };
  return (
    <a href={app.url} target="_blank" rel="noopener noreferrer" className="app-tile fade-up"
      style={{
        background: '#FFFBF5', width: '100%', aspectRatio: '1', borderRadius: '18px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: '#3D2817', textDecoration: 'none', border: '1px solid #F0E1CB',
        boxShadow: '0 1px 3px rgba(120, 60, 30, 0.06)', animationDelay: `${delay}s`,
        cursor: 'pointer', position: 'relative', overflow: 'hidden', padding: '6px',
      }}
      title={`Open ${app.name}`}>
      <img src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`}
        alt="" width="28" height="28" loading="lazy" onError={handleImgError}
        style={{ borderRadius: '6px' }} />
      <span className="fallback-letter font-display" style={{
        display: 'none', fontSize: '22px', fontWeight: 800, color: app.color, lineHeight: 1,
      }}>{app.name[0]}</span>
      <div style={{
        fontSize: '9px', fontWeight: 600, opacity: 0.85, marginTop: '5px',
        letterSpacing: '0.02em', lineHeight: 1, textAlign: 'center', color: '#5C3D1F',
      }}>{app.name}</div>
    </a>
  );
}

function AppLauncherRow({ apps, gridCol, gridRow, delay }) {
  return (
    <div className="fade-up" style={{
      gridColumn: gridCol, gridRow: gridRow,
      background: '#FFFBF5', borderRadius: '24px', padding: '18px 20px',
      animationDelay: `${delay}s`, boxShadow: '0 2px 6px rgba(120, 60, 30, 0.08)',
      display: 'flex', alignItems: 'center', gap: '16px',
      border: '1px solid #F0E1CB',
    }}>
      <div style={{ flexShrink: 0 }}>
        <div className="font-display" style={{ fontSize: '20px', fontWeight: 700, color: '#3D2817', lineHeight: 1 }}>
          Quick launch
        </div>
        <div className="font-editorial" style={{ fontSize: '12px', color: '#9C7A5C', fontStyle: 'italic', marginTop: '2px' }}>
          all your apps
        </div>
      </div>
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: `repeat(${apps.length}, 1fr)`,
        gap: '8px',
      }}>
        {apps.map((app, i) => (<AppTile key={app.name} app={app} delay={delay + 0.05 + i * 0.03} />))}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '11px', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>{label}</div>
      <div className="font-display" style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.1, marginTop: '4px' }}>{value}</div>
    </div>
  );
}

function Hero({ buckets }) {
  const [greeting] = useState(() => GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
  const [bingLoaded, setBingLoaded] = useState(false);
  const totalDone = buckets.reduce((s, b) => s + b.tasks.filter(t => t.done).length, 0);
  const totalTasks = buckets.reduce((s, b) => s + b.tasks.length, 0);
  const gradDays = daysUntil(GRADUATION_DATE);
  const summerDays = daysUntil(SUMMER_END_DATE);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setBingLoaded(true);
    img.onerror = () => setBingLoaded(false);
    img.src = BING_DAILY_URL;
  }, []);

  // Mediterranean-tinted hero overlay
  const bgImage = bingLoaded
    ? `linear-gradient(135deg, rgba(232, 92, 63, 0.55), rgba(46, 92, 92, 0.5)), url('${BING_DAILY_URL}')`
    : `linear-gradient(135deg, #E85C3F 0%, #F2B544 50%, #2E5C5C 100%)`;

  return (
    <div className="fade-up film" style={{
      background: bgImage, backgroundSize: 'cover', backgroundPosition: 'center',
      borderRadius: '28px', padding: '40px 32px', color: '#FFFBF5', marginBottom: '14px',
      position: 'relative', overflow: 'hidden', minHeight: '260px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      boxShadow: '0 4px 12px rgba(120, 60, 30, 0.15)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', opacity: 0.85, fontWeight: 500 }}>
        <Sparkles size={15} />
        <span>Summer 2026 · today's view from somewhere beautiful</span>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h1 className="font-display hero-headline" style={{ fontSize: '64px', fontWeight: 800, lineHeight: 0.95, margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
          {greeting}
        </h1>
        <p className="font-editorial" style={{ fontSize: '20px', fontStyle: 'italic', opacity: 0.92, margin: '10px 0 0', maxWidth: '500px' }}>
          one beautiful, productive, sunlit summer ahead.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '32px', marginTop: '24px', flexWrap: 'wrap' }}>
        <Stat label="To graduation" value={`${gradDays} days`} />
        <Stat label="Summer left" value={`${summerDays} days`} />
        <Stat label="Tasks done" value={`${totalDone} / ${totalTasks}`} />
      </div>
    </div>
  );
}

function Home({ buckets, onOpen }) {
  return (
    <div className="font-body" style={{
      background: 'linear-gradient(180deg, #FCEFE3 0%, #F5DCC4 100%)',
      minHeight: '100vh', padding: '20px',
    }}>
      <style>{STYLES}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Hero buckets={buckets} />

        <div className="bento-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridAutoRows: '110px',
          gap: '12px',
        }}>
          <BucketBlock bucket={buckets[0]} onOpen={() => onOpen(buckets[0].id)} delay={0.1} gridCol="span 3" gridRow="span 2" />
          <ImagePanel photo={MY_PHOTOS.slot1} delay={0.15} gridCol="span 3" gridRow="span 2" caption="pacific nw skies · photo by kiera antonelli" />

          <ImagePanel photo={MY_PHOTOS.slot2} delay={0.2} gridCol="span 2" gridRow="span 2" caption="snoqualmie falls · photo by kiera antonelli" />
          <BucketBlock bucket={buckets[1]} onOpen={() => onOpen(buckets[1].id)} delay={0.25} gridCol="span 2" gridRow="span 2" />
          <BucketBlock bucket={buckets[2]} onOpen={() => onOpen(buckets[2].id)} delay={0.3} gridCol="span 2" gridRow="span 2" />

          <AppLauncherRow apps={APPS} gridCol="span 6" gridRow="span 1" delay={0.35} />

          <BucketBlock bucket={buckets[3]} onOpen={() => onOpen(buckets[3].id)} delay={0.4} gridCol="span 2" gridRow="span 2" />
          <ImagePanel photo={MY_PHOTOS.slot3} delay={0.45} gridCol="span 2" gridRow="span 2" caption="bloom season · photo by kiera antonelli" />
          <BucketBlock bucket={buckets[4]} onOpen={() => onOpen(buckets[4].id)} delay={0.5} gridCol="span 2" gridRow="span 2" />

          <BucketBlock bucket={buckets[5]} onOpen={() => onOpen(buckets[5].id)} delay={0.55} gridCol="span 2" gridRow="span 2" />
          <ImagePanel photo={MY_PHOTOS.slot4} delay={0.6} gridCol="span 2" gridRow="span 2" caption="the olympics · photo by kiera antonelli" />
          <BucketBlock bucket={buckets[6]} onOpen={() => onOpen(buckets[6].id)} delay={0.65} gridCol="span 2" gridRow="span 2" />
        </div>

        <div className="font-editorial fade-up" style={{ textAlign: 'center', marginTop: '36px', marginBottom: '24px', fontSize: '18px', fontStyle: 'italic', color: '#9C7A5C', animationDelay: '0.9s' }}>
          click any bucket to open its kanban
        </div>
      </div>
    </div>
  );
}

function BucketView({ bucket, onBack, onToggle, onMove, onAdd, onDelete }) {
  const [newTask, setNewTask] = useState('');
  const [calendarTask, setCalendarTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const Icon = bucket.icon;
  const palette = MED_PALETTE[bucket.paletteKey] || MED_PALETTE.graduation;
  const cols = [
    { id: 'todo', label: 'To do' },
    { id: 'doing', label: 'In progress' },
    { id: 'done', label: 'Done' },
  ];

  const handleAdd = () => {
    if (newTask.trim()) {
      onAdd(bucket.id, newTask.trim());
      setNewTask('');
    }
  };

  const taskToDelete = deleteTaskId ? bucket.tasks.find(t => t.id === deleteTaskId) : null;

  return (
    <div className="font-body" style={{
      background: 'linear-gradient(180deg, #FCEFE3 0%, #F5DCC4 100%)',
      minHeight: '100vh', padding: '20px',
    }}>
      <style>{STYLES}</style>
      {calendarTask && (
        <AddToCalendarPopup taskText={calendarTask} onClose={() => setCalendarTask(null)} accentColor={palette.deep} />
      )}
      {taskToDelete && (
        <DeleteConfirmPopup
          taskText={taskToDelete.text}
          onConfirm={() => {
            onDelete(bucket.id, deleteTaskId);
            setDeleteTaskId(null);
          }}
          onCancel={() => setDeleteTaskId(null)}
        />
      )}
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <button onClick={onBack} className="pill-btn fade-up" style={{
          background: 'rgba(255,251,245,0.7)', border: 'none', color: palette.deep,
          display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600,
          cursor: 'pointer', padding: '8px 14px', borderRadius: '99px', marginBottom: '14px', fontFamily: 'inherit',
        }}>
          <ArrowLeft size={14} /> dashboard
        </button>

        <div className="fade-up" style={{
          background: palette.gradient, borderRadius: '24px', padding: '32px',
          marginBottom: '20px', color: '#fff', display: 'flex',
          alignItems: 'center', gap: '20px', minHeight: '140px',
          boxShadow: '0 4px 12px rgba(120, 60, 30, 0.15)',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            color: '#fff', width: '64px', height: '64px', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {Icon && <Icon size={32} strokeWidth={2.2} />}
          </div>
          <div>
            <h1 className="font-display" style={{ fontSize: '48px', fontWeight: 800, lineHeight: 0.95, margin: 0, textShadow: '0 1px 8px rgba(0,0,0,0.15)' }}>{bucket.title}</h1>
            <p className="font-editorial" style={{ fontSize: '17px', fontStyle: 'italic', opacity: 0.95, margin: '6px 0 0' }}>
              {bucket.note} · {progressOf(bucket)}% complete
            </p>
          </div>
        </div>

        <div className="fade-up" style={{ display: 'flex', gap: '10px', marginBottom: '20px', animationDelay: '0.1s' }}>
          <input value={newTask} onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="add a new task..."
            style={{
              flex: 1, padding: '14px 20px', borderRadius: '16px', border: '1px solid #F0E1CB',
              background: '#FFFBF5', fontSize: '15px', fontFamily: 'inherit', outline: 'none',
              boxShadow: '0 1px 3px rgba(120, 60, 30, 0.06)', color: '#3D2817',
            }}/>
          <button onClick={handleAdd} className="pill-btn" style={{
            background: palette.deep, color: '#fff', border: 'none', padding: '0 24px',
            borderRadius: '16px', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'inherit',
          }}>
            <Plus size={18} /> add
          </button>
        </div>

        <div className="kanban-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {cols.map((col, ci) => {
            const items = bucket.tasks.filter(t => t.col === col.id);
            return (
              <div key={col.id} className="fade-up" style={{
                background: '#FFFBF5', borderRadius: '20px', padding: '20px',
                minHeight: '320px', animationDelay: `${0.15 + ci * 0.06}s`,
                border: '1px solid #F0E1CB',
                boxShadow: '0 1px 3px rgba(120, 60, 30, 0.04)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div className="font-display" style={{ fontSize: '20px', fontWeight: 700, color: palette.deep }}>{col.label}</div>
                  <div style={{
                    background: palette.gradient, color: '#fff', fontSize: '12px', fontWeight: 700,
                    padding: '4px 12px', borderRadius: '99px',
                  }}>{items.length}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map(task => (
                    <div key={task.id} style={{
                      background: palette.soft, padding: '12px 14px', borderRadius: '14px',
                      display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px',
                    }}>
                      <button onClick={() => onToggle(bucket.id, task.id)} style={{
                        background: task.done ? palette.deep : 'transparent',
                        border: task.done ? 'none' : `2px solid ${palette.deep}55`,
                        width: '22px', height: '22px', borderRadius: '8px', cursor: 'pointer',
                        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginTop: '1px', transition: 'all 0.2s ease',
                      }}>
                        {task.done && <Check size={13} color="#fff" strokeWidth={3} />}
                      </button>
                      <div style={{ flex: 1, textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.5 : 1, color: '#3D2817', lineHeight: 1.4 }}>
                        {task.text}
                      </div>
                      <button onClick={() => setCalendarTask(task.text)} className="icon-btn"
                        title="Schedule on Google Calendar" style={{
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          color: palette.deep, padding: '2px', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px',
                        }}>
                        <CalendarIcon size={15} strokeWidth={2.2} />
                      </button>
                      <button onClick={() => setDeleteTaskId(task.id)} className="icon-btn delete-btn"
                        title="Delete task" style={{
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          color: '#9C7A5C', padding: '2px', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px',
                        }}>
                        <Trash2 size={15} strokeWidth={2.2} />
                      </button>
                      <select value={task.col} onChange={e => onMove(bucket.id, task.id, e.target.value)} style={{
                        background: 'transparent', border: 'none', fontSize: '11px',
                        color: palette.deep, cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit',
                      }}>
                        <option value="todo">todo</option>
                        <option value="doing">doing</option>
                        <option value="done">done</option>
                      </select>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="font-editorial" style={{ fontSize: '13px', color: '#9C7A5C', fontStyle: 'italic', textAlign: 'center', padding: '24px 0' }}>
                      nothing here yet.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('home');
  const [buckets, setBuckets] = useState(() => loadBuckets());

  useEffect(() => {
    saveBuckets(buckets);
  }, [buckets]);

  const toggle = (bucketId, taskId) => {
    setBuckets(prev => prev.map(b => b.id !== bucketId ? b : {
      ...b,
      tasks: b.tasks.map(t => t.id !== taskId ? t : { ...t, done: !t.done, col: !t.done ? 'done' : 'todo' }),
    }));
  };
  const move = (bucketId, taskId, newCol) => {
    setBuckets(prev => prev.map(b => b.id !== bucketId ? b : {
      ...b,
      tasks: b.tasks.map(t => t.id !== taskId ? t : { ...t, col: newCol, done: newCol === 'done' }),
    }));
  };
  const add = (bucketId, text) => {
    setBuckets(prev => prev.map(b => b.id !== bucketId ? b : {
      ...b,
      tasks: [...b.tasks, { id: Date.now(), text, done: false, col: 'todo' }],
    }));
  };
  const deleteTask = (bucketId, taskId) => {
    setBuckets(prev => prev.map(b => b.id !== bucketId ? b : {
      ...b,
      tasks: b.tasks.filter(t => t.id !== taskId),
    }));
  };

  if (view === 'home') return <Home buckets={buckets} onOpen={setView} />;
  const bucket = buckets.find(b => b.id === view);
  return <BucketView bucket={bucket} onBack={() => setView('home')} onToggle={toggle} onMove={move} onAdd={add} onDelete={deleteTask} />;
}
