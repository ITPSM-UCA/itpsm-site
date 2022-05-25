import CustomInput from 'components/UI/Form/CustomInput'
import React, { useEffect, useState } from 'react'
import { empty } from 'utils/helpers'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Loader from 'components/UI/Loader'
import { curriculaRegistrationForStudent, getCurriculaForStudent } from 'services/Students'

const CurriculaRegistration = ({ data }: any) => {
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
  const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com' },
  ]
  const getSubjects = async () => {
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
  }

  useEffect(() => {
    getSubjects()
  }, [data.student_id])

  const onSubjectRegistration = async (formData: any) => {
    setLoading(true)
    const response = await curriculaRegistrationForStudent(formData)

    if (response.error) {
      setLoading(false)
      return
    }
    setLoading(false)
  }

  let buttonText = <span>Inscribir Estudiante</span>

  if (loading) {
    buttonText = (
      <>
        <Loader className="h-4 w-4" />
        <span>
          Cargando...
        </span>
      </>
    )
  }
  if (empty(data.student_id)) return null

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubjectRegistration)}
    >
      <fieldset className="mt-4 border rounded-md border-solid border-gray-300 p-3">
        <legend className="font-medium text-indigo-600">Inscripción de estudiante</legend>
        <div className="flex flex-wrap">
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="entry_year"
              label="Año de entrada"
              error={errors?.entry_year}
              disabled={isSubmitting}
              register={register}
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="graduation_year"
              label="Año de graduación"
              error={errors?.graduation_year}
              disabled={isSubmitting}
              register={register}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mx-2 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
        >
          {buttonText}
        </button>

        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Nombre
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Título
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {people.map((person) => (
                <tr key={person.email}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {person.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Título de carrera</dt>
                      <dd className="mt-1 truncate text-gray-700">{person.title}</dd>
                      <dt className="sr-only sm:hidden">Correo</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">{person.email}</dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{person.title}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </fieldset>
    </form>

  )
}

const schema = yup.object().shape({
  entry_year: yup.number().typeError('El campo debe de ser numerico').required('Este campo es obligatorio.').positive('El valor debe de ser positivo').min(2010, 'El valor mínimo es 2010'),
  graduation_year: yup.number().typeError('El campo debe de ser numerico').required('Este campo es obligatorio.').positive('El valor debe de ser positivo').min(2010, 'El valor mínimo es 2010'),
  student_id: yup.number().typeError('El campo debe de ser numerico'),
  curriculum_id: yup.number().typeError('El campo debe de ser numerico'),
  cum: yup.number().typeError('El campo debe de ser numerico'),
})

export default CurriculaRegistration
