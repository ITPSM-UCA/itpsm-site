import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const publishGrades = async (data: any) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/evaluations/publishgrades/${data}`

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

export default publishGrades
