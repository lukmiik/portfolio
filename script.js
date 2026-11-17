/**
 * Portfolio Theme & Rocker Switch Controller
 * Modern Architectural Rocker Switch (Option 1A)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;
  let inMemoryTheme = null;

  // Web Audio API Synthesizer for tactile mechanical click
  let audioCtx = null;

  function playRockerSound(isDark) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      // 1. Initial mechanical contact transient
      const bufferSize = audioCtx.sampleRate * 0.016;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.0035));
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = audioCtx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = isDark ? 2100 : 1600;
      noiseFilter.Q.value = 2.2;

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.016);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noise.start(now);

      // 2. Low-frequency body snap
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isDark ? 190 : 140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.038);

      oscGain.gain.setValueAtTime(0.32, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(oscGain);
      oscGain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch (_) {}
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || inMemoryTheme;
    } catch (_) {
      return inMemoryTheme;
    }
  }

  function setStoredTheme(theme) {
    inMemoryTheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }

  function getSystemTheme() {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (_) {
      return 'light';
    }
  }

  function applyTheme(theme, playSound) {
    const isDark = theme === 'dark';
    root.setAttribute('data-theme', theme);

    // Keep the mobile browser bar the same colour as the page background
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', isDark ? '#0c0f14' : '#e8eaec');

    const switchBtn = document.getElementById('theme-toggle');
    if (switchBtn) {
      switchBtn.setAttribute('aria-checked', String(isDark));
      switchBtn.setAttribute(
        'title',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }

    if (playSound) {
      playRockerSound(isDark);
    }
  }

  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || getStoredTheme() || getSystemTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    setStoredTheme(newTheme);
    applyTheme(newTheme, true);
  }

  // Expose globally so inline onclick or external callers can invoke it directly
  window.togglePortfolioTheme = toggleTheme;

  function bindEvents() {
    const switchBtn = document.getElementById('theme-toggle');
    if (switchBtn) {
      // Clean up previous listeners and attach click
      switchBtn.onclick = toggleTheme;

      switchBtn.onkeydown = function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindEvents);
  } else {
    bindEvents();
  }

  // Listen for system theme preference changes
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  } catch (_) {}

  // Sync initial state
  const initialTheme = root.getAttribute('data-theme') || getStoredTheme() || getSystemTheme();
  applyTheme(initialTheme, false);
})();

// Runs before Section Navigation so mobile deep links measure collapsed roles
/**
 * Experience accordion (mobile only)
 * Each role collapses to its header (dates, title, company); tapping anywhere
 * on the header opens the summary, bullets and tags. On desktop the toggle
 * button is removed entirely so the title is plain text and nothing collapses.
 */
(function () {
  'use strict';

  const mobileQuery = window.matchMedia('(max-width: 760px)');
  const CHEVRON =
    '<svg class="entry-chevron" viewBox="0 0 16 16" aria-hidden="true">' +
    '<path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const entries = Array.from(document.querySelectorAll('#panel-experience .entry'))
    .map((entry) => ({
      entry,
      title: entry.querySelector('.entry-title'),
      details: entry.querySelector('.entry-details'),
      text: entry.querySelector('.entry-title').textContent.trim(),
      button: null,
    }))
    .filter((e) => e.details);

  function setOpen(e, open) {
    e.entry.classList.toggle('is-open', open);
    e.button.setAttribute('aria-expanded', String(open));
    // Collapsed content must not be reachable by Tab (e.g. the besmart.energy link)
    e.details.toggleAttribute('inert', !open);
  }

  function enable(e) {
    if (e.button) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'entry-toggle';
    btn.setAttribute('aria-controls', e.details.id);
    btn.innerHTML = '<span></span>' + CHEVRON;
    btn.firstChild.textContent = e.text;
    btn.addEventListener('click', () => setOpen(e, !e.entry.classList.contains('is-open')));
    e.title.textContent = '';
    e.title.appendChild(btn);
    e.button = btn;
    // Start collapsed without animating, so the page doesn't visibly fold on load
    e.details.style.transition = 'none';
    e.entry.classList.add('is-accordion');
    setOpen(e, false);
    void e.details.offsetHeight; // flush styles before restoring the transition
    e.details.style.transition = '';
  }

  function disable(e) {
    if (!e.button) return;
    e.title.textContent = e.text;
    e.button = null;
    e.entry.classList.remove('is-accordion', 'is-open');
    e.details.removeAttribute('inert');
  }

  // Dates and company line are part of the tap target too, not just the title
  entries.forEach((e) => {
    e.entry.querySelectorAll('.entry-when, .entry-org').forEach((el) => {
      el.addEventListener('click', (ev) => {
        if (!e.button || ev.target.closest('a')) return;
        e.button.click();
      });
    });
  });

  function sync() {
    entries.forEach(mobileQuery.matches ? enable : disable);
  }

  mobileQuery.addEventListener('change', sync);
  sync();
})();

