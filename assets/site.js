
(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 30);
  updateHeader();
  addEventListener('scroll', updateHeader, {passive:true});

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.classList.toggle('is-open', !open);
    nav?.classList.toggle('is-open', !open);
    document.body.style.overflow = !open ? 'hidden' : '';
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded','false'); menuButton?.classList.remove('is-open'); nav?.classList.remove('is-open'); document.body.style.overflow='';
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), {threshold:.12, rootMargin:'0px 0px -4%'});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // Soft same-site page transition.
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    e.preventDefault(); document.body.classList.add('page-leaving'); setTimeout(() => location.href = link.href, 230);
  });

  // Image lightbox.
  const dialog = document.querySelector('[data-lightbox-dialog]');
  const lbImg = dialog?.querySelector('img');
  const lbCaption = dialog?.querySelector('figcaption');
  const closeBtn = dialog?.querySelector('.lightbox__close');
  const prevBtn = dialog?.querySelector('.lightbox__prev');
  const nextBtn = dialog?.querySelector('.lightbox__next');
  const images = [...document.querySelectorAll('[data-lightbox]')];
  let active = 0; let previousFocus = null;
  const showImage = i => { if (!images.length) return; active = (i + images.length) % images.length; const source = images[active]; lbImg.src = source.currentSrc || source.src; lbImg.alt = source.alt; lbCaption.textContent = source.closest('figure')?.querySelector('figcaption')?.textContent || source.alt; };
  const openLightbox = (img, i) => { previousFocus = document.activeElement; showImage(i); dialog.hidden = false; document.body.style.overflow='hidden'; closeBtn.focus(); };
  const closeLightbox = () => { dialog.hidden=true; lbImg.src=''; document.body.style.overflow=''; previousFocus?.focus(); };
  images.forEach((image, i) => { image.tabIndex=0; image.setAttribute('role','button'); image.setAttribute('aria-label',`Open image: ${image.alt}`); image.addEventListener('click',() => openLightbox(image,i)); image.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLightbox(image,i)}}); });
  closeBtn?.addEventListener('click',closeLightbox); prevBtn?.addEventListener('click',()=>showImage(active-1)); nextBtn?.addEventListener('click',()=>showImage(active+1));
  dialog?.addEventListener('click',e=>{if(e.target===dialog)closeLightbox()});
  document.addEventListener('keydown',e=>{if(dialog?.hidden===false){if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')showImage(active-1);if(e.key==='ArrowRight')showImage(active+1)}});

  // Static-site contact form: assemble a mailto message without storing data.
  document.querySelector('[data-contact-form]')?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') || 'Portfolio visitor';
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${data.get('email')||''}\nCompany: ${data.get('company')||''}\nProject type: ${data.get('project_type')||''}\n\nMessage:\n${data.get('message')||''}`);
    const status = e.currentTarget.querySelector('[data-form-status]');
    if (status) status.textContent = 'Opening your email app…';
    location.href = `mailto:ramias7777@gmail.com?subject=${subject}&body=${body}`;
  });
})();
