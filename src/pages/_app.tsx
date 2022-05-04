/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css'
import Head from 'next/head'
import { useStore } from 'store'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { authCheckState } from 'store/User/userActions'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState)

  useEffect(() => {
    store.dispatch(authCheckState())
  }, [])

  return (
    <Provider store={store}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <div className="relative">
        <Component {...pageProps} />
        <div className="absolute right-3 top-3">
          {/* <SwitchLanguaje /> */}
        </div>
      </div>
    </Provider>
  )
}

export default appWithTranslation(MyApp)
