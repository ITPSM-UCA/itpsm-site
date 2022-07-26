import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { showMessage } from 'utils/alerts'
import { useEffect, useState } from 'react'
import { customRound, empty } from 'utils/helpers'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import BodyLoadingButton from 'components/UI/BodyLoadingButton'
import { createStudent, updateStudent } from 'services/Students'
import PhoneNumberInput from 'components/UI/Form/PhoneNumberInput'
import {
  genders,
  homeArea,
  bloodTypes,
  STATUS_LABEL,
  relationships,
  studentsStatus,
  highSchoolTypes,
} from 'utils/constants/Constants'
import CurriculaRegistration from './CurriculaRegistration'

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
  const currentStudentID = watch('id')
  const currentCountry = watch('country_id')
  const currentEntryYear = watch('entry_date')
  const [municipaltiesOptions, setMunicipaltiesOptions] = useState([])
  const [departmentsOptions, setDepartmentsOptions] = useState([])
  const [dataForSubjectRegistration, setDataForSubjectRegistration] = useState({
    student_id: currentStudentID, entry_year: currentEntryYear, graduation_year: currentEntryYear + 3, cum: 0, curriculum_id: '',
  })

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

    const functionToExecute = !empty(formData?.id) ? updateStudent : createStudent
    const response = await functionToExecute(formData)

    if (response.errors) {
      setLoading(false)
      return
    }
    setDataForSubjectRegistration({
      student_id: response?.id,
      entry_year: response.attributes?.entry_date,
      graduation_year: customRound(response.attributes?.entry_date, 2) + 3,
      cum: 0,
      curriculum_id: '',
    })

    setValue('carnet', response.attributes?.carnet)
    setValue('institutional_email', response.attributes?.institutional_email)
    setValue('id', response?.id)

    const successMessage = !empty(formData?.id) ? 'Estudiante actualizado correctamente.' : 'Estudiante creado correctamente.'
    showMessage('¡Exito!', successMessage)

    setLoading(false)
  }

  let buttonText = <span>Guardar Estudiante</span>

  if (loading) {
    buttonText = <BodyLoadingButton />
  }

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Estudiantes</h1>

          <div className="flex gap-x-4">
            <button
              type="button"
              onClick={toggleForm}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Atras
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
              <CustomCombobox
                name="is_live_in_rural_area"
                control={control}
                placeholder="Urbana"
                initialValue={() => getInitialValue('rural_area', data)}
                label="Área del domicilio"
                error={errors?.is_live_in_rural_area}
                options={homeArea}
                setValue={setValue}
                clearErrors={clearErrors}
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
                name="gender"
                control={control}
                placeholder="Masculino"
                initialValue={() => getInitialValue('gender', data)}
                label="Genero"
                error={errors?.gender}
                options={genders}
                setValue={setValue}
                clearErrors={clearErrors}
                required
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
                placeholder="alvaro@gmail.com"
                required
              />
            </div>
            <div className="w-1/4 p-2">
              <CustomCombobox
                name="relationship"
                control={control}
                placeholder="Soltero"
                initialValue={() => getInitialValue('relationship', data)}
                label="Estado civil"
                error={errors?.relationship}
                options={relationships}
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
                initialValue={() => getInitialValue('status', data)}
                label="Estado"
                error={errors?.status}
                options={studentsStatus}
                setValue={setValue}
                clearErrors={clearErrors}
                required
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
                required
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
            <div className="w-1/4 p-2">
              <CustomCombobox
                name="is_private_high_school"
                control={control}
                placeholder="Pública"
                initialValue={() => getInitialValue('private_high_school', data)}
                label="Tipo de institución donde se graduó"
                error={errors?.is_private_high_school}
                options={highSchoolTypes}
                setValue={setValue}
                clearErrors={clearErrors}
              />
            </div>
            <div className="w-2/4 p-2">
              <CustomInput
                type="text"
                name="high_school_name"
                label="Nombre de la institución"
                error={errors?.high_school_name}
                disabled={isSubmitting}
                register={register}
                placeholder="Colegio ..."
              />
            </div>
            <div className="w-2/4 p-2">
              <CustomInput
                type="text"
                name="high_school_option"
                label="Tipo y opción de bachillerato"
                error={errors?.high_school_option}
                disabled={isSubmitting}
                register={register}
                placeholder="General"
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
                placeholder="B RH-"
                initialValue={() => getInitialValue('blood_type', data)}
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
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="w-1/3 inline-flex items-center p-3 shadow-sm text-sm justify-center font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none space-x-2"
          >
            {buttonText}
          </button>
        </div>
      </form>
      {!empty(currentStudentID) && (<CurriculaRegistration data={dataForSubjectRegistration} />)}
    </>

  )
}

