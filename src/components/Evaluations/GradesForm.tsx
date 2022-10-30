import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import { useState,useRef } from 'react'
import Loader from 'components/UI/Loader'
import { useSelector } from 'react-redux'
import CustomCombobox from 'components/UI/Form/CustomCombobox'
import { createEvaluation,deleteEvaluation,getgrades,publishEvaluation,savegrades,publishGrades} from 'services/Evaluation'
import { showMessage } from 'utils/alerts'
import CustomTable from 'components/UI/CustomTable/CustomTable'
interface Props {
  data: any,
  clearData: () => void,
  toggleForm: () => void,
  tableRef: any,
 
}

const GradesForm = ({ data, clearData,toggleForm,   tableRef}: Props) => {
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
  const saveGrades = async (data:any) => {
    console.log("hi");
    console.log(data)
    console.log(Object.keys(data))
    const rows=Object.keys(data)
    let datatransfer=[]
    rows.forEach(valor =>{
      datatransfer.push({
        evaluation_id:data[valor].newData.id,
        student_id:data[valor].newData.student_id,
        score:data[valor].newData.score,
        oldscore:data[valor].oldData.score
      })
      
    })
    const response = await savegrades(datatransfer)

    if (response.error) {
      setLoading(false)
      return
    }

   
    showMessage('¡Exito!', "Notas Cargadas ")
    refreshTableAction()
    setLoading(false)
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
 
  const fetchData = async (query:any) => {
    const customQuery = {
      query: [{
        field: 'ev.id',
        op: '=',
        data: data.id,
      }],
    }
    const { rows, page, records } = await getgrades(query,customQuery)
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
  const shareGrades = () => {
    const response = publishGrades(data.id)
    console.log(response)
    if (response.error) {
      setLoading(false)
      return
    }
    showMessage('¡Exito!', "Notas Publicadas ")
  }
  return (
    <>
    <button
        type="button"
        onClick={onCloseForm}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        Atras
      </button>
      <button
        type="button"
        onClick={shareGrades}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        Publicar
      </button>
   <h1>{data?.description + " de " + data?.materia + " seccion " + data?.code}</h1>
    <div>
        <CustomTable
          edit={true}
          fetchData={fetchData}
          ref={tableRef}
          columns={columns}
          title="Catedráticos"
          //onEditClickedAction={editRowAction}
          bulkedit={saveGrades}
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

  { title: 'Carnet', field: 'carnet',editable: 'never' },
  { title: 'Nombre', field: 'name',editable: 'never',  render: (rowData:any) => <p>{rowData.name + " "+ rowData.last_name}</p> },
  { title: 'Nota', field: 'score',type:'numeric' },

]
export default GradesForm
