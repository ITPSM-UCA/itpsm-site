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
  clearData: () => void,
  toggleForm: () => void,
  editRowAction: any,
  tableRef: any,
  columns: any[],
  fetchData: any,
  refreshTableAction:any
 
}

const EvaluationsForm = ({  clearData,toggleForm,fetchData,  tableRef,columns,editRowAction}: Props) => {
 
  
  const curriculumSubjects = useSelector((state: any) => state.config.curriculum_subjects)
  const schedule = useSelector((state: any) => state.config.schedules)
  const [loading, setLoading] = useState(false)

  const Days = [{ value: 1, label: 'Lunes' },{ value: 2, label: 'Martes' },{ value: 3, label: 'Miercoles' },{ value: 4, label: 'Jueves' },{ value: 5, label: 'Viernes' }]

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
  
    <div>
        <CustomTable
         edit={false}
          fetchData={fetchData}
          ref={tableRef}
          columns={columns}
          title="Catedráticos"
          onEditClickedAction={editRowAction}
          onRefreshTableClicked={refreshTableAction}
          //onDeleteClickedAction={deleteRowAction}
        />
      </div>
    </>
  )
}




export default EvaluationsForm
