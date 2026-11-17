/* ==========================================================================
   NAJMAT AL SAHEL — INTERACTIVE JAVASCRIPT
   Pinterest-Inspired Light Aesthetic & Scrap Calculator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Interactive Cursor Glow (Light Warm Highlight)
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderCursor() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // 2. Header Scroll Transition
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Hamburger Navigation
  const hamburger = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      if (isOpen) {
        navMenu.style.display = '';
        hamburger.classList.remove('active');
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'fixed';
        navMenu.style.top = '84px';
        navMenu.style.left = '20px';
        navMenu.style.right = '20px';
        navMenu.style.background = '#FFFFFF';
        navMenu.style.padding = '24px';
        navMenu.style.borderRadius = '20px';
        navMenu.style.boxShadow = '0 20px 50px rgba(15,23,42,0.15)';
        navMenu.style.border = '1px solid rgba(184,115,51,0.2)';
        hamburger.classList.add('active');
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          navMenu.style.display = '';
          hamburger.classList.remove('active');
        }
      });
    });
  }

  // 4. Active Section Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 180;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { passive: true });

  // 5. Hero Stats Counter Animation
  const counters = document.querySelectorAll('[data-target]');
  let hasCounted = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1800;
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            counter.innerHTML = current.toLocaleString() + `<span>${suffix}</span>`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          }
          requestAnimationFrame(updateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    countObserver.observe(heroSection);
  }

  // 6. Interactive Scrap Lot Estimator
  const metalSelect = document.getElementById('calcMetal');
  const tonnageInput = document.getElementById('calcTonnage');
  const tonnageLabel = document.getElementById('calcTonnageVal');
  const outputContainers = document.getElementById('calcOutput');
  const calcBtn = document.getElementById('calcInquiryBtn');

  function updateEstimator() {
    if (!tonnageInput || !outputContainers) return;
    const tonnes = parseFloat(tonnageInput.value);
    tonnageLabel.textContent = `${tonnes} MT`;

    // Standard 20ft container payload is approx 20-24 metric tonnes for scrap metals
    const approxContainers = (tonnes / 21).toFixed(1);
    const containerCount = approxContainers < 1 ? '< 1 Container (FCL)' : `~ ${approxContainers} x 20ft FCL`;
    outputContainers.textContent = containerCount;
  }

  if (tonnageInput) {
    tonnageInput.addEventListener('input', updateEstimator);
    metalSelect.addEventListener('change', updateEstimator);
    updateEstimator();
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const metal = metalSelect ? metalSelect.value : 'Aluminium Scrap';
      const tonnes = tonnageInput ? tonnageInput.value : '20';
      
      // Auto pre-fill contact form
      const productSelect = document.getElementById('inquiryProduct');
      const messageField = document.getElementById('inquiryMessage');
      if (productSelect) productSelect.value = metal;
      if (messageField) {
        messageField.value = `Hello Najmat Al Sahel team, I would like to request official spot pricing for ${tonnes} Metric Tonnes of ${metal} for pickup/loading at your Al Sajaa yard.`;
      }
      
      // Scroll to contact form smoothly
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 7. Pinterest Pinboard Image Lightbox
  const pinItems = document.querySelectorAll('.pin-item');
  pinItems.forEach(pin => {
    pin.addEventListener('click', () => {
      const img = pin.querySelector('img');
      const title = pin.querySelector('.pin-title')?.textContent || 'Facility View';
      if (!img) return;

      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '99999';
      overlay.style.background = 'rgba(12, 21, 35, 0.9)';
      overlay.style.backdropFilter = 'blur(16px)';
      overlay.style.display = 'flex';
      overlay.style.flexDirection = 'column';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.padding = '30px';
      overlay.style.cursor = 'zoom-out';
      overlay.style.animation = 'fadeIn 0.25s ease';

      overlay.innerHTML = `
        <div style="position:relative; max-width:900px; max-height:85vh;">
          <img src="${img.src}" alt="${title}" style="max-width:100%; max-height:80vh; border-radius:16px; box-shadow:0 25px 60px rgba(0,0,0,0.4); object-fit:contain;" />
          <div style="margin-top:14px; text-align:center; color:#FFFFFF; font-family:'Syne',sans-serif; font-size:1.1rem; font-weight:700;">
            ${title} • Najmat Al Sahel Yard, Sharjah
          </div>
          <button style="position:absolute; top:-16px; right:-16px; width:40px; height:40px; border-radius:50%; background:#B87333; color:#fff; border:none; font-size:1.3rem; cursor:pointer; display:flex; align-items:center; justify-content:center;">&times;</button>
        </div>
      `;

      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      function closeLb() {
        overlay.remove();
        document.body.style.overflow = '';
      }

      overlay.addEventListener('click', closeLb);
      document.addEventListener('keydown', function escListener(e) {
        if (e.key === 'Escape') {
          closeLb();
          document.removeEventListener('keydown', escListener);
        }
      });
    });
  });

  // 8. Back to Top Button
  const backToTopBtn = document.querySelector('.float-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 9. Contact Inquiry Form with Mailto fallback
  const contactForm = document.getElementById('tradeInquiryForm');
  const toastMsg = document.getElementById('formToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot bot protection
      const hp = contactForm.querySelector('.honeypot-wrap input');
      if (hp && hp.value) return;

      const name = contactForm.querySelector('#inquiryName')?.value.trim();
      const email = contactForm.querySelector('#inquiryEmail')?.value.trim();
      const phone = contactForm.querySelector('#inquiryPhone')?.value.trim();
      const company = contactForm.querySelector('#inquiryCompany')?.value.trim();
      const product = contactForm.querySelector('#inquiryProduct')?.value;
      const message = contactForm.querySelector('#inquiryMessage')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all required fields.', 'error');
        return;
      }

      // Generate mailto link
      const mailSubject = encodeURIComponent(`Trade Inquiry: ${product || 'Scrap Metal'} - ${company || name}`);
      const mailBody = encodeURIComponent(
        `NAJMAT AL SAHEL TRADE INQUIRY\n` +
        `-----------------------------------------\n` +
        `Client Name: ${name}\n` +
        `Company: ${company || 'N/A'}\n` +
        `Email: ${email}\n` +
        `Phone/WhatsApp: ${phone || 'N/A'}\n` +
        `Product of Interest: ${product || 'General Scrap Metal'}\n\n` +
        `Requirements / Message:\n${message}\n\n` +
        `Sent via Najmat Al Sahel Web Portal`
      );

      const mailtoUrl = `mailto:najmatalsahelalumcopper@gmail.com?subject=${mailSubject}&body=${mailBody}`;

      showToast('Opening your email client to dispatch inquiry...', 'success');
      window.location.href = mailtoUrl;

      setTimeout(() => {
        contactForm.reset();
        updateEstimator();
      }, 3000);
    });
  }

  function showToast(text, type) {
    if (!toastMsg) return;
    toastMsg.textContent = text;
    toastMsg.className = `form-toast ${type}`;
    setTimeout(() => {
      toastMsg.style.display = 'none';
    }, 6000);
  }

  // 10. Duplicate Ticker Track for Seamless Infinity Scroll
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    tickerTrack.innerHTML += tickerTrack.innerHTML;
  }
});

// Helper for product quick-select buttons
function prefillInquiry(productName) {
  const prodSelect = document.getElementById('inquiryProduct');
  if (prodSelect) prodSelect.value = productName;
  const contactSec = document.getElementById('contact');
  if (contactSec) {
    contactSec.scrollIntoView({ behavior: 'smooth' });
  }
}

// Arabic toggle
function toggleLanguage() {
  alert('النسخة العربية قيد التحديث وسوف تتوفر قريباً — Arabic portal under final review.');
}
