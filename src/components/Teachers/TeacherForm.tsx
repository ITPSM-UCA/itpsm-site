import * as yup from 'yup'
import { empty } from 'utils/helpers'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Loader from 'components/UI/Loader'
import { showMessage } from 'utils/alerts'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { createTeacher, updateTeacher } from 'services/Teachers'
import PhoneNumberInput from 'components/UI/Form/PhoneNumberInput'
import CustomFormatInput from 'components/UI/Form/CustomFormatInput'
import { genders, STATUS_LABEL, teachersStatus } from 'utils/constants/Constants'

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

  const countries = useSelector((state: any) => state.config.countries)

  const { errors, isSubmitting } = formState
  const [loading, setLoading] = useState(false)
  const currentDepartment = watch('department_id')
  const currentCountry = watch('country_id')
  const [municipaltiesOptions, setMunicipaltiesOptions] = useState([])
  const [departmentsOptions, setDepartmentsOptions] = useState([])

  useEffect(() => {
    if (!empty(currentCountry) && empty(data.department_id)) {
      setDepartmentsOptions([])
      setValue('department_id', '')
    }
    const departmentFiltered: any = countries?.find((value: any) => value.value === currentCountry)
    setDepartmentsOptions(departmentFiltered?.departments)
  }, [currentCountry])

  useEffect(() => {
    if (!empty(currentDepartment) && empty(data.municipality_id)) {
      setMunicipaltiesOptions([])
      setValue('municipality_id', '')
    }
    const municipalityFiltered: any = departmentsOptions?.find((value: any) => value.value === currentDepartment)
    setMunicipaltiesOptions(municipalityFiltered?.municipalities)
  }, [currentDepartment, departmentsOptions])

  const onSubmit = async (formData: any) => {
    setLoading(true)

    const functionToExecute = !empty(formData?.id) ? updateTeacher : createTeacher
    const response = await functionToExecute(formData)

    if (response.errors) {
      setLoading(false)
      return
    }

    setValue('carnet', response.attributes?.carnet)
    setValue('institutional_email', response.attributes?.institutional_email)
    setValue('id', response?.id)

    const successMessage = !empty(formData?.id) ? 'Catedrático actualizado correctamente.' : 'Catedrático creado correctamente.'
    showMessage('¡Exito!', successMessage)

    setLoading(false)
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Catedráticos</h1>

        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={toggleForm}
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
              required
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
              required
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
              required
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
              required
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
              required
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
              initialValue={() => getInitialValue('genre', data)}
              label="Genero"
              error={errors?.genre}
              options={genders}
              setValue={setValue}
              clearErrors={clearErrors}
              required
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomCombobox
              name="status"
              control={control}
              placeholder="Activo"
              initialValue={() => getInitialValue('status', data)}
              label="Estado"
              error={errors?.status}
              options={teachersStatus}
              setValue={setValue}
              clearErrors={clearErrors}
              required
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomCombobox
              name="country_id"
              control={control}
              placeholder="El Salvador"
              initialValue={() => getInitialValue('country_id', data)}
              label="País"
              error={errors?.country_id}
              options={countries}
              setValue={setValue}
              clearErrors={clearErrors}
              required
            />
          </div>
          {!empty(departmentsOptions)
            && (
              <div className="w-1/4 p-2">
                <CustomCombobox
                  name="department_id"
                  control={control}
                  placeholder="San Salvador"
                  initialValue={() => getInitialValue('department_id', data)}
                  label="Departamento"
                  error={errors?.department_id}
                  options={departmentsOptions}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  required
                />
              </div>
            )}
          {!empty(municipaltiesOptions)
            && (
              <div className="w-1/4 p-2">
                <CustomCombobox
                  name="municipality_id"
                  control={control}
                  placeholder="Ciudad Delgado"
                  initialValue={() => getInitialValue('municipality_id', data)}
                  label="Municipio"
                  error={errors?.municipality_id}
                  options={municipaltiesOptions}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  required
                />
              </div>
            )}

        </fieldset>
        <fieldset className="flex flex-wrap mt-4 border rounded-md border-solid border-gray-300 p-3">
          <legend className="font-medium text-indigo-600">Datos académicos</legend>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="carnet"
              label="Código de catedrático"
              error={errors?.carnet}
              disabled={isSubmitting}
              register={register}
              placeholder="AL01220001"
              isReadOnly
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="institutional_email"
              label="Correo Institucional"
              error={errors?.institutional_email}
              disabled={isSubmitting}
              register={register}
              placeholder="AL01220001@itpsm.edu.sv"
              isReadOnly
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="entry_date"
              label="Año de entrada"
              error={errors?.entry_date}
              disabled={isSubmitting}
              register={register}
              required
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-wrap mt-4 border rounded-md border-solid border-gray-300 p-3">
          <legend className="font-medium text-indigo-600">Datos de trabajador</legend>
          <div className="w-1/4 p-2">
            <CustomFormatInput
              type="text"
              name="nit"
              label="NIT"
              error={errors?.nit}
              disabled={isSubmitting}
              register={register}
              format="####-######-###-#"
              placeholder="0000-000000-000-0"
              control={control}
              required
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomFormatInput
              type="text"
              name="dui"
              label="DUI"
              error={errors?.dui}
              disabled={isSubmitting}
              register={register}
              format="########-#"
              placeholder="00000000-0"
              control={control}
              required
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomFormatInput
              type="text"
              name="isss_number"
              label="Número de ISSS"
              error={errors?.isss_number}
              disabled={isSubmitting}
              register={register}
              format="#########"
              placeholder="000000000"
              control={control}
              required
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomFormatInput
              type="text"
              name="nup_number"
              label="NUP"
              error={errors?.nup_number}
              disabled={isSubmitting}
              register={register}
              format="############"
              placeholder="000000000000"
              control={control}
              required
            />
          </div>
        </fieldset>
      </div>
    </form>
  )
}

