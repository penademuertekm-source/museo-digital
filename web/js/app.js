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
    if (reducir || document.hidden || !app.innerHTML) { pintar(ruta); return; }
    if (!document.startViewTransition) { // navegadores sin View Transitions: al menos un fundido de la pantalla nueva
      pintar(ruta);
      app.firstElementChild.animate([{ opacity: 0 }, { opacity: 1 }], { duration: t.d * 1000, easing: 'cubic-bezier(.42,0,.58,1)' });
      return;
    }
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
    // El visor y la vista 2D tienen el audio de su pieza; el resto, el de la estación.
    const fuente = activo && (partes[1] === 'visor' || partes[1] === '2d') ? st.pieza : st;
    if (!activo || !fuente.audioSrc) { audio.pause(); subs = null; return; }
    subs = fuente.subs;
    if (!audio.src.endsWith(fuente.audioSrc)) audio.src = fuente.audioSrc;
    audio.play().catch(() => {});
  }
  let subs = null; // subtítulos [segundo, texto] del audio que suena
  // Con un archivo real, el tiempo y la onda siguen la reproducción.
  audio.addEventListener('timeupdate', () => {
    const t = app.querySelector('[data-tiempo]');
    if (t) t.textContent = Math.floor(audio.currentTime / 60) + ':' + String(Math.floor(audio.currentTime % 60)).padStart(2, '0');
    const p = audio.duration ? audio.currentTime / audio.duration : 0;
    app.querySelectorAll('.onda i').forEach((b, i) => {
      const k = Math.floor(p * 30);
      b.style.background = i < k ? 'var(--primario)' : i === k ? 'var(--acento)' : 'var(--linea)';
    });
    const barra = app.querySelector('.onda[role=slider]');
    if (barra && audio.duration) {
      barra.setAttribute('aria-valuemax', Math.round(audio.duration));
      barra.setAttribute('aria-valuenow', Math.round(audio.currentTime));
      barra.setAttribute('aria-valuetext', t ? t.textContent : '');
    }
    const s = app.querySelector('[data-sub]');
    if (s && subs) {
      const texto = subs.filter(c => c[0] <= audio.currentTime).pop()[1];
      if (s.textContent !== texto) s.textContent = texto;
    }
  });

  // Barra de progreso: tocar o arrastrar con el dedo o el cursor mueve el audio sin pausarlo.
  function buscar(e, barra) {
    if (!audio.duration) return;
    const r = barra.getBoundingClientRect();
    audio.currentTime = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1) * audio.duration;
  }
  app.addEventListener('pointerdown', e => {
    const barra = e.target.closest('.onda[role=slider]');
    if (!barra) return;
    e.preventDefault();
    barra.setPointerCapture(e.pointerId);
    buscar(e, barra);
    const mover = ev => buscar(ev, barra);
    barra.addEventListener('pointermove', mover);
    barra.addEventListener('lostpointercapture', () => barra.removeEventListener('pointermove', mover), { once: true });
  });
  // Con teclado: flechas, 5 s por paso.
  app.addEventListener('keydown', e => {
    const paso = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key];
    if (!paso || !audio.duration || !e.target.closest('.onda[role=slider]')) return;
    e.preventDefault();
    audio.currentTime = Math.min(Math.max(audio.currentTime + paso, 0), audio.duration);
  });

  mostrar();
})();
