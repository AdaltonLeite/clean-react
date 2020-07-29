export interface Validation {
  validate: (fieldName: string, fieldValue: object) => string
}
