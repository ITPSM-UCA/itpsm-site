import { combineReducers } from 'redux'
import userReducer from './User/userReducer'
import configReducer from './Config/configReducer'

const rootReducer = combineReducers({
  user: userReducer,
  config: configReducer,
})

export default rootReducer
