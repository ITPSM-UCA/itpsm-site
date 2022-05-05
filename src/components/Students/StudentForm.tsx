import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import PhoneNumberInput from 'components/UI/Form/PhoneNumberInput'

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
    // reset,
    // watch
  } = useForm({
    mode: 'onBlur',
    defaultValues: data,
    resolver: yupResolver(schema),
  })

  const { errors, isSubmitting } = formState

  const onSubmit = (formData: any) => {
    console.log(formData)
  }

  return (
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
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            Atras
          </button>

          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2">
            Guardar Estudiante
          </button>
        </div>
      </div>

      <div className="flex flex-wrap mt-4">
        <div className="w-1/4 p-2">
          <CustomInput
            type="text"
            name="carnet"
            label="Carnet"
            error={errors?.carnet}
            disabled={isSubmitting}
            register={register}
            placeholder="999999999"
          />
        </div>

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
        <div className="w-1/4 p-2">
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
        <div className="w-1/4 p-2">
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
        <div className="w-1/4 p-2">
          <CustomInput
            type="date"
            name="entry_date"
            label="Fecha de entrada"
            error={errors?.entry_date}
            disabled={isSubmitting}
            register={register}
          />
        </div>
        <div className="w-1/4 p-2">
          <CustomInput
            type="date"
            name="date_high_school_degree"
            label="Fecha de título de Bachillerato"
            error={errors?.date_high_school_degree}
            disabled={isSubmitting}
            register={register}
          />
        </div>
        <div className="w-1/4 p-2">
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
        <div className="w-1/4 p-2">
          <CustomInput
            type="text"
            name="current_school_cycle"
            label="Ciclo actual"
            error={errors?.current_school_cycle}
            disabled={isSubmitting}
            register={register}
            placeholder="1"
          />
        </div>
      </div>
    </form>
  )
}

const schema = yup.object().shape({
  carnet: yup.string().required('Este campo es obligatorio.'),
  name: yup.string().required('Este campo es obligatorio.'),
  last_name: yup.string().required('Este campo es obligatorio.'),
  email: yup.string().required('Este campo es obligatorio.').email('Dirección de correo no válida.'),
  birth_date: yup.string().required('Este campo es obligatorio.'),
  address: yup.string().nullable(),
  phone_number: yup.string().nullable(),
  home_phone_number: yup.string().nullable(),
  gender: yup.string().required('Este campo es obligatorio.'), // queda pendiente
  relationship: yup.string().required('Este campo es obligatorio.'), // queda pendiente
  status_id: yup.string().required('Este campo es obligatorio.'), // queda pendiente
  blood_type: yup.string().nullable(), // queda pendiente
  mother_name: yup.string().nullable(),
  mother_phone_number: yup.string().nullable(),
  father_name: yup.string().nullable(),
  father_phone_number: yup.string().nullable(),
  emergency_contact_name: yup.string().nullable(),
  emergency_contact_phone: yup.string().nullable(),
  diseases: yup.string().nullable(),
  allergies: yup.string().nullable(),
  entry_date: yup.string().required('Este campo es obligatorio.'),
  date_high_school_degree: yup.string().required('Este campo es obligatorio.'),
  municipality_id: yup.string().required('Este campo es obligatorio.'), // queda pendiente
  department_id: yup.string().required('Este campo es obligatorio.'), // queda pendiente
  country_id: yup.string().required('Este campo es obligatorio.'), // queda pendiente
  medicines: yup.string().nullable(),
  current_school_cycle: yup.number(),
})

export default StudentForm
