import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const curriculaRegistrationForStudent = async (data:any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/student-curricula`

    response = await apiInstance.post(url, data)

    response = response.data
    return response.data
  } catch (error:any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default curriculaRegistrationForStudent
