# DESIGN.md — Museo del Festival de la Leyenda Vallenata

> Lenguaje de diseño extraído del archivo Figma **SYSTEM-DESING** de la profesora (base comunitaria del curso Diseño de Interfaces Físicas, Areandina 2026-2) y de los PDFs del trabajo común del **Corte 1** y del **Corte 2**.
> Fecha de extracción: 18 de noviembre de 2026 · Lectura directa del archivo (variables, estilos, componentes, 465 interacciones de prototipo).

**Cómo leer este documento**
- **[O] Observado:** valor leído tal cual del Figma de la profesora.
- **[C1] / [C2]:** regla que viene de los PDFs del Corte 1 o del Corte 2 (el *porqué*).
- **[P] Propuesta:** aclaración o ajuste que proponemos para el prototipo; no existe en el archivo de la profesora. Cada propuesta se aprueba antes de aplicarse.

Fuente: `https://www.figma.com/design/7PTatcnprqstUq7NNzXgR3/SYSTEM-DESING`
Páginas: `1. Exploración Inicial` · `2.1 Sistema de Diseño` · `2.2 Wireframe Baja - UI/Interacción` · `2.3 Prototipo navegable`

---

## 1. Tema visual

**Cálido, sonoro, explorable, sereno — un museo-parranda.**

- El museo le explica el Festival a alguien que lo conoce poco **mientras suena la música**; el visitante entra oyendo vallenato y sale sabiendo por qué hay que cuidarlo. [C1]
- El recorrido funciona por **exploración, no por lectura**: "¿qué hay detrás de esa puerta?" en vez de "tengo que leer esto". [C1]
- Imagen de tono: una parranda bajo el palo 'e mango — bienvenida cálida, cadencia del acordeón, pausas respetuosas para escuchar. [C1]
- Ejecución visual [O]: fondos crema (Caña Flecha), texto café oscuro (Cuero de Caja), acción en rojo (Rojo Pañuelo), lo interactivo en dorado (Sol del Valle); escenarios de sala renderizados en gris con pedestales donde se apoya la pieza de cada estación; tarjeta inferior que sube sobre el escenario.
- Formato [O]: móvil vertical **375 × 667 px** (todas las pantallas UI y de prototipo).
- **Contexto de uso real** [C1][C2]: el visitante llega **desde su celular por un código QR** (afiches y puntos físicos en la calle), muchas veces en grupo, de pie, con una mano y en exteriores. Todo el sistema se decide para ese escenario; el escritorio es secundario.

## 1.1 Móvil primero — verificación crítica del archivo de la profesora

Medido en `2.3 Prototipo navegable` (40 pantallas, 465 interacciones) y contrastado con pautas vigentes:

| Hallazgo | Medida [O] | Por qué importa en celular | Corrección [P] |
|---|---|---|---|
| **Estados por cursor** | 202 de 465 interacciones son "Al pasar el cursor" (estado Cursor) | En celular no existe el cursor: Figma no convierte el hover en toque, así que el visitante nunca ve ese estado | El estado de feedback pasa a **Presionado** (disparador "Al presionar / touch down"); Cursor queda solo como extra de escritorio. **Validar primero con un botón en un teléfono real** antes de convertir los 202 casos: con un toque rápido el Presionado puede no alcanzar a verse |
| **Áreas táctiles pequeñas** | 245 de 263 elementos tocables (93 %) miden menos de 44 px: pestañas del carrusel 12 × 12, parlante 26, ‹ › 32, reproducir/pausa 32, volver 34, píldoras 28 de alto, onda 16 de alto | WCAG 2.2 pide mínimo 24 × 24 (AA) y 44 × 44 (AAA); Apple recomienda 44 pt y Material 48 dp | **Área táctil mínima 48 × 48** (D1: compensa la reducción del 4 % en 360 px); el ícono puede seguir pequeño dentro de un marco táctil transparente |
| **Texto diminuto** | 397 de 547 textos (73 %) miden menos de 12 px (8 a 11,5) | Ilegible a distancia de brazo, de pie y al sol | Mínimo **13 px** en leyendas (D1), **16 px** en el relato |
| **Proporción de pantalla antigua** | Todo a 375 × 667 (16:9, tipo iPhone 8/SE) | En Colombia las resoluciones móviles más frecuentes son alargadas: 414 × 896 (7,2 %), 393 × 873 (2,7 %), 390 × 844 (2,5 %), 360 × 800 (2,3 %), 384 × 832 (2,0 %) (StatCounter, jul. 2026). Además, en el navegador las barras de Safari/Chrome dejan un alto útil de ~620–700 px | Decisión D1 (§15): frames de 375 × 812 y críticos dentro de ~640 px |
| **Volver arriba a la izquierda** | Botón regresar en y = 20 | Es la zona más difícil para el pulgar; el Corte 1 fija Volver, Mapa y Siguiente **abajo y siempre en el mismo lugar** | Barra inferior fija Volver · Mapa · Siguiente (C1); el regreso superior queda como secundario |
| **Barras sin espacio para el sistema** | Barra superior en y = 16 | En el navegador del celular la barra de direcciones y la de herramientas tapan bordes; en pantalla completa hay muesca y barra de inicio | En el navegador no aplican las zonas seguras de app nativa: lo que manda es el **alto útil visible**. Controles críticos dentro de los primeros ~640 px de alto; probar en iPhone real (Safari) y Android real (Chrome) cómo se comporta lo "Fijo" |
| **Sin gestos** | Solo toques; ninguna interacción de arrastre entre capas | El usuario de celular espera deslizar entre Resumen, Historia y Galería | Deslizar **solo dentro de la tarjeta y a ≥ 24 px de los bordes** (el borde activa el "atrás" de iOS/Android), con puntos y flechas tocables como vía principal (WCAG 2.5.1: gesto de trayectoria con alternativa de un toque). Evitar scroll anidado: Historia se lee mejor en un frame propio. Probar que tirar hacia abajo no recargue la página en Chrome Android |
| **Audio en el navegador** | Audio en pausa en 0:00 (correcto) | Chrome y Safari bloquean el sonido sin un toque previo; Safari en ahorro de energía pausa incluso el video mudo | Coincide con "nada suena solo": el sonido siempre arranca con un toque, con botón visible y transcripción. En Figma no hay acción de audio: el sonido se implementa como **relleno de video (mp4 con el aire)** que se reproduce al entrar al frame elegido. Aviso inicial: **"Sube el volumen o usa audífonos; todo tiene subtítulos"**; subtítulos activos por defecto y a ≥ 16 px. Considerar teléfono en silencio, ruido de calle, grupo con un solo parlante y retraso de audífonos Bluetooth |
| **Peso de los archivos** | Fondos de escenario a sangre, galería de 3 fotos por estación, 40 pantallas | El visitante entra con datos móviles desde un QR | Prototipo en **un archivo aparte** solo con sus pantallas; imágenes exportadas a 2× (~750 px de ancho, < 300 KB c/u); video del aire ≤ 10 MB; panorámicas 360 de máximo 4096 × 2048; **presupuesto total < 15 MB**; medir la carga con 4G en un Android de gama baja |
| **Lector de pantalla** | — | Los prototipos de Figma no son legibles por VoiceOver/TalkBack | Limitación declarada del prototipo. Las páginas web (360/AR) **se diseñarán y se probarán con VoiceOver y TalkBack** |
| **Al aire libre** | Ámbar sobre crema = 1,78:1 | Al sol, el bajo contraste desaparece | Nada informativo en ámbar sobre crema; relato y etiquetas críticas a ≥ 7:1; texto sobre foto solo con velo (≥ 4.5:1 en el punto más claro) — ver §2.3 |

