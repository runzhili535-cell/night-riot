import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { band, members } from './data';
import { fallbackPoster } from './assets';
import './styles.css';

function Icon({ name = 'arrow', ...props }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
    {name === 'play' ? <path d="m9 5 11 7-11 7V5Z" fill="currentColor" stroke="none" /> : name === 'close' ? <path d="m6 6 12 12M18 6 6 18" /> : name === 'sound' ? <><path d="M3 10v4m4-8v12m5-15v18m5-15v12m4-8v4" /></> : name === 'down' ? <path d="M12 3v18m-6-6 6 6 6-6" /> : <path d="M5 19 19 5M5 5h14v14" />}
  </svg>;
}

function MemberImage({ member, ...props }) {
  const [failed, setFailed] = useState(false);
  if (failed || !member.image) return <div className="image-fallback" role="img" aria-label={`${member.name} 的封面待更新`}><Icon name="sound" /><span>{member.name.toUpperCase()}</span></div>;
  return <img src={member.image} alt={`${member.name} · ${member.roleZh}`} onError={() => setFailed(true)} {...props} />;
}

function Navigation() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -55% 0px' });
    ['home', 'band', 'videos', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return <header className="header"><a className="wordmark" href="#home" aria-label="NIGHT RIOT 首页">NIGHT RIOT<span>®</span></a>
    <button className="menu-toggle" aria-expanded={expanded} aria-controls="navigation" onClick={() => setExpanded(!expanded)}>{expanded ? 'CLOSE −' : 'MENU +'}</button>
    <nav id="navigation" className={expanded ? 'expanded' : ''} aria-label="主导航">
      {[['home', 'HOME'], ['band', 'THE BAND'], ['videos', 'VIDEOS'], ['contact', 'CONTACT']].map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setExpanded(false)}>{label}</a>)}
    </nav><a className="header-note" href="#videos"><span className="status-dot" /> TURN IT UP <Icon name="sound" /></a>
  </header>;
}

function HeroSection() {
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <div className="hero-portraits" aria-hidden="true">{members.map(member => <div className={`hero-portrait hero-${member.id}`} key={member.id}><MemberImage member={member} fetchPriority="high" /></div>)}</div>
    <div className="hero-shade" /><div className="hero-beam" />
    <div className="hero-topline"><span><i className="status-dot" /> INDEPENDENT SPIRIT. UNFILTERED SOUND.</span><span>VOL. 01 / THE INTRODUCTION</span></div>
    <div className="hero-copy"><div className="hero-kicker"><span>FOUR SOULS. ONE SOUND.</span><span className="hero-cn">四种灵魂，一种声音。</span></div>
      <h1 id="hero-title">NIGHT RIOT<span className="hero-star">✳</span></h1>
      <div className="hero-bottom"><p>生于共鸣，响彻夜色。<br /><span>不设边界，不止于舞台。</span></p><a href="#band" className="button button-red">认识乐队 <Icon name="down" /></a><a className="hero-scroll" href="#about">SCROLL TO FEEL IT <span>↓</span></a></div>
    </div>
    <div className="hero-edge"><span>LOUDER TOGETHER.</span><span>01 — 04</span></div>
  </section>;
}

function AboutSection() {
  return <section className="about section-pad" id="about"><div className="section-label"><span className="red-square" /> THE SOUND OF US <span className="label-number">001</span></div>
    <div className="about-main"><h2>DIFFERENT SOULS.<br /><span>SAME FREQUENCY.</span></h2><div className="about-copy"><p>我们用失真的吉他撕开夜色，用低频的律动连接灵魂，用鼓点点燃每一个不甘平凡的瞬间。</p><p className="muted">四个不同的灵魂，在同一个节拍中找到共鸣。<br />这就是 NIGHT RIOT，我们的声音，也是我们的答案。</p><div className="genre-tags"><span>ALTERNATIVE ROCK</span><span>INDIE SPIRIT</span><span>LIVE ENERGY</span></div></div></div>
  </section>;
}

function BandMemberCard({ member, onSelect }) {
  return <article className="member-card" style={{ '--member-color': member.color }}>
    <button className="member-poster" onClick={() => onSelect(member)} aria-label={`观看 ${member.name} · ${member.roleZh} 的出场视频`}>
      <MemberImage member={member} loading="lazy" /><div className="poster-gradient" /><span className="poster-number">/ {member.number}</span><span className="poster-role">{member.role}</span>
      <div className="poster-bottom"><h3>{member.name.toUpperCase()}</h3><span className="poster-play"><Icon name="play" /></span></div>
      <span className="poster-watch">WATCH INTRO <span>↗</span></span>
    </button>
    <div className="member-info"><div><span className="red-square" /> {member.roleZh}<span className="member-track">TRACK {member.number}</span></div><p>{member.description}</p></div>
  </article>;
}

