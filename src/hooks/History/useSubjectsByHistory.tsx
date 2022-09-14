import { groupBy } from 'lodash'
import { useState, useEffect } from 'react'
import { getApprovedSujects } from 'services/History'

const useSubjectsByHistory = () => {
  const [subjectsByCycles, setSubjectsByCycles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    const response = await getApprovedSujects()
    const updatedSubjectByCycles = transformCurriculumSubjectData(response)
    setSubjectsByCycles(updatedSubjectByCycles)
    setLoading(false)
  }

  return {
    loading,
    subjectsByCycles,
  }
}

const transformCurriculumSubjectData = (curriculumSubjects:any[]) => {
  const updatedSubjectByCycles:any = []
  const groupedSubjects = groupBy(curriculumSubjects, 'period_id')

  Object.entries(groupedSubjects).forEach(([key, value]) => {
    updatedSubjectByCycles.push({
      cycle: key,
      subjects: value,
    })
  })

  return updatedSubjectByCycles
}

export default useSubjectsByHistory
