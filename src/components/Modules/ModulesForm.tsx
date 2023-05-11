import { yupResolver } from '@hookform/resolvers/yup'
import CustomTable from 'components/UI/CustomTable/CustomTable'
import CustomInput from 'components/UI/Form/CustomInput'
import Loader from 'components/UI/Loader'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getCurricula } from 'services/Curriculum'
import createModule from 'services/Modules/createModule'
import getCurriculaByModuleId from 'services/Modules/getCurriculaByModuleId'
import updateModule from 'services/Modules/updateModule'
import { showMessage } from 'utils/alerts'
import { empty } from 'utils/helpers'
import * as yup from 'yup'
import { AnyObjectSchema } from 'yup'

const columns = [
    { field: 'id', hidden: true },
    { field: 'career_id', hidden: true },
    { title: 'Nombre', field: 'name' },
    { title: 'Carrera', field: 'career_name' },
    { title: 'Año', field: 'year' },
    {
        title: 'Estado',
        field: 'is_active',
        lookup: { 1: 'Activo', 0: 'Desactivado' },
    },
    {
        title: '',
        field: 'is_approved',
        lookup: { 1: 'Aprobado', 0: 'En edición' },
    },
]

const schema: AnyObjectSchema = yup.object().shape({
    code: yup.string()
        .required('Este campo es obligatorio.')
        .matches(/^[\d]+$/, 'Este campo admite únicamente números enteros.')
        .max(6, 'Este campo tiene como límite máximo 6 caracteres para ingresar.'),
    name: yup.string()
        .required('Este campo es obligatorio.')
        .matches(/^[a-zA-z\s\u00C0-\u00FF]+$/, 'Este campo admite únicamente letras y espacios')
        .max(255, 'Este campo tiene como límite máximo 255 caracteres para ingresar.')
})

const ModulesForm = ({
    data,
    clearData,
    toggleForm
}: FormProps) => {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onBlur', // Validation will trigger on the blur event
        defaultValues: data,
        resolver: yupResolver(schema) // Allows handling validations with X library
    })

    let buttonText = <span>Guardar módulo</span>

    const { errors, isSubmitting } = formState
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmitModule = async (formData: any) => {
        setLoading(true)

        const submit = empty(formData?.id) ? createModule : updateModule
        const response = await submit(formData)
        
        if(response.errors) {
            setLoading(false)
            
            if(!response.wasHandled)
                showMessage('Error...', response.errors[0].title, 'error')

            return
        }
        
        const msg = empty(formData?.id) ? 'Módulo creado correctamente.' : 'Módulo actualizado correctamento.'

        showMessage('¡Exito!', msg)
        setLoading(false)
        toggleForm()
        clearData()
        return
    }

    const onCloseForm = () => {
        clearData()
        toggleForm()
    }

    const fetchData = async (materialTableQuery: any) => {
        return { ...await getCurriculaByModuleId(materialTableQuery, data.id) }
    }

    if (loading) buttonText = (<><Loader className="h-4 w-4"/><span>Cargando...</span></>)

    return (
        <>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitModule)}>
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Módulos</h1>
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
            </form>

            <div>
                <fieldset className="flex flex-wrap mt-4 border rounded-md border-solid border-gray-300 p-3">
                    <legend className="font-medium text-indigo-600">Datos</legend>
                    <div className="w-1/2 p-2">
                        <CustomInput type="number" name="code" label="Código"
                            error={ errors?.code } disabled={ isSubmitting } register={ register } isReadOnly={ data.id ? true : false }
                            placeholder="200058"/>
                    </div>
                    <div className="w-1/2 p-2">
                        <CustomInput type="text" name="name" label="Nombre"
                            error={ errors?.name } disabled={ isSubmitting } register={ register }
                            placeholder="Diseño de Modelos de Negocios"/>
                    </div>
                </fieldset>

                {data.id ? 
                    <fieldset className="mt-4 border rounded-md border-solid border-gray-300 p-3">
                    <legend className="font-medium text-indigo-600">Planes de estudios</legend>
                        <CustomTable
                            collapsable={false}
                            edit={ false }
                            columns={ columns }
                            fetchData={ fetchData }
                            title="Planes de estudios"
                            searchFieldRegex={/^(?:[A-Za-z\s\d]*)$/}
                        />
                    </fieldset>
                : null}
                </div>
        </>
    )
}

export default ModulesForm