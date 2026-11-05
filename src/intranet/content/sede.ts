/**
 * Contacto de las sedes como lo muestra la intranet actual en "Mi Sede" (2026-11-04).
 * Dirección y referencia vienen de src/content/sedes.ts (la web pública); aquí solo lo que la web no publica.
 * La intranet dice "Lunes a Sábado" sin horas; hay números repetidos entre sedes (pendiente de confirmar).
 */

export const contactoSedes: Record<string, { nombre: string; whatsapp: string[] }> = {
  brena: { nombre: 'Breña', whatsapp: ['905453074', '908819602'] },
}

export const horarioSede = 'Lunes a sábado'
