import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import { useState } from 'react'
import Loader from 'components/UI/Loader'
import { empty } from 'utils/helpers'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { periods, periodStatus, PERIOD_STATUS_LABEL } from 'utils/constants/Constants'
import { createPeriod, updatePeriod } from 'services/Period'
import { showMessage } from 'utils/alerts'

interface Props {
  data: any,
  clearData: () => void,
  toggleForm: () => void
}

const PeriodForm = ({ data, clearData, toggleForm }: Props) => {
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
  const [loading, setLoading] = useState(false)
  const [cancelation, setcancelation] = useState(false)

  const onCreatePeriod = async (formData: any) => {
    setLoading(true)

    if (cancelation && confirm('Desea cerrar el ciclo?')) {
      formData = { ...formData, status: 'C' }
      const functionToExecute = !empty(formData?.id) ? updatePeriod : createPeriod
      const response = await functionToExecute(formData)

      if (response.errors) {
        setLoading(false)
      } else {
        const successMessage = !empty(formData?.id) ? 'Ciclo de estudio actualizado correctamente.' : 'Ciclo de estudio creado correctamente.'
        showMessage('¡Exito!', successMessage)
        toggleForm()
      }
    }
    else if (!cancelation) {
      const functionToExecute = !empty(formData?.id) ? updatePeriod : createPeriod
      const response = await functionToExecute(formData)

      if (response.errors) {
        setLoading(false)
      } else {
        const successMessage = !empty(formData?.id) ? 'Ciclo de estudio actualizado correctamente.' : 'Ciclo de estudio creado correctamente.'
        showMessage('¡Exito!', successMessage)
        toggleForm()
      }
    }

    setLoading(false)
  }

  const onCloseForm = () => {
    clearData()
    toggleForm()
  }

  let buttonText = <span>Guardar Ciclo de estudio</span>

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
      onSubmit={handleSubmit(onCreatePeriod)}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Ciclo de estudio</h1>

        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={onCloseForm}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Atras
          </button>
          { data?.id
            && (
            <button
              onClick={() => setcancelation(true)}
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-900 focus:outline-none gap-x-2"
            >
              Cerrar Ciclo
            </button>
            )}

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
          <legend className="font-medium text-indigo-600">Datos</legend>
          <div className="w-2/4 p-2">
            <CustomCombobox
              name="code"
              control={control}
              placeholder="Ciclo 01-2022"
              label="Código"
              error={errors?.code}
              options={periods}
              setValue={setValue}
              clearErrors={clearErrors}
              initialValue={() => getInitialValue('code', data)}
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
          <div className="w-1/4 p-2">
            { data.status !== 'C' && (
              <CustomCombobox
                name="status"
                control={control}
                placeholder="En edición"
                label="Estado"
                error={errors?.status}
                options={periodStatus}
                setValue={setValue}
                clearErrors={clearErrors}
                initialValue={() => getInitialValue('status', data)}
              />
            )}
            { data.status === 'C'
            && (
            <div style={{ marginTop: '4vh' }}>
              Estado:
              <span style={{ color: 'red' }}>Cerrado</span>
            </div>
            )}
          </div>
        </fieldset>
      </div>
    </form>
  )
}

const schema = yup.object().shape({
  code: yup.number().required('Este campo es obligatorio.'),
  year: yup.number().required('Este campo es obligatorio.').positive().integer(),
  status: yup.string().required('Este campo es obligatorio.'),
})

const getInitialValue = (field: string, data: any) => {
  switch (field) {
    case 'code':
      return empty(data?.code) ? {} : { value: data?.code, label: data?.label }
    case 'status':
      return empty(data?.status) ? {} : { value: data?.status, label: PERIOD_STATUS_LABEL[data?.status] }
    default:
      return {}
  }
}

export default PeriodForm
