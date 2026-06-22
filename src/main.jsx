import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CalendarDays,
  ChevronUp,
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
  X,
} from "lucide-react";
import "./styles.css";
import { GUESTS, getGuestFromUrl } from "./data/guests";
import anhTotNghiep from "./img/anh.png";
import sticker1 from "./img/stickers/1.png";
import sticker2 from "./img/stickers/2.png";
import sticker3 from "./img/stickers/3.png";
import sticker4 from "./img/stickers/4.png";
import sticker5 from "./img/stickers/5.png";
import sticker6 from "./img/stickers/6.png";
import sticker7 from "./img/stickers/7.png";
import truong from "./img/truong.jpg";

const CONFIG = {
  graduateName: "Trần Hồng Hạnh",
  shortName: "Hồng Hạnh",
  className: "Khóa tốt nghiệp 2026",
  school: "Học viện Ngoại giao",
  dateLabel: "26.06.2026",
  ceremonyDate: "2026-06-26T00:00:00+07:00",
  timeLabel: "",
  venueName: "Tòa D Học viện Ngoại giao",
  venueAddress: "69 Chùa Láng, Đống Đa, Hà Nội",
  partyName: "Sunshine Garden Restaurant",
  partyTime: "18:00 tối cùng ngày",
  mapsUrl: "https://maps.google.com/?q=Hoc%20vien%20Ngoai%20giao%20Ha%20Noi",
  galleryUrl: "https://drive.google.com/drive/folders/1aJKdEQHgvThvpFy1xgoeuoqG7Aqn86QM?usp=sharing",
  dressCode: "Trang phục lịch sự, ưu tiên tone trắng, kem, xanh navy hoặc đen để ảnh kỷ niệm hài hòa.",
  audioUrl:
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2c4a49b338.mp3?filename=inspiring-cinematic-ambient-116199.mp3",
  portrait: anhTotNghiep,
  secondPortrait:
    truong,
  photos: [
    anhTotNghiep,
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=85",
  ],
};

const GOOGLE_FORM = {
  enabled: true,
  action:
    "https://docs.google.com/forms/d/e/1FAIpQLSfw7tQ_PAK11KHgpp-uQegfmsuYUVnO-O1w_laMP3UUydb-qw/formResponse",
  fields: {
    guestId: "entry.731183052",
    guestName: "entry.1386012636",
    attendStatus: "entry.435539801",
  },
};

function saveMockRsvp(payload) {
  const key = "graduation-rsvp-demo";
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  current.push({ ...payload, submittedAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(current));
}

async function submitRsvp(payload) {
  if (!GOOGLE_FORM.enabled || !GOOGLE_FORM.action) {
    saveMockRsvp(payload);
    return { mode: "mock" };
  }

  const formData = new FormData();
  formData.append(GOOGLE_FORM.fields.guestId, payload.guestId);
  formData.append(GOOGLE_FORM.fields.guestName, payload.guestName);
  formData.append(GOOGLE_FORM.fields.attendStatus, payload.attendStatus);

  await fetch(GOOGLE_FORM.action, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });

  return { mode: "google-form" };
}