const getInitialValue = (field: string, data:any) => {
  switch (field) {
    case 'department_id':
      return empty(data?.department_id) ? {} : { value: data?.department_id, label: data?.department }
    case 'municipality_id':
      return empty(data?.municipality_id) ? {} : { value: data?.municipality_id, label: data?.municipality }
    case 'country_id':
      return empty(data?.country_id) ? {} : { value: data?.country_id, label: data?.country }
    case 'genre':
      return empty(data?.genre) ? {} : { value: data?.genre, label: data?.genre === 'M' ? 'Masculino' : 'Femenino' }
    case 'status':
      return empty(data?.status) ? {} : { value: data?.status, label: STATUS_LABEL[data?.status] }
    default:
      return {}
  }
}

const schema = yup.object().shape({
  carnet: yup.string(),
  institutional_email: yup.string(),
  name: yup.string().required('Campo obligatorio'),
  last_name: yup.string().required('Campo obligatorio'),
  birth_date: yup.string().required('Campo obligatorio'),
  nit: yup.string().required('Campo obligatorio').matches(/^\d{4}-\d{6}-\d{3}-\d{1}$/, { message: 'Formato incorrecto', excludeEmptyString: true }),
  dui: yup.string().required('Campo obligatorio').matches(/^\d{8}-\d{1}$/, { message: 'Formato incorrecto', excludeEmptyString: true }),
  isss_number: yup.string().required('Campo obligatorio').matches(/^\d{9}$/, { message: 'Formato incorrecto', excludeEmptyString: true }),
  nup_number: yup.string().required('Campo obligatorio').matches(/^\d{12}$/, { message: 'Formato incorrecto', excludeEmptyString: true }),
  email: yup.string().required('Campo obligatorio').email('Dirección de correo no válida.'),
  genre: yup.string().required('Campo obligatorio'),
  address: yup.string().required('Campo obligatorio'),
  phone_number: yup.string().nullable().matches(/^\d{4}-\d{4}$/, { message: 'Formato incorrecto', excludeEmptyString: true }),
  home_phone_number: yup.string().nullable().matches(/^\d{4}-\d{4}$/, { message: 'Formato incorrecto', excludeEmptyString: true }),
  municipality_id: yup.string().required('Campo obligatorio'),
  department_id: yup.string().required('Campo obligatorio'),
  country_id: yup.string().required('Campo obligatorio'),
  status: yup.string().required('Campo obligatorio'),
  entry_date: yup.number().typeError('Campo obligatorio').min(2010, 'Año minimo 2010'),
})

export default TeacherForm
