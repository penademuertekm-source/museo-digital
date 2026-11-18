# CRITERIOS.md — Reglas que no se negocian

> Museo del Festival de la Leyenda Vallenata · Sala Núcleo · Diseño de Interfaces Físicas, Areandina 2026-2.
> Este documento dice **qué** debe cumplirse siempre. El **cómo se ve** está en `DESIGN.md`; el **cuándo y quién** en `PLAN.md`.
> Aplica a las dos versiones: la **vista previa en Figma** y la **versión final en código**. Si una regla no se puede cumplir en Figma, se declara como limitación y se cumple en código.

**Origen:** [C1] Corte 1 · [C2] Corte 2 · [D] decisión tomada en `DESIGN.md` · [W] WCAG 2.2.
**Columnas:** qué se exige en Figma · qué se exige en código · cómo se comprueba.

---

## A. Sonido

| # | Regla | Figma | Código | Cómo se comprueba |
|---|---|---|---|---|
| A1 | **Nada suena solo.** Ningún audio ni video con sonido arranca sin un toque del visitante. [C1] | El video del aire solo se reproduce en el frame al que se llega después de tocar "Escuchar" | `<audio>`/`<video>` sin `autoplay` con sonido; arranca con un toque | Abrir cada pantalla sin tocar nada: silencio total |
| A2 | **El sonido nunca va solo.** Todo audio lleva subtítulos sincronizados o transcripción. [C1][C2] | Subtítulo visible en el frame de audio activo, ≥ 16 px | Archivo `.vtt` en `<track>`, activo por defecto, con opción de ocultar; transcripción enlazada | Reproducir con el teléfono en silencio: se entiende todo |
| A3 | Todo audio **se puede detener** y hay un solo audio sonando a la vez. [C1] | Pausa visible en todo frame de audio activo | Al iniciar uno se detiene el anterior | Iniciar dos audios seguidos |
| A4 | Aviso inicial: "Sube el volumen o usa audífonos; todo tiene subtítulos". [D] | En la portada | En la portada | Revisión visual |

## B. Accesibilidad

| # | Regla | Figma | Código | Cómo se comprueba |
|---|---|---|---|---|
| B1 | **Contraste:** texto ≥ 4.5:1; relato y etiquetas críticas ≥ 7:1; íconos, bordes y puntos tocables ≥ 3:1. Nunca dorado sobre crema como texto o ícono. [C2][W][D] | Solo combinaciones aprobadas de `DESIGN.md` §2.3 | Las mismas variables CSS | Medir cada combinación nueva antes de usarla |
| B2 | **Nunca solo color:** todo estado lleva texto o ícono. [C1][W 1.3.3] | Puntos numerados o con ícono; "Toca un punto ✦" | Igual, más `aria-label` y estado anunciado | Ver la pantalla en escala de grises |
| B3 | **Foco visible y distinto de Activo:** anillo doble azul `#1D63B8` + crema. [C1][C2] | Variante Foco dibujada en los componentes | `:focus-visible` con el anillo doble | Recorrer todo con teclado (Tab) en computador |
| B4 | **Todo funciona con teclado** y con lector de pantalla. [C1] | Limitación declarada | Orden de foco lógico; probado con TalkBack y VoiceOver | Prueba con los dos lectores |
| B5 | **Texto ampliable al 200 %** sin cortes. [C1] | Limitación declarada | Unidades `rem`, sin alturas fijas en textos | Zoom del navegador al 200 % |
| B6 | **Movimiento:** inicio quieto en todo visor; sin bucles infinitos (máx. 3 ciclos); nada parpadea más de 3 veces por segundo; movimiento desactivable. [C1] | Sin bucles; el "zoom al pedestal" va como disolver | Respeta `prefers-reduced-motion` y hay interruptor propio | Activar "reducir movimiento" en el teléfono |
| B7 | **Cada imagen con descripción escrita.** [C1] | Descripción en la nota del frame | `alt` en cada imagen; las decorativas con `alt=""` | Revisar que ninguna imagen informativa quede sin texto |
| B8 | **Todo gesto tiene alternativa de un toque** (deslizar, arrastrar el 360). [W 2.5.1, 2.5.7] | Puntos y flechas como vía principal | Igual | Completar el recorrido sin deslizar ni arrastrar |

## C. Móvil primero

