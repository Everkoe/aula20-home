# Auditoría de la intranet de Aula 20

Revisada el 2026-11-04 en `intranet.aula20.edu.pe`, con una cuenta de alumna (ciclo Intensivo UNMSM, sede Breña),
pantalla por pantalla y leyendo los datos que cada página recibe. Solo lectura: no se envió ningún formulario.
Este documento no copia datos personales de la cuenta; donde importa, se dice qué tipo de dato es.

Los datos académicos que sí sirven para la nueva intranet están en [`datos-intranet-2026-11-04.json`](datos-intranet-2026-11-04.json).

## 1. Cómo está hecha

- **Laravel 12 + Inertia + Vue 3**, armada sobre el **kit oficial de Laravel con Vue**: conserva sus rutas
  (`settings/password`, `settings/appearance`, `register`, `verify-email`) y su pantalla de Configuración sin tocar.
- Interfaz de **shadcn-vue con sus valores por defecto**: barra lateral plegable, migas de pan, buscador `Ctrl K`,
  radio de 0.625 rem, grises neutros y el azul `blue-700` de Tailwind como primario.
- Tipografía **Geist** (la de shadcn). Además carga Instrument Sans (la del kit) y no la usa.
- Las rutas llegan al navegador con **Ziggy**.

## 2. Mapa

| Grupo del menú | Pantalla | Qué hace |
|---|---|---|
| — | Inicio | Saludo, ficha del alumno y 6 tarjetas de métricas de simulacros, curva de evolución y desglose |
| Rendimiento | Notas Simulacro | Tabla de resultados (Act, HV, HM, Matemáticas, Letras, Ciencias, total) y comparativa por examen |
| Rendimiento | Ranking | Puesto en el salón y en el área |
| Contenido académico | Simulacros | Por semana: examen de habilidades y de conocimientos por área, claves y solucionario (PDF) |
| Contenido académico | Materiales | Por semana: un PDF por curso |
| Contenido académico | Grabaciones | Por semana: tema de la clase y enlace a la grabación de Zoom |
| Mi academia | Mi Sede | Sede asignada, mapa, teléfonos, datos de la matrícula y las otras 16 sedes |
| Mi academia | Eventos | Cartelera con filtros (presencial, virtual, híbrido, gratuitos) |
| Mi academia | Buzón de Ideas | Sugerencias con categoría y estado (enviado → implementado) |
| Mi cuenta | Mis Datos | Datos del alumno y del responsable de pago, foto de perfil |
| Mi cuenta | Configuración | Contraseña y apariencia (pantalla del kit) |
| Pie | Centro de Ayuda | Diálogo con tutoría, sede, buzón y 4 preguntas frecuentes |

## 3. Por qué "se nota la IA"

Es el patrón de un generador de dashboards, no una interfaz pensada para un alumno de academia:

- **Misma cabecera en todas las páginas**: ícono en cuadro, título, píldora con contador, frase descriptiva y chips de
  "garantía" que no dicen nada: *Contenido oficial para tu salón*, *Historial de evaluaciones oficiales*,
  *Cartelera Oficial para Alumnos*, *Sede Asignada en tu Matrícula Activa*.
- **Texto de relleno**: *"A medida que rindas tus exámenes semanales, aquí verás proyectada tu curva de rendimiento y
  avance continuo"*, *"Vive la experiencia de Aula 20 — Conoce las amanecidas…"*, *"Directorio oficial de todos
  nuestros campus"*, *"Ubicación Satelital y Mapa"*. Mayúscula en cada palabra (*Eventos y Actividades*), raya larga
  como adorno y la palabra "oficial" repetida.
- **Etiquetas decorativas**: cada métrica de Notas lleva una segunda etiqueta sin significado (*Récord*, *Global*,
  *Destacado*, *Pico más alto alcanzado*, *Rendimiento constante*).
