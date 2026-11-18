# GUION.md — Sala Núcleo · contenido y guion de interacción

> Etapa 1 del `PLAN.md`. **Propuesta del equipo, sujeta a la revisión de la docente.**
> Base: las cuatro paradas del Corte 1, confirmadas por el Corte 2 ("el contenido y la arquitectura del Corte 1 no se reabren"). Interfaz según el canon del Corte 2 (`DESIGN.md` §15 y §18).
> Cada dato lleva su fuente (E2). Las fuentes de más de 5 años solo respaldan hechos históricos y están marcadas con ⌛; se prefieren las recientes.

---

## 0. Estructura de la sala

| Orden | Código | Nombre corto (menú, tarjeta y encabezado) | Nombre largo (Corte 1) | Emoción (Corte 1) | Interacción principal |
|---|---|---|---|---|---|
| 1 | `[S0·E1]` | **Dónde nace** | Qué es y dónde nace | Curiosidad | RA del acordeón + audio del aire |
| 2 | `[S0·E2]` | **1968** | 1968 | Orgullo | Línea de tiempo con 4 fechas |
| 3 | `[S0·E3]` | **Consuelo Araújo** | Consuelo Araújo | Respeto | **Sin interacción**: retrato, voz y subtítulos |
| 4 | `[S0·E4]` | **Piloneras** | Piloneras | Alegría | Galería del desfile |

- Los nombres cortos cumplen la regla de 2–3 palabras (E3, E4). "Qué es y dónde nace" tiene cinco, por eso se propone **"Dónde nace"** en menú, tarjeta y encabezado. 🔁 Confirmar con la docente.
- El orden va de lo general a lo particular. Consuelo va tercera porque es la parada más dura: no abre ni cierra el recorrido (Corte 1).
- **Frase de cierre** (Corte 1, Equipo UX): *"Desde 1968, el Festival sigue haciendo parte de la historia y la cultura de Valledupar."*

---

## 1. Estación 1 · Dónde nace `[S0·E1]`

**Idea principal:** el Festival existe para cuidar una música que nació en el Magdalena Grande de la mezcla de varias culturas.

**Relato (16 px, segunda persona):**
> Antes de que existiera el Festival ya existía esta música. Nació en el Magdalena Grande, entre vaqueros que cantaban mientras arreaban el ganado, cantos que trajeron los africanos esclavizados y danzas de los pueblos indígenas. Tres instrumentos la sostienen: el acordeón, la caja y la guacharaca. Con ellos se tocan cuatro aires: paseo, merengue, son y puya. Escucha cómo suenan juntos.

**Datos con fuente**
| Dato | Fuente |
|---|---|
| La música vallenata nace de la fusión de expresiones del norte de Colombia: canciones de vaqueros del Magdalena Grande, cantos de esclavos africanos y danzas tradicionales indígenas | UNESCO, ficha 01095 (primaria) |
| Los cuatro aires son paseo, son, merengue y puya | UNESCO, ficha 01095 · El Heraldo, 2015 ⌛ |
| **No** se asigna un origen a cada instrumento (la UNESCO describe tres fuentes, no "un instrumento por cultura") | Corte 1, verificación común [26] |

**Pieza central:** el trío de instrumentos. El acordeón se puede ver en RA.
**Pieza sonora:** el aire (provisional: pista de referencia, ver §6).
**Galería (3 imágenes, con descripción escrita):** acordeón · caja · guacharaca. Las imágenes y sus licencias se definen en la Etapa 2.
**Momento inmersivo:** "✦ Ver el acordeón en tu espacio" → pantalla previa de permiso de cámara → enlace en pestaña nueva a la página `<model-viewer>`.
**Alternativa sin cámara:** "¿Sin 3D? Galería de fotos con el mismo audio" (canon C2).
**Aviso al presentar:** el modelo 3D es un acordeón genérico (Antique Accordion, Canicule, CC BY), no un acordeón vallenato de botones.

---

## 2. Estación 2 · 1968 `[S0·E2]`

**Idea principal:** el Festival nació en 1968 como un proyecto cultural y político para darle valor a la música de acordeón y una identidad al nuevo departamento del Cesar.

**Relato:**
> En 1968, el recién creado departamento del Cesar buscaba mostrarse al país. Su primer gobernador, Alfonso López Michelsen, se reunió con la periodista Consuelo Araújo Noguera y el compositor Rafael Escalona. De ahí salió un concurso de acordeón en Valledupar. Ese año, Alejo Durán se coronó como el primer Rey Vallenato. Desliza por la línea de tiempo y mira cómo creció.

