import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/builder/validation-builder'
import { makeSignUpValidation } from './signup-validation-factory'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validation', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(3).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().build(),
      ...Builder.field('confirmation').required().sameAs('password').build()
    ]))
  })
})
