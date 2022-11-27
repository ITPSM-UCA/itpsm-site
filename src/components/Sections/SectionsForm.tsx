import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import { useState } from 'react'
import Loader from 'components/UI/Loader'
import { useSelector } from 'react-redux'
import CustomCombobox from 'components/UI/Form/CustomCombobox'

interface Props {
  data: any,
  onSubmit: any,
}

const SectionsForm = ({ data, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    clearErrors,
    // reset,
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: data,
    resolver: yupResolver(schema),
  })

  const {
    errors,
    isSubmitting,
  } = formState
  const curriculumSubjects = useSelector((state: any) => state.config.curriculum_subjects)

  const [loading, setLoading] = useState(false)
  const curriculumSubjectsList = transformCurriculumSubjects(curriculumSubjects)

  const Days = [{
    value: 1,
    label: 'Lunes',
  }, {
    value: 2,
    label: 'Martes',
  }, {
    value: 3,
    label: 'Miercoles',
  }, {
    value: 4,
    label: 'Jueves',
  }, {
    value: 5,
    label: 'Viernes',
  }]
  const onSetSubjectToCurriculum = async (formData: any) => {
    console.log(formData)
    setLoading(true)
    // await onSubmit(formData)
    setLoading(false)
  }

  let buttonText = <span>Asociar Modulo</span>

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

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSetSubjectToCurriculum)}
    >
      <div>
        <fieldset className="flex flex-wrap border rounded-md border-solid border-gray-300 p-3 mb-2">
          <legend className="font-medium text-indigo-600">Asociar Modulo</legend>
          <div className="w-2/4 p-2">
            <CustomCombobox
              name="curriculum_subject_id"
              control={control}
              placeholder="Diseño de Models de Negocios"
              label="Modulo"
              error={errors?.curriculum_subject_id}
              options={curriculumSubjectsList}
              setValue={setValue}
              clearErrors={clearErrors}
              initialValue={{}}
            />
          </div>

          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="quota"
              label="Cupos"
              min="1"
              error={errors?.quota}
              disabled={isSubmitting}
              register={register}
              placeholder="25"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="start_week"
              label="Semana de Inicio"
              min="1"
              error={errors?.week}
              disabled={isSubmitting}
              register={register}
              placeholder="2"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="end_week"
              label="Semana de fin"
              min="1"
              error={errors?.eweek}
              disabled={isSubmitting}
              register={register}
              placeholder="5"
            />
          </div>
          <div className="w-1/4 p-2 self-end">
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
            >
              {buttonText}
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  )
}

const schema = yup.object().shape({
  horario: yup.string()
    .required('Este campo es obligatorio.'),
  id_schedule: yup.string()
    .required('Este campo es obligatorio.'),
  quota: yup.number()
    .required('Este campo es obligatorio.')
    .positive()
    .integer(),
  curriculum_subject_id: yup.number()
    .required('Este campo es obligatorio.')
    .positive()
    .integer(),
  code: yup.number()
    .positive(),
  week: yup.number()
    .positive(),
  eweek: yup.number()
    .positive(),
  period_id: yup.number()
    .required('Este campo es obligatorio.')
    .positive()
    .integer(),
})

const transformCurriculumSubjects = (subjects: any) => subjects.map((subject: any) => ({
  value: subject?.attributes?.subject_id,
  label: subject?.attributes?.subject_name,
}))

export default SectionsForm
