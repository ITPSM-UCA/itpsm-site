import { groupBy } from 'lodash'
import { useEffect, useState } from 'react'
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
  const updatedSubjectByCycles: any = []
  const groupedSubjects = groupBy(curriculumSubjects, 'period_id')
  console.log(groupedSubjects)
  Object.entries(groupedSubjects)
    .reverse()
    .forEach(([key, value]) => {
      console.log(key, value)
      updatedSubjectByCycles.push({
        cycle: `${value[0].period_code}-${value[0].period_year}`,
        subjects: value,
      })
    })

  return updatedSubjectByCycles
}

export default useSubjectsByHistory
