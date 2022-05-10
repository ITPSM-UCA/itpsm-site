import { empty } from 'utils/helpers'
import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const getTeachers = async (query:any) => {
  try {
    let url = `${apiInstance.defaults.baseURL}/teachers?`
    url += `page[size]=${query.pageSize}&page[number]=${query.page + 1}`

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

    response.data.data.forEach((teacher:any) => {
      rows.push({
        id: teacher.id,
        ...teacher.attributes,
      })
    })

    return {
      rows,
      page: response.data.meta.page,
      records: response.data.meta.records,
    }
  }
  catch (error:any) {
    console.log(error)
    onErrorHandler(error.response)
    return TeachersData
  }
}

const TeachersData = {
  rows: [],
  page: 1,
  records: 0,
}

export default getTeachers
