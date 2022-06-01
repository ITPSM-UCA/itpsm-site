import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const updateStudent = async (data:any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/students/${data.id}`

    response = await apiInstance.put(url, data)

    response = response.data

    return response.data
  } catch (error:any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default updateStudent
