(function () {
  'use strict';

  // ১. মোবাইল মেনু (৩ লাইন) ওপেন/ক্লোজ
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');
  
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
    });
  }

  // ২. Portfolio ড্রপডাউন (মোবাইলে)
  document.querySelectorAll('.has-drop').forEach(function (drop) {
    var btn = drop.querySelector('.nav-drop-btn');
    if (btn) btn.addEventListener('click', function (e) {
      e.preventDefault();
      drop.classList.toggle('is-open');
    });
  });

  // ৩. Supabase থেকে ডাটা লোড (নাম, বায়ো, ছবি)
  var data = window.AH_DATA && window.AH_DATA.site ? window.AH_DATA.site : {};
  document.querySelectorAll('[data-site]').forEach(function (el) {
    var key = el.getAttribute('data-site');
    if (data[key]) {
      if (key === 'email') el.setAttribute('href', 'mailto:' + data[key]);
      else { el.setAttribute('href', data[key]); el.setAttribute('target', '_blank'); }
    }
  });

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  if (window.supabaseClient) {
    supabaseClient.from('profile').select('*').eq('id', 1).single().then(({ data: profile, error }) => {
      if (!error && profile) {
        var nameEl = document.getElementById('siteName');
        if (nameEl) {
          var nameParts = (profile.name || "Arafat Hossain").split(' ');
          nameEl.innerHTML = nameParts[0] + ' <span class="grad-text">' + nameParts.slice(1).join(' ') + '</span>';
        }
        var roleEl = document.getElementById('siteRole');
        if (roleEl) roleEl.textContent = profile.role || "Graphic Designer";
        var bioEl = document.getElementById('siteBio');
        if (bioEl) bioEl.textContent = profile.bio;
        var heroImg = document.getElementById('siteHeroPhoto');
        if (heroImg && profile.profile_photo) {
          heroImg.src = profile.profile_photo;
          heroImg.style.display = 'block';
          var fallback = document.getElementById('heroFallback');
          if (fallback) fallback.style.display = 'none';
        }
        var aboutImg = document.getElementById('siteAboutPhoto');
        if (aboutImg && profile.about_photo) aboutImg.src = profile.about_photo;
      }
    });
  }

  // ৪. ইমেজ প্লেসহোল্ডার
  window.AH_placeholder = function (label) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><text x="400" y="320" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="40" font-weight="bold">' + (label||'Design') + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };
})();