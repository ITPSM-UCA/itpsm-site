import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const createModule = async (data: any) => {
    try {
        const { code, name } = data
        const url = `${apiInstance.defaults.baseURL}/subjects`
        const response = await apiInstance.post(url, JSON.stringify({ code: code.toString(), name }))
        
        return response.data.data
    }
    catch(error: any) {
        return onErrorHandler(error.response)
    }
}

export default createModule