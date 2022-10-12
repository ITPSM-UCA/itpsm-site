import apiInstance from 'instances/apiInstance'
import { onErrorHandler } from 'utils/alerts'

const enrollSubjects = async (subjects:any) => {
  try {
    console.log(subjects)
    const data = {
      subjects: subjects.map((item:any) => ({
        curriculum_subject_id: item.curriculum_subject_id,
        period_id: item.period_id,
        code: item.code,
        id_schedule:item.id_schedule
      })),
    }
    const response = await apiInstance.post('/enrollment/enroll-subjects', data)
    return response.data.data
  }
  catch (error:any) {
    onErrorHandler(error.response)
    return {
      errors: error.response.data?.errors ?? 'Error en la peticion',
    }
  }
}

export default enrollSubjects