**Datos con fuente**
| Dato | Fuente |
|---|---|
| El Festival nace en 1968 en Valledupar | El Espectador, 2024 · Pulzo, 2025 |
| López Michelsen, gobernador del Cesar, convocó; Consuelo Araújo propuso; Rafael Escalona participó | Corte 1, verificación común [26] · El Espectador, 2024 |
| Alejo Durán fue el primer Rey Vallenato. **No se da el día** de la coronación (la Fundación y El Tiempo no coinciden) | El Heraldo, 2024 · Corte 1 [26] |
| En el primer concurso participaron **nueve** acordeoneros | Corte 1 [26], según la Fundación |

**Línea de tiempo (4 fechas, Corte 1):**
| Año | Hito | Fuente |
|---|---|---|
| 1968 | Primer Festival y primer Rey Vallenato | El Espectador, 2024 · El Heraldo, 2024 |
| 1986 | El Festival pasa de la oficina de Turismo del Cesar a la Fundación Festival de la Leyenda Vallenata | El Heraldo (historia del Festival) ⌛. 🔁 Hay fuentes que dicen 1987; confirmar con la Fundación |
| 2004 | Se inaugura el Parque de la Leyenda Vallenata "Consuelo Araújo Noguera" | Las2orillas (fecha de publicación por confirmar) |
| 2015 | La UNESCO inscribe la música vallenata tradicional del Magdalena Grande en la Lista de Salvaguardia Urgente | UNESCO, ficha 01095 · Cancillería, 2015 ⌛ |

**Interacción:** deslizar la línea de tiempo. **Alternativa de un toque (B8):** los cuatro años como botones de 48 px.
**Pieza sonora:** no lleva audio propio. Se puede repetir el aire de E1 si el visitante lo activa.

---

## 3. Estación 3 · Consuelo Araújo `[S0·E3]`

**Decisión del Corte 1:** *"Aquí la decisión es quitar interacción, no sumarla."* Solo retrato, una voz que narra y subtítulos. Sin carrusel, sin galería, sin animación. Solo están el audio (Escuchar · Sonando) y la navegación.

**Idea principal:** sin Consuelo Araújo, "La Cacica", el Festival no existiría como lo conocemos.

**Texto de la narración (para grabar con la voz de un integrante del equipo; licencia propia):**
> Consuelo Araújo Noguera nació en Valledupar en 1940. Fue periodista y escritora, y la llamaron "La Cacica". Ayudó a crear el Festival y estuvo al frente de él durante décadas. En 1994 asumió el desfile de piloneras cuando se volvió concurso. Fue ministra de Cultura entre 2000 y 2001. En septiembre de 2001 la secuestraron cerca de Valledupar y días después la asesinaron. El parque donde hoy se celebra el Festival lleva su nombre.

**Datos con fuente**
| Dato | Fuente |
|---|---|
| Nació en Valledupar en 1940; fue periodista y escritora | Las2orillas · El Heraldo, 2021 ⌛ (límite) |
| Fue una de las fundadoras del Festival y lo dirigió durante unas tres décadas | El Heraldo, 2021 · La Silla Vacía |
| En 1994 la Fundación adoptó el desfile de piloneras como concurso y le encargó la logística a Consuelo Araújo | Radio Nacional, 2026 |
| Fue ministra de Cultura entre 2000 y 2001 | El Heraldo, 2023 |
| La secuestraron el 24 de septiembre de 2001 y la asesinaron días después | Corte 1 [26] · El Heraldo, 2021 |

**Discrepancia que se resuelve sin dar el día:** el Corte 1 verificó el 30 de septiembre como fecha del asesinato, pero El Heraldo (varios años) dice 29. Las fechas de inicio y fin como ministra también varían entre fuentes. Por eso el guion dice "días después" y "entre 2000 y 2001".
**Fuera del museo:** el detalle judicial del caso (Corte 1).
**Tono:** respetuoso y sin dramatizar. Sin música alegre de fondo.
**Pieza central:** retrato con licencia (pendiente para la Etapa 2; la Fundación y Señal Memoria requieren autorización).

---

## 4. Estación 4 · Piloneras `[S0·E4]`

**Idea principal:** el desfile de piloneras es la tradición viva del Festival: la ciudad entera baila para abrirlo.

**Relato:**
> Llegas a la calle y suena el pilón. Más de cien grupos de piloneras, con polleras de colores, abren el Festival bailando por las avenidas de Valledupar. Lo hacen desde 1981, y desde 1994 es concurso: se premia la autenticidad del baile, el vestuario y la música. Niños, jóvenes y mayores mantienen viva una danza que estaba en riesgo de perderse.