## 2. Paleta de color

### 2.1 Primitivos — colección `Tokens Base` (1 modo: "Modo Principal") [O]

| Nombre cultural | Variable | Hex | Rol declarado en la lámina |
|---|---|---|---|
| Rojo Pañuelo | `color/marca/primario` | `#8A1F2B` | Botón primario |
| Rojo Pañuelo (cursor) | `color/marca/primario-cursor` | `#6B1721` | Botón primario al pasar el cursor |
| Verde Sierra | `color/marca/secundario` | `#3F5E3A` | Botón secundario |
| Verde Sierra (cursor) | `color/marca/secundario-cursor` | `#2E462A` | Botón secundario al pasar el cursor |
| Sol del Valle | `color/marca/acento` | `#E0A92E` | Acentos e íconos, puntos interactivos |
| Sol del Valle (cursor) | `color/marca/acento-cursor` | `#B88624` | Acento al pasar el cursor |
| Caña Flecha | `color/texto/sobre-marca` | `#F4EAD6` | Texto/ícono sobre botones; fondo general |
| Cuero de Caja | `color/texto/principal` | `#241611` | Texto oscuro / neutro |
| — | `color/texto/secundario` | `#63514A` | Texto de apoyo |

Colores usados en la lámina sin variable [O]: `#EDE3CE`, `#F7F3EC`, `#FDF9F1`, `#F6EEDF`, `#D9C9AD` (superficies crema), `#1D63B8` (anillo de foco), grises de maqueta `#383838`, `#D9D9D9`, `#555555`, `#CCCCCC`.

### 2.2 Componentes — colección `Componentes` (alias de los primitivos) [O]

| Variable | Apunta a |
|---|---|
| `boton/primario/fondo` · `-cursor` | `color/marca/primario` · `-cursor` |
| `boton/primario/texto` | `color/texto/sobre-marca` |
| `boton/secundario/fondo` · `-cursor` | `color/marca/secundario` · `-cursor` |
| `boton/secundario/texto` | `color/texto/sobre-marca` |
| `interactivo/acento` · `-cursor` | `color/marca/acento` · `-cursor` |
| `boton/radio` | `radio/mediano` (8) |
| `boton/separacion` · `boton/relleno-x` · `boton/relleno-y` | 8 · 16 · 12 |

> Arquitectura de dos niveles: **primitivo → componente**. No hay nivel semántico intermedio (fondo/superficie/borde) ni modo oscuro.

### 2.3 Contraste medido (WCAG 2.2) [O → medido]

| Combinación | Ratio | Uso permitido |
|---|---|---|
| Cuero de Caja sobre Caña Flecha | 14.68:1 | Texto de lectura (AAA) |
| Cuero de Caja sobre `#F7F3EC` | 15.85:1 | Texto de lectura (AAA) |
| Caña Flecha sobre Rojo Pañuelo | 7.61:1 | Texto de botón (AAA) |
| Caña Flecha sobre Verde Sierra | **6.12:1** | Texto de botón (**AA, no AAA**) |
| Cuero de Caja sobre Sol del Valle | 8.25:1 | Texto/ícono sobre dorado (AAA) |
| `#63514A` sobre Caña Flecha | 6.27:1 | Texto secundario (AA) |
| Foco `#1D63B8` sobre Caña Flecha | 4.98:1 | Anillo de foco (≥ 3:1 ✓) |
| **Sol del Valle sobre Caña Flecha** | **1.78:1** | ❌ Nunca texto ni ícono de línea sobre crema |
| **Acento-cursor sobre Caña Flecha** | **2.72:1** | ❌ Nunca texto ni ícono de línea sobre crema |
| Sol del Valle sobre gris de escenario `#D9D9D9` / `#CCCCCC` | **1.51 / 1.32:1** | ❌ El punto dorado no se distingue (WCAG 1.4.11 pide 3:1 en objetos gráficos) |
| Sol del Valle sobre gris oscuro `#383838` | 5.52:1 | ✓ |
| `#63514A` sobre `#D9C9AD` | **4.6:1** | Solo texto grande; nunca relato ni etiquetas críticas |
| Foco `#1D63B8` sobre Rojo Pañuelo / Cuero de Caja | **1.53 / 2.95:1** | ❌ El anillo azul no se ve sobre fondos oscuros |

