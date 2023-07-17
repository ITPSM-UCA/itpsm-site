import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const createCurriculum = async (data: any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/curricula`
    const transformData = { ...data, is_active: Number(data.is_active), is_approved: Number(data.is_approved) }

    response = await apiInstance.post(url, transformData, {
      headers:{
        'Content-Type': 'application/json',
      }
    })

    return response.data.data
  } catch (error: any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default createCurriculum
