import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import { useState } from 'react'
import Loader from 'components/UI/Loader'
import CustomCheckbox from 'components/UI/Form/CustomCheckbox'
import { createCurriculum, updateCurriculum } from 'services/Curriculum'
import { useSelector } from 'react-redux'
import { empty } from 'utils/helpers'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { showMessage } from 'utils/alerts'

interface Props {
  data: any,
  clearData: () => void,
  toggleForm: () => void,
}

const CurriculaForm = ({
  data,
  clearData,
  toggleForm,
}: Props) => {
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
  const careers = useSelector((state: any) => state.config.careers)
  const [loading, setLoading] = useState(false)
  const careersList = transformCareers(careers)

  const onCreateCurricula = async (formData: any) => {
    setLoading(true)
    const functionToExecute = !empty(formData?.id) ? updateCurriculum : createCurriculum
    const response = await functionToExecute(formData)

    if (response.error) {
      setLoading(false)
      return
    }
    const successMessage = !empty(formData?.id) ? 'Plan de estudio actualizado correctamente.' : 'Plan de estudio creado correctamente.'
    showMessage('¡Exito!', successMessage)

    setLoading(false)
    toggleForm()
  }

  const onCloseForm = () => {
    clearData()
    toggleForm()
  }

  let buttonText = <span>Guardar Plan de estudio</span>

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
      onSubmit={handleSubmit(onCreateCurricula)}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Plan de estudio</h1>

        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={onCloseForm}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            Atras
          </button>

          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2">
            {buttonText}
          </button>
        </div>
      </div>

      <div>
        <fieldset className="flex flex-wrap mt-4 border rounded-md border-solid border-gray-300 p-3">
          <legend className="font-medium text-indigo-600">Datos</legend>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="name"
              label="Nombre"
              error={errors?.name}
              disabled={isSubmitting}
              register={register}
              placeholder="Plan 2022"
            />
          </div>
          <div className="w-2/4 p-2">
            <CustomCombobox
              name="career_id"
              control={control}
              placeholder="Técnico Superior en Hostelería y Turismo"
              label="Carrera"
              error={errors?.career_id}
              options={careersList}
              setValue={setValue}
              clearErrors={clearErrors}
              initialValue={() => getInitialValue('career_id', data)}
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="year"
              label="Año"
              min="2020"
              error={errors?.year}
              disabled={isSubmitting}
              register={register}
              placeholder="2022"
            />
          </div>
          <div className="w-1/4 p-2 pb-3 flex items-end gap-x-10">
            <CustomCheckbox
              name="is_active"
              label="Activo"
              // error={errors?.is_active}
              disabled={isSubmitting}
              register={register}
            />
            <CustomCheckbox
              name="is_approved"
              label="Aprobado"
              // error={errors?.is_approved}
              disabled={isSubmitting}
              register={register}
            />
          </div>
        </fieldset>
      </div>
    </form>
  )
}

const schema = yup.object().shape({
  name: yup.string().required('Este campo es obligatorio.'),
  career_id: yup.string().required('Este campo es obligatorio.'),
  year: yup.number().required('Este campo es obligatorio.').positive().integer(),
  is_active: yup.boolean().required('Este campo es obligatorio.'),
  is_approved: yup.boolean().required('Este campo es obligatorio.'),
})

const getInitialValue = (field: string, data: any) => {
  switch (field) {
    case 'career_id':
      return empty(data?.career_id) ? {} : { value: data?.career_id, label: data?.career_name }
    default:
      return {}
  }
}

const transformCareers = (careers: any) => careers.map((curricula: any) => ({
  value: curricula?.id,
  label: curricula?.attributes?.name,
}))

export default CurriculaForm
