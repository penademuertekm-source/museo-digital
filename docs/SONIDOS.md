# Lista de sonidos · Sala Núcleo

> Qué suena en cada pantalla del prototipo de la docente (Figma `2.3 Prototipo navegable`, leído el 24 nov. 2026) y de dónde puede salir cada sonido.
> Reglas que mandan: A1 (nada suena solo), A2 (todo audio con subtítulos), A3 (un solo audio a la vez, siempre se puede pausar), E1 (licencia y crédito; lo provisional va marcado como **temporal**) y F1 (toda IA se declara).

## Decisión final (26 nov. 2026): grabaciones reales

La música con IA se descartó (no convenció a Kevin). El 25 nov. la docente autorizó usar canciones reales con derechos de autor **dentro del curso**, siempre con créditos. Para presentarlo fuera del curso (Alcaldía) hay que pedir licencia a los titulares. Créditos completos en `docs/assets.md`.

| ID | Archivo (`web/assets/audio/`) | Qué suena | Duración |
|---|---|---|---|
| E1-A | `e1-paseo-cachucha.mp3` | Paseo «La cachucha bacana», Alejo Durán: acordeón, caja y guacharaca | 35 s |
| E1-B | `e1-solo-acordeon.mp3` | Acordeón de Alejo Durán en «Pedazo de acordeón», Rey de Reyes 1987 | 28 s |
| E2-A | `e2-parranda-el-mejoral.mp3` | Parranda: Alejo Durán toca y canta el paseo «El mejoral» (vuelve el 26 nov.; la Carta Vallenata se retira) | 38 s |
| E2-B | `e2-paseo-039.mp3` | Paseo «039», Alejo Durán | 35 s |
| E3-A | `e3-consuelo.mp3` | Voz real de Consuelo Araújo (discurso de clausura como ministra, iVoox), dos frases unidas con una pausa | 21 s |
| E3-B | `e3-puya-final-2003.mp3` | Puya «La bizca», Ciro Meza Reales en la final de 2003 (tarima Francisco el Hombre) | 35 s |
| E4-A | `e4-plaza-rio.mp3` | Ambiente del Festival en la Plaza Alfonso López, lejano, + río Guatapurí de fondo | 34 s |
| E4-B | `e4-rio-guatapuri.mp3` | Paseo «Frente al río Guatapurí» (Roque Gullo y Julián Peña) con río suave de fondo; la voz se entiende completa | 39 s |

- Todos a −16 LUFS, MP3 128 kbps, menos de 750 KB cada uno (4,2 MB en total).
- **Subtítulos** (A2): van en `web/js/datos.js` (`subs`, pares segundo–texto) y cambian mientras suena el audio. En la música describen lo que se oye, sin copiar letras; en E3-A transcriben la voz de Consuelo. Reemplazan las citas del Figma de E2 y E3, que no tenían fuente.
- **Revisión contra el Figma (26 nov.):** E1-A, E3-B, E4-A y E4-B se cambiaron para acercarse a su texto. E4-B ya tiene cantos de vaquería reales; la brisa de la Sierra no se encontró grabada. E1-B y E3-A se dejan como estaban (decisión de Kevin).
- S0 (pasillo) sigue sin sonido.

> Lo que sigue es el historial de la búsqueda (24–25 nov.). La tabla «Los 9 sonidos» y el «Plan con IA declarada» ya no mandan.

## Cómo elegimos la fuente

En este orden (CRITERIOS.md, nota de audio):

