import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const updatePeriod = async (id: number, data: any) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/periods/${id}`

    const response = await apiInstance.put(url, data)
    return response.data.data
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default updatePeriod
