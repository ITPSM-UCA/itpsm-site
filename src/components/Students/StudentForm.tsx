import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'

interface Props {
  data: any
  toggleForm: () => void
}

const StudentForm = ({ data, toggleForm }: Props) => {
  const {
    register,
    handleSubmit,
    formState,
    // control,
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
          />
        </div>

        <div className="w-1/4 p-2">
          <CustomInput
            type="text"
            name="name"
            label="Nombre"
            error={errors?.name}
            disabled={isSubmitting}
            register={register}
          />
        </div>

        <div className="w-1/4 p-2">
          <CustomInput
            type="text"
            name="last_name"
            label="Apellido"
            error={errors?.last_name}
            disabled={isSubmitting}
            register={register}
          />
        </div>

        <div className="w-1/4 p-2">
          <CustomInput
            type="date"
            name="birth_date"
            label="Nacimiento"
            error={errors?.birth_date}
            disabled={isSubmitting}
            register={register}
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
          />
        </div>
      </div>
    </form>
  )
}

const schema = yup.object().shape({
  carnet: yup.string().required('Campo obligatiorio'),
  name: yup.string().required('Campo obligatiorio'),
  last_name: yup.string().required('Campo obligatiorio'),
  birth_date: yup.string().required('Campo obligatiorio'),
  email: yup.string().required('Campo obligatiorio').email('Email inválido'),
  address: yup.string().required('Campo obligatiorio'),
  phone_number: yup.string().nullable(),
  home_phone_number: yup.string().nullable(),
  gender: yup.string().required('Campo obligatorio'),
  relationship: yup.string().required('Campo obligatorio'),
  status: yup.string().required('Campo obligatorio'),
  //Agregar los campos que hacen falta
})

export default StudentForm
