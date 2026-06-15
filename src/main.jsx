import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays,
  ChevronUp,
  Gift,
  GraduationCap,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Music,
  Navigation,
  Pause,
  Play,
  Send,
  Sparkles,
  X
} from 'lucide-react';
import './styles.css';

const CONFIG = {
  graduateName: 'Trần Hồng Hạnh',
  shortName: 'Hồng Hạnh',
  className: 'Lớp 1234',
  school: 'Học Viện Ngoại Giao',
  dateLabel: '28.06.2026',
  ceremonyDate: '2026-06-28T08:30:00+07:00',
  timeLabel: '08:30 sáng',
  venueName: 'Hội trường A - Học Viện Ngoại Giao',
  venueAddress: 'Chùa Láng, Đống Đa',
  partyName: 'Sunshine Garden Restaurant',
  partyTime: '18:00 tối cùng ngày',
  mapsUrl: 'https://maps.google.com/?q=Ho%20Chi%20Minh%20City',
  audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2c4a49b338.mp3?filename=inspiring-cinematic-ambient-116199.mp3',
  portrait: 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=1200&q=85',
  secondPortrait: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=85',
  photos: [
    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=85'
  ]
};

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -70px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountdown(targetDate) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(target - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return timeLeft;
}

function createConfetti() {
  const root = document.createElement('div');
  root.className = 'confetti-root';
  document.body.appendChild(root);

  Array.from({ length: 68 }).forEach((_, index) => {
    const piece = document.createElement('span');
    piece.className = `confetti-piece confetti-${index % 5}`;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.75}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 2.2}s`;
    root.appendChild(piece);
  });

  window.setTimeout(() => root.remove(), 5200);
}

function MusicButton() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={CONFIG.audioUrl} loop preload="none" />
      <button className={playing ? 'music-float is-playing' : 'music-float'} onClick={toggle} aria-label="Bật hoặc tắt nhạc nền">
        {playing ? <Pause size={17} /> : <Play size={17} />}
        <Music size={14} />
      </button>
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['intro', 'Thiệp mời'],
    ['invitation', 'Thông tin'],
    ['venue', 'Địa điểm'],
    ['rsvp', 'Xác nhận'],
    ['thanks', 'Cảm ơn']
  ];
  return (
    <header className="site-header">
      <a className="brand" href="#intro" aria-label="Về đầu trang">
        <span><GraduationCap size={18} /></span>
        Thiệp tốt nghiệp
      </a>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Mở menu">
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={open ? 'nav is-open' : 'nav'}>
        {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  );
}

function WaxSeal({ small = false }) {
  return (
    <span className={small ? 'wax-seal small' : 'wax-seal'} aria-hidden="true">
      <Heart size={small ? 16 : 23} />
    </span>
  );
}

function EnvelopeIntro() {
  const [opened, setOpened] = useState(false);

  const openInvite = () => {
    setOpened(true);
    createConfetti();
    window.setTimeout(() => {
      document.querySelector('#card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 780);
  };

  return (
    <section id="intro" className={opened ? 'intro is-opened' : 'intro'}>
      <div className="paper-grain" />
      <div className="intro-copy" data-reveal>
        <p>Trân trọng kính mời</p>
        <h1>Tham dự lễ tốt nghiệp</h1>
        <span>♥</span>
      </div>

      <button className="envelope-stage" onClick={openInvite} aria-label="Mở thiệp mời tốt nghiệp">
        <div className="tap-hint">Chạm để mở thiệp</div>
        <div className="envelope">
          <div className="envelope-back" />
          <div className="letter-peek">
            <GraduationCap size={24} />
            <strong>{CONFIG.shortName}</strong>
            <span>{CONFIG.dateLabel}</span>
          </div>
          <div className="envelope-flap" />
          <div className="envelope-front" />
          <WaxSeal />
        </div>
      </button>
    </section>
  );
}

function InviteHeroCard() {
  return (
    <section id="card" className="section card-section">
      <div className="page-shell">
        <div className="layered-card" data-reveal>
          <div className="paper-card back-card" />
          <div className="paper-card mid-card">
            <p>You're Invited</p>
            <strong>Lễ Tốt Nghiệp</strong>
          </div>
          <div className="photo-polaroid">
            <img src={CONFIG.portrait} alt="Ảnh tốt nghiệp" />
            <span>{CONFIG.className}</span>
          </div>
          <div className="note-card">
            <small>Xin mời bạn đến chung vui</small>
            <h2>{CONFIG.graduateName}</h2>
            <p>{CONFIG.school}</p>
          </div>
          <WaxSeal small />
        </div>
      </div>
    </section>
  );
}

function MainInvitation() {
  const t = useCountdown(CONFIG.ceremonyDate);
  const countdown = [
    ['Ngày', t.days],
    ['Giờ', t.hours],
    ['Phút', t.minutes],
    ['Giây', t.seconds]
  ];
  return (
    <section id="invitation" className="section invitation-section">
      <div className="page-shell">
        <article className="main-invite paper-card" data-reveal>
          <div className="circle-text" aria-hidden="true">GRADUATION • GRADUATION • GRADUATION •</div>
          <div className="oval-frame">
            <img src={CONFIG.portrait} alt="Chân dung tốt nghiệp" />
          </div>
          <p className="section-kicker">Lễ tốt nghiệp</p>
          <h2>{CONFIG.graduateName}</h2>
          <p className="invite-message">
            Sau một hành trình dài của nỗ lực, yêu thương và trưởng thành, mình rất mong được gặp bạn trong ngày đặc biệt này.
          </p>
          <div className="big-date">
            <span>{CONFIG.dateLabel}</span>
            <strong>{CONFIG.timeLabel}</strong>
          </div>
          <div className="countdown-grid compact">
            {countdown.map(([label, value]) => (
              <div className="count-box" key={label}>
                <strong>{String(value).padStart(2, '0')}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function VenueSection() {
  return (
    <section id="venue" className="section venue-section">
      <div className="page-shell">
        <article className="venue-card paper-card" data-reveal>
          <span className="ribbon">Địa điểm</span>
          <h2>VENUE</h2>
          <div className="venue-block">
            <CalendarDays size={22} />
            <div>
              <strong>{CONFIG.dateLabel} · {CONFIG.timeLabel}</strong>
              <p>Lễ trao bằng và chụp ảnh lưu niệm.</p>
            </div>
          </div>
          <div className="venue-block">
            <MapPin size={22} />
            <div>
              <strong>{CONFIG.venueName}</strong>
              <p>{CONFIG.venueAddress}</p>
            </div>
          </div>
          <a className="btn dark" href={CONFIG.mapsUrl} target="_blank" rel="noreferrer">
            <Navigation size={18} /> Chỉ đường
          </a>
          <img className="corner-photo" src={CONFIG.secondPortrait} alt="Không khí tốt nghiệp" />
        </article>
      </div>
    </section>
  );
}

function AttireSection() {
  return (
    <section className="section attire-section">
      <div className="page-shell grid-two">
        <article className="mini-paper" data-reveal>
          <h2>TRANG PHỤC</h2>
          <p>Trang phục lịch sự, trang trọng. Khuyến khích tone trắng, kem, đen hoặc xanh navy để ảnh kỷ niệm thật hài hòa.</p>
          <div className="swatches" aria-label="Gợi ý màu trang phục">
            <span /><span /><span /><span />
          </div>
        </article>
        <article className="mini-paper dark-paper" data-reveal>
          <GraduationCap size={34} />
          <h2>TIỆC TRI ÂN</h2>
          <p>{CONFIG.partyName}</p>
          <strong>{CONFIG.partyTime}</strong>
          <small>Một buổi tối ấm cúng để gửi lời cảm ơn và lưu lại những khoảnh khắc cuối cùng của thời sinh viên.</small>
        </article>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="section gallery-section">
      <div className="page-shell">
        <div className="section-title" data-reveal>
          <p>Khoảnh khắc</p>
          <h2>ALBUM TỐT NGHIỆP</h2>
        </div>
        <div className="gallery-stack" data-reveal>
          {CONFIG.photos.map((photo, index) => (
            <figure key={photo} style={{ '--r': `${index % 2 ? 3 : -3}deg` }}>
              <img src={photo} alt={`Ảnh tốt nghiệp ${index + 1}`} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function RsvpSection() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
    createConfetti();
  };

  return (
    <section id="rsvp" className="section rsvp-section">
      <div className="page-shell">
        <article className="rsvp-card paper-card" data-reveal>
          <WaxSeal small />
          <p>Vui lòng phản hồi</p>
          <h2>RSVP</h2>
          <span>Để mình chuẩn bị chỗ ngồi và lưu lại lời chúc của bạn thật chu đáo.</span>
          <button className="btn dark" onClick={() => setOpen(true)}>Xác nhận tham dự</button>
        </article>
      </div>

      {open && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="rsvp-modal">
            <button className="close-modal" onClick={() => setOpen(false)} aria-label="Đóng form RSVP"><X size={20} /></button>
            {!sent ? (
              <form onSubmit={submit}>
                <p className="modal-kicker">Xác nhận tham dự</p>
                <h3>Hẹn gặp bạn trong ngày tốt nghiệp</h3>
                <label>
                  Họ và tên
                  <input required placeholder="Nhập tên của bạn" />
                </label>
                <label>
                  Bạn có thể tham dự không?
                  <select required defaultValue="">
                    <option value="" disabled>Chọn câu trả lời</option>
                    <option>Có, mình sẽ tham dự</option>
                    <option>Rất tiếc, mình không thể tham dự</option>
                  </select>
                </label>
                <label>
                  Số người đi cùng
                  <input type="number" min="0" placeholder="Ví dụ: 1" />
                </label>
                <label>
                  Lời chúc
                  <textarea rows="4" placeholder="Gửi một lời chúc nhỏ..." />
                </label>
                <button className="btn gold" type="submit"><Send size={18} /> Gửi phản hồi</button>
              </form>
            ) : (
              <div className="success-note">
                <Sparkles size={44} />
                <h3>Cảm ơn bạn!</h3>
                <p>Phản hồi đã được ghi nhận trên giao diện demo. Khi làm bản thật, phần này có thể nối Google Form, Sheet hoặc API riêng.</p>
                <button className="btn gold" onClick={() => setOpen(false)}>Đóng</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function GiftSection() {
  return (
    <section className="section gift-section">
      <div className="page-shell">
        <article className="gift-card paper-card" data-reveal>
          <Gift size={38} />
          <h2>LỜI CHÚC</h2>
          <p>Món quà quý nhất là sự hiện diện và lời chúc của bạn. Chỉ cần bạn đến, ngày hôm ấy đã trở nên trọn vẹn hơn rất nhiều.</p>
        </article>
      </div>
    </section>
  );
}

function ThankYouCard() {
  return (
    <section id="thanks" className="section thanks-section">
      <div className="page-shell">
        <article className="thank-card" data-reveal>
          <img src={CONFIG.portrait} alt="Ảnh cảm ơn" />
          <div>
            <p>THANK YOU</p>
            <h2>Cảm ơn vì đã là một phần trong hành trình của mình.</h2>
            <span>Hẹn gặp bạn tại lễ tốt nghiệp!</span>
            <strong>{CONFIG.shortName}</strong>
          </div>
        </article>
      </div>
    </section>
  );
}

function FloatingNav() {
  return (
    <div className="floating-nav" aria-label="Điều hướng nhanh">
      <a href="#intro"><ChevronUp size={18} /></a>
      <a href="#invitation"><CalendarDays size={18} /></a>
      <a href="#venue"><MapPin size={18} /></a>
      <a href="#rsvp"><MessageCircle size={18} /></a>
    </div>
  );
}

function App() {
  useReveal();
  return (
    <>
      <Header />
      <MusicButton />
      <main>
        <EnvelopeIntro />
        <InviteHeroCard />
        <MainInvitation />
        <VenueSection />
        <AttireSection />
        <GallerySection />
        <RsvpSection />
        <GiftSection />
        <ThankYouCard />
      </main>
      <FloatingNav />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
