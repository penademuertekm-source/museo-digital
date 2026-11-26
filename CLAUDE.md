# CLAUDE.md — museo-digital

Museo Digital Interactivo del **Festival de la Leyenda Vallenata** · Sala Núcleo.
Proyecto académico de Diseño de Interfaces Físicas (Areandina, Valledupar, 2026-2). Responsable: **Kevin Muegues R.** (diseñador gráfico; UI, sistema de diseño y accesibilidad del equipo).

Responde siempre en **español**, con lenguaje claro y sin jerga innecesaria.

## Lee antes de hacer cualquier cosa

1. `CRITERIOS.md` — reglas que no se negocian (sonido, accesibilidad, móvil, inmersivo, licencias, IA, proceso).
2. `DESIGN.md` — lenguaje visual extraído del Figma de la profesora, adaptado a móvil (D1–D3 cerradas) y ajustado al canon del Corte 2 (§18). **Desde el 24 nov. 2026 manda el prototipo de la docente tal cual** (página `2.3 Prototipo navegable`); lo del Corte 2 queda en espera hasta que el equipo lo confirme.
3. `PLAN.md` — etapas, responsables y condición de "listo cuando". Trabaja solo en la etapa activa.

Si una instrucción choca con estos documentos, **detente y pregunta**. Si dos criterios chocan, usa el orden de `CRITERIOS.md` ("Si dos criterios chocan").

## Cómo trabajar con Kevin

- **Una etapa a la vez:** entrega, para y espera revisión antes de seguir (G2).
- **Antes de ejecutar, revisa el encargo** en busca de contradicciones internas o con los documentos y pregúntalas.
- **Pregunta cuando haya dudas** en vez de asumir.
- Fuentes académicas de **máximo 5 años** de antigüedad.
- Al terminar una etapa: resume qué se hizo en 3–5 líneas, qué quedó pendiente y qué necesitas de Kevin.

## Reglas duras

- **Figma de la profesora = solo lectura** (`7PTatcnprqstUq7NNzXgR3`, SYSTEM-DESING). Nunca escribas en él (G1). No unifiques nada con el Figma de clase hasta que Kevin lo ordene.
- **Prototipo en un Figma nuevo**, dentro de un **proyecto de equipo** (en Borradores no se suben videos).
- **No mezclar** con el sistema de diseño anterior del estudiante (descartado).
- **Primero Figma, después código** (G3). La vista previa congelada es el Figma de la docente: la web app lo copia **tal cual** (pantallas, textos, transiciones y conexiones de sus flows). Las correcciones se hacen solo después de la prueba crítica y cuando Kevin lo diga.
- **Nada suena solo; el sonido nunca va solo** (A1, A2).
- **Móvil primero:** frames 375 × 812, área táctil 48 × 48, texto mínimo 13 px, relato 16 px, críticos dentro de ~640 px (D1).
- **Todo asset con licencia y crédito**; lo provisional va marcado como *temporal* (E1). Toda ayuda de IA se declara (F1).
- **Commits:** mensajes en español, un tema por commit. No subas secretos.

## Estado actual (24 nov. 2026)

- **Nuevo rol: Equipo de Apoyo.** Tras el cambio de grupos, el diseño final es el Figma de la docente. Nos toca: 1) pasarlo a una web app en código, 2) corregir sus errores y 3) integrar los elementos 3D e interactivos que entregue el equipo. **Entrega: jueves 26 nov. 2026.**
- ✅ Etapas 0 y 1 (documentos y guion). El Figma propio (`TufL7J0OTmhs7cytKHZuPP`) queda solo como referencia.
- ⏳ Web app en `web/`: las 40 pantallas del prototipo de la docente con sus conexiones y transiciones.
- **Visor 3D y RA activos (26 nov. 2026, por orden de Kevin):** `<model-viewer>` en el visor de la Est. 1 (trío vallenato) y la Est. 3 (busto de Consuelo). Las Est. 2 y 4 siguen con su lámina del Figma hasta que llegue su modelo o foto 360°. Los textos del panel de la Est. 3 (trofeo vs. busto) esperan la decisión del grupo.
- **En espera hasta nuevo aviso:** la Plaza y el contador del Corte 2.
- **Se mantiene para hacer en código:** el Pasaporte (registro de quién entró y qué visitó).
- **Provisionales:**
  - Audio: sigue la pista de referencia de YouTube hasta que lleguen los audios definitivos; lo más probable es que pasen de enlace embebido a archivos propios en el sitio.
  - Fotos e ilustraciones: salen del Figma de la docente (origen por confirmar: otro grupo o IA); por ahora el crédito es para la docente.
  - Modelos 3D: los entrega el equipo, en **GLB** (ver "Herramientas").

## Herramientas

- **Figma:** conector Figma MCP. Carga las skills `figma-use` (y `figma-generate-library` para variables y componentes, `figma-generate-design` para pantallas) antes de cada `use_figma`. Llama `create_session` primero. Revisa con `whoami` en qué cuenta y plan estás antes de crear archivos.
- **Assets:** `ffmpeg` para el video del aire (H.264, ≤ 10 MB, subtítulos incrustados); imágenes a ~750 px y < 300 KB.
- **Web app:** HTML, CSS y JS sin frameworks (`web/`); cada pantalla es un lienzo de 375 × 667 como en Figma, escalado al teléfono; rutas con `#/` y transiciones con View Transitions. Pannellum (360) o `<model-viewer>` (3D/RA) cuando lleguen los assets. Modelos en **GLB** (glTF 2.0; el FBX no lo leen los navegadores: se convierte en Blender), ≤ 10 MB, texturas ≤ 2048 px; fotos 360 equirrectangulares 2:1.
- **Publicación:** **Firebase Hosting** (`*.web.app`) con la cuenta institucional de Google de Kevin (la crea él). Prueba local: `npx http-server museo-digital/web -p 5173`.
- **Verificación en código:** axe, Lighthouse móvil, TalkBack/VoiceOver, zoom 200 %, `prefers-reduced-motion`, prueba con 4G.
- Para UI en código usa las skills de `ui-consistency` (finding-patterns → planning → implementing → verifying).

## Estructura prevista del repo

```
museo-digital/
├── CLAUDE.md · DESIGN.md · CRITERIOS.md · PLAN.md
├── docs/        # guion, tabla de assets, kit de pruebas, hallazgos, documento final
├── assets/      # audio, video, imágenes, modelos (con su licencia en docs/assets.md)
└── web/         # web app del prototipo de la docente
    ├── index.html
    ├── css/museo.css
    ├── js/datos.js (contenido de las 4 estaciones) · pantallas.js · estaciones.js · app.js (rutas, transiciones, audio)
    └── assets/img · assets/svg
```

## Referencias

- Figma de la profesora: https://www.figma.com/design/7PTatcnprqstUq7NNzXgR3/SYSTEM-DESING
- PDFs del trabajo común (Corte 1 y Corte 2): en el Proyecto "Museo navegable" de claude.ai. Si los necesitas, pídeselos a Kevin.
