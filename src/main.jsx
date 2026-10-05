import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ChevronRight, Maximize, Minimize, Smartphone, Signal, Wifi, BatteryFull, Search, RotateCcw } from 'lucide-react';
import App from './App.jsx';
import { screens } from './screens.js';
import './styles.css';

const devices = [
  { name: 'iPhone · 390', width: 390 }, { name: 'Compact · 375', width: 375 }, { name: 'Large · 430', width: 430 },
];
function Simulator() {
  const initial = new URLSearchParams(location.search).get('screen');
  const [route, setRoute] = useState(screens.some(s => s.id === initial) ? initial : 'welcome');
  const [device, setDevice] = useState(devices[0]);
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const [sync, setSync] = useState('synced');
  useEffect(() => {
    const onRoute = event => setRoute(event.detail);
    const onSync = event => setSync(event.detail);
    window.addEventListener('candelia:route', onRoute);
    window.addEventListener('candelia:sync', onSync);
    return () => {
      window.removeEventListener('candelia:route', onRoute);
      window.removeEventListener('candelia:sync', onSync);
    };
  }, []);
  const navigate = id => { setRoute(id); window.dispatchEvent(new CustomEvent('candelia:navigate', { detail: id })); };
  const current = screens.find(s => s.id === route);
  const filtered = screens.filter(s => `${s.label} ${s.group}`.toLowerCase().includes(query.toLowerCase()));
  const status = { synced: 'Demo saved', saving: 'Saving demo…', local: 'Saved in browser · server offline', 'storage-full': 'Browser storage is full' }[sync];
  return <div className={`simulator ${focus ? 'focus-mode' : ''}`}>
    <header className="shell-header">
      <button className="shell-logo" onClick={() => navigate('welcome')}>candelia<span> ✦</span><small>THE CONNECTED LIFESTYLE</small></button>
      <div className="shell-header-right"><span className="prototype-pill"><i /> INTERACTIVE PROTOTYPE</span><span className="version-label">WEB EXPERIENCE / 01</span></div>
    </header>
    <div className="shell-layout">
      <aside className="screen-sidebar">
        <div className="sidebar-intro"><span className="shell-eyebrow">EXPLORE THE EXPERIENCE</span><h2>Every part of you.<br />Connected.</h2><p>Choose a screen, or follow the journey inside the app.</p></div>
        <label className="screen-search"><Search size={16} /><input aria-label="Find a demo screen" placeholder="Find a screen…" value={query} onChange={e => setQuery(e.target.value)} /></label>
        <nav className="screen-list" aria-label="Prototype screens">
          {[...new Set(filtered.map(s => s.group))].map(group => <section key={group}>
            <h3>{group}</h3>{filtered.filter(s => s.group === group).map(screen => <button key={screen.id} data-screen={screen.id} onClick={() => navigate(screen.id)} aria-current={screen.id === route ? 'page' : undefined} className={screen.id === route ? 'selected' : ''}>
              <span className="screen-number">{String(screens.indexOf(screen) + 1).padStart(2, '0')}</span><span>{screen.label}</span><ChevronRight size={14} />
            </button>)}
          </section>)}
          {!filtered.length && <p className="no-screens">No matching screens.</p>}
        </nav>
        <div className="sidebar-footer"><span>27 screens</span><span>One connected journey <ArrowUpRight size={12} /></span></div>
      </aside>
      <main className="preview-stage">
        <div className="preview-toolbar"><div><span className="shell-eyebrow">MOBILE SIMULATION</span><h1>{current?.label}</h1></div>
          <div className="preview-controls"><label className="device-select"><Smartphone size={16} /><select aria-label="Device size" value={device.width} onChange={e => setDevice(devices.find(d => d.width === Number(e.target.value)))}>{devices.map(d => <option key={d.width} value={d.width}>{d.name}</option>)}</select></label>
            <button className="shell-icon-button" aria-label={focus ? 'Exit focus view' : 'Focus view'} title="Focus view" onClick={() => setFocus(!focus)}>{focus ? <Minimize size={17} /> : <Maximize size={17} />}</button>
            <button className="shell-icon-button" aria-label="Restart at welcome" title="Restart at welcome (keeps demo data)" onClick={() => navigate('welcome')}><RotateCcw size={17} /></button></div>
        </div>
        <div className="phone-stage">
          <div className="phone-device" style={{ '--device-width': `${device.width}px` }}>
            <div className="phone-hardware"><div className="dynamic-island" /><div className="phone-status"><span>9:41</span><div><Signal size={14} /><Wifi size={14} /><BatteryFull size={19} /></div></div></div>
            <div className="phone-screen"><App /></div><div className="home-indicator"><span /></div>
          </div>
          <aside className="preview-caption"><span className="caption-line" /><span>YOUR LOOK.<br />YOUR WELLNESS.<br /><em>Your transformation.</em></span></aside>
        </div>
        <footer className="preview-footer"><span className={`sync-status ${sync === 'local' ? 'offline' : ''}`} role="status"><i />{status}</span><span>AI, payments & bookings are demonstrations.</span></footer>
      </main>
    </div>
  </div>;
}
createRoot(document.getElementById('root')).render(<Simulator />);