const INTRO_STICKERS = [
  { src: sticker1, className: "sticker sticker-1" },
  { src: sticker2, className: "sticker sticker-2" },
  { src: sticker3, className: "sticker sticker-3" },
  { src: sticker4, className: "sticker sticker-4" },
  { src: sticker5, className: "sticker sticker-5" },
  { src: sticker6, className: "sticker sticker-6" },
  { src: sticker7, className: "sticker sticker-7" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -70px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountdown(targetDate) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(target - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return timeLeft;
}

function createConfetti() {
  const root = document.createElement("div");
  root.className = "confetti-root";
  document.body.appendChild(root);

  Array.from({ length: 68 }).forEach((_, index) => {
    const piece = document.createElement("span");
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
      <button
        className={playing ? "music-float is-playing" : "music-float"}
        onClick={toggle}
        aria-label="Bật hoặc tắt nhạc nền"
      >
        {playing ? <Pause size={17} /> : <Play size={17} />}
        <Music size={14} />
      </button>
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["intro", "Thiệp mời"],
    ["invitation", "Thông tin"],
    ["venue", "Địa điểm"],
    ["rsvp", "Xác nhận"],
    ["thanks", "Cảm ơn"],
  ];
  return (
    <header className="site-header">
      <a className="brand" href="#intro" aria-label="Về đầu trang">
        <span>
          <GraduationCap size={18} />
        </span>
        Thiệp tốt nghiệp
      </a>
      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
        aria-label="Mở menu"
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={open ? "nav is-open" : "nav"}>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function WaxSeal({ small = false }) {
  return (
    <span className={small ? "wax-seal small" : "wax-seal"} aria-hidden="true">
      <Heart size={small ? 16 : 23} />
    </span>
  );
}

function EnvelopeIntro() {
  const openInvite = () => {
    document
      .querySelector("#invitation")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="intro" className="intro">
      <div className="paper-grain" />

      <div className="intro-stickers" aria-hidden="true">
        {INTRO_STICKERS.map((item) => (
          <img
            key={item.className}
            src={item.src}
            className={item.className}
            alt=""
            loading="eager"
            draggable="false"
          />
        ))}
      </div>

      <div className="intro-copy" data-reveal>
        <h1>Graduation Invitation</h1>
        <span>♥</span>
      </div>

      <button
        className="envelope-stage"
        onClick={openInvite}
        aria-label="Xem thiệp mời tốt nghiệp"
      >
        <div className="tap-hint">Chạm để xem thiệp</div>
        <div className="envelope">
          <div className="envelope-back" />
          <div className="letter-peek">
            {/* <GraduationCap size={24} /> */}
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

function MainInvitation({ guest }) {
  const t = useCountdown(CONFIG.ceremonyDate);
  const countdown = [
    ["Ngày", t.days],
    ["Giờ", t.hours],
    ["Phút", t.minutes],
    ["Giây", t.seconds],
  ];

  return (
    <section id="invitation" className="section invite-v6-section">
      <div className="invite-v6-shell">
        <article className="invite-v6-card" data-reveal>
          <span className="invite-v6-pattern" aria-hidden="true" />
          <header className="invite-v6-header">
            <p>Thư mời tham dự</p>
            <br />
            <h2>Lễ tốt nghiệp</h2>
          </header>

          <div className="invite-v6-content">
            <div className="invite-v6-copy">
              <p className="invite-v6-kicker">{guest.greeting}</p>
              <p>{guest.message}</p>
            </div>

            <div className="invite-person-photo">
              <img src={CONFIG.portrait} alt="Ảnh tốt nghiệp Trần Hồng Hạnh" />
            </div>
          </div>

          <footer className="invite-v6-footer">
            <div className="invite-v6-date">
              <span>Ngày tổ chức</span>
              <strong>{CONFIG.dateLabel}</strong>
            </div>
            <div className="invite-v6-place">
              <strong>{CONFIG.school}</strong>
              <span>{CONFIG.venueAddress}</span>
            </div>
          </footer>
        </article>

        <div className="countdown-grid compact invite-countdown" data-reveal>
          {countdown.map(([label, value]) => (
            <div className="count-box" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VenueSection() {
  return (
    <section id="venue" className="section venue-section">
      <div className="page-shell">
        <article className="venue-card paper-card" data-reveal>
          <span className="ribbon">Thông tin buổi chụp</span>
          <div className="venue-block">
            <CalendarDays size={22} />
            <div>
              <strong>{CONFIG.dateLabel}</strong>
              <p>Thời gian: 17h-18h30</p>
            </div>
          </div>
          <div className="venue-block">
            <MapPin size={22} />
            <div>
              <strong>{CONFIG.venueName}</strong>
              <p>{CONFIG.venueAddress}</p>
              <p><i>(mọi người gửi xe trong trường luôn nhé)</i></p>
            </div>
          </div>
          <div className="venue-block">
            <GraduationCap size={22} />
            <div>
              <strong>Trang phục</strong>
              <p>{CONFIG.dressCode}</p>
            </div>
          </div>
          <a
            className="btn dark"
            href={CONFIG.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Navigation size={18} /> Chỉ đường
          </a>
          <img
            className="corner-photo"
            src={CONFIG.secondPortrait}
            alt="Không khí tốt nghiệp"
          />
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
        <a
          className="album-link-card"
          href={CONFIG.galleryUrl}
          target="_blank"
          rel="noreferrer"
          data-reveal
        >
          <span className="album-link-icon">
            <GraduationCap size={28} />
          </span>
          <div>
            <strong>Link nhận ảnh sau buổi chụp</strong>
            <p>
              Sau ngày chụp, Hạnh sẽ cập nhật toàn bộ ảnh tốt nghiệp vào thư mục
              Drive này để mọi người xem và tải về.
            </p>
          </div>
          <span className="album-link-cta">Mở Google Drive</span>
        </a>
      </div>
    </section>
  );
}

function RsvpSection({ guest }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMode, setSaveMode] = useState("mock");

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      guestId: guest.id,
      guestName: formData.get("guestName") || guest.displayName,
      attendStatus: formData.get("attendStatus"),
    };

    setSaving(true);
    try {
      const result = await submitRsvp(payload);
      setSaveMode(result.mode);
      setSent(true);
      createConfetti();
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="rsvp" className="section rsvp-section">
      <div className="page-shell">
        <article className="rsvp-card paper-card" data-reveal>
          <WaxSeal small />
          <p>Vui lòng phản hồi</p>
          <h2>RSVP</h2>
          <span>
            Xác nhận giúp Hạnh để chuẩn bị chu đáo hơn cho ngày tốt nghiệp nhé.
          </span>
          <button className="btn dark" onClick={() => setOpen(true)}>
            Xác nhận tham dự
          </button>
        </article>
      </div>

      {open && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="rsvp-modal">
            <button
              className="close-modal"
              onClick={() => setOpen(false)}
              aria-label="Đóng form RSVP"
            >
              <X size={20} />
            </button>
            {!sent ? (
              <form onSubmit={submit}>
                <p className="modal-kicker">Xác nhận tham dự</p>
                <h3>Hẹn gặp bạn trong ngày tốt nghiệp</h3>
                <label>
                  Họ và tên
                  <input
                    name="guestName"
                    required
                    defaultValue={guest.displayName}
                    placeholder="Nhập tên của bạn"
                  />
                </label>
                <label>
                  Bạn có thể tham dự không?
                  <select name="attendStatus" required defaultValue="">
                    <option value="" disabled>
                      Chọn câu trả lời
                    </option>
                    <option value="Có, mình sẽ tham dự">Có, mình sẽ tham dự</option>
                    <option value="Rất tiếc, mình không thể tham dự">
                      Rất tiếc, mình không thể tham dự
                    </option>
                  </select>
                </label>
                <button className="btn gold" type="submit" disabled={saving}>
                  <Send size={18} /> {saving ? "Đang gửi..." : "Gửi phản hồi"}
                </button>
              </form>
            ) : (
              <div className="success-note">
                <Sparkles size={44} />
                <h3>Cảm ơn bạn!</h3>
                <p>
                  Phản hồi đã được ghi nhận {saveMode === "mock" ? "ở chế độ demo trên trình duyệt" : "vào Google Form"}.
                </p>
                <button className="btn gold" onClick={() => setOpen(false)}>
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ThankYouCard({ guest }) {
  return (
    <section id="thanks" className="section thanks-section">
      <div className="page-shell">
        <article className="thank-card" data-reveal>
          <img src={CONFIG.portrait} alt="Ảnh cảm ơn" />
          <div>
            <p>THANK YOU</p>
            <h2>Cảm Ơn Mọi Người!</h2>
            <span>Hẹn gặp {guest.displayName} tại lễ tốt nghiệp!</span>
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
      <a href="#intro">
        <ChevronUp size={18} />
      </a>
      <a href="#invitation">
        <CalendarDays size={18} />
      </a>
      <a href="#venue">
        <MapPin size={18} />
      </a>
      <a href="#rsvp">
        <MessageCircle size={18} />
      </a>
    </div>
  );
}


function AdminGuestLinks() {
  const baseUrl = `${window.location.origin}${window.location.pathname}`;

  const copyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Đã copy link mời");
    } catch {
      window.prompt("Copy link này:", url);
    }
  };

  return (
    <main className="admin-invite-page">
      <section className="section admin-section">
        <div className="page-shell admin-card" data-reveal>
          <p className="admin-kicker">Demo quản lý lời mời</p>
          <h1>Danh sách link cá nhân</h1>
          <p className="admin-note">
            Mỗi khách mời có một link riêng. Sau này bạn chỉ cần sửa danh sách trong
            <code> src/data/guests.js </code>.
          </p>

          <div className="guest-table">
            {Object.entries(GUESTS).map(([id, guest]) => {
              const url = `${baseUrl}?guest=${id}`;
              return (
                <div className="guest-row" key={id}>
                  <div>
                    <strong>{guest.name}</strong>
                    <span>{guest.group}</span>
                  </div>
                  <input value={url} readOnly aria-label={`Link mời ${guest.name}`} />
                  <button type="button" onClick={() => copyLink(url)}>
                    Copy
                  </button>
                </div>
              );
            })}
          </div>

          <div className="admin-note-box">
            <strong>Link nhanh theo tên bất kỳ:</strong>
            <span>{baseUrl}?to=Cô%20Lan</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  useReveal();
  const params = new URLSearchParams(window.location.search);
  const isAdmin = params.get("admin") === "1";
  const guest = getGuestFromUrl();

  if (isAdmin) {
    return <AdminGuestLinks />;
  }

  return (
    <>
      <Header />
      <MusicButton />
      <main>
        <EnvelopeIntro />
        <MainInvitation guest={guest} />
        <VenueSection />
        <GallerySection />
        <RsvpSection guest={guest} />
        <ThankYouCard guest={guest} />
      </main>
      <FloatingNav />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
