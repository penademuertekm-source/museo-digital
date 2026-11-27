/* Plantillas de pantalla. Medidas copiadas del Figma de la docente (página "2.3 Prototipo navegable", frames de 375 × 667).
   data-go = ruta destino · data-t = transición (smart | dissolve) · data-d = duración en segundos, igual que en Figma. */

const S = 'assets/svg/';
const px = (l, t, w, h) => `left:${l}px;top:${t}px;` + (w != null ? `width:${w}px;` : '') + (h != null ? `height:${h}px;` : '');
/* Fondo recortado al lienzo: la capa animada mide siempre 375 × 667, así nada se sale de la pantalla
   ni queda una línea o un salto al terminar la animación en el teléfono. */
const fondo = img => `<div class="a" style="${px(0, 0, 375, 667)}overflow:hidden" data-vt="fondo">${img}</div>`;
const go = (ruta, d = 0.3, t = 'smart') => `data-go="${ruta}" data-t="${t}" data-d="${d}"`;

/* ---------- 00 · Portada / Inicio (228:5172) ---------- */
function portada() {
  return `
  <section class="pantalla" style="background:linear-gradient(180deg,#94212e 0%,#7c1823 55%,#4a0c13 100%)">
    <div class="a" style="${px(16, 16, 343, 635)}border:1.5px solid rgba(224,169,46,.55);border-radius:26px"></div>
    <p class="a b c" style="${px(76, 36, 223, 24)}background:rgba(36,22,17,.42);border:1px solid rgba(224,169,46,.55);border-radius:12px;color:var(--acento);font-size:9px;line-height:22px;white-space:pre">✦  PATRIMONIO DEL CARIBE  ✦</p>
    <img class="a" src="assets/img/medallon-exterior.png" alt="" style="${px(39, 74, 297, 297)}">
    <div class="a" style="${px(51, 84, 273, 273)}background:var(--sobre-marca);border:3.5px solid var(--acento);border-radius:50%;overflow:hidden;box-shadow:0 12px 28px rgba(0,0,0,.38)" data-vt="medallon">
      <img class="a" src="assets/img/trio-vallenato.png" alt="Ilustración del trío vallenato: acordeón, caja y guacharaca" style="${px(-31, -61, 321, 570)}object-fit:cover">
    </div>
    <p class="a b c" style="${px(28, 382, 319)}color:var(--acento);font-size:11px">MUSEO INTERACTIVO</p>
    <h1 class="a fr b c" style="${px(28, 402, 319)}color:var(--sobre-marca);font-size:28px;line-height:32px">Festival de la<br>Leyenda Vallenata</h1>
    <p class="a c" style="${px(36, 474, 303)}color:var(--sobre-marca);font-size:11.5px;line-height:16px">Un recorrido sonoro y visual por la tríada instrumental, los juglares y la memoria viva del Caribe colombiano.</p>
    <button class="a b c hov" ${go('pasillo', 0.35, 'dissolve')} style="${px(72, 538, 231, 46)}background:var(--acento);border:1.5px solid rgba(244,234,214,.75);border-radius:23px;box-shadow:0 6px 16px rgba(0,0,0,.35);color:var(--texto);font-size:13.5px;white-space:pre">Entrar al Museo  →</button>
    <p class="a m c" style="${px(24, 606, 327)}color:var(--acento);font-size:9.5px">🔊 Inicio silencioso · Subtítulos sincronizados · Accesible AAA</p>
  </section>`;
}

