/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css'
import { useStore } from 'store'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import SwitchLanguaje from 'components/UI/SwitchLanguaje'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
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
