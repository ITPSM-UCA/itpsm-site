import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import { useState } from 'react'
import Loader from 'components/UI/Loader'
import { useSelector } from 'react-redux'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { setSubjectToCurriculum } from 'services/Curriculum'

interface Props {
  data: any,
}

const SubjectForm = ({ data }: Props) => {
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

  const { errors, isSubmitting } = formState
  const subjects = useSelector((state: any) => state.config.subjects)
  const [loading, setLoading] = useState(false)
  const subjectsList = transformSubjects(subjects)

  const onSetSubjectToCurriculum = async (formData: any) => {
    setLoading(true)
    const response: any = await setSubjectToCurriculum(formData)

    if (response.error) {
      setLoading(false)
      return
    }

    setLoading(false)
  }

  let buttonText = <span>Asociar Materia</span>

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
          <legend className="font-medium text-indigo-600">Asociar Materia</legend>
          <div className="w-2/4 p-2">
            <CustomCombobox
              name="subject_id"
              control={control}
              placeholder="Diseño de Modelos de Negocios"
              label="Materia"
              error={errors?.subject_id}
              options={subjectsList}
              setValue={setValue}
              clearErrors={clearErrors}
              initialValue={{}}
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="uv"
              label="UV"
              min="1"
              error={errors?.uv}
              disabled={isSubmitting}
              register={register}
              placeholder="4"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="cycle"
              label="Ciclo a impartir"
              min="1"
              error={errors?.uv}
              disabled={isSubmitting}
              register={register}
              placeholder="1"
            />
          </div>
          <div className="w-1/4 p-2">
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2">
              {buttonText}
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  )
}

const schema = yup.object().shape({
  uv: yup.number().required('Este campo es obligatorio.').positive().integer(),
  cycle: yup.number().required('Este campo es obligatorio.').positive().integer(),
  curriculum_id: yup.number().required('Este campo es obligatorio.').positive().integer(),
  subject_id: yup.number().required('Este campo es obligatorio.').positive().integer(),
})

const transformSubjects = (subjects: any) => subjects.map((subject: any) => ({
  value: subject?.id,
  label: subject?.attributes?.name,
}))

export default SubjectForm
