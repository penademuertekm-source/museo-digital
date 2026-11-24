/* Navegación del prototipo: rutas con #, transiciones de Figma y audio. */
(function () {
  const app = document.getElementById('app');
  const audio = document.getElementById('audio');
  let pendiente = null; // transición elegida por el último toque

  // Escala el lienzo de 375 × 667 al tamaño de la ventana, sin recortar.
  function escalar() {
    const s = Math.min(innerWidth / 375, innerHeight / 667), r = document.documentElement.style;
    r.setProperty('--s', s.toFixed(4));
    // Márgenes fuera del lienzo: la animación se recorta ahí para que nada se vea más grande que la pantalla.
    r.setProperty('--vt-x', ((innerWidth - 375 * s) / 2).toFixed(1) + 'px');
    r.setProperty('--vt-y', ((innerHeight - 667 * s) / 2).toFixed(1) + 'px');
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

  /* Smart Animate de Figma: cada capa de la pantalla se anima por separado y en su mismo orden de apilado.
     - data-vt: la misma capa en las dos pantallas (se desliza a su nueva posición, como el panel al contraer).
     - Sin data-vt: el nombre sale de su contenido, así una capa idéntica se queda quieta y una distinta
       se funde, sin quedar escondida debajo del fondo durante la animación. */
  function hashCapa(txt) {
    let h = 5381;
    for (let i = 0; i < txt.length; i++) h = (h * 33 + txt.charCodeAt(i)) | 0;
    return 'k' + (h >>> 0).toString(36);
  }
  function nombrar(on) {
    const capas = app.querySelectorAll('.pantalla > *'), usados = {};
    capas.forEach(el => { el.style.viewTransitionName = ''; });
    if (!on) return;
    capas.forEach(el => {
      let n = el.dataset.vt || hashCapa(el.outerHTML);
      usados[n] = (usados[n] || 0) + 1;
      if (usados[n] > 1) n += '-' + usados[n];
      el.style.viewTransitionName = n;
    });
  }
  let transicion = null;

  function pintar(ruta) {
    app.innerHTML = pantallaDe(ruta);
    if (!avisoVisto && ESTACIONES[ruta.split('/')[0]]) {
      avisoVisto = true;
      try { sessionStorage.setItem('avisoVisto', '1'); } catch (e) { /* sin almacenamiento: se recuerda hasta recargar */ }
    }
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
    nombrar(smart); // Disolver = fundido de la pantalla completa, sin capas
    const vt = transicion = document.startViewTransition(() => { pintar(ruta); nombrar(smart); });
    vt.ready.catch(() => {}); // si el navegador cancela la animación, la pantalla igual cambia
    vt.finished.finally(() => { if (transicion === vt) nombrar(false); });
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
