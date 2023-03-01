import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'
import { empty } from 'utils/helpers'

const defaultData = { rows: [], page: 1, records: 0 }

const getCurriculaByModuleId = async (materialTableQuery: any, id: number) => {
    try {
        let url = `${apiInstance.defaults.baseURL}/curriculum-subjects/getcurriculabysubjectid?id=${id}&`
        url += `page[size]=${materialTableQuery.pageSize}&page[number]=${materialTableQuery.page + 1}`

        if (!empty(materialTableQuery.search)) {
            url += `&filter=${materialTableQuery.search}`
        }
    
        if (!empty(materialTableQuery.orderDirection)) {
            url += `&sortOrder=${materialTableQuery.orderDirection}`
        }
    
        if (materialTableQuery?.orderBy) {
            url += `&sortColumn=${materialTableQuery.orderBy.field}`
        }

        const rows: any[] = [], response = await apiInstance.get(url)

        response.data.data.forEach((subject: any) => {
            rows.push({ id: id, ...subject.attributes })
        })

        return { rows, page: response.data.meta.page, records: response.data.meta.records }
    }
    catch(error: any) {
        onErrorHandler(error.response)
        return defaultData
    }
}

export default getCurriculaByModuleId