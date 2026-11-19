# IMAGENES-IA.md — Cómo generar las imágenes del museo con IA sin que se deformen y con unidad

> Museo del Festival de la Leyenda Vallenata · Diseño de Interfaces Físicas, Areandina 2026-2.
> **Documento provisional.** Sirve para producir imágenes de la Sala Núcleo y dar sustento a las demás salas mientras la docente revisa. Cumple `CRITERIOS.md` (F1–F3, E1) y `DESIGN.md`.
> Investigación del 19 de noviembre de 2026 (Figma de la profesora en solo lectura, documentación oficial de Google y fuentes recientes, ver al final).

---

## 1. Qué imágenes hay en el Figma de la profesora

Se revisaron las cuatro páginas del archivo. Hay **19 imágenes distintas**, usadas en 86 lugares.

| Grupo | Cuántas | Tamaño original | Dónde se usan | Qué son |
|---|---|---|---|---|
| **Escenarios de estación** | 4 | **1536 × 2752** (9:16) | Fondo de cada estación (Resumen, Historia, Galería, Contraída, Audio, Visor) | Render realista de una sala de museo: pared gris clara, franja gris horizontal, piso pulido con reflejo, luz cenital, **pedestal blanco centrado** con placa sin texto y **un solo objeto de color** encima |
| **Pasillo** | 1 | **1536 × 2752** (9:16) | Pasillo y Mapa de Salas | Galería en perspectiva central, **toda en escala de grises**, con pedestales, esculturas y cuadros |
| **Ilustración de portada** | 1 | 378 × 672 | Portada | **Ilustración plana** (no render): acordeón, caja y guacharaca en rojo y dorado sobre crema, con notas musicales |
| **Fotos de galería** | 12 | Mixtos (640 × 640, 960 × 720, 1200 × 675, 540 × 960…) | Tarjetas de galería y "Vista 2D" | Fotografías reales tomadas de la web: personas, Parque de la Leyenda, Plaza Alfonso López, río Guatapurí. **Sin licencia ni crédito anotados en el archivo** |
| **Boceto de escritorio** | 1 | 941 × 1672 | Exploración inicial | Galería genérica en gris (busto clásico, esculturas abstractas) |

**Objeto de cada escenario:**
- E1 "Tríada instrumental": acordeón rojo, caja y guacharaca.
- E2 "El sentido del folclor": figura de un hombre sentado con una caja bajo un palo de mango.
- E3 "Consuelo Araújo Noguera": **busto de una mujer** con flor en el pelo y blusa de encaje.
- E4 "Valledupar y el Festival": cuadro enmarcado de un pueblo con iglesia, montañas y río.

### 1.1 De qué herramienta salieron (inferencia, por confirmar)

Las cinco imágenes de fondo miden **1536 × 2752**. Ese tamaño coincide exactamente con la salida **9:16 en resolución 2K** de los modelos de imagen de Gemini ("Nano Banana"), según la tabla de proporciones de la documentación oficial. Las cuatro estaciones comparten la misma sala, cámara, pedestal y luz: todo indica que se generó **una escena base** y después se cambió solo el objeto.

**Cómo confirmarlo:** sube uno de esos fondos a la app de Gemini y pregunta "¿esta imagen fue generada con IA?". Gemini revisa la marca de agua invisible SynthID. Si la imagen se exportó desde Figma puede que la detección falle, así que lo ideal es pedirle el archivo original a la docente.

### 1.2 Lo que funciona y lo que no conviene copiar

**Funciona y se adopta:**
- Una sola sala y una sola cámara para todas las estaciones: da unidad inmediata.
- Fondo neutro y gris, con el color reservado al objeto y a la interfaz.
- Pasillo en escala de grises: no compite con los botones dorados ni rojos.
- El objeto queda en la mitad superior, por encima de la tarjeta.

**No conviene copiar:**
- **Busto de E3:** es el rostro de una persona real (Consuelo Araújo) **generado con IA**. Choca con F3 y con el Corte 1, que pide su **retrato con licencia**. Ver §7.
- **Fotos de galería sin licencia:** varias muestran personas reales. Choca con E1.
- **Cuadro de E4:** su estilo de pintura colorida no coincide con el render realista del resto.
- **Dos lenguajes mezclados sin regla:** render realista en las estaciones e ilustración plana en la portada. Se puede mantener, pero con regla escrita (§3).

---

## 2. Qué hacer antes de generar (preparación)

Sin esta preparación cada imagen sale distinta. La unidad se decide antes del primer prompt.

1. **Elegir una herramienta y un modelo, y no cambiarlos.**
   - Recomendado: Gemini (app o Google AI Studio) con **Nano Banana Pro** (Gemini 3 Pro Image), que acepta hasta 14 imágenes de referencia, de ellas hasta 3 como **referencia de estilo**.
   - Alternativa más rápida: **Nano Banana 2.1**.
   - Anotar el nombre exacto del modelo en la bitácora (paso 6).