| # | Regla | Figma | Código | Cómo se comprueba |
|---|---|---|---|---|
| C1 | **Área táctil mínima 48 × 48**, separadas 8 px. [D1] | Marco táctil transparente si el ícono es menor | `min-width/min-height: 48px` | Medir en Figma / inspeccionar en el navegador |
| C2 | **Texto mínimo 13 px; relato 16 px.** [D1] | Solo los 5 estilos | Escala en `rem` equivalente | Buscar textos menores |
| C3 | **Controles críticos dentro de ~640 px de alto**; acciones frecuentes en el tercio inferior. [D1][C1] | Frames de 375 × 812 | Diseño fluido de 320 a 430 px | Abrir en el teléfono sin desplazar |
| C4 | **Nada depende del cursor:** el estado de respuesta es Presionado. [D] | Disparador al presionar | `:active` + `:hover` solo con `@media (hover: hover)` | Probar con el dedo |
| C5 | **Peso total < 15 MB**; imágenes < 300 KB; video del aire ≤ 10 MB. [D] | Archivo de prototipo aparte | Imágenes optimizadas y carga diferida | Carga con 4G en un Android de gama baja |
| C6 | **Navegación constante:** "Volver", "Mapa" y "Siguiente" siempre en el mismo lugar; siempre "Volver", nunca "Atrás". [C1][D2] | Barra inferior según D2 | Igual | Recorrer las 4 estaciones |

## D. Momento inmersivo

| # | Regla | Figma | Código | Cómo se comprueba |
|---|---|---|---|---|
| D1 | **Al menos un momento inmersivo** (360, 3D navegable o QR + RA) que funcione en el navegador del teléfono. [Actividad Fase 1] | Enlace que abre en pestaña nueva | En el mismo sitio, con botón "Volver al museo" | Abrirlo en Android e iPhone |
| D2 | **Alternativa sin cámara ni 3D** con el mismo contenido y el mismo audio. [C1][C2] | Frame "Vista 2D" | Vista 2D en HTML | Completar la estación sin abrir el visor |
| D3 | Si usa cámara: **pantalla previa que explique el permiso** y aviso de batería. [D] | Frame previo | Pantalla previa antes de pedir el permiso | Rechazar el permiso: el visitante no queda atascado |

## E. Contenido y licencias

| # | Regla | Comprobación |
|---|---|---|
| E1 | **Ningún asset sin licencia y crédito** (imagen, audio, video, modelo 3D, tipografía). Cada uno queda registrado con fuente, licencia y enlace. [C1][C2] | Tabla de assets completa antes de publicar |
| E2 | **Cada dato con su fuente** (Fundación, UNESCO, MinCultura, Banrepcultural, prensa); Wikipedia solo para contrastar. [C1] | Revisión del guion |
| E3 | **Mismo nombre en todas partes:** menú, tarjeta, encabezado, mapa y código de parada `[S0·E1]`. [C1] | Buscar variaciones de nombre |
| E4 | Segunda persona, tono cercano; nombres de 2–3 palabras. [C1] | Lectura en voz alta |

## F. Uso de IA

| # | Regla | Comprobación |
|---|---|---|
| F1 | **Toda ayuda de IA se declara** (qué herramienta, para qué y qué se validó a mano). Lo generado por IA sin declarar queda fuera del trabajo. [C2] | Declaración de IA en la documentación final |
| F2 | La IA es soporte: **cada decisión, token, contraste y dato se valida manualmente** contra las fuentes. [C2] | Registro de lo validado |
| F3 | Ninguna imagen generada por IA se presenta como fotografía o documento real del Festival. [C2] | Revisión de assets |

## G. Proceso

| # | Regla |
|---|---|
| G1 | **El Figma de la profesora es de solo lectura**: nada se escribe en él sin orden explícita. |
| G2 | **Una etapa a la vez:** se entrega, se revisa y se aprueba antes de seguir. |
| G3 | **Primero Figma, después código.** El código no se empieza hasta congelar la vista previa. |
| G4 | **Probar en teléfonos reales**: Android propios y el iPhone de un compañero; cada prueba registra modelo, navegador, red y resultado. |
| G5 | **Toda limitación de Figma se declara** y se resuelve en código. |
| G6 | No se mezcla con el sistema de diseño anterior del estudiante (descartado). |

---

## Si dos criterios chocan

1. **A (sonido) y B (accesibilidad)** primero: son las reglas de oro del curso.
2. Luego **E y F** (licencias e IA): sin ellas el trabajo no se puede presentar.
3. Luego **C y D** (móvil e inmersivo).
4. Si el choque sigue, se anota y se decide con el equipo o la docente; no se resuelve en silencio.

## Pendientes que tocan estos criterios

- **Dónde vive el prototipo:** el Corte 2 dice "unificar el prototipo en el Figma de clase (base canónica)"; nuestro plan crea un Figma nuevo. Hay que confirmar con la docente si basta con enlazarlo o si debe ir dentro del Figma de clase.
- **Contenido de las estaciones:** "Tríada instrumental" (Figma) o el guion del Corte 1. Decide la docente.
- **Licencias pendientes desde el Corte 2:** Fraunces, Work Sans y las pistas de audio.
- **Momento inmersivo existente:** el grupo Moreno ya publicó un recorrido 360 con hotspots y audio; conviene revisar si se reutiliza en lugar de hacer uno nuevo.
