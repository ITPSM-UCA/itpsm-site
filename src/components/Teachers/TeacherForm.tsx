import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import PhoneNumberInput from 'components/UI/Form/PhoneNumberInput'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { useEffect, useState } from 'react'
import Loader from 'components/UI/Loader'
import { createTeacher } from 'services/Teachers'
import Departments from 'utils/constants/Departments'
import { empty } from 'utils/helpers'

interface Props {
  data: any
  toggleForm: () => void
}

const TeacherForm = ({ data, toggleForm }: Props) => {
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
  const currentDepartment = watch('department_id')
  const [municipaltiesOptions, setmunicipaltiesOptions] = useState({})

  useEffect(() => {
    setmunicipaltiesOptions([])
    if (!empty(currentDepartment)) {
      setValue('municipality_id', '')
      const municipalityFiltered: any = Departments.find((value: any) => value.value === currentDepartment)
      setmunicipaltiesOptions(municipalityFiltered.municipios)
    }
  }, [currentDepartment])

  const onCreateTeacher = async (formData: any) => {
    setLoading(true)
    const response: any = await createTeacher(formData)

    if (response.error) {
      setLoading(false)
      return
    }

    setLoading(false)
    toggleForm()
  }

  let buttonText = <span>Guardar Catedrático</span>

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
      onSubmit={handleSubmit(onCreateTeacher)}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Catedráticos</h1>

        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={toggleForm}
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
          <legend className="font-medium text-indigo-600">Datos personales</legend>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="name"
              label="Nombres"
              error={errors?.name}
              disabled={isSubmitting}
              register={register}
              placeholder="Álvaro"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="last_name"
              label="Apellidos"
              error={errors?.last_name}
              disabled={isSubmitting}
              register={register}
              placeholder="García"
            />
          </div>
          <div className="w-1/2 p-2">
            <CustomInput
              type="text"
              name="address"
              label="Dirección"
              error={errors?.address}
              disabled={isSubmitting}
              register={register}
              placeholder="Direccion"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="email"
              label="Correo Electronico"
              error={errors?.email}
              disabled={isSubmitting}
              register={register}
              placeholder="alvaro1@gmail.com"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="date"
              name="birth_date"
              label="Fecha de nacimiento"
              error={errors?.birth_date}
              disabled={isSubmitting}
              register={register}
            />
          </div>
          <div className="w-1/4 p-2">
            <PhoneNumberInput
              type="tel"
              name="phone_number"
              label="Teléfono"
              error={errors?.phone_number}
              disabled={isSubmitting}
              control={control}
              placeholder="7777-5555"
            />
          </div>
          <div className="w-1/4 p-2">
            <PhoneNumberInput
              type="tel"
              name="home_phone_number"
              label="Teléfono de la casa"
              error={errors?.home_phone_number}
              disabled={isSubmitting}
              control={control}
              placeholder="2222-5555"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomCombobox
              name="genre"
              control={control}
              placeholder="Masculino"
              initialValue={{}}
              label="Genero"
              error={errors?.genre}
              options={[{ value: 'M', label: 'Masculino' }, { value: 'F', label: 'Femenino' }]}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomCombobox
              name="status_id"
              control={control}
              placeholder="Activo"
              initialValue={{}}
              label="Estado"
              error={errors?.status_id}
              options={[{ value: 1, label: 'Activo' }, { value: 2, label: 'Inactivo' }]}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomCombobox
              name="country_id"
              control={control}
              placeholder="El Salvador"
              initialValue={{}}
              label="País"
              error={errors?.country_id}
              options={[{ value: 1, label: 'El Salvador' }]}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomCombobox
              name="department_id"
              control={control}
              placeholder="San Salvador"
              initialValue={{}}
              label="Departamento"
              error={errors?.department_id}
              options={Departments}
              setValue={setValue}
              clearErrors={clearErrors}

            />
          </div>
          {!empty(municipaltiesOptions)
            && (
              <div className="w-1/4 p-2">
                <CustomCombobox
                  name="municipality_id"
                  control={control}
                  placeholder="Ciudad Delgado"
                  initialValue={{}}
                  label="Municipio"
                  error={errors?.municipality_id}
                  options={[municipaltiesOptions]}
                  setValue={setValue}
                  clearErrors={clearErrors}
                />
              </div>
            )}

        </fieldset>
        <fieldset className="flex flex-wrap mt-4 border rounded-md border-solid border-gray-300 p-3">
          <legend className="font-medium text-indigo-600">Datos de trabajador</legend>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="nit"
              label="NIT"
              error={errors?.nit}
              disabled={isSubmitting}
              register={register}
              placeholder="1234556"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="dui"
              label="DUI"
              error={errors?.dui}
              disabled={isSubmitting}
              register={register}
              placeholder="01223421-2"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="isss_number"
              label="Número de ISSS"
              error={errors?.isss_number}
              disabled={isSubmitting}
              register={register}
              placeholder="12345323"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="nup_number"
              label="NUP"
              error={errors?.nup_number}
              disabled={isSubmitting}
              register={register}
              placeholder="12344532"
            />
          </div>
        </fieldset>
      </div>
    </form>
  )
}

const schema = yup.object().shape({
  name: yup.string().required('Este campo es obligatorio.'),
  last_name: yup.string().required('Este campo es obligatorio.'),
  birth_date: yup.string().required('Este campo es obligatorio.'),
  nit: yup.string().required('Este campo es obligatorio.'),
  dui: yup.string().required('Este campo es obligatorio.'),
  isss_number: yup.string().required('Este campo es obligatorio.'),
  nup_number: yup.string().required('Este campo es obligatorio.'),
  email: yup.string().required('Este campo es obligatorio.').email('Dirección de correo no válida.'),
  genre: yup.string().required('Este campo es obligatorio.'),
  address: yup.string().required('Este campo es obligatorio.'),
  phone_number: yup.string().nullable(),
  home_phone_number: yup.string().nullable(),
  municipality_id: yup.string().required('Este campo es obligatorio.'),
  department_id: yup.string().required('Este campo es obligatorio.'),
  country_id: yup.string().required('Este campo es obligatorio.'),
  status_id: yup.string().required('Este campo es obligatorio.'),
})

export default TeacherForm
