import { groupBy } from 'lodash'
import { useState, useEffect } from 'react'
import { deleteCurriculumSubject, setSubjectToCurriculum } from 'services/Curriculum'
import { getSectionsByCycleId } from 'services/Period'

const useSectionByPeriod = (id:number) => {
  const [sectionsByCycles, setSectionsByCycles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const customQuery = {
      query: [{
        field: 's.period_id',
        op: '=',
        data: id,
      }],
    }

    setLoading(true)
    const response = await getSectionsByCycleId({}, customQuery)
    const updatedSubjectByCycles = transformCurriculumSubjectData(response.rows)
    setSectionsByCycles(updatedSubjectByCycles)
    setLoading(false)
  }

  const removeCurriculumSubject = async (curriculumSubjectId:number) => {
    setLoading(true)
    const response = await deleteCurriculumSubject(curriculumSubjectId)

    if (!response.errors) {
      const updatedSubjectByCycles = transformCurriculumSubjectData(response.curriculum_subjects)
      setSectionsByCycles(updatedSubjectByCycles)
    }

    setLoading(false)
  }

  const setCurriculumSubject = async (dataSubject: any) => {
    setLoading(true)
    const response: any = await setSubjectToCurriculum(dataSubject)

    if (!response.errors) {
      const updatedSubjectByCycles = transformCurriculumSubjectData(response.curriculum_subjects)
      setSectionsByCycles(updatedSubjectByCycles)
    }

    setLoading(false)
  }

  return {
    loading,
    sectionsByCycles,
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

export default useSectionByPeriod