function MemberGrid({ onSelect }) {
  return <section id="band" className="members section-pad"><div className="section-label"><span className="red-square" /> THE PEOPLE BEHIND THE NOISE <span className="label-number">002</span></div>
    <div className="section-heading"><h2>MEET THE <span>BAND.</span></h2><p>四种个性，四种能量。<br /><span>点击成员，进入他们的舞台。</span></p></div>
    <div className="member-grid">{members.map(member => <BandMemberCard member={member} onSelect={onSelect} key={member.id} />)}</div>
    <div className="band-footnote"><Icon name="sound" /><span>INDIVIDUALLY DISTINCT. COLLECTIVELY LOUD.</span><span>WE ARE NIGHT RIOT.</span></div>
  </section>;
}

function VideoGallery({ onSelect }) {
  return <section id="videos" className="videos section-pad"><div className="section-label"><span className="red-square" /> THE ENTRANCE FILMS <span className="label-number">003</span></div>
    <div className="section-heading"><h2>MEET THEM<br />IN <span>MOTION.</span></h2><p>Every member has a story.<br /><span>Every entrance makes a statement.</span></p></div>
    <div className="video-grid">{members.map(member => <button key={member.id} className="video-entry" onClick={() => onSelect(member)} aria-label={`播放 ${member.name} 的出场影片`}>
      <div className="video-thumbnail"><MemberImage member={member} loading="lazy" /><span className="video-film">INTRO FILM / {member.number}</span><span className="video-play"><Icon name="play" /></span><span className="video-hd">HD</span></div>
      <div className="video-caption"><div><h3>{member.name.toUpperCase()} <span>— {member.role}</span></h3><p>{member.quote}</p></div><Icon /></div>
    </button>)}</div>
  </section>;
}

