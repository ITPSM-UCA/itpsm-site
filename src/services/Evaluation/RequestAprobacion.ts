import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const RequestAprobacion = async (data: any) => {
  console.log(data.id)
  try {
    const url = `${apiInstance.defaults.baseURL}/requestAprobacion/${data.id}`

    const response = await apiInstance.put(url,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.data
  } catch (error: any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default RequestAprobacion
