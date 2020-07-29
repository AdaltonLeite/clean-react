export class InvalidFieldError extends Error {
  constructor (readonly field?: string) {
    super(`Campo ${field || ''} inválido `)
    this.name = 'InvalidFieldError'
  }
}
