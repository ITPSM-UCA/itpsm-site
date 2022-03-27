/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head'
import Link from 'next/link'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LoginForm from 'components/Auth/LoginForm'

const Login: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Login - Site Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="https://itpsm.edu.sv/wp-content/uploads/2019/01/logo-ITPSM-p.jpg" alt="ITPSM" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t('auth:sign_in')}</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default Login