- **Estados vacíos dobles**: un guion y dos frases que dicen lo mismo (*"Aún no rindes simulacros." / "Aún no registras
  exámenes calificados."*), repetido en seis tarjetas de Inicio. En Eventos, siete contadores en cero.
- **Todo duplicado**:
  - Hay dos menús de perfil iguales (barra lateral y encabezado), cada uno con *Configuración* y *Cerrar sesión*.
  - El Buzón de Ideas se abre desde cuatro lugares: menú, botón del encabezado, banner de Inicio y Centro de Ayuda.
  - El tema se cambia en el encabezado y otra vez en Configuración → Apariencia.
- **Fuera de la marca**:
  - El azul es el `blue-700` por defecto de Tailwind, no el `#002cff` de Aula 20, y la menta no aparece.
  - El buzón es ámbar y las tarjetas de Inicio llevan fondos lila, naranja y amarillo.
  - La fuente es Geist, no la de la landing.
  - No queda nada del lenguaje de la landing: ni cuadrícula, ni cartilla, ni resaltador.

## 4. Errores e incoherencias

- **Contadores que no cuadran**: Materiales dice *"0 recursos"* y *"0 materiales en 3 semanas"* encima de 70 archivos.
- **Columna vacía**: en Materiales la columna *Descripción* es siempre "-".
- **Una semana con dos nombres**: *INTRODUCTORIO I* en Materiales y Simulacros, *INTRODUCCIÓN 1* en Grabaciones.
  - Los rangos tampoco coinciden: lunes a domingo, lunes a viernes o lunes a sábado según la página.
  - Todas las grabaciones llevan como fecha el lunes de su semana, no el día de la clase.
- **Cursos sin criterio**:
  - Las tildes van a medias (*FISICA* y *QUÍMICA*, *QUIMICA ABC 1*).
  - Hay siglas que nunca se explican: *HP*, *HU*, *HM(A)*, *HM(B)*, *ABC 1*, *DE*.
  - Todo va en mayúsculas.
- **Simulacros del área E mal clasificados**:
  - Los exámenes del área E (Humanidades, la de esta alumna) están cargados como *General* y no en su fila. Las áreas A–D sí la tienen.
  - La alumna tiene que buscar su examen entre los de todos.
  - Hay erratas en los archivos (*CONOCIMEINTOS*).
- **Diseño roto**:
  - En Simulacros los nombres de área se parten palabra por palabra y se montan sobre los botones.
  - En Mi Sede la dirección queda en una columna de una palabra por línea.
- **Datos internos a la vista**: Mi Sede muestra el código interno de la sede y su `slug`. Mis Datos muestra el nombre
  del asesor comercial.
- **Configuración** es la pantalla del kit tal cual:
  - Usa otro encabezado y otras migas de pan.
  - Los diálogos dicen *"Close"* en inglés.
- **Ayuda que no ayuda**:
  - *"Comunícate con tu tutor asignado"*, pero no dice quién es ni cómo escribirle.
  - El horario de la sede es *"Lunes a Sábado"*, sin horas.
- **Inicio sin lo útil**: un alumno nuevo ve seis tarjetas vacías. No aparece lo que necesita cada día: qué toca esta
  semana, la separata y la grabación de hoy, el simulacro del sábado.
- **Teléfonos de sedes**: hay números repetidos entre sedes y formatos mezclados (con y sin espacios).

## 5. Seguridad y privacidad (para avisar a Aula 20)

Lo siguiente se ve en los datos que la propia página entrega al navegador. No se probó nada más allá de eso.

1. **Cada página manda la ficha completa de matrícula**, tres veces (`matricula`, `matriculaSeleccionada`,
   `misMatriculas`), con unos 110 campos. Incluyen:
   - el pago: montos, forma de pago, número de operación y nombre del archivo del voucher;
   - la factura: RUC y razón social;
   - los datos del responsable de pago: documento, celular, correo y dirección;
   - información interna: el asesor comercial, los campos de comisión y observaciones como la tarifa aplicada.

   La pantalla no muestra casi nada de esto, pero cualquiera lo lee con las herramientas del navegador. Hay que mandar
   a cada vista solo lo que pinta.
2. **La lista de rutas completa viaja al navegador** (Ziggy), con las de administración y la de subida a `storage`.
   Conviene filtrarla.
3. **Los PDF de materiales y exámenes están en URLs públicas del CDN**, sin sesión: quien tenga el enlace los descarga.
   Para contenido pagado, mejor enlaces firmados que caduquen.
4. **Las grabaciones son enlaces directos de Zoom.**
5. **Sigue la ruta `register` del kit.** No se comprobó si el registro público está abierto.

## 6. Qué se conserva para la nueva intranet

La información es buena y se reutiliza tal cual:

- cursos con su área;
- semanas con el tema de cada clase;
- simulacro semanal por área, con habilidades, conocimientos, claves y solucionario;
- notas por bloque (Act, HV, HM, Matemáticas, Letras, Ciencias);
- puntaje mínimo de la carrera objetivo como meta;
- sedes con teléfono;
- buzón con estados;
- eventos por modalidad.

Lo que cambia es cómo se ordena y se presenta.
