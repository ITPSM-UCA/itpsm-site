import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const createUser = async (data: any) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/users`

    const response = await apiInstance.post(url, data)
    return response.data.data
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default createUser
