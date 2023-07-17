import { empty } from 'utils/helpers'
import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const allTeachers = async () => {
  try {
    let url = `${apiInstance.defaults.baseURL}/teachers/all`
   

   
    const response = await apiInstance.get(url,{
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const rows:any = []



    return {
      records: response.data.data.attributes
    }
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return TeachersData
  }
}

const TeachersData = {
  rows: [],
  page: 1,
  records: 0,
}

export default allTeachers
