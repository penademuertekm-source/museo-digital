/* Pantallas de cada estación (Resumen, Audio Activo, Historia, Galería, Contraída, Visor, Vista 2D y sus variantes con audio).
   Medidas del Figma de la docente; usa las piezas compartidas de pantallas.js. */

/* Marco común de Resumen, Historia, Galería y Contraída: escenario, encabezado, flechas y píldora.
   El botón de sonido de la barra lleva siempre a "Audio Activo" (en Audio Activo, de vuelta al Resumen). */
function marcoEstacion(st, sonando, contenido) {
  return `
  <section class="pantalla">
    ${fondoEstacion(st)}
    ${encabezadoEstacion(st, sonando, sonando ? st.id : st.id + '/audio')}
    ${contenido}
    ${flechasEstacion(st)}
    ${pildoraInmersiva(st)}
  </section>`;
}

function cabeceraPanel(st, sub, top = 372) {
  const d = top - 372;
  return `
    <div class="a" style="${px(0, top, 375, 667 - top)}background:var(--papel);border-radius:24px 24px 0 0" data-vt="panel"></div>
    <h2 class="a fr sb nw" style="${px(24, 388 + d, 327)}font-size:20px;letter-spacing:-0.4px" data-vt="titulo">${st.titulo}</h2>
    <div class="a" style="${px(24, 420 + d, 3, 13)}background:var(--acento);border-radius:1.5px" data-vt="acento"></div>
    <p class="a sb nw" style="${px(33, 416.5 + d, 280)}color:var(--primario);font-size:12px;line-height:20px;letter-spacing:.12px" data-vt="subtitulo">${sub}</p>`;
}

const botonContraer = st => `<button class="a hov" aria-label="Contraer tarjeta" aria-expanded="true" ${go(st.id + '/contraida')} style="${px(311, 352, 40, 40)}" data-vt="contraer"><img src="${S}contraer.svg" alt="" width="40" height="40"></button>`;

/* ---------- 1. Resumen (232:6165) y 2. Audio Activo (232:6429) ---------- */
function resumen(st, sonando) {
  const dest = sonando ? st.id : st.id + '/audio';
  return marcoEstacion(st, sonando, `
    ${cabeceraPanel(st, st.subtitulo)}
    <p class="a" style="${px(24, 446, 327, 51)}color:var(--texto-2);font-size:12px;line-height:17px" data-vt="resumen">${st.resumen}</p>
    ${reproductor(st, sonando, dest)}
    ${subtitulos(st, sonando)}
    ${botonContraer(st)}
    ${selectorPestanas(st, 0)}`);
}

/* ---------- 3. Historia (232:6249): lectura con desplazamiento ---------- */
function historia(st) {
  const h = st.historia, txt = 'font-size:11.5px;line-height:16.5px;color:#302019';
  return marcoEstacion(st, false, `
    ${cabeceraPanel(st, h.sub)}
    <div class="a lectura" tabindex="0" role="region" aria-label="Historia" style="${px(24, 444, 327, 180)}">
      <div style="position:relative;width:311px;height:190px">
        <span class="a fr b" aria-hidden="true" style="${px(0, 0)}color:var(--primario);font-size:31px;line-height:31px">${h.letra}</span>
        <p class="a" style="${px(27, 0, 284)}${txt}"><span class="sr">${h.letra}</span>${h.l1}</p>
        <p class="a" style="${px(0, 33, 311)}${txt}">${h.p1}</p>
        <h3 class="a fr b" style="${px(0, 95, 311)}font-size:13px;line-height:16px">${h.h}</h3>
        <p class="a" style="${px(0, 115, 311)}${txt}">${h.p2}</p>
      </div>
    </div>
    <div class="a" style="${px(24, 592, 314, 32)}background:linear-gradient(180deg,rgba(253,249,241,0),#fdf9f1);pointer-events:none"></div>
    <div class="a" style="${px(346, 446, 4, 174)}background:rgba(36,22,17,.1);border-radius:2px"></div>
    <div class="a riel" style="${px(346, 446, 4, 58)}background:rgba(138,31,43,.85);border-radius:2px"></div>
    ${botonContraer(st)}
    ${selectorPestanas(st, 1)}`);
}

