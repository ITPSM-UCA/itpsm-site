import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const deletePeriodSubject = async (subject:number, period: number, code: number) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/sections/${subject}_${period}_${code}`

    const response = await apiInstance.delete(url)

    return response.data.data
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default deletePeriodSubject
