# Cómo continuar el proyecto (traspaso entre sesiones)

Última actualización: 2026-11-04 (intranet de demostración construida, sección 9). Repositorio privado en GitHub: https://github.com/Everkoe/aula20-home (rama `main`). Sin desplegar: el usuario lo conectará a Vercel.

## 1. Contexto en 30 segundos

- Propuesta de rediseño del **home de aula20.edu.pe** (Academia Aula 20, preuniversitaria, Lima y Callao),
  hecha por el estudio a partir de la auditoría `docs/auditoria-2026-11-04.md`.
- Es un **prototipo navegable** del home, no el sitio completo: los enlaces a ciclos, cachimbos, docentes,
  nosotros, sedes y PDFs legales llevan al sitio actual. "Intranet" lleva a nuestra demo en `/intranet/` (sección 9).
- Concepto **"Marca tu ingreso"**: la cartilla óptica del examen (óvalos que se rellenan), la cuadrícula del
  cuaderno y el plumón resaltador. Brief completo en `docs/design/landing-brief.md`.
- Stack: React 19 + Vite 8 + TypeScript + Tailwind 4 + lucide-react. Fuentes: Bricolage Grotesque
  (títulos y cifras) y Manrope (texto), vía fontsource. Pruebas con Vitest; lint con oxlint.

## 2. Reglas que el usuario fijó (no romper)

- Responder siempre en español. **Commit solo cuando lo pida**; **no desplegar**.
- **No inventar datos** de Aula 20 (precios, fechas, cifras, sedes, testimonios). Todo texto sale de lo que
  publican en aula20.edu.pe y vive en `src/content/` con su origen anotado.
- **Paleta de marca cerrada: azul y menta (cian)**, la del logo (pedido del usuario, 2026-11-04). Nada de
  amarillos, naranjas ni otros acentos. Tokens en `src/styles/index.css`, sacados de las escalas `aula20-*` y
  `secondary-*` del CSS del sitio actual.
- **Modo claro / oscuro** (pedido del usuario, 2026-11-04): el oscuro usa el azul noche de la marca
  (`#000a3b` página, `#000f57` hojas). En superficies se usan los tokens que cambian con el tema
  (`bg-hoja`, `bg-papel`, `text-titulo`, `text-acento`, `text-grafito`, `border-linea`); `bg-white`,
  `text-tinta` y `text-aula` quedan solo para piezas que no cambian (notas pegadas, botones menta).
  **En oscuro se apaga la sala, no el papel** (pedido del usuario: "en el modo oscuro se pierde el diseño"):
  la cartilla, la ficha del ciclo y la foto de la portada llevan `hoja-clara` y siguen blancas; el
  resaltador de títulos pasa a trazo de plumón menta.
- Todo enlace de WhatsApp se arma con `buildWhatsAppLink` (`src/lib/whatsapp.ts`), que agrega el 51.
  El sitio actual usa `wa.me/912206403`, sin código de país, y no abre el chat.

