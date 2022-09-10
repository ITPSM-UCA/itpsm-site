/* eslint-disable default-param-last */
import { AnyAction } from 'redux'
import { AUTH_SUCCESS, LOGOUT } from './userActions'

const INITIAL_STATE = {
  id: null,
  token: null,
  tokenType: null,
  expires_at: null,
  platform_menus: [],
  userInformation: {},
}

const authSuccess = (state:any, { payload }:any) => ({
  ...state,
  id: payload.id,
  token: payload.token,
  tokenType: payload.token_type,
  expires_at: payload.expires_at,
  userInformation: payload.attributes,
  platform_menus: payload.platform_menus,
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
