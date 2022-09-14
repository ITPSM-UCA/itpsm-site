import apiInstance from 'instances/apiInstance'

const getApprovedSujects = async () => {
  let response
  try {
    const url = `${apiInstance.defaults.baseURL}/enrollment/approved-subjects`

    response = await apiInstance.get(url)

    response = response.data

    // return response.data
    return approvedSubjects
  } catch (error: any) {
    response = error.response.data
    return response
  }
}

export default getApprovedSujects

const approvedSubjects = [
  {
    final_score: 8,
    is_approved: 1,
    curriculum_subject_id: 1,
    period_id: 3,
    code: 1,
    enrollment: 1,
    period_year: 2022,
    period_code: 3,
    curriculum_subject_label: 'Propiedades de los Agregados Pétreos y Cementos Hidráulicos',
    curriculum_label: 'Plan 2019-2020 de la carrera Técnico en Ingeniería de Construcción',
    career_label: 'Técnico en Ingeniería de Construcción',
    teacher_name: 'Hugo Lizama',
  },
  {
    final_score: 8.8,
    is_approved: 1,
    curriculum_subject_id: 1,
    period_id: 2,
    code: 1,
    enrollment: 1,
    period_year: 2022,
    period_code: 2,
    curriculum_subject_label: 'Inglés técnico',
    curriculum_label: 'Plan 2019-2020 de la carrera Técnico en Ingeniería de Construcción',
    career_label: 'Técnico en Ingeniería de Construcción',
    teacher_name: 'Cristian Ayala',
  },
  {
    final_score: 7,
    is_approved: 1,
    curriculum_subject_id: 1,
    period_id: 3,
    code: 1,
    enrollment: 1,
    period_year: 2022,
    period_code: 3,
    curriculum_subject_label: 'Instalaciones Hidráulicas',
    curriculum_label: 'Plan 2019-2020 de la carrera Técnico en Ingeniería de Construcción',
    career_label: 'Técnico en Ingeniería de Construcción',
    teacher_name: 'Hugo Lizama',
  },
  {
    final_score: 8,
    is_approved: 1,
    curriculum_subject_id: 1,
    period_id: 1,
    code: 1,
    enrollment: 1,
    period_year: 2022,
    period_code: 1,
    curriculum_subject_label: 'Instalaciones Eléctricas Residenciales',
    curriculum_label: 'Plan 2019-2020 de la carrera Técnico en Ingeniería de Construcción',
    career_label: 'Técnico en Ingeniería de Construcción',
    teacher_name: 'Hugo Lizama',
  },
  {
    final_score: 7.5,
    is_approved: 1,
    curriculum_subject_id: 1,
    period_id: 2,
    code: 1,
    enrollment: 1,
    period_year: 2021,
    period_code: 2,
    curriculum_subject_label: 'Edificaciones de Dos Niveles',
    curriculum_label: 'Plan 2019-2020 de la carrera Técnico en Ingeniería de Construcción',
    career_label: 'Técnico en Ingeniería de Construcción',
    teacher_name: 'Eriq Zavaleta',
  },
  {
    final_score: 8,
    is_approved: 1,
    curriculum_subject_id: 1,
    period_id: 1,
    code: 1,
    enrollment: 1,
    period_year: 2021,
    period_code: 1,
    curriculum_subject_label: 'Levantamientos Topográficos Planimétricos',
    curriculum_label: 'Plan 2019-2020 de la carrera Técnico en Ingeniería de Construcción',
    career_label: 'Técnico en Ingeniería de Construcción',
    teacher_name: 'Jorge Gonzalez',
  },
  {
    final_score: 9.2,
    is_approved: 1,
    curriculum_subject_id: 1,
    period_id: 1,
    code: 1,
    enrollment: 1,
    period_year: 2021,
    period_code: 1,
    curriculum_subject_label: 'Procesos Constructivos para Viviendas',
    curriculum_label: 'Plan 2019-2020 de la carrera Técnico en Ingeniería de Construcción',
    career_label: 'Técnico en Ingeniería de Construcción',
    teacher_name: 'César Ceballos',
  },
]
