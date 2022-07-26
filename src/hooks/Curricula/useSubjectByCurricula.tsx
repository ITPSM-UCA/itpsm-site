import { groupBy } from 'lodash'
import { useState, useEffect } from 'react'
import { getSubjectsByCurriculumId } from 'services/Curriculum'

const useSubjectByCurricula = (id:number) => {
  const [subjectsByCycles, setSubjectsByCycles] = useState([])

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

    const response = await getSubjectsByCurriculumId({}, customQuery)
    const updatedSubjectByCycles:any = []
    const groupedSubjects = groupBy(response.rows, 'cycle')

    Object.entries(groupedSubjects).forEach(([key, value]) => {
      updatedSubjectByCycles.push({
        cycle: key,
        subjects: value,
      })
    })

    setSubjectsByCycles(updatedSubjectByCycles)
  }

  return {
    subjectsByCycles,
  }
}

export default useSubjectByCurricula