/* ---------- Menú inferior (Inicio · Salas · Mapa · Información) ---------- */
function menuInferior(activo, destinos) {
  const items = [
    // [clave, nombre, svg, ancho, alto] — el SVG es el dibujo interior del ícono de 30 px (márgenes de Figma)
    ['inicio', 'Inicio', 'inicio.svg', 22.5, 20.5], ['salas', 'Salas', 'salas.svg', 21.7, 22.5],
    ['mapa', 'Mapa', 'mapa.svg', 22.5, 15.3], ['info', 'Información', 'informacion.svg', 30, 30],
  ];
  return `<nav class="menu-inf" aria-label="Menú del museo">${items.map(([k, label, ic, w, h]) => {
    const dest = destinos[k];
    const cls = 'item' + (k === activo ? ' activo' : '');
    const inner = `<img src="${S + ic}" alt="" style="width:${w}px;height:${h}px">`;
    return dest
      ? `<button class="${cls}" aria-label="${label}" ${go(dest.r, dest.d, dest.t)}>${inner}</button>`
      : `<span class="${cls}" role="img" aria-label="${label}">${inner}</span>`;
  }).join('')}</nav>`;
}

/* Sala donde está el visitante (clave de SALAS). app.js la fija al pintar un pasillo o una estación;
   el mapa la marca como «Actual» y el ícono Salas del menú lleva a su pasillo. */
let salaActual = (() => { try { const s = sessionStorage.getItem('sala'); return s && Object.hasOwn(SALAS, s) ? s : 'pasillo'; } catch (e) { return 'pasillo'; } })();
function fijarSala(id) {
  salaActual = id;
  try { sessionStorage.setItem('sala', id); } catch (e) { /* sin almacenamiento: se recuerda hasta recargar */ }
}
/* Menú del museo (Kevin, 26 nov.): Inicio → Portada · Salas → pasillo de la sala actual (Corte 2: «Sala actual») ·
   Mapa → Mapa de Salas · Información → Acerca del museo. El ícono de la pantalla en la que se está no navega. */
const menuMuseo = activo => menuInferior(activo, {
  inicio: { r: 'portada', d: 0.3, t: 'dissolve' },
  salas: activo === 'salas' ? null : { r: salaActual, d: 0.35 },
  mapa: activo === 'mapa' ? null : { r: 'mapa' },
  info: activo === 'info' ? null : { r: 'info' },
});

/* El aviso "Toca un punto dorado" se muestra hasta que el visitante entra a su primera estación (por el aviso, un punto o el mapa);
   después el pasillo queda libre. Se recuerda mientras la pestaña siga abierta, aunque se recargue. */
let avisoVisto = (() => { try { return sessionStorage.getItem('avisoVisto') === '1'; } catch (e) { return false; } })();

/* ---------- 01 · Sala Núcleo / Pasillo (232:5933) y 01B con sonido (232:6003) ----------
   Las Salas 1–4 (guion del Drive) usan el mismo pasillo con su fondo y sus puntos (SALAS en datos.js). */
