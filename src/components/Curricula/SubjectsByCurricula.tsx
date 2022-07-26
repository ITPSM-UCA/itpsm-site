import useSubjectByCurricula from 'hooks/Curricula/useSubjectByCurricula'
import SubjectForm from './SubjectForm'

interface Props {
  data: any
}

const SubjectsByCurricula = ({ data }:Props) => {
  const { subjectsByCycles } = useSubjectByCurricula(data.id)

  return (
    <fieldset className="border border-gray-300 rounded-lg mt-4 p-4">
      <legend className="font-medium text-indigo-600">Materias asociadas</legend>
      <SubjectForm data={{}} />
      {subjectsByCycles.map((cycle:any) => (
        <div>
          <p className="text-lg font-bold my-2">{`Ciclo ${cycle.cycle}`}</p>
          <Subjects subjects={cycle.subjects} />
        </div>
      ))}
    </fieldset>
  )
}

const Subjects = ({ subjects }:any) => (
  <div className="grid grid-cols-5 gap-4">
    {subjects.map((subject:any) => (
      <div className="w-full border rounded-lg p-2">
        <div className="flex justify-between pb-2">
          <p className="text-sm text-center font-bold">{`${subject.subject_code}`}</p>
          <p className="text-sm text-center font-bold text-indigo-600">{`${subject.uv} UV`}</p>
        </div>
        <p className="text-sm text-center font-medium h-16">{subject.subject_name}</p>
      </div>
    ))}
  </div>
)

export default SubjectsByCurricula
