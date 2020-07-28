import React, { useState } from 'react'
import Styles from './signup-style.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    mainError: '',
    emailError: 'Campo obrigatório',
    nameError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: state }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button disabled data-testid='submit' className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Voltar Para Login</span>
          {/* <Link to='/login' className={Styles.link}>Voltar Para Login</Link> */}
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
