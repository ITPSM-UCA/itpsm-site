import useSectionByPeriod from 'hooks/Period/useSectionByPeriod'
import { IoTrashOutline } from 'react-icons/io5'
import SectionsForm from './SectionsForm'

interface Props {
  data: any
}

const SectionsByPeriod = ({ data }: Props) => {
  const { sectionsByCycles, removePeriodSubject, setPeriodSubject } = useSectionByPeriod(data.id)
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
  const isPeriodInEdition = data.status === 'E'

  return (
    <fieldset className="border border-gray-300 rounded-lg mt-4 p-4">
      <legend className="font-medium text-indigo-600">Secciones asociadas</legend>
      {!data.is_closed && (
        <SectionsForm data={{ ...data, period_id: data.id }} onSubmit={setPeriodSubject} />
      )}

      <Sections
        days={days}
        sections={sectionsByCycles}
        deleteCurriculumSubject={removePeriodSubject}
        isEdition={isPeriodInEdition}
      />

    </fieldset>
  )
}

const Sections = ({
  sections, deleteCurriculumSubject, isEdition, days,
}: any) => (
  <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
            Plan de estudio
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Carrera
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Modulo
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Semana de Inicio
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Semana de Fin
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Catedratico
          </th>
          <th scope="col" className="relative py-3.5 pl-3 text-left pr-4 sm:pr-6">
            Cupos
          </th>
          <th scope="col" className="relative py-3.5 pl-3 text-left pr-4 sm:pr-6">
            Código
          </th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {isEdition && <th scope="col" className="relative py-3.5 pl-3 text-left pr-4 sm:pr-6" />}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {sections?.map((curricula: any) => (
          <tr key={curricula?.code}>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
              {curricula?.curriculum_label}
              <dl className="font-normal lg:hidden">
                <dt className="sr-only">Carrera</dt>
                <dd className="mt-1 truncate text-gray-700">{curricula?.career_label}</dd>
                <dt className="sr-only sm:hidden">Modulo</dt>
                <dd className="mt-1 truncate text-gray-500 sm:hidden">{curricula?.curriculum_subject_label}</dd>
              </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-center text-gray-500 lg:table-cell">{curricula?.career_label}</td>
            <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{curricula?.curriculum_subject_label}</td>
            <td className="px-3 py-4 text-sm text-center text-gray-500">{curricula?.start_week}</td>
            <td className="px-3 py-4 text-sm text-center text-gray-500">{curricula?.end_week}</td>
            <td className="px-3 py-4 text-sm text-center font-medium sm:pr-6">{curricula?.teacher_name}</td>
            <td className="px-3 py-4 text-sm text-center font-medium sm:pr-6">{curricula?.quota}</td>
            <td className="px-3 py-4 text-sm text-center font-medium sm:pr-6">{curricula?.code}</td>
            <td className="px-3 py-4 text-sm text-center font-medium sm:pr-6">
              <button
                type="button"
                className=""
                onClick={() => deleteCurriculumSubject(curricula.curriculum_subject_id, curricula.period_id, curricula.code)}
              >
                <IoTrashOutline className="h-5 w-5 text-red-500" />
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default SectionsByPeriod