/**
 * Section Navigation
 * Desktop: one panel visible at a time, switched by tabs, ←/→ and 1–4.
 * Mobile (<= 760px): panels stack and scroll normally; tabs scroll to them.
 * The URL hash (#about, #experience, ...) is the source of truth so sections
 * are linkable and back/forward works.
 */
(function () {
  'use strict';

  const SECTIONS = ['about', 'experience', 'projects', 'education'];
  const mobileQuery = window.matchMedia('(max-width: 760px)');

  const panels = {};
  SECTIONS.forEach((id) => {
    panels[id] = document.querySelector('[data-panel="' + id + '"]');
  });
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const pill = document.querySelector('.tabs-pill');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let current = null;
  const root = document.documentElement;

  function sectionFromHash() {
    const id = location.hash.replace('#', '');
    return SECTIONS.includes(id) ? id : 'about';
  }

  function movePill(id, animate) {
    const tab = tabs.find((t) => t.dataset.nav === id);
    if (!tab || !pill) return;
    pill.classList.toggle('no-anim', !animate);
    pill.style.setProperty('--pill-x', tab.offsetLeft + 'px');
    pill.style.setProperty('--pill-w', tab.offsetWidth + 'px');
  }

  function markTabs(id) {
    tabs.forEach((t) => {
      if (t.dataset.nav === id) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
  }

  // Show a panel on desktop; `focus` moves focus to its heading for screen readers.
  function show(id, opts) {
    const { animate = true, focus = false } = opts || {};
    const prev = current;
    current = id;
    markTabs(id);
    movePill(id, animate);

    if (mobileQuery.matches) return;

    // Non-animated renders (first load, layout switch) skip panel transitions
    root.classList.toggle('is-instant', !animate);
    if (!animate) requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('is-instant')));

    // Slide direction follows tab order so motion matches where you're going
    const dir = prev ? Math.sign(SECTIONS.indexOf(id) - SECTIONS.indexOf(prev)) || 1 : 1;
    document.documentElement.style.setProperty('--dir', dir);

    SECTIONS.forEach((key) => {
      const panel = panels[key];
      const active = key === id;
      panel.classList.toggle('is-active', active);
      panel.classList.toggle('is-leaving', key === prev && !active);
      panel.toggleAttribute('inert', !active);
      panel.setAttribute('aria-hidden', String(!active));
    });

    if (prev !== id) panels[id].scrollTop = 0;
    if (focus) {
      const heading = panels[id].querySelector('[tabindex="-1"]');
      if (heading) heading.focus({ preventScroll: true });
    }
  }

  function go(id) {
    if (location.hash === '#' + id) {
      if (mobileQuery.matches) scrollToPanel(id);
      return;
    }
    location.hash = id; // triggers hashchange -> render
  }

  // While a tab-triggered scroll runs, the observer must not re-highlight the
  // sections being passed, or the pill flickers through every tab on the way.
  let scrollLock = false;
  let scrollLockTimer = null;

  function releaseScrollLock() {
    if (!scrollLock) return;
    scrollLock = false;
    clearTimeout(scrollLockTimer);
    syncActiveFromScroll();
  }

  function scrollToPanel(id, instant) {
    scrollLock = true;
    clearTimeout(scrollLockTimer);
    // Fallback for browsers without `scrollend` (or when nothing needs to scroll)
    scrollLockTimer = setTimeout(releaseScrollLock, 1200);
    const behavior = instant || reducedMotion.matches ? 'auto' : 'smooth';
    // First section goes to the very top so the ŁŁ / switch row is visible too
    if (id === SECTIONS[0]) {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    panels[id].scrollIntoView({ behavior, block: 'start' });
  }

  window.addEventListener('scrollend', releaseScrollLock);

  function render(animate, focus) {
    const id = sectionFromHash();
    if (mobileQuery.matches) {
      markTabs(id);
      movePill(id, animate);
      current = id;
      scrollToPanel(id, !animate);
    } else {
      show(id, { animate, focus });
    }
  }

  // Tab / brand clicks: intercept so mobile scrolls even when hash is unchanged
  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      go(link.dataset.nav);
    });
  });

  window.addEventListener('hashchange', () => {
    // Only section hashes (or none, e.g. going back to the bare URL) navigate
    const id = location.hash.replace('#', '');
    if (id && !SECTIONS.includes(id)) return;
    render(true, true);
  });

  // Skip link: jump focus into the section on screen instead of changing the hash
  const skip = document.querySelector('.skip-link');
  if (skip) {
    skip.addEventListener('click', (e) => {
      e.preventDefault();
      const heading = panels[current] && panels[current].querySelector('[tabindex="-1"]');
      if (heading) heading.focus();
    });
  }

  // Keyboard shortcuts (desktop): ←/→ cycle, 1–4 jump
  document.addEventListener('keydown', (e) => {
    if (mobileQuery.matches) return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const el = document.activeElement;
    if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;

    const idx = SECTIONS.indexOf(current);
    let next = null;
    if (e.key === 'ArrowRight') next = SECTIONS[(idx + 1) % SECTIONS.length];
    else if (e.key === 'ArrowLeft') next = SECTIONS[(idx - 1 + SECTIONS.length) % SECTIONS.length];
    else if (/^[1-4]$/.test(e.key)) next = SECTIONS[Number(e.key) - 1];

    if (next) {
      e.preventDefault();
      go(next);
    }
  });

  // Mobile: keep active tab in sync with scroll position without touching history.
  // Recomputed from positions on every scroll (not IntersectionObserver
  // enter events), so small up/down scrolls can't leave a stale tab selected.
  function sectionAtScroll() {
    const doc = document.documentElement;
    // At the very bottom the last section wins, even if its top never reaches the line
    if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
      return SECTIONS[SECTIONS.length - 1];
    }
    const line = window.innerHeight * 0.3;
    let active = SECTIONS[0];
    SECTIONS.forEach((id) => {
      if (panels[id].getBoundingClientRect().top <= line) active = id;
    });
    return active;
  }

  let syncQueued = false;
  function syncActiveFromScroll() {
    syncQueued = false;
    if (!mobileQuery.matches || scrollLock) return;
    const id = sectionAtScroll();
    if (id === current) return;
    current = id;
    markTabs(id);
    movePill(id, true);
    history.replaceState(null, '', '#' + id);
  }

  window.addEventListener('scroll', () => {
    if (syncQueued) return;
    syncQueued = true;
    requestAnimationFrame(syncActiveFromScroll);
  }, { passive: true });

  // Switching between desktop and mobile layouts resets panel state
  mobileQuery.addEventListener('change', () => {
    SECTIONS.forEach((key) => {
      panels[key].removeAttribute('inert');
      panels[key].removeAttribute('aria-hidden');
      panels[key].classList.remove('is-leaving');
    });
    render(false, false);
  });

  window.addEventListener('resize', () => movePill(current, false));

  // Initial render; re-measure pill once webfonts change tab widths
  render(false, false);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => movePill(current, false));
  }
})();

