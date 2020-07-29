import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'
import { CompareFieldsValidation } from '../validators/compare-fields/compare-fields-validation'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toStrictEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toStrictEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const validations = sut.field(field).min(length).build()
    expect(validations).toStrictEqual([new MinLengthValidation(field, length)])
  })

  test('Should return CompareFieldValidation', () => {
    const field = faker.database.column()
    const compareField = faker.database.column()
    const validations = sut.field(field).sameAs(compareField).build()
    expect(validations).toStrictEqual([new CompareFieldsValidation(field, compareField)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const validations = sut.field(field).required().min(length).email().build()
    expect(validations).toStrictEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})
