import React from 'react'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  code: yup.string().required('Este campo es obligatorio.'),
})

interface Props {

  fetchdata: (formData: any) => void,
}
const GradesForm = ({ fetchdata }: Props) => {

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
    defaultValues:{},
    resolver: yupResolver(schema),
  })
  const { errors, isSubmitting } = formState

  return (
    <form
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit(fetchdata)}
    >
  
      <CustomCombobox
              name="code"
              control={control}
              placeholder="Ciclo 01-2022"
              label="Código"
              error={errors?.code}
              options={[{ value: 1, label: 'Ciclo 01' },{ value: 3, label: 'Ciclo 03' }]}
              setValue={setValue}
              clearErrors={clearErrors}
              initialValue={{ value: 1, label: 'Ciclo 01' }}
             
            />
               <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2">
            Filtrar
          </button>
    </form>

  )
}

export default GradesForm