/* ---------- 4. Galería (232:6296) ---------- */
function galeria(st) {
  const g = st.galeria;
  // Cada foto es un botón: al tocarla se amplía (app.js, «Foto ampliada»).
  const foto = (i, l, t, w, h, r, gh, fs, fw, tx, ty) => {
    const alt = g.fotos[i - 1].replace(/^\d\/3 · /, '').replace('\n', ' ');
    const dos = g.fotos[i - 1].includes('\n'); // pie en dos líneas, como en el Figma nuevo (Est. 4.1)
    return `
    <button class="a hov" data-ampliar aria-label="Ampliar foto: ${alt}" style="${px(l, t, w, h)}border-radius:${r}px;overflow:hidden">
      <img class="cubre" src="assets/img/${st.id}-galeria-${i}.jpg" alt="${alt}"${g.pos && g.pos[i - 1] ? ` style="object-position:${g.pos[i - 1]}"` : ''}>
      <span class="a" style="${px(0, h - gh, w, gh)}background:linear-gradient(180deg,rgba(24,14,10,0),rgba(24,14,10,${i === 1 ? .85 : .82}))"></span>
      <span class="a nw" data-pie style="${px(tx, dos ? (i === 1 ? 119 : 45) : ty)}color:var(--sobre-marca);font-size:${fs}px;font-weight:${fw}${dos ? ';white-space:pre;line-height:12px' : ''}">${g.fotos[i - 1]}</span>
    </button>`;
  };
  return marcoEstacion(st, false, `
    ${cabeceraPanel(st, g.sub)}
    ${foto(1, 24, 444, 190, 148, 12, 52, 10.5, 600, 10, 124)}
    ${foto(2, 222, 444, 129, 70, 10, 32, 9.5, 500, 8, 51)}
    ${foto(3, 222, 522, 129, 70, 10, 32, 9.5, 500, 8, 51)}
    <p class="a" style="${px(24, 605, 327, 18)}color:var(--texto-2);font-size:11px">${g.nota}</p>
    ${botonContraer(st)}
    ${selectorPestanas(st, 2)}`);
}

/* ---------- 5. Contraída (232:6344) ---------- */
function contraida(st) {
  return marcoEstacion(st, false, `
    ${cabeceraPanel(st, st.subtitulo, 534)}
    <p class="a" style="${px(24, 603, 327, 51)}color:var(--texto-2);font-size:12px;line-height:17px" data-vt="resumen">${st.resumen}</p>
    <button class="a hov" aria-label="Desplegar tarjeta" aria-expanded="false" ${go(st.id)} style="${px(311, 514, 40, 40)}" data-vt="contraer"><img src="${S}desplegar.svg" alt="" width="40" height="40"></button>`);
}

/* Centra el contenido en su caja (números dentro de su círculo, texto dentro de su cápsula). */
const centro = 'display:flex;align-items:center;justify-content:center;line-height:1;';

/* Panel inferior del visor y de la vista 2D: fichas 1·2·3, título, reproductor y subtítulos (desde y = 428). */
function panelPieza(st, sonando, dest, sub, colorSub, conModelo) {
  const p = st.pieza, tag = conModelo ? 'button' : 'span'; // con modelo 3D las fichas llevan la cámara a su punto (app.js)
  return `
    <div class="a" style="${px(0, 428, 375, 239)}background:var(--papel);border-radius:24px 24px 0 0"></div>
    <div class="a" style="${px(24, 446, 327, 26)}display:flex;gap:8px">${p.chips.map((c, i) => `<${tag} class="sb nw" data-chip="${i}"${conModelo ? ` aria-label="Ver ${c.replace(/^\d+\.\s*/, '')} en el modelo"` : ''} style="height:26px;border-radius:13px;font-size:10px;padding:0 14px;${centro}${i === 0 ? 'background:var(--primario);color:var(--sobre-marca)' : 'background:var(--crema)'}">${c}</${tag}>`).join('')}</div>
    <h2 class="a fr b nw" style="${px(24, 484)}font-size:19px">${p.titulo}</h2>
    <div class="a" style="${px(24, 513, 3, 13)}background:var(--acento);border-radius:1.5px"></div>
    <p class="a sb nw" style="${px(33, 512)}color:${colorSub};font-size:11px">${sub}</p>
    ${reproductor(p, sonando, dest, 536)}
    ${subtitulos(p, sonando, 596)}`;
}

