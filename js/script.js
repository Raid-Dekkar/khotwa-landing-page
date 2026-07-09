(function(){
  // ----------  ----------
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => { toggle.classList.remove('open'); links.classList.remove('open'); });
  });

  // ----------  ----------
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  // ----------  ----------
  const sections = ['hero','about','components','video','book','how','bot','contact'].map(id => document.getElementById(id));
  const dots = document.querySelectorAll('.trail__dot');
  const trailFill = document.getElementById('trailFill');

  const trailObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const idx = sections.indexOf(entry.target);
        dots.forEach((d,i) => d.classList.toggle('active', i === idx));
        if(trailFill) trailFill.style.height = (idx/(sections.length-1)*100) + '%';
      }
    });
  }, {threshold:0.5});
  sections.forEach(s => s && trailObserver.observe(s));

  // ----------  ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();
