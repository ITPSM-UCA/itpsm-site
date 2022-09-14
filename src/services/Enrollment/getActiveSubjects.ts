import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const getActiveSubjects = async () => {
  let response
  try {
    response = await apiInstance.get('/enrollment/active-subjects')
    console.log(response)
    response = response.data
    return response.data
  } catch (error:any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default getActiveSubjects
