# Aula 20 · rediseño del home

Prototipo navegable del nuevo home de [aula20.edu.pe](https://aula20.edu.pe/) con el concepto **"Marca tu ingreso"**:
eliges tu universidad como en la cartilla del examen y ves al toque tus ciclos, la preparación, los resultados,
los cachimbos y tu sede.

## Correr

```bash
npm install
npm run dev
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Tipos + build de producción en `dist/` |
| `npm run preview` | Sirve el build |
| `npm run lint` | oxlint |
| `npm run test` | Vitest (`src/**/*.test.ts`) |
| `npm run check` | lint + tipos + pruebas + build |

## Documentos

- `docs/auditoria-2026-11-04.md`: problemas del sitio actual.
- `docs/design/landing-brief.md`: concepto, paleta, capítulos y lo que falta confirmar con Aula 20.
- `docs/CONTINUAR.md`: estado del trabajo y pendientes.

Los textos, cifras y fotos son los que Aula 20 publica en su web; las imágenes se cargan de forma provisional
desde su CDN.
