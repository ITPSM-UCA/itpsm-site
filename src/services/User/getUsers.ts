import { empty } from 'utils/helpers'
import { onErrorHandler } from 'utils/alerts'
import apiInstance from 'instances/apiInstance'

const getUsers = async (query:any) => {
  try {
    let url = `${apiInstance.defaults.baseURL}/users?`
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
    const response = await apiInstance.get(url,{
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const rows:any = []

    response.data.data.forEach((period:any) => {
      rows.push({
        id: period.id,
        ...period.attributes,
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
    return periodData
  }
}

const periodData = {
  rows: [],
  page: 1,
  records: 0,
}

export default getUsers
