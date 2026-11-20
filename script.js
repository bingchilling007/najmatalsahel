/* ==========================================================================
   Najmat Al Sahel — site script (no dependencies)
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  var SITE = 'https://najmatalsahelalum.com/';
  var EMAIL = 'najmatalsahelalumcopper@gmail.com';
  var WHATSAPP = '971544707192';
  // Approximate scrap payload per 20ft FCL used by the estimator (metric tonnes).
  var MT_PER_20FT = 21;

  /* ------------------------------------------------------------------------
     i18n — English lives in the HTML; Arabic strings are here.
     ------------------------------------------------------------------------ */
  var AR = {
    skip: 'تخطَّ إلى المحتوى',
    brand: 'نجمة الساحل',
    brandSub: 'لتجارة خردة الألمنيوم والنحاس ذ.م.م',
    brandAria: 'نجمة الساحل، العودة إلى الأعلى',
    navAria: 'القائمة الرئيسية',
    navMaterials: 'المواد',
    navEstimator: 'الحاسبة',
    navYard: 'الساحة',
    navCompliance: 'الامتثال',
    navContact: 'تواصل',
    ctaQuote: 'اطلب عرض سعر',
    ctaWhatsApp: 'راسلنا على واتساب',

    heroEyebrow: 'الصجعة · الشارقة · الإمارات',
    heroTitle1: 'خردة الألمنيوم والنحاس.',
    heroTitle2: 'تجارة بأصولها.',
    heroSub: 'تاجر جملة مرخّص لخردة المعادن في الشارقة منذ 2016.',
    statYears: 'سنوات في التجارة',
    statTeam: 'الموظفون',
    statYard: 'ساحة مسوّرة',
    statFcl: 'تحميل حاويات كاملة',

    matTitle: 'ما نتاجر به.',
    matAlTitle: 'خردة الألمنيوم',
    matAlLine: 'مفروزة ومحزّمة وجاهزة للشحن بالحاويات.',
    matCuTitle: 'خردة النحاس',
    matCuLine: 'نحاس مصنّف في أكياس كبيرة، بوزن شفاف.',
    matNfTitle: 'معادن غير حديدية أخرى',
    matNfLine: 'اسألنا عن المتوفّر حالياً.',
    enquire: 'استفسر',
    altAluminium: 'خردة أسلاك ألمنيوم في الساحة',
    altCopper: 'خردة نحاس في أكياس كبيرة في الساحة',

    estTitle: 'من الأطنان إلى الحاويات.',
    estSub: 'أدخل الكمية لمعرفة العدد التقريبي للحاويات.',
    estMetal: 'نوع المعدن',
    estVolume: 'الكمية (طن متري)',
    optAluminium: 'خردة الألمنيوم',
    optCopper: 'خردة النحاس',
    optOther: 'معادن غير حديدية أخرى',
    estNote: 'تقدير فقط. يعتمد التحميل الفعلي على نوع المادة وطريقة التعبئة.',
    estCta: 'اطلب سعراً فورياً',
    stepDown: 'إنقاص 5 أطنان',
    stepUp: 'زيادة 5 أطنان',

    procEyebrow: 'آلية العمل',
    procTitle: 'كيف نتاجر.',
    s1: 'التوريد', s1Line: 'استلام المواد في ساحتنا بالصجعة.',
    s2: 'الفرز', s2Line: 'فصل حسب نوع المعدن ودرجته.',
    s3: 'الوزن', s3Line: 'وزن شفاف لكل دفعة.',
    s4: 'الشحن', s4Line: 'تحميل في حاويات 20 أو 40 قدماً.',

    yardTitle: 'الساحة.',
    yardSub: '1,800 م²، مسوّرة، في منطقة الصجعة الصناعية.',
    capSign: 'لوحة المدخل',
    capContainers: 'تجهيز الحاويات',
    capGate: 'بوابة الساحة',
    capAluminium: 'تحزيم الألمنيوم',
    altSign: 'لوحة الشركة ثنائية اللغة عند مدخل الساحة',
    altContainers: 'حاوية شحن بجانب أكياس كبيرة',
    altGate: 'البوابة الحديدية للساحة المسوّرة',
    altAluminiumYard: 'خردة ألمنيوم أمام حاوية شحن',

    compTitle: 'مرخّصون. وموثّقون.',
    compLicence: 'الرخصة التجارية',
    compCard: 'بطاقة المنشأة',
    compValid: 'صالحة حتى',
    compActivity: 'النشاط المرخّص',
    compActivityVal: 'تجارة الجملة في خردة ونفايات المعادن لإعادة التدوير',
    compLine: 'نسخ مصدّقة من الرخصة التجارية وشهادة الغرفة وعقد الإيجار متاحة عند الطلب.',
    compCta: 'اطلب ملف الامتثال',

    contactTitle: 'تواصل مع الساحة.',
    mapTitle: 'خريطة منطقة الصجعة الصناعية، الشارقة',
    cWhatsApp: 'واتساب',
    cMobile: 'جوال',
    cLandline: 'هاتف أرضي',
    cEmail: 'البريد الإلكتروني',
    cAddress: 'العنوان',
    cAddressVal: 'منطقة الصجعة الصناعية، الشارقة، الإمارات العربية المتحدة',
    fName: 'الاسم',
    fCompany: 'الشركة',
    fPhone: 'الهاتف / واتساب',
    fMaterial: 'المادة',
    fDetails: 'الكمية / التفاصيل',
    mAluminium: 'ألمنيوم',
    mCopper: 'نحاس',
    mOther: 'معادن أخرى',
    mCompliance: 'ملف الامتثال',
    mGeneral: 'استفسار عام',
    fSubmit: 'إرسال الاستفسار',
    errName: 'يرجى إدخال اسمك.',
    errPhone: 'يرجى إدخال رقم هاتف أو واتساب.',

    fLicence: 'رقم الرخصة التجارية',
    lLicensing: 'شروط الترخيص',
    lVisit: 'سياسة زيارة الساحة',
    copyright: '© 2026 نجمة الساحل',
    waAria: 'تحدث معنا على واتساب',
    close: 'إغلاق'
  };

  // Strings that only exist in script (both languages).
  var JS = {
    en: {
      title: 'Najmat Al Sahel | Aluminium & Copper Scrap Trader, Sharjah',
      description: 'Licensed wholesale aluminium and copper scrap trader in Al Sajaa Industrial Area, Sharjah, since 2016. 1,800 m² yard with 20ft and 40ft FCL loading.',
      langBtn: 'العربية', langBtnLang: 'ar', langAria: 'Switch to Arabic',
      menuOpen: 'Open menu', menuClose: 'Close menu',
      enlarge: 'Enlarge: ',
      waGreeting: 'Hello Najmat Al Sahel, I would like to enquire about scrap metal.',
      quote: function (t, m, n) { return 'Spot quote request: ' + t + ' MT of ' + m + ' (≈ ' + n + ' × 20ft FCL).'; },
      compliance: 'Please send the compliance pack (trade licence, chamber certificate, tenancy contract).',
      visit: 'I would like to arrange a yard visit. Please share your visit policy.',
      subject: 'Inquiry',
      labels: { name: 'Name', company: 'Company', phone: 'Phone/WhatsApp', material: 'Material', details: 'Volume/Details' },
      sentMail: 'Your email app should open with the inquiry ready to send. ',
      sentApi: 'Thank you. Your inquiry has been sent.',
      viaWa: 'Prefer WhatsApp? Send it there.',
      fail: 'Something went wrong. Please call or WhatsApp us instead.'
    },
    ar: {
      title: 'نجمة الساحل | تجارة خردة الألمنيوم والنحاس بالجملة، الشارقة',
      description: 'تاجر جملة مرخّص لخردة الألمنيوم والنحاس في منطقة الصجعة الصناعية بالشارقة منذ 2016. ساحة مساحتها 1,800 م² مع تحميل حاويات 20 و40 قدماً.',
      langBtn: 'EN', langBtnLang: 'en', langAria: 'Switch to English',
      menuOpen: 'فتح القائمة', menuClose: 'إغلاق القائمة',
      enlarge: 'تكبير: ',
      waGreeting: 'مرحباً نجمة الساحل، أود الاستفسار عن خردة المعادن.',
      quote: function (t, m, n) { return 'طلب سعر فوري: ' + t + ' طن متري من ' + m + ' (≈ ' + n + ' × حاوية 20 قدماً).'; },
      compliance: 'يرجى إرسال ملف الامتثال (الرخصة التجارية، شهادة الغرفة، عقد الإيجار).',
      visit: 'أرغب في ترتيب زيارة للساحة. يرجى تزويدي بسياسة الزيارة.',
      subject: 'استفسار',
      labels: { name: 'الاسم', company: 'الشركة', phone: 'الهاتف/واتساب', material: 'المادة', details: 'الكمية/التفاصيل' },
      sentMail: 'سيُفتح تطبيق البريد لديك والاستفسار جاهز للإرسال. ',
      sentApi: 'شكراً لك. تم إرسال استفسارك.',
      viaWa: 'تفضّل واتساب؟ أرسله من هناك.',
      fail: 'حدث خطأ. يرجى الاتصال بنا أو مراسلتنا على واتساب.'
    }
  };

  var EN = {};
  var lang = 'en';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function t(key) { return lang === 'ar' && AR[key] != null ? AR[key] : EN[key]; }
  function js() { return JS[lang]; }

  var ATTRS = [['data-i18n-alt', 'alt'], ['data-i18n-aria', 'aria-label'], ['data-i18n-title', 'title']];

  // Capture the English source strings once, straight from the markup.
  function captureEnglish() {
    $$('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (!(k in EN)) EN[k] = el.textContent.trim();
    });
    ATTRS.forEach(function (pair) {
      $$('[' + pair[0] + ']').forEach(function (el) {
        var k = el.getAttribute(pair[0]);
        if (!(k in EN)) EN[k] = el.getAttribute(pair[1]);
      });
    });
  }

  function setMeta(selector, attr, value) {
    var el = $(selector);
    if (el) el.setAttribute(attr, value);
  }

  function applyLanguage(next, persist) {
    lang = next === 'ar' ? 'ar' : 'en';
    doc.lang = lang;
    doc.dir = lang === 'ar' ? 'rtl' : 'ltr';

    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    ATTRS.forEach(function (pair) {
      $$('[' + pair[0] + ']').forEach(function (el) { el.setAttribute(pair[1], t(el.getAttribute(pair[0]))); });
    });

    var s = js();
    document.title = s.title;
    setMeta('meta[name="description"]', 'content', s.description);
    setMeta('link[rel="canonical"]', 'href', lang === 'ar' ? SITE + '?lang=ar' : SITE);

    var btn = $('#lang-toggle');
    if (btn) {
      btn.textContent = s.langBtn;
      btn.setAttribute('lang', s.langBtnLang);
      btn.setAttribute('aria-label', s.langAria);
    }
    syncMenuLabel();
    updateGalleryLabels();
    updateWhatsAppLinks();

    var map = $('#map');
    if (map) {
      var src = map.getAttribute('src').replace(/hl=\w+/, 'hl=' + lang);
      if (src !== map.getAttribute('src')) map.setAttribute('src', src);
    }

    if (persist) {
      try { localStorage.setItem('nas-lang', lang); } catch (e) {}
      try {
        var url = new URL(location.href);
        if (lang === 'ar') url.searchParams.set('lang', 'ar'); else url.searchParams.delete('lang');
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch (e) {}
    }
    doc.classList.remove('i18n-pending');
  }

  function updateWhatsAppLinks() {
    var href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(js().waGreeting);
    $$('[data-wa]').forEach(function (a) { a.setAttribute('href', href); });
  }

  function updateGalleryLabels() {
    $$('.g').forEach(function (fig) {
      var btn = $('.g-btn', fig);
      var cap = $('figcaption [data-i18n]', fig);
      if (btn && cap) btn.setAttribute('aria-label', js().enlarge + cap.textContent);
    });
  }

  /* ------------------------------------------------------------------------
     Header: solid on scroll, mobile menu, active link
     ------------------------------------------------------------------------ */
  var header = $('.site-header');
  var menuBtn = $('#menu-toggle');
  var nav = $('#site-nav');

  function onScroll() { header.classList.toggle('is-solid', window.scrollY > 24); }

  function syncMenuLabel() {
    if (!menuBtn) return;
    var open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-label', open ? js().menuClose : js().menuOpen);
  }

  function setMenu(open, returnFocus) {
    doc.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    syncMenuLabel();
    if (open) {
      var first = $('a', nav);
      if (first) first.focus({ preventScroll: true });
    } else if (returnFocus) {
      menuBtn.focus();
    }
  }

  function initHeader() {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && doc.classList.contains('menu-open')) setMenu(false, true);
    });
    window.matchMedia('(min-width: 1080px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });

    if (!('IntersectionObserver' in window)) return;
    var links = $$('.nav a:not(.btn)');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { io.observe(s); });
  }

  // Floating WhatsApp appears once the hero's own WhatsApp button is out of view.
  function initFab() {
    var fab = $('.fab-wa');
    var heroActions = $('.hero-actions');
    if (!fab) return;
    if (!heroActions || !('IntersectionObserver' in window)) { fab.classList.add('is-visible'); return; }
    new IntersectionObserver(function (entries) {
      fab.classList.toggle('is-visible', !entries[0].isIntersecting);
    }).observe(heroActions);
  }

  /* ------------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------------ */
  function initReveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    items.forEach(function (el) {
      var siblings = $$(':scope > .reveal', el.parentElement);
      var i = siblings.indexOf(el);
      if (i > 0) el.style.transitionDelay = Math.min(i, 4) * 90 + 'ms';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------------
     Contact form prefill
     ------------------------------------------------------------------------ */
  var form = $('#inquiry');
  var fMaterial = $('#f-material');
  var fDetails = $('#f-details');

  function goToForm() {
    var contact = $('#contact');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    contact.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('#f-name').focus({ preventScroll: true }); }, reduce ? 0 : 600);
  }

  // Only overwrite the details box if it's empty or we filled it ourselves.
  function prefill(material, details) {
    if (material) fMaterial.value = material;
    if (details != null && (!fDetails.value.trim() || fDetails.dataset.auto === '1')) {
      fDetails.value = details;
      fDetails.dataset.auto = '1';
    }
  }

  function initPrefill() {
    fDetails.addEventListener('input', function () { fDetails.dataset.auto = '0'; });

    $$('[data-material]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var m = el.getAttribute('data-material');
        var details = null;
        if (m === 'compliance') details = js().compliance;
        if (el.hasAttribute('data-visit')) details = js().visit;
        prefill(m, details);
        goToForm();
      });
    });
  }

  /* ------------------------------------------------------------------------
     Container estimator
     ------------------------------------------------------------------------ */
  function initEstimator() {
    var metal = $('#est-metal');
    var vol = $('#est-volume');
    var out = $('#est-output');

    function tonnes() {
      var v = parseFloat(vol.value);
      return isFinite(v) && v > 0 ? v : 0;
    }
    function fcl() {
      var n = tonnes() / MT_PER_20FT;
      return n > 0 && n < 0.1 ? '< 0.1' : n.toFixed(1);
    }
    function render() {
      out.textContent = '';
      out.append('≈ ');
      var b = document.createElement('b');
      b.textContent = fcl();
      out.append(b, ' × 20ft FCL');
    }

    vol.addEventListener('input', render);
    vol.addEventListener('blur', function () {
      var v = Math.min(5000, Math.max(1, Math.round(tonnes()) || 20));
      vol.value = v;
      render();
    });
    $$('.step').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = parseFloat(btn.getAttribute('data-step'));
        var next = Math.round(tonnes() / 5) * 5 + step;
        vol.value = Math.min(5000, Math.max(1, next));
        render();
      });
    });

    $('#est-quote').addEventListener('click', function () {
      var label = metal.options[metal.selectedIndex].textContent.trim();
      prefill(metal.value, js().quote(tonnes() || 20, label, fcl()));
      goToForm();
    });

    render();
  }

  /* ------------------------------------------------------------------------
     Inquiry form
     ------------------------------------------------------------------------ */
  function initForm() {
    var status = $('#form-status');
    var required = [
      { input: $('#f-name'), err: $('#f-name-err'), ok: function (v) { return v.length >= 2; } },
      { input: $('#f-phone'), err: $('#f-phone-err'), ok: function (v) { return v.replace(/\D/g, '').length >= 7; } }
    ];

    function check(r) {
      var valid = r.ok(r.input.value.trim());
      r.input.setAttribute('aria-invalid', String(!valid));
      r.err.hidden = valid;
      return valid;
    }
    required.forEach(function (r) {
      r.input.addEventListener('blur', function () { if (r.input.value) check(r); });
      r.input.addEventListener('input', function () { if (r.input.getAttribute('aria-invalid') === 'true') check(r); });
    });

    function setStatus(text, isError, waText) {
      status.textContent = text;
      status.classList.toggle('is-error', !!isError);
      if (waText) {
        var a = document.createElement('a');
        a.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(waText);
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = js().viaWa;
        status.appendChild(a);
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;
      required.forEach(function (r) { if (!check(r) && !firstInvalid) firstInvalid = r.input; });
      if (firstInvalid) { firstInvalid.focus(); return; }

      if ($('#f-website').value) return; // honeypot

      var s = js();
      var materialLabel = fMaterial.options[fMaterial.selectedIndex].textContent.trim();
      var data = {
        name: $('#f-name').value.trim(),
        company: $('#f-company').value.trim(),
        phone: $('#f-phone').value.trim(),
        material: materialLabel,
        details: fDetails.value.trim()
      };
      var body = [
        s.labels.name + ': ' + data.name,
        s.labels.company + ': ' + (data.company || '-'),
        s.labels.phone + ': ' + data.phone,
        s.labels.material + ': ' + data.material,
        s.labels.details + ': ' + (data.details || '-')
      ].join('\n');
      var subject = s.subject + ': ' + materialLabel + ' / ' + (data.company || data.name);

      var endpoint = form.getAttribute('data-endpoint');
      var submitBtn = $('button[type="submit"]', form);

      function viaMail() {
        window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        setStatus(s.sentMail, false, body);
      }

      if (!endpoint) { viaMail(); return; }

      submitBtn.disabled = true;
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.assign({ _subject: subject, language: lang }, data))
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        setStatus(s.sentApi);
        form.reset();
        fDetails.dataset.auto = '0';
      }).catch(function () {
        viaMail();
      }).then(function () {
        submitBtn.disabled = false;
      });
    });
  }

  /* ------------------------------------------------------------------------
     Gallery lightbox (native <dialog>)
     ------------------------------------------------------------------------ */
  function initLightbox() {
    var dlg = $('#lightbox');
    var img = $('img', dlg);
    var cap = $('.lightbox-cap', dlg);

    $$('.g-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var full = btn.getAttribute('data-full');
        if (typeof dlg.showModal !== 'function') { window.open(full, '_blank', 'noopener'); return; }
        var thumb = $('img', btn);
        img.src = full;
        img.alt = thumb.alt;
        cap.textContent = $('figcaption [data-i18n]', btn.parentElement).textContent;
        dlg.showModal();
      });
    });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === img) dlg.close(); });
    dlg.addEventListener('close', function () { img.removeAttribute('src'); });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  captureEnglish();
  applyLanguage(doc.lang === 'ar' ? 'ar' : 'en', false);

  $('#lang-toggle').addEventListener('click', function () {
    applyLanguage(lang === 'ar' ? 'en' : 'ar', true);
  });

  initHeader();
  initFab();
  initReveal();
  initPrefill();
  initEstimator();
  initForm();
  initLightbox();
})();
