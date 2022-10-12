// /* This example requires Tailwind CSS v2.0+ */
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
const days=['Lunes','Martes','Miercoles','Jueves','Viernes']
const EnrolledSubjects = ({ subjects }:any) => (
  <fieldset className="border border-gray-300 rounded-lg mt-4 p-4">
    <legend className="font-medium text-indigo-600">Materias inscritas:</legend>
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
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
                    Matricula
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {subjects.map((subject:any, personIdx:number) => (
                  <tr
                    key={subject.curriculum_subject_label}
                    className={
                      personIdx % 2 === 0 ? undefined : 'bg-gray-50'
                    }
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {subject.curriculum_subject_label}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {subject.curriculum_subject_uv}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {days[subject?.day]} {subject.horario}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {subject.enrollment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
)

export default EnrolledSubjects
