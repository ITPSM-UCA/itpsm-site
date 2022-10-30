import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const getSubjects = async (data: any) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/section/getsubjects/${data}`

    const response = await apiInstance.get(url, data)
    return response.data.data.period_sections
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default getSubjects
