import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'

type SutTypes = {
  sut: ValidationComposite
  FieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const FieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(FieldValidationsSpy)

  return {
    sut,
    FieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return erro if any validation fails', () => {
    const { sut, FieldValidationsSpy } = makeSut()
    FieldValidationsSpy[0].error = new Error('first_error')
    FieldValidationsSpy[1].error = new Error('second_error')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error')
  })
})
