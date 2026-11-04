# Cómo continuar el proyecto (traspaso entre sesiones)

Última actualización: 2026-11-04. Sin repositorio git todavía (nada commiteado) y sin desplegar.

## 1. Contexto en 30 segundos

- Propuesta de rediseño del **home de aula20.edu.pe** (Academia Aula 20, preuniversitaria, Lima y Callao),
  hecha por el estudio a partir de la auditoría `docs/auditoria-2026-11-04.md`.
- Es un **prototipo navegable** del home, no el sitio completo: los enlaces a ciclos, cachimbos, docentes,
  nosotros, sedes, PDFs legales e intranet llevan al sitio actual.
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
   cartilla y baja a ella (el estado vive en `App.tsx`). Botón de pausa; también se detiene con el cursor o el foco.
3. **Marca tu universidad** (pico): cartilla con radios nativos; al marcar aparecen los ciclos de esa opción y,
   en San Marcos, la ficha del Intensivo con fechas y horario. Al pie de la hoja, "Marcaste X · N ciclos"
   (aviso para lector de pantalla) y, en celular, "Ver ciclos ↓" hasta el resultado.
4. **Cómo te preparamos**: bento con plana docente (58 docentes, 18 cursos), niveles, áreas, tutor y simulacros.
5. **Resultados** (tinta): cifras 2027-I y 2026-II que cuentan al entrar.
6. **Cachimbos**: carrusel con scroll nativo y botones; puesto, carrera y nombre en texto.
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
- Franja: botón de pausa (WCAG 2.2.2), nombres clicables, contorno de foco tinta sobre menta.
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
- **Precios**: solo están en PDF; el prototipo no muestra precios.

## 8. Pendientes y deuda conocida

- Las fotos y flyers se cargan **en caliente desde `cdn.aula20.edu.pe`** (provisional). Con el material propio,
  pasarlas a `public/` optimizadas.
- Los flyers de cachimbos traen texto dentro de la imagen; lo ideal son retratos sin texto (ver "Material que
  debe aportar Aula 20" en el brief).
- Falta el **logo bicolor** ("Aula" blanco + "20" menta). El sitio solo publica la versión blanca y la azul
  (`/build/assets/logo-xeVVxgm4.svg` y `/build/assets/logoSecond-C-VtVEB5.svg`), ambas de un color.
- La foto de la plana docente se recorta a los lados en la celda alta del bento (tablet).
- Las pruebas cubren `src/lib` y la integridad de `src/content`; los componentes no tienen pruebas.
- La imagen de vista previa (`og:image`) es la foto del hero en WebP 1500×900. Para WhatsApp y Facebook conviene
  una JPG de 1200×630 hecha a propósito.
- Los datos schema.org no llevan `logo`: falta el logo bicolor publicado en una URL (el blanco no sirve sobre fondo blanco).
