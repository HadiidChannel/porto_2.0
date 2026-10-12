// ============================================================================
// QUIET DIGITAL WORKSHOP - CLIENT-SIDE LOGIC
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  if (mobileToggle && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = mobileToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    mobileNavItems.forEach(item => {
      item.addEventListener('click', () => {
        if (mobileToggle.classList.contains('open')) {
          toggleMenu();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileToggle.classList.contains('open')) {
        toggleMenu();
      }
    });
  }

  // 2. Active Navigation Highlighting via IntersectionObserver
  const sections = document.querySelectorAll('section[id], header[id="top-header"]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // 3. Screenshot Inspection Lightbox Modal
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');
  const clickableScreenshots = document.querySelectorAll('.visual-img[data-modal="true"]');

  if (modal && modalImg && modalClose) {
    clickableScreenshots.forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        if (modalCaption) {
          modalCaption.textContent = img.alt || 'Inspeksi Tangkapan Layar Aplikasi Riil';
        }
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      modalImg.src = '';
      document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // 4. Download CV Handler
  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      alert('Dokumen ringkasan CV resmi (PDF) Hadiid Ar Raad siap dikirimkan melalui email. Silakan kirimkan surel ke hadiid.arraad@gmail.com.');
    });
  }
});
