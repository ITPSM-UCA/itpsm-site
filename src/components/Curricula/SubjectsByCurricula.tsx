import useSubjectByCurricula from 'hooks/Curricula/useSubjectByCurricula'

interface Props {
  data: any
}

const SubjectsByCurricula = ({ data }:Props) => {
  const { subjectsByCycles } = useSubjectByCurricula(data.id)

  return (
    <div className="border border-gray-300 rounded-lg mt-4 p-4">
      {subjectsByCycles.map((cycle:any) => (
        <div>
          <p className="text-lg font-bold my-2">{`Ciclo ${cycle.cycle}`}</p>
          <Subjects subjects={cycle.subjects} />
        </div>
      ))}
    </div>
  )
}

const Subjects = ({ subjects }:any) => (
  <div className="grid grid-cols-5 gap-4">
    {subjects.map((subject:any) => (
      <div className="w-full border rounded-lg p-2">
        <p className="text-sm text-right font-bold">{`${subject.subject_code}`}</p>
        <p className="text-sm text-center font-medium">{subject.subject_name}</p>
        <p className="text-sm text-center font-medium">{subject.uv}</p>
      </div>
    ))}
  </div>
)

export default SubjectsByCurricula
