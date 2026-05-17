import React, { useState } from 'react';
import { ArrowLeft, Check, Plus, Sparkles, GraduationCap, Box, Palette, BookOpen, Briefcase, DollarSign, Music } from 'lucide-react';

// ─── EDIT THESE TO MATCH YOUR LIFE ─────────────────────────────────────
const GRADUATION_DATE = '2026-06-13';
const SUMMER_END_DATE = '2026-08-31';
// ───────────────────────────────────────────────────────────────────────

const GREETINGS = [
  'hey, you got this.',
  'small steps, big season.',
  'soft hustle, real growth.',
  "you're doing the work.",
  'rooted and rising.',
  'one beautiful summer.',
];

const STYLES = `
  .font-display { font-family: 'Bricolage Grotesque', system-ui, sans-serif; letter-spacing: -0.025em; }
  .font-editorial { font-family: 'Instrument Serif', Georgia, serif; letter-spacing: -0.01em; }
  .font-body { font-family: 'Inter', system-ui, sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }

  .bucket-card {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    will-change: transform;
  }
  .bucket-card:hover { transform: translateY(-4px); }
  .bucket-card:active { transform: translateY(-1px); }
  .film { filter: saturate(0.92) contrast(1.02); }
  .pill-btn { transition: all 0.2s ease; }
  .pill-btn:hover { transform: scale(1.02); }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 99px; }

  @media (max-width: 720px) {
    .bento-grid { grid-template-columns: 1fr !important; }
    .bento-grid > div { grid-column: span 1 !important; }
    .hero-headline { font-size: 48px !important; }
    .kanban-grid { grid-template-columns: 1fr !important; }
  }
`;

const INITIAL_BUCKETS = [
  {
    id: 'graduation',
    title: 'Graduation',
    icon: GraduationCap,
    photo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80&auto=format',
    tint: 'rgba(244, 114, 182, 0.78)',
    fallback: 'linear-gradient(135deg, #FB7185, #F472B6)',
    accent: '#BE185D',
    ink: '#500724',
    note: '1 class needs love',
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
    id: 'moveout',
    title: 'Move-out',
    icon: Box,
    photo: 'https://images.unsplash.com/photo-1530563885674-66db50a1af19?w=1200&q=80&auto=format',
    tint: 'rgba(52, 211, 153, 0.78)',
    fallback: 'linear-gradient(135deg, #34D399, #6EE7B7)',
    accent: '#047857',
    ink: '#022C22',
    note: 'EBT pending',
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
    id: 'room',
    title: 'New room',
    icon: Palette,
    photo: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80&auto=format',
    tint: 'rgba(167, 139, 250, 0.78)',
    fallback: 'linear-gradient(135deg, #A78BFA, #C4B5FD)',
    accent: '#6D28D9',
    ink: '#2E1065',
    note: '4 pins saved',
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
    id: 'summer-classes',
    title: 'Summer classes',
    icon: BookOpen,
    photo: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=1200&q=80&auto=format',
    tint: 'rgba(251, 191, 36, 0.78)',
    fallback: 'linear-gradient(135deg, #FBBF24, #FCD34D)',
    accent: '#B45309',
    ink: '#451A03',
    note: 'Starts June 24',
    tasks: [
      { id: 1, text: 'Confirm registration and credits', done: false, col: 'todo' },
      { id: 2, text: 'Order textbooks early', done: false, col: 'todo' },
      { id: 3, text: 'Set up class portal logins', done: false, col: 'todo' },
      { id: 4, text: 'Plan weekly study schedule', done: false, col: 'todo' },
    ],
  },
  {
    id: 'career',
    title: 'Career launch',
    icon: Briefcase,
    photo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80&auto=format',
    tint: 'rgba(96, 165, 250, 0.78)',
    fallback: 'linear-gradient(135deg, #60A5FA, #93C5FD)',
    accent: '#1D4ED8',
    ink: '#172554',
    note: 'AI cert + portfolio',
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
    id: 'income',
    title: 'Summer income',
    icon: DollarSign,
    photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format',
    tint: 'rgba(74, 222, 128, 0.78)',
    fallback: 'linear-gradient(135deg, #4ADE80, #86EFAC)',
    accent: '#166534',
    ink: '#052E16',
    note: '$0 of $3k goal',
    tasks: [
      { id: 1, text: 'Set up Upwork or Contra profile', done: false, col: 'todo' },
      { id: 2, text: 'Define freelance PM packages', done: false, col: 'todo' },
      { id: 3, text: 'Build outreach list of 10 contacts', done: false, col: 'todo' },
      { id: 4, text: 'Send first 3 pitches', done: false, col: 'todo' },
      { id: 5, text: 'Build 2 sample AI projects', done: false, col: 'doing' },
    ],
  },
  {
    id: 'activities',
    title: 'Summer fun',
    icon: Music,
    photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80&auto=format',
    tint: 'rgba(251, 146, 60, 0.78)',
    fallback: 'linear-gradient(135deg, #FB923C, #FDBA74)',
    accent: '#C2410C',
    ink: '#431407',
    note: '3 concerts saved',
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

const HERO_PHOTO = 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1600&q=85&auto=format';

function daysUntil(dateString) {
  const target = new Date(dateString);
  const today = new Date();
  return Math.max(0, Math.ceil((target - today) / (1000 * 60 * 60 * 24)));
}

function progressOf(bucket) {
  const done = bucket.tasks.filter(t => t.done).length;
  return Math.round((done / bucket.tasks.length) * 100);
}

function BucketCard({ bucket, onOpen, delay }) {
  const Icon = bucket.icon;
  const pct = progressOf(bucket);
  const bgLayered = `linear-gradient(135deg, ${bucket.tint}, ${bucket.tint}), url('${bucket.photo}'), ${bucket.fallback}`;

  return (
    <button
      onClick={onOpen}
      className="bucket-card fade-up film"
      style={{
        background: bgLayered,
        backgroundSize: 'cover, cover, cover',
        backgroundPosition: 'center',
        color: '#fff',
        border: 'none',
        borderRadius: '28px',
        padding: '24px',
        textAlign: 'left',
        cursor: 'pointer',
        minHeight: '200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'inherit',
        animationDelay: `${delay}s`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#fff',
          width: '42px',
          height: '42px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={20} strokeWidth={2.2} />
        </div>
        <div className="font-display" style={{ fontSize: '38px', fontWeight: 800, lineHeight: 1, textShadow: '0 1px 8px rgba(0,0,0,0.15)' }}>
          {pct}%
        </div>
      </div>
      <div>
        <div className="font-display" style={{ fontSize: '34px', fontWeight: 700, lineHeight: 1, marginBottom: '6px', textShadow: '0 1px 12px rgba(0,0,0,0.2)' }}>
          {bucket.title}
        </div>
        <div style={{ fontSize: '13px', opacity: 0.92, fontWeight: 500, marginBottom: '14px' }}>{bucket.note}</div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: '#fff', transition: 'width 0.4s ease' }} />
        </div>
      </div>
    </button>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '11px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>{label}</div>
      <div className="font-display" style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.1, marginTop: '4px' }}>{value}</div>
    </div>
  );
}

