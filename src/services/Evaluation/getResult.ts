import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const publishResult = async (data: any) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/comments/${data}`

    const response = await apiInstance.get(url)
    return response.data
  } catch (error: any) {
    console.log(error)
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default publishResult
