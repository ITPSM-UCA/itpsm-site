import { empty } from 'utils/helpers'
import { onErrorHandler } from 'utils/alerts'
import apiInstance from 'instances/apiInstance'

const GetEquivalenceByStudentId = async (id:number) => {
  try {
    let url = `${apiInstance.defaults.baseURL}/equivalence/${id}?`
    // url += `page[size]=${query.pageSize}&page[number]=${query.page + 1}`

    // if (!empty(query.search)) {
    //   url += `&filter=${query.search}`
    // }

    // if (!empty(query.orderDirection)) {
    //   url += `&sortOrder=${query.orderDirection}`
    // }

    // if (query?.orderBy) {
    //   url += `&sortColumn=${query.orderBy.field}`
    // }
    let response = await apiInstance.get(url,{
      headers:{
        'Content-Type': 'application/json',
      }
    })

    const rows:any = []

    // response.data.data.forEach((equivalence:any) => {
    //   rows.push({
    //     id: equivalence.id,
    //     ...equivalence.attributes,
    //   })
    // })

    // return {
    //   rows,
    //   page: response.data.meta.page,
    //   records: response.data.meta.records,
    // }
    response = response.data
    return response.data
    
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return equivalenceData
  }
}

const equivalenceData = {
  rows: [],
  page: 1,
  records: 0,
}

export default GetEquivalenceByStudentId
