import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const createTeacher = async (data:any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/teachers`

    response = await apiInstance.post(url, data)

    response = response.data

    return response.data
  } catch (error:any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default createTeacher
