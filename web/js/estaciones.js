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
    <h2 class="a fr sb nw" style="${px(24, 388 + d)}font-size:20px;letter-spacing:-0.4px" data-vt="titulo">${st.titulo}</h2>
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
  const foto = (i, l, t, w, h, r, gh, fs, fw, tx, ty) => `
    <figure class="a" style="${px(l, t, w, h)}border-radius:${r}px;overflow:hidden">
      <img class="cubre" src="assets/img/${st.id}-galeria-${i}.jpg" alt="${g.fotos[i - 1].replace(/^\d\/3 · /, '')}">
      <div class="a" style="${px(0, h - gh, w, gh)}background:linear-gradient(180deg,rgba(24,14,10,0),rgba(24,14,10,${i === 1 ? .85 : .82}))"></div>
      <figcaption class="a nw" style="${px(tx, ty)}color:var(--sobre-marca);font-size:${fs}px;font-weight:${fw}">${g.fotos[i - 1]}</figcaption>
    </figure>`;
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

/* Panel inferior del visor y de la vista 2D: fichas 1·2·3, título, reproductor y subtítulos (desde y = 428). */
function panelPieza(st, sonando, dest, sub, colorSub) {
  const p = st.pieza, xs = p.chipsX || [[24, 104], [136, 72], [216, 104]];
  return `
    <div class="a" style="${px(0, 428, 375, 239)}background:var(--papel);border-radius:24px 24px 0 0" data-vt="panel"></div>
    ${p.chips.map((c, i) => `<span class="a sb nw" style="${px(xs[i][0], 446, xs[i][1], 26)}border-radius:13px;font-size:10px;padding:6px 0 0 14px;overflow:hidden;${i === 0 ? 'background:var(--primario);color:var(--sobre-marca)' : 'background:var(--crema)'}">${i === 0 ? '● ' : ''}${c}</span>`).join('')}
    <h2 class="a fr b nw" style="${px(24, 484)}font-size:19px" data-vt="titulo">${p.titulo}</h2>
    <div class="a" style="${px(24, 513, 3, 13)}background:var(--acento);border-radius:1.5px"></div>
    <p class="a sb nw" style="${px(33, 512)}color:${colorSub};font-size:11px">${sub}</p>
    ${reproductor(p, sonando, dest, 536)}
    ${subtitulos(p, sonando, 596)}`;
}

/* ---------- 6. Visor 3D-AR / 360° (232:6546) y 6B. Visor Audio Activo (232:9639) ----------
   En Figma el visor es una lámina fija: los puntos 1·2·3, el zoom y el giro todavía no hacen nada.
   Aquí entrará el modelo 3D / la foto 360° cuando el equipo entregue los assets. */
