import { empty } from 'utils/helpers'
import { onErrorHandler } from 'utils/alerts'
import apiInstance from 'instances/apiInstance'

const getCurricula = async (query:any) => {
  try {
    let url = `${apiInstance.defaults.baseURL}/curricula?`
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

export default getCurricula
