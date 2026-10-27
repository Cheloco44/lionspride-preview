// Lions Pride Barbell — design preview (staging). Shared header, footer and the
// demo booking widget. Nothing here sends data anywhere.
(function () {
  var PHONE = '801-823-4404';
  var PHONE_LINK = 'tel:+18018234404';
  var SMS_LINK = 'sms:+18018234404';
  var page = document.body.getAttribute('data-page');

  var links = [
    ['memberships.html', 'Memberships', 'memberships'],
    ['coaching.html', 'Coaching', 'coaching'],
    ['recovery.html', 'Recovery', 'recovery'],
    ['faq.html', 'FAQ', 'faq'],
    ['book.html#contact', 'Contact', 'contact']
  ];

  var banner = '<div class="preview-banner" role="note">Design preview for Lions Pride Barbell &amp; Fitness. This is not the official website, and forms are disabled.</div>';

  var header =
    '<header class="site-header"><div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="Lions Pride Barbell home">' +
        '<span class="brand-mark">LPB</span>' +
        '<span class="brand-text">LIONS PRIDE<small>BARBELL &amp; FITNESS</small></span>' +
      '</a>' +
      '<button class="menu-toggle" aria-label="Open menu" aria-expanded="false">☰</button>' +
      '<nav class="nav" aria-label="Main">' +
        links.map(function (l) {
          return '<a href="' + l[0] + '"' + (l[2] === page ? ' aria-current="page"' : '') + '>' + l[1] + '</a>';
        }).join('') +
        '<a class="btn btn-gold" href="book.html">Book a visit</a>' +
      '</nav>' +
    '</div></header>';

  var year = new Date().getFullYear();
  var footer =
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="cols">' +
        '<div><h4>Lions Pride Barbell &amp; Fitness</h4>' +
          '<p style="margin:0 0 8px">Layton\'s 24/7 strength and powerlifting gym.</p>' +
          '<p style="margin:0">887 McCormick Way, Suite 2<br>Layton, UT 84041</p></div>' +
        '<div><h4>Contact</h4><ul>' +
          '<li><a href="' + PHONE_LINK + '">Call ' + PHONE + '</a></li>' +
          '<li><a href="' + SMS_LINK + '">Text ' + PHONE + '</a></li>' +
          '<li><a href="mailto:office@LionsPrideBarbell.com">office@LionsPrideBarbell.com</a></li>' +
        '</ul></div>' +
        '<div><h4>More</h4><ul>' +
          '<li><a href="gallery.html">Photo gallery</a></li>' +
          '<li><a href="https://noneckapparel.com/" rel="noopener">Shop merch</a></li>' +
          '<li><a href="#">Gift cards</a></li>' +
          '<li><a href="#">Blog</a></li>' +
          '<li><a href="#">Refer a friend (coming soon)</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="legal">© ' + year + ' Lions Pride Barbell LLC · Design preview, not the official site</div>' +
    '</div></footer>';

  var mobileCta =
    '<div class="mobile-cta">' +
      '<a class="btn btn-outline" href="' + SMS_LINK + '">Text us</a>' +
      '<a class="btn btn-gold" href="book.html">Book a visit</a>' +
    '</div>';

  document.body.insertAdjacentHTML('afterbegin', banner + header);
  document.body.insertAdjacentHTML('beforeend', mobileCta + footer);

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // ── Demo booking widget (book.html) ─────────────────────────────────────────
  var daysEl = document.getElementById('days');
  if (!daysEl) return;
  var slotsEl = document.getElementById('slots');
  // Placeholder staffed visit times — the owner sets the real ones.
  var TIMES = { weekday: ['5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm', '7:30 pm'], sat: ['9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am'] };
  var chosen = { day: null, time: null };
  var d = new Date();
  for (var i = 1, made = 0; made < 7 && i < 14; i++) {
    var day = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    if (day.getDay() === 0) continue; // closed for visits on Sundays (placeholder)
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'day';
    b.dataset.kind = day.getDay() === 6 ? 'sat' : 'weekday';
    b.dataset.label = day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    b.innerHTML = day.toLocaleDateString('en-US', { weekday: 'short' }) + '<small>' + day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + '</small>';
    b.setAttribute('aria-pressed', made === 0 ? 'true' : 'false');
    daysEl.appendChild(b); made++;
  }
  function renderSlots(kind) {
    slotsEl.innerHTML = '';
    TIMES[kind].forEach(function (t) {
      var s = document.createElement('button');
      s.type = 'button'; s.className = 'slot'; s.textContent = t; s.setAttribute('aria-pressed', 'false');
      slotsEl.appendChild(s);
    });
    chosen.time = null;
  }
  var first = daysEl.querySelector('.day');
  chosen.day = first.dataset.label; renderSlots(first.dataset.kind);
  daysEl.addEventListener('click', function (e) {
    var b = e.target.closest('.day'); if (!b) return;
    daysEl.querySelectorAll('.day').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    chosen.day = b.dataset.label; renderSlots(b.dataset.kind);
  });
  slotsEl.addEventListener('click', function (e) {
    var s = e.target.closest('.slot'); if (!s) return;
    slotsEl.querySelectorAll('.slot').forEach(function (x) { x.setAttribute('aria-pressed', x === s ? 'true' : 'false'); });
    chosen.time = s.textContent;
  });
  document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault(); // demo only: nothing is sent or stored
    if (!chosen.time) { alert('Pick a time first.'); return; }
    var ok = document.getElementById('success');
    ok.querySelector('[data-when]').textContent = chosen.day + ' at ' + chosen.time;
    ok.classList.add('show');
    e.target.reset();
    ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