function visor(st, sonando) {
  const p = st.pieza, dest = sonando ? st.id + '/visor' : st.id + '/visor/audio';
  return `
  <section class="pantalla" style="background:#140c09">
    <img class="a" src="${st.escenario}" alt="${st.altEscenario}" style="${px(-20, -45, 414, 742)}object-fit:cover" data-vt="escenario">
    <div class="a" style="${px(0, 0, 375, 460)}background:linear-gradient(180deg,rgba(18,11,8,.65) 0%,rgba(18,11,8,.1) 35%,rgba(18,11,8,.18) 75%,rgba(18,11,8,.78) 100%)"></div>
    <button class="a hov" aria-label="Salir del visor" ${go(st.id)} style="${px(16, 16, 34, 34)}" data-vt="regresar"><img src="${S}regresar.svg" alt="" width="34" height="34"></button>
    <nav class="a" aria-label="Modo de vista" style="${px(58, 16, 301, 34)}background:rgba(237,227,206,.94);border:1px solid rgba(224,169,46,.4);border-radius:17px;overflow:hidden" data-vt="modo">
      <span class="a sb nw" aria-current="page" style="${px(2, 2, 144, 28)}background:var(--primario);border-radius:14px;color:var(--sobre-marca);font-size:10.5px;padding:7px 0 0 24px">● ${p.modo}</span>
      <button class="a sb nw" ${go(st.id + '/2d')} style="${px(151, 2, 146, 28)}background:rgba(247,243,236,.85);border-radius:14px;font-size:10.5px;padding:0 0 0 44px">Ver en 2D</button>
    </nav>
    <img class="a" src="${S}anillo-360.svg" alt="" style="${px(44, 286, 286, 68)}">
    <img class="a" src="${S}hotspot-activo.svg" alt="" style="${px(168, 182, 34, 34)}">
    <span class="a b nw" style="${px(182, 192)}color:var(--sobre-marca);font-size:10px">1</span>
    <img class="a" src="${S}hotspot.svg" alt="" style="${px(84, 248, 28, 28)}">
    <span class="a b nw" style="${px(95, 256)}font-size:9.5px">2</span>
    <img class="a" src="${S}hotspot.svg" alt="" style="${px(246, 234, 28, 28)}">
    <span class="a b nw" style="${px(257, 242)}font-size:9.5px">3</span>
    <div class="a b" aria-hidden="true" style="${px(327, 168, 32, 96)}background:rgba(28,17,13,.78);border:1px solid rgba(224,169,46,.4);border-radius:16px;overflow:hidden;color:var(--sobre-marca)">
      <span class="a" style="${px(9, 5)}font-size:14px">+</span>
      <span class="a" style="${px(4, 30, 20, 1)}background:rgba(244,234,214,.18)"></span>
      <span class="a" style="${px(9, 37)}font-size:14px">−</span>
      <span class="a" style="${px(4, 62, 20, 1)}background:rgba(244,234,214,.18)"></span>
      <span class="a" style="${px(8, 68)}font-size:12.5px;color:var(--acento)">↺</span>
    </div>
    <p class="a m nw" style="${px(52, 378, 271, 28)}background:rgba(28,17,13,.84);border:1px solid rgba(224,169,46,.45);border-radius:14px;color:var(--sobre-marca);font-size:10px;padding:5px 0 0 18px">↻ Inicio quieto · Arrastra 360° o toca 1, 2, 3</p>
    ${panelPieza(st, sonando, dest, p.sub, 'var(--primario)')}
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
      <span class="a sb nw" aria-current="page" style="${px(135, 2, 162, 28)}background:var(--secundario);border-radius:14px;color:var(--sobre-marca);font-size:10.5px;padding:7px 0 0 46px">✓ Vista 2D</span>
      <button class="a sb nw" ${go(st.id + '/visor')} style="${px(2, 2, 130, 28)}background:rgba(237,227,206,.7);border-radius:14px;font-size:10.5px;padding:0 0 0 ${p.tab3dX || 26}px">${p.modo}</button>
    </nav>
    <div class="a" style="${px(20, 68, 335, 340)}background:#f7f3ec;border:1px solid rgba(224,169,46,.45);border-radius:20px;overflow:hidden;box-shadow:0 8px 20px rgba(36,22,17,.08)">
      <img class="a" src="${p.foto2d}" alt="${p.titulo}" style="${px(12, 12, 307, 216)}object-fit:cover;border-radius:14px">
      <span class="a m nw" style="${px(22, 22, 196, 24)}background:rgba(36,22,17,.82);border-radius:12px;color:var(--sobre-marca);font-size:9.5px;padding:5px 0 0 12px">✓ Lámina fija · Sin giros ni cámara</span>
      ${marcas.map(([x, y], i) => `<span class="a b" aria-hidden="true" style="${px(x - 1, y - 1, 26, 26)}background:var(--primario);border:2px solid var(--sobre-marca);border-radius:13px;color:var(--sobre-marca);font-size:10.5px;padding:1px 0 0 5px">${i + 1}</span>`).join('')}
      ${p.partes.map(([n, d], i) => `
      <div class="a" style="${px(12 + i * 105, 242, 97, 80)}background:rgba(237,227,206,.65);border-radius:12px">
        <span class="a b" style="${px(10, 10, 20, 20)}background:var(--primario);border-radius:10px;color:var(--sobre-marca);font-size:9.5px;padding:3px 0 0 6.5px">${i + 1}</span>
        <p class="a b nw" style="${px(10, 36)}font-size:11px">${n}</p>
        <p class="a nw" style="${px(10, 53)}color:var(--texto-2);font-size:9.5px">${d}</p>
      </div>`).join('')}
    </div>
    ${panelPieza(st, sonando, dest, p.sub2d, 'var(--secundario)')}
  </section>`;
}