## 3. Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:5173 (la vista previa de Claude usa 5174, ver .claude/launch.json)
npm run check    # lint + tipos + pruebas + build; correr antes de entregar
```

Para ver la versión compilada (la única con precarga de fuentes): `npm run build` y luego la entrada
`aula20-build` de `.claude/launch.json` (`vite preview` en el puerto 4174).

## 4. Mapa del código

| Carpeta | Qué hay |
|---|---|
| `src/content/` | Textos y datos con su fuente: `home.ts` (copys por capítulo), `ciclos.ts` (11 opciones y sus ciclos), `sedes.ts` (17 sedes por zona), `docentes.ts`, `cachimbos.ts`, `images.ts`, `site.ts` (contacto, enlaces, redes) |
| `src/lib/` | `whatsapp.ts` (enlace con +51, formato y `tel:`), `format.ts` (nombres, puestos, Maps), `theme.ts` (tema claro/oscuro) y `headTags.ts` (description, Open Graph, schema.org y precarga de la foto del hero, que `vite.config.ts` escribe en el HTML). Con pruebas |
| `src/components/ui/` | `Reveal`, `CountUp`, `ButtonLink`, `Heading` (resaltado / trazo), `PhotoFrame`, `Container` |
| `src/components/layout/` | `SiteHeader` (matrícula visible en todo tamaño, menú móvil, sección activa), `useActiveSection`, `ThemeToggle` y `SiteFooter` |
| `src/features/` | Un componente por capítulo: `home/` (portada, franja, método, resultados, cachimbos, cierre), `ciclos/` (cartilla + panel), `sedes/` |
| `src/styles/index.css` | Tokens con contrastes anotados, cuadrículas, resaltador, óvalo, animaciones y `prefers-reduced-motion` |

## 5. Los 8 capítulos (en orden)

1. **Portada** (azul; azul noche con brillo en modo oscuro): H1 con el lema "Tú decides a dónde ingresar.", matrícula por WhatsApp, foto de tutores
   con 659 ingresantes y 46 primeros puestos (UNMSM 2027-I) como notas pegadas.
2. **Franja de universidades** (menta): las 11 opciones en marquesina lenta. Cada nombre marca esa opción en la
   cartilla y baja a ella (el estado vive en `App.tsx`). Se detiene con el cursor o el foco; sin botón de pausa (quitado a pedido del usuario el 2026-11-09).
3. **Marca tu universidad** (pico): cartilla con radios nativos; al marcar aparecen los ciclos de esa opción
   (fechas, semanas y modalidad en cada fila). Al pie de la hoja, "Marcaste X · N ciclos"
   (aviso para lector de pantalla) y, en celular, "Ver ciclos ↓" hasta el resultado.
   **Ficha de cada ciclo** (2026-11-05, pedido del usuario): "Ver ficha" abre un `<dialog>` nativo
   (`features/ciclos/CicloFicha.tsx`, hoja clara en los dos temas) con inicio, fin, duración, modalidad, metodología en
   gráfico circular (`MetodologiaDonut`, azul práctico / menta teórico, % siempre en texto), horario en una semana
   lun–dom con los bloques a su hora real y selector de turno (`HorarioSemana`, con la lista en texto debajo),
   beneficios, logros, WhatsApp con el nombre del ciclo y enlaces a los PDF de precios y horario. Datos de los 19
   ciclos en `src/content/ciclos.ts`, leídos de los datos que manda cada página /ciclos/…; utilidades en `lib/horario.ts`.
4. **Cómo te preparamos**: bento con plana docente (58 docentes, 18 cursos), niveles, áreas, tutor y simulacros.
   **Plana docente** (2026-11-05, pedido del usuario): "Conoce a la plana docente" ya no lleva al sitio; abre una hoja
   (`features/home/PlanaDocente.tsx`) con una pestaña por rama (Matemáticas, Ciencias, Letras), atajos a cada curso y
   la foto y el nombre de cada docente, como en /docentes. Las fotos (PNG 500 × 500, ~300 KB c/u) vienen en caliente del
   CDN y en diferido; solo se pinta la rama elegida. La ficha del ciclo y esta hoja comparten `components/ui/HojaDialog`.
5. **Resultados** (tinta): cifras 2027-I y 2026-II que cuentan al entrar.
6. **Cachimbos** (`CachimbosFila.tsx`, 2026-11-09): **tarjetas de primeros puestos, 3 por fila** (2 en tableta, 1 en
   celular), cada una con la pieza y debajo puesto, carrera y nombre. Avanzan solas **de a una cada 4 s** con un
   deslizamiento suave; la vuelta no tiene corte (se clonan las 3 primeras al final y se salta a 0 sin animación).
   Sin flechas, puntos ni pausa; se detienen con el cursor, el foco o fuera de pantalla; en celular se pasan con el dedo.
   Con "reducir movimiento" no avanzan solas.
   Descartado por el usuario ese mismo día: franja continua de tarjetas grandes ("se ve raro"), muro con filas de nombres
   ("mucha bulla"), destacado único + fila de miniaturas debajo ("lo de abajo no me gusta").
   **Directorio** (2026-11-05, pedido del usuario): "Ver todos los cachimbos" abre una hoja ancha (`CachimbosDirectorio.tsx`,
   import dinámico, ~17 KB gzip) con los 403 de aula20.edu.pe/cachimbos/unmsm/2027-1: buscador por nombre o carrera,
   zona (Norte, Este, Centro, Sur, Virtual), sede y carrera encadenadas, tandas de 24 piezas en diferido (~70 KB c/u).
   Datos en `src/content/cachimbosUnmsm2027.ts`, generados una vez desde el `data-page` de esa URL.
   `formatCarrera` (lib/format.ts) pone las tildes que el listado no trae y la filial entre paréntesis ("(SJL)").
7. **Sedes**: pestañas por zona con flechas/Home/End; dirección, referencia y "Cómo llegar".
8. **Cierre** (azul): "Tu futuro comienza con una decisión." + WhatsApp, teléfono y horario.

## 6. Qué se revisó

- 1440, 768 y 375 px: sin scroll horizontal, nada tapado (se corrigió el pie de foto de la portada en celular).
- Teclado: cartilla (flechas entre óvalos), pestañas de sedes, menú móvil con `aria-expanded`, salto al contenido.
- Foco visible: menta sobre azul y tinta, azul sobre fondos claros.
- Sin errores de consola.
- Modo oscuro en 1440 y 375: botón en el encabezado (desde 640 px) y en el menú móvil, `aria-pressed`,
  se recuerda en `localStorage` (`aula20-tema`) y, si nadie eligió, sigue al sistema. `index.html` aplica el
  tema antes del primer pintado, así que no parpadea.
- **No probado en navegador**: el modo "reducir movimiento" (está cubierto en CSS) y lectores de pantalla.

### Autoauditoría del prototipo (2026-11-04)

Con axe-core 4.10 en los dos temas y midiendo la versión compilada. Resultado final: **0 problemas de axe** en
claro y oscuro y **CLS 0** (antes 0.072 por el cambio de fuente). Lo que se cambió:

- Cifras que cuentan (`CountUp`): el valor final va en texto oculto; antes usaban `aria-label` en un `<span>`, que se ignora.
- Sedes: el `role="tabpanel"` pasó a un `div` que envuelve la lista (antes rompía la semántica de `<ul>`).
- Cachimbos: el carrusel recibe foco (se mueve con flechas del teclado) y los botones se apagan en cada extremo.
- Menú móvil: Escape lo cierra y devuelve el foco al botón. El menú marca la sección visible (`aria-current`).
- Franja: nombres clicables (el botón de pausa se quitó el 2026-11-09 a pedido del usuario), contorno de foco tinta sobre menta.
- Cartilla: el aviso del resultado pasó a un `role="status"` fijo (el panel se vuelve a montar con cada opción y su
  `aria-live` no se anunciaba). En celular, atajo "Ver ciclos ↓".
- Tarjeta del tutor: "1 tutor por salón" en grande con el trazo menta, en vez del hueco vacío.
- `<head>`: description, Open Graph, `EducationalOrganization` con las 17 sedes, canonical y precarga de la foto
  del hero y de las dos fuentes del primer pantallazo (con el nombre final que pone Vite).

## 7. Falta confirmar con Aula 20

- **Sedes**: /nosotros dice 15, /sedes lista 17 y un banner menciona Chosica y VES, que no están en /sedes.
  El prototipo muestra las 17 de /sedes.
- **"33 % cachimbos de Medicina Humana"**: redacción exacta. Se muestra como en su banner.
- **Inicio del Intensivo San Marcos**: la web dice 19/10/2026; un banner dice "Inicio: Nov. 0…".
- **Precios**: solo están en PDF; el prototipo no muestra precios (la ficha enlaza el PDF de cada ciclo).
- **Horario de Beca 18, virtual mañana**: la web dice "Viernes: (9:00 pm - 10:45 am)"; la ficha muestra 9:00 a. m.
  También se leyó "Lunes - Miércoles" como lunes y miércoles (como "Martes - Jueves" en Escolar Kids).
- **Logros en las fichas**: todas (también UNI, Católica, Beca 18, Escolar Kids) publican los de UNMSM 2026-II
  (130 primeros puestos, 1311 cachimbos). Se muestran así, con el nombre del proceso.
- **Intensivo San Marcos, turno noche**: el simulacro del domingo no tiene hora publicada.
- **Cachimbos 2027-I**: un registro no tiene carrera ("Carrera no publicada") y uno no trae nombre en formato
  "Apellidos, Nombres". El listado publica "Cadena de Sumistro"; se muestra "Suministro".
- **Modalidad**: CEPRE San Marcos y Semianual Villarreal son solo presenciales; Escolar Kids, solo virtual
  (antes el prototipo decía "Presencial y virtual" para todos).

## 8. Pendientes y deuda conocida

- Las fotos y flyers se cargan **en caliente desde `cdn.aula20.edu.pe`** (provisional). Las 58 fotos de docentes
  son PNG de ~300 KB: al pasarlas a `public/`, convertirlas a WebP de ~400 px. Con el material propio,
  pasarlas a `public/` optimizadas.
- Los flyers de cachimbos traen texto dentro de la imagen; lo ideal son retratos sin texto (ver "Material que
  debe aportar Aula 20" en el brief).
- Falta el **logo bicolor** ("Aula" blanco + "20" menta). El sitio solo publica la versión blanca y la azul
  (`/build/assets/logo-xeVVxgm4.svg` y `/build/assets/logoSecond-C-VtVEB5.svg`), ambas de un color.
- (Resuelto 2026-11-05) La foto de la plana docente se recortaba a los lados (solo se veía a la docente del centro, también a 1024 px): ahora va arriba a lo ancho (2:1, 5:2 desde lg) y las áreas en tres columnas.
- Las pruebas cubren `src/lib` y la integridad de `src/content`; los componentes no tienen pruebas.
- La imagen de vista previa (`og:image`) es la foto del hero en WebP 1500×900. Para WhatsApp y Facebook conviene
  una JPG de 1200×630 hecha a propósito.
- Los datos schema.org no llevan `logo`: falta el logo bicolor publicado en una URL (el blanco no sirve sobre fondo blanco).

## 9. Intranet propia (2026-11-04, construida)

- Auditoría de `intranet.aula20.edu.pe` (cuenta de alumna, solo lectura) en `docs/intranet/auditoria-intranet-2026-11-04.md`.
  Incluye hallazgos de privacidad para avisar a Aula 20: cada página manda al navegador la ficha completa de matrícula.
- Datos académicos reales reutilizables (cursos, temas por semana, estructura del simulacro, teléfonos de sedes), sin
  datos personales ni enlaces, en `docs/intranet/datos-intranet-2026-11-04.json`.
- Propuesta en `docs/design/intranet-brief.md` (concepto "Tu semana"). Aprobada y construida.
- Nunca guardar en el repo documento, pagos ni datos del responsable de la cuenta revisada. El nombre de la alumna
  sí se usa en la demo: lo pidió ella misma (2026-11-04): ver `src/intranet/content/alumno.ts`.

### Cómo está hecha

- Mismo repo y mismo build: segunda entrada `intranet/index.html` → `src/intranet/main.tsx`, en `/intranet/`.
  `react-router` (modo declarativo, `basename="/intranet"`). Enlaces directos: middleware `intranetFallback` en
  `vite.config.ts` (dev y `vite preview`) y la reescritura de `vercel.json` en Vercel. `noindex` desde `headTags.ts`.
- Rutas: `/entrar` (botón "Entrar con la cuenta de demostración", sin usuario ni contraseña), `/inicio`, `/clases`
  (`?semana=` y `?bloque=` en la URL), `/simulacros`, `/sede`, `/ayuda`, `/cuenta` y una página 404.
  Sin sesión de demo (`sessionStorage`, `src/intranet/session.ts`) todo lleva a `/entrar` y luego vuelve.
- Una sola entrada a la cuenta (el nombre, abajo en la barra lateral; el avatar en celular). "Cerrar sesión" solo
  existe en Mi cuenta. Celular: barra superior + barra inferior con las 5 secciones.
- Archivos y grabaciones son contenido pagado: los botones (`ui/DemoAction.tsx`) muestran un aviso en vez de abrir.
  El buzón guarda los mensajes solo en memoria de la pantalla.
- Estilo (rediseño del 2026-11-04, "se veía muy simple"): las mismas piezas de la landing en cada página.
  Inicio: portada azul con los 7 días de la semana en óvalos y dos notas pegadas; cada curso con su sello de color por
  bloque (`CursoSello`, abreviatura en `cursos.ts`). Clases: cartilla clara con óvalos de semana y fichas por curso.
  Simulacros: boleta con composición del puntaje, puesto en el salón (41 óvalos) y en el área; la pieza oscura de la
  meta (`MetaCard` + `Regla`). Sede: tarjeta oscura con la dirección y boleta de matrícula. Ayuda: preguntas numeradas,
  tarjeta oscura de contacto y el buzón como hoja de cartilla. Mi cuenta: ficha de alumno con foto.
- **Inicio como dashboard** (2026-11-09, pedido del usuario con la skill code-and-chill, adaptada a la marca: mismos tokens,
  fuentes y paleta). La portada resume la semana en una frase con los datos en negrita, y a la derecha (desde 1280 px)
  va el widget "Hoy": cristal sobre el azul, con el horario real del turno (`lib/hoy.ts`, que lee la ficha pública del
  Intensivo en `src/content/ciclos.ts`) y el estado "En clase ahora / Hoy tienes clases / Terminaste por hoy / Hoy no
  hay clases" con lo que viene. Debajo, cuatro KPI (`ui/Kpi.tsx`): último simulacro con su mini gráfico, puesto en el
  salón y en el área con barra de "superaste a", y clases grabadas por bloque. Luego "Tu puntaje por bloque"
  (`ui/BloquesChart.tsx`): pestañas por simulacro con pastilla deslizante, barras que se transforman y, en gris, el otro
  simulacro. Las cifras cuentan al entrar (`CountUp` ahora acepta decimales) y las tarjetas entran en cascada una vez
  (`.entrada` en intranet.css); todo se apaga con "reducir movimiento". Si hoy ya pasó la última semana publicada,
  la frase lo dice ("la última publicada").
- **Simulacros y Clases con el mismo movimiento** (2026-11-09). Piezas compartidas en `src/intranet/ui/`: `Pestanas`
  (selector segmentado con pastilla, flechas/Inicio/Fin), `Recuento` (cifra que recuenta desde la anterior; escribe
  el texto en el DOM, sin re-render por fotograma) y `useFlip` (fichas que se deslizan a su nuevo sitio y entran con
  fundido). Simulacros: la boleta tiene selector de simulacro; total, bloques y puestos recuentan, la barra de
  composición y la marca del área se mueven, y cada bloque muestra cuánto subió frente al anterior. Clases: el filtro
  por bloque tiene una pastilla tinta que se mide sobre el chip elegido (los chips pueden ir en dos líneas) y las
  fichas usan FLIP al filtrar o cambiar de semana; los contadores recuentan. El gráfico del Inicio usa las mismas piezas.
- Foto de perfil editable en Mi cuenta (`src/intranet/fotoPerfil.ts`): JPG, PNG o WebP de hasta 8 MB; se recorta al
  centro y se reduce a 256 × 256 en el navegador. En la demo se guarda en `localStorage` de ese navegador y se queda
  aunque cierres sesión (solo se va con "Quitar foto" o borrando los datos del sitio). No pasa a otro navegador ni de
  `localhost` a Vercel: para eso hace falta un backend. Sale en la ficha, la barra lateral y la de celular (`ui/Avatar.tsx`).

| Carpeta | Qué hay |
|---|---|
| `src/intranet/content/` | Cursos, semanas (separatas + grabaciones), simulacros, contacto de sede y ayuda: reales, con fuente. `alumno.ts`: alumna y notas **de ejemplo**, marcadas así en pantalla |
| `src/intranet/lib/` | `ciclo.ts` (semana actual, une separata + grabación por curso, avance a la meta), `fechas.ts` (rangos, puntajes `1058.5`), `semanas.ts`. Con pruebas |
| `src/intranet/layout/` | Marco (barra lateral tinta, barras de celular, franja "Demostración"), `PageHeader`, aviso de demo |
| `src/intranet/ui/` | `Panel` (hoja), `Cuadernillo` (examen), `MetaCard` + `Regla` (meta y puntaje), `SemanaOvalos`, `CursoSello` + `bloques.ts` (color por bloque), `Avatar`, `OvaloRadio`, `DemoAction`, `Etiqueta` |
| `src/intranet/intranet.css` | Piezas propias: óvalos de días, cinta y notas pegadas |
| `src/intranet/pages/` | Una página por ruta |

### Verificado

- axe sin violaciones en las 7 rutas, en claro y en oscuro (con los `<details>` abiertos). Sin scroll horizontal a 375 px.
- Tras el rediseño: axe sin violaciones en las 6 páginas internas en claro y oscuro; sin scroll horizontal en escritorio
  ni en celular. Foto: subir (recorte 256 × 256), archivo que no es imagen (mensaje de error), quitar.
- En modo oscuro el resaltador sigue siendo resaltador dentro de `.hoja-clara` (antes salía menta sobre blanco).

### Pendiente

- Los enlaces "Intranet" de la landing (encabezado, menú móvil y pie) llevan a `/intranet/` en la misma pestaña
  (`site.links.intranet`). Si el home pasa a producción antes que la intranet, devolverlos a https://intranet.aula20.edu.pe/.
- Inicio muestra 6 de las grabaciones de la semana; el orden es el que trae la intranet actual (no hay fecha por clase).
- Eventos: la intranet actual no tiene ninguno; se muestra una línea vacía.
- Confirmar con Aula 20 qué significan "ABC 1", "ABC 2" y "DE" en Física y Química, y los números de WhatsApp repetidos entre sedes.
- Si algún día hay backend: sesión con cookie httpOnly, archivos con enlaces firmados y no mandar al navegador la ficha de matrícula.

## 10. Capa de captación (2026-11-09)

Objetivo del usuario: que la web traiga matrículas y nuevos alumnos, no solo que se vea mejor.

- **Medición** (`src/lib/analytics.ts`, con pruebas). Un solo escuchador mide todo clic en WhatsApp o llamar como
  `generate_lead` con `method` (whatsapp / telefono) y `zona` (sección, `encabezado` o `pie`; se puede forzar con
  `data-zona`); en Meta va como `Contact`. Marcar una opción en la cartilla o en la franja manda `elegir_universidad`.
  Todo va a `window.dataLayer`; GA4 y el píxel de Meta solo se cargan si existen `VITE_GA4_ID` / `VITE_META_PIXEL_ID`
  (ver `.env.example`; IDs validados). No se envía el texto del mensaje ni datos personales.
  **Pendiente**: pedir a Aula 20 sus IDs y, antes de activar el píxel, un aviso de cookies (Ley 29733).
- **Para la familia** (`features/home/FamiliasChapter.tsx`, `familias` en `home.ts`), entre Cachimbos y Sedes: hoja ya
  marcada con tutor, simulacros, notas y puesto en la intranet, grabaciones y material; Escolar Kids (reunión de padres,
  reporte semanal); términos, reglamento y Libro de Reclamaciones; WhatsApp con mensaje para padres.
- **Preguntas frecuentes** (`features/home/PreguntasChapter.tsx`, `content/faq.ts`), entre Sedes y el cierre: 8 preguntas
  con `<details>` nativo; respuestas solo con datos publicados (sin precios) y también como `FAQPage` en schema.org.
- El pie enlaza las dos secciones nuevas; el menú del encabezado no cambia (no cabe a 1024 px).
- Se descartó la barra fija de matrícula en celular: el encabezado ya es fijo y muestra "Matricúlate".
- Verificado: `npm run check` (75 pruebas), eventos en `dataLayer` desde encabezado, familias, preguntas, cierre y pie,
  375 px sin scroll horizontal, claro y oscuro. No probado: envío real a GA4/Meta (no hay IDs).
- **Barra de redes escondida** (`components/layout/SocialRail.tsx`, pedido del usuario el 2026-11-09 con captura de la
  barra del sitio actual). Mismo diseño (píldora clara, íconos en círculos) pero solo asoma una pestaña de 16 px al
  borde derecho: sale al pasar el cursor (solo en pantallas con cursor), con foco de teclado o al tocar la pestaña;
  se esconde al salir, al tocar fuera o con Escape. Logos de Simple Icons 13.21.0 (CC0) en `components/ui/brandIcons.ts`,
  porque lucide-react ya no trae marcas. Resuelve el punto 8 de la auditoría (la barra fija tapaba tarjetas).