**Reglas que salen de estas medidas** [P]:
- El dorado **nunca va solo** como objeto tocable: va como relleno con **borde o ícono en Cuero de Caja**, y los puntos dorados llevan un **halo oscuro** que garantice ≥ 3:1 contra cualquier fondo (foto o gris).
- **Anillo de foco doble:** azul `#1D63B8` + borde crema de 2 px, para que se vea sobre fondos claros y oscuros.
- **Exteriores:** el relato y las etiquetas críticas a **7:1 o más** (Cuero de Caja sobre crema). El texto sobre imagen solo con un velo que asegure **4.5:1 en el punto más claro** de la foto.

## 3. Tipografía

**Familias** [O]: **Fraunces** (titulares, serif de contraste — variable `fuente/familia/titular`) + **Work Sans** (interfaz y lectura — `fuente/familia/interfaz`). Ambas de Google Fonts con licencia SIL OFL [P: confirmar al publicar, pendiente desde C2].

**Estilos de texto** [O] — escala ad-hoc (28 · 20 · 16 · 14 · 12), espaciado entre letras −2 % en todos:

| Estilo | Familia / peso | Tamaño | Interlineado | Uso |
|---|---|---|---|---|
| `Titular / H1` | Fraunces Bold | 28 | Auto | Nombre del museo / sala |
| `Encabezado / H2` | Fraunces SemiBold | 20 | Auto | Título de estación ("Tríada instrumental") |
| `Encabezado / H3 (Interfaz)` | Work Sans SemiBold | 16 | Auto | Títulos de interfaz |
| `Cuerpo / Regular` | Work Sans Regular | 14 | 20 | Relato |
| `Leyenda / Interfaz` | Work Sans Medium | 12 | 20 | Etiquetas, aires, fechas |

**Ajuste móvil** [P] (los estilos se conservan; cambia el uso):

| Estilo | Tamaño en celular | Regla |
|---|---|---|
| `Titular / H1` | 28 | Sin cambio |
| `Encabezado / H2` | 20–22 | Máximo 2 líneas |
| `Encabezado / H3 (Interfaz)` | 16 | Etiquetas de botón y títulos de interfaz |
| `Cuerpo / Regular` | **16 / 24** | El relato se lee de pie: 14 px queda corto en celular; líneas de 35–45 caracteres |
| `Leyenda / Interfaz` | **13 mínimo** (14 recomendado) | Nada por debajo de 13 px (D1): ni contadores, ni créditos, ni etiquetas de onda. Interlineado 18 en 13 px (o 20 en 14 px); hoy es 12/20 |

**Espaciado entre letras** [P]: el −2 % en todos los estilos junta las letras a 12–16 px y al sol. Se propone **0 % en cuerpo y leyendas** y −1 a −2 % solo en titulares de 20 px o más.

Recursos editoriales [O]: **letra capitular** en la capa Historia ("A finales del siglo XIX…"); subtítulo con **barra vertical dorada** a la izquierda ("Tres culturas, un solo sonido").

## 4. Componentes

### 4.1 Componentes reales (maestros en `2.1 Sistema de Diseño`) [O]

| Componente | Propiedades / variantes | Notas |
|---|---|---|
| **Botón** | `Jerarquía` Primario·Secundario × `Tamaño` SM·MD·LG × `Estado` Normal·Cursor (12 variantes) + `Icono Izquierdo` / `Icono Derecho` (booleanos) | Radio 8, relleno 16×12, separación 8 — todo por variable |
| **Tarjeta / Sala** | Sin variantes | Imagen + "SALA 01 · EXHIBICIÓN" + título + descripción + 2 botones "Explorar sala" |
| Interactivo / Botón Reproducir (32) | Normal · Cursor | |
| Interactivo / Botón Pausa (32) | Normal · Cursor | |
| Interactivo / Botón Contraer · Desplegar (40) | Normal · Cursor | Control circular de la tarjeta de estación |
| Interactivo / Estación Anterior · Siguiente (32) | Normal · Cursor | Flechas ‹ › |
| Interactivo / Botón Regresar (34) | Normal · Cursor | "Volver al Pasillo" |
| Interactivo / Punto Carrusel (12) | Normal · Cursor | Pestañas ● ○ ○ |
| Interactivo / Parlante Sonido · Silencio (26) | Normal · Cursor | |
| Interactivo / Punto Dorado (28) | Normal · Cursor | Hotspot de estación en el Pasillo |
| Interactivo / Píldora 3D-AR (148) · 360° (136) | Normal · Cursor | "✦ Explorar en 3D / AR", "Explorar en 360°" |

### 4.2 Patrones documentados en la lámina (dibujados, no componentes) [O]

