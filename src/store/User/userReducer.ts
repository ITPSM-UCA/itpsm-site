/* eslint-disable default-param-last */
import { AnyAction } from 'redux'
import { AUTH_SUCCESS, LOGOUT } from './userActions'

const INITIAL_STATE = {
  id: null,
  name: 'Alvaro Garcia',
  token: null,
  expirationDate: null,
}

const authSuccess = (state:any, { payload }:any) => ({
  ...state,
  id: payload.userId,
  name: payload.name,
  token: payload.idToken,
  expirationDate: payload.expirationDate,
})

const logout = () => (INITIAL_STATE)

const reducer = (state = INITIAL_STATE, action:AnyAction) => {
  switch (action.type) {
    case AUTH_SUCCESS: return authSuccess(state, action)
    case LOGOUT: return logout()
    default:
      return state
  }
}

export default reducer
