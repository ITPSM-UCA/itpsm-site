import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const getEnrolledSubjects = async () => {
  let response
  try {
    response = await apiInstance.get('/enrollment/enrolled-curriculum-subjects')
    response = response.data
    return response.data
  } catch (error:any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default getEnrolledSubjects