/* ---------- 6. Visor 3D-AR / 360° (232:6546) y 6B. Visor Audio Activo (232:9639) ----------
   Con modelo (pieza.modelo): <model-viewer> gira con el dedo, los puntos 1·2·3 llevan la cámara a cada parte,
   + / − / ↺ acercan, alejan y vuelven al inicio, y la píldora «Visor 3D / AR» abre la RA (app.js).
   Sin modelo sigue la lámina fija del Figma (temporal) hasta que el equipo entregue el GLB o la foto 360°. */
function visor(st, sonando) {
  const p = st.pieza, dest = sonando ? st.id + '/visor' : st.id + '/visor/audio', m = p.modelo;
  const punto = (pt, i) => `<button class="punto" slot="hotspot-${i + 1}" data-punto="${i}" data-position="${pt.pos}" data-normal="${pt.nor}" data-orbita="${pt.orbita}" aria-label="Punto ${i + 1}: ${pt.nombre}" aria-pressed="${i === 0}"><img src="${S}${i === 0 ? 'hotspot-activo' : 'hotspot'}.svg" alt="" width="${i === 0 ? 34 : 28}" height="${i === 0 ? 34 : 28}"><span class="b">${i + 1}</span></button>`;
  return `
  <section class="pantalla" style="background:#140c09">
    ${m ? fondo('<div class="a" style="inset:0;background:radial-gradient(ellipse at 50% 38%,#f4ead6 0%,#d8ccb6 48%,#8a7a66 100%)"></div>')
        : fondo(`<img class="a" src="${st.escenario}" alt="${st.altEscenario}" style="${px(-20, -45, 414, 742)}object-fit:cover">`)}
    ${m ? `<img class="a" data-anillo src="${S}anillo-360.svg" alt="" style="${px(44, 286, 286, 68)}transition:opacity .3s">
    <model-viewer class="a" src="${m}" alt="${p.altModelo}" camera-controls touch-action="pan-y" camera-orbit="0deg 80deg auto" min-camera-orbit="auto auto 0.45m"
      interaction-prompt="none" shadow-intensity="1" exposure="${p.exposicion || 1.2}" ar ar-modes="webxr scene-viewer quick-look" ar-placement="${p.colocacion || 'floor'}" ar-scale="auto"
      data-orbita-inicial="0deg 80deg auto" style="${px(0, 40, 375, 388)}">
      ${p.puntos.map(punto).join('')}
      <span slot="ar-button" hidden></span>
    </model-viewer>` : ''}
    <div class="a" style="${px(0, 0, 375, 460)}pointer-events:none;background:${m ? 'linear-gradient(180deg,rgba(18,11,8,.55) 0%,rgba(18,11,8,0) 22%)' : 'linear-gradient(180deg,rgba(18,11,8,.65) 0%,rgba(18,11,8,.1) 35%,rgba(18,11,8,.18) 75%,rgba(18,11,8,.78) 100%)'}" data-vt="degradado-sup"></div>
    <button class="a hov" aria-label="Salir del visor" ${go(st.id)} style="${px(16, 16, 34, 34)}" data-vt="regresar"><img src="${S}regresar.svg" alt="" width="34" height="34"></button>
    <nav class="a" aria-label="Modo de vista" style="${px(58, 16, 301, 34)}background:rgba(237,227,206,.94);border:1px solid rgba(224,169,46,.4);border-radius:17px;overflow:hidden" data-vt="modo">
      ${m ? `<button class="a sb nw" data-ra aria-current="page" aria-label="${p.modo}: toca para ver la pieza en realidad aumentada"` : `<span class="a sb nw" aria-current="page"`} style="${px(2, 2, 144, 28)}background:var(--primario);border-radius:14px;color:var(--sobre-marca);font-size:10.5px;${centro}">● ${p.modo}${m ? '</button>' : '</span>'}
      <button class="a sb nw" ${go(st.id + '/2d')} style="${px(151, 2, 146, 28)}background:rgba(247,243,236,.85);border-radius:14px;font-size:10.5px;${centro}">Ver en 2D</button>
    </nav>
    ${m ? '' : `<img class="a" src="${S}anillo-360.svg" alt="" style="${px(44, 286, 286, 68)}">
    <img class="a" src="${S}hotspot-activo.svg" alt="" style="${px(168, 182, 34, 34)}">
    <span class="a b" style="${px(168, 182, 34, 34)}${centro}color:var(--sobre-marca);font-size:10px">1</span>
    <img class="a" src="${S}hotspot.svg" alt="" style="${px(84, 248, 28, 28)}">
    <span class="a b" style="${px(84, 248, 28, 28)}${centro}font-size:9.5px">2</span>
    <img class="a" src="${S}hotspot.svg" alt="" style="${px(246, 234, 28, 28)}">
    <span class="a b" style="${px(246, 234, 28, 28)}${centro}font-size:9.5px">3</span>`}
    <div class="a b" ${m ? 'role="group" aria-label="Zoom del modelo"' : 'aria-hidden="true"'} style="${px(327, 168, 32, 96)}background:rgba(28,17,13,.78);border:1px solid rgba(224,169,46,.4);border-radius:16px;${m ? '' : 'overflow:hidden;'}color:var(--sobre-marca)">
      ${m ? `<button class="a ctrl" data-zoom="3" aria-label="Acercar" style="${px(0, 0, 32, 31)}font-size:14px;${centro}">+</button>` : `<span class="a" style="${px(9, 5)}font-size:14px">+</span>`}
      <span class="a" style="${px(4, 30, 20, 1)}background:rgba(244,234,214,.18)"></span>
      ${m ? `<button class="a ctrl" data-zoom="-3" aria-label="Alejar" style="${px(0, 31, 32, 31)}font-size:14px;${centro}">−</button>` : `<span class="a" style="${px(9, 37)}font-size:14px">−</span>`}
      <span class="a" style="${px(4, 62, 20, 1)}background:rgba(244,234,214,.18)"></span>
      ${m ? `<button class="a ctrl" data-reiniciar aria-label="Volver a la vista inicial" style="${px(0, 63, 32, 32)}font-size:12.5px;color:var(--acento);${centro}">↺</button>` : `<span class="a" style="${px(8, 68)}font-size:12.5px;color:var(--acento)">↺</span>`}
    </div>
    <p class="a m nw" ${m ? 'data-ayuda role="status" ' + pista('visor') : ''} style="${px(52, 378, 271, 28)}background:rgba(28,17,13,.84);border:1px solid rgba(224,169,46,.45);border-radius:14px;color:var(--sobre-marca);font-size:10px;${centro}">↻ Inicio quieto · Arrastra 360° o toca 1, 2, 3</p>
    ${panelPieza(st, sonando, dest, p.sub, 'var(--primario)', !!m)}
  </section>`;
}

