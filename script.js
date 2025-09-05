const hamburger = document.querySelector('.hamburger');
const menuList = document.querySelector('.nav ul');
if (hamburger && menuList){
  hamburger.addEventListener('click', () => menuList.classList.toggle('open'));
}

// Đánh dấu nút đang ở trang hiện tại
const here = location.pathname.split('/').pop();
document.querySelectorAll('.menu').forEach(btn=>{
  const href = btn.getAttribute('onclick')?.match(/'(.*)'/)?.[1] || '';
  if (href === here) btn.classList.add('active');
});

// ===== R3: Desktop offcanvas enhancements =====
(function(){
  const header = document.querySelector('header.glass');
  const navList = document.querySelector('.nav ul');
  const burger = document.querySelector('.hamburger');

  // Ensure toggle works on desktop as drawer
  if (burger && navList){
    const toggleMenu = () => {
      const open = navList.classList.toggle('open');
      document.body.classList.toggle('nav-open', open);
    };
    // Remove old listeners by cloning (safe in case of multiple attachments)
    const b = burger.cloneNode(true);
    burger.parentNode.replaceChild(b, burger);
    b.addEventListener('click', toggleMenu);

    // Click outside (overlay or page) closes it (works for both mobile & desktop)
    document.addEventListener('click', (e) => {
      if (!navList.classList.contains('open')) return;
      if (e.target.closest('.nav')) return;
      navList.classList.remove('open'); document.body.classList.remove('nav-open');
    });

    // Escape key closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape'){
        navList.classList.remove('open'); document.body.classList.remove('nav-open');
      }
    });
  }
})();

// ===== R3.1 — Ensure drawer sits above overlay & unify toggle on all sizes =====
(function(){
  const navList = document.querySelector('.nav ul');
  const burger = document.querySelector('.hamburger');

  if (!navList || !burger) return;

  const toggleMenu = (e) => {
    e?.stopPropagation();
    const open = navList.classList.toggle('open');
    document.body.classList.toggle('nav-open', open);
  };

  // Reset previous listeners by cloning
  const b = burger.cloneNode(true);
  burger.parentNode.replaceChild(b, burger);
  b.addEventListener('click', toggleMenu);

  // Close when clicking outside (overlay/page)
  document.addEventListener('click', (e) => {
    if (!navList.classList.contains('open')) return;
    if (e.target.closest('.nav')) return;
    navList.classList.remove('open'); document.body.classList.remove('nav-open');
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      navList.classList.remove('open'); document.body.classList.remove('nav-open');
    }
  });
})();
