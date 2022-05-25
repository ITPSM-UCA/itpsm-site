import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'
import { empty } from 'utils/helpers'

const getCurriculaForStudent = async (query: any, customQuery: any = null) => {
  let response
  try {
    let url = `${apiInstance.defaults.baseURL}/student-curricula?`
    url += `page[size]=${query.pageSize}&page[number]=${query.page + 1}`

    if (!empty(customQuery)) {
      url += `&query=${JSON.stringify(customQuery)}`
    }

    response = await apiInstance.get(url)

    response = response.data
    return response.data
  } catch (error:any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default getCurriculaForStudent
