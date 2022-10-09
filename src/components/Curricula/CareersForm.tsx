import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import { useState } from 'react'
import Loader from 'components/UI/Loader'
import { createCareer, updateCurriculum } from 'services/Curriculum'
import { empty } from 'utils/helpers'
import { showMessage } from 'utils/alerts'

interface Props {
  data: any,
  clearData: () => void,
  toggleForm: () => void,
}

const CareersForm = ({
  data,
  clearData,
  toggleForm,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState,

  } = useForm({
    mode: 'onBlur',
    defaultValues: data,
    resolver: yupResolver(schema),
  })

  const { errors, isSubmitting } = formState

  const [loading, setLoading] = useState(false)

  const onCreateCareer = async (formData: any) => {
    setLoading(true)
    const functionToExecute = !empty(formData?.id) ? updateCurriculum : createCareer
    const response = await functionToExecute(formData)

    if (response.error) {
      setLoading(false)
      return
    }
    const successMessage = !empty(formData?.id) ? 'Plan de estudio actualizado correctamente.' : 'Carrera creada correctamente.'
    showMessage('¡Exito!', successMessage)

    setLoading(false)
    toggleForm()
  }

  const onCloseForm = () => {
    clearData()
    toggleForm()
  }

  let buttonText = <span>Guardar Carrera</span>

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
      onSubmit={handleSubmit(onCreateCareer)}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Carrera</h1>

        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={onCloseForm}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Atras
          </button>

          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
          >
            {buttonText}
          </button>
        </div>
      </div>

      <div>
        <fieldset className="flex flex-wrap mt-4 border rounded-md border-solid border-gray-300 p-3">
          <legend className="font-medium text-indigo-600">Datos de Carrera</legend>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="name"
              label="Nombre de Carrera"
              error={errors?.name}
              disabled={isSubmitting}
              register={register}
              placeholder="Tecnico"
            />
          </div>

        </fieldset>
      </div>
    </form>
  )
}

const schema = yup.object().shape({
  name: yup.string().required('Este campo es obligatorio.'),

})

export default CareersForm