- **Barra superior de sala (Pasillo):** ícono ubicación + "Sala Núcleo" + contador "0/4" + parlante; debajo, buscador "Buscar sala, instrumento o juglar…".
- **Barra superior de estación:** botón regresar (flecha dorada en círculo crema) + "Sala Núcleo · Est. 1" + "1/4" + parlante.
- **Menú inferior global:** Inicio · Salas · Mapa · Información (ítem activo en recuadro).
- **Aviso contextual:** píldora oscura "Toca un punto dorado · Ej.: Tríada instrumental".
- **Tarjeta de estación** con 3 capas de lectura (Resumen · Historia con scroll · Galería de 3 fotos) navegables con puntos de carrusel, y estado contraído/desplegado (295 ↔ 133 px).
- **Reproductor de audio:** play rojo, "Audio: Acordeón, caja y guacharaca", tiempo, barra, subtítulo `♪ [Subtítulos]: …` con barra dorada; estados Normal/pausa (0:00), Foco (anillo `#1D63B8`), Reproduciendo (0:18, pausa con aro dorado, ondas, subtítulo resaltado).
- **Controles de visor 3D / 2D:** conmutador "● Visor 3D / AR | Ver en 2D", aviso "↻ Inicio quieto · Arrastra 360° o toca 1, 2, 3", zoom + / − / ↺ vertical, selector de pieza sonora "1. Acordeón · 2. Caja · 3. Guacharaca".
- **Estados de elementos clave:** Normal · Cursor · **Activo** (✓ + borde dorado) · **Foco** (anillo azul punteado) — documentados solo visualmente.

### 4.3 Iconografía [O]

- Componentes locales con nombre en inglés (`Icon / Location`, `Icon / Search`, `Icon / AR-Tap`, `Icon / Home`, `Icon / Room`, `Icon / Map`, `Icon / Info`, `Icon / Volume-Mute`, `Icon / Arrow-Left`) e instancias renombradas en español (`Icono / Ubicación`…).
- Estilo: glifos **sólidos** y redondeados; tamaños 18 · 20 · 22 · 30 px (navegación inferior en 30).
- Color por función: dorado para lo interactivo (flechas, puntos, toque AR), rojo para botones circulares, crema sobre fondos oscuros.

## 5. Layout

- **Retícula** [O]: pantalla 375 × 667; márgenes laterales efectivos de 24 px (tarjetas de 327 px de ancho).
- **Unidad base 4 px** [O]: `espacio/4 · 8 · 12 · 16 · 24`. Separación más usada: **8** (25 de 56 contenedores con auto layout en la lámina).
- **Radios** [O]: tokens `radio/pequeno` 4 · `radio/mediano` 8 · `radio/completo` 999.
- **Ajuste móvil** [P]:
  - Ancho y alto de diseño: **375 × 812 (D1, §15)**. Se revisa en **360 × 800** y en un iPhone real antes de cerrar cada pantalla.
  - Alto útil en el navegador: controles críticos dentro de los primeros ~640 px; margen lateral 16–24 px.
  - **Zona del pulgar:** las acciones frecuentes (Volver, Mapa, Siguiente, reproducir, cambiar capa) en el tercio inferior; arriba solo información (dónde estoy, progreso).
  - **Una sola barra inferior por tipo de pantalla** (D2, §15); la tarjeta de estación se recalcula para que no quede tapada.
  - Áreas táctiles de 48 × 48 mínimo, separadas al menos 8 px entre sí.
  - Orientación vertical. El prototipo de Figma en horizontal se ve ampliado y obliga a desplazar: es una **limitación declarada**; las páginas web 360/AR sí deben funcionar en horizontal.
- **Estructura de una pantalla de estación** [O], de atrás hacia adelante: fondo de escenario (imagen) → sombra superior (degradado para legibilidad) → barra superior → pieza en pedestal con punto dorado → tarjeta inferior (desde y = 372) con título, subtítulo, relato, reproductor y controles → botón contraer/desplegar.

## 6. Profundidad

Sombras usadas sin estilo [O] (todas `DROP_SHADOW`, x = 0):

| Uso aparente | Valor |
|---|---|
| Tarjeta sobre escenario | y 8 · blur 20 · 8 % |
| Resplandor de punto dorado | y 0 · blur 6 · 60 % |
| Botones circulares | y 3–6 · blur 8–16 · 18–35 % |
| Elementos flotantes grandes | y 12 · blur 28 · 35–38 % |

Orden de capas: escenario < sombra superior < pieza/pedestal < tarjeta < controles < aviso contextual.

## 7. Interacción y prototipo (página `2.3 Prototipo navegable`) [O]

**Pantallas:** 40 frames de 375 × 667. Por cada una de las 4 estaciones: `1. Resumen` · `2. Audio Activo (0:18)` · `3. Historia` · `4. Galería` · `5. Contraída` · `6. Visor 3D-AR` (360° en la estación 4) · `7. Vista 2D` · `6B / 7B` (visor y 2D con audio activo). Más `00 · Portada / Inicio`, `01 · Pasillo`, `01B · Pasillo (Sonido 🔊)`, `02 · Mapa de Salas`.

**Flujos de inicio:** `1. Recorrido Completo (Desde Portada)` · `2. Sala Núcleo (Desde Pasillo)` · `3. Pieza Inmersiva (3D vs 2D)`.

**Regla de transiciones (465 interacciones):**

| Disparador → acción | Animación | Duración / curva | Cantidad | Uso |
|---|---|---|---|---|
| Al pasar el cursor → Cambiar a variante | Smart Animate | **150 ms ease-out** | 202 | Estado Cursor de todos los componentes interactivos |
| Al hacer clic → Navegar a | Smart Animate | **300 ms ease-in-out** | 155 | Cambio de estación y de capa |
| Al hacer clic → Navegar a | Smart Animate | 250 ms ease-in-out | 68 | Cambios dentro de la tarjeta |
| Al hacer clic → Navegar a | Smart Animate | 200 ms ease-in-out | 2 | Cambios puntuales |
| Al hacer clic → Navegar a | Smart Animate | 350 ms ease-in-out | 35 | Entrar/salir de visor |
| Al hacer clic → Navegar a | Disolver | 300–350 ms | 3 | Portada → Pasillo |

