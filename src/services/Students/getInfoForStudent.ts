import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const getInfoForStudent = async (data: any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/student-curricula/${data}`

    response = await apiInstance.get(url)

    response = response.data
    return response.data
  } catch (error: any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default getInfoForStudent
