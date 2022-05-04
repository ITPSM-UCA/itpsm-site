import axios from 'axios'
import { API_URL } from 'config'

const AxiosITPSMInstance = axios.create({
  baseURL: API_URL,
})

export default AxiosITPSMInstance
