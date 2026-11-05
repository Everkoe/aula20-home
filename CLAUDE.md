# Aula 20 · guía para asistentes

Prototipo del nuevo home de aula20.edu.pe (Academia Aula 20, preuniversitaria). Propuesta de rediseño, no el sitio en producción.
**Si retomas el trabajo en una sesión nueva, empieza por `docs/CONTINUAR.md`** (estado, decisiones y pendientes).
El concepto y los capítulos están en `docs/design/landing-brief.md`; los problemas del sitio actual, en `docs/auditoria-2026-11-04.md`.

- Stack: React 19 + Vite 8 + TypeScript + Tailwind 4 + lucide-react. Sin backend. La landing no usa router; la intranet de demostración (`/intranet/`, código en `src/intranet/`) usa react-router.
- Responder en español. Commit solo cuando el usuario lo pida. No desplegar.
- No inventar datos de Aula 20 (precios, fechas, cifras, sedes, testimonios). Textos en `src/content/`, con su fuente.
- Paleta cerrada: azul `aula` y menta `menta` de la marca, más `tinta`, `cielo` y neutros. Colores y fuentes solo con los tokens de `src/styles/index.css`; respetar los contrastes anotados ahí (menta sobre azul solo en texto grande, íconos o bordes).
- Hay modo claro y oscuro (`data-theme` en `<html>`). En superficies usa los tokens que cambian con el tema (`bg-hoja`, `bg-papel`, `text-titulo`, `text-acento`, `text-grafito`, `border-linea`), nunca `bg-white` / `text-tinta` / `text-aula`; para algo puntual existe la variante `dark:`. Los objetos de papel (cartilla, ficha, foto pegada) llevan `hoja-clara` y siguen claros en oscuro. Revisa los cambios en los dos temas.
- WhatsApp siempre con `buildWhatsAppLink` (agrega el 51). Enlaces externos con `rel="noopener noreferrer"`.
- Las metaetiquetas y el schema.org no se escriben a mano en `index.html`: salen de `src/lib/headTags.ts` (desde `src/content/`).
- Componentes con `type Props`, booleanos `is*`, sin `useEffect` para estado derivado. Animaciones cortas y apagables con `prefers-reduced-motion`.
- Antes de entregar: `npm run check`.