function pasillo(id, sonido) {
  const sala = SALAS[id], puntos = sala.puntos;
  return `
  <section class="pantalla">
    ${fondo(`<img class="cubre" src="${sala.fondo}" alt="${sala.alt}" style="height:672px">`)}
    <div class="a" style="${px(0, 0, 375, 115)}background:linear-gradient(180deg,rgba(36,22,17,.52),rgba(36,22,17,0))" data-vt="degradado-sup"></div>
    <div class="a" style="${px(0, 517, 375, 150)}background:linear-gradient(180deg,rgba(36,22,17,0),rgba(36,22,17,.68))"></div>
    <header class="barra-sup" style="left:16px;opacity:.9;padding:0 10px 0 12px" data-vt="barra-pasillo">
      <div class="izq"><img src="${S}ubicacion.svg" alt="" width="20" height="20"><h1 class="titulo-barra">${sala.titulo}</h1></div>
      <div class="der">
        <span class="insignia" style="background:rgba(36,22,17,.1)" aria-label="0 de ${puntos.length} estaciones visitadas">0/${puntos.length}</span>
        <button class="parlante hov" aria-label="${sonido ? 'Silenciar' : 'Activar sonido'}" aria-pressed="${sonido}" ${go(sonido ? id : id + '/sonido', 0.2)}><img src="${S}${sonido ? 'parlante-sonido.svg' : 'parlante-silencio.svg'}" alt="" width="26" height="26"></button>
      </div>
    </header>
    <button class="a" ${go('mapa')} style="${px(16, 54, 343, 34)}background:var(--sobre-marca);border-radius:12px;box-shadow:0 3px 8px rgba(36,22,17,.18);display:flex;align-items:center;gap:8px;padding:0 12px">
      <img src="${S}buscar.svg" alt="" width="18" height="18">
      <span style="font-size:12px;color:var(--texto-2)">Buscar sala, instrumento o juglar...</span>
    </button>
    ${avisoVisto || !sala.aviso ? '' : `<button class="a" ${go('e1', 0.35)} style="${px(184, 362, 176, 54)}" aria-label="Toca un punto dorado. Ejemplo: Tríada Instrumental">
      <span class="a" style="left:0;top:0;background:rgba(36,22,17,.92);border:1px solid var(--acento);border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,.25);display:flex;align-items:center;gap:8px;padding:7px 12px 7px 10px">
        <span style="margin:1.4px 4.6px 1.4px 4.8px">${iconoToque}</span>
        <span style="display:flex;flex-direction:column;gap:1px;font-size:10px;white-space:nowrap;text-align:left">
          <span class="b" style="color:var(--acento)">Toca un punto dorado</span>
          <span class="m" style="color:var(--sobre-marca)">Ej: Tríada Instrumental</span>
        </span>
      </span>
      <img class="a" src="${S}puntero-aviso.svg" alt="" style="${px(106.8, 41, 10.4, 5.25)}transform:rotate(180deg)">
    </button>`}
    ${puntos.map(([x, y, est]) => `<button class="a hov" aria-label="Estación ${ESTACIONES[est].n}" ${go(est, 0.35)} style="${px(x, y, 28, 28)}"><img src="${S}punto-dorado.svg" alt="" width="28" height="28"></button>`).join('')}
    ${menuMuseo('salas')}
  </section>`;
}

