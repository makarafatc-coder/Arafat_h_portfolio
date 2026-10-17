/* ========================================================================
   Renders featured work grid and services preview from AH_DATA.
   ======================================================================== */
(function() {
  'use strict';
  
  var data = window.AH_DATA || {};
  
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  
  /* ---------- Work grid ---------- */
  var workGrid = document.querySelector('[data-project-grid]');
  if (workGrid && Array.isArray(data.projects)) {
    var limit = parseInt(workGrid.getAttribute('data-limit'), 10) || data.projects.length;
    var featuredOnly = workGrid.getAttribute('data-featured') === 'true';
    var items = data.projects.filter(function(p) {
      return featuredOnly ? p.featured !== false : true;
    }).slice(0, limit);
    
    workGrid.innerHTML = items.map(function(p) {
      return '' +
        '<a class="work-card" href="portfolio.html#' + esc(p.id) + '">' +
        '<div class="work-media">' +
        '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy" ' +
        '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy" ' +
  'onerror="this.onerror=null;this.src=window.AH_placeholder(\'' + esc(p.title) + '\');">' +
        (p.tag ? '<span class="work-tag">' + esc(p.tag) + '</span>' : '') +
        '</div>' +
        '<div class="work-body">' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.description) + '</p>' +
        '</div>' +
        '</a>';
    }).join('');
  }
  
  /* ---------- Services preview ---------- */
  var svcGrid = document.querySelector('[data-service-grid]');
  if (svcGrid && Array.isArray(data.services)) {
    var sLimit = parseInt(svcGrid.getAttribute('data-limit'), 10) || data.services.length;
    var sItems = data.services.slice(0, sLimit);
    
    svcGrid.innerHTML = sItems.map(function(s) {
      return '' +
        '<article class="service-card">' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<p>' + esc(s.description) + '</p>' +
        '<span class="price">' + esc(s.price || 'Contact for Pricing') + '</span>' +
        '<a class="btn btn-primary btn-sm" href="contact.html">Contact</a>' +
        '</article>';
    }).join('');
  }
})();