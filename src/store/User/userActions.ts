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

export const logout = () => {
  localStorage.removeItem('appState')

  return {
    type: LOGOUT,
  }
}
