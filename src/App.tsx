import React, { useState } from 'react';
import { Utensils, Soup, Carrot, Coffee, EggFried, Wheat } from 'lucide-react';
import { motion } from 'motion/react';

const menuData = [
  { id:1, nama:'Lontong', desc:'tersedia lontong sayur dan Oncom!', harga:2000, image:'/lontong.png' },
  { id:2, nama:'Tahu isi', desc:'tahu goreng dengan isi sayur', harga:2000, image:'/tahu isi.png' },
  { id:3, nama:'Bakwan', desc:'Bakwan sayur dengan aneka sayuran segar', harga:2000, image:'/bakwan.png' },
];

export default function App() {
  const [keranjang, setKeranjang] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedItemId, setAddedItemId] = useState<number | null>(null);

  const formatRp = (angka: number) => {
    return 'Rp ' + angka.toLocaleString('id-ID');
  };

  const tambahKeranjang = (item: any) => {
    setKeranjang(prev => {
      const existing = prev.find(k => k.id === item.id);
      if (existing) {
        return prev.map(k => k.id === item.id ? { ...k, qty: k.qty + 1 } : k);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    
    setAddedItemId(item.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1000);
  };

  const cartCount = keranjang.reduce((s, k) => s + k.qty, 0);
  const totalHarga = keranjang.reduce((s, k) => s + k.harga * k.qty, 0);

  const pesanWA = () => {
    if (keranjang.length === 0) return;
    let pesan = 'Halo Mama Badru, saya mau pesan:%0A%0A';
    keranjang.forEach(k => {
      pesan += `- ${k.nama} x${k.qty} = ${formatRp(k.harga * k.qty)}%0A`;
    });
    pesan += `%0ATotal: ${formatRp(totalHarga)}%0A%0ATerima kasih!`;
    window.open(`https://wa.me/6285819410509?text=${pesan}`, '_blank');
  };

  return (
    <>
      <header>
        <div className="logo">🍱 Lontong & Gorengan<br/><span>Mama Badru</span></div>
        <nav>
          <a href="#menu">Menu</a>
          <a href="#cara-pesan">Cara Pesan</a>
          <a href="#kontak">Pesan Sekarang</a>
        </nav>
      </header>

      <motion.div 
        className="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Utensils className="hero-decor decor-1" size={64} />
        <Soup className="hero-decor decor-2" size={80} />
        <Carrot className="hero-decor decor-3" size={56} />
        <Coffee className="hero-decor decor-4" size={72} />
        <EggFried className="hero-decor decor-5" size={64} />
        <Wheat className="hero-decor decor-6" size={80} />
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Lontong dan Gorengan<br/>Mama Badru
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Masakan rumahan yang lezat, fresh tiap hari, harga bersahabat untuk semua kalangan!
        </motion.p>
        <motion.a 
          href="#menu" 
          className="btn-pesan"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          🛒 Lihat Menu Lengkap
        </motion.a>
      </motion.div>

      <section id="menu">
        <h2 className="section-title">Menu Andalan Kami</h2>

        <div className="menu-grid">
          {menuData.map(item => (
            <div className="card" key={item.id}>
              <div className="card-img">
                <img src={item.image} alt={item.nama} />
              </div>
              <div className="card-body">
                <div className="card-name">{item.nama}</div>
                <div className="card-desc">{item.desc}</div>
                <div className="card-footer">
                  <span className="harga">{formatRp(item.harga)}</span>
                  <button 
                    className="btn-tambah" 
                    onClick={() => tambahKeranjang(item)}
                    style={addedItemId === item.id ? { background: '#4CAF50' } : {}}
                  >
                    {addedItemId === item.id ? '✓ Ditambah!' : '+ Tambah'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ padding: '0 0 60px' }}>
        <div className="keunggulan-bg">
          <div className="unggulan-item">
            <div className="icon">🌿</div>
            <h3>Bahan Segar</h3>
            <p>Kami pilih bahan terbaik setiap pagi dari pasar lokal</p>
          </div>
          <div className="unggulan-item">
            <div className="icon">💰</div>
            <h3>Harga Terjangkau</h3>
            <p>Mulai Rp 2.000 sudah bisa menikmati gorengan gurih kami</p>
          </div>
          <div className="unggulan-item">
            <div className="icon">🚀</div>
            <h3>Antar Cepat atau Jemput</h3>
            <p>Pesan via WhatsApp, langsung diantar ke lokasi Anda atau ambil di tempat</p>
          </div>
        </div>
      </div>

      <section id="cara-pesan" style={{ background: 'transparent' }}>
        <h2 className="section-title">Cara Pesan</h2>
        <p className="section-sub">Mudah banget, cuma 3 langkah!</p>
        <div className="langkah-grid">
          <div className="langkah">
            <div className="langkah-num">1</div>
            <h3>Pilih Menu</h3>
            <p>Lihat menu di bawah dan pilih yang kamu mau</p>
          </div>
          <div className="langkah">
            <div className="langkah-num">2</div>
            <h3>Hubungi WhatsApp</h3>
            <p>Klik tombol WhatsApp dan kirimkan pesananmu</p>
          </div>
          <div className="langkah">
            <div className="langkah-num">3</div>
            <h3>Terima Pesanan</h3>
            <p>Pesanan diantar atau bisa diambil langsung di warung</p>
          </div>
        </div>
      </section>

      <section id="kontak">
        <div className="kontak-wrap">
          <h2>📱 Pesan Sekarang!</h2>
          <p>Kami juga menerima pesanan dalam jumlah besar untuk acara buka puasa bersama, pengajian, atau acara keluarga dll. Hubungi kami untuk penawaran spesial!</p>
          <a href="https://wa.me/6285819410509?text=Halo%20Mama%20Badru,%20saya%20mau%20pesan..." className="btn-wa" target="_blank" rel="noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Pesan via WhatsApp
          </a>
          <div className="jam-buka">
            <p>⏰ <strong>Jam Buka:</strong> Senin – Sabtu, 06.00 – 11.30 WIB</p>
            <p>📍 <strong>Lokasi:</strong> Citra Indah City, Bukit Aster</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 <strong>Lontong & Gorengan Mama Badru</strong>. Dibuat dengan ❤️ untuk pelanggan setia kami.</p>
      </footer>

      <button className="cart-btn" onClick={() => setIsModalOpen(true)}>
        🛒 Keranjang
        <div className="cart-badge">{cartCount}</div>
      </button>

      <div 
        className={`modal-overlay ${isModalOpen ? 'aktif' : ''}`} 
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}
      >
        <div className="modal">
          <h2>🛒 Keranjang Belanja</h2>
          
          {keranjang.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#9B7B5A', padding: '20px' }}>
              Keranjang masih kosong 🛒<br/>Yuk pilih menu dulu!
            </p>
          ) : (
            <>
              <div>
                {keranjang.map(k => (
                  <div className="item-keranjang" key={k.id}>
                    <div>
                      <span>{k.emoji} {k.nama}</span><br/>
                      <small>{formatRp(k.harga)} × {k.qty}</small>
                    </div>
                    <strong>{formatRp(k.harga * k.qty)}</strong>
                  </div>
                ))}
              </div>
              <div className="total-baris" style={{ display: 'flex' }}>
                <span>Total</span><span>{formatRp(totalHarga)}</span>
              </div>
            </>
          )}

          <div className="modal-actions">
            <button className="btn-tutup" onClick={() => setIsModalOpen(false)}>Tutup</button>
            <button className="btn-konfirm" onClick={pesanWA}>📱 Pesan via WA</button>
          </div>
        </div>
      </div>
    </>
  );
}
