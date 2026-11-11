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