const schema = yup.object().shape({
  carnet: yup.string(),
  name: yup.string().required('Campo obligatorio'),
  last_name: yup.string().required('Campo obligatorio'),
  email: yup.string().required('Campo obligatorio').email('Dirección de correo no válida.'),
  institutional_email: yup.string().email('Dirección de correo no válida.'),
  birth_date: yup.string(),
  address: yup.string().required('Campo obligatorio'),
  phone_number: yup.string().nullable().matches(/^\d{4}-\d{4}$/, { message: 'Formato incorrecto', excludeEmptyString: true }),
  home_phone_number: yup.string().nullable().matches(/^\d{4}-\d{4}$/, { message: 'Formato incorrecto', excludeEmptyString: true }),
  gender: yup.string().required('Campo obligatorio'),
  relationship: yup.string().required('Campo obligatorio'),
  status: yup.string().required('Campo obligatorio'),
  blood_type: yup.string(),
  mother_name: yup.string().nullable(),
  mother_phone_number: yup.string().nullable(),
  father_name: yup.string().nullable(),
  father_phone_number: yup.string().nullable(),
  emergency_contact_name: yup.string().nullable(),
  emergency_contact_phone: yup.string().nullable(),
  diseases: yup.string().nullable(),
  allergies: yup.string().nullable(),
  entry_date: yup.number().typeError('Campo obligatorio').min(2010, 'Año mínimo 2010'),
  entry_period: yup.number().typeError('Campo obligatorio').positive('Periodo no valido').max(2, 'Periodo entre 1 y 2'),
  date_high_school_degree: yup.number().typeError('Campo obligatorio').min(1980, 'Año mínimo 1980'),
  municipality_id: yup.string().required('Campo obligatorio'),
  department_id: yup.string().required('Campo obligatorio'),
  country_id: yup.string().required('Campo obligatorio'),
  medicines: yup.string().nullable(),
  is_live_in_rural_area: yup.boolean().nullable(),
  is_private_high_school: yup.boolean().nullable(),
  high_school_name: yup.string().nullable(),
  high_school_option: yup.string().nullable(),
})

const getInitialValue = (field: string, data:any) => {
  switch (field) {
    case 'department_id':
      return empty(data?.department_id) ? {} : { value: data?.department_id, label: data?.department }
    case 'municipality_id':
      return empty(data?.municipality_id) ? {} : { value: data?.municipality_id, label: data?.municipality }
    case 'country_id':
      return empty(data?.country_id) ? {} : { value: data?.country_id, label: data?.country }
    case 'gender':
      return empty(data?.gender) ? {} : { value: data?.gender, label: data?.gender === 'M' ? 'Masculino' : 'Femenino' }
    case 'relationship':
      return empty(data?.relationship) ? {} : { value: data?.relationship, label: data?.relationship === 'S' ? 'Soltero' : 'Casado' }
    case 'status':
      return empty(data?.status) ? {} : { value: data?.status, label: STATUS_LABEL[data?.status] }
    case 'blood_type':
      return empty(data?.blood_type) ? {} : { value: data?.blood_type, label: data?.blood_type }
    case 'rural_area':
      return data?.is_live_in_rural_area === '' ? {} : { value: data?.is_live_in_rural_area, label: data?.is_live_in_rural_area ? 'Rural' : 'Urbana' }
    case 'private_high_school':
      return data?.is_private_high_school === '' ? {} : { value: data?.is_private_high_school, label: data?.is_private_high_school ? 'Privada' : 'Pública' }
    default:
      return {}
  }
}

export default StudentForm
