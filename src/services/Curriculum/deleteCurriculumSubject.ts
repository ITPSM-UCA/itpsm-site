import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const deleteCurriculumSubject = async (id:number) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/curriculum-subjects/${id}`

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

export default deleteCurriculumSubject
