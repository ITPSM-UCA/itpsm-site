import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomInput from 'components/UI/Form/CustomInput'
import { useState } from 'react'
import Loader from 'components/UI/Loader'

import 'react-tabs/style/react-tabs.css';

import CustomCombobox from 'components/UI/Form/CustomCombobox'
import {
  createEvaluation, deleteEvaluation, getEvaluations, publishEvaluation, publishResult, RequestAprobacion,
} from 'services/Evaluation'
import { showMessage } from 'utils/alerts'
import CustomTable from 'components/UI/CustomTable/CustomTable'
import CustomCheckbox from 'components/UI/Form/CustomCheckbox'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
//intento 5
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";


interface Props {
  data: any,
  clearData: () => void,
  toggleForm: () => void,
  tableRef: any,
  tableRef2: any,

}

const EvaluationsForm = ({
  data,
  clearData,
  toggleForm,
  tableRef,
  tableRef2,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    clearErrors,
    // reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: data,
    resolver: yupResolver(schema),
  })
  const [open, setOpen] = useState(false)
  const {
    errors,
    isSubmitting,
  } = formState
  const handleClickOpen = () => {
    setOpen(!open)
  }
  const [loading, setLoading] = useState(false)
  const [sub, setSub] = useState(false)
  const [publishoption, setPublish] = useState(false)
  const [requestoption, setRequest] = useState(false)
  const stored = JSON.parse(localStorage.getItem('appState') ?? ' ')
  //intento5
  const [tabIndex, setTabIndex] = useState(0);
  const [EvaluationsDontExist, setEvaluationsDontExist] = useState(true);

  const onSetEvaluationToSubject = async (formData: any) => {
    // console.log("fordata",formData)
    setLoading(true)
    formData.description= formData.subdescription
    formData.date=formData.subdate
    formData.percentage = formData.subpercentage

    const response = await createEvaluation(formData)
    if (response.errors) {
      setLoading(false)
      return
    }
    // console.log('h')
    showMessage('¡Exito!', 'Actividad Creada')

    refreshTableAction()
    setLoading(false)
  }

  const onSetsubEvaluationToSubject = async (formData: any) => {
    formData.sub_eval =true
    formData.name= formData.subname
    formData.description= formData.subdescription
    formData.date=formData.subdate
    formData.percentage = formData.subpercentage
    // console.log("sub-fordata",formData)
    

    setLoading(true)

    const response = await createEvaluation(formData)
    if (response.errors) {
      setLoading(false)
      return
    }
    // console.log('h')
    showMessage('¡Exito!', 'Actividad Creada')

    refreshTableAction()
    setLoading(false)
  }

  const publish = async () => {
    // console.log(data)
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Desea publicar actividades')) {
      setLoading(true)

      const response = await publishEvaluation(data.code)

      if (response.error) {
        setLoading(false)
        return
      }

      showMessage('¡Exito!', 'Evaluaciones publicadas')
      refreshTableAction()
      setLoading(false)
    }
  }
  const aprobar = async (result: string) => {
    // console.log(data, result)
    const comment = (document.getElementById('comments') as HTMLInputElement).value
    let status = 0;
    (result == 'A') ? status = 2 : result == 'R' ? status = 3 : null
    const datos = {
      id: data.id,
      status,
      comment,
    }
    // eslint-disable-next-line no-restricted-globals

    setLoading(true)

    const response = await publishResult(datos)
    setOpen(!open)
    setLoading(false)
    //  if (response.error) {

    // }
  }
  const aprobacion = async () => {
    const datos = {
      id: data.id,
    }
    // eslint-disable-next-line no-restricted-globals

    setLoading(true)

    const response = await RequestAprobacion(datos)

    //  if (response.error) {

    // }
  }
  const refreshTableAction = () => {
    setEvaluations([])
    // console.log(tableRef)

    if (tableRef.current) {
      tableRef.current.onQueryChange()
      transformData(tableRef.current.dataManager.data)
    }
  }
  const deleteRowAction = (event: any, rowData: any) => {
    event.stopPropagation()
    if (confirm('Desea borrar esta actividad')) {
      // console.log(rowData)
      const response = deleteEvaluation(rowData.id)
      // console.log(response)
      refreshTableAction()
    }
  }
  const [evaluations, setEvaluations] = useState([])
  const transformData = (data: any) => {
    const ac = data.map((e: any) => ({
      value: e.id,
      label: e.name,
    }))
    setEvaluations(ac)
    // console.log(evaluations)

    let suma = 0
    const sumas2: number[] = []
    let evalu =[]
    let subeval=[]
    data.forEach((e: any) => {
      if (e.level === 1) {
        suma += e.percentage
      } else {
        let suma2 = 0

        data.filter((j: any) => j.principal_id === e.principal_id)
          .forEach((m: any) => {
            suma2 += m.percentage
          })
        sumas2.push(suma2)
      }
    })

    //crear nueva validación de pr
    // evalu.forEach(e=>{
    //   suma2=0
    //   let subeval =[]
    //   subeval=e.subevaluation
    //   suma= e.percentage

    //   subeval.forEach(s => {
    //     suma2=s.percentage
    //   })
      
    // })
    // console.log("sumas eval",suma)
    // console.log(sumas2.some((element) => element < 100))
    // console.log("sumas subeval",sumas2)
    if (suma === 100 && !sumas2.some((element) => element < 100)) {
      setRequest(true)
    }
    if (data.length > 0 && data[0].is_approved === 2) {
      setPublish(true)
      setRequest(false)
    }
  }
  const updatecolumns = (data: any) => {
    columns2 = [

      {
        title: 'Estudiante',
        field: 'name',
      },

    ]
    data.forEach((e: any) => (columns2.push({
      title: e.name,
      field: e.name,
    })))
  }
  
  const fetchData = async (query: any) => {
    setEvaluationsDontExist(true)
    const customQuery = {
      query: [{
        field: 's.id',
        op: '=',
        data: data.code,        
      }],
    }
    const {
      rows,
      page,
      records,
    } = await getEvaluations(query, customQuery)
    // console.log("lineas")
    

    let evalu:any =[]
    let subeval:any=[]
    //colocamos la infomrracion recibida de la api entre evaluaciones y subevaluaciones
    //rowdata es es data anidada
    let rowdata= rows
    // console.log(rowdata)
    rowdata.forEach((element : any) => {
      // console.log(element)
      // console.log(element.id)

      if (element.level==1) {
        // console.log("entrando en evaluacion")
        setEvaluationsDontExist(false)
        // console.log("eval", element)
        evalu.push(element)
      }else{
        subeval.push(element)
      }
      element.parentId=null
      if (element.level==2) {
        // console.log("agregando ParentId")
        element.parentId=element.principal_id
        // console.log("nuevas evaluaciones", element)
      }
    });

    

    evalu.forEach((e:any) => {
      e.subevaluation=[]
      // console.log("id", e.id)
      let idaux= parseInt(e.id)
      e.id = idaux
      // console.log("nuevaeval",e)
      subeval.forEach((sub:any) => {
        if (sub.principal_id== e.id ) {
          // console.log("Encontré una subevaluación")
          console.log(sub)
          e.subevaluation.push(sub)
        }
      });
    });

    // //ahora recorremos este objeto de evaluaciones y verificamos si tiene subevaluaciones
    // console.log("Evaluaciones nueva", evalu)
    // console.log("Evaluaciones finales", rows)
    // rows=rowdata
    let sumeval=0
    let sumsubeval=0
    evalu.forEach((e:any)=>{
      e.subevaluation
    })
    // console.log("Evaluaciones finales2", rows)
    transformData(rows)
    /// updatecolumns(rows)
    return {
      rows,
      page,
      records,
    }
  }

  let buttonText = <span>Asociar Evaluacion</span>
  let buttonText2 = <span>Asociar Subevaluacion</span>

  const divFormStyle = {
    backgroundColor: "#eee",
    padding: "10px",
    borderRadius:10,
  };


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
      {stored.attributes.roles[0].name !== 'admin' && publishoption && (
        <>
          <button
            onClick={publish}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
          >
            Publicar
          </button>
          <button
            type="button"
            onClick={onCloseForm}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Atras
          </button>
        </>
      )}
      {stored.attributes.roles[0].name !== 'admin' && requestoption && (
        <>
          <button
            onClick={aprobacion}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
          >
            Solicitar Aprobacion
          </button>
          <button
            type="button"
            onClick={onCloseForm}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Atras
          </button>
        </>
      )}
      {stored.attributes.roles[0].name === 'admin' && (
        <>
          <button
            onClick={handleClickOpen}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
          >
            Procesar
          </button>
          <button
            type="button"
            onClick={onCloseForm}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Atras
          </button>
          <Dialog open={open} onClose={handleClickOpen} maxWidth="md" fullWidth>
            <DialogTitle>Comentarios</DialogTitle>
            <DialogContent>

              <TextField
                autoFocus
                margin="dense"
                id="comments"
                label="Comentarios"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>

              <button onClick={() => aprobar('A')}>Aprobar</button>
              <button onClick={() => aprobar('R')}>Rechazar</button>
              <button onClick={handleClickOpen}>Cancelar</button>
            </DialogActions>
          </Dialog>
        </>
      )}
      {stored.attributes.roles[0].name !== 'admin' && !publishoption && (
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSetEvaluationToSubject)}
        >
          <div className="flex justify-between">
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
              <div className="w-1/4 p-2 pb-3 flex items-end gap-x-10">
                {evaluations.length > 0 && (
                  <CustomCheckbox
                    name="sub_eval"
                    label="Subevaluacion"
                    // error={errors?.is_active}
                    disabled={isSubmitting}
                    register={register}
                    onChange={() => setSub(!sub)}
                  />
                )}

              </div>
              {sub
                && (
                  <CustomCombobox
                    name="sub_eval_id"
                    control={control}
                    placeholder=""
                    label="Evaluacion Principal"
                    error={errors?.eval_id}
                    options={evaluations}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    initialValue={{}}
                  />

                )}
              <div className="w-1/4 p-2 self-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
                >
                  {buttonText}
                </button>
              </div>
            </fieldset>
          </div>

        </form>

        
      )
      &&(
        <div >
          {/* <h1>Evaluaciones tabs</h1> */}
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">{data.curriculum_subject_label}</h1>
            <button
            type="button"
            onClick={onCloseForm}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
            Atras
            </button>
          </div>
          <div style={divFormStyle}>

          <Tabs id="controlled-tabs" selectedTabClassName="bg-white"  defaultIndex={tabIndex}>
            <TabList>
            <Tab>Evaluaciones</Tab>
            <Tab
            disabled={EvaluationsDontExist}
            >Subevaluaciones</Tab>
            </TabList>
            
            <TabPanel>
            <form
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit(onSetEvaluationToSubject)}
  >
    <div className="flex justify-between" >
      {/* <h1 className="text-2xl font-semibold text-gray-900">{data.curriculum_subject_label}</h1> */}

      <div className="flex gap-x-4">
        {/* <button
          type="button"
          onClick={onCloseForm}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          Atras
        </button> */}

      </div>
    </div>

    <div>
      <fieldset className="flex flex-wrap border rounded-md border-solid border-gray-300 p-3 mb-2">
        {/* <legend className="font-medium text-indigo-600">Crear Evaluaciones</legend> */}
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
            name="subdescription"
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
            name="subdate"
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
            name="subpercentage"
            label="Porcentaje"
            error={errors?.percentage}
            disabled={isSubmitting}
            register={register}
            required
          />
        </div>
        {/* <div className="w-1/4 p-2 pb-3 flex items-end gap-x-10">
          {evaluations.length > 0 && (
            <CustomCheckbox
              name="sub_eval"
              label="Subevaluacion"
              // error={errors?.is_active}
              disabled={isSubmitting}
              register={register}
              onChange={() => setSub(!sub)}
            />
          )}

        </div> */}
        {/* {sub
          && (
            <CustomCombobox
              name="sub_eval_id"
              control={control}
              placeholder=""
              label="Evaluacion Principal"
              error={errors?.eval_id}
              options={evaluations}
              setValue={setValue}
              clearErrors={clearErrors}
              initialValue={{}}
            />

          )} */}
        <div className="w-1/4 p-2 self-end">
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
          >
            {buttonText}
          </button>
        </div>
      </fieldset>
    </div>

  </form>
            </TabPanel>
            <TabPanel>
              
              <form
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit(onSetsubEvaluationToSubject)}
  >
    <div className="flex justify-between">
      
      <div className="flex gap-x-4">
        {/* <button
          type="button"
          onClick={onCloseForm}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          Atras
        </button> */}

      </div>
    </div>

    <div>
      <fieldset className="flex flex-wrap border rounded-md border-solid border-gray-300 p-3 mb-2">
        {/* <legend className="font-medium text-indigo-600">Crear Subevaluaciones</legend> */}
        <div className="w-1/4 p-2">
          <CustomInput
            type="text"
            name="subname"
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
        {/* <div className="w-1/4 p-2 pb-3 flex items-end gap-x-10">
          {evaluations.length > 0 && (
            <CustomCheckbox
              name="sub_eval"
              label="Subevaluacion"
              // error={errors?.is_active}
              disabled={isSubmitting}
              register={register}
              onChange={() => setSub(!sub)}
            />
          )}

        </div> */}
        {/* {sub
          && ( */}
            <CustomCombobox
              name="sub_eval_id"
              control={control}
              placeholder="Seleccionar ..."
              label="Evaluacion Principal"
              error={errors?.eval_id}
              options={evaluations}
              setValue={setValue}
              clearErrors={clearErrors}
              initialValue={{}}
            />
{/* 
          )} */}
        <div className="w-1/4 p-2 self-end">
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
          >
            {buttonText2}
          </button>
        </div>
      </fieldset>
    </div>

  </form>
            </TabPanel>
          </Tabs>

          </div>
        </div>

      )
      }

      <div>
        {(stored.attributes.roles[0].name !== 'admin' && publishoption)
          && (
            <CustomTable
              edit={false}
              collapsable={false}
              fetchData={fetchData}
              ref={tableRef}
              columns={columns}
              title="Catedráticos"
              // onEditClickedAction={editRowAction}
              onRefreshTableClicked={refreshTableAction}
            />
          )}
          {/* Esta es la tabla de evaluaciones, la crearemos desde 0 */}
        {(stored.attributes.roles[0].name !== 'admin' && !publishoption)
          && (
            <CustomTable
              edit={false}
              collapsable={true}
              fetchData={fetchData}
              ref={tableRef}
              columns={columns}
              title="Catedráticos"
              // onEditClickedAction={editRowAction}
              onRefreshTableClicked={refreshTableAction}
              onDeleteClickedAction={deleteRowAction}
            />
          )}
        {(stored.attributes.roles[0].name === 'admin')
          && (
            <CustomTable
              edit={false}
              fetchData={fetchData}
              collapsable={false}
              ref={tableRef}
              columns={columns}
              title="Catedráticos"
              // onEditClickedAction={editRowAction}
              onRefreshTableClicked={refreshTableAction}
            />
          )}

      </div>
    </>
  )
}
// Cambio en esta p[arte, se tiene que trabajar bien las nuevas reglas de validación de campos obligatorios al hacer un submit]
const schema = yup.object().shape({
  // name: yup.string()
  //   .required('Este campo es obligatorio.'),
  // description: yup.string()
  //   .required('Este campo es obligatorio.'),

  // percentage: yup.number()
  //   .required('Este campo es obligatorio.')
  //   .positive(),
  // curriculum_subject_id: yup.number()S 
  //   .required('Este campo es obligatorio.')
  //   .positive()
  //   .integer(),
  // code: yup.number()
  //   .positive(),
  // eval_id: yup.number()
  //   .positive(),
  // period_id: yup.number()
  //   .required('Este campo es obligatorio.')
  //   .positive()
  //   .integer(),
})