/* ---------- 02 · Sala Núcleo / Mapa de Salas (232:6069) ---------- */
function mapa() {
  // Salas del guion Act 1.2 (Drive), por orden de Kevin (26 nov.): [clave de SALAS, etiqueta, título, descripción, destino].
  // La sala donde está el visitante va en rojo con «Actual» y fondo amarillo; las demás, en verde con flecha (Kevin, 26 nov.).
  const salas = [
    ['pasillo', 'SALA NÚCLEO · 4 ESTACIONES', 'El Festival y la Leyenda', 'Tríada, orígenes, historia y territorio.', 'pasillo'],
    ['s1', 'SALA 01 · 2 ESTACIONES', 'Fundación 1968', 'El triunvirato creador y el primer Rey.', 's1'],
    ['s2', 'SALA 02 · 3 ESTACIONES', 'Tríada Instrumental', 'Acordeón, caja y guacharaca.', 's2'],
    ['s3', 'SALA 03 · 4 ESTACIONES', 'Los 4 Aires', 'Paseo, merengue, son y puya.', 's3'],
    ['s4', 'SALA 04 · 2 ESTACIONES', 'Danza del Pilón', 'Del patio campesino al desfile.', 's4'],
  ];
  const aqui = SALAS[salaActual];
  const tarjeta = (top, eti, colEti, tit, desc, dest, fondo, extra) => `
      <${dest ? `button class="a" ${go(dest, 0.35)}` : 'div class="a" aria-disabled="true"'} style="${px(48.8, top, 265, 72)}background:${fondo};border-radius:14px;overflow:hidden${dest ? '' : ';opacity:.7'}">
        <span class="a b nw" style="${px(14, 10)}color:${colEti};font-size:8.5px">${eti}</span>
        <span class="a fr b nw" style="${px(14, 24)}font-size:14px">${tit}</span>
        <span class="a nw" style="${px(14, 46)}color:var(--texto-2);font-size:10px">${desc}</span>
        ${extra}
      </${dest ? 'button' : 'div'}>`;
  return `
  <section class="pantalla">
    ${fondo(`<img class="cubre" src="${aqui.fondo}" alt="" style="height:672px">`)}
    <div class="a" style="${px(0, 0, 375, 115)}background:linear-gradient(180deg,rgba(36,22,17,.52),rgba(36,22,17,0))" data-vt="degradado-sup"></div>
    <div class="a" style="${px(0, 517, 375, 150)}background:linear-gradient(180deg,rgba(36,22,17,0),rgba(36,22,17,.68))"></div>
    ${aqui.puntos.map(([x, y]) => `<img class="a" src="${S}punto-interactivo.svg" alt="" style="${px(x - 1, y - 1, 30, 30)}">`).join('')}
    <div class="a" style="${px(0, 0, 375, 667)}background:rgba(20,12,9,.8)"></div>
    <div class="a" role="dialog" aria-labelledby="titulo-mapa" style="${px(18, 28, 339, 546)}background:#f7f3ec;border:1.2px solid rgba(224,169,46,.45);border-radius:24px;overflow:hidden;box-shadow:0 12px 28px rgba(0,0,0,.35)">
      <div class="a" style="${px(22.8, 24.8, 3, 12)}background:var(--acento);border-radius:1.5px"></div>
      <p class="a b nw" style="${px(31.8, 23.8)}color:var(--primario);font-size:9.5px">RECORRIDO DEL MUSEO</p>
      <h1 id="titulo-mapa" class="a fr b nw" style="${px(22.8, 41.8)}font-size:22px">Mapa de Salas</h1>
      <button class="a hov" aria-label="Cerrar mapa" ${go(salaActual)} style="${px(279.8, 24.8, 34, 34)}"><img src="${S}cerrar-mapa.svg" alt="" width="34" height="34"></button>
      <div class="a" style="${px(22.8, 82.8, 291, 1)}background:var(--crema)"></div>
      <div class="a" style="${px(29.8, 130.8, 2, 368)}background:rgba(224,169,46,.45)"></div>
      ${salas.map(([clave, eti, tit, desc, dest], i) => {
        const actual = clave === salaActual;
        return `
      <img class="a" src="${S}${actual ? 'elipse-actual' : 'elipse'}.svg" alt="" style="${px(23.8, 129.8 + i * 86, 14, 14)}">
      ${tarjeta(100.8 + i * 86, eti, actual ? 'var(--primario)' : 'var(--secundario)', tit, desc, dest, actual ? 'rgba(237,227,206,.95)' : 'rgba(255,255,255,.85)', actual
        ? `<span class="a sb nw" aria-label="Sala actual" style="${px(196, 23, 55, 26)}background:var(--primario);border-radius:13px;color:var(--sobre-marca);font-size:9.5px;display:flex;align-items:center;justify-content:center;line-height:1">Actual</span>`
        : `<img class="a" src="${S}flecha-sala.svg" alt="" style="${px(219, 20, 32, 32)}">`)}`;
      }).join('')}
    </div>
    ${menuMuseo('mapa')}
  </section>`;
}

/* ---------- Información · Acerca del museo (no está en ningún Figma; pedido de Kevin el 26 nov., placa por aprobar) ----------
   Misma ventana que el Mapa de Salas: cómo se recorre y los créditos resumidos (E1: créditos visibles; F1: IA declarada). */
