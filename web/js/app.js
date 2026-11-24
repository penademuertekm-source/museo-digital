/* Navegación del prototipo: rutas con #, transiciones de Figma y audio. */
(function () {
  const app = document.getElementById('app');
  const audio = document.getElementById('audio');
  let pendiente = null; // transición elegida por el último toque

  // Escala el lienzo de 375 × 667 al tamaño de la ventana, sin recortar.
  function escalar() {
    const s = Math.min(innerWidth / 375, innerHeight / 667);
    document.documentElement.style.setProperty('--s', s.toFixed(4));
  }
  addEventListener('resize', escalar);
  escalar();

  function pantallaDe(ruta) {
    const [base, sub, extra] = ruta.split('/');
    if (base === 'pasillo') return pasillo(sub === 'sonido');
    if (base === 'mapa') return mapa();
    const st = ESTACIONES[base];
    if (st) {
      if (!sub) return resumen(st, false);
      if (sub === 'audio') return resumen(st, true);
      if (sub === 'historia') return historia(st);
      if (sub === 'galeria') return galeria(st);
      if (sub === 'contraida') return contraida(st);
      if (sub === 'visor') return visor(st, extra === 'audio');
      if (sub === '2d') return vista2d(st, extra === 'audio');
    }
    return portada();
  }

  function nombrar(on) {
    app.querySelectorAll('[data-vt]').forEach(el => { el.style.viewTransitionName = on ? el.dataset.vt : ''; });
  }

  function pintar(ruta) {
    app.innerHTML = pantallaDe(ruta);
    sonido(ruta);
    const titulo = app.querySelector('h2') || app.querySelector('h1');
    document.title = (titulo ? titulo.innerText.replace(/\s+/g, ' ').trim() + ' · ' : '') + 'Museo Festival de la Leyenda Vallenata';
    // Barra de desplazamiento propia de la Historia (riel de 174 px, indicador de 58 px)
    const lectura = app.querySelector('.lectura'), riel = app.querySelector('.riel');
    if (lectura && riel) lectura.addEventListener('scroll', () => {
      const max = lectura.scrollHeight - lectura.clientHeight;
      riel.style.top = 446 + (max > 0 ? (lectura.scrollTop / max) * (174 - 58) : 0) + 'px';
    });
  }

  function mostrar() {
    const ruta = location.hash.replace(/^#\/?/, '') || 'portada';
    const t = pendiente || { t: 'smart', d: 0.3 };
    pendiente = null;
    const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reducir || document.hidden || !app.innerHTML) { pintar(ruta); return; }
    document.documentElement.style.setProperty('--vt-dur', t.d + 's');
    const smart = t.t === 'smart';
    if (smart) nombrar(true);
    document.startViewTransition(() => { pintar(ruta); if (smart) nombrar(true); }).ready.catch(() => {}); // si el navegador cancela la animación, la pantalla igual cambia
  }

  app.addEventListener('click', e => {
    const el = e.target.closest('[data-go]');
    if (!el) return;
    e.preventDefault();
    pendiente = { t: el.dataset.t, d: parseFloat(el.dataset.d) || 0.3 };
    const destino = '#/' + el.dataset.go;
    if (location.hash === destino) { pendiente = null; return; }
    location.hash = destino;
  });
  addEventListener('hashchange', mostrar);

  /* Audio (A1: solo suena tras un toque; A3: un solo audio a la vez).
     Las rutas que terminan en /audio son las pantallas "Audio Activo" de Figma. */
  function sonido(ruta) {
    const partes = ruta.split('/');
    const st = ESTACIONES[partes[0]];
    const activo = partes[partes.length - 1] === 'audio' && st;
    if (!activo || !st.audioSrc) { audio.pause(); return; }
    if (!audio.src.endsWith(st.audioSrc)) audio.src = st.audioSrc;
    audio.play().catch(() => {});
  }
  // Con un archivo real, el tiempo y la onda siguen la reproducción.
  audio.addEventListener('timeupdate', () => {
    const t = app.querySelector('[data-tiempo]');
    if (t) t.textContent = Math.floor(audio.currentTime / 60) + ':' + String(Math.floor(audio.currentTime % 60)).padStart(2, '0');
    const p = audio.duration ? audio.currentTime / audio.duration : 0;
    app.querySelectorAll('.onda i').forEach((b, i) => {
      const k = Math.floor(p * 30);
      b.style.background = i < k ? 'var(--primario)' : i === k ? 'var(--acento)' : 'var(--linea)';
    });
  });

  mostrar();
})();