const transformCurriculumSubjects = (subjects: any) => subjects.map((subject: any) => ({
  value: subject?.attributes?.subject_id,
  label: subject?.attributes?.subject_name,
}))

/*
*    <CustomTable
          edit={false}
          fetchData={fetchData}
          ref={tableRef2}
          columns={columns2}
          title="Catedráticos"
          // onEditClickedAction={editRowAction}
          onRefreshTableClicked={refreshTableAction}
        />
* */
const columns = [

  {
    title: 'Principal',
    field: 'name',
    render: (rowData: any) => {

      return <p>{rowData.name}</p>
    },
  },

  // {
  //   title: 'Subevaluacion',
  //   field: 'secondary',
  //   render: (rowData: any) => {
  //     if (rowData.level === 2) {
  //       return <p>{rowData.name}</p>
  //     }
  //     return <p />
  //   },
  // },
  {
    title: 'Descripcion',
    field: 'description',
  },
  {
    title: 'Fecha',
    field: 'date',
  },
  {
    title: 'Porcentaje',
    field: 'percentage',
  },
  {
    title: 'Visibilidad',
    field: 'is_public',
    lookup: {
      0: 'Oculto',
      1: 'Publico',
    },
  },

]

let columns2 = [

  {
    title: 'Estudiante',
    field: 'name',
  },

]
export default EvaluationsForm