**Datos con fuente**
| Dato | Fuente |
|---|---|
| Las piloneras aparecieron por primera vez en la inauguración del Festival en 1981 | Hoy Diario del Magdalena, 2026 · El Heraldo, 2018 ⌛ |
| Desde 1994 el desfile es concurso oficial de la Fundación | Radio Nacional, 2026 |
| El desfile abre el Festival (es su "abrebocas") | Radio Nacional, 2026 · El Heraldo, 2025 |
| Hay categorías infantil, juvenil y mayores | El Heraldo, 2026 · La FM, 2024 |
| Más de cien grupos de mayores (138 en 2024) · el jurado califica autenticidad del baile, vestuario y acompañamiento musical | El Heraldo, 2024 · El Heraldo, 2017 ⌛ |
| El concurso se creó para preservar una danza que se estaba perdiendo | El Heraldo, 2014 ⌛ · La FM, 2024 |

**Pieza central:** la pollera y el pilón (hito de la sala según el Corte 1).
**Pieza sonora:** un golpe de caja como sonido de la sala (Corte 1). Pendiente para la Etapa 2.
**Galería:** 3 fotos del desfile con licencia (el Corte 1 ya tenía una CC BY-SA 2.0).
**Momento inmersivo:** el canon recomendaba el 360 del desfile aquí. En esta versión el inmersivo va en E1; el 360 queda como mejora para la versión en código.

---

## 5. Guion de interacción · pantallas y conexiones

Frames de **375 × 812**. Navegación según D2 y progreso según D3 (variables `visitada_e1` … `visitada_e4`, que se activan al entrar a cada Resumen).

| Frame | Qué se ve | Qué se toca → a dónde lleva |
|---|---|---|
| `00 · Portada` | Nombre del museo, aviso "Sube el volumen o usa audífonos; todo tiene subtítulos" | **Entrar al museo** → `01 · Plaza` |
| `01 · Plaza` | Menú **Plaza · Pasaporte · Audio · Perfil**. Tarjeta Sala Núcleo **Disponible**; las otras salas **Bloqueada** con el texto "Se abre al terminar la Sala Núcleo" | Tarjeta Sala Núcleo → `02 · Sala Núcleo` |
| `02 · Sala Núcleo` | Escenario con 4 puntos numerados ✦1–✦4; marcador con Visitada / Disponible y "parada X de 4"; aviso "Toca un punto ✦ para explorar" | ✦N → `EN · Resumen` · **Mapa** → overlay `Mapa` |
| `Mapa` (overlay) | Las 4 paradas con su estado | Parada → su Resumen · **Cerrar** |
| `E1 · Resumen` | Encabezado **Volver · [S0·E1] parada 1 de 4 · Mapa**; tarjeta (Resumen · Historia · Galería); audio **Escuchar** | Puntos o flechas → Historia o Galería · **Escuchar** → componente cambia a **Sonando** (video del aire) · **✦ Ver el acordeón en tu espacio** → `E1 · Antes de la RA` · **¿Sin 3D?** → Galería · Barra: **Volver** → `02` · **Mapa** · **Siguiente** → `E2 · Resumen` |
| `E1 · Antes de la RA` | Explica el permiso de cámara y el gasto de batería | **Abrir en RA** → enlace en pestaña nueva · **Volver** |
| `E2 · Resumen` | Relato + línea de tiempo | Botones 1968 · 1986 · 2004 · 2015 → overlay con el hito · Barra Volver · Mapa · Siguiente |
| `E3 · Consuelo` | Retrato, subtítulos, audio **Escuchar** | Solo audio y barra Volver · Mapa · Siguiente |
| `E4 · Resumen` | Relato + tarjeta (Resumen · Historia · Galería) | Igual que E1, sin RA · **Siguiente** → `05 · Cierre` |
| `05 · Cierre` | Frase de cierre + objeto del **Pasaporte** (propuesta: el sonido del aire de E1) | **Ir a la Plaza** → `01 · Plaza`, con la Sala Núcleo **Completada** y las otras salas **Disponible** |

- **Volver** dentro de una estación lleva a `02 · Sala Núcleo`; en `02`, lleva a `01 · Plaza`.
- **Siguiente** en E1–E3 lleva a la parada siguiente; en E4 lleva al cierre.
- Las fichas flotantes (hitos de la línea de tiempo, Mapa) son **overlays** (canon C2).
- **Ninguna pantalla suena sola.** El sonido solo entra con **Escuchar** (A1).

---

## 6. Pendientes y alertas

1. **⚠️ Audio de YouTube.** El Corte 1 dice que *"los videos de YouTube van embebidos, no descargados"* y que *"la Fundación, Señal Memoria y la UNESCO requieren autorización para reproducir"*. El plan provisional (descargar la pista para hacer el video de Figma) **contradice esa regla del curso**. Opciones:
   - **A.** En Figma, que **Escuchar** abra el video de YouTube embebido en una pestaña nueva (sin descargar). Se pierde el audio dentro del prototipo.
   - **B.** Descargarlo igual como prueba interna y no publicar el prototipo con esa pista (sigue contradiciendo el Corte 1).
   - **C.** Grabación propia o pista con licencia libre (cumple todo; requiere conseguirla).
   🔁 Decide Kevin.
