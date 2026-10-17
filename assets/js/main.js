/* ---------- Pretty SVG placeholders (used by all pages) ---------- */
var PALETTES = {
  logo: ["#1e3a8a", "#3b82f6"],
  branding: ["#1e3a8a", "#3b82f6"],
  social: ["#6d28d9", "#a855f7"],
  poster: ["#b45309", "#f59e0b"],
  banner: ["#b45309", "#f59e0b"],
  thumbnail: ["#991b1b", "#ef4444"],
  youtube: ["#991b1b", "#ef4444"],
  advertis: ["#831843", "#ec4899"],
  cctv: ["#065f46", "#10b981"],
  camera: ["#065f46", "#10b981"],
  web: ["#312e81", "#6366f1"],
  app: ["#312e81", "#6366f1"],
  project: ["#312e81", "#6366f1"],
  profile: ["#1e293b", "#475569"],
  about: ["#1e293b", "#475569"],
  hero: ["#1e293b", "#475569"],
  default: ["#1e293b", "#64748b"]
};

function pickPalette(label) {
  var l = (label || '').toLowerCase();
  for (var k in PALETTES) {
    if (l.indexOf(k) !== -1) return PALETTES[k];
  }
  return PALETTES.default;
}

window.AH_placeholder = function(label) {
  label = label || 'Portfolio';
  var p = pickPalette(label);
  var safe = String(label).replace(/[<>&"]/g, '');
  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">' +
    '<defs>' +
    '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="' + p[0] + '"/>' +
    '<stop offset="1" stop-color="' + p[1] + '"/>' +
    '</linearGradient>' +
    '<pattern id="p" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
    '<line x1="0" y1="0" x2="0" y2="80" stroke="rgba(255,255,255,.06)" stroke-width="1"/>' +
    '</pattern>' +
    '</defs>' +
    '<rect width="800" height="600" fill="url(#g)"/>' +
    '<rect width="800" height="600" fill="url(#p)"/>' +
    '<circle cx="720" cy="90" r="200" fill="rgba(255,255,255,.06)"/>' +
    '<circle cx="80" cy="530" r="160" fill="rgba(255,255,255,.05)"/>' +
    '<text x="400" y="300" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="46" font-weight="800" letter-spacing="-1.5">' + safe + '</text>' +
    '<text x="400" y="346" text-anchor="middle" fill="rgba(255,255,255,.55)" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="14" font-weight="700" letter-spacing="4">PLACEHOLDER</text>' +
    '</svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

/* Static <img data-ph-label> fallback */
document.querySelectorAll('img[data-ph-label]').forEach(function(img) {
  function swap() {
    if (!img.getAttribute('data-ph-label')) return;
    img.src = window.AH_placeholder(img.getAttribute('data-ph-label'));
    img.removeAttribute('data-ph-label');
  }
  if (img.complete && img.naturalWidth === 0) swap();
  img.addEventListener('error', swap, { once: true });
/* ---------- Reveal failsafe (mobiles where IO may not fire) ---------- */
setTimeout(function() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(function(el) {
    var rect = el.getBoundingClientRect();
    // viewport এ থাকলে অথবা টাইমার শেষ হলে দেখাও
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible');
    }
  });
}, 1200);

/* স্ক্রল হলেই reveal দেখাও (fallback) */
var revealFallback = function() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.classList.add('is-visible');
    }
  });
};
window.addEventListener('scroll', revealFallback, { passive: true });
window.addEventListener('load', revealFallback);});