/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const withAuth = (WrappedComponent:any) => ((props:any) => {
  const Router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const appState = JSON.parse(localStorage.getItem('appState') || '{}')
    const accessToken = appState?.token

    if (!accessToken) {
      Router.replace('/login')
      return
    }

    setIsAuthorized(true)
  }, [])

  if (!isAuthorized) {
    return null
  }

  return <WrappedComponent {...props} />
})

export default withAuth
