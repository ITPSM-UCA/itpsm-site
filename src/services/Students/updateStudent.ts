import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const updateStudent = async (data:any) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/students/${data.id}`

    const response = await apiInstance.put(url, data)
    return response.data
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return error.response.data
  }
}

export default updateStudent
