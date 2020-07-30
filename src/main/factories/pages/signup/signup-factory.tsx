import React from 'react'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { SignUp } from '@/presentation/pages'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../usecases/addAccount/remote-add-account-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      saveAccessToken={makeLocalSaveAccessToken()}
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
