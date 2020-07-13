import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return erro if value is invalid', () => {
    const field = 'field'
    const sut = new MinLengthValidation(field, 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if value is valid', () => {
    const field = 'field'
    const sut = new MinLengthValidation(field, 5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})