2. **Voz de la estación 3:** grabarla con un integrante del equipo (licencia propia).
3. **Nombre corto de E1** ("Dónde nace"): confirmar con la docente.
4. **Fecha de la Fundación** (1986 o 1987): confirmar.
5. **Retrato de Consuelo y fotos del desfile:** conseguir con licencia en la Etapa 2.
6. **Fuentes antiguas (⌛):** buscar respaldo reciente antes de la entrega final.

---

## Fuentes

Primarias:
- UNESCO — Música vallenata tradicional del Caribe colombiano (ficha 01095): https://ich.unesco.org/es/RL/musica-vallenata-tradicional-del-caribe-colombiano-01095
- Trabajo común del Corte 1 y Corte 2 (verificación común [26] y canon de clase).

Prensa (más reciente primero):
- Radio Nacional (2026) — Desfile de Piloneras 2026: https://radionacional.co/cultura/desfile-de-piloneras-2026-valledupar
- Hoy Diario del Magdalena (2026) — Festival Vallenato, historia de las piloneras: https://hoydiariodelmagdalena.com.co/archivos/1283804/festival-vallenato-2017-no-tendra-artista-homenajeado
- El Heraldo (2026) — Piloneras infantil y juvenil: https://www.elheraldo.co/cesar/2026/04/28/los-ninos-y-jovenes-engalanaron-a-valledupar-con-el-baile-del-pilon/
- El Heraldo (2025) — A punta de pilón se prende el Festival: https://www.elheraldo.co/sociedad/2025/04/30/a-punta-de-pilon-se-prende-el-festival-vallenato/
- Pulzo (2025) — Historia del Festival: https://www.pulzo.com/entretenimiento/historia-festival-vallenato-valledupar-celebrado-abril-mayo-2025-PP4486508
- El Heraldo (2024) — Alejo Durán, primer rey: https://www.elheraldo.co/sociedad/2024/11/15/alejo-duran-le-puso-oficio-a-su-pedazo-de-acordeon-donde-tenia-su-corazon/
- El Espectador (2024) — Festival Vallenato 2024: https://www.elespectador.com/turismo/festival-vallenato-2024-fechas-eventos-y-nuevos-artistas/
- La FM (2024) — Desfile juvenil: https://www.lafm.com.co/colombia/festival-vallenato-2024-el-desfile-juvenil-que-inundo-de-alegria-a-valledupar
- El Heraldo (2023) — La Cacica, primer libro sobre vallenato: https://www.elheraldo.co/sociedad/2023/08/01/hace-50-anos-la-cacica-publico-el-primer-libro-sobre-vallenato-1020129/
- El Heraldo (2021) ⌛ — 20 años sin Consuelo Araújo: https://www.elheraldo.co/cesar/2021/09/29/20-anos-sin-consuelo-araujonoguera-la-cacica-del-vallenato-853835/
- La Silla Vacía — María Consuelo Araújo Castro (perfil): https://www.lasillavacia.com/quien-es-quien/maria-consuelo-araujo-castro/
- Las2orillas — Parque de la Leyenda (2004): https://www.las2orillas.co/?p=611276
- El Heraldo ⌛ — Historia del Festival (1986): https://www.elheraldo.co/cesar/historia-del-festival-de-la-leyenda-vallenata-352667
- El Heraldo (2024) — Piloneras mayores, 57 Festival: https://www.elheraldo.co/cesar/las-piloneras-mayores-vistieron-de-alegria-las-calles-de-valledupar-1090981
- El Heraldo (2017) ⌛ — 4.200 participantes en el desfile: https://www.elheraldo.co/cesar/2017/04/27/4-200-participantes-en-el-desfile-de-piloneras-353733/
- El Heraldo (2018) ⌛ — Piloneritos siguen la tradición: https://www.elheraldo.co/cesar/2018/04/23/piloneritos-siguen-la-tradicion-485870/
- Cancillería (2015) ⌛ — Inscripción UNESCO: https://www.cancilleria.gov.co/sala-de-prensa/noticias/musica-vallenata-tradicional-de-la-region-del-magdalena-grande-es-reconocida-por-la-unesco-como-patrimonio-cultural-inmaterial-de-la-humanidad
- El Heraldo (2015) ⌛ — Los cuatro aires, patrimonio: https://www.elheraldo.co/cultura/2015/12/02/el-vallenato-suena-como-patrimonio-de-la-humanidad-231416/

**Uso de IA (F1):** guion redactado con Claude a partir de los PDF del curso y de las fuentes listadas. Cada dato debe validarlo el equipo antes de la entrega.
