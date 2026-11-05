import { BookOpenText, ClipboardList, House, LifeBuoy, MapPin, type LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

/** Las cinco secciones (la intranet actual tiene once entradas). Mi cuenta se abre desde el nombre de la alumna. */
export const navItems: NavItem[] = [
  { to: '/inicio', label: 'Inicio', icon: House },
  { to: '/clases', label: 'Clases', icon: BookOpenText },
  { to: '/simulacros', label: 'Simulacros', icon: ClipboardList },
  { to: '/sede', label: 'Mi sede', icon: MapPin },
  { to: '/ayuda', label: 'Ayuda', icon: LifeBuoy },
]