2. **Fijar formato y tamaño:** 9:16, 2K (1536 × 2752) para escenarios; 1:1 o 4:3 para objetos sueltos; exportar a ~750 px de ancho y < 300 KB (C5).
3. **Crear la escena base y guardarla.** Primero la sala vacía con el pedestal (prompt P0, §4). Esa imagen se usa como **referencia de estilo y de composición** en todas las estaciones. Es lo que más unifica.
4. **Reunir referencias reales de cada objeto:** fotos propias o con licencia de un acordeón de botones, una caja, una guacharaca, una pollera, un pilón. Sirven para que la IA no invente piezas. Solo se suben imágenes sobre las que el equipo tenga derechos; la política de Google pide tenerlos.
5. **Escribir la lista de lo que NO se genera** (§7): personas reales, documentos, fotos "de archivo", logos y texto.
6. **Abrir una bitácora** (`docs/bitacora-ia.md`). Por imagen se anota: fecha, modelo, prompt, referencias usadas, número de intentos, correcciones y quién la aprobó. Es la base de la declaración de IA (F1).
7. **Activar la marca visible o anotar la invisible.** Gemini mantiene SynthID y metadatos C2PA aunque se quite la marca visible. No se borran ni se ocultan.

---

## 3. Biblia de estilo (lo que toda imagen debe cumplir)

### Familia A · Escenario de estación (render realista)
| Parámetro | Valor |
|---|---|
| Formato | 9:16 vertical, 2K |
| Cámara | Frontal, a la altura del pedestal, perspectiva recta (sin inclinación), lente normal |
| Sala | Pared gris muy clara, franja gris horizontal a media altura, piso gris pulido con reflejo suave |
| Luz | Foco cenital suave sobre el objeto, sombras cortas, sin luces de color |
| Pedestal | Blanco, centrado, placa blanca sin texto |
| Objeto | Uno solo, con color saturado; acentos que remiten a la paleta (rojo `#8A1F2B`, dorado `#E0A92E`, verde `#3F5E3A`) |
| Zona segura | El objeto entre el 15 % y el 50 % del alto. Debajo del 55 % va la tarjeta y arriba del 12 % el encabezado: nada importante ahí |
| Prohibido | Texto, logos, personas, manos |

### Familia B · Pasillo y Plaza (galería en gris)
| Parámetro | Valor |
|---|---|
| Formato | 9:16, 2K |
| Composición | Pasillo con perspectiva central, rieles de luz en el techo, pedestales a ambos lados |
| Color | **Escala de grises total.** El color lo pone la interfaz (puntos dorados, botones) |
| Contenido | Siluetas de las piezas de la sala, sin rostros reconocibles |

### Familia C · Ilustración plana (portadas de sala e íconos grandes)
| Parámetro | Valor |
|---|---|
| Estilo | Vector plano, formas redondeadas, sin degradados ni sombras realistas |
| Paleta | Solo los colores del `DESIGN.md` sobre crema `#F4EAD6` |
| Uso | Portada del museo y portada de cada sala. **Nunca** dentro de un escenario realista |

**Regla de unidad:** cada imagen pertenece a una sola familia. No se mezclan dentro del mismo frame.

---

## 4. Plantillas de prompt

Escríbelas en español o en inglés; Gemini rinde bien en `es-MX`. Sigue la estructura de la guía oficial: sujeto, composición, acción, lugar, estilo, cámara y luz. Lo que no se quiere se describe **en positivo** ("placa lisa sin texto" en vez de "sin texto").

**P0 · Escena base (una sola vez)**
```
Render fotorrealista, vertical 9:16, de una sala de museo minimalista y vacía. Pared gris muy clara con una franja gris horizontal a media altura, piso gris pulido con un reflejo suave. En el centro, un pedestal blanco rectangular con una placa blanca lisa. Un foco cenital suave ilumina el pedestal desde arriba; sombras cortas y limpias. Cámara frontal a la altura del pedestal, perspectiva recta, lente normal. La parte superior del pedestal queda a un tercio del alto de la imagen. Sala completamente vacía y silenciosa.
```

**P1 · Objeto sobre el pedestal (por estación)**
Adjunta: [Imagen A] la escena base · [Imagen B] foto real del objeto.
```
Usa la Imagen A como escena exacta: misma sala, misma cámara, misma luz y mismo pedestal, sin cambiar nada más. Coloca sobre el pedestal el objeto de la Imagen B: [descripción precisa del objeto, materiales y colores]. Respeta la forma, las proporciones y el número de piezas de la Imagen B. El objeto ocupa el ancho del pedestal y queda centrado. Placa blanca lisa.
```

