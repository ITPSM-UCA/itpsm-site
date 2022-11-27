import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const createEvaluation = async (data: any) => {
  try {
    const url = `${apiInstance.defaults.baseURL}/evaluations`
    // eslint-disable-next-line camelcase
    let data_to_send = {}
    if (data.sub_eval) {
      data_to_send = {
        name: data.name,
        description: data.description,
        date: data.date,
        percentage: data.percentage,
        section_id: data.code,
        principal_id: data.sub_eval_id,
      }
    } else {
      data_to_send = {
        name: data.name,
        description: data.description,
        date: data.date,
        percentage: data.percentage,
        section_id: data.code,
        principal_id: null,
      }
    }

    console.log(data_to_send, url)
    const response = await apiInstance.post(url, data_to_send)

    return response.data.data
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default createEvaluation
