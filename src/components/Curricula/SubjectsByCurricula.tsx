import { useEffect } from 'react'
import { getSubjectsByCurriculumId } from 'services/Curriculum'

interface Props {
  data: any
}

const SubjectsByCurricula = ({ data }:Props) => {
  const getData = async () => {
    const customQuery = {
      query: [{
        field: 'curriculum_id',
        op: '=',
        data: data.id,
      }],
    }
    const query = {
      pageSize: 40,
      page: 0,
    }
    const response = await getSubjectsByCurriculumId(query, customQuery)
    console.log(response)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="border border-gray-300 rounded-lg mt-4 p-4">
      <h1>SubjectsByCurricula</h1>
    </div>
  )
}

export default SubjectsByCurricula
