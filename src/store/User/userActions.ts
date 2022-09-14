import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { empty } from 'utils/helpers'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTO_SIGN_IN = 'AUTO_SIGN_IN'
export const LOGOUT = 'LOGOUT'

export const authSuccess = (userInfo:any) => {
  localStorage.setItem('appState', JSON.stringify(userInfo))
  return {
    type: AUTH_SUCCESS,
    payload: {
      ...userInfo,
    },
  }
}

export const authCheckState = () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const appState = JSON.parse(localStorage.getItem('appState') || '{}')

  if (empty(appState)) {
    dispatch(logout())
  }
  else {
    const expirationDate = appState.expires_at

    if (expirationDate <= new Date()) {
      dispatch(logout())
    }
    else {
      dispatch(authSuccess(appState))
      dispatch(checkAuthTimeout((new Date(expirationDate).getTime() - new Date().getTime()) / 1000))
    }
  }
}

export const checkAuthTimeout = (expirationTime:number) => ((dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  setTimeout(() => {
    dispatch(logout())
  }, expirationTime * 1000)
})

export const logout = () => {
  localStorage.removeItem('appState')

  return {
    type: LOGOUT,
  }
}