function VideoModal({ member, onClose, onSelect }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const closeRef = useRef(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [ended, setEnded] = useState(false);
  const [needsPlay, setNeedsPlay] = useState(false);
  const [retry, setRetry] = useState(0);
  const [fullscreenNotice, setFullscreenNotice] = useState('');
  const [poster, setPoster] = useState(member.image || fallbackPoster);

  useEffect(() => {
    let cancelled = false;
    setPoster(member.image || fallbackPoster);
    const image = new Image();
    image.onerror = () => { if (!cancelled) setPoster(fallbackPoster); };
    if (member.image) image.src = member.image;
    return () => { cancelled = true; image.onerror = null; };
  }, [member.image]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    function handleKey(event) {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key === 'Tab') {
        const focusable = [...dialogRef.current.querySelectorAll('button:not(:disabled), video, a[href]')];
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKey); if (previousFocus?.isConnected) previousFocus.focus(); };
  }, [onClose]);

  useEffect(() => {
    const video = videoRef.current;
    setError(''); setEnded(false); setNeedsPlay(false); setLoading(true);
    if (!member.videoUrl?.trim()) { setError('这支出场影片还未配置，请在 src/data.js 中为该成员填写 videoUrl。'); setLoading(false); return; }
    const timeout = window.setTimeout(() => { if (video.readyState < 2) { setLoading(false); setError('加载时间较长，请检查网络或视频地址后重新加载。'); video.pause(); } }, 20000);
    video.load();
    video.play().catch(err => {
      if (err.name === 'NotAllowedError') { setLoading(false); setNeedsPlay(true); }
      else if (err.name !== 'AbortError') { setLoading(false); setError('暂时无法播放这支影片。请确认视频地址有效，且文件为浏览器支持的 MP4 格式。'); }
    });
    return () => { window.clearTimeout(timeout); video.pause(); video.removeAttribute('src'); video.load(); };
  }, [member, retry]);

  const replay = () => { const video = videoRef.current; video.currentTime = 0; video.play().then(() => { setEnded(false); setNeedsPlay(false); }).catch(() => setNeedsPlay(true)); };
  const enterFullscreen = async () => {
    try {
      const video = videoRef.current;
      if (video.requestFullscreen) await video.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      else { setFullscreenNotice('当前浏览器未提供全屏功能，请使用播放器原生菜单。'); return; }
      setFullscreenNotice('');
    } catch { setFullscreenNotice('未能进入全屏，请再次点击全屏按钮。'); }
  };
  return <div className="modal-backdrop" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="video-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" ref={dialogRef}>
      <div className="modal-top"><span><span className="status-dot" /> NIGHT RIOT / ENTRANCE FILM {member.number}</span><div className="modal-actions"><button className="modal-close" onClick={enterFullscreen} aria-label="全屏播放">全屏 <Icon /></button><button ref={closeRef} className="modal-close" onClick={onClose} aria-label="关闭视频">CLOSE <Icon name="close" /></button></div></div>
      {fullscreenNotice && <p className="fullscreen-notice" aria-live="polite">{fullscreenNotice}</p>}
      <div className="player-wrap"><video key={`${member.id}-${retry}`} ref={videoRef} src={member.videoUrl || undefined} poster={poster} controls playsInline preload="metadata" aria-label={`${member.name} · ${member.roleZh} 出场视频`} onPlaying={() => { setLoading(false); setNeedsPlay(false); setError(''); setEnded(false); }} onLoadedData={() => setLoading(false)} onError={() => { setLoading(false); setError('影片加载失败。请检查网络，或在 src/data.js 中确认该成员的 videoUrl。'); }} onEnded={() => setEnded(true)} />
        {loading && !error && <div className="player-loading" role="status"><span className="loader" />正在点亮舞台…</div>}
        {error && <div className="player-message" role="alert"><Icon name="sound" /><h3>THE STAGE WILL BE BACK.</h3><p>{error}</p><button className="button button-red" onClick={() => setRetry(value => value + 1)}>重新加载 ↻</button></div>}
        {!error && (ended || needsPlay) && <div className="player-message"><button className="button button-red" onClick={replay}><Icon name="play" />{ended ? 'REPLAY / 再听一次' : 'PLAY / 点击播放'}</button></div>}
      </div>
      <div className="modal-info"><div><span className="eyebrow">{member.role} / {member.roleZh}</span><h2 id="modal-title">{member.name.toUpperCase()}<span>.</span></h2></div><p id="modal-description">{member.description}</p></div>
      <div className="modal-switcher"><span>CHOOSE YOUR FREQUENCY</span><div>{members.map(item => <button key={item.id} aria-pressed={item.id === member.id} onClick={() => onSelect(item)}>{item.name.toUpperCase()} <span>{item.number}</span></button>)}</div></div>
    </div>
  </div>;
}

function Footer() {
  return <footer id="contact" className="footer section-pad"><div className="section-label"><span className="red-square" /> STAY IN THE FREQUENCY <span className="label-number">004</span></div>
    <div className="contact-row"><h2>LET'S MAKE<br /><span>SOME NOISE.</span></h2><div className="contact-info"><span className="eyebrow">BOOKING & COLLABORATIONS</span><a className="email" href={`mailto:${band.email}`}>{band.email}<Icon /></a><span className="contact-placeholder">联系邮箱为示例，期待下一次共鸣。</span><div className="socials">{band.socials.map(social => social.url ? <a key={social.name} href={social.url} target="_blank" rel="noreferrer">{social.name} ↗</a> : <span key={social.name} title="社交账号即将公布">{social.name} <small>即将上线</small></span>)}</div></div></div>
    <div className="footer-wordmark" aria-hidden="true">NIGHT RIOT<span>®</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NIGHT RIOT. ALL RIGHTS RESERVED.</span><span>FOUR SOULS. ONE SOUND.</span><a href="#home">BACK TO TOP ↑</a></div>
  </footer>;
}

function App() {
  const [selected, setSelected] = useState(null);
  const close = React.useCallback(() => setSelected(null), []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.member-card, .video-entry, .about-main').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return <><a className="skip-link" href="#band">跳到乐队成员</a><div inert={selected ? true : undefined}><Navigation /><main><HeroSection /><div className="ticker" aria-hidden="true"><span>FOUR SOULS</span><b>✳</b><span>ONE SOUND</span><b>✳</b><span>NO LIMITS</span><b>✳</b><span>NIGHT RIOT</span><b>✳</b><span>FOUR SOULS</span><b>✳</b></div><AboutSection /><MemberGrid onSelect={setSelected} /><VideoGallery onSelect={setSelected} /></main><Footer /></div>{selected && <VideoModal member={selected} onClose={close} onSelect={setSelected} />}</>;
}

createRoot(document.getElementById('root')).render(<App />);
