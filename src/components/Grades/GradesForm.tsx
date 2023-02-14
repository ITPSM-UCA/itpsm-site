import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { yupResolver } from '@hookform/resolvers/yup'
import { getPeriods } from '../../services/Evaluation'

interface Props {

  fetchdata: (e: any, formData: any) => void,
}

const GradesForm = ({ fetchData }: Props) => {
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
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const {
    errors,
    isSubmitting,
  } = formState
  const [periods, setPeriods] = useState([])
  const transformData = (data: any) => {
    const ac = data.map((e: any) => ({
      value: e.id,
      label: `Ciclo ${e.code} - ${e.year}`,
    }))
    setPeriods(ac)
    console.log(periods)
  }

  const fetchPeriods = async () => {
    const stored = JSON.parse(localStorage.getItem('appState') ?? ' ')
    const response = await getPeriods(stored.attributes.system_reference_id)
    transformData(response)
  }
  useEffect(() => {
    fetchPeriods()
  }, [])

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(fetchData)}
    >

      {periods.length > 0
        && (
          <CustomCombobox
            name="code"
            control={control}
            placeholder="Ciclo 01-2022"
            label="Código"
            error={errors?.code}
            options={periods}
            setValue={setValue}
            clearErrors={clearErrors}
            initialValue={{}}
          />

        )}
      <button
        type="submit"
        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
      >
        Filtrar
      </button>
    </form>

  )
}
const schema = yup.object()
  .shape({})

export default GradesForm
