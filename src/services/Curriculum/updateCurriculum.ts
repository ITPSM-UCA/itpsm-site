import axios from 'axios'
import { API_URL } from 'config'

interface LoginRequest {
  email: string,
  password: string,
}

const login = async (data: LoginRequest) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data)
    return response.data.data
  } catch (error: any) {
    return { error: error?.response?.errors?.title ?? 'Su correo electrónico o contraseña es incorrecto. Revise e intente nuevamente.' }
  }
}

export default login
