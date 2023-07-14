import apiInstance from 'instances/apiInstance'

interface LoginRequest {
  email: string,
  password: string,
}

const login = async (data: LoginRequest) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/login`
    response = await apiInstance.post(url, data,{
      headers:{
        'Content-Type': 'application/json',
      }
    })
    return response.data.data
  } catch (error: any) {
    return { error: error?.response?.errors?.title ?? 'Su correo electrónico o contraseña es incorrecto. Revise e intente nuevamente.' }
  }
}

export default login