1. **Grabación propia en Valledupar**, con permiso firmado de quien toca o habla. Es lo más sólido si la propuesta llega a la Alcaldía.
2. **Grabación con licencia libre** que permita uso público: CC0 o CC BY (Freesound, Wikimedia Commons, Internet Archive). **Nada con NC** (no comercial) ni ND (sin cambios): no podríamos recortarla ni presentarla a una entidad sin dudas.
3. **Archivo oficial con permiso** (Señal Memoria / RTVC, Fundación Festival de la Leyenda Vallenata, Biblioteca Nacional). Sin el permiso por escrito, solo se **enlaza**, no se descarga (Corte 1).
4. **IA declarada (F1)**, solo para música instrumental o ambientes. **Nunca** para la voz de una persona real ni para hacer pasar algo por grabación de archivo (F3 aplicado al sonido).

Formato de entrega: MP3 o AAC de 96–128 kbps, mono si no hay ambiente espacial, volumen parejo (−16 LUFS para escuchar en el teléfono), máx. ~1 MB por audio para no pasar el presupuesto de 15 MB (DESIGN.md).

## Los 9 sonidos

| ID | Dónde suena | Qué pide el Figma | Duración propuesta | Fuente recomendada | Plan B | Riesgo | Estado |
|---|---|---|---|---|---|---|---|
| **S0** | Pasillo · botón parlante (01B) | Nada definido: el parlante solo cambia de ícono | 45–60 s en bucle | Ambiente de sala de museo con acordeón suave a lo lejos (grabación libre) | Ambiente generado con IA declarada | Bajo | Por buscar |
| **E1-A** | Est. 1 · ficha (Resumen / Audio activo) | «Acordeón, caja y guacharaca»: paseo con los tres instrumentos | 30–45 s | Grabación propia de un trío local | Grabación libre CC0/CC BY de un paseo | Medio: pocas grabaciones libres de vallenato real | Por buscar |
| **E1-B** | Est. 1 · visor y Vista 2D | «Solo de acordeón»: pitos agudos y bajos en cuatro tiempos | 20–30 s | Grabación libre de acordeón diatónico | Grabación propia | Bajo–medio: casi todo lo libre es acordeón europeo, no de botones vallenato | Por buscar |
| **E2-A** | Est. 2 · ficha | «Canto y parranda de patio» con la cita «En los patios de la provincia cantábamos…» | 30–45 s | Parranda grabada (canto + acordeón) con permiso; la cita leída por un narrador y presentada como **recreación** | Música instrumental libre + narración | Alto: la cita no tiene fuente; no se presenta como testimonio real | Por decidir con Kevin |
| **E2-B** | Est. 2 · visor y Vista 2D | «Paseo de Alejo Durán» | 30 s | **Enlace** a una grabación oficial (YouTube del titular), sin descargar | Paseo tradicional grabado por otros con licencia libre, sin decir que es de Durán | Alto: las grabaciones de Durán tienen derechos | Por decidir con Kevin |
| **E3-A** | Est. 3 · ficha | «Voz de Consuelo Araújo (Archivo)» con la cita «El vallenato representa la dignidad…» | 20–40 s | Fragmento real de archivo con permiso (Señal Memoria / RTVC) | Narrador que lee una cita **verificada** y dice de quién es | Alto: voz de persona real fallecida; la cita no está verificada. **No se usa IA** | Por buscar el archivo |
| **E3-B** | Est. 3 · visor y Vista 2D | «Puya de competencia» en la tarima Francisco el Hombre | 20–30 s | Grabación libre de una puya | Grabación propia o IA instrumental declarada (sin decir que es la tarima real) | Medio | Por buscar |
| **E4-A** | Est. 4 · ficha | «Paisaje sonoro de Valledupar»: murmullo en la Plaza Alfonso López, brisa del Guatapurí y acordeón a lo lejos | 30–45 s | Grabación propia en la plaza y el río (el equipo está en Valledupar) | Mezcla de ambientes libres: plaza + río + acordeón lejano | Bajo | Por buscar |
| **E4-B** | Est. 4 · visor 360° y Vista 2D | «Paisaje sonoro del río»: rumor del Guatapurí, cantos de vaquería y brisa de la Sierra | 30–45 s | Grabación propia del río | Río libre + canto de vaquería (grabación con permiso o recreación declarada) | Medio: el canto de vaquería grabado es escaso | Por buscar |

