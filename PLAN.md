# PLAN.md — Plan de acción · Sala Núcleo

> Museo del Festival de la Leyenda Vallenata · Diseño de Interfaces Físicas, Areandina 2026-2.
> Reglas: `CRITERIOS.md` · Lenguaje visual: `DESIGN.md`.
> **Cómo se avanza:** una etapa a la vez. Cada etapa termina con una entrega, una revisión de Kevin y su aprobación antes de seguir (G2). Primero la vista previa en Figma, después el código (G3).

**Responsables**
- **Kevin:** decide, revisa, prueba en teléfonos y presenta al equipo.
- **Claude (chat):** documentos, guiones, investigación y revisión crítica.
- **Claude Code:** Figma nuevo, assets técnicos y código.
- **Equipo:** grabar o conseguir material, opinar sobre las propuestas.
- **Docente:** revisa el contenido y apoya en lo técnico pesado.

**Estado:** ✅ hecho · ⏳ en curso · ⬜ por hacer · 🔁 depende de la revisión de la docente

---

## Etapa 0 · Base documental ✅

| Tarea | Quién | Listo cuando |
|---|---|---|
| `DESIGN.md` con D1–D3 cerradas | Claude | ✅ En repo y Proyecto |
| `CRITERIOS.md` con acuerdos de pendientes | Claude | ✅ En repo y Proyecto |
| `PLAN.md` (este documento) | Claude | ✅ Aprobado |
| `CLAUDE.md` para Claude Code | Claude | ✅ En repo y Proyecto |

---

## Fase 1 · Prototipar la Sala Núcleo en Figma (vista previa)

### Etapa 1 · Guion de interacción y contenido propuesto 🔁
| Tarea | Quién | Listo cuando |
|---|---|---|
| Proponer el contenido de las 4 estaciones (título, resumen, historia, galería, pieza sonora, fuente de cada dato) | Claude redacta · Kevin aprueba | Cada dato tiene fuente (E2) y nombre único (E3) |
| Guion de interacción: lista de pantallas, qué se toca en cada una y a dónde lleva (con D2 aplicada) | Claude | Mapa de conexiones completo, sin pantallas huérfanas |
| **Momento inmersivo (provisional, se cambiará según lo que se acuerde en clase):** usar trabajo ya hecho por otros. Opción 1: RA con un acordeón 3D descargable de Sketchfab con licencia CC BY (trae versión USDZ para iPhone). Opción 2: video 360 del Festival en YouTube, insertado con su reproductor oficial | Kevin decide · Claude recomienda | Opción elegida, con crédito y alternativa sin cámara (D2 de criterios) 🔁 |
| Mostrar la propuesta a la docente | Kevin | Se anotan sus cambios 🔁 |

### Etapa 2 · Assets
| Tarea | Quién | Listo cuando |
|---|---|---|
| Lista de assets: imagen, audio, video, foto 360, tipografías; con fuente, licencia, crédito y enlace | Claude arma la tabla · equipo completa | Ninguna fila sin licencia (E1) |
| **Audio del aire (provisional):** pista de referencia tomada de YouTube, con crédito al intérprete y al canal, marcada como *temporal*. La opción definitiva (grabación oficial, pista con licencia o muestra con IA declarada) se elige después de investigar a fondo 🔁 | Kevin elige la pista · Claude investiga las opciones | Pista con crédito anotado y marcada como temporal en la tabla de assets |
| Subtítulos del audio (texto y tiempos) | Claude redacta a partir del audio | Sincronizados con la pista (A2) |
| Video `.mp4` para Figma: audio + subtítulos incrustados, H.264, ≤ 10 MB | Claude Code (ffmpeg) | Se reproduce en Figma y pesa ≤ 10 MB (C5) |
| Modelo 3D o video 360 provisional: descargar o enlazar, revisar licencia y crédito | Claude Code | Funciona en el visor y queda en la tabla de assets |
| Imágenes optimizadas (~750 px, < 300 KB) con descripción escrita | Claude Code · Claude escribe las descripciones | Cumplen C5 y B7 |
| **Verificación crítica de licencias** (Fraunces, Work Sans, audio y todo lo anterior) | Claude revisa · Kevin confirma | Cada licencia leída en su fuente oficial; lo que no sirva se reemplaza |

### Etapa 3 · Figma nuevo
| Tarea | Quién | Listo cuando |
|---|---|---|
| Crear el archivo nuevo **dentro de un proyecto de equipo** (en Borradores el video no se sube), separado del Figma de clase | Claude Code | Archivo creado y con permiso de edición |
| Pasar los tokens y estilos de `DESIGN.md` a variables del archivo nuevo, con alcances y mínimos de D1 | Claude Code | Variables y estilos verificados |
| Componentes con estados Normal · Presionado · Foco · Activo y área táctil de 48 px | Claude Code | Variantes completas (B3, C1, C4) |
| **Primer grupo de pantallas** (Portada, Pasillo, una estación completa) y prueba de la barra D2 en el teléfono | Claude Code arma · Kevin prueba | D2 confirmada o ajustada antes de seguir |
| Resto de pantallas de 375 × 812, conexiones, transiciones, video del aire y enlace al momento inmersivo (pestaña nueva) | Claude Code | Recorrido completo sin callejones |
| Revisión contra `CRITERIOS.md` | Claude | Lista de chequeo sin pendientes graves; limitaciones declaradas (G5) |

