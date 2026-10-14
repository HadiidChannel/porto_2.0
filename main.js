// ============================================================================
// QUIET DIGITAL WORKSHOP - CLIENT-SIDE LOGIC
// PRD v0.9 : Theme Toggle, Multi-Screenshot Gallery, Integrated PDF Viewer
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Theme Toggle (PRD v0.9: Default Dark, Pure White #FFFFFF Light Mode)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const savedTheme = localStorage.getItem('porto_theme');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('porto_theme', theme);
  };

  // Initialize theme from storage (default is dark per PRD v0.9 Section 12)
  if (savedTheme === 'light') {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  // ==========================================================================
  // 2. Mobile Menu Drawer Toggle
  // ==========================================================================
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

  // ==========================================================================
  // 3. Active Navigation Highlighting via IntersectionObserver
  // ==========================================================================
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

  // ==========================================================================
  // 4. Project Screenshot Galleries Data
  // (All Genuine Screenshots for Every Single One of the 7 Projects)
  // ==========================================================================
  const projectGalleries = {
    'project-01': [
      {
        src: './assets/projects/attendance-dashboard.png',
        caption: '01. Dashboard Karyawan: Status verifikasi presensi harian dan radius geofencing kantor Makassar'
      },
      {
        src: './assets/projects/attendance-admin.png',
        caption: '02. Dashboard Administrator: Agregasi presensi real-time seluruh divisi dan persentase kehadiran'
      },
      {
        src: './assets/projects/attendance-report.png',
        caption: '03. Halaman Laporan Karyawan: Rekapitulasi presensi bulanan, log waktu, dan fungsi ekspor data'
      },
      {
        src: './assets/projects/attendance-division.png',
        caption: '04. Halaman Struktur Divisi: Manajemen penempatan unit kerja dan konfigurasi departemen'
      },
      {
        src: './assets/projects/attendance-management.png',
        caption: '05. Halaman Manajemen Karyawan: Direktori biodata pegawai, status dinas, dan hak akses sistem'
      },
      {
        src: './assets/projects/attendance-leave.png',
        caption: '06. Halaman Persetujuan Izin: Alur permohonan cuti, sakit, dan validasi persetujuan atasan'
      },
      {
        src: './assets/projects/attendance-login.png',
        caption: '07. Login Portal Karyawan: Autentikasi sesi terenkripsi dan proteksi proteksi akun'
      },
      {
        src: './assets/projects/attendance-activation.png',
        caption: '08. Pembuatan dan Aktivasi Akun: Formulir onboarding mandiri pegawai baru'
      }
    ],
    'project-02': [
      {
        src: './assets/projects/anonymous-chat.png',
        caption: '01. Anonymous Chat: Ruang percakapan real-time tanpa riwayat permanen via Firebase Realtime Database'
      }
    ],
    'project-03': [
      {
        src: './assets/projects/training-modules.png',
        caption: '01. Pelatihan Pegawai: Daftar modul pelatihan aktif dan progres kurikulum pembelajaran'
      },
      {
        src: './assets/projects/training-card.png',
        caption: '02. Kartu Pegawai: Riwayat kompetensi pelatihan dan lencana kelulusan modul'
      },
      {
        src: './assets/projects/training-division.png',
        caption: '03. Halaman Divisi: Pengelompokan tim dan penugasan kurikulum pelatihan per departemen'
      },
      {
        src: './assets/projects/training-employees.png',
        caption: '04. Halaman Pegawai: Direktori peserta pelatihan dan evaluasi kompetensi kerja'
      },
      {
        src: './assets/projects/training-courses.png',
        caption: '05. Katalog Pelatihan: Silabus materi teknis dan jadwal sesi pembelajaran'
      },
      {
        src: './assets/projects/training-login.png',
        caption: '06. Portal Masuk Pelatihan: Halaman login kredensial staf dan instruktur'
      },
      {
        src: './assets/projects/training-register.png',
        caption: '07. Halaman Registrasi: Pendaftaran akun peserta baru untuk pelatihan korporat'
      }
    ],
    'project-04': [
      {
        src: './assets/projects/iot-canopy-diagram.png',
        caption: '01. IoT Smart Canopy: Diagram skematik arsitektur sensor hujan, sensor LDR, dan mikrokontroler ESP8266'
      }
    ],
    'project-05': [
      {
        src: './assets/projects/laporaman-home.png',
        caption: '01. LaporAman Home: Beranda publik B2B SaaS Anonymous Whistleblowing & Feedback System'
      },
      {
        src: './assets/projects/laporaman-form.png',
        caption: '02. Formulir Laporan: Input pengaduan insiden etika aman dengan enkripsi zero-knowledge'
      },
      {
        src: './assets/projects/laporaman-token.png',
        caption: '03. Token Pengaduan: Kunci rahasia unik untuk pelacakan laporan tanpa harus mendaftar akun'
      },
      {
        src: './assets/projects/laporaman-tracking.png',
        caption: '04. Lacak Tiket Pengaduan: Riwayat investigasi dan status tindak lanjut laporan dari auditor'
      },
      {
        src: './assets/projects/laporaman-admin.png',
        caption: '05. Dashboard Admin LaporAman: Manajemen kasus whistleblowing dan pengkategorian kepatuhan B2B'
      },
      {
        src: './assets/projects/laporaman-settings.png',
        caption: '06. Halaman Pengaturan dan PIN: Konfigurasi keamanan organisasi dan otentikasi PIN investigator'
      }
    ],
    'project-06': [
      {
        src: './assets/projects/tradesim-dashboard.png',
        caption: '01. TradeSim Dashboard: Simulasi portofolio ekuitas, grafik pergerakan harga BEI/kripto, dan order virtual'
      },
      {
        src: './assets/projects/tradesim-home.png',
        caption: '02. TradeSim Home: Antarmuka pengenalan platform edukasi pasar modal tanpa risiko kapital'
      },
      {
        src: './assets/projects/tradesim-login.png',
        caption: '03. TradeSim Login: Portal masuk akun simulasi trading dan sinkronisasi saldo virtual'
      },
      {
        src: './assets/projects/tradesim-register.png',
        caption: '04. TradeSim Register: Pendaftaran akun investor baru untuk simulasi perdagangan instrumen pasar'
      }
    ],
    'project-07': [
      {
        src: './assets/projects/excel-ai.png',
        caption: '01. Excel AI Studio: Editor spreadsheet dan generator formula cerdas untuk dokumen tabular'
      },
      {
        src: './assets/projects/excel-ai-upload.png',
        caption: '02. Upload Dataset Tabular: Pengunggahan berkas XLSX/CSV untuk inspeksi struktur data otomatis'
      },
      {
        src: './assets/projects/excel-ai-error.png',
        caption: '03. Diagnostik Formula: Penanganan audit kesalahan rumus dan rekomendasi koreksi kalkulasi'
      }
    ]
  };

  // ==========================================================================
  // 5. Multi-Screenshot Lightbox Controller
  // ==========================================================================
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const modalCounter = document.getElementById('modal-counter');
  const modalClose = document.getElementById('modal-close');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const modalThumbnails = document.getElementById('modal-thumbnails');

  let activeProjectKey = null;
  let activeImageIndex = 0;

  const updateGalleryView = () => {
    if (!activeProjectKey || !projectGalleries[activeProjectKey]) return;
    const gallery = projectGalleries[activeProjectKey];
    const item = gallery[activeImageIndex];

    modalImg.src = item.src;
    modalImg.alt = item.caption;
    modalCaption.textContent = item.caption;
    modalCounter.textContent = `Gambar ${activeImageIndex + 1} dari ${gallery.length}`;

    // Update thumbnail highlights
    if (modalThumbnails) {
      const thumbs = modalThumbnails.querySelectorAll('.gallery-thumb-btn');
      thumbs.forEach((thumb, idx) => {
        if (idx === activeImageIndex) {
          thumb.classList.add('active');
          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          thumb.classList.remove('active');
        }
      });
    }

    // Toggle navigation button visibility if single image
    if (gallery.length <= 1) {
      if (modalPrev) modalPrev.style.display = 'none';
      if (modalNext) modalNext.style.display = 'none';
      if (modalThumbnails) modalThumbnails.style.display = 'none';
    } else {
      if (modalPrev) modalPrev.style.display = 'flex';
      if (modalNext) modalNext.style.display = 'flex';
      if (modalThumbnails) modalThumbnails.style.display = 'flex';
    }
  };

  const openGallery = (projectKey, startIndex = 0) => {
    if (!projectGalleries[projectKey]) return;
    activeProjectKey = projectKey;
    activeImageIndex = startIndex;
    const gallery = projectGalleries[projectKey];

    // Populate thumbnail strip
    if (modalThumbnails) {
      modalThumbnails.innerHTML = '';
      gallery.forEach((imgItem, idx) => {
        const thumbBtn = document.createElement('button');
        thumbBtn.type = 'button';
        thumbBtn.className = `gallery-thumb-btn ${idx === startIndex ? 'active' : ''}`;
        thumbBtn.setAttribute('aria-label', `Lihat gambar ${idx + 1}`);
        const thumbImg = document.createElement('img');
        thumbImg.src = imgItem.src;
        thumbImg.alt = `Thumbnail ${idx + 1}`;
        thumbBtn.appendChild(thumbImg);

        thumbBtn.addEventListener('click', () => {
          activeImageIndex = idx;
          updateGalleryView();
        });

        modalThumbnails.appendChild(thumbBtn);
      });
    }

    updateGalleryView();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
  };

  const showNextImage = () => {
    if (!activeProjectKey) return;
    const gallery = projectGalleries[activeProjectKey];
    activeImageIndex = (activeImageIndex + 1) % gallery.length;
    updateGalleryView();
  };

  const showPrevImage = () => {
    if (!activeProjectKey) return;
    const gallery = projectGalleries[activeProjectKey];
    activeImageIndex = (activeImageIndex - 1 + gallery.length) % gallery.length;
    updateGalleryView();
  };

  // Wire gallery triggers
  document.querySelectorAll('[data-gallery-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = trigger.getAttribute('data-gallery-project');
      const indexStr = trigger.getAttribute('data-gallery-index');
      const startIndex = indexStr ? parseInt(indexStr, 10) : 0;
      openGallery(projectKey, startIndex);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeGallery);
  if (modalNext) modalNext.addEventListener('click', showNextImage);
  if (modalPrev) modalPrev.addEventListener('click', showPrevImage);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeGallery();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // ==========================================================================
  // ==========================================================================
  // 6. Interactive Certificate Document Viewer (Tanpa Auto-Download)
  //    (PRD v0.9: Navigasi Halaman, Zooming, Thumbnail Strip, No Auto-Download)
  // ==========================================================================
  const certificateData = {
    'microsoft-azure': {
      title: 'Microsoft Certified: Azure Data Fundamentals',
      category: 'Sertifikasi Profesional Global',
      issuer: 'Microsoft Corporation',
      pdfUrl: './assets/certificates/sertifikat-microsoft-azure.pdf',
      pages: [
        './assets/certificates/sertifikat-microsoft-azure-p1.png'
      ]
    },
    'pelatihan-fullstack': {
      title: 'Fullstack Web Development Program',
      category: 'Sertifikat Pelatihan Keahlian Teknis',
      issuer: 'Lembaga Pelatihan Terverifikasi',
      pdfUrl: './assets/certificates/sertifikat-pelatihan-fullstack.pdf',
      pages: [
        './assets/certificates/sertifikat-pelatihan-fullstack-p1.png'
      ]
    },
    'pelatihan-web': {
      title: 'Web Programming',
      category: 'Sertifikat Pelatihan Keahlian Teknis',
      issuer: 'Lembaga Pelatihan Terverifikasi',
      pdfUrl: './assets/certificates/sertifikat-pelatihan-web-programming.pdf',
      pages: [
        './assets/certificates/sertifikat-pelatihan-web-programming-p1.png',
        './assets/certificates/sertifikat-pelatihan-web-programming-p2.png'
      ]
    },
    'pelatihan-mobile': {
      title: 'Mobile Programming',
      category: 'Sertifikat Pelatihan Keahlian Teknis',
      issuer: 'Lembaga Pelatihan Terverifikasi',
      pdfUrl: './assets/certificates/sertifikat-pelatihan-mobile-programming.pdf',
      pages: [
        './assets/certificates/sertifikat-pelatihan-mobile-programming-p1.png',
        './assets/certificates/sertifikat-pelatihan-mobile-programming-p2.png'
      ]
    },
    'pelatihan-admin': {
      title: 'Administrasi Perkantoran',
      category: 'Sertifikat Pelatihan Keahlian Teknis',
      issuer: 'Lembaga Pelatihan Terverifikasi',
      pdfUrl: './assets/certificates/sertifikat-pelatihan-administrasi-perkantoran.pdf',
      pages: [
        './assets/certificates/sertifikat-pelatihan-administrasi-perkantoran-p1.png',
        './assets/certificates/sertifikat-pelatihan-administrasi-perkantoran-p2.png'
      ]
    },
    'magang-bank-sulselbar': {
      title: 'Sertifikat Magang Divisi Management Information System (MIS)',
      category: 'Sertifikat Pengalaman Magang',
      issuer: 'PT Bank Sulselbar',
      pdfUrl: './assets/certificates/sertifikat-magang-bank-sulselbar.pdf',
      pages: [
        './assets/certificates/sertifikat-magang-bank-sulselbar-p1.png',
        './assets/certificates/sertifikat-magang-bank-sulselbar-p2.png'
      ]
    },
    'toefl-prediction': {
      title: 'Sertifikat Hasil TOEFL Prediction Test',
      category: 'Sertifikat Kemampuan Bahasa',
      issuer: 'Lembaga Uji Bahasa Terverifikasi',
      pdfUrl: './assets/certificates/sertifikat-toefl-prediction.pdf',
      pages: [
        './assets/certificates/sertifikat-toefl-prediction-p1.png'
      ]
    }
  };

  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalCat = document.getElementById('cert-modal-cat');
  const certPageIndicator = document.getElementById('cert-page-indicator');
  const certPageText = document.getElementById('cert-page-text');
  const certZoomLevel = document.getElementById('cert-zoom-level');
  const certZoomIn = document.getElementById('cert-zoom-in');
  const certZoomOut = document.getElementById('cert-zoom-out');
  const certZoomFit = document.getElementById('cert-zoom-fit');
  const certOpenTab = document.getElementById('cert-open-tab');
  const certDownloadLink = document.getElementById('cert-download-link');
  const certModalClose = document.getElementById('cert-modal-close');
  const certFloatPrev = document.getElementById('cert-float-prev');
  const certFloatNext = document.getElementById('cert-float-next');
  const certThumbnailsStrip = document.getElementById('cert-thumbnails-strip');

  let currentCertKey = null;
  let currentCertPageIndex = 0;
  let currentCertZoom = 1;

  const applyCertZoom = () => {
    if (!certModalImg) return;
    certModalImg.style.transform = `scale(${currentCertZoom})`;
    if (certZoomLevel) {
      certZoomLevel.textContent = `${Math.round(currentCertZoom * 100)}%`;
    }
  };

  const renderCertPage = () => {
    if (!currentCertKey || !certificateData[currentCertKey]) return;
    const cert = certificateData[currentCertKey];
    const totalPages = cert.pages.length;

    currentCertPageIndex = Math.max(0, Math.min(currentCertPageIndex, totalPages - 1));

    if (certModalImg) {
      certModalImg.src = cert.pages[currentCertPageIndex];
      certModalImg.alt = `${cert.title} Halaman ${currentCertPageIndex + 1}`;
    }

    if (certPageText) {
      certPageText.textContent = `Halaman ${currentCertPageIndex + 1} dari ${totalPages}`;
    }

    if (totalPages > 1) {
      if (certPageIndicator) certPageIndicator.style.display = 'inline-flex';
      if (certFloatPrev) {
        certFloatPrev.style.display = 'flex';
        certFloatPrev.style.opacity = currentCertPageIndex === 0 ? '0.35' : '1';
        certFloatPrev.style.pointerEvents = currentCertPageIndex === 0 ? 'none' : 'auto';
      }
      if (certFloatNext) {
        certFloatNext.style.display = 'flex';
        certFloatNext.style.opacity = currentCertPageIndex === totalPages - 1 ? '0.35' : '1';
        certFloatNext.style.pointerEvents = currentCertPageIndex === totalPages - 1 ? 'none' : 'auto';
      }
      if (certThumbnailsStrip) {
        certThumbnailsStrip.style.display = 'flex';
        certThumbnailsStrip.querySelectorAll('.cert-thumb-btn').forEach((btn, idx) => {
          btn.classList.toggle('active', idx === currentCertPageIndex);
        });
      }
    } else {
      if (certFloatPrev) certFloatPrev.style.display = 'none';
      if (certFloatNext) certFloatNext.style.display = 'none';
      if (certThumbnailsStrip) certThumbnailsStrip.style.display = 'none';
    }

    currentCertZoom = 1;
    applyCertZoom();
  };

  const showNextCertPage = () => {
    if (!currentCertKey || !certificateData[currentCertKey]) return;
    const totalPages = certificateData[currentCertKey].pages.length;
    if (currentCertPageIndex < totalPages - 1) {
      currentCertPageIndex++;
      renderCertPage();
    }
  };

  const showPrevCertPage = () => {
    if (!currentCertKey || !certificateData[currentCertKey]) return;
    if (currentCertPageIndex > 0) {
      currentCertPageIndex--;
      renderCertPage();
    }
  };

  const openCertModal = (certKey, pageIndex = 0) => {
    if (!certModal || !certificateData[certKey]) return;
    const cert = certificateData[certKey];

    currentCertKey = certKey;
    currentCertPageIndex = pageIndex;

    if (certModalTitle) certModalTitle.textContent = cert.title;
    if (certModalCat) certModalCat.textContent = cert.category;

    if (certOpenTab) certOpenTab.href = cert.pdfUrl;
    if (certDownloadLink) {
      certDownloadLink.href = cert.pdfUrl;
      certDownloadLink.setAttribute('download', cert.pdfUrl.split('/').pop() || 'sertifikat.pdf');
    }

    // Build thumbnail strip for multi-page certificates
    if (certThumbnailsStrip) {
      certThumbnailsStrip.innerHTML = '';
      if (cert.pages.length > 1) {
        cert.pages.forEach((pageUrl, idx) => {
          const thumbBtn = document.createElement('button');
          thumbBtn.type = 'button';
          thumbBtn.className = `cert-thumb-btn ${idx === currentCertPageIndex ? 'active' : ''}`;
          thumbBtn.title = `Halaman ${idx + 1}`;
          thumbBtn.innerHTML = `<img src="${pageUrl}" alt="Thumbnail Halaman ${idx + 1}" loading="lazy">`;
          thumbBtn.addEventListener('click', () => {
            currentCertPageIndex = idx;
            renderCertPage();
          });
          certThumbnailsStrip.appendChild(thumbBtn);
        });
      }
    }

    renderCertPage();

    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
    if (certModalImg) certModalImg.src = '';
    currentCertKey = null;
    document.body.style.overflow = '';
  };

  // Wire trigger elements (cards preview cover and primary buttons)
  document.querySelectorAll('[data-cert-key]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const certKey = trigger.getAttribute('data-cert-key');
      openCertModal(certKey, 0);
    });
  });

  // Zoom controls
  if (certZoomIn) {
    certZoomIn.addEventListener('click', () => {
      if (currentCertZoom < 2.0) {
        currentCertZoom = Math.min(2.0, +(currentCertZoom + 0.25).toFixed(2));
        applyCertZoom();
      }
    });
  }

  if (certZoomOut) {
    certZoomOut.addEventListener('click', () => {
      if (currentCertZoom > 0.5) {
        currentCertZoom = Math.max(0.5, +(currentCertZoom - 0.25).toFixed(2));
        applyCertZoom();
      }
    });
  }

  if (certZoomFit) {
    certZoomFit.addEventListener('click', () => {
      currentCertZoom = 1;
      applyCertZoom();
    });
  }

  // Navigation arrows
  if (certFloatPrev) certFloatPrev.addEventListener('click', showPrevCertPage);
  if (certFloatNext) certFloatNext.addEventListener('click', showNextCertPage);

  // Close handlers
  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeCertModal();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!certModal || !certModal.classList.contains('open')) return;
    if (e.key === 'Escape') closeCertModal();
    if (e.key === 'ArrowRight') showNextCertPage();
    if (e.key === 'ArrowLeft') showPrevCertPage();
  });

  // ==========================================================================
  // 7. Download CV Handler
  // ==========================================================================
  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      alert('Dokumen ringkasan CV resmi (PDF) Hadiid Ar Raad siap dikirimkan melalui email. Silakan kirimkan surel ke hadiid.arraad@gmail.com.');
    });
  }
});
