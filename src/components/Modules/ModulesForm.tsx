import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { AnyObjectSchema } from 'yup'

const schema: AnyObjectSchema = yup.object().shape({
    code: yup.number()
    .transform(value => isNaN(value) || value === null || value === undefined ? undefined : value)
    .required('Este campo es obligatorio.')
    .integer('El valor de este campo debe ser un entero.')
    .positive('El valor de este campo debe ser un entero positivo.'),
    name: yup.string()
        .required('Este campo es obligatorio.')
        .max(255, 'Este campo tiene como límite máximo 255 carácteres para ingresar.')
})

const ModulesForm = ({
    data,
    clearData,
    toggleForm
}: FormProps) => {
    const {
        register, handleSubmit,
        formState, control,
        setValue, clearErrors
    } = useForm({
        mode: 'onBlur', // Validation will trigger on the blur event
        defaultValues: data,
        resolver: yupResolver(schema) // Allows handling validations with X library
    })

    let buttonText = <span>Guardar módulo</span>

    const { errors, isSubmitting } = formState

    const onCreateModules = () => {}
    const onCloseForm = () => {
        clearData()
        toggleForm()
    }

    return (
        <>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onCreateModules)}>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Plan de estudio</h1>
                    <div className="flex gap-x-4">
                        <button
                            type="button"
                            onClick={onCloseForm}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                            Atrás
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
                        <legend className="font-medium text-indigo-600">Datos</legend>
                        <div className="w-1/2 p-2">
                            <CustomInput type="number" name="code" label="Código"
                                error={ errors?.code } disabled={ isSubmitting } register={ register }
                                placeholder="200058"/>
                        </div>
                        <div className="w-1/2 p-2">
                            <CustomInput type="text" name="name" label="Nombre"
                                error={ errors?.name } disabled={ isSubmitting } register={ register }
                                placeholder="Diseño de Modelos de Negocios"/>
                        </div>
                    </fieldset>
                </div>
            </form>
        </>
    )
}

export default ModulesForm