/* ---------- 7. Vista 2D (232:6628) y 7B. Vista 2D Audio Activo (232:9770) ---------- */
function vista2d(st, sonando) {
  const p = st.pieza, dest = sonando ? st.id + '/2d' : st.id + '/2d/audio';
  const marcas = [[73, 91], [155, 117], [241, 97]];
  return `
  <section class="pantalla" style="background:#ebe1cd">
    <button class="a hov" aria-label="Salir de la vista 2D" ${go(st.id)} style="${px(16, 16, 34, 34)}" data-vt="regresar"><img src="${S}regresar.svg" alt="" width="34" height="34"></button>
    <nav class="a" aria-label="Modo de vista" style="${px(58, 16, 301, 34)}background:#f7f3ec;border:1px solid rgba(63,94,58,.45);border-radius:17px;overflow:hidden" data-vt="modo">
      <span class="a sb nw" aria-current="page" style="${px(135, 2, 162, 28)}background:var(--secundario);border-radius:14px;color:var(--sobre-marca);font-size:10.5px;${centro}">✓ Vista 2D</span>
      <button class="a sb nw" ${go(st.id + '/visor')} style="${px(2, 2, 130, 28)}background:rgba(237,227,206,.7);border-radius:14px;font-size:10.5px;${centro}">${p.modo}</button>
    </nav>
    <div class="a" style="${px(20, 68, 335, 340)}background:#f7f3ec;border:1px solid rgba(224,169,46,.45);border-radius:20px;overflow:hidden;box-shadow:0 8px 20px rgba(36,22,17,.08)">
      <img class="a" src="${p.foto2d}" alt="${p.titulo}" style="${px(12, 12, 307, 216)}object-fit:cover;border-radius:14px">
      <span class="a m nw" ${pista(st.id + ':2d', true)} style="${px(22, 22, 196, 24)}background:rgba(36,22,17,.82);border-radius:12px;color:var(--sobre-marca);font-size:9.5px;${centro}">✓ Lámina fija · Sin giros ni cámara</span>
      ${marcas.map(([x, y], i) => `<span class="a b" aria-hidden="true" style="${px(x - 1, y - 1, 26, 26)}background:var(--primario);border:2px solid var(--sobre-marca);border-radius:13px;color:var(--sobre-marca);font-size:10.5px;${centro}">${i + 1}</span>`).join('')}
      ${p.partes.map(([n, d], i) => `
      <div class="a" style="${px(12 + i * 105, 242, 97, 80)}background:rgba(237,227,206,.65);border-radius:12px">
        <span class="a b" style="${px(10, 10, 20, 20)}background:var(--primario);border-radius:10px;color:var(--sobre-marca);font-size:9.5px;${centro}">${i + 1}</span>
        <p class="a b nw" style="${px(10, 36)}font-size:11px">${n}</p>
        <p class="a nw" style="${px(10, 53)}color:var(--texto-2);font-size:9.5px">${d}</p>
      </div>`).join('')}
    </div>
    ${panelPieza(st, sonando, dest, p.sub2d, 'var(--secundario)')}
  </section>`;
}

