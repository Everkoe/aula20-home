/**
 * Sesión de la cuenta de demostración. No hay usuarios ni contraseñas: entrar solo marca la pestaña.
 * sessionStorage la olvida al cerrar la pestaña; si está bloqueado, la sesión dura mientras la página esté abierta.
 */
const SESSION_KEY = 'aula20-demo-sesion'
let isSignedInMemory = false

export function isSignedIn(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1' || isSignedInMemory
  } catch {
    return isSignedInMemory
  }
}

export function signIn() {
  isSignedInMemory = true
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Almacenamiento bloqueado: basta con la variable en memoria.
  }
}

export function signOut() {
  isSignedInMemory = false
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // Nada que borrar.
  }
}
