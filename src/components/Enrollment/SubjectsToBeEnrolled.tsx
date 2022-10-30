import { useLayoutEffect, useRef, useState } from 'react'

// const subjects1 = [
//   {
//     code: 1,
//     curriculum_subject_label: 'Legislación Normativa y Trámites Legales',
//     curriculum_label: 'Plan 2019-2020 de la carrera Técnico en Ingeniería de Construcción',
//     career_label: 'Técnico en Ingeniería de Construcción',
//     curriculum_subject_uv: 2,
//     curriculum_subject_level: 1,
//     schedule: 'horario',
//   },
//   {
//     code: 2,
//     curriculum_subject_label: 'Ingles tecnico',
//     curriculum_label: 'Plan 2019-2020 de la carrera Técnico en Ingeniería de Construcción',
//     career_label: 'Técnico en Ingeniería de Construcción',
//     curriculum_subject_uv: 4,
//     curriculum_subject_level: 1,
//     schedule: 'horario',
//   },
// ]

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

const SubjectToBeEnrolled = ({ subjects, onSubmit }:any) => {
  const checkbox = useRef<any>()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedSubjects, setselectedSubjects] = useState<any[]>([])
  const days=['Lunes','Martes','Miercoles','Jueves','Viernes']
  useLayoutEffect(() => {
    const isIndeterminate = selectedSubjects.length > 0 && selectedSubjects.length < subjects.length
    setChecked(selectedSubjects.length === subjects.length)
    setIndeterminate(isIndeterminate)

    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
  }, [selectedSubjects])

  const toggleAll = () => {
    setselectedSubjects(checked || indeterminate ? [] : subjects)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <fieldset className="border border-gray-300 rounded-lg mt-4 p-4">
      <legend className="font-medium text-indigo-600">Materias disponibles:</legend>
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            {selectedSubjects.length > 0 && (
              <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                <button
                  type="button"
                  onClick={() => onSubmit(selectedSubjects)}
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Inscribir
                </button>
              </div>
            )}
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="relative w-12 px-6 sm:w-16 sm:px-8"
                  >
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Materia
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    UV
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Horario
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Nivel de materia
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {subjects.map((subject:any) => (
                  <tr
                    key={subject.curriculum_subject_label}
                    className={
                      selectedSubjects.includes(subject) ? 'bg-gray-50' : undefined
                    }
                  >
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                      {selectedSubjects.includes(subject) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        value={subject.code}
                        checked={selectedSubjects.includes(subject)}
                        onChange={(e) => setselectedSubjects(
                          e.target.checked
                            ? [...selectedSubjects, subject]
                            : selectedSubjects.filter((p) => p !== subject),
                        )}
                      />
                    </td>
                    <td
                      className={classNames(
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        selectedSubjects.includes(subject)
                          ? 'text-indigo-600'
                          : 'text-gray-900',
                      )}
                    >
                      {subject.curriculum_subject_label}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {subject.curriculum_subject_uv}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {days[subject?.day-1]} {subject.horario}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {subject.curriculum_subject_level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </fieldset>
  )
}

export default SubjectToBeEnrolled
