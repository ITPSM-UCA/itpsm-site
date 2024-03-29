import apiInstance from 'instances/apiInstance'
import { json } from 'stream/consumers'
import { onErrorHandler } from 'utils/alerts'

const createCareer = async (data: any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/careers`
    const transformData = { ...data }

    response = await apiInstance.post(url, JSON.stringify(data))

    return response.data.data
  } catch (error: any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default createCareer