/**
 * Experience two-pane (desktop only)
 * Left: list of roles (dates, title, company). Right: the selected role's
 * details. Built as an ARIA tablist so ↑/↓ move between roles. On mobile it
 * is torn down and the accordion above takes over.
 */
(function () {
  'use strict';

  const desktopQuery = window.matchMedia('(min-width: 761px)');
  const timeline = document.querySelector('#panel-experience .timeline');
  if (!timeline) return;
  const entries = Array.from(timeline.querySelectorAll(':scope > .entry'));
  let split = null;
  let tabs = [];

  function select(index, focus) {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      entries[i].hidden = !on;
    });
    if (focus) tabs[index].focus();
  }

  function build() {
    if (split) return;
    split = document.createElement('div');
    split.className = 'exp-split';

    const list = document.createElement('div');
    list.className = 'exp-list';
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-label', 'Roles');
    list.setAttribute('aria-orientation', 'vertical');

    tabs = entries.map((entry, i) => {
      entry.id = entry.id || 'exp-entry-' + i;
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'exp-tab';
      tab.id = 'exp-tab-' + i;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', entry.id);
      tab.innerHTML =
        '<span class="exp-tab-when"></span><span class="exp-tab-title"></span><span class="exp-tab-org"></span>';
      // Copy the dates markup so the "Now" pill shows in the list too
      tab.children[0].innerHTML = entry.querySelector('.entry-when').innerHTML;
      tab.children[1].textContent = entry.querySelector('.entry-title').textContent.trim();
      tab.children[2].textContent = entry.querySelector('.entry-org').textContent.trim();

      entry.setAttribute('role', 'tabpanel');
      entry.setAttribute('aria-labelledby', tab.id);

      tab.addEventListener('click', () => select(i, false));
      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();
        const step = e.key === 'ArrowDown' ? 1 : -1;
        select((i + step + entries.length) % entries.length, true);
      });
      list.appendChild(tab);
      return tab;
    });

    timeline.parentNode.insertBefore(split, timeline);
    split.appendChild(list);
    split.appendChild(timeline);
    select(0, false);
  }

  function destroy() {
    if (!split) return;
    split.parentNode.insertBefore(timeline, split);
    split.remove();
    split = null;
    tabs = [];
    entries.forEach((entry) => {
      entry.hidden = false;
      entry.removeAttribute('role');
      entry.removeAttribute('aria-labelledby');
    });
  }

  function sync() {
    if (desktopQuery.matches) build();
    else destroy();
  }

  desktopQuery.addEventListener('change', sync);
  sync();
})();

