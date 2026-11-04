# Brief del nuevo home · "Marca tu ingreso"

Estado: **propuesta para aprobar** (2026-11-04). Parte de la auditoría del sitio actual
(`docs/auditoria-2026-11-04.md`). Es un prototipo del home, no una réplica del sitio actual:
conserva la marca (azul y menta del logo, tono) y el lema propio de Aula 20, y cambia la estructura,
la jerarquía y la forma de mostrar la información.

Reglas que se mantienen: nada de datos inventados (precios, fechas, cifras, testimonios) y textos solo
de lo que Aula 20 publica en aula20.edu.pe, con su origen anotado en `src/content/`.

## Idea y frase para contar

> "Es la web donde marcas tu universidad como en la cartilla del examen y ves al toque tu ciclo,
> tu sede y a los que ya ingresaron."

El lema ya existe y es de ellos: **"Tú decides a dónde ingresar."** Pasa de subtítulo perdido a H1.

## Lenguaje visual

| Recurso | De dónde sale | Para qué |
|---|---|---|
| **Cartilla óptica** (óvalos A–E que se rellenan) | La hoja de respuestas del examen de admisión | Selector de universidad y de área. Es el "movimiento propio" del sitio |
| **Cuadrícula de cuaderno** | El cuaderno del preu | Fondo de las secciones oscuras y claras, muy sutil |
| **Azul Aula** `#002cff` | El azul del logo (`aula20-600` en el CSS del sitio) | Portada y cierre, enlaces, botones secundarios |
| **Menta** `#21dfaf` | El "20" del logo (`secondary-500`) | Botón de matrícula, palabra clave de los títulos sobre azul o tinta, franja de universidades, cifras destacadas. Sobre azul solo en texto grande, íconos o bordes |
| **Resaltador menta** `#68e9c9` | El plumón con el que se repasa (`secondary-300`) | Subrayar la palabra clave de cada título sobre fondos claros. Nunca como color de texto sobre blanco |
| **Tinta** `#000a3b` | El azul más oscuro de la marca (`aula20-950`) | Panel de ciclos, resultados y pie |

**Paleta cerrada: azul y menta.** No se usan amarillos, naranjas ni otros acentos. Los tonos salen de las
escalas `aula20-*` y `secondary-*` que ya existen en el CSS de aula20.edu.pe (2026-11-04); los contrastes
están anotados en `src/styles/index.css`.

**Modo oscuro** (botón de sol/luna en el encabezado). Regla: **se apaga la sala, no el papel.**

- La página pasa al azul noche de la marca.
- La portada y el cierre usan azul noche con brillo azul en vez del azul pleno.
- Los objetos de papel siguen claros: la cartilla (la hoja de respuestas), la ficha del ciclo y la foto pegada
  de la portada. Así el concepto se sigue leyendo.
- El resaltador de los títulos pasa a ser el trazo de plumón menta, como en la portada.
- La tarjeta de niveles y la franja de universidades no cambian.

Tipografías: **Bricolage Grotesque** para títulos y cifras (carácter joven, números con presencia) y
**Manrope** para el texto (la misma de Woodland). Iconos solo con `lucide-react`, sin emojis.

## Recorrido y curva de emociones

| # | Capítulo | Qué siente la persona | Recurso | Qué lo provoca |
|---|---|---|---|---|
| 1 | Portada (azul) | Ambición, "yo puedo" | Composición con foto real + notas flotantes | H1 "Tú decides a dónde ingresar.", 659 ingresantes y 46 primeros puestos UNMSM 2027-I, botón de matrícula visible |
| 2 | Franja de universidades (menta) | "Aquí está la mía" | Marquesina lenta | Las 11 opciones que publica Aula 20 (universidades y programas) |
| 3 | **Marca tu universidad (pico)** | **Control, "este es mi ciclo"** | **Cartilla óptica interactiva** | Rellenas el óvalo de tu universidad y aparecen sus ciclos reales, con enlace al detalle |
| 4 | Cómo te preparamos | Tranquilidad | Bento con fotos reales | Metodología Integral 20, niveles, áreas, tutor por salón, simulacros, docentes |
| 5 | Resultados | Orgullo | Cifras grandes que cuentan al entrar | Admisión UNMSM 2027-I y 2026-II |
| 6 | Cachimbos | Identificación, "ese podría ser yo" | Recorrido lateral con scroll nativo | Flyers reales de ingresantes con su nombre en texto |
| 7 | Encuentra tu sede | Cercanía | Pestañas por zona | 17 sedes con dirección y referencia en texto + modalidad virtual |
| 8 | Cierre | Decisión | Cierre que se queda | "Tu futuro comienza con una decisión." + WhatsApp correcto (+51) |

Dos capítulos seguidos nunca usan el mismo recurso. El pico es el 3: es lo que el sitio actual no
resuelve (hoy hay 11 tarjetas azules idénticas sin información).

## Problemas de la auditoría que este diseño resuelve

- WhatsApp con código de país (`wa.me/51912206403`), generado por una sola función con pruebas.
- Sin texto dentro de imágenes: cifras, ciclos, horarios, sedes y teléfono son HTML.
- Botón **Matrícula** visible en el encabezado en todos los tamaños (no escondido en el menú).
- Un H1, títulos en orden, `alt` reales, ancho y alto en cada imagen, foco visible.
- Nada de `object-fit: fill` ni banners recortados: cada foto declara su punto de foco.
- Movimiento corto y desactivable con "reducir movimiento".

## Lo que necesita decisión o confirmación de Aula 20

- **Cantidad de sedes**: /nosotros dice "15 sedes"; /sedes lista 17; el banner de Intensivo menciona
  Chosica y VES, que no están en /sedes. El prototipo muestra las 17 de /sedes y cuenta las que lista.
- **"33 % cachimbos de Medicina Humana"**: confirmar la redacción exacta (¿33 % de los ingresantes a
  Medicina de la UNMSM 2027-I?). Se muestra literal, como en su banner.
- **Fechas y precios por ciclo**: solo el Intensivo San Marcos tiene inicio, fin y horario en texto;
  los precios están en PDF. El prototipo no muestra precios.
- **Inicio del Intensivo San Marcos**: la web dice 19/10/2026; un banner dice "Inicio: Nov. 0…".

## Material que debe aportar Aula 20

| Prioridad | Qué | Para qué capítulo | Formato |
|---|---|---|---|
| Alta | Retratos de cachimbos **sin texto encima** + carrera y puesto en una tabla | 6 | JPG/WebP 1200 px lado largo |
| Alta | Foto horizontal de un aula llena o de un simulacro | 1 y 4 | 2400 px |
| Alta | Logo en SVG bicolor ("Aula" blanco + "20" menta, como en sus redes) | encabezado y pie | SVG. El sitio solo publica la versión blanca y la azul, ambas de un color |
| Media | Una foto por sede (fachada) | 7 | 1200 px |
| Media | Fechas de inicio, horario y modalidad de cada ciclo en texto | 3 | Hoja de cálculo |
| Baja | Video corto de clase o simulacro (10–20 s, sin audio) | 4 | MP4 1080p |

Mientras tanto se usan, de forma provisional, las fotos que ya publican en su CDN
(`cdn.aula20.edu.pe`), sin recortes que oculten texto.

## Orden de construcción

1. Tokens, tipografías, encabezado y portada.
2. Cartilla óptica + ciclos (capítulo 3).
3. Cómo te preparamos, resultados y cachimbos.
4. Sedes, cierre y pie.
5. Revisión en 375 / 800 / 1440, sin animaciones y con teclado.
