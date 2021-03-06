import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (minLength: number = 5, field: string = faker.database.column()): MinLengthValidation => new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  test('Should return erro if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(5, field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(5, field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const field = faker.database.column()
    const sut = makeSut(5, field)
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