**Ajuste móvil de los disparadores** [P]:

| En el archivo | En celular |
|---|---|
| Al pasar el cursor → Cursor (150 ms) | **Al presionar → Presionado** (150 ms ease-out) y al soltar → navegar; el cursor queda solo para escritorio |
| Al hacer clic | Al tocar (mismo disparador en Figma) |
| Puntos de carrusel de 12 px | Puntos y flechas con área táctil de 48 px (vía principal) + deslizar solo dentro de la tarjeta, lejos de los bordes |
| Arrastrar el 360 | Arrastrar **o** tocar 1 · 2 · 3 (alternativa de un toque, ya prevista; WCAG 2.5.7) |
| Abrir el prototipo | Desde el QR, en el navegador; opciones del prototipo: ajustar al ancho, ocultar la interfaz de Figma y sin marco de dispositivo |

Nota: Figma no permite "Al tocar" y "Al pasar el cursor" en la misma capa; por eso el estado visual vive en el componente y la navegación en la instancia (como ya lo hace el archivo).

**Cómo se modelan los estados:** cada estado de pantalla es **un frame aparte** (audio activo, contraída, historia, galería, 2D). No se usan variables, condicionales ni overlays: el Mapa de Salas es una pantalla completa.

**Mapa de conexiones típico de una estación:** puntos dorados del Pasillo → `Estación N · 1. Resumen`; ‹ › → estación anterior/siguiente (de la 1 se vuelve a la 4); puntos de carrusel → Resumen / Historia / Galería; play/onda → `2. Audio Activo`; pausa → `1. Resumen`; píldora → `6. Visor`; "Ver en 2D" ↔ "Volver a 3D"; salir de visor → `1. Resumen`; "Volver al Pasillo" → `01 · Pasillo`.

**Matriz de microinteracciones** (disparador · regla · respuesta · cierre) [O, texto de la lámina]:

1. **Tocar un punto dorado** → valida la estación, actualiza el progreso (0/4 → 1/4; en Figma con variables, ver D3) y carga el audio **en pausa (0:00)** → el punto pulsa en carmesí, la cámara enfoca el pedestal y sube la tarjeta **sin sonido automático** → queda en Resumen con audio y carrusel listos.
2. **Pulsar play** → "Nada suena solo" y "El sonido nunca va solo"; detiene cualquier audio previo → icono pausa con aro dorado, ondas, tiempo avanza, subtítulo sincronizado resaltado → al terminar o pausar vuelve a Normal y el subtítulo sigue legible.
3. **Cambiar pestaña o tocar ⌄/⌃** → alterna Resumen / Historia / Galería o colapsa (295 → 133 px) → transición suave, la flecha rota → la tarjeta queda estable sin cortar el audio.
4. **Ver en 2D** → inicio quieto obligatorio y alternativa sin cámara ni WebGL → escenario 3D con anillo 360° y 3 pines, o lámina 2D con despiece y el mismo audio → al tocar ← vuelve a la estación conservando el avance.
5. **Mapa o flechas ‹ ›** → salta entre las 4 estaciones u otras salas conservando el progreso.

## 8. Accesibilidad [O + C1 + C2]

- **Nada suena solo:** ninguna pantalla ni visor inicia audio; todo parte en 0:00 en pausa. [O][C1]
- **El sonido nunca va solo:** todo audio con subtítulos sincronizados o transcripción. [O][C1]
- **Foco de teclado visible:** anillo azul `#1D63B8`, distinto del estado activo. [O][C2]
- **Inicio quieto:** el visor 3D/360 no gira solo; conmutador directo a Vista 2D con el mismo contenido y audio. [O][C1]
- **Nunca solo color:** cada sala se reconoce por nombre, ícono, hito y sonido; los estados llevan texto ("Visitada", "Se abre al terminar la Sala Núcleo"). [C1]
- **Áreas de toque de 44–48 px** (Fitts) y alternativa a cada gesto. [C2] Con D1 se fija **48 px**. Hoy el 93 % de los elementos tocables del prototipo no lo cumple [O] → corregir con marcos táctiles (§1.1).
- **Todo gesto con alternativa de un toque:** deslizamientos (WCAG 2.5.1) y arrastres como el del 360 (WCAG 2.5.7). [P]
- **Sonido con un toque y sin sorpresas:** los navegadores móviles solo permiten audio después de una acción del visitante; el diseño ya parte de esa regla. [O][P]
- **Lectores de pantalla:** el prototipo de Figma no los soporta (limitación declarada); las páginas web del 360/AR tendrán etiquetas, orden de lectura y respeto por "reducir movimiento", y se probarán con VoiceOver y TalkBack. [P]
- **Ampliar texto al doble** [C1]: un prototipo de Figma no lo permite. Es una **limitación declarada**: se cumple solo en las páginas web; en Figma se usan los mínimos de §3. [P]
- **Movimiento** [C1]: Figma no lee la opción "reducir movimiento" del teléfono. Por eso: sin bucles infinitos (el pulso del punto y las ondas, máximo 3 ciclos), el "zoom de cámara al pedestal" se cambia por un disolver, y la excepción se declara ante la docente. [P]
- **Aviso sin depender del color** (WCAG 1.3.3): los puntos interactivos van numerados 1–4 o con ícono, y el aviso dice "Toca un punto ✦ para explorar", no solo "un punto dorado". [P]
- **Movimiento con propósito:** una animación solo entra si orienta, revela, confirma o marca el ritmo; nada parpadea más de 3 veces por segundo; opción de desactivar movimiento. [C1]
- **Cada imagen con descripción escrita; ningún asset sin licencia y crédito.** [C1]