function info() {
  const lista = items => `<ul style="list-style:none;display:flex;flex-direction:column;gap:7px">${items.map(([ic, t]) =>
    `<li style="display:flex;gap:9px;align-items:flex-start;font-size:13px;line-height:17.5px;color:var(--texto)"><span aria-hidden="true" style="flex:none;width:22px;height:22px;border-radius:11px;background:var(--crema);color:var(--primario);font-size:11px;font-weight:700;font-variant-emoji:text;${centroFlex}">${ic}&#xFE0E;</span><span>${t}</span></li>`).join('')}</ul>`;
  const titulo = t => `<h2 class="fr b" style="font-size:15px;margin:14px 0 8px">${t}</h2>`;
  return `
  <section class="pantalla">
    ${fondo(`<img class="cubre" src="${SALAS[salaActual].fondo}" alt="" style="height:672px">`)}
    <div class="a" style="${px(0, 0, 375, 667)}background:rgba(20,12,9,.8)"></div>
    <div class="a" role="dialog" aria-labelledby="titulo-info" style="${px(18, 28, 339, 546)}background:#f7f3ec;border:1.2px solid rgba(224,169,46,.45);border-radius:24px;overflow:hidden;box-shadow:0 12px 28px rgba(0,0,0,.35)">
      <div class="a" style="${px(22.8, 24.8, 3, 12)}background:var(--acento);border-radius:1.5px"></div>
      <p class="a b nw" style="${px(31.8, 23.8)}color:var(--primario);font-size:9.5px">INFORMACIÓN</p>
      <h1 id="titulo-info" data-titulo class="a fr b nw" style="${px(22.8, 41.8)}font-size:22px">Acerca del museo</h1>
      <button class="a hov" aria-label="Cerrar información" ${go(salaActual)} style="${px(279.8, 24.8, 34, 34)}"><img src="${S}cerrar-mapa.svg" alt="" width="34" height="34"></button>
      <div class="a" style="${px(22.8, 82.8, 291, 1)}background:var(--crema)"></div>
      <div class="a lectura" tabindex="0" role="region" aria-label="Cómo recorrerlo y créditos" style="${px(22.8, 84, 296, 450)}padding-bottom:16px">
        ${titulo('Cómo recorrerlo')}
        ${lista([['●', 'Toca un <b>punto dorado</b> del pasillo para entrar a cada estación.'],
          ['↔', 'Desliza o toca los puntos de abajo para pasar por <b>Resumen, Historia y Galería</b>.'],
          ['▶', '<b>Nada suena solo:</b> tú das play, y cada audio trae subtítulos.'],
          ['⤢', 'Toca una foto de la galería para <b>ampliarla</b>.']])}
        ${titulo('Créditos')}
        ${lista([['✎', 'Diseño: prototipo de la docente del curso (Figma). Web app: Equipo de Apoyo.'],
          ['▣', 'Fotos de Wikimedia Commons (licencias CC), Señal Memoria y fotos <b>temporales</b> del Figma del grupo. Las ilustraciones salen del Figma de la docente.'],
          ['♪', 'Audios con derechos de autor, de uso académico autorizado por la docente, siempre con su crédito.'],
          ['◆', 'Modelos 3D del equipo 3D. Tipografías Fraunces y Work Sans (licencia OFL).'],
          ['✦', 'Con ayuda de IA, revisada por el equipo: Claude Code (programación y montaje), Whisper (transcripción de subtítulos), Demucs (pistas de la consola) y Real-ESRGAN (nitidez de fotos pequeñas).']])}
        ${CREDITOS.map(([sala, items]) => `<h3 class="sb" style="font-size:13px;color:var(--primario);margin:14px 0 7px">${sala}</h3>${lista(items)}`).join('')}
        <p style="margin-top:14px;font-size:11px;color:var(--texto-2)">Diseño de Interfaces Físicas · Areandina, Valledupar · 2026-2</p>
      </div>
    </div>
    ${menuMuseo('info')}
  </section>`;
}
const centroFlex = 'display:flex;align-items:center;justify-content:center;line-height:1;';

/* Pistas de uso («✓ Lámina fija…», «↻ Inicio quieto…»): con auto se desvanecen solas al entrar; sin auto, al primer
   toque sobre la pieza (app.js). Las ya vistas no vuelven en la misma visita aunque la pantalla se vuelva a pintar. */
