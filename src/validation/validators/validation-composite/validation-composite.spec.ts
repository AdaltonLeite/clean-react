import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  FieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const FieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(FieldValidationsSpy)

  return {
    sut,
    FieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return erro if any validation fails', () => {
    const errorMessage = faker.random.words()
    const fieldName = faker.database.column()
    const { sut, FieldValidationsSpy } = makeSut(fieldName)
    FieldValidationsSpy[0].error = new Error(errorMessage)
    FieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })
  test('Should return falsy if there is no error', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