## 9. Contenido y voz [C1 + O]

- Segunda persona, tono cercano y cálido: "Llegas a una plaza…". [C1]
- Verbos fijos: siempre **"Volver"**, nunca "Atrás" ni "Regresar". Cada ícono acompañado de su palabra. [C1]
- Nombres cortos (2–3 palabras) e idénticos en menú, tarjeta y encabezado. [C1]
- Código jerárquico de parada `[S0·E1]`, igual en mapa, guion y Figma. [C1]
- Microcopys del archivo [O]: "Entrar al Museo", "Toca un punto dorado", "Explorar en 3D / AR", "Explorar en 360°", "Ver en 2D", "Inicio quieto · Arrastra 360° o toca 1, 2, 3", "Volver al Pasillo".
- Cada dato con su fuente (Fundación, UNESCO, MinCultura, Banrepcultural, prensa); Wikipedia solo para contrastar. [C1]

## 10. Nomenclatura y organización del archivo [O]

- Páginas numeradas por actividad (`1.`, `2.1`, `2.2`, `2.3`).
- Frames de UI: `UI / Sala Núcleo / Estacion N · Capa`; bocetos: `Boceto / Sala N / Pasillo`; prototipo: `Estación N · #. Estado`.
- Variables con barras y en español: `color/marca/primario`, `boton/primario/fondo`, `espacio/8`.
- Componentes interactivos: `Interactivo / <Nombre>` con propiedad `Estado`.
- Capas con nombre descriptivo ("Fondo Escenario Estación", "Barra Superior", "Tarjeta Galería 1 (Acordeón)").

## 11. Reglas de decisión (si… entonces…)

| Si… | Entonces… | Origen |
|---|---|---|
| Un elemento se puede tocar | Va en dorado (`interactivo/acento`) **con borde o ícono en Cuero de Caja y halo de ≥ 3:1**, o es un botón rojo/verde; tiene estado **Presionado** (Cursor solo en escritorio) | [O][P] |
| Es la acción principal de la pantalla | Botón primario Rojo Pañuelo con texto Caña Flecha | [O] |
| Es una acción alternativa | Botón secundario Verde Sierra | [O] |
| Hay texto o ícono de línea sobre dorado | Va en Cuero de Caja, nunca en crema | [O medido] |
| Algo suena | Arranca en pausa, lo activa el visitante, lleva subtítulo | [O][C1] |
| Hay un momento inmersivo | Inicio quieto + alternativa 2D con el mismo audio | [O][C1] |
| Cambia de pantalla o estación | Smart Animate 300 ms ease-in-out | [O] |
| Se presiona un elemento (celular) | Cambiar a variante Presionado, Smart Animate 150 ms ease-out | [P] |
| Se pasa el cursor (solo escritorio) | Cambiar a variante Cursor, 150 ms ease-out | [O] |
| Se navega con teclado | Anillo doble azul `#1D63B8` + crema, distinto de Activo | [O][C2][P] |
| Se comunica un estado | Texto o ícono además del color | [C1] |
| Algo se puede tocar en el celular | Área táctil ≥ 48 × 48 y estado Presionado, aunque el ícono sea pequeño | [P] |
| Es una acción frecuente | Va en el tercio inferior, al alcance del pulgar | [C1][P] |
| Hay un arrastre (carrusel, 360) | Existe también un botón o punto tocable que hace lo mismo | [P] |

## 12. Inconsistencias y vacíos del sistema (para aclarar, no para rehacer)

1. **Tamaños de texto fuera de escala:** en las pantallas se usan 8, 9, 9.5, 10, 10.5, 11 y 11.5 px aunque los estilos empiezan en 12. Por debajo de 12 px se compromete la lectura en celular. [O] → [P] mínimo 13 px (D1); usar los 5 estilos.
2. **Estilos y variables poco aplicados:** la mayoría de colores de las pantallas están escritos a mano (ámbar 206 veces, crema 181) y las variables tienen alcance "todos los usos". [O] → [P] ligar a variables y fijar alcances.
3. **Radios dispersos:** se usan 5, 6, 10, 12, 13, 14, 16, 17 además de 4/8/999. [O] → [P] escala 4 · 8 · 12 · 16 · 999.
4. **Separaciones fuera de la unidad de 4:** 1, 3, 5, 7 px. [O] → [P] solo múltiplos de 4.
5. **Sombras sin estilo** (8 valores distintos). [O] → [P] tres niveles: tarjeta, flotante, resplandor.
6. **Estados incompletos en componentes:** solo Normal y Cursor; Activo, Foco, Deshabilitado y Cargando están dibujados pero no son variantes. El Corte 2 pide 6 estados en el botón. [O][C2] → [P] agregar Foco y Deshabilitado como mínimo.
7. **Foco y superficies sin variable:** `#1D63B8`, `#F7F3EC`, `#EDE3CE`. [O] → [P] crear `color/foco`, `color/superficie/*`.
8. **"AAA" del botón secundario no se cumple:** mide 6.12:1 (AA). [O medido]
9. **Íconos en inglés y con tamaños mixtos** (18–30 px). [O] → [P] nombres en español y tamaños 20/24.
10. **Estados por duplicación de frames:** 40 pantallas para una sala; frágil al iterar tras el testing. [O] → [P] variables o componentes interactivos donde reduzcan frames.
11. **Grises de maqueta en pantallas** (`#383838`, `#D9D9D9`) y frames de prototipo con rectángulos de bloqueo. [O] → [P] reemplazar por contenido real.
12. **Contenido de las estaciones del prototipo** ("Tríada instrumental" en la estación 1) distinto del guion del Corte 1 ("Qué es y dónde nace", 1968, Consuelo Araújo, Piloneras). [O][C1] → resuelto: manda el guion del Corte 1, confirmado por el Corte 2 (§18).
13. **Ámbar como color de texto o ícono fino sobre crema** (1.78:1). [O medido] → prohibido.
14. **Diseño pensado con cursor:** 202 interacciones de hover que no existen en el celular. [O] → estado Presionado (§7).
15. **93 % de áreas táctiles bajo 44 px y 73 % de textos bajo 12 px** en el prototipo. [O] → §1.1, §3 y §5.
16. **Formato 375 × 667** frente a pantallas alargadas actuales y al alto útil real del navegador. [O] → resuelto en D1 (§15): 375 × 812.
17. **Volver arriba a la izquierda**, fuera de la zona del pulgar y en contra de la barra inferior fija del Corte 1. [O][C1]