**P2 · Pasillo de una sala**
Adjunta: [Imagen A] el pasillo de la Sala Núcleo como referencia de estilo.
```
Con el estilo de la Imagen A: galería de museo en perspectiva central, vertical 9:16, toda en escala de grises. A los lados, pedestales con siluetas de [piezas de la sala]. Rieles de luz en el techo, piso pulido. Sin personas.
```

**P3 · Portada ilustrada de sala**
```
Ilustración vectorial plana, vertical, fondo crema #F4EAD6. [Objetos de la sala] con formas redondeadas en rojo #8A1F2B, dorado #E0A92E y café #241611, con pequeñas notas musicales. Composición centrada, bordes limpios, sin degradados.
```

**P4 · Corrección puntual (en la misma conversación)**
```
Mantén todo exactamente igual y corrige solo [la zona]: [qué está mal] → [cómo debe quedar], según la Imagen B.
```

---

## 5. Cómo evitar deformaciones

1. **No pedir lo que la IA hace mal:** manos, personas en acción, texto pequeño o letreros. Si hace falta texto, va en la interfaz, no en la imagen. Google recomienda generar primero el texto y después la imagen, y aun así el texto pequeño puede fallar.
2. **Un objeto por imagen.** Las mezclas complejas producen artefactos, según las propias limitaciones que reconoce Google.
3. **Siempre con referencia real del objeto** (P1). Así el modelo copia la forma en lugar de inventarla.
4. **Revisión al 100 % contra la foto de referencia.** En cada instrumento, comprobar:
   - **Acordeón:** botones, no teclado de piano; el fuelle con pliegues regulares; las correas bien puestas.
   - **Caja:** un solo parche y el sistema de tensión completo.
   - **Guacharaca:** el tubo con estrías y su trinche.
   - **Pollera y pilón:** que el pilón tenga su mazo y la pollera sus vuelos.
5. **Corregir sin rehacer.** Si falla una zona, usar P4 en la misma conversación. Si fallan varias, volver a generar desde P1.
6. **Probar la miniatura:** ver la imagen al tamaño real del teléfono, a 375 px de ancho, y con la tarjeta encima en Figma.
7. **Hoja de contacto:** poner todas las estaciones juntas en Figma. Si una resalta (otra luz, otro ángulo u otro gris), se repite.

---

## 6. Control de calidad antes de usar una imagen

| Revisión | Pasa si… |
|---|---|
| Familia | Cumple una sola familia (§3) |
| Composición | Objeto dentro de la zona segura; no queda tapado por la tarjeta ni por el encabezado |
| Fidelidad | Coincide con la foto real de referencia (§5) |
| Unidad | En la hoja de contacto no se distingue de las demás por luz, ángulo o color |
| Peso | ~750 px de ancho y < 300 KB (C5) |
| Descripción | Tiene texto alternativo escrito (B7) |
| Registro | Está en la bitácora con modelo, prompt y referencias (F1) |
| Etiqueta | Lleva la leyenda de imagen generada con IA (§7) |

---

## 7. Lo que no se genera con IA y cómo se declara

| No se genera | Por qué | Qué se usa en su lugar |
|---|---|---|
| **Rostros de personas reales** (Consuelo Araújo, Alejo Durán, reyes, juglares) | F3 y respeto a las personas y sus familias; el Corte 1 pide un **retrato con licencia** | Foto real con licencia o autorización. Si no hay, un **objeto simbólico** (por ejemplo, una corona o un pañuelo) |
| **Fotos "documentales"** del Festival, la tarima o el desfile | Se presentarían como hechos reales (F3) | Fotos reales con licencia, o el 360 real |
| **Documentos y certificados** (UNESCO, actas) | Serían documentos falsos | El documento real enlazado o citado |
| **Logos y marcas** (Fundación, Hohner, UNESCO) | Derechos de terceros | Nada, o el logo con autorización |

**Leyenda en la interfaz** (debajo de la imagen o en el texto alternativo):
> *Imagen ilustrativa generada con IA (Gemini). No es una fotografía.*

**Declaración final (F1):** herramienta, para qué se usó, cuántas imágenes y qué se validó a mano, con la bitácora como respaldo. Es el mismo formato de la "declaración de IA modelo" del Corte 2.

---

## 8. Sustento provisional para las demás salas

En el Figma solo existe la Sala Núcleo. El Corte 1 ya definió **seis salas ampliables** (y una ranura libre), cada una con su tema y su idea interactiva. Esta tabla propone qué imágenes necesitaría cada sala, usando las mismas tres familias, para que al construirlas se vean del mismo museo. **Es provisional:** se confirma en clase.

