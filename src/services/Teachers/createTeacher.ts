import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const createTeacher = async (data:any) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/teachers`

    const response = await apiInstance.post(url, JSON.stringify(data))
    return response.data.data
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default createTeacher
