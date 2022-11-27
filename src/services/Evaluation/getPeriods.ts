import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const getPeriods = async (data: any) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/enrollments_student/${data}`

    const response = await apiInstance.get(url, data)
    console.log(response.data)
    return response.data.data.attributes.enrollment
  } catch (error: any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default getPeriods
