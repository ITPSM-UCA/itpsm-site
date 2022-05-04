/* eslint-disable no-unsafe-finally */
import { empty } from 'utils/helpers'
import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const getStudents = async (query:any, token:string) => {
  let studentsData = {
    rows: [],
    page: 1,
    records: 0,
  }

  try {
    let url = `${apiInstance.defaults.baseURL}/students?`
    url += `page[size]=${query.pageSize}&page[number]=${query.page + 1}&filter=${query.search}`

    if (!empty(query.orderDirection)) {
      url += `&sortOrder=${query.orderDirection}`
    }

    if (!empty(query.orderBy)) {
      url += `&sortColumn=${query.orderBy.field}`
    }

    const response = await apiInstance.get(url, {
      headers: {
        Authorization: token,
      },
    })

    const rows:any = []

    response.data.data.forEach((student:any) => {
      rows.push({
        id: student.id,
        ...student.attributes,
      })
    })

    studentsData = {
      rows,
      page: response.data.meta.page,
      records: response.data.meta.records,
    }
  }
  catch (error:any) {
    onErrorHandler(error.response)
  }
  finally {
    return studentsData
  }
}

export default getStudents
