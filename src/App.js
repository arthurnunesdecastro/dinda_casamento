import React, { useState, useEffect } from 'react';
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
      <MapPin className='mapIcon' color={colors.primary} style={{ marginTop: '0.2rem' }} />
      <div style={{ display: 'flex',  alignItems: 'center', justifyContent: 'space-between', }}>
        <div>
          <strong>{label}</strong>
          <div style={{ fontSize: '0.9rem', color: colors.darkGray }}>
            {address}
          </div>
        </div>
      </div>

      <ExternalLink className='mapIcon' color={colors.darkGray} />
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
        <div style={{ fontSize: '0.9rem', color: colors.darkGray }}>
          {name}
        </div>
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



  

  useEffect(() => {
    loadData();
  }, []);




  const loadData = async () => {


    const { data, error } = await supabase
      .from('gifts')
      .select('*');

    if (error) {
      console.error('SUPABASE ERROR:', error);
      alert('Erro ao carregar presentes');
      return;
    }

    console.log('GIFTS:', data);
    setGifts(data || []);
  };



  

  const handleLogin = async (e, navigate) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password
    });

    if (error) {
      alert('Login inválido');
      return;
    }

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

    if (!purchaseForm.name.trim()) {
      alert('Coloque seu nome, por favor');
      return;
    }

    const { error } = await supabase
      .from('gifts')
      .update({
        status: 'purchased',
        purchase_by: purchaseForm.name.trim(),
        purchase_message: purchaseForm.message.trim()
      })
      .eq('id', selectedGift.id);

    if (error) {
      alert('Erro ao salvar');
      console.error(error);
      return;
    }

    setSelectedGift(null);
    setPurchaseForm({ name: '', message: '' });
    loadData();
  };


  const handleSaveGift = async (e, navigate) => {
    e.preventDefault();

    if (!giftForm.name.trim()) {
      alert('Gift name is required');
      return;
    }

    if (editingGift) {
      await supabase
        .from('gifts')
        .update({
          name: giftForm.name,
          description: giftForm.description,
          image_url: giftForm.image_url,
          purchase_link: giftForm.purchase_link
        })
        .eq('id', editingGift.id);
    } else {
      await supabase.from('gifts').insert({
        name: giftForm.name,
        description: giftForm.description,
        image_url: giftForm.image_url,
        purchase_link: giftForm.purchase_link,
        status: 'available'
      });
    }

    setEditingGift(null);
    setGiftForm({ name: '', description: '', image_url: '', purchase_link: '' });
    loadData();
    navigate('/dashboard');
  };


  const handleDeleteGift = async (giftId) => {
    if (!window.confirm('Are you sure?')) return;

    await supabase
      .from('gifts')
      .delete()
      .eq('id', giftId);

    loadData();
  };


  const handleResetGift = async (giftId) => {
    if (!window.confirm('Reset this gift to available?')) return;

    const { error } = await supabase
      .from('gifts')
      .update({
        status: 'available',
        purchase_by: null,
        purchase_message: null
      })
      .eq('id', giftId);

    if (error) {
      console.error(error);
      alert('Erro ao resetar presente');
      return;
    }

    // Recarrega do banco
    loadData();
  };


  const handleEditGift = (gift, navigate) => {
    setEditingGift(gift);
    setGiftForm({
      name: gift.name,
      description: gift.description,
      image_url: gift.image_url,
      purchase_link: gift.purchase_link
    });
    navigate('/edit-gift');
  };

  const renderHeader = (path, navigate) => (
    <header>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className='date' style={{ color: colors.text }}>
          14/11/2026
        </p>
        <Heart size={48} style={{ marginBottom: '1rem', color: colors.primary, fill: colors.primary }} />
        <h1 className='title'>
          Daiane & Cássio
        </h1>
        <p className='heroMsg' style={{ color: colors.text }}>
          Obrigada por fazerem parte da nossa história. 
        </p>
        {isAdmin && (
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '0.5rem 1.5rem',
                background: path === '/' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.5)',
                color: colors.white,
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s'
              }}
            >
              Gift List
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '0.5rem 1.5rem',
                background: path === '/dashboard' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.5)',
                color: colors.white,
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s'
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleLogout(navigate)}
              style={{
                padding: '0.5rem 1.5rem',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.5)',
                color: colors.white,
                borderRadius: '25px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                transition: 'all 0.3s'
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );

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
          <img
            src={gift.image_url}
            alt={gift.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: colors.text, fontSize: '1.3rem', fontWeight: '400' }}>
          {gift.name}
        </h3>
        <p style={{ color: colors.darkGray, margin: '0 0 1rem 0', lineHeight: '1.6' }}>
          {gift.description}
        </p>
        
        {gift.status === 'purchased' && (
          <div style={{
            background: `linear-gradient(135deg, ${colors.gold}15, ${colors.gold}25)`,
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1rem',
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

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
          {gift.purchase_link && (
            <a
              href={gift.purchase_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                minWidth: '120px',
                padding: '0.75rem',
                background: colors.lightGray,
                color: colors.text,
                textAlign: 'center',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${colors.gray}`
              }}
            >
              Ver Presente
            </a>
          )}
          
          {!isAdminView && gift.status === 'available' && (
            <button
              onClick={() => setSelectedGift(gift)}
              style={{
                flex: 1,
                minWidth: '120px',
                padding: '0.75rem',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: colors.white,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Playfair Display',
                gap: '0.5rem'
              }}
            >
              <Gift size={18} /> Eu comprei isso
            </button>
          )}

          {isAdminView && (
            <>
              <button
                onClick={() => handleEditGift(gift, navigate)}
                style={{
                  padding: '0.75rem',
                  background: colors.primary,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <Edit2 size={16} /> Edit
              </button>
              {gift.status === 'purchased' && (
                <button
                  onClick={() => handleResetGift(gift.id)}
                  style={{
                    padding: '0.75rem',
                    background: colors.gold,
                    color: colors.white,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Reset
                </button>
              )}
              <button
                onClick={() => handleDeleteGift(gift.id)}
                style={{
                  padding: '0.75rem',
                  background: '#dc3545',
                  color: colors.white,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderHomePage = (navigate) => (
    <div className='hero'>
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        padding: '2rem',
        background: colors.lightGray,
        borderRadius: '12px'
      }}>
        <Gift className='gift' color={colors.primary} style={{ marginBottom: '2rem', marginTop: '3rem', }} />
        <h2>Nossa Lista de Presentes</h2>
              <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '2rem',
        background: colors.lightGray,
        borderRadius: '12px'
      }}>
        <p className='mainDesc'>
          Com o coração transbordando de alegria, queremos dizer que o maior presente para nós é ter vocês ao nosso lado nesse dia tão especial. Cada abraço, sorriso e momento compartilhado tornará o nosso "sim" ainda mais inesquecível.
          <br></br>
          Mas, se além da presença vocês desejarem contribuir para a realização do nosso sonho, ficaremos imensamente gratos.
          Deixamos disponível a chave PIX destinada à nossa lua de mel — um pedacinho do início da nossa vida juntos, que será lembrado com muito carinho em cada detalhe dessa viagem.<br></br>
          <hr className='space hide'></hr>
          <PixItem
            label="Noiva"
            name="Daiane Leopoldina Nunes"
            pixKey="06367630996"
          />
        </p>     
      </div>
        <p className='mainDesc'>
          Também, se preferirem, seguem algumas opções de presentes, como referência, para que possam escolher e adquirir onde acharem mais conveniente.
          Segue o endereço de entrega: <br></br>
          <hr className='space hide'></hr>
          <LocationItem
            label="Endereço"
            address="Rua Pedro Bitencourt, 974, Vila Nova, Imbituba, SC, CEP 88780-000"
          />
        </p>
      </div>
      <hr className='space'></hr>
      <div className='grid' style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
      }}>
        {gifts.map(gift => renderGiftCard(gift, false, navigate))}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Heart className='heart' size={48} color={colors.primary} style={{fill: colors.primary }} />
        <h5>Com amor,</h5>
        <h2 style={{marginTop: 0}}>Daiane e Cássio </h2>
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
      <div style={{
        background: colors.white,
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: colors.text, marginBottom: '1.5rem', fontWeight: '300' }}>
          Admin Login
        </h2>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>
              Email
            </label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>
              Password
            </label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin(e, navigate);
                }
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            onClick={(e) => handleLogin(e, navigate)}
            style={{
              width: '100%',
              padding: '1rem',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
              color: colors.white,
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Login
          </button>
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
        <button
          onClick={() => {
            setEditingGift(null);
            setGiftForm({ name: '', description: '', image_url: '', purchase_link: '' });
            navigate('/add-gift');
          }}
          style={{
            padding: '0.75rem 1.5rem',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
            color: colors.white,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
        >
          <Plus size={20} /> Add New Gift
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {gifts.map(gift => renderGiftCard(gift, true, navigate))}
      </div>

      {gifts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          background: colors.lightGray,
          borderRadius: '12px'
        }}>
          <Gift size={64} color={colors.gray} style={{ marginBottom: '1rem' }} />
          <p style={{ color: colors.darkGray, fontSize: '1.1rem' }}>No gifts yet. Add your first gift to get started!</p>
        </div>
      )}
    </div>
  );

  const renderGiftForm = (navigate) => (
    <div style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        background: colors.white,
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: colors.text, fontWeight: '300' }}>
          {editingGift ? 'Edit Gift' : 'Add New Gift'}
        </h2>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>
              Gift Name *
            </label>
            <input
              type="text"
              value={giftForm.name}
              onChange={(e) => setGiftForm({ ...giftForm, name: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>
              Description
            </label>
            <textarea
              value={giftForm.description}
              onChange={(e) => setGiftForm({ ...giftForm, description: e.target.value })}
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>
              Image URL
            </label>
            <input
              type="url"
              value={giftForm.image_url}
              onChange={(e) => setGiftForm({ ...giftForm, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>
              Purchase Link
            </label>
            <input
              type="url"
              value={giftForm.purchase_link}
              onChange={(e) => setGiftForm({ ...giftForm, purchase_link: e.target.value })}
              placeholder="https://amazon.com/..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={(e) => handleSaveGift(e, navigate)}
              style={{
                flex: 1,
                padding: '1rem',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: colors.white,
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {editingGift ? 'Update Gift' : 'Add Gift'}
            </button>
            <button
              onClick={() => {
                setEditingGift(null);
                setGiftForm({ name: '', description: '', image_url: '', purchase_link: '' });
                navigate('/dashboard');
              }}
              style={{
                padding: '1rem 1.5rem',
                background: colors.lightGray,
                color: colors.text,
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 1000
      }}>
        <div style={{
          background: colors.white,
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}>
          <button
            onClick={() => {
              setSelectedGift(null);
              setPurchaseForm({ name: '', message: '' });
            }}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: colors.darkGray
            }}
          >
            <X size={24} />
          </button>

          <h2 style={{ marginBottom: '1rem', color: colors.text, fontWeight: '300', paddingRight: '2rem' }}>
            Confirmar Presente
          </h2>
          <p style={{ color: colors.darkGray, marginBottom: '1.5rem' }}>
            Você está marcando <strong>{selectedGift.name}</strong> como comprado.
          </p>

          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>
                Seu Nome *
              </label>
              <input
                type="text"
                value={purchaseForm.name}
                onChange={(e) => setPurchaseForm({ ...purchaseForm, name: e.target.value })}
                placeholder="Digite seu nome"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.gray}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: colors.darkGray, fontSize: '0.9rem' }}>
                Mensagem Opcional
              </label>
              <textarea
                value={purchaseForm.message}
                onChange={(e) => setPurchaseForm({ ...purchaseForm, message: e.target.value })}
                placeholder="Deixe uma mensagem carinhosa pro casal..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${colors.gray}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handlePurchaseGift}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: 'Playfair Display'
                }}
              >
                Confirmar Compra
              </button>
              <button
                onClick={() => {
                  setSelectedGift(null);
                  setPurchaseForm({ name: '', message: '' });
                }}
                style={{
                  padding: '1rem 1.5rem',
                  background: colors.lightGray,
                  color: colors.text,
                  border: `1px solid ${colors.gray}`,
                  borderRadius: '8px',
                  fontFamily: 'Playfair Display',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
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
          {renderHeader(path, navigate)}
          
          {path === '/' && renderHomePage(navigate)}
          {path === '/admin' && renderLoginPage(navigate)}
          {path === '/dashboard' && isAdmin && renderAdminDashboard(navigate)}
          {(path === '/add-gift' || path === '/edit-gift') && isAdmin && renderGiftForm(navigate)}
          
          {/* Redirect to home if trying to access admin pages without login */}
          {(path === '/dashboard' || path === '/add-gift' || path === '/edit-gift') && !isAdmin && (
            <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
              <p style={{ color: colors.darkGray, marginBottom: '1rem' }}>
                Please log in to access this page.
              </p>
              <button
                onClick={() => navigate('/admin')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Go to Login
              </button>
            </div>
          )}
          
          {renderPurchaseModal()}
        </div>
      )}
    </Router>
  );
};

export default WeddingGiftList;