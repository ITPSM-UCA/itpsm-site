import React from 'react'

const ApprovedSujects = ({ subjectsByCycles }: any) => (
  <fieldset className="border border-gray-300 rounded-lg mt-4 p-4">
    <legend className="font-medium text-indigo-600">Materias cursadas</legend>
    {subjectsByCycles.map((cycle: any) => (
      <div>
        <p className="text-lg font-bold my-2">{`Ciclo ${cycle.cycle}`}</p>
        <Subjects subjects={cycle.subjects} />
      </div>
    ))}
  </fieldset>
)

const Subjects = ({ subjects }: any) => (
  <div className="-mx-4 mt-5 mb-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
            Modulo
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Catedrático
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Nota final
          </th>
          <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
            Estado
          </th>
          <th scope="col" className="relative text-center py-3.5 pl-3 text-left pr-4 sm:pr-6">
            Matrícula
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {subjects?.map((curricula: any) => (
          <tr key={curricula?.code}>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
              {curricula?.curriculum_subject_label}
              <dl className="font-normal lg:hidden">
                <dt className="sr-only sm:hidden">Catedrático</dt>
                <dd className="mt-1 truncate text-gray-500 sm:hidden">{curricula?.teacher_name}</dd>
                <dt className="sr-only sm:hidden">Nota final</dt>
                <dd className="mt-1 truncate text-gray-500 sm:hidden">{curricula?.final_score}</dd>
              </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{curricula?.teacher_name}</td>
            <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{curricula?.final_score}</td>
            <td className="px-3 py-4 text-sm text-center font-medium sm:pr-6">{curricula?.is_approved ? 'Aprobado' : 'Reprobado'}</td>
            <td className="px-3 py-4 text-sm text-center font-medium sm:pr-6">{curricula?.enrollment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default ApprovedSujects
