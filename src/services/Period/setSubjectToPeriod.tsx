import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const setSubjectToPeriod = async (data: any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/sections`
    const transformData = { ...data }
   
    response = await apiInstance.post(url, transformData)

    return response.data.data
  } catch (error: any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default setSubjectToPeriod
