import { ValidationBuilder as Builder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('name').required().min(3).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().build(),
    ...Builder.field('confirmation').required().sameAs('password').build()
  ])
}
