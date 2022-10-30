import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import { useState,useRef } from 'react'
import Loader from 'components/UI/Loader'
import { useSelector } from 'react-redux'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { createEvaluation,deleteEvaluation,getEvaluations,publishEvaluation } from 'services/Evaluation'
import { showMessage } from 'utils/alerts'
import CustomTable from 'components/UI/CustomTable/CustomTable'
interface Props {
  data: any,
  clearData: () => void,
  toggleForm: () => void,
  tableRef: any,
 
}

const EvaluationsForm = ({ data, clearData,toggleForm,   tableRef}: Props) => {
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
  const curriculumSubjects = useSelector((state: any) => state.config.curriculum_subjects)
  const schedule = useSelector((state: any) => state.config.schedules)
  const [loading, setLoading] = useState(false)
  const curriculumSubjectsList = transformCurriculumSubjects(curriculumSubjects)
  const schedulesList = transformschedule(schedule)
  const Days = [{ value: 1, label: 'Lunes' },{ value: 2, label: 'Martes' },{ value: 3, label: 'Miercoles' },{ value: 4, label: 'Jueves' },{ value: 5, label: 'Viernes' }]
  const onSetEvaluationToSubject = async (formData: any) => {
    console.log(formData)
    setLoading(true)
    
    const response = await createEvaluation(formData)

    if (response.error) {
      setLoading(false)
      return
    }

   
    showMessage('¡Exito!', "Actividad Creada")
    refreshTableAction()
    setLoading(false)
  }
  const publish = async () => {
    console.log(data)
    if(confirm("Desea publicar actividades")){
    setLoading(true)
    
    const response = await publishEvaluation(data.code)

    if (response.error) {
      setLoading(false)
      return
    }

   
    showMessage('¡Exito!', "Evaluaciones publicadas")
    refreshTableAction()
    setLoading(false)
    }
  }
  const refreshTableAction = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange()
    }
  }
  const deleteRowAction = (event:any, rowData:any) => {
    event.stopPropagation();
    if(confirm("Desea borrar esta actividad")){
      console.log(rowData)
      const response = deleteEvaluation(rowData.id)
      console.log(response)
      refreshTableAction()
    }
    
    
  }
  console.log(data)
  const fetchData = async (query:any) => {
    const customQuery = {
      query: [{
        field: 's.id',
        op: '=',
        data: data.code,
      }],
    }
    const { rows, page, records } = await getEvaluations(query,customQuery)
    return {
      rows,
      page,
      records,
    }
  }



  let buttonText = <span>Asociar Evaluacion</span>

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
  const onCloseForm = () => {
    clearData()
    toggleForm()
  }
  return (
    <>
     <button
      onClick={publish}
             
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2">
              Publicar
            </button>
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSetEvaluationToSubject)}
    >   <div className="flex justify-between">
    <h1 className="text-2xl font-semibold text-gray-900">{data.curriculum_subject_label}</h1>

    <div className="flex gap-x-4">
      <button
        type="button"
        onClick={onCloseForm}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        Atras
      </button>
     
    </div>
  </div>
      <div>
        <fieldset className="flex flex-wrap border rounded-md border-solid border-gray-300 p-3 mb-2">
          <legend className="font-medium text-indigo-600">Crear Evaluacion</legend>
          <div className="w-1/4 p-2">
              <CustomInput
                type="text"
                name="name"
                label="Nombre de Actividad"
                error={errors?.name}
                disabled={isSubmitting}
                register={register}
                required
              />
            </div>
            <div className="w-1/4 p-2">
              <CustomInput
                type="text"
                name="description"
                label="Descripcion"
                error={errors?.description}
                disabled={isSubmitting}
                register={register}
                required
              />
            </div>
          <div className="w-1/4 p-2">
              <CustomInput
                type="date"
                name="date"
                label="Fecha de evaluacion"
                error={errors?.birth_date}
                disabled={isSubmitting}
                register={register}
                required
              />
            </div>
            <div className="w-1/4 p-2">
              <CustomInput
                type="number"
                name="percentage"
                label="Porcentaje"
                error={errors?.percentage}
                disabled={isSubmitting}
                register={register}
                required
              />
            </div>
          <div className="w-1/4 p-2 self-end">
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2">
              {buttonText}
            </button>
          </div>
        </fieldset>
      </div>
    </form>
    <div>
        <CustomTable
          fetchData={fetchData}
          ref={tableRef}
          columns={columns}
          title="Catedráticos"
          //onEditClickedAction={editRowAction}
          onRefreshTableClicked={refreshTableAction}
          onDeleteClickedAction={deleteRowAction}
        />
      </div>
    </>
  )
}

const schema = yup.object().shape({
  name:yup.string().required('Este campo es obligatorio.'),
  description:yup.string().required('Este campo es obligatorio.'),
  id_schedule: yup.string().required('Este campo es obligatorio.'),
  percentage: yup.number().required('Este campo es obligatorio.').positive(),
  curriculum_subject_id: yup.number().required('Este campo es obligatorio.').positive().integer(),
  code: yup.number().positive(),
  period_id: yup.number().required('Este campo es obligatorio.').positive().integer(),
})

const transformCurriculumSubjects = (subjects: any) => subjects.map((subject: any) => ({
  value: subject?.attributes?.subject_id,
  label: subject?.attributes?.subject_name,
}))
const transformschedule = (schedules: any) => schedules.map((schedule: any) => ({
  value: schedule?.attributes?.id,
  label: schedule?.attributes?.horario,
}))

const columns = [

  { title: 'Nombre', field: 'name' },
  { title: 'Descripcion', field: 'description' },
  { title: 'Fecha', field: 'date' },
  { title: 'Porcentaje', field: 'percentage' },
  { title: 'Visibilidad', field: 'is_public',  lookup: { 0: 'Oculto', 1: 'Publico' }, },

]
export default EvaluationsForm