## Notas

- **La portada no suena** (A1, «Inicio silencioso» en el Figma). La regla A4 pide el aviso «Sube el volumen o usa audífonos; todo tiene subtítulos» en la portada.
- **El 0:18 de las pantallas «Audio activo»** es un tiempo de muestra del Figma, no una duración pedida.
- El **mismo audio** suena en el visor y en la Vista 2D de cada estación (D2: misma información sin 3D).
- Todo candidato se escucha antes de elegirlo (earshot) y se anota en `docs/assets.md` con fuente, licencia, crédito y enlace.

## Candidatos encontrados

Búsqueda del 24 nov. 2026 con Apify (navegador web) en Freesound, Wikimedia Commons y la web abierta. **Todavía sin escuchar** (earshot necesita descargar los archivos).

| Para | Candidato | Licencia | Enlace | Comentario |
|---|---|---|---|---|
| E4-A / E4-B | «Stream River Water Up Close» (jackthemurray) | CC0 | https://freesound.org/people/jackthemurray/sounds/433589/ | Río suave, muy usado. No es el Guatapurí |
| E4-A / E4-B | «River» (Antonio_Lai), Cerdeña, con pájaros | CC0 | https://freesound.org/people/Antonio_Lai/sounds/517419/ | Río entre piedras con aves. No es el Guatapurí |
| E4-A / E4-B | «River flow» (Duasun) | CC0 | https://freesound.org/people/Duasun/sounds/462666/ | Corto y limpio, sirve de base para mezclar |
| E3-A | Videos de medios locales sobre La Cacica (El Pilón, Emisora Fiesta de Acordeones) y la casona «La Cacica Vive» en Valledupar | Con derechos | facebook.com/elpilon.com.co · facebook.com/emisorafiestadeacordeones | No se pueden usar sin permiso; sirven para **pedir** un fragmento de su voz |

**Escucha con earshot (24 nov.), sobre las versiones de vista previa en MP3 de Freesound:**

| Candidato | Duración | Qué se oye | ¿Grabación real? | Volumen | Veredicto |
|---|---|---|---|---|---|
| 517419 · Antonio_Lai | 50 s | Arroyo parejo de principio a fin; las aves casi no se notan | Sí (p_real 0,94, la más alta) | Bajo (−39 LUFS): hay que subirlo unos 23 dB | **Elegido** como base de E4-B y capa de río de E4-A. Se puede repetir en bucle |
| 433589 · jackthemurray | 69 s | Agua que cae y salpica, con cambios a mitad | Sí (0,80) | Muy bajo (−54 LUFS): subirlo 38 dB levanta ruido | Reserva |
| 462666 · Duasun | 15 s | Burbujeo muy cercano, mono | Sí (0,81) | Bueno (−20 LUFS) | Solo como capa corta; muy breve y cercano para usarlo solo |

Para la versión final hay que bajar el **archivo original** (WAV), no la vista previa: Freesound lo pide con sesión iniciada en una cuenta gratuita. Es CC0 (no exige crédito), pero se acredita igual: «Río (Olzai, Cerdeña) · Antonio_Lai · Freesound · CC0».

**Lo que no apareció:**
- **Vallenato real con licencia libre:** en Freesound no hay guacharaca, ni caja, ni acordeón de botones vallenato, ni nada de Valledupar. Los acordeones CC0 son europeos (calle de Bruselas, francés, ruso) y no sirven para E1, E2 ni E3. Los dos registros que dicen «vallenato» son radios de fondo en Bogotá y Pasto.
- **Wikimedia Commons:** ningún audio de vallenato (solo una pronunciación de la palabra).
- **Voz de Consuelo Araújo:** ningún archivo libre.

## Plan con IA declarada (24 nov. 2026) — descartado el 25 nov.

