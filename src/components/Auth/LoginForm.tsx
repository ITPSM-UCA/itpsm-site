/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import Link from 'next/link'
import useUser from 'hooks/useUser'
import Eye from 'assets/icons/Auth/Eye'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Loader from 'components/UI/Loader'
import Colors from 'utils/constants/Colors'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomAlert from 'components/Alerts/CustomAlert'
import CustomInput from 'components/UI/Form/CustomInput'
import { login } from 'services/Auth'

const initialData = {
  email: '',
  password: '',
}

const LoginForm = () => {
  const router = useRouter()
  const { isAuthenticated, onSuccessfulLogin } = useUser()
  const { t } = useTranslation()

  const schema = yup.object().shape({
    email: yup.string().required(t('common:this_is_required')).email(t('auth:valid_email')),
    password: yup.string().required(t('common:this_is_required')),
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordIsHidden, setPasswordIsHidden] = useState(true)

  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    mode: 'onBlur',
    defaultValues: initialData,
    resolver: yupResolver(schema),
  })
  const { isSubmitting, errors } = formState

  const toogleHiddenPassword = () => {
    setPasswordIsHidden((show: boolean) => !show)
  }

  useEffect(() => {
    if (isAuthenticated) router.replace('/')
  }, [isAuthenticated])

  const onLogin = async (formData: any) => {
    setError('')
    setLoading(true)
    const data: any = await login(formData)

    if (data.error) {
      setLoading(false)
      setError(data.error)
      return
    }
    onSuccessfulLogin({
      ...data,
      token: data?.idToken,
    })
    setLoading(false)
  }

  let buttonText = <span>{t('auth:sign_in')}</span>

  if (loading) {
    buttonText = (
      <>
        <Loader className="h-5 w-5" />
        <span>
          {t('common:loading')}
          ...
        </span>
      </>
    )
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form noValidate onSubmit={handleSubmit(onLogin)} autoComplete="off" className="space-y-6">
          <CustomInput
            type="text"
            name="email"
            label={t('auth:email_address')}
            error={errors.email}
            disabled={isSubmitting}
            register={register}
            placeholder={t('auth:email_address')}
          />
          <div className="relative">
            <CustomInput
              type={passwordIsHidden ? 'password' : 'text'}
              name="password"
              label={t('auth:password')}
              error={errors.password}
              disabled={isSubmitting}
              register={register}
              placeholder={t('auth:password')}
            />
            <button
              type="button"
              className="absolute right-4 top-8"
              onClick={toogleHiddenPassword}
            >
              <Eye
                height={22}
                width={22}
                fill={passwordIsHidden ? Colors.gray : Colors.black}
              />
            </button>
          </div>

          <div className="flex items-center">
            <div className="text-sm">
              <Link href="/forgot-password">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  {t('auth:forgot_password')}
                </a>
              </Link>
            </div>
          </div>

          {(error !== '') && (
            <CustomAlert
              text={error}
              className="text-red-700 bg-red-100 mb-4"
              onClose={() => setError('')}
            />
          )}

          <div>
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
