import { useState, useEffect } from 'react'
import { deleteCurriculumSubject } from 'services/Curriculum'
import { getSectionsByCycleId, setSubjectToPeriod } from 'services/Period'

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
    setSectionsByCycles(response.rows)
    setLoading(false)
  }

  const removeCurriculumSubject = async (curriculumSubjectId:number) => {
    setLoading(true)
    const response = await deleteCurriculumSubject(curriculumSubjectId)

    if (!response.errors) {
      setSectionsByCycles(response.curriculum_subjects)
    }

    setLoading(false)
  }

  const setPeriodSubject = async (dataSubject: any) => {
    setLoading(true)
    const response: any = await setSubjectToPeriod(dataSubject)

    if (!response.errors) {
      setSectionsByCycles(response.period_sections)
    }

    setLoading(false)
  }

  return {
    loading,
    sectionsByCycles,
    setPeriodSubject,
    removeCurriculumSubject,
  }
}

export default useSectionByPeriod
