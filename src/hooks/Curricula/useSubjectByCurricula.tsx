import { groupBy } from 'lodash'
import { useState, useEffect } from 'react'
import { deleteCurriculumSubject, getSubjectsByCurriculumId, setSubjectToCurriculum } from 'services/Curriculum'

const useSubjectByCurricula = (id:number) => {
  const [subjectsByCycles, setSubjectsByCycles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const customQuery = {
      query: [{
        field: 'curriculum_id',
        op: '=',
        data: id,
      }],
    }

    setLoading(true)
    const response = await getSubjectsByCurriculumId({}, customQuery)
    const updatedSubjectByCycles = transformCurriculumSubjectData(response.rows)
    setSubjectsByCycles(updatedSubjectByCycles)
    setLoading(false)
  }

  const removeCurriculumSubject = async (curriculumSubjectId:number) => {
    setLoading(true)
    const response = await deleteCurriculumSubject(curriculumSubjectId)

    if (!response.errors) {
      const updatedSubjectByCycles = transformCurriculumSubjectData(response.curriculum_subjects)
      setSubjectsByCycles(updatedSubjectByCycles)
    }

    setLoading(false)
  }

  const setCurriculumSubject = async (dataSubject: any) => {
    setLoading(true)
    const response: any = await setSubjectToCurriculum(dataSubject)

    if (!response.errors) {
      const updatedSubjectByCycles = transformCurriculumSubjectData(response.curriculum_subjects)
      setSubjectsByCycles(updatedSubjectByCycles)
    }

    setLoading(false)
  }

  return {
    loading,
    subjectsByCycles,
    setCurriculumSubject,
    removeCurriculumSubject,
  }
}

const transformCurriculumSubjectData = (curriculumSubjects:any[]) => {
  const updatedSubjectByCycles:any = []
  const groupedSubjects = groupBy(curriculumSubjects, 'cycle')

  Object.entries(groupedSubjects).forEach(([key, value]) => {
    updatedSubjectByCycles.push({
      cycle: key,
      subjects: value,
    })
  })

  return updatedSubjectByCycles
}

export default useSubjectByCurricula
