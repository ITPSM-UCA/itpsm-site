import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getConfigurations } from 'services/Config'

export const UPDATE_CONFIG = 'UPDATE_CONFIG'

const updateConfig = (payload: any) => ({
  type: UPDATE_CONFIG,
  payload,
})

export const getInitialConfig = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await getConfigurations()
  dispatch(updateConfig(response))
}