/* ---------- Pieza 2D de las Salas 1–4 (ruta id/pieza/N, N = punto elegido; id/pieza/N/audio suena) ----------
   Misma composición que la Vista 2D: lámina fija con puntos 1·2·3, tarjetas de cada parte y el panel inferior.
   Cada punto lleva su propio audio y subtítulos; cambiar de punto detiene el sonido (nada suena solo).
   pieza.disco: un disco que gira solo mientras suena (se queda quieto con «reducir movimiento»). */
function lamina(st, n, sonando) {
  const p = st.pieza, pt = p.puntos[n - 1], ruta = i => st.id + '/pieza/' + i;
  const ir = i => ruta(i) + (p.tablero ? '/audio' : ''); // tablero sonoro: tocar un golpe lo hace sonar de una vez
  const dest = sonando ? ruta(n) : ruta(n) + '/audio';
  return `
  <section class="pantalla" style="background:#ebe1cd">
    <button class="a hov" aria-label="Salir de la pieza" ${go(st.id)} style="${px(16, 16, 34, 34)}" data-vt="regresar"><img src="${S}regresar.svg" alt="" width="34" height="34"></button>
    <p class="a sb nw" style="${px(58, 16, 301, 34)}background:var(--primario);border:1px solid rgba(224,169,46,.4);border-radius:17px;color:var(--sobre-marca);font-size:10.5px;${centro}" data-vt="modo">● ${p.modo}</p>
    <div class="a" style="${px(20, 68, 335, 340)}background:#f7f3ec;border:1px solid rgba(224,169,46,.45);border-radius:20px;overflow:hidden;box-shadow:0 8px 20px rgba(36,22,17,.08)">
      <img class="a" src="${p.lamina || st.escenario}" alt="${p.altLamina || st.altEscenario}" style="${px(12, 12, 307, 216)}object-fit:cover;object-position:50% ${p.encuadre};border-radius:14px">
      ${p.disco ? `<span class="a disco${sonando ? ' gira' : ''}" aria-hidden="true" style="${px(...p.disco, 64, 64)}"></span>` : ''}
      ${p.etiqueta === '' ? '' : `<span class="a m nw" ${pista(st.id + ':lamina', !p.etiqueta)} style="${px(22, 22, 196, 24)}background:rgba(36,22,17,.82);border-radius:12px;color:var(--sobre-marca);font-size:9.5px;${centro}">${p.etiqueta || '✓ Lámina fija · Sin giros ni cámara'}</span>`}
      ${p.puntos.map((q, i) => `<button class="a" aria-label="Punto ${i + 1}: ${q.nombre}" aria-pressed="${i === n - 1}" ${go(ir(i + 1), 0.25)} style="${px(q.xy[0] - 22, q.xy[1] - 22, 44, 44)}${centro}">
        <span class="b" style="width:26px;height:26px;border-radius:13px;border:2px solid var(--sobre-marca);font-size:10.5px;${centro}${i === n - 1 ? 'background:var(--primario);color:var(--sobre-marca)' : 'background:var(--acento);color:var(--texto)'}">${i + 1}</span></button>`).join('')}
      ${p.puntos.map((q, i) => `
      <button class="a" ${go(ir(i + 1), 0.25)} aria-label="${q.nombre}: ${q.parte[1]}" aria-pressed="${i === n - 1}" style="${px(12 + i * 105, 242, 97, 80)}background:rgba(237,227,206,.65);border-radius:12px;text-align:left;${i === n - 1 ? 'box-shadow:inset 0 0 0 2px var(--primario)' : ''}">
        <span class="a b" style="${px(10, 10, 20, 20)}background:var(--primario);border-radius:10px;color:var(--sobre-marca);font-size:9.5px;${centro}">${i + 1}</span>
        <span class="a b nw" style="${px(10, 36)}font-size:11px">${q.parte[0]}</span>
        <span class="a nw" style="${px(10, 53)}color:var(--texto-2);font-size:9.5px">${q.parte[1]}</span>
      </button>`).join('')}
    </div>
    <div class="a" style="${px(0, 428, 375, 239)}background:var(--papel);border-radius:24px 24px 0 0"></div>
    <nav class="a" aria-label="Puntos de la pieza" style="${px(24, 446, 327, 26)}display:flex;gap:8px">${p.puntos.map((q, i) => i === n - 1
      ? `<span class="sb nw" aria-current="true" style="height:26px;border-radius:13px;font-size:10px;padding:0 14px;${centro}background:var(--primario);color:var(--sobre-marca)">${i + 1}. ${q.nombre}</span>`
      : `<button class="sb nw" ${go(ir(i + 1), 0.25)} style="height:26px;border-radius:13px;font-size:10px;padding:0 14px;${centro}background:var(--crema)">${i + 1}. ${q.nombre}</button>`).join('')}</nav>
    <h2 class="a fr b nw" style="${px(24, 484)}font-size:19px">${p.titulo}</h2>
    <div class="a" style="${px(24, 513, 3, 13)}background:var(--acento);border-radius:1.5px"></div>
    <p class="a sb nw" style="${px(33, 512)}color:var(--primario);font-size:11px">${pt.sub}</p>
    ${reproductor(pt, sonando, dest, 536)}
    ${subtitulos(pt, sonando, 596)}
  </section>`;
}

