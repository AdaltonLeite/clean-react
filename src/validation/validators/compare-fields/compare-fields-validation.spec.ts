import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return erro if compare is invalid', () => {
    const field = faker.database.column()
    const secondField = faker.database.column()
    const sut = makeSut(field, secondField)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(field))
  })
})