| Sala (Corte 1) | Qué cuenta (Corte 1) | Escenario (Familia A): objeto en pedestal | Pasillo (B) | Portada (C) | Lo que NO se genera |
|---|---|---|---|---|---|
| **S1 · Los cuatro aires** | Una parada por aire: cómo suena y cómo se reconoce | Cuatro esculturas abstractas de onda sonora, una por aire (paseo, merengue, son, puya), en los colores de la paleta | Pasillo con cuatro pedestales | Las cuatro ondas | Partituras falsas presentadas como reales |
| **S2 · Los instrumentos** | Partes, cómo se tocan y afinaciones | Cada instrumento solo y en vista despiezada (fuelle, parche, trinche), con foto real de referencia | Pasillo con los tres pedestales | El trío (como la portada actual) | Marcas de fabricante |
| **S3 · Juglares y Francisco el Hombre** | Tradición oral y la leyenda de Francisco el Hombre | Diorama de un **juglar anónimo** con acordeón, de noche, en el camino (la leyenda) | Pasillo en penumbra | Acordeón y camino bajo la luna | Rostros de juglares reales |
| **S4 · Reyes Vallenatos y concursos** | Reyes desde Alejo Durán, piquería, canción inédita, mujeres en el acordeón | **Coronas y trofeos** en pedestal (la sala plantea una "galería de coronas") | Pasillo de vitrinas con coronas | Una corona con acordeón | Rostros de los reyes; sus fotos van con licencia |
| **S5 · Valledupar y territorio** | Plaza Alfonso López, Parque de la Leyenda, lugares del Festival | Maqueta ilustrativa de la plaza, rotulada como recreación | Pasillo con maquetas | Silueta de la Sierra y el río | El 360 de la plaza: debe ser **foto real** |
| **S6 · UNESCO y salvaguardia** | Patrimonio vivo, la alerta de 2015 y qué puede hacer cada quien | Objeto simbólico: una red o semilla con cuatro nodos (música, territorio, comunidad, tradición), como la interacción de la sala | Pasillo con hilos que se unen | La red de cuatro nodos | El certificado o el documento de la UNESCO |
| **S7 · Ranura libre** (candidatas: Piloneras y danzas, Leyendas del Caribe, Mitos como la Sirena y la Llorona) | Entra cuando cumple la lista del Corte 1 | Según el tema | Igual | Igual | Igual que arriba |

**Lista del Corte 1 para que una sala entre:** nombre y código; ícono probado a 16 px; hito y motivo sonoro de unos 2 segundos; portada; paradas con el ciclo Entra · Descubre · Interactúa · Aprende · Desbloquea · Continúa; piezas con fuente, licencia, crédito y texto alternativo; emoción; momento inmersivo con su alternativa; coleccionable del Pasaporte, y revisión del checklist de accesibilidad. Las imágenes de esta guía cubren portada, escenarios y pasillo; lo demás sigue en el `PLAN.md`.

---

## 9. Pendientes

1. **Confirmar la herramienta de la docente** con SynthID (§1.1) y, si es posible, pedirle la escena base original.
2. **Decidir la estación 3:** se mantiene el busto de IA de la profesora o se reemplaza por un retrato con licencia u objeto simbólico (recomendado). 🔁
3. **Decidir el cuadro de la estación 4:** se adapta al render realista o se reemplaza por un objeto (pilón y pollera, acorde con Piloneras). 🔁
4. **Conseguir las fotos de referencia** de los instrumentos y del vestuario (propias o con licencia).
5. **Crear la bitácora de IA** (`docs/bitacora-ia.md`) antes de la primera imagen.

---

## Fuentes

- Figma de la profesora, SYSTEM-DESING (lectura directa, 19 nov. 2026).
- Trabajo común del Corte 1 (salas ampliables y ranura libre, pág. 60) y del Corte 2 (declaración de IA, valla excluida).
- Google AI for Developers — Nano Banana image generation (tabla de proporciones, referencias, buenas prácticas y limitaciones): https://ai.google.dev/gemini-api/docs/image-generation
- Google (20 nov. 2025) — 7 tips to get the most out of Nano Banana Pro: https://blog.google/products-and-platforms/products/gemini/prompting-tips-nano-banana-pro/
- Google (2025) — How we're bringing AI image verification to the Gemini app (SynthID y C2PA): https://blog.google/technology/ai/ai-image-verification-gemini-app/
- Google Ayuda — Verify AI-generated images, videos, and audio: https://support.google.com/gemini/answer/16722517
- PCWorld (14 ago. 2026) — Gemini permite quitar la marca visible; SynthID y metadatos se mantienen: https://www.pcworld.com/article/3213409
- Runway — Why do AI images look weird (manos, objetos, texto): https://runway.com/resources/why-do-ai-images-look-weird

**Uso de IA (F1):** esta guía se redactó con Claude a partir de la lectura del Figma y de las fuentes listadas (búsqueda con Apify y buscador web).
