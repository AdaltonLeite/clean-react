import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, erroMessage } = useContext(Context)
  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} /> }
      {erroMessage && <span className={Styles.error}>{erroMessage}</span> }
    </div>
  )
}

export default FormStatus