La música vallenata de E1, E2 y E3-B se genera con IA y se declara (F1). La voz de Consuelo Araújo (E3-A) **no** se hace con IA.

### Herramienta: Eleven Music (ElevenLabs), plan Starter

Condiciones revisadas el 24 nov. 2026 (términos de música de ElevenLabs del 9 oct. 2026, según el resumen de LICENSEWARE y la página de planes):

| Plan | ¿Se puede descargar? | ¿Uso público/comercial? | Crédito obligatorio |
|---|---|---|---|
| Gratis | **No** | No (solo uso no comercial) | Sí, «Eleven Music» |
| **Starter (USD 6/mes)** | Sí, 30 min al mes | Sí, en línea y fuera de línea (no cine, TV ni radio) | No (lo damos igual) |

- Lo que se genere **mientras la suscripción esté activa** se puede seguir usando después de cancelarla.
- **Prohibido escribir en la indicación** el nombre de un artista real (vivo o muerto), el título de una canción o letras existentes. Por eso no se puede pedir «un paseo de Alejo Durán».
- Suno exige el plan Pro (USD 10/mes) para descargar; queda como alternativa.
- La cuenta y el pago los hace Kevin. Claude escribe las indicaciones y luego recorta, nivela, revisa con earshot y prepara los subtítulos.

### Indicaciones (en inglés: el modelo responde mejor)

| ID | Indicación | Duración |
|---|---|---|
| E1-A | Traditional Colombian vallenato paseo, instrumental only, no vocals. Diatonic button accordion playing a warm melody, caja vallenata hand drum with dry slaps, guacharaca scraper keeping a steady rasp. Relaxed mid tempo around 100 BPM, acoustic, recorded live in a small room, natural and unpolished. | 40 s |
| E1-B | Solo diatonic button accordion, instrumental, no other instruments. Bright treble melody on the right-hand buttons while the left-hand bass buttons mark a steady four-beat pulse. Traditional Colombian Caribbean folk style, mid tempo, close and intimate recording. | 30 s |
| E2-A (música) | Relaxed backyard gathering in the Colombian Caribbean at dusk: a diatonic button accordion, caja drum and guacharaca playing a slow, nostalgic paseo, instrumental, no vocals, with soft distant conversation and crickets. Warm, informal, acoustic. | 45 s |
| E2-A (voz) | Voz de narrador hecha con texto a voz (voz genérica de la biblioteca, **nunca** clonada de una persona real), que lee la cita como **recreación**. | — |
| E3-B | Fast, virtuosic Colombian vallenato puya, instrumental, no vocals. Rapid accordion runs, energetic caja drum rolls and fast guacharaca, around 150 BPM, competition intensity, acoustic and live-sounding. | 30 s |
| S0 (opcional) | Quiet museum hall ambience with a soft, distant diatonic accordion melody, gentle and calm, instrumental, loopable. | 60 s |

### Cómo se declara (F1 y F3)

- En `docs/assets.md`: herramienta, fecha, indicación, plan y quién revisó.
- En el crédito de cada audio: «Música generada con IA (Eleven Music, ElevenLabs) a partir de indicaciones del equipo. No es una grabación de músicos reales».
- Nada generado se presenta como grabación de archivo, de un artista real ni de un evento real del Festival. Afecta al texto de **E2-B** («Paseo de Alejo Durán») y al subtítulo de **E3-B** («…en la final de la tarima Francisco el Hombre»): si su audio es de IA, el texto tiene que decir que es una recreación. Cambiar esos textos se aparta del Figma y lo decide Kevin.

**Conclusión:** con bancos libres solo se resuelven los ambientes (río, brisa, plaza). La música (E1, E2, E3-B) necesita grabación propia en Valledupar, enlace a la grabación oficial o IA declarada. Si se usa un río que no es el Guatapurí, el subtítulo o el crédito tienen que decirlo.
