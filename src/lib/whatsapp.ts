/**
 * Enlaces de WhatsApp y teléfono. El sitio actual enlaza `wa.me/912206403` sin código de país y
 * WhatsApp lo interpreta como +91 (India); por eso todo enlace sale de aquí y lleva el 51.
 */

const PERU_CODE = '51'
/** Celular peruano: 9 dígitos que empiezan con 9. */
const PERU_MOBILE = /^9\d{8}$/

function toPeruMobile(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  const local = digits.length === 11 && digits.startsWith(PERU_CODE) ? digits.slice(2) : digits
  if (!PERU_MOBILE.test(local)) {
    throw new Error(`"${phone}" no es un celular peruano de 9 dígitos`)
  }
  return local
}

export function buildWhatsAppLink(phone: string, message?: string): string {
  const base = `https://wa.me/${PERU_CODE}${toPeruMobile(phone)}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function formatPhone(phone: string): string {
  return toPeruMobile(phone).replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
}

/** Formato internacional (+51…), el que piden tel: y schema.org. */
export function internationalPhone(phone: string): string {
  return `+${PERU_CODE}${toPeruMobile(phone)}`
}

export function telHref(phone: string): string {
  return `tel:${internationalPhone(phone)}`
}
