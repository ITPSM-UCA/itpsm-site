import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const setSubjectToCurriculum = async (data: any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/curriculum-subjects`

    response = await apiInstance.post(url, data)

    return response.data.data
  } catch (error: any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default setSubjectToCurriculum
