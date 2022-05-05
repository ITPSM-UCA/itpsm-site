/* eslint-disable no-param-reassign */
import axios from 'axios'
import { API_URL } from 'config'
import { initializeStore } from 'store';
import { empty } from 'utils/helpers';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/vnd.api+json',
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