/* ==========================================================================
 * Projects spotlight (desktop only)
 * A strip of screenshot thumbnails above the projects acts as an ARIA tablist:
 * clicking one (or ←/→ while a thumbnail is focused) shows that project large.
 * On mobile the strip is removed and the projects form a swipe row with dots.
 */
(function () {
  'use strict';

  const desktopQuery = window.matchMedia('(min-width: 761px)');
  const list = document.querySelector('#panel-projects .projects');
  if (!list) return;
  const projects = Array.from(list.querySelectorAll(':scope > .project'));
  let strip = null;
  let tabs = [];

  function select(index, focus) {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      projects[i].hidden = !on;
    });
    if (focus) tabs[index].focus();
  }

  function build() {
    if (strip) return;
    strip = document.createElement('div');
    strip.className = 'proj-strip';
    strip.setAttribute('role', 'tablist');
    strip.setAttribute('aria-label', 'Projects');

    tabs = projects.map((project, i) => {
      project.id = project.id || 'project-' + i;
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'proj-tab';
      tab.id = 'proj-tab-' + i;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', project.id);

      // Thumbnail is the project's own screenshot; the name labels the tab, so alt is empty
      const thumb = project.querySelector('.project-shot').cloneNode();
      thumb.alt = '';
      thumb.loading = 'eager';
      const name = document.createElement('span');
      name.className = 'proj-tab-name';
      name.textContent = project.querySelector('.project-name').textContent.trim();
      tab.append(thumb, name);

      project.setAttribute('role', 'tabpanel');
      project.setAttribute('aria-labelledby', tab.id);

      tab.addEventListener('click', () => select(i, false));
      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        // Inside the strip ←/→ move between projects instead of switching sections
        e.preventDefault();
        e.stopPropagation();
        const step = e.key === 'ArrowRight' ? 1 : -1;
        select((i + step + projects.length) % projects.length, true);
      });
      strip.appendChild(tab);
      return tab;
    });

    list.parentNode.insertBefore(strip, list);
    list.classList.add('is-spotlight');
    select(0, false);
  }

  function destroy() {
    if (!strip) return;
    strip.remove();
    strip = null;
    tabs = [];
    list.classList.remove('is-spotlight');
    projects.forEach((project) => {
      project.hidden = false;
      project.removeAttribute('role');
      project.removeAttribute('aria-labelledby');
    });
  }

  // Mobile swipe row: dots under the row show which project is in view and jump to one
  let dots = null;
  let dotButtons = [];
  let rafId = 0;

  function currentIndex() {
    // The last card can't scroll to the left edge, so the end of the row means the last one
    if (list.scrollLeft >= list.scrollWidth - list.clientWidth - 2) return projects.length - 1;
    const left = list.getBoundingClientRect().left;
    let best = 0;
    projects.forEach((project, i) => {
      const d = Math.abs(project.getBoundingClientRect().left - left - 16);
      if (d < Math.abs(projects[best].getBoundingClientRect().left - left - 16)) best = i;
    });
    return best;
  }

  function markDot() {
    rafId = 0;
    const cur = currentIndex();
    dotButtons.forEach((dot, i) => dot.setAttribute('aria-current', String(i === cur)));
  }

  function onRowScroll() {
    if (!rafId) rafId = requestAnimationFrame(markDot);
  }

  function buildDots() {
    if (dots) return;
    dots = document.createElement('div');
    dots.className = 'proj-dots';
    dotButtons = projects.map((project, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'proj-dot';
      dot.setAttribute('aria-label', 'Show ' + project.querySelector('.project-name').textContent.trim());
      dot.addEventListener('click', () => {
        list.scrollTo({ left: project.offsetLeft - list.offsetLeft - 16, behavior: 'smooth' });
      });
      dots.appendChild(dot);
      return dot;
    });
    list.after(dots);
    list.addEventListener('scroll', onRowScroll, { passive: true });
    markDot();
  }

  function destroyDots() {
    if (!dots) return;
    dots.remove();
    dots = null;
    dotButtons = [];
    list.removeEventListener('scroll', onRowScroll);
  }

  function sync() {
    if (desktopQuery.matches) {
      destroyDots();
      build();
    } else {
      destroy();
      buildDots();
    }
  }

  desktopQuery.addEventListener('change', sync);
  sync();
})();
