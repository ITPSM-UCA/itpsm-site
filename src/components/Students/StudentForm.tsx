import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import PhoneNumberInput from 'components/UI/Form/PhoneNumberInput'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { useEffect, useState } from 'react'
import Loader from 'components/UI/Loader'
import { createStudent, updateStudent } from 'services/Students'
import { empty } from 'utils/helpers'
import { useSelector } from 'react-redux'
import { bloodTypes, genders, relationships } from 'utils/constants/Constants'

interface Props {
  data: any
  toggleForm: () => void
}

const StudentForm = ({ data, toggleForm }: Props) => {
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
      const departmentFiltered: any = countries.find((value: any) => value.value === currentCountry)
      setDepartmentsOptions(departmentFiltered?.departments)
    }

    if (!empty(data.department_id)) {
      const departmentFiltered: any = countries.find((value: any) => value.value === currentCountry)
      setDepartmentsOptions(departmentFiltered?.departments)
    }
  }, [currentCountry])

  useEffect(() => {
    if (!empty(currentDepartment) && empty(data.municipality_id)) {
      setMunicipaltiesOptions([])
      setValue('municipality_id', '')
      const municipalityFiltered: any = departmentsOptions.find((value: any) => value.value === currentDepartment)
      setMunicipaltiesOptions(municipalityFiltered?.municipalities)
    }

    if (!empty(data.municipality_id)) {
      const municipalityFiltered: any = departmentsOptions.find((value: any) => value.value === currentDepartment)
      setMunicipaltiesOptions(municipalityFiltered?.municipalities)
    }
  }, [currentDepartment, departmentsOptions])

  const STATUS_LABEL: any = {
    A: 'Activo',
    G: 'Graduado',
    E: 'Egresado',
    I: 'Inactivo',
  }

  const initialDepartment = empty(data?.department_id) ? {} : {
    value: data?.department_id,
    label: data?.department,
  }

  const initialMunicipality = empty(data?.municipality_id) ? {} : {
    value: data?.municipality_id,
    label: data?.municipality,
  }

  const initialCountry = empty(data?.country_id) ? {} : {
    value: data?.country_id,
    label: data?.country,
  }

  const initialGender = empty(data?.gender) ? {} : {
    value: data?.gender,
    label: data?.gender === 'M' ? 'Masculino' : 'Femenino',
  }

  const initialRelationship = empty(data?.relationship) ? {} : {
    value: data?.relationship,
    label: data?.relationship === 'S' ? 'Soltero' : 'Casado',
  }

  const initialStatus = empty(data?.status) ? {} : {
    value: data?.status,
    label: STATUS_LABEL[data?.status],
  }

  const initialBloodType = empty(data?.blood_type) ? {} : {
    value: data?.blood_type,
    label: data?.blood_type,
  }

  const onCreateStudent = async (formData: any) => {
    setLoading(true)
    let response: any
    if (!empty(formData?.id)) {
      response = await updateStudent(formData, formData.id)
    }
    else {
      response = await createStudent(formData)
    }

    if (response.error) {
      setLoading(false)
      return
    }

    setLoading(false)
    setValue('carnet', response.attributes?.carnet)
    setValue('institutional_email', response.attributes?.institutional_email)

    // toggleForm()
  }

  let buttonText = <span>Guardar Estudiante</span>

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
      onSubmit={handleSubmit(onCreateStudent)}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Estudiantes</h1>

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
              name="gender"
              control={control}
              placeholder="Masculino"
              initialValue={initialGender}
              label="Genero"
              error={errors?.gender}
              options={genders}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="email"
              label="Correo Personal"
              error={errors?.email}
              disabled={isSubmitting}
              register={register}
              placeholder="alvaro1@gmail.com"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomCombobox
              name="relationship"
              control={control}
              placeholder="Soltero"
              initialValue={initialRelationship}
              label="Estado civil"
              error={errors?.relationship}
              options={relationships}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomCombobox
              name="country_id"
              control={control}
              placeholder="El Salvador"
              initialValue={initialCountry}
              label="País"
              error={errors?.country_id}
              options={countries}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
          {!empty(departmentsOptions)
            && (
              <div className="w-1/4 p-2">
                <CustomCombobox
                  name="department_id"
                  control={control}
                  placeholder="San Salvador"
                  initialValue={initialDepartment}
                  label="Departamento"
                  error={errors?.department_id}
                  options={departmentsOptions}
                  setValue={setValue}
                  clearErrors={clearErrors}
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
                  initialValue={initialMunicipality}
                  label="Municipio"
                  error={errors?.municipality_id}
                  options={municipaltiesOptions}
                  setValue={setValue}
                  clearErrors={clearErrors}
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
              label="Carnet"
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
            <CustomCombobox
              name="status"
              control={control}
              placeholder="Activo"
              initialValue={initialStatus}
              label="Estado"
              error={errors?.status}
              options={[{ value: 'A', label: 'Activo' }, { value: 'E', label: 'Egresado' }, { value: 'G', label: 'Graduado' }]}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="entry_period"
              label="Periodo de entrada"
              error={errors?.entry_period}
              disabled={isSubmitting}
              register={register}
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
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="number"
              name="date_high_school_degree"
              label="Año de título de Bachillerato"
              error={errors?.date_high_school_degree}
              disabled={isSubmitting}
              register={register}
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-wrap mt-4 border rounded-md border-solid border-gray-300 p-3">
          <legend className="font-medium text-indigo-600">Cuadro clínico</legend>
          <div className="w-1/4 p-2">
            <CustomCombobox
              name="blood_type"
              control={control}
              placeholder="B-"
              initialValue={initialBloodType}
              label="Tipo de sangre"
              error={errors?.blood_type}
              options={bloodTypes}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
          <div className="w-3/4 p-2">
            <CustomInput
              type="text"
              name="diseases"
              label="Enfermedades"
              error={errors?.diseases}
              disabled={isSubmitting}
              register={register}
              placeholder="Diabetes"
            />
          </div>
          <div className="w-1/2 p-2">
            <CustomInput
              type="text"
              name="allergies"
              label="Alergias"
              error={errors?.allergies}
              disabled={isSubmitting}
              register={register}
              placeholder="Abejas"
            />
          </div>
          <div className="w-1/2 p-2">
            <CustomInput
              type="text"
              name="medicines"
              label="Medicinas"
              error={errors?.medicines}
              disabled={isSubmitting}
              register={register}
              placeholder="Acetaminofen"
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-wrap mt-4 border rounded-md border-solid border-gray-300 p-3">
          <legend className="font-medium text-indigo-600">Datos de contacto</legend>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="mother_name"
              label="Nombre de la madre"
              error={errors?.mother_name}
              disabled={isSubmitting}
              register={register}
              placeholder="Andrea"
            />
          </div>
          <div className="w-1/4 p-2">
            <PhoneNumberInput
              type="tel"
              name="mother_phone_number"
              label="Teléfono"
              error={errors?.mother_phone_number}
              disabled={isSubmitting}
              control={control}
              placeholder="7777-5555"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="father_name"
              label="Nombre del padre"
              error={errors?.father_name}
              disabled={isSubmitting}
              register={register}
              placeholder="Luis"
            />
          </div>
          <div className="w-1/4 p-2">
            <PhoneNumberInput
              type="tel"
              name="father_phone_number"
              label="Teléfono"
              error={errors?.father_phone_number}
              disabled={isSubmitting}
              control={control}
              placeholder="7777-5555"
            />
          </div>
          <div className="w-1/4 p-2">
            <CustomInput
              type="text"
              name="emergency_contact_name"
              label="Contacto de emergencia"
              error={errors?.emergency_contact_name}
              disabled={isSubmitting}
              register={register}
              placeholder="Ana"
            />
          </div>
          <div className="w-1/4 p-2">
            <PhoneNumberInput
              type="tel"
              name="emergency_contact_phone"
              label="Teléfono del contacto de emergencia"
              error={errors?.emergency_contact_phone}
              disabled={isSubmitting}
              control={control}
              placeholder="7777-5555"
            />
          </div>
        </fieldset>
      </div>
    </form>
  )
}

