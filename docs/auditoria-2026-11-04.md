# Auditoría de aula20.edu.pe · 2026-11-04

Home revisado en 1440 × 900, 800 × 900 y 375 × 812 (navegador integrado), más el DOM y la red.
Stack observado: Laravel + Inertia + Vue, Tailwind 4, Swiper Element, Montserrat.

## Crítico

1. **WhatsApp sin código de país.** Matrícula, Matricúlate aquí, botón flotante y pie apuntan a
   `wa.me/912206403`. WhatsApp exige formato internacional y lo lee como +91 (India).
   Correcto: `wa.me/51912206403`. Confirmar desde un celular.

## Alto

2. **Portada recortada en escritorio y tablet.** Banners 1920×802 en una caja de 780 px con
   `object-fit: cover`: a 1440 se pierde ~24 % del ancho ("659" sin el 6, "UNI", "INICIO: NOV. 0…").
   Entre 640 y 1024 px solo se lee "59 …SANTES".
3. **Tarjetas de ciclos deformadas.** Imágenes 1080×1080 a 247×288 con `object-fit: fill` (~17 %).
4. **Información dentro de imágenes.** Precios, horarios, sedes, fechas y el teléfono del banner
   "Comunícate" no son texto: ilegibles en móvil, no indexables, no accesibles.
5. **Portada sin clic ni H1.** 8 slides sin enlace; la página empieza en H2. En móvil y tablet el
   botón de matrícula queda dentro del menú y se prioriza Intranet.
6. **"¿Por qué prepararme en Aula 20?" no da razones.** Tres fotos en carrusel, sin `alt`, con carga
   tardía; "Ver Tutores" lleva a /nosotros.

## Medio

7. Grilla de 11 ciclos en 5 columnas: Callao queda sola; todas iguales y sin información; en móvil
   ~1700 px de bloques azules.
8. Barra flotante de redes tapa tarjetas en escritorio; redes repetidas 3 veces.
9. Carrusel de cachimbos: puntos sobre el nombre de la carrera en móvil; errata "ING. TRANPORTE".
10. Dos lenguajes visuales (interfaz limpia vs. flyers de redes) y todo en el mismo azul saturado.
11. Home con 4 secciones; la prueba social va casi al final; faltan ciclos con datos y sedes.

## Pulido

12. Redacción: minúsculas en nombres propios, "muchás", "..", título "Bienvenido a la pagina oficial",
    "Matrículas 2026" vs. "Admisión 2027-I".
13. Accesibilidad: `alt="logounmsm"` ×11, 6 imágenes sin `alt`, textos de 10–11 px, 49/64 imágenes
    sin ancho y alto.
14. Rendimiento: 103 `modulepreload` (incluye código del panel: `FormAgregarCiclo`,
    `AuthenticatedLayout`, `useDatatable`, `lodash`), ~250 peticiones, LCP ~4,1 s en la prueba.

## Lo que está bien

Menú móvil, banner móvil propio en 4:5, pie ordenado con Libro de Reclamaciones, encabezado fijo,
modo oscuro.
