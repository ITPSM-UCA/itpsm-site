import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const RequestAprobacion = async (id: any) => {
  console.log(id)
  try {
    const url = `${apiInstance.defaults.baseURL}/curriculum-subjects/getsubjectsbystudentid/${id}`

    const response = await apiInstance.get(url)
    console.log(response.data.data.data,"respeusta")
    return response.data.data
  } catch (error: any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default RequestAprobacion

