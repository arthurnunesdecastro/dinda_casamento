import React, { useState, useEffect} from 'react';
import { createClient } from '@supabase/supabase-js';

import {
  Heart,
  Gift,
  LogOut,
  Edit2,
  Trash2,
  Plus,
  Copy,
  X,
  CheckCircle,
  ExternalLink,
  MapPin,
} from 'lucide-react';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Simple router implementation
const Router = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newPath) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
  };

  return children({ path, navigate });
};

const colors = {
  primary: '#88B3CE',
  primaryDark: '#6B98B8',
  primaryLight: '#A5C8DD',
  gold: '#D4AF37',
  white: '#FFFFFF',
  lightGray: '#ffffff',
  gray: '#E0E0E0',
  darkGray: '#666666',
  text: '#333333'
};

const COUPLE_PHOTO = process.env.REACT_APP_COUPLE_PHOTO_URL || '/hero.jpg';
 
const gold = '#C9A84C';
const goldLight = '#E8C97A';
 
const HeroSection = ({ isAdmin, path, navigate, handleLogout }) => {
  const [loaded, setLoaded] = useState(false);
 
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);
 
  const reveal = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0px)' : 'translateY(22px)',
    transition: `opacity 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });
 
  const fadeIn = (delay) => ({
    opacity: loaded ? 1 : 0,
    transition: `opacity 1.6s ease ${delay}s`,
  });
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Tenor+Sans&family=Cormorant:ital,wght@1,300;1,400&display=swap');
 
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
 
        /* ── HERO SHELL ── */
        .hs-shell {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 640px;
          overflow: hidden;
          background: #08080a;
        }
 
        /* ── FULL-BLEED PHOTO ── */
        .hs-photo {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
 
        .hs-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 18%;
          display: block;
        }
 
        .hs-photo img.img-loaded {
          animation: heroZoom 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
 
        @keyframes heroZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1.00); }
        }
 
        /* ── CINEMATIC VIGNETTE ── */
        .hs-vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            linear-gradient(to top,    rgba(4,4,6,0.97) 0%,  rgba(4,4,6,0.68) 28%, rgba(4,4,6,0.1) 55%, transparent 72%),
            linear-gradient(to bottom, rgba(4,4,6,0.65) 0%,  transparent 28%),
            linear-gradient(to right,  rgba(4,4,6,0.45) 0%,  transparent 32%),
            linear-gradient(to left,   rgba(4,4,6,0.72) 0%,  transparent 38%);
        }
 
        /* ── MAIN CONTENT: bottom-anchored ── */
        .hs-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 0 7% 5.5rem;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: flex-end;
          gap: 3rem;
        }
 
        /* ── EYEBROW ── */
        .hs-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1.8rem;
        }
 
        .hs-eyebrow-line {
          display: block;
          width: 32px;
          height: 1px;
          background: ${gold};
          transform-origin: left;
          flex-shrink: 0;
          transition: transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s;
        }
 
        .hs-eyebrow-line.line-visible {
          transform: scaleX(1);
        }
 
        .hs-eyebrow-line.line-hidden {
          transform: scaleX(0);
        }
 
        .hs-eyebrow-text {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: ${gold};
        }
 
        /* ── NAMES ── */
        .hs-names { margin-bottom: 1.8rem; }
 
        .hs-name {
          font-family: 'Playfair Display', serif;
          font-weight: 300;
          font-size: clamp(4.5rem, 8vw, 9rem);
          line-height: 0.9;
          color: #ffffff;
          display: block;
          letter-spacing: -0.025em;
        }
 
        .hs-amp {
          font-family: 'Cormorant', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(2.5rem, 4vw, 4.2rem);
          color: ${gold};
          opacity: 0.85;
          display: block;
          line-height: 1;
          margin: 0.15rem 0 0.15rem 0.1em;
        }
 
        /* ── TAGLINE ── */
        .hs-tagline {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(0.95rem, 1.2vw, 1.15rem);
          color: rgba(255,255,255,0.48);
          line-height: 1.85;
          max-width: 36ch;
          margin: 0;
        }
 
        /* ── RIGHT META STACK ── */
        .hs-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2.2rem;
          padding-bottom: 0.4rem;
        }
 
        .hs-meta-item {
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
 
        .hs-meta-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
        }
 
        .hs-meta-value {
          font-family: 'Playfair Display', serif;
          font-weight: 300;
          font-size: 1rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.88);
        }
 
        .hs-meta-divider {
          width: 1px;
          height: 28px;
          background: linear-gradient(to bottom, transparent, ${gold}60, transparent);
          align-self: flex-end;
        }
 
        /* ── VERTICAL SCROLL INDICATOR ── */
        .hs-scroll {
          position: absolute;
          left: 2.8rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }
 
        .hs-scroll-line {
          width: 1px;
          height: 52px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2));
          animation: scrollPulse 2.6s ease-in-out infinite;
        }
 
        .hs-scroll-text {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.47rem;
          letter-spacing: 0.52em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          writing-mode: vertical-rl;
        }
 
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
 
        /* ── ADMIN TOPBAR ── */
        .hs-topbar {
          position: absolute;
          top: 2.5rem;
          right: 7%;
          z-index: 20;
          display: flex;
          gap: 0.6rem;
          align-items: center;
        }
 
        .hs-nav-btn {
          padding: 0.5rem 1rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.5);
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          border-radius: 2px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
 
        .hs-nav-btn:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.28);
          background: rgba(0,0,0,0.5);
        }
 
        .hs-nav-btn.active {
          border-color: ${gold};
          color: ${goldLight};
        }
 
        /* ── TOP CENTER ORNAMENT ── */
        .hs-stamp {
          position: absolute;
          top: 2.4rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
        }
 
        /* ── GOLD BOTTOM RULE ── */
        .hs-bottom-rule {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, ${gold}55, transparent);
          z-index: 15;
        }
 
        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .hs-content {
            grid-template-columns: 1fr;
            padding: 0 6% 4.5rem;
            gap: 1.8rem;
          }
 
          .hs-right {
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 1.5rem;
          }
 
          .hs-meta-item   { text-align: left; }
          .hs-meta-divider { height: 36px; }
 
          .hs-name { font-size: clamp(3.5rem, 15vw, 6rem); }
          .hs-amp  { font-size: clamp(2rem, 8vw, 3.2rem); }
 
          .hs-scroll { display: none; }
          .hs-stamp  { display: none; }
          .hs-topbar { top: 1.5rem; right: 5%; }
        }
      `}</style>
 
      <section className="hs-shell">
 
        {/* Full-bleed photo */}
        <div className="hs-photo">
          <img
            src={COUPLE_PHOTO}
            alt="Daiane e Cássio"
            className={loaded ? 'img-loaded' : ''}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
 
        {/* Cinematic vignette */}
        <div className="hs-vignette" />
 
        {/* Top center ornament */}
        <div className="hs-stamp" style={fadeIn(1.2)}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke={gold} strokeWidth="0.6" opacity="0.4" />
            <circle cx="20" cy="20" r="2" fill={gold} opacity="0.55" />
            <line x1="20" y1="1" x2="20" y2="7.5"  stroke={gold} strokeWidth="0.6" opacity="0.4" />
            <line x1="20" y1="32.5" x2="20" y2="39" stroke={gold} strokeWidth="0.6" opacity="0.4" />
            <line x1="1" y1="20" x2="7.5" y2="20"   stroke={gold} strokeWidth="0.6" opacity="0.4" />
            <line x1="32.5" y1="20" x2="39" y2="20"  stroke={gold} strokeWidth="0.6" opacity="0.4" />
          </svg>
        </div>
 
        {/* Admin nav */}
        {isAdmin && (
          <div className="hs-topbar" style={fadeIn(0.8)}>
            <button className={`hs-nav-btn ${path === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>Lista</button>
            <button className={`hs-nav-btn ${path === '/dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="hs-nav-btn" onClick={() => handleLogout(navigate)}>
              <LogOut size={10} /> Sair
            </button>
          </div>
        )}
 
        {/* Vertical scroll indicator */}
        <div className="hs-scroll" style={fadeIn(2)}>
          <div className="hs-scroll-line" />
          <span className="hs-scroll-text">Scroll</span>
        </div>
 
        {/* Main content */}
        <div className="hs-content">
 
          {/* Left: text */}
          <div>
            <div className="hs-eyebrow" style={reveal(0.3)}>
              <span className={`hs-eyebrow-line ${loaded ? 'line-visible' : 'line-hidden'}`} />
              <span className="hs-eyebrow-text">Celebre Conosco</span>
            </div>
 
            <div className="hs-names">
              <span className="hs-name" style={reveal(0.45)}>Daiane</span>
              <span className="hs-amp"  style={reveal(0.58)}>&</span>
              <span className="hs-name" style={reveal(0.72)}>Cássio</span>
            </div>
 
            <p className="hs-tagline" style={reveal(0.88)}>
              Obrigada por fazerem parte da nossa história e do nosso sonho.
            </p>
          </div>
 
          {/* Right: meta */}
          <div className="hs-right" style={reveal(1.0)}>
            <div className="hs-meta-item">
              <span className="hs-meta-label">Data</span>
              <span className="hs-meta-value">14 · 11 · 2026</span>
            </div>
            <div className="hs-meta-divider" />
            <div className="hs-meta-item">
              <span className="hs-meta-label">Local</span>
              <span className="hs-meta-value">Imbituba, SC</span>
            </div>
          </div>
 
        </div>
 
        {/* Gold bottom rule */}
        <div className="hs-bottom-rule" />
 
      </section>
    </>
  );
};

