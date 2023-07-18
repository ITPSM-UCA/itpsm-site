import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const createEquivalence = async (data: any) => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/equivalence`
    // const transformData = { ...data, is_active: Number(data.is_active), is_approved: Number(data.is_approved) }

    response = await apiInstance.post(url, data,{
      headers:{
        'Content-Type': 'application/json',
      }
    })

    return response.data.data
  } catch (error: any) {
    response = error.response.data
    onErrorHandler(error.response)
    return response
  }
}

export default createEquivalence