/* Consola multipista (Sala 3): los canales salen de separar la grabación con Demucs (IA, F1).
   Tocar un canal lo silencia o lo vuelve a encender sin cambiar de pantalla; los puntos marcan el pulso del compás. */
const mezcla = {}; // id de estación → canales silenciados (se conserva al pausar o volver)
function consola(st, sonando) {
  const p = st.pieza, mudos = mezcla[st.id] || (mezcla[st.id] = new Set());
  const dest = st.id + '/consola' + (sonando ? '' : '/audio');
  return `
  <section class="pantalla" style="background:#ebe1cd">
    <button class="a hov" aria-label="Salir de la consola" ${go(st.id)} style="${px(16, 16, 34, 34)}" data-vt="regresar"><img src="${S}regresar.svg" alt="" width="34" height="34"></button>
    <p class="a sb nw" style="${px(58, 16, 301, 34)}background:var(--primario);border:1px solid rgba(224,169,46,.4);border-radius:17px;color:var(--sobre-marca);font-size:10.5px;${centro}" data-vt="modo">● Consola multipista · Compás ${p.compas}</p>
    <div class="a" style="${px(20, 68, 335, 340)}background:#f7f3ec;border:1px solid rgba(224,169,46,.45);border-radius:20px;overflow:hidden;box-shadow:0 8px 20px rgba(36,22,17,.08)">
      <img class="a" src="${st.escenario}" alt="${st.altEscenario}" style="${px(12, 12, 307, 150)}object-fit:cover;object-position:50% ${p.encuadre};border-radius:14px">
      <span class="a m nw" ${pista(st.id + ':consola')} style="${px(22, 22, 196, 24)}background:rgba(36,22,17,.82);border-radius:12px;color:var(--sobre-marca);font-size:9.5px;${centro}">✓ Toca un canal para silenciarlo</span>
      <p class="a b nw" style="${px(14, 174)}font-size:11px">${p.aire} · Compás ${p.compas}</p>
      <div class="a" data-pulsos="${p.pulsos}" data-bpm="${p.bpm}" aria-hidden="true" style="${px(321 - p.pulsos * 18, 172, p.pulsos * 18, 16)}display:flex;gap:6px;align-items:center">${'<i class="pulso"></i>'.repeat(p.pulsos)}</div>
      ${p.pistas.map((c, i) => `<button class="a canal" data-canal="${i}" aria-pressed="${!mudos.has(i)}" aria-label="Canal ${c.nombre}" style="${px(12 + (i % 2) * 159, 198 + Math.floor(i / 2) * 66, 151, 58)}">
        <span class="a b nw" style="${px(12, 11)}font-size:11.5px">${c.nombre}</span>
        <span class="a nw" style="${px(12, 30)}font-size:9.5px;color:var(--texto-2)">${c.detalle}</span>
        <span class="a estado sb nw" style="${px(105, 10, 36, 18)}border-radius:9px;font-size:8.5px;${centro}"></span></button>`).join('')}
    </div>
    <div class="a" style="${px(0, 428, 375, 239)}background:var(--papel);border-radius:24px 24px 0 0"></div>
    <nav class="a" aria-label="Mezclas rápidas" style="${px(24, 446, 327, 26)}display:flex;gap:8px">${p.solos.map(([t, canales]) =>
      `<button class="sb nw" data-solo="${canales.join(',')}" aria-pressed="${p.pistas.every((c, i) => canales.includes(i) !== mudos.has(i))}" style="height:26px;border-radius:13px;font-size:10px;padding:0 12px;${centro}">${t}</button>`).join('')}</nav>
    <h2 class="a fr b nw" style="${px(24, 484)}font-size:19px">${p.titulo}</h2>
    <div class="a" style="${px(24, 513, 3, 13)}background:var(--acento);border-radius:1.5px"></div>
    <p class="a sb nw" style="${px(33, 512)}color:var(--primario);font-size:11px">${p.sub}</p>
    ${reproductor(p, sonando, dest, 536)}
    ${subtitulos(p, sonando, 596)}
  </section>`;
}
