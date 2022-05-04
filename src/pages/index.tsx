import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useUser from 'hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isAuthenticated } = useUser()

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard')
  }, [isAuthenticated])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-2">
          {t('home:welcome_to')}
          {' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Dashboard!
          </a>
        </h1>
        <Link href="/login">
          <a className="font-medium text-indigo-600 hover:text-indigo-500">{t('auth:sign_in')}</a>
        </Link>
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Decima
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default Home
