/* eslint-disable default-param-last */
import { AnyAction } from 'redux'
import { UPDATE_CONFIG } from './configActions'

interface Config{
  careers: Array<any>,
  countries: Array<any>,
  subjects: Array<any>,
  curricula: Array<any>
}

const INITIAL_STATE: Config = {
  careers: [],
  countries: [],
  subjects: [],
  curricula: [],
}

const reducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_CONFIG:
      return updateConfig(state, action)
    default:
      return state
  }
}

const updateConfig = (state: Config, { payload }: AnyAction) => ({
  ...state,
  ...payload,
})

export default reducer
