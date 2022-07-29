import { useState, useEffect } from 'react'
import { deletePeriodSubject, getSectionsByCycleId, setSubjectToPeriod } from 'services/Period'

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

  const removePeriodSubject = async (curriculumSubjectId:string) => {
    setLoading(true)
    const response = await deletePeriodSubject(curriculumSubjectId)

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
    removePeriodSubject,
  }
}

export default useSectionByPeriod
