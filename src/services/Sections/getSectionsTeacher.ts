import { empty } from 'utils/helpers'
import { onErrorHandler } from 'utils/alerts'
import apiInstance from 'instances/apiInstance'


const getSectionsTeacher = async (query:any, customQuery:any = null) => {
  try {
    let url = `${apiInstance.defaults.baseURL}/teacher/section?=`

    if (query.page) {
      url += `page[size]=${query.pageSize}&page[number]=${query.page + 1}`
    }

    if (!empty(customQuery)) {
      url += `&query=${JSON.stringify(customQuery)}`
    }

    if (!empty(query.search)) {
      url += `&filter=${query.search}`
    }

    if (!empty(query.orderDirection)) {
      url += `&sortOrder=${query.orderDirection}`
    }

    if (query?.orderBy) {
      url += `&sortColumn=${query.orderBy.field}`
    }
    const response = await apiInstance.get(url)

    const rows:any = []

    response.data.data.forEach((curriculum:any) => {
      rows.push({
        id: curriculum.id,
        ...curriculum.attributes,
      })
    })

    return {
      rows,
      page: response.data.meta.page,
      records: response.data.meta.records,
    }
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return studentsData
  }
}

const studentsData = {
  rows: [],
  page: 1,
  records: 0,
}

export default getSectionsTeacher
