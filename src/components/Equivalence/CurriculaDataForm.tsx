import CustomInput from 'components/UI/Form/CustomInput'
import React, { useEffect, useState } from 'react'
import { customRound, empty } from 'utils/helpers'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { curriculaRegistrationForStudent, getCurriculaForStudent } from 'services/Students'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { useSelector } from 'react-redux'
import BodyLoadingButton from 'components/UI/BodyLoadingButton'

const CurriculaDataForm = ({ data }: any) => {
  const {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    clearErrors,
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: data,
    resolver: yupResolver(schema),
  })
  const { errors, isSubmitting } = formState
  const [loading, setLoading] = useState(false)
  const curriculas = useSelector((state: any) => state.config.curricula)
  const [studentCurriculas, setStudentCurriculas] = useState([])
  const currentCurriculum = watch('curriculum_id')
  const currentEntryYear = watch('entry_year')
  const [curriculaOptions, setCurriculaOptions] = useState<any[]>([])

  const getCurriculas = async () => {
    const customQuery = {
      query: [{
        field: 'sc.student_id',
        op: '=',
        data: data.student_id,
      }],
    }
    const query = {
      pageSize: 10,
      page: 0,
    }
    const response = await getCurriculaForStudent(query, customQuery)
    setStudentCurriculas(response)
  }

  useEffect(() => {
    if (!empty(curriculas)) {
      const curriculasArray = curriculas.map((curricula: any) => ({
        value: curricula?.id,
        label: curricula?.attributes?.name,
      }))
      setCurriculaOptions(curriculasArray)
    }
  }, [curriculas])

  useEffect(() => {
    if (!empty(data.student_id)) getCurriculas()
  }, [data.student_id])

  useEffect(() => {
    if (!empty(currentEntryYear) && currentEntryYear.length === 4) setValue('graduation_year', customRound(currentEntryYear, 2) + 3)
  }, [currentEntryYear])



  useEffect(() => {
    console.log(studentCurriculas,"DataCurricula-Equivalence")
  }, [studentCurriculas])


  if (empty(data.student_id)) return null

  return (

        <>
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
                  Año de entrada
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Año esperado de graduación
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Nivel
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Cum
                </th>
                <th scope="col" className="relative py-3.5 pl-3 text-left pr-4 sm:pr-6">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {studentCurriculas.map((curricula: any) => (
                <tr key={curricula?.attributes?.student_carnet}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {curricula?.attributes?.curricula_name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Año de entrada</dt>
                      <dd className="mt-1 truncate text-gray-700">{curricula?.attributes?.entry_year}</dd>
                      <dt className="sr-only sm:hidden">Año esperado de graduación</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">{curricula?.attributes?.graduation_year}</dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-center text-gray-500 lg:table-cell">{curricula?.attributes?.entry_year}</td>
                  <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{curricula?.attributes?.graduation_year}</td>
                  <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{curricula?.attributes?.level}</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">{curricula?.attributes?.cum.toFixed(2)}</td>
                  <td className="px-3 py-4 text-sm text-center font-medium sm:pr-6">{getStatus(curricula?.attributes?.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


    </>
  )
}

const schema = yup.object().shape({
  entry_year: yup.number().typeError('El campo debe de ser numérico y es obligatorio').required('Este campo es obligatorio.').positive('El valor debe de ser positivo').min(2010, 'El valor mínimo es 2010'),
  graduation_year: yup.number().typeError('El campo debe de ser numérico y es obligatorio').required('Este campo es obligatorio.').positive('El valor debe de ser positivo').min(2010, 'El valor mínimo es 2010'),
  student_id: yup.number().typeError('El campo debe de ser numerico'),
  curriculum_id: yup.number().required('Este campo es obligatorio').typeError('El campo debe de ser numérico y es obligatorio'),
  cum: yup.number().typeError('El campo debe de ser numerico'),
})

const getStatus = (status:string) => {
  switch (status) {
    case 'A':
      return 'Activo'
    case 'G':
      return 'Graduado'
    case 'D':
      return 'Desertado'
    default:
      return 'Activo'
  }
}

export default CurriculaDataForm
