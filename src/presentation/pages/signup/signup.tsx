import React, { useState, useEffect } from 'react'
import Styles from './signup-style.scss'
import { useHistory, Link } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    name: '',
    email: '',
    password: '',
    confirmation: '',
    emailError: '',
    nameError: '',
    passwordError: '',
    confirmationError: ''
  })
  useEffect(() => {
    const { name, email, password, confirmation } = state
    const formData = { name, email, password, confirmation }
    const emailError = validation.validate('email', formData)
    const nameError = validation.validate('name', formData)
    const passwordError = validation.validate('password', formData)
    const confirmationError = validation.validate('confirmation', formData)
    setState({
      ...state,
      emailError,
      nameError,
      passwordError,
      confirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!confirmationError
    })
  }, [state.name, state.email, state.password, state.confirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        confirmation: state.confirmation
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="confirmation" placeholder="Repita sua senha" />
          <SubmitButton text='Cadastrar' />
          <Link replace to='/login' data-testid='login-link' className={Styles.link}>Voltar Para Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
