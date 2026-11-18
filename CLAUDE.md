# CLAUDE.md — museo-digital

Museo Digital Interactivo del **Festival de la Leyenda Vallenata** · Sala Núcleo.
Proyecto académico de Diseño de Interfaces Físicas (Areandina, Valledupar, 2026-2). Responsable: **Kevin Muegues R.** (diseñador gráfico; UI, sistema de diseño y accesibilidad del equipo).

Responde siempre en **español**, con lenguaje claro y sin jerga innecesaria.

## Lee antes de hacer cualquier cosa

1. `CRITERIOS.md` — reglas que no se negocian (sonido, accesibilidad, móvil, inmersivo, licencias, IA, proceso).
2. `DESIGN.md` — lenguaje visual extraído del Figma de la profesora, adaptado a móvil (D1–D3 cerradas) y ajustado al canon del Corte 2 (§18). **Cuando difieren, manda el Corte 2.**
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
- **Primero Figma, después código** (G3). El código empieza solo cuando Kevin congela la vista previa.
- **Nada suena solo; el sonido nunca va solo** (A1, A2).
- **Móvil primero:** frames 375 × 812, área táctil 48 × 48, texto mínimo 13 px, relato 16 px, críticos dentro de ~640 px (D1).
- **Todo asset con licencia y crédito**; lo provisional va marcado como *temporal* (E1). Toda ayuda de IA se declara (F1).
- **Commits:** mensajes en español, un tema por commit. No subas secretos.

## Estado actual (18 nov. 2026)

- ✅ Etapa 0: `DESIGN.md`, `CRITERIOS.md`, `PLAN.md`, este `CLAUDE.md`.
- ⏭️ Siguiente: **Etapa 1** — guion de interacción y contenido propuesto de las 4 estaciones.
- **Provisionales (cambiarán tras la revisión de la docente):**
  - Contenido: las 4 estaciones del Corte 1 (Qué es y dónde nace · 1968 · Consuelo Araújo · Piloneras); el texto lo redacta el equipo.
  - Audio del aire: pista de referencia de YouTube con crédito, marcada como temporal. Riesgo aceptado por Kevin; se revisa antes de publicar.
  - Momento inmersivo: RA con el modelo "Antique Accordion" de Canicule (Sketchfab, CC Attribution), en `<model-viewer>`, en la estación 1. Acordeón genérico, se declara así.

## Herramientas

- **Figma:** conector Figma MCP. Carga las skills `figma-use` (y `figma-generate-library` para variables y componentes, `figma-generate-design` para pantallas) antes de cada `use_figma`. Llama `create_session` primero. Revisa con `whoami` en qué cuenta y plan estás antes de crear archivos.
- **Assets:** `ffmpeg` para el video del aire (H.264, ≤ 10 MB, subtítulos incrustados); imágenes a ~750 px y < 300 KB.
- **Web inmersiva y versión final:** HTML, CSS y JS sin frameworks pesados; Pannellum (360) o `<model-viewer>` (RA, GLB + USDZ); publicación en **GitHub Pages** desde este repo.
- **Verificación en código:** axe, Lighthouse móvil, TalkBack/VoiceOver, zoom 200 %, `prefers-reduced-motion`, prueba con 4G.
- Para UI en código usa las skills de `ui-consistency` (finding-patterns → planning → implementing → verifying).

## Estructura prevista del repo

```
museo-digital/
├── CLAUDE.md · DESIGN.md · CRITERIOS.md · PLAN.md
├── docs/        # guion, tabla de assets, kit de pruebas, hallazgos, documento final
├── assets/      # audio, video, imágenes, modelos (con su licencia en docs/assets.md)
└── web/         # página inmersiva y, en la Etapa 8, el sitio completo
```

## Referencias

- Figma de la profesora: https://www.figma.com/design/7PTatcnprqstUq7NNzXgR3/SYSTEM-DESING
- PDFs del trabajo común (Corte 1 y Corte 2): en el Proyecto "Museo navegable" de claude.ai. Si los necesitas, pídeselos a Kevin.
