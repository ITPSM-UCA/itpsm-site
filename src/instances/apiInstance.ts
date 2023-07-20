/* eslint-disable no-param-reassign */
import axios from 'axios'
import { API_URL } from 'config'
import { empty } from 'utils/helpers'
import { initializeStore } from 'store'

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
})

const requestInterceptor = (config: any) => {
  const state = initializeStore(undefined)
  const { token } = state.getState().user

  if (!empty(token)) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

instance.interceptors.request.use(requestInterceptor)

export default instance
