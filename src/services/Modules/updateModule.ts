import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const updateModule = async (data: any) => {
    try {
        const { code, name } = data
        const url = `${apiInstance.defaults.baseURL}/subjects/${data.id}`
        const response = await apiInstance.put(url, { code: code.toString(), name })
        
        console.log(response)
        return response.data.data;
    }
    catch(error: any) {
        return onErrorHandler(error.response)
    }
}

export default updateModule