function Home({ buckets, onOpen }) {
  const [greeting] = useState(() => GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
  const totalDone = buckets.reduce((s, b) => s + b.tasks.filter(t => t.done).length, 0);
  const totalTasks = buckets.reduce((s, b) => s + b.tasks.length, 0);
  const gradDays = daysUntil(GRADUATION_DATE);
  const summerDays = daysUntil(SUMMER_END_DATE);

  return (
    <div className="font-body" style={{ background: '#FAF6EF', minHeight: '100vh', padding: '20px' }}>
      <style>{STYLES}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          className="fade-up film"
          style={{
            background: `linear-gradient(135deg, rgba(76, 29, 149, 0.65), rgba(190, 24, 93, 0.55)), url('${HERO_PHOTO}'), linear-gradient(135deg, #4C1D95, #C026D3)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '32px',
            padding: '44px 36px',
            color: '#FFF7ED',
            marginBottom: '14px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', opacity: 0.85, fontWeight: 500 }}>
            <Sparkles size={15} />
            <span>Summer 2026 · let's gooo</span>
          </div>
          <div style={{ marginTop: '24px' }}>
            <h1 className="font-display hero-headline" style={{ fontSize: '72px', fontWeight: 800, lineHeight: 0.95, margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
              {greeting}
            </h1>
            <p className="font-editorial" style={{ fontSize: '22px', fontStyle: 'italic', opacity: 0.92, margin: '12px 0 0', maxWidth: '500px', fontWeight: 400 }}>
              one beautiful, productive, sunlit summer ahead.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '36px', marginTop: '32px', flexWrap: 'wrap' }}>
            <Stat label="To graduation" value={`${gradDays} days`} />
            <Stat label="Summer left" value={`${summerDays} days`} />
            <Stat label="Tasks done" value={`${totalDone} / ${totalTasks}`} />
          </div>
        </div>

        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
          {buckets.map((b, i) => {
            const span = [3, 3, 2, 2, 2, 3, 3][i];
            return (
              <div key={b.id} style={{ gridColumn: `span ${span}` }}>
                <BucketCard bucket={b} onOpen={() => onOpen(b.id)} delay={0.1 + i * 0.06} />
              </div>
            );
          })}
        </div>

        <div className="font-editorial fade-up" style={{ textAlign: 'center', marginTop: '40px', marginBottom: '24px', fontSize: '20px', fontStyle: 'italic', color: '#9CA3AF', animationDelay: '0.8s' }}>
          click any bucket to open its kanban
        </div>
      </div>
    </div>
  );
}

function BucketView({ bucket, onBack, onToggle, onMove, onAdd }) {
  const [newTask, setNewTask] = useState('');
  const Icon = bucket.icon;
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

  return (
    <div className="font-body" style={{ background: '#FAF6EF', minHeight: '100vh', padding: '20px' }}>
      <style>{STYLES}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <button
          onClick={onBack}
          className="pill-btn fade-up"
          style={{
            background: 'rgba(255,255,255,0.7)',
            border: 'none',
            color: bucket.ink,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '8px 14px',
            borderRadius: '99px',
            marginBottom: '14px',
            fontFamily: 'inherit',
          }}
        >
          <ArrowLeft size={14} /> dashboard
        </button>

        <div
          className="fade-up film"
          style={{
            background: `linear-gradient(135deg, ${bucket.tint}, ${bucket.tint}), url('${bucket.photo}'), ${bucket.fallback}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '28px',
            padding: '36px',
            marginBottom: '20px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '22px',
            minHeight: '180px',
          }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#fff',
            width: '72px',
            height: '72px',
            borderRadius: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={36} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="font-display" style={{ fontSize: '56px', fontWeight: 800, lineHeight: 0.95, margin: 0, textShadow: '0 2px 14px rgba(0,0,0,0.2)' }}>{bucket.title}</h1>
            <p className="font-editorial" style={{ fontSize: '18px', fontStyle: 'italic', opacity: 0.95, margin: '8px 0 0' }}>{bucket.note} · {progressOf(bucket)}% complete</p>
          </div>
        </div>

        <div className="fade-up" style={{ display: 'flex', gap: '10px', marginBottom: '20px', animationDelay: '0.1s' }}>
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="add a new task..."
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '16px',
              border: 'none',
              background: '#fff',
              fontSize: '15px',
              fontFamily: 'inherit',
              outline: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          />
          <button
            onClick={handleAdd}
            className="pill-btn"
            style={{
              background: bucket.accent,
              color: '#fff',
              border: 'none',
              padding: '0 24px',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'inherit',
            }}
          >
            <Plus size={18} /> add
          </button>
        </div>

        <div className="kanban-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {cols.map((col, ci) => {
            const items = bucket.tasks.filter(t => t.col === col.id);
            return (
              <div key={col.id} className="fade-up" style={{
                background: '#fff',
                borderRadius: '22px',
                padding: '20px',
                minHeight: '320px',
                animationDelay: `${0.15 + ci * 0.06}s`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div className="font-display" style={{ fontSize: '22px', fontWeight: 700, color: bucket.ink }}>{col.label}</div>
                  <div style={{
                    background: bucket.tint,
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '99px',
                  }}>{items.length}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map(task => (
                    <div key={task.id} style={{
                      background: '#FAF6EF',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '14px',
                    }}>
                      <button
                        onClick={() => onToggle(bucket.id, task.id)}
                        style={{
                          background: task.done ? bucket.accent : 'transparent',
                          border: task.done ? 'none' : `2px solid ${bucket.accent}55`,
                          width: '22px',
                          height: '22px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '1px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {task.done && <Check size={13} color="#fff" strokeWidth={3} />}
                      </button>
                      <div style={{ flex: 1, textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.5 : 1, color: '#1F2937', lineHeight: 1.4 }}>
                        {task.text}
                      </div>
                      <select
                        value={task.col}
                        onChange={e => onMove(bucket.id, task.id, e.target.value)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          fontSize: '11px',
                          color: bucket.accent,
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontFamily: 'inherit',
                        }}
                      >
                        <option value="todo">todo</option>
                        <option value="doing">doing</option>
                        <option value="done">done</option>
                      </select>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="font-editorial" style={{ fontSize: '13px', color: '#9CA3AF', fontStyle: 'italic', textAlign: 'center', padding: '24px 0' }}>
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
  const [buckets, setBuckets] = useState(INITIAL_BUCKETS);

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

  if (view === 'home') return <Home buckets={buckets} onOpen={setView} />;
  const bucket = buckets.find(b => b.id === view);
  return <BucketView bucket={bucket} onBack={() => setView('home')} onToggle={toggle} onMove={move} onAdd={add} />;
}
