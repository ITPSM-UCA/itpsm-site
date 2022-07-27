import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const createCurriculum = async (data: any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/curricula`
    const transformData = { ...data, is_active: data.is_active ? 1 : 0, is_approved: data.is_approved ? 1 : 0 }

    response = await apiInstance.post(url, transformData)

    response = response.data

    return response.data
  } catch (error: any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default createCurriculum