const WeddingGiftList = () => {
  const [gifts, setGifts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [editingGift, setEditingGift] = useState(null);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [purchaseForm, setPurchaseForm] = useState({ name: '', message: '' });
  const [giftForm, setGiftForm] = useState({
    name: '',
    description: '',
    image_url: '',
    purchase_link: ''
  });
  const [copiedPix, setCopiedPix] = useState(null);

  const openMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank');
  };

  const LocationItem = ({ label, address }) => (
    <div
      onClick={() => openMaps(address)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        background: colors.white,
        border: `1px solid ${colors.gray}`,
        cursor: 'pointer',
        marginTop: '1rem',
      }}
    >
      <MapPin color={colors.primary} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <strong>{label}</strong>
        <div style={{ fontSize: '0.9rem', color: colors.darkGray }}>{address}</div>
      </div>
      <ExternalLink color={colors.darkGray} />
    </div>
  );

  const copyPix = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedPix(key);
      setTimeout(() => setCopiedPix(null), 1800);
    } catch (err) {
      console.error(err);
    }
  };

  const PixItem = ({ label, name, pixKey }) => (
    <div
      onClick={() => copyPix(pixKey)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        background: colors.white,
        border: `1px solid ${colors.gray}`,
        cursor: 'pointer',
        marginBottom: '0.75rem'
      }}
    >
      <div style={{ textAlign: 'left' }}>
        <strong>{label}</strong>
        <div style={{ fontSize: '0.9rem', color: colors.darkGray }}>{name}</div>
        <div style={{ fontSize: '0.85rem', color: colors.darkGray }}>
          CHAVE PIX: {pixKey.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
        </div>
      </div>
      {copiedPix === pixKey ? (
        <CheckCircle size={20} color={colors.primary} />
      ) : (
        <Copy size={20} color={colors.darkGray} />
      )}
    </div>
  );

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const { data, error } = await supabase.from('gifts').select('*');
    if (error) { console.error('SUPABASE ERROR:', error); alert('Erro ao carregar presentes'); return; }
    setGifts(data || []);
  };

  const handleLogin = async (e, navigate) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email: loginForm.email, password: loginForm.password });
    if (error) { alert('Login inválido'); return; }
    setIsAdmin(true);
    setLoginForm({ email: '', password: '' });
    navigate('/');
  };

  const handleLogout = async (navigate) => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    navigate('/');
  };

  const handlePurchaseGift = async (e) => {
    e.preventDefault();
    if (!purchaseForm.name.trim()) { alert('Coloque seu nome, por favor'); return; }
    const { error } = await supabase.from('gifts').update({
      status: 'purchased',
      purchase_by: purchaseForm.name.trim(),
      purchase_message: purchaseForm.message.trim()
    }).eq('id', selectedGift.id);
    if (error) { alert('Erro ao salvar'); console.error(error); return; }
    setSelectedGift(null);
    setPurchaseForm({ name: '', message: '' });
    loadData();
  };

  const handleSaveGift = async (e, navigate) => {
    e.preventDefault();
    if (!giftForm.name.trim()) { alert('Gift name is required'); return; }
    if (editingGift) {
      await supabase.from('gifts').update({
        name: giftForm.name, description: giftForm.description,
        image_url: giftForm.image_url, purchase_link: giftForm.purchase_link
      }).eq('id', editingGift.id);
    } else {
      await supabase.from('gifts').insert({
        name: giftForm.name, description: giftForm.description,
        image_url: giftForm.image_url, purchase_link: giftForm.purchase_link, status: 'available'
      });
    }
    setEditingGift(null);
    setGiftForm({ name: '', description: '', image_url: '', purchase_link: '' });
    loadData();
    navigate('/dashboard');
  };

  const handleDeleteGift = async (giftId) => {
    if (!window.confirm('Are you sure?')) return;
    await supabase.from('gifts').delete().eq('id', giftId);
    loadData();
  };

  const handleResetGift = async (giftId) => {
    if (!window.confirm('Reset this gift to available?')) return;
    const { error } = await supabase.from('gifts').update({
      status: 'available', purchase_by: null, purchase_message: null
    }).eq('id', giftId);
    if (error) { console.error(error); alert('Erro ao resetar presente'); return; }
    loadData();
  };

  const handleEditGift = (gift, navigate) => {
    setEditingGift(gift);
    setGiftForm({ name: gift.name, description: gift.description, image_url: gift.image_url, purchase_link: gift.purchase_link });
    navigate('/edit-gift');
  };

  const renderGiftCard = (gift, isAdminView, navigate) => (
    <div
      className='card'
      key={gift.id}
      style={{
        background: colors.white,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s',
        border: `2px solid ${gift.status === 'purchased' ? colors.gold : colors.gray}`,
        position: 'relative'
      }}
    >
      {gift.image_url && (
        <div style={{ height: '400px', overflow: 'hidden', background: colors.lightGray }}>
          <img src={gift.image_url} alt={gift.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: colors.text, fontSize: '1.3rem', fontWeight: '400' }}>{gift.name}</h3>
        <p style={{ color: colors.darkGray, margin: '0 0 1rem 0', lineHeight: '1.6' }}>{gift.description}</p>

        {gift.status === 'purchased' && (
          <div style={{
            background: `linear-gradient(135deg, ${colors.gold}15, ${colors.gold}25)`,
            padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem',
            border: `1px solid ${colors.gold}50`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <CheckCircle size={18} color={colors.gold} />
              <strong style={{ color: colors.gold }}>Comprado por {gift.purchase_by}</strong>
            </div>
            {gift.purchase_message && (
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: colors.darkGray, fontStyle: 'italic' }}>
                "{gift.purchase_message}"
              </p>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {gift.purchase_link && (
            <a href={gift.purchase_link} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, minWidth: '120px', padding: '0.75rem', background: colors.lightGray, color: colors.text,
              textAlign: 'center', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem',
              transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${colors.gray}`
            }}>Ver Presente</a>
          )}
          {!isAdminView && gift.status === 'available' && (
            <button onClick={() => setSelectedGift(gift)} style={{
              flex: 1, minWidth: '120px', padding: '0.75rem',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
              color: colors.white, border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.3s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Playfair Display', gap: '0.5rem'
            }}>
              <Gift size={18} /> Eu comprei isso
            </button>
          )}
          {isAdminView && (
            <>
              <button onClick={() => handleEditGift(gift, navigate)} style={{
                padding: '0.75rem', background: colors.primary, color: colors.white, border: 'none',
                borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'
              }}><Edit2 size={16} /> Edit</button>
              {gift.status === 'purchased' && (
                <button onClick={() => handleResetGift(gift.id)} style={{
                  padding: '0.75rem', background: colors.gold, color: colors.white, border: 'none',
                  borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem'
                }}>Reset</button>
              )}
              <button onClick={() => handleDeleteGift(gift.id)} style={{
                padding: '0.75rem', background: '#dc3545', color: colors.white, border: 'none',
                borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'
              }}><Trash2 size={16} /></button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderHomePage = (navigate) => (
    <div className='hero'>
      <div style={{
        textAlign: 'center', marginBottom: '4rem', padding: '2rem',
        background: colors.lightGray, borderRadius: '12px'
      }}>
        <Gift className='gift' color={colors.primary} style={{ marginBottom: '2rem', marginTop: '3rem' }} />
        <h2>Nossa Lista de Presentes</h2>
        <div style={{
          textAlign: 'center', marginBottom: '2rem', padding: '2rem',
          background: colors.lightGray, borderRadius: '12px'
        }}>
          <p className='mainDesc'>
            Com o coração transbordando de alegria, queremos dizer que o maior presente para nós é ter vocês ao nosso lado nesse dia tão especial. Cada abraço, sorriso e momento compartilhado tornará o nosso "sim" ainda mais inesquecível.
            <br /><br />
            Mas, se além da presença vocês desejarem contribuir para a realização do nosso sonho, ficaremos imensamente gratos.
            Deixamos disponível a chave PIX destinada à nossa lua de mel — um pedacinho do início da nossa vida juntos, que será lembrado com muito carinho em cada detalhe dessa viagem.<br />
            <hr className='space hide' />
            <PixItem label="Noiva" name="Daiane Leopoldina Nunes" pixKey="06367630996" />
          </p>
        </div>
        <p className='mainDesc'>
          Também, se preferirem, seguem algumas opções de presentes, como referência, para que possam escolher e adquirir onde acharem mais conveniente.
          Segue o endereço de entrega: <br />
          <hr className='space hide' />
          <LocationItem label="Endereço" address="Rua Pedro Bitencourt, 974, Vila Nova, Imbituba, SC, CEP 88780-000" />
        </p>
      </div>
      <hr className='space' />
      <div className='grid' style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem',
      }}>
        {gifts.map(gift => renderGiftCard(gift, false, navigate))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Heart className='heart' size={48} color={colors.primary} style={{ fill: colors.primary }} />
        <h5>Com amor,</h5>
        <h2 style={{ marginTop: 0 }}>Daiane e Cássio</h2>
      </div>
      {gifts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: colors.darkGray }}>
          <p>No gifts have been added yet.</p>
        </div>
      )}
    </div>
  );

  const renderLoginPage = (navigate) => (
    <div style={{ padding: '2rem 1rem', maxWidth: '400px', margin: '2rem auto' }}>
      <div style={{ background: colors.white, padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: colors.text, marginBottom: '1.5rem', fontWeight: '300' }}>Admin Login</h2>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>Email</label>
            <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.gray}`, borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>Password</label>
            <input type="password" value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              onKeyPress={(e) => { if (e.key === 'Enter') handleLogin(e, navigate); }}
              style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.gray}`, borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
          </div>
          <button onClick={(e) => handleLogin(e, navigate)} style={{
            width: '100%', padding: '1rem', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
            color: colors.white, border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '500', cursor: 'pointer'
          }}>Login</button>
        </div>
        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: colors.darkGray }}>
          Default: admin@wedding.com / wedding2024
        </p>
      </div>
    </div>
  );

  const renderAdminDashboard = (navigate) => (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '2rem', margin: 0, color: colors.text, fontWeight: '300' }}>Gift Management</h2>
        <button onClick={() => { setEditingGift(null); setGiftForm({ name: '', description: '', image_url: '', purchase_link: '' }); navigate('/add-gift'); }}
          style={{
            padding: '0.75rem 1.5rem', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
            color: colors.white, border: 'none', borderRadius: '8px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: '500'
          }}><Plus size={20} /> Add New Gift</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {gifts.map(gift => renderGiftCard(gift, true, navigate))}
      </div>
      {gifts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: colors.lightGray, borderRadius: '12px' }}>
          <Gift size={64} color={colors.gray} style={{ marginBottom: '1rem' }} />
          <p style={{ color: colors.darkGray, fontSize: '1.1rem' }}>No gifts yet. Add your first gift to get started!</p>
        </div>
      )}
    </div>
  );

  const renderGiftForm = (navigate) => (
    <div style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: colors.white, padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '1.5rem', color: colors.text, fontWeight: '300' }}>{editingGift ? 'Edit Gift' : 'Add New Gift'}</h2>
        <div>
          {[
            { label: 'Gift Name *', key: 'name', type: 'text', placeholder: '' },
            { label: 'Image URL', key: 'image_url', type: 'url', placeholder: 'https://example.com/image.jpg' },
            { label: 'Purchase Link', key: 'purchase_link', type: 'url', placeholder: 'https://amazon.com/...' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>{label}</label>
              <input type={type} value={giftForm[key]} placeholder={placeholder}
                onChange={(e) => setGiftForm({ ...giftForm, [key]: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.gray}`, borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>Description</label>
            <textarea value={giftForm.description} onChange={(e) => setGiftForm({ ...giftForm, description: e.target.value })} rows="3"
              style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.gray}`, borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={(e) => handleSaveGift(e, navigate)} style={{
              flex: 1, padding: '1rem', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
              color: colors.white, border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '500', cursor: 'pointer'
            }}>{editingGift ? 'Update Gift' : 'Add Gift'}</button>
            <button onClick={() => { setEditingGift(null); setGiftForm({ name: '', description: '', image_url: '', purchase_link: '' }); navigate('/dashboard'); }}
              style={{ padding: '1rem 1.5rem', background: colors.lightGray, color: colors.text, border: `1px solid ${colors.gray}`, borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPurchaseModal = () => {
    if (!selectedGift) return null;
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 1000
      }}>
        <div style={{
          background: colors.white, borderRadius: '12px', padding: '2rem', maxWidth: '500px', width: '100%',
          maxHeight: '90vh', overflow: 'auto', position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}>
          <button onClick={() => { setSelectedGift(null); setPurchaseForm({ name: '', message: '' }); }}
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: colors.darkGray }}>
            <X size={24} />
          </button>
          <h2 style={{ marginBottom: '1rem', color: colors.text, fontWeight: '300', paddingRight: '2rem' }}>Confirmar Presente</h2>
          <p style={{ color: colors.darkGray, marginBottom: '1.5rem' }}>Você está marcando <strong>{selectedGift.name}</strong> como comprado.</p>
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>Seu Nome *</label>
              <input type="text" value={purchaseForm.name} onChange={(e) => setPurchaseForm({ ...purchaseForm, name: e.target.value })}
                placeholder="Digite seu nome"
                style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.gray}`, borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>Mensagem Opcional</label>
              <textarea value={purchaseForm.message} onChange={(e) => setPurchaseForm({ ...purchaseForm, message: e.target.value })}
                placeholder="Deixe uma mensagem carinhosa pro casal..." rows="3"
                style={{ width: '100%', padding: '0.75rem', border: `1px solid ${colors.gray}`, borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={handlePurchaseGift} style={{
                flex: 1, padding: '1rem', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: colors.white, border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', fontFamily: 'Playfair Display'
              }}>Confirmar Compra</button>
              <button onClick={() => { setSelectedGift(null); setPurchaseForm({ name: '', message: '' }); }}
                style={{ padding: '1rem 1.5rem', background: colors.lightGray, color: colors.text, border: `1px solid ${colors.gray}`, borderRadius: '8px', fontFamily: 'Playfair Display', fontSize: '1rem', cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      {({ path, navigate }) => (
        <div style={{ minHeight: '100vh', background: colors.lightGray }}>

          {/* ── NEW CINEMATIC HERO ── */}
          <HeroSection
            isAdmin={isAdmin}
            path={path}
            navigate={navigate}
            handleLogout={handleLogout}
          />

          {path === '/' && renderHomePage(navigate)}
          {path === '/admin' && renderLoginPage(navigate)}
          {path === '/dashboard' && isAdmin && renderAdminDashboard(navigate)}
          {(path === '/add-gift' || path === '/edit-gift') && isAdmin && renderGiftForm(navigate)}

          {(path === '/dashboard' || path === '/add-gift' || path === '/edit-gift') && !isAdmin && (
            <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
              <p style={{ color: colors.darkGray, marginBottom: '1rem' }}>Please log in to access this page.</p>
              <button onClick={() => navigate('/admin')} style={{
                padding: '0.75rem 1.5rem', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: colors.white, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '500'
              }}>Go to Login</button>
            </div>
          )}

          {renderPurchaseModal()}
        </div>
      )}
    </Router>
  );
};

export default WeddingGiftList;