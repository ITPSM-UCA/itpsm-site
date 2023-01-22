import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const defaultData = { code: '', name: '' }

const createModule = async (data: any) => {
    try {
        const url = `${apiInstance.defaults.baseURL}/subjects?code=${data.code}&name=${data.name}`
        const response = await apiInstance.post(url)
        
        return response.data.data
    }
    catch(error: any) {
        console.log(error)
        onErrorHandler(error.response)
        return defaultData
    }
}

export default createModule