### Etapa 4 · Página del momento inmersivo
| Tarea | Quién | Listo cuando |
|---|---|---|
| Página web con Pannellum (360) o `<model-viewer>` (RA), inicio quieto, alternativa 2D y botón "Volver al museo" | Claude Code · docente apoya | Funciona en Android e iPhone (D1–D3) |
| Publicar en GitHub Pages y enlazar desde Figma | Claude Code | El enlace abre sin iniciar sesión |

---

## Fase 2 · Probar e iterar

### Etapa 5 · Pruebas con el prototipo de Figma
| Tarea | Quién | Listo cuando |
|---|---|---|
| Kit de prueba: tareas realistas, guion de "pensar en voz alta" y hoja de registro (modelo, navegador, red, resultado) | Claude | Kit aprobado por Kevin |
| Pruebas en los Android propios y en el iPhone de un compañero | Kevin | Registro completo de cada teléfono (G4) |
| Síntesis de hallazgos | Claude con las notas de Kevin | Hallazgos priorizados |
| Iterar **al menos 3 cambios**, uno de accesibilidad, con antes y después | Claude Code aplica · Kevin aprueba | 3 pares antes/después documentados |

---

## Fase 3 · Publicar y documentar

### Etapa 6 · Publicación
| Tarea | Quién | Listo cuando |
|---|---|---|
| Enlace del prototipo en "Cualquiera con el enlace · puede ver". **Antes de abrirlo al público, decidir si la pista de YouTube se reemplaza** (un enlace público difunde el audio) | Kevin | Abre sin iniciar sesión y la decisión del audio está tomada |
| URL corta y QR (≥ 1/10 de la distancia de escaneo) con la URL escrita de respaldo | Claude Code | QR probado en el teléfono de un desconocido |

### Etapa 7 · Documentación y sustentación
| Tarea | Quién | Listo cuando |
|---|---|---|
| Documento final: concepto, curaduría, arquitectura, sistema de diseño, prototipo, momento inmersivo, papel de la IA, hallazgos de las pruebas, limitaciones de Figma | Claude redacta · Kevin revisa | Cubre todos los puntos pedidos; IA declarada (F1) |
| Presentación como recorrido guiado | Claude · Kevin | Kevin la ensaya |

---

## Etapa 8 · Versión en código (después de congelar la vista previa)

Se hace en **Claude Code**, sobre el repo `museo-digital`.

| Paso | Qué se hace | Listo cuando |
|---|---|---|
| 8.1 | Estructura del sitio y tokens de `DESIGN.md` como variables CSS | La página de prueba muestra colores y tipos correctos |
| 8.2 | Componentes uno por uno, comparados con Figma | Coinciden y cumplen 48 px / 13 px |
| 8.3 | Pantallas, navegación y avance con `localStorage` + "Reiniciar recorrido" | Se recorre en cualquier orden |
| 8.4 | Audio con `.vtt`, momento inmersivo en el mismo sitio | A1–A3 y D1–D3 en código |
| 8.5 | Verificación: axe, Lighthouse móvil, TalkBack/VoiceOver, zoom 200 %, reducir movimiento, 4G | Sin errores graves y < 15 MB |
| 8.6 | Publicar en GitHub Pages, actualizar el QR y repetir la prueba corta en los mismos teléfonos | El QR abre la versión en código |
| 8.7 | Propuestas al equipo para lo que solo existe en el montaje (`DESIGN.md` §17) | Cada una con qué resuelve, qué necesita y quién la hace |

---

## Riesgos

| Riesgo | Qué hacemos |
|---|---|
| La docente cambia el contenido o pide unificar en el Figma de clase | Las etapas 1–3 se diseñan para cambiar el texto sin rehacer pantallas; la unificación espera su instrucción |
| La pista de YouTube tiene derechos de autor | Se usa solo como referencia temporal con crédito; se reemplaza antes de publicar si la docente o la entidad lo piden |
| La propuesta llega a la Alcaldía o a una entidad del Estado | El audio y los assets definitivos deben tener licencia o permiso escrito; la muestra con IA solo si se declara |
| El video no se sube a Figma | Mover el archivo a un proyecto de equipo; si falla, el audio va solo en la página web |
| La barra D2 no funciona en el teléfono | Se ajusta en la etapa 3 antes de construir las 40 pantallas |
| Falta un iPhone para probar | Coordinar con el compañero antes de la etapa 5 |
