import AxiosITPSMInstance from 'instance/AxiosITPSMInstance'

interface LoginRequest {
  email: string,
  password: string,
}

const login = async (data: LoginRequest) => {
  try {
    const response = await AxiosITPSMInstance.post('/api/login', data)
    return response.data.data
  } catch (error: any) {
    return { error: error?.response?.errors?.title ?? 'Su correo electrónico o contraseña es incorrecto. Revise e intente nuevamente.' }
  }
}

export default login