const pistasVistas = new Set();
const pista = (clave, auto) => `data-pista="${clave}"${pistasVistas.has(clave) ? ' data-vista' : auto ? ' data-auto' : ''}`;

/* ---------- Piezas compartidas de las estaciones ---------- */
function encabezadoEstacion(st, sonando, destSonido) {
  return `
    <button class="a hov" aria-label="Volver al pasillo" ${go(st.pasillo || 'pasillo')} style="${px(16, 16, 34, 34)}" data-vt="regresar"><img src="${S}regresar.svg" alt="" width="34" height="34"></button>
    <header class="barra-sup" style="left:58px;padding:0 10px" data-vt="barra-sup">
      <div class="izq"><img src="${S}ubicacion-18.svg" alt="" width="18" height="18"><h1 class="titulo-barra">${st.sala || 'Sala Núcleo'} · Est. ${st.n}</h1></div>
      <div class="der">
        <span class="insignia" style="background:var(--primario);color:var(--sobre-marca)" aria-label="Estación ${st.n} de ${st.total || 4}">${st.n}/${st.total || 4}</span>
        <button class="parlante hov" aria-label="${sonando ? 'Pausar audio' : 'Reproducir audio'}" ${go(destSonido, 0.25)}><img src="${S}${sonando ? 'parlante-sonido.svg' : 'parlante-silencio.svg'}" alt="" width="26" height="26"></button>
      </div>
    </header>`;
}

function flechasEstacion(st) {
  return `
    <button class="a hov" aria-label="Estación anterior" ${go(st.anterior)} style="${px(14, 204, 32, 32)}" data-vt="flecha-ant"><img src="${S}estacion-anterior.svg" alt="" width="32" height="32"></button>
    <button class="a hov" aria-label="Estación siguiente" ${go(st.siguiente)} style="${px(329, 204, 32, 32)}" data-vt="flecha-sig"><img src="${S}estacion-siguiente.svg" alt="" width="32" height="32"></button>`;
}

function pildoraInmersiva(st) {
  // Centrada en la misma caja del Figma y con ancho según el texto (antes: ancho fijo y texto pegado a la izquierda).
  const [x, y, w] = st.pildoraXY || [118, 336, 148];
  return `<button class="a sb hov nw" ${go(st.id + '/' + (st.pildoraRuta || 'visor'), 0.35)} style="${px(x + w / 2, y)}height:28px;translate:-50% 0;display:flex;align-items:center;gap:7px;padding:0 14px 0 12px;background:rgba(36,22,17,.9);border-radius:14px;color:var(--sobre-marca);font-size:10.5px;line-height:1" data-vt="pildora${st.pildoraXY ? '-360' : ''}">${iconoToque}${st.pildora}</button>`;
}

/* Ícono que alterna Toque ↔ Toque-AR como un GIF (Figma de la docente, «Icono / Toque» y «Icono / Toque-AR»). */
const iconoToque = `<span class="toque" aria-hidden="true"><img src="${S}toque.svg" alt=""><img src="${S}toque-ar.svg" alt=""></span>`;

function selectorPestanas(st, actual) {
  const rutas = [st.id, st.id + '/historia', st.id + '/galeria'];
  const nombres = ['Resumen', 'Historia', 'Galería'];
  return `<nav class="a" aria-label="Pestañas de la estación" style="${px(151, 632, 74, 20)}background:rgba(237,227,206,.92);border-radius:10px" data-vt="pestanas">
    ${[0, 1, 2].map(i => i === actual
      ? `<span class="a" aria-current="page" aria-label="${nombres[i]}" style="${px(10 + i * 21, 4, 12, 12)}background:var(--primario);border-radius:6px"></span>`
      : `<button class="a hov pest" aria-label="${nombres[i]}" ${go(rutas[i])} data-dir="${i > actual ? 'izq' : 'der'}" style="${px(10 + i * 21, 4, 12, 12)}background:var(--linea);border-radius:6px"></button>`).join('')}
  </nav>`;
}