const schema = yup.object().shape({
  carnet: yup.string(),
  name: yup.string().required('Este campo es obligatorio.'),
  last_name: yup.string().required('Este campo es obligatorio.'),
  email: yup.string().required('Este campo es obligatorio.').email('Dirección de correo no válida.'),
  institutional_email: yup.string(),
  birth_date: yup.string().required('Este campo es obligatorio.'),
  address: yup.string().required('Este campo es obligatorio.'),
  phone_number: yup.string().nullable(),
  home_phone_number: yup.string().nullable(),
  gender: yup.string().required('Este campo es obligatorio.'),
  relationship: yup.string().required('Este campo es obligatorio.'),
  status: yup.string().required('Este campo es obligatorio.'),
  blood_type: yup.string().required('Este campo es obligatorio.'),
  mother_name: yup.string().nullable(),
  mother_phone_number: yup.string().nullable(),
  father_name: yup.string().nullable(),
  father_phone_number: yup.string().nullable(),
  emergency_contact_name: yup.string().nullable(),
  emergency_contact_phone: yup.string().nullable(),
  diseases: yup.string().nullable(),
  allergies: yup.string().nullable(),
  entry_date: yup.number().typeError('El campo debe de ser numerico').required('Este campo es obligatorio.').positive('El valor debe de ser positivo'),
  entry_period: yup.number().typeError('El campo debe de ser numerico').required('Este campo es obligatorio.').max(2, 'El valor máximo es 2').min(1, 'El valor mínimo es 1').positive('El valor debe de ser positivo'),
  date_high_school_degree: yup.number().typeError('El campo debe de ser numerico').required('Este campo es obligatorio.').positive('El valor debe de ser positivo'),
  municipality_id: yup.string().required('Este campo es obligatorio.'),
  department_id: yup.string().required('Este campo es obligatorio.'),
  country_id: yup.string().required('Este campo es obligatorio.'),
  medicines: yup.string().nullable(),
})

export default StudentForm