## 13. Responsive

No se observan puntos de quiebre: todo está diseñado a 375 × 667. [O]

[P] Estrategia **móvil primero**:
- Prototipo de Figma de 375 × 812 (D1, §15), abierto desde el QR en el navegador del celular y ajustado al ancho; se revisa en 360 × 800, en un iPhone real con Safari y en un Android real con Chrome.
- Páginas web (360 / AR) **fluidas** de 320 a 430 px de ancho, con zonas seguras, sin bloquear orientación y respetando "reducir movimiento".
- Escritorio y tableta: se ven, pero no se optimizan.

## 14. Guía para agentes (invariantes)

- Usar **solo** las variables de `Tokens Base` y `Componentes`; nunca hex escrito a mano salvo los anotados en §2.1 mientras no tengan variable.
- Reutilizar los componentes `Botón`, `Tarjeta / Sala` e `Interactivo / *` antes de dibujar algo nuevo, ajustados al canon del Corte 2 (§18). Cuando el Corte 2 difiere del archivo de la profesora, manda el Corte 2.
- Tipografía: solo los 5 estilos; nada por debajo de 13 px.
- Espaciado en múltiplos de 4; radios 4 · 8 · 999 (más 12 · 16 si se aprueba §12.3).
- Transiciones: 300 ms ease-in-out entre pantallas, 150 ms ease-out en el estado Presionado (Cursor solo en escritorio).
- Ningún audio arranca solo y ningún audio va sin subtítulo; todo momento inmersivo arranca quieto y tiene alternativa 2D.
- No comunicar estados solo con color; el foco siempre visible y distinto del activo.
- **Móvil primero:** frames de 375 × 812 (D1), área táctil mínima 48 × 48, relato a 16 px, nada bajo 13 px; progreso con variables de Figma: Visitada y "parada X de 4" (D3); "Plaza" en lugar de "Pasillo" (§18), acciones frecuentes en el tercio inferior, controles críticos dentro del alto útil del navegador (~640 px).
- El dorado tocable siempre con borde o ícono en Cuero de Caja y halo ≥ 3:1; foco con anillo doble.
- Ningún estado depende del cursor: el feedback visual es **Presionado**; todo arrastre tiene alternativa de un toque.
- No mezclar con el sistema de diseño anterior del estudiante (descartado).

## 15. Decisiones tomadas [P]

**Enfoque:** Figma es la **vista previa** (lo que califica la Fase 1 y lo que se prueba primero); el **código** es la versión final y se construye en Claude Code. Lo que solo se resuelve en el montaje queda como propuesta para el equipo (ver §17).

- **D1 · Tamaño de diseño → A: frames de 375 × 812.** Se conserva el ancho de la profesora. Como en teléfonos de 360 px todo se reduce un 4 %, los mínimos suben a **48 px táctil** y **13 px de texto**. Los controles críticos van dentro de los primeros **~640 px** de alto; lo demás se alcanza deslizando.
- **D2 · Navegación → canon del Corte 2** (reemplaza la propuesta anterior). Menú inferior global **Plaza · Pasaporte · Audio · Perfil** (con el chip "3D en el navegador · sin instalar"), solo en la Plaza y el Mapa. Dentro de las estaciones: encabezado **Volver · [S0·E1] parada X de 4 · Mapa** y barra inferior **Volver · Mapa · Siguiente**. Una sola barra inferior por tipo de pantalla. Se valida en el teléfono con el primer grupo de pantallas antes de construir el resto.
- **D3 · Progreso → variables de Figma** (reemplaza la variante simple). El canon pide marcador de sala **Sala actual · Visitada · Disponible** (con punto, no solo color), "parada X de 4" y tarjetas **Bloqueada · Disponible · Completada**.
  - **Figma (vista previa):** 4 variables booleanas (una por estación) que se activan al entrar; el marcador y el contador leen esas variables. Se reinicia al recargar (limitación declarada).
  - **Código (final):** el mismo comportamiento con `localStorage` y botón **"Reiniciar recorrido"**.

## Pruebas [P]

- **Primero Figma, luego código.** Pruebas en varios teléfonos Android propios; **iPhone de un compañero** para Safari, Quick Look (RA) y políticas de audio de iOS.
- Cada prueba registra: modelo, navegador, tamaño de pantalla, red (Wi-Fi/4G), y si se cumplieron los mínimos (48 px, 13 px, barra visible, audio con gesto, subtítulos).
- El código repite la verificación corta en los mismos teléfonos antes de publicar el QR.

## 16. Contexto físico: QR, exteriores y grupos [P]

