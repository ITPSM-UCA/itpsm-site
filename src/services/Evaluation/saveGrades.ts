import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const saveGrades = async (grades:any) => {
  try {
 
    const data = {
      grades: grades,
    }
    const response = await apiInstance.post('score/insertGrades', data)
    return response.data.data
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default saveGrades
