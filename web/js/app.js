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
    const [base, sub, extra, extra2] = ruta.split('/');
    if (SALAS[base]) return pasillo(base, sub === 'sonido');
    if (base === 'mapa') return mapa();
    const st = ESTACIONES[base];
    if (st) {
      if (sub === 'pieza') return lamina(st, Number(extra) || 1, extra2 === 'audio');
      if (!sub) return resumen(st, false);
      if (sub === 'audio') return resumen(st, true);
      if (sub === 'historia') return historia(st);
      if (sub === 'galeria') return galeria(st);
      if (sub === 'contraida') return contraida(st);
      if (sub === 'visor') return visor(st, extra === 'audio');
      if (sub === '2d') return vista2d(st, extra === 'audio');
      if (sub === 'consola') return consola(st, extra === 'audio');
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
    // Al pasar de visor a visor con audio la pantalla se vuelve a pintar: se conserva el mismo modelo 3D
    // para que no se recargue ni pierda el giro ni el punto elegido.
    const mvViejo = app.querySelector('model-viewer');
    app.innerHTML = pantallaDe(ruta);
    const mv = app.querySelector('model-viewer');
    if (mv && mvViejo && mvViejo.getAttribute('src') === mv.getAttribute('src')) { mv.replaceWith(mvViejo); marcarChip(Number(mvViejo.dataset.activo || 0)); }
    if (mv) cargarVisor3D();
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
    let ruta = location.hash.replace(/^#\/?/, '') || 'portada';
    const base = ruta.split('/')[0];
    // Solo claves propias: «#/constructor» o «#/__proto__» llevarían a objetos heredados y romperían la pantalla.
    if (base !== 'mapa' && !Object.hasOwn(SALAS, base) && !Object.hasOwn(ESTACIONES, base)) ruta = 'portada';
    const t = pendiente || { t: 'smart', d: 0.3 };
    pendiente = null;
    const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducir || document.hidden || !app.innerHTML) { pintar(ruta); return; }
    // Fundido de la pantalla nueva: para navegadores sin View Transitions y cuando el navegador cancela la transición
    // (pasaba en un Android real: la pantalla saltaba sin animación).
    const fundido = () => app.firstElementChild.animate([{ opacity: 0, translate: (t.dir === 'izq' ? 18 : t.dir === 'der' ? -18 : 0) + 'px 0' }, { opacity: 1, translate: '0 0' }],
      { duration: t.d * 1000, easing: 'cubic-bezier(.42,0,.58,1)' });
    if (!document.startViewTransition) { pintar(ruta); fundido(); anotar('sin View Transitions: fundido'); return; }
    document.documentElement.style.setProperty('--vt-dur', t.d + 's');
    const smart = t.t === 'smart';
    nombrar(smart); // Disolver = fundido de la pantalla completa, sin capas
    document.documentElement.dataset.desliza = t.dir || '';
    const vt = transicion = document.startViewTransition(() => { pintar(ruta); nombrar(smart); });
    vt.ready.then(() => anotar('transición ok → ' + ruta), e => {
      anotar('transición cancelada (' + e.name + ': ' + e.message + ') → fundido');
      vt.updateCallbackDone.then(() => { if (transicion === vt) fundido(); });
    });
    vt.finished.finally(() => {
      if (transicion !== vt) return;
      nombrar(false); document.documentElement.dataset.desliza = '';
      anotar('fin ' + Math.round(performance.now() - t0) + ' ms');
    });
  }

  /* Diagnóstico en pantalla con ?diag en la dirección (para revisar en un teléfono real sin computador). */
  const diag = /[?&]diag\b/.test(location.search) ? document.body.appendChild(document.createElement('pre')) : null;
  function anotar(txt) {
    if (!diag) return;
    diag.textContent = (txt + '\n' + diag.textContent).slice(0, 900);
  }
  if (diag) {
    diag.style.cssText = 'position:fixed;left:4px;right:4px;bottom:4px;max-height:38vh;overflow:auto;z-index:9;margin:0;padding:6px 8px;background:rgba(0,0,0,.82);color:#9f9;font:11px/1.35 monospace;white-space:pre-wrap;pointer-events:none';
    anotar(navigator.userAgent + '\nreducir movimiento: ' + matchMedia('(prefers-reduced-motion: reduce)').matches
      + ' · View Transitions: ' + !!document.startViewTransition + ' · ancho ' + innerWidth + ' · escala ' + getComputedStyle(document.documentElement).getPropertyValue('--s'));
    const t0 = performance.now();
  }

  app.addEventListener('click', e => {
    const el = e.target.closest('[data-go]');
    if (!el) return;
    e.preventDefault();
    pendiente = { t: el.dataset.t, d: parseFloat(el.dataset.d) || 0.3, dir: el.dataset.dir };
    const destino = '#/' + el.dataset.go;
    if (location.hash === destino) { pendiente = null; return; }
    location.hash = destino;
  });
  addEventListener('hashchange', mostrar);

  /* Audio (A1: solo suena tras un toque; A3: un solo audio a la vez).
     Las rutas que terminan en /audio son las pantallas "Audio Activo" de Figma. */
  /* Deslizar el panel de la estación pasa entre Resumen, Historia y Galería, igual que los puntos de abajo. */
  let dedo = null, tragarClic = -1;
  app.addEventListener('pointerdown', e => {
    dedo = null;
    if (!e.isPrimary || e.target.closest('.onda, model-viewer')) return;
    const r = app.getBoundingClientRect(), s = r.height / 667;
    if ((e.clientY - r.top) / s >= 372) dedo = { x: e.clientX, y: e.clientY, t: e.timeStamp, s }; // solo sobre el panel
  });
  app.addEventListener('pointerup', e => {
    const d = dedo; dedo = null;
    if (!d) return;
    const dx = (e.clientX - d.x) / d.s, dy = (e.clientY - d.y) / d.s;
    if (Math.abs(dx) < 50 || Math.abs(dx) < 1.5 * Math.abs(dy) || e.timeStamp - d.t > 600) return;
    const [id, sub = ''] = location.hash.replace(/^#\/?/, '').split('/');
    const i = ['', 'historia', 'galeria'].indexOf(sub === 'audio' ? '' : sub), j = i + (dx < 0 ? 1 : -1);
    if (!Object.hasOwn(ESTACIONES, id) || i < 0 || j < 0 || j > 2) return;
    tragarClic = e.timeStamp; // el clic que sigue al gesto no debe abrir nada
    pendiente = { t: 'smart', d: 0.3, dir: dx < 0 ? 'izq' : 'der' };
    location.hash = '#/' + [id, id + '/historia', id + '/galeria'][j];
  });
  app.addEventListener('pointercancel', () => { dedo = null; });
  app.addEventListener('click', e => { if (e.timeStamp - tragarClic < 500) { e.stopPropagation(); e.preventDefault(); } }, true);

  function sonido(ruta) {
    const partes = ruta.split('/');
    const st = ESTACIONES[partes[0]];
    const activo = partes[partes.length - 1] === 'audio' && st;
    // El visor y la vista 2D tienen el audio de su pieza; la lámina, el del punto elegido; el resto, el de la estación.
    const fuente = !activo ? st : partes[1] === 'pieza' ? st.pieza.puntos[Number(partes[2]) - 1]
      : partes[1] === 'visor' || partes[1] === '2d' || partes[1] === 'consola' ? st.pieza : st;
    prepararConsola(st && partes[1] === 'consola' ? st : null);
    if (!activo || !fuente.audioSrc) { audio.pause(); subs = null; return; }
    subs = fuente.subs;
    if (!audio.src.endsWith(fuente.audioSrc)) audio.src = fuente.audioSrc;
    audio.play().catch(() => {});
  }
  let subs = null; // subtítulos [segundo, texto] del audio que suena

  /* Consola multipista: #audio lleva el primer canal y los demás suenan en <audio> extra, sincronizados con él.
     Así la barra, el tiempo, los subtítulos y "un solo audio a la vez" siguen funcionando igual. */
  const extras = [];
  let enConsola = null;
  function prepararConsola(st) {
    enConsola = st;
    const pistas = st ? st.pieza.pistas.slice(1) : [];
    while (extras.length < pistas.length) extras.push(new Audio());
    extras.forEach((a, i) => {
      if (i >= pistas.length) { a.pause(); return; }
      if (!a.src.endsWith(pistas[i].src)) { a.preload = 'auto'; a.src = pistas[i].src; }
    });
    mezclar();
  }
  function mezclar() { // aplica los canales silenciados y pinta su estado
    const mudos = enConsola ? mezcla[enConsola.id] || new Set() : new Set();
    audio.muted = mudos.has(0);
    extras.forEach((a, i) => { a.muted = mudos.has(i + 1); });
    app.querySelectorAll('[data-canal]').forEach(b => b.setAttribute('aria-pressed', !mudos.has(Number(b.dataset.canal))));
  }
  const activas = () => enConsola ? extras.slice(0, enConsola.pieza.pistas.length - 1) : [];
  audio.addEventListener('play', () => { activas().forEach(a => { a.currentTime = audio.currentTime; a.play().catch(() => {}); }); latir(); });
  audio.addEventListener('pause', () => extras.forEach(a => a.pause()));
  audio.addEventListener('seeked', () => activas().forEach(a => { a.currentTime = audio.currentTime; }));
  audio.addEventListener('timeupdate', () => activas().forEach(a => { if (Math.abs(a.currentTime - audio.currentTime) > 0.15) a.currentTime = audio.currentTime; }));
  app.addEventListener('click', e => {
    const canal = e.target.closest('[data-canal]'), solo = e.target.closest('[data-solo]');
    if (!enConsola || !(canal || solo)) return;
    const mudos = mezcla[enConsola.id];
    if (canal) { const i = Number(canal.dataset.canal); mudos.has(i) ? mudos.delete(i) : mudos.add(i); }
    else { const deja = solo.dataset.solo.split(',').map(Number); mudos.clear(); enConsola.pieza.pistas.forEach((c, i) => { if (!deja.includes(i)) mudos.add(i); }); }
    mezclar();
  });
  // Puntos del compás: avanzan con el pulso medido mientras suena la consola.
  function latir() {
    const fila = app.querySelector('[data-pulsos]');
    if (!fila || audio.paused) { if (fila) fila.querySelectorAll('.pulso').forEach(p => p.classList.remove('on')); return; }
    const n = Number(fila.dataset.pulsos), k = Math.floor(audio.currentTime * Number(fila.dataset.bpm) / 60) % n;
    fila.querySelectorAll('.pulso').forEach((p, i) => p.classList.toggle('on', i === k));
    requestAnimationFrame(latir);
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

  /* Visor 3D (pieza.modelo). model-viewer se carga solo la primera vez que se abre un visor con modelo. */
  function cargarVisor3D() {
    if (customElements.get('model-viewer') || document.getElementById('model-viewer-js')) return;
    const js = document.createElement('script');
    js.id = 'model-viewer-js'; js.type = 'module';
    js.src = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@4.0.0/dist/model-viewer.min.js';
    // SRI: el navegador no ejecuta el archivo si el CDN lo cambia (hash publicado por jsDelivr para 4.0.0).
    js.integrity = 'sha384-sr9b4Ux0WhAUGclJ0ym0FSY2zSOMmNSn0bP/SA0e6bNCrpn/5W3QL8mm+LdlQMKw';
    js.crossOrigin = 'anonymous'; js.referrerPolicy = 'no-referrer';
    js.onerror = () => ayuda('No se pudo cargar el visor 3D. Revisa la conexión.', 0);
    document.head.appendChild(js);
  }
  // Chips 1·2·3 del panel y puntos del modelo: el activo va en vino, como en Figma.
  function marcarChip(i) {
    app.querySelectorAll('[data-chip]').forEach((c, k) => {
      c.style.background = k === i ? 'var(--primario)' : 'var(--crema)';
      c.style.color = k === i ? 'var(--sobre-marca)' : '';
    });
    app.querySelectorAll("button[data-punto]").forEach((b, k) => {
      const img = b.querySelector('img'), t = k === i ? 34 : 28;
      img.src = 'assets/svg/' + (k === i ? 'hotspot-activo' : 'hotspot') + '.svg'; img.width = img.height = t;
      b.setAttribute('aria-pressed', k === i);
    });
  }
  let avisoAyuda = null;
  function ayuda(texto, ms = 3500) { // mensaje breve en la cápsula de ayuda del visor
    const p = app.querySelector('[data-ayuda]'); if (!p) return;
    if (!p.dataset.original) p.dataset.original = p.textContent;
    p.textContent = texto; clearTimeout(avisoAyuda);
    if (ms) avisoAyuda = setTimeout(() => { p.textContent = p.dataset.original; }, ms);
  }
  app.addEventListener('click', e => {
    const mv = app.querySelector('model-viewer'); if (!mv) return;
    const punto = e.target.closest("button[data-punto]"), zoom = e.target.closest('[data-zoom]');
    const anillo = app.querySelector('[data-anillo]'); // el anillo del piso solo cuadra con la vista inicial
    if (anillo && (punto || zoom)) anillo.style.opacity = 0;
    if (punto) {
      const i = Number(punto.dataset.punto);
      mv.dataset.activo = i; marcarChip(i);
      mv.cameraTarget = punto.dataset.position; mv.cameraOrbit = punto.dataset.orbita;
    } else if (zoom && mv.zoom) mv.zoom(Number(zoom.dataset.zoom));
    else if (e.target.closest('[data-reiniciar]')) {
      mv.cameraTarget = 'auto auto auto'; mv.cameraOrbit = mv.dataset.orbitaInicial; mv.fieldOfView = 'auto';
      mv.dataset.activo = 0; marcarChip(0); if (anillo) anillo.style.opacity = 1;
    } else if (e.target.closest('[data-ra]')) {
      if (mv.canActivateAR) mv.activateAR();
      else ayuda(mv.loaded ? 'La realidad aumentada se abre desde un celular compatible.' : 'Espera a que cargue el modelo…');
    }
  });

  mostrar();
})();