/* Onda acústica: en reposo es una línea de progreso; sonando son 30 barras de alturas distintas. */
const ALTURAS = [4, 7, 11, 8, 13, 10, 6, 12, 15, 9, 5, 11, 14, 8, 10, 15, 11, 7, 9, 13, 6, 8, 12, 14, 9, 5, 8, 10, 6, 4];
function onda(sonando, dest, top = 537) {
  const barras = sonando
    ? ALTURAS.map((h, i) => `<i data-i="${i}" style="left:${(i * 6.8).toFixed(1)}px;top:${Math.ceil((18 - h) / 2)}px;width:3.2px;height:${h}px;border-radius:1.6px;background:${i < 15 ? 'var(--primario)' : i === 15 ? 'var(--acento)' : 'var(--linea)'}"></i>`).join('')
    : ALTURAS.map((_, i) => `<i data-i="${i}" style="left:${Math.round(i * 6.8)}px;top:7px;width:8px;height:3.5px;background:${i < 2 ? 'var(--primario)' : 'var(--linea)'}"></i>`).join('');
  // Sonando, la onda es la barra de progreso: tocar o arrastrar mueve el audio (app.js). En pausa, un toque lo reproduce.
  return sonando
    ? `<div class="onda" role="slider" tabindex="0" aria-label="Posición del audio" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0" style="top:${top}px">${barras}</div>`
    : `<button class="onda" aria-label="Reproducir audio" ${go(dest, 0.25)} style="top:${top}px">${barras}</button>`;
}

/* Reproductor del panel (Rectángulo 19 + botón + onda + tiempo) */
function reproductor(st, sonando, dest, top = 512) {
  const d = top - 512;
  return `
    <div class="a" style="${px(24, 512 + d, 327, 48)}background:var(--sobre-marca);border-radius:10px"></div>
    <p class="a sb nw" style="${px(78, 520 + d)}font-size:11px">${st.audio}</p>
    <span class="a sb c" data-tiempo style="${px(298, 524 + d, 40, 24)}background:var(--secundario);border-radius:6px;color:var(--sobre-marca);font-size:10px;line-height:24px">${sonando ? '0:18' : '0:00'}</span>
    <button class="a hov" aria-label="${sonando ? 'Pausar' : 'Reproducir'}" ${go(dest, 0.25)} style="${px(36, 521 + d, 32, 32)}"><img src="${S}${sonando ? 'pausa.svg' : 'reproducir.svg'}" alt="" width="32" height="32"></button>
    ${onda(sonando, dest, 537 + d)}`;
}

function subtitulos(st, sonando, top = 572) {
  return `
    <div class="a" style="${px(24, top, 327, 50)}background:#f6eedf;border-radius:8px;${sonando ? 'border:1.2px solid rgba(138,31,43,.5)' : ''}"></div>
    ${sonando ? `<div class="a" style="${px(24, top, 4, 50)}background:var(--primario);border-radius:2px"></div>` : ''}
    <p class="a m" style="${px(36, top + 6, 303, 38)}font-size:10px;line-height:15px;display:flex;align-items:center"><span>♪ [Subtítulos]: <span data-sub>${st.subs ? st.subs[0][1] : st.subtitulos}</span></span></p>`;
}

function fondoEstacion(st) {
  return `
    ${fondo(`<img class="a" src="${st.escenario}" alt="${st.altEscenario}" style="left:-20px;bottom:0;width:414px;height:742px;object-fit:cover${st.zoomEscenario ? `;transform-origin:${st.zoomEscenario.origen};transform:scale(${st.zoomEscenario.escala})` : ''}">`)}
    <div class="a" style="${px(0, 0, 375, 105)}background:linear-gradient(180deg,rgba(36,22,17,.48),rgba(36,22,17,0))" data-vt="degradado-sup"></div>`;
}