- El QR lleva a una **URL corta con redirección**, para cambiar el destino sin reimprimir; el afiche incluye la URL escrita como respaldo.
- Tamaño del QR: al menos **1/10 de la distancia de escaneo** (≈ 15–20 cm si se escanea a 1,5–2 m).
- El enlace del prototipo: **"Cualquiera con el enlace · puede ver"**, sin pedir inicio de sesión; comprobar si aparece el aviso "abrir en la app" y que no bloquee.
- Paso al 360/AR:
  - **En Figma:** "Abrir enlace" en **pestaña nueva**; al cerrarla, el visitante vuelve al prototipo sin que se recargue.
  - **En código:** misma pestaña y botón "Volver al museo", porque el avance queda guardado en el teléfono.
- AR web: `<model-viewer>` con **GLB + USDZ** (iOS usa Quick Look y Android Scene Viewer; no hay WebXR en iOS); pantalla previa que explique el **permiso de cámara**.
- La AR y el WebGL gastan batería y calientan el teléfono: sesiones cortas, aviso de uso de cámara y batería, textos de 16 px o más y controles de 48 px en el visor (pensando en un teléfono compartido en grupo).

## 17. Del prototipo al montaje [P]

Partes que **solo existen en el montaje o en código**, y que se proponen al equipo con soporte de Claude:

- **Avance persistente** (`localStorage`) y **"Reiniciar recorrido"**.
- **Subtítulos reales** (`.vtt`) que se activan y desactivan; audio con gesto del visitante.
- **Lectores de pantalla, texto al 200 %, "reducir movimiento" y pantalla horizontal**: declarados como limitación en Figma, obligatorios en código.
- **Momento inmersivo** en el mismo sitio: Pannellum (360) o `<model-viewer>` (RA) con alternativa sin cámara.
- **QR por estación** en el espacio físico: abre esa estación y la marca como Visitada.
- Publicación en **GitHub Pages** desde el repo `museo-digital`, con URL corta para el QR.

Cada propuesta se presenta al equipo como: qué resuelve, qué necesita (material, permisos, tiempo) y quién la ejecuta.

## 18. Ajustes del Corte 2 (canon de clase) [C2]

El Corte 2 es la versión válida. No reabre el contenido ni la arquitectura del Corte 1 (las cuatro estaciones siguen: Qué es y dónde nace · 1968 · Consuelo Araújo · Piloneras), pero fija un estándar de interfaz que **prevalece sobre el archivo de la profesora** cuando difieren:

| Tema | Canon del Corte 2 | Aplicación aquí |
|---|---|---|
| Espacio central | **Plaza / Plaza de salas** | Se usa "Plaza" en lugar de "Pasillo" en todas las pantallas y textos |
| Navegación | Ver D2 | §15 |
| Progreso | Ver D3 | §15 |
| Botón | **6 estados:** Normal, Hover, Pressed, Foco (anillo azul), Deshabilitado, Solo-icono. Tamaños 44 · 48 · 56 | Se adoptan los 6 estados (Pressed = "Presionado"; Hover solo en escritorio). **Tamaños 48 y 56**: el de 44 se quita para respetar el mínimo de D1 |
| Control de audio | **Escuchar · Sonando · Escuchar (foco)**, más silenciar, volumen y error de carga; texto "Nada suena solo: tú lo activas" | Se adopta |
| Tarjetas y alternativa | Card e Item de sala, Puerta temática, CTA y "¿Sin 3D? Galería de fotos con el mismo audio" | Se adopta como texto de la alternativa sin cámara |
| Método de prototipo | Frames con nombre; audio como componente con "Change to"; ficha flotante con **Open overlay**; Smart Animate; punto de inicio en la entrada | Se adopta: reduce la cantidad de pantallas frente a los 40 frames del archivo de la profesora |
| Momento inmersivo | Base recomendada: **360 del Desfile** (estación 4) con versión sin 3D (video plano con subtítulos). La RA aparece en el puente físico (WebAR con `model-viewer`) | Se mantiene la decisión del equipo: **RA del acordeón en la estación 1**, con alternativa sin cámara. Se declara que el canon recomendaba el 360 del desfile |
| Microinteracciones | Toda animación orienta, revela, confirma o da ritmo; mostrar antes y después de cada una | Se adopta |
| Tema | Pide cerrar la coherencia entre claro y oscuro | Por ahora **solo claro**; se aclara en clase |
| Contenido del Figma de la profesora | Estación 1 "Tríada instrumental" | Se reemplaza por el guion del Corte 1 (§12.12 resuelto) |

---

## Fuentes de las correcciones móviles

Primarias (vigentes):
- W3C — Understanding WCAG 2.2: 2.5.1 Pointer Gestures, 2.5.7 Dragging Movements, 2.5.8 Target Size (Minimum), 1.4.11 Non-text Contrast, 1.3.3 Sensory Characteristics — https://www.w3.org/WAI/WCAG22/Understanding/
- Figma Learn — Prototype triggers (https://help.figma.com/hc/en-us/articles/360040035834) · Use videos in prototypes (https://help.figma.com/hc/en-us/articles/8878274530455)
- Chrome for Developers — Autoplay policy in Chrome: https://developer.chrome.com/blog/autoplay
- StatCounter — Mobile Screen Resolution Stats Colombia (jul. 2026): https://gs.statcounter.com/screen-resolution-stats/mobile/colombia

De apoyo (2024–2026):
- Figma Community Support — el hover no se convierte en toque en móvil (feb. 2024): https://forum.figma.com/suggest-a-feature-11/allow-hover-and-click-together-12231/index8.html
- TestMu — Políticas de autoplay en Chrome, Safari y Firefox (2026): https://www.testmuai.com/blog/video-audio-autoplay-policies-across-browsers/
- Apple Human Interface Guidelines (44 pt) y Material Design 3 (48 dp) — tamaños táctiles recomendados.

Contrastes: calculados con la fórmula de luminancia relativa de WCAG 2.2 y verificados por una segunda revisión independiente.
