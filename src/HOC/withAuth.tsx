/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from 'next/router'

const withAuth = (WrappedComponent:any) => ((props:any) => {
  if (typeof window === 'undefined') return null

  const Router = useRouter()

  const appState = JSON.parse(localStorage.getItem('appState') || '{}')
  const accessToken = appState?.token

  if (!accessToken) {
    Router.replace('/login')
    return null
  }

  return <WrappedComponent {...props} />
})

export default withAuth
