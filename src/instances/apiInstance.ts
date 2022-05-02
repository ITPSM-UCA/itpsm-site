import axios from 'axios'
import { API_URL } from 'config'

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/vnd.api+json',
  },
})

export default instance
