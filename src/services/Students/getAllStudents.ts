import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const getAllStudents = async () => {
  try {
    const url = `${apiInstance.defaults.baseURL}/allstudents?`

    const response = await apiInstance.get(url)

    return response.data
  } catch (error: any) {
    onErrorHandler(error.response)
    return studentsData
  }
}

const studentsData = {
  rows: [],
  page: 1,
  records: 0,
}

export default getAllStudents
