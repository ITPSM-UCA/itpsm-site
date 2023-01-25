import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const defaultData = { code: '', name: '' }

const createModule = async (data: any) => {
    try {
        const { code, name } = data
        const url = `${apiInstance.defaults.baseURL}/subjects`
        const response = await apiInstance.post(url, { code: code.toString(), name })
        
        return response.data.data
    }
    catch(error: any) {
        onErrorHandler(error.response)
        return defaultData
    }
}

export default createModule