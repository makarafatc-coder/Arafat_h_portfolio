(function() {
  'use strict';
  
  // HTML থেকে টেক্সট সেফ করার ফাংশন
  function esc(str) {
    if (!str) return '';
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  async function loadProjects() {
    var workGrids = document.querySelectorAll('[data-project-grid]');
    if (workGrids.length === 0 || !window.supabaseClient) return;
    
    // Supabase থেকে 'projects' টেবিলের ডাটা লোড
    const { data: projects, error } = await supabaseClient.from('projects').select('*').order('created_at', { ascending: false });
    
    workGrids.forEach(function(workGrid) {
      // যদি ডাটা না থাকে বা এরর হয়
      if (error || !projects || projects.length === 0) {
        workGrid.innerHTML = '<p style="color:#fff; padding: 20px; text-align:center; width:100%;">No projects found. Please add projects in the Admin Panel.</p>';
        return;
      }
      
      var limit = parseInt(workGrid.getAttribute('data-limit'), 10) || projects.length;
      var items = projects.slice(0, limit);
      
      // কার্ড রেন্ডার করা (পুরো কার্ডটা <a> ট্যাগ দিয়ে মুড়ে দেওয়া হয়েছে)
      workGrid.innerHTML = items.map(function(p) {
        return '<a href="market.html" class="work-card" style="text-decoration:none;">' +
          '<div class="work-media"><img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" onerror="this.src=window.AH_placeholder(\'' + esc(p.title) + '\')"></div>' +
          '<div class="work-body" style="display:flex; flex-direction:column;">' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p style="flex-grow:1;">' + esc(p.description) + '</p>' +
          '<span class="btn btn-primary btn-sm" style="margin-top:15px; width:100%; text-align:center; display:block;">Buy / View Details</span>' +
          '</div>' +
          '</a>';
      }).join('');
    });
  }
  
  // Services লোড করা (data.js থেকে)
  var data = window.AH_DATA || {};
  var svcGrid = document.querySelector('[data-service-grid]');
  if (svcGrid && Array.isArray(data.services)) {
    svcGrid.innerHTML = data.services.map(function(s) {
      return '<article class="service-card"><h3>' + esc(s.title) + '</h3><p>' + esc(s.description) + '</p><span class="price">' + esc(s.price) + '</span><a class="btn btn-primary btn-sm" href="contact.html">Contact</a></article>';
    }).join('');
  }
  
  // ফাংশন কল করা
  loadProjects();
})();