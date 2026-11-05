# Brief de la nueva intranet · "Tu semana"

Propuesta del 2026-11-04, a partir de la auditoría [`docs/intranet/auditoria-intranet-2026-11-04.md`](../intranet/auditoria-intranet-2026-11-04.md).
Aprobado y construido el 2026-11-04 (código en `src/intranet/`; estado y pendientes en `docs/CONTINUAR.md`, sección 9).

## Idea

La landing termina con el alumno marcando su universidad. La intranet es lo que pasa después: **cada semana del ciclo**.
El alumno entra para tres cosas: ver qué toca, bajar la separata o la grabación y ver su simulacro. Todo lo demás es secundario.

- Mismo sistema que la landing:
  - tokens de `src/styles/index.css`, azul `#002cff` y menta;
  - Bricolage Grotesque y Manrope;
  - cuadrícula de cuaderno y trazo de plumón;
  - modo claro y oscuro con la regla "se apaga la sala, no el papel".
- La barra lateral es tinta (la sala) y el contenido va sobre papel con cuadrícula.
- La semana actual se marca con el resaltador menta, como en los títulos de la landing.

## Menú: de 11 entradas a 5

| Nueva | Junta | Por qué |
|---|---|---|
| **Inicio** | Inicio + Eventos | La semana en curso: las clases con su tema, separata y grabación; el simulacro del sábado de *tu* área; tu meta de carrera. Sin simulacros rendidos, una línea, no seis tarjetas vacías |
| **Clases** | Materiales + Grabaciones | Hoy son dos páginas con la misma lista de cursos. Una tabla por semana: curso, tema, separata y grabación en la misma fila |
| **Simulacros** | Simulacros + Notas + Ranking | El examen de tu área primero (habilidades y conocimientos), luego claves y solucionario; tu nota por bloques, tu puesto y la distancia a tu meta |
| **Mi sede** | Mi Sede | Dirección, referencia, horario, WhatsApp de la sede y mapa. Las otras 16 sedes, en la landing |
| **Ayuda** | Centro de Ayuda + Buzón | Preguntas frecuentes, a quién escribir y el buzón, en un solo lugar |

- **Un solo menú de perfil**, en el pie de la barra lateral: Mis datos, contraseña, tema y cerrar sesión.
- **En celular, barra inferior con las 5 secciones.** Hoy el menú lateral se pliega y el alumno lo tiene que abrir.

## Reglas de texto (contra el "se nota la IA")

- Frases cortas y concretas, con mayúscula solo al inicio. Nada de "oficial", rayas de adorno ni chips de garantía.
- Estado vacío en una línea, con la acción siguiente si existe.
- Una cifra lleva su etiqueta y nada más (nada de "Récord" o "Global" debajo).
- Cursos con nombre completo y la sigla entre paréntesis (*Historia del Perú (HP)*), una vez confirmadas las siglas
  con Aula 20.
- Un nombre por semana en todas las secciones.

## Datos del prototipo

- **Reales** (de la intranet, sin enlaces):
  - ciclo Intensivo UNMSM;
  - 26 cursos con su área;
  - tres semanas con el tema de cada clase;
  - estructura del simulacro por áreas A–E;
  - columnas de notas;
  - puntaje mínimo de la carrera;
  - sede Breña y sus teléfonos;
  - estados del buzón.
- **De demostración**, marcados como tales en pantalla: el alumno, su código y sus notas de simulacro. La cuenta
  revisada no tenía simulacros calificados, y los datos de una persona real no se usan.
- **Sin campos de contraseña**: la entrada es un botón "Entrar con la cuenta de demostración". Así el prototipo publicado
  no pide credenciales a nadie.

## Técnica

- **Mismo repositorio**, segunda página de Vite en `/intranet/`, que reutiliza tokens y componentes de la landing.
- Rutas con react-router (`/intranet/clases`, `/intranet/simulacros`…). En Vercel hace falta una regla de reescritura
  para que los enlaces directos funcionen.
- Código en `src/intranet/` y datos en `src/intranet/content/`, con su fuente anotada como en la landing.
- Pruebas de la lógica de datos (semana actual, examen por área, distancia a la meta) y revisión con axe en los dos temas.

## Pendiente de confirmar con Aula 20

- Qué significan HP, HU, HM(A)/HM(B) y los sufijos ABC 1, ABC 2 y DE de Física y Química.
- Horario de cada sede y canal real para escribir al tutor.
- Si el día del simulacro semanal es siempre sábado. Así se ve en las fechas.
