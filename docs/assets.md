# Tabla de assets · Sala Núcleo

> Regla E1: ningún asset sin licencia y crédito. Lo provisional se marca como **temporal**.
> Esta tabla se completa en la Etapa 2; por ahora registra lo que ya se usa en el Figma del prototipo.

| Asset | Dónde se usa | Fuente | Licencia | Crédito | Enlace | Estado |
|---|---|---|---|---|---|---|
| 18 íconos (Volver, Siguiente, Mapa, Escuchar, Pausa, Plaza, Audio, Ubicación, Silencio, Salas, Información, Toque, Toque AR, Buscar, 4 flechas) y la estrella del botón | Figma del prototipo · página "2 · Componentes" | Figma de la docente (SYSTEM-DESING), material de clase | Uso académico dentro del curso; **por confirmar con la docente** si se puede publicar | Diseño original de la docente del curso; migrados y adaptados por el equipo (dorado cambiado a rojo en flechas, pausa y ondas para cumplir B1) | https://www.figma.com/design/7PTatcnprqstUq7NNzXgR3/SYSTEM-DESING | En uso |
| 13 componentes "Interactivo / *" (reproducir, pausa, contraer, desplegar, estación ‹ ›, regresar, punto de carrusel, parlantes, punto dorado, píldoras 3D/RA y 360°) | Figma del prototipo | Figma de la docente (SYSTEM-DESING) | Igual que la fila anterior | Diseño original de la docente; llevados a 48 px con estados Normal · Presionado · Foco por el equipo | https://www.figma.com/design/7PTatcnprqstUq7NNzXgR3/SYSTEM-DESING | En uso |
| 18 imágenes: ilustración del trío (recortada a los instrumentos), fondo del pasillo de la Sala Núcleo, 4 fondos de escenario de estación y 12 fotos de galería (acordeón, caja y guacharaca por estación) | Figma del prototipo · "3 · Pantallas": Portada, 02 · Sala Núcleo, estación 1 (escenario y galería); el resto en "Banco de imágenes (temporal)" | Figma de la docente (SYSTEM-DESING), página "2.3 Prototipo navegable". Origen de cada foto **desconocido** | **Sin licencia confirmada**: hay que preguntar a la docente de dónde salen las fotos y si se pueden publicar | Por ahora, crédito a la docente del curso (origen por confirmar: otro grupo o IA) | https://www.figma.com/design/7PTatcnprqstUq7NNzXgR3/SYSTEM-DESING | **Temporal** |
| Web app: 20 imágenes (ilustración del trío y medallón de la portada, pasillo, 4 escenarios de estación, 12 fotos de galería y vista 2D) y 27 íconos SVG (menú, flechas, reproducir, pausa, parlantes, puntos, visor) | `web/assets/img` y `web/assets/svg` | Figma de la docente (SYSTEM-DESING), página "2.3 Prototipo navegable". Fotos: origen por confirmar (otro grupo o IA) | **Sin licencia confirmada** | Por ahora, crédito a la docente del curso | https://www.figma.com/design/7PTatcnprqstUq7NNzXgR3/SYSTEM-DESING | **Temporal** |
| Tipografías Fraunces y Work Sans | Web app (cargadas desde Google Fonts) | Google Fonts | SIL Open Font License 1.1 | Fraunces, de Undercase Type; Work Sans, de Wei Huang | https://fonts.google.com/specimen/Fraunces · https://fonts.google.com/specimen/Work+Sans | En uso |

> Los íconos que propusimos en el Figma propio (Material Icons: Pasaporte, Perfil, Bloqueada, Completada, Disponible, Error, Reintentar) se retiraron el 24 nov. 2026. El **Pasaporte** se mantiene como función y se hará en código.

## Ayuda de IA (F1)

- **Claude Code (Anthropic)** migró y adaptó en Figma los íconos y componentes de las filas anteriores. Kevin revisó el resultado a mano.
- **Claude Code (Anthropic)** copió las 18 imágenes del Figma de la docente al prototipo (solo lectura del original), recortó la ilustración del trío y las colocó en las pantallas.
- **Claude Code (Anthropic)** programó la web app (`web/`) a partir del Figma de la docente: leyó sus pantallas, textos y conexiones (solo lectura), descargó y optimizó las imágenes y escribió el HTML, CSS y JS.
