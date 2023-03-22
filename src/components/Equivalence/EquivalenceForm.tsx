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
import { createEquivalence } from 'services/Equivalence'
import {getSubjectsPendingSubjectsByStudentID} from 'services/Curriculum'
import { curriculaRegistrationForStudent, getCurriculaForStudent } from 'services/Students'
import PhoneNumberInput from 'components/UI/Form/PhoneNumberInput'
import {
  bloodTypes, genders, highSchoolTypes, homeArea, relationships, STATUS_LABEL, studentsStatus,
} from 'utils/constants/Constants'
import CurriculaDataForm from 'components/Equivalence/CurriculaDataForm'
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

interface Props {
  data: any
  toggleForm: () => void
}

const EquivalenceV2Form = ({ data, toggleForm }: Props) => {
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
  const transformCurriculumSubjects = (subjects: any) => subjects.map((subject: any) => ({
    value: subject?.attributes?.subject_id,
    label: subject?.attributes?.subject_name,
  }))  

  const transformPendingCurriculumSubjects = (subjects: any) => subjects.map((subject: any) => ({
    value: subject?.id,
    label: subject?.name,
  }))  


  const [curriculaOptions, setCurriculaOptions] = useState<any[]>([])
  const curriculas = useSelector((state: any) => state.config.curricula)



  useEffect(() => {
    if (!empty(curriculas)) {
      const curriculasArray = curriculas.map((curricula: any) => ({
        value: curricula?.id,
        label: curricula?.attributes?.name,
      }))
      setCurriculaOptions(curriculasArray)
    }
  }, [curriculas])

  const curriculumSubjects = useSelector((state: any) => state.config.curriculum_subjects)

  const curriculumSubjectsList = transformCurriculumSubjects(curriculumSubjects)
  
  const [pendingSubjects, setpendingSubjects] = useState([])
  const [pendingSubjectsOptions, setpendingSubjectsOptions] = useState<any[]>([])
  var pendingSubjectList =[]

  
  const [refresh, setRefresh]= useState(false)
  
  useEffect(()=>{
    let exampledata:any = [];
    console.log(currentStudentID);

    const fecthpendingsubjects =async () => {
      const data = await getSubjectsPendingSubjectsByStudentID(currentStudentID)
      console.log(data,"dentro")
      // exampledata=data
      let int =0
      data.forEach((e:any)=> {
        int=int +1
        console.log(int)
        console.log(e)
        exampledata.push(e);
      });
     
      // setpendingSubjects()
      console.log(exampledata, "dentro y fyuera")

      setpendingSubjectsOptions(transformPendingCurriculumSubjects(exampledata))
      pendingSubjectList=transformPendingCurriculumSubjects(exampledata);

      console.log(pendingSubjectsOptions, "postprocesado")
      return true;
    } 
    fecthpendingsubjects()

    

  },[])

  // const selectChange = (event: React.ChangeEvent<>) => {
  //   const value = event.target.value;
  //   (value);
  // };
  
  
  // useEffect(() => {
  //   if (!empty(currentCountry) && empty(data.department_id)) {
  //     setDepartmentsOptions([])
  //     setValue('department_id', '')
  //   }
  //   const departmentFiltered: any = countries?.find((value: any) => value.value === currentCountry)
  //   setDepartmentsOptions(departmentFiltered?.departments)
  // }, [currentCountry])

  const onSetInnerEquivalence= async(formData:any)=>{
    console.log(formData)
    setLoading(true);
    const customQuery = {
      query: [{
        field: 'sc.student_id',
        op: '=',
        data: data.id,
      }],
    }
    const query = {
      pageSize: 10,
      page: 0,
    }
    const curricula = await getCurriculaForStudent(query, customQuery)
    formData.curricula_id=curricula[0].attributes.curricula_id
    formData.IsInnerEquivalence=1
    const response= await createEquivalence(formData)
    if (response.errors) {
      setLoading(false)
      return
    }
    showMessage('¡Exito!', 'Equivalencia Creada')
    setLoading(false)
  }
  const onSetEquivalence =  async (formData: any) => {
    
    console.log(pendingSubjects)
    
    setLoading(true);
    const customQuery = {
      query: [{
        field: 'sc.student_id',
        op: '=',
        data: data.id,
      }],
    }
    const query = {
      pageSize: 10,
      page: 0,
    }
    const curricula = await getCurriculaForStudent(query, customQuery)
    console.log(curricula)
    console.log(curricula[0].attributes.curricula_id)
    formData.curricula_id=curricula[0].attributes.curricula_id
    formData.IsInnerEquivalence=0
    console.log(formData)
    // const response = await getSubjectsPendingSubjectsByStudentID(formData.id)
    const response= await createEquivalence(formData)

    // console.log("materioas")
    // console.log(pendingSubjects)
    // console.log(response)

    console.log(pendingSubjects)
    console.log("materias a replicar")
    console.log(curriculumSubjects)
    if (response.errors) {
        setLoading(false)
        return
    }
    showMessage('¡Exito!', 'Equivalencia Creada')
    setLoading(false)
  }


  let EquivalenceButton = <span>Añadir Equivalencia</span>

  if (loading) {
    EquivalenceButton = <BodyLoadingButton />
  }

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Equivalencias - ITSPM</h1>

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
                disabled={true}
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
                disabled={true}
                register={register}
                placeholder="García"
                required
              />
            </div>
            <div className="w-1/4 p-2">
              <CustomInput
                type="text"
                name="carnet"
                label="Carnet"
                error={errors?.carnet}
                disabled={true}
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
                disabled={true}
                register={register}
                placeholder="AL01220001@itpsm.edu.sv"
                isReadOnly
              />
            </div>
            <div className="w-1/4 p-2">
              <CustomInput
                type="text"
                name="email"
                label="Correo Personal"
                error={errors?.email}
                disabled={true}
                register={register}
                placeholder="alvaro@gmail.com"
                required
              />
            </div>
            <div className="w-1/4 p-2">
              <CustomInput
                type="date"
                name="birth_date"
                label="Fecha de nacimiento"
                error={errors?.birth_date}
                disabled={true}
                register={register}
                required
              />
            </div>
            <div className="w-1/2 p-2">
              <CustomInput
                type="text"
                name="address"
                label="Dirección"
                error={errors?.address}
                disabled={true}
                register={register}
                placeholder="Direccion"
                required
              />
            </div>
            <div className="w-1/4 p-2">
              <PhoneNumberInput
                type="tel"
                name="phone_number"
                label="Teléfono"
                error={errors?.phone_number}
                disabled={true}
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
                disabled={true}
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
                
              />
            </div>


          </fieldset>
       
        </div>
        {/* <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="w-1/3 inline-flex items-center p-3 shadow-sm text-sm justify-center font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none space-x-2"
          >
            {buttonText}
          </button>
        </div> */}
      </form>
      <div className="w-2/4 p-2"></div>
      <div className="w-2/4 p-2"></div>
      {!empty(currentStudentID) && (<CurriculaDataForm data={dataForSubjectRegistration} />)}
      <div className="flex justify-between">
                {/* <h1 className="text-2xl font-semibold text-gray-900">Equivalencias</h1> */}
            </div>

            <div>
                {/* <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSetEquivalence)}
                > */}
                <div className="border rounded-md border-solid border-gray-300 p-3 mb-2">
                    <Tabs>
                        <TabList>
                            <Tab>Equivalencia Externa</Tab>
                            <Tab
                            disabled={false}
                            >Equivalencia Interna</Tab>
                        </TabList>
                    
                    <TabPanel>
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSetEquivalence)}
                  >
                    <fieldset className=" ">    
                    <div className="flex justify-between">

                    </div>
                    <div className="w-2/4 p-2">
                    <CustomCombobox
                      name="curriculum_subject_id"
                      control={control}
                      placeholder="Seleccionar Materia ..."
                      label="Modulo"
                      error={errors?.curriculum_subject_id}
                      options={curriculumSubjectsList}
                      setValue={setValue}
                      clearErrors={clearErrors}
                      initialValue={{}}
                    />
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-1/2 p-2">
                            <CustomInput
                                type="text"
                                name="subjectname"
                                label="Nombre de Materia"
                                error={""}
                                disabled={false}
                                register={register}
                                required
                            />
                        </div>
                        
                        <div className="w-1/2 p-2">
                            <CustomInput
                                type="text"
                                name="institution"
                                label="Nombre de la Institución"
                                error={""}
                                disabled={false}
                                register={register}
                                required
                            />
                        </div>
                        <div className="w-1/4 p-2">
                            <CustomInput
                                type="number"
                                name="score"
                                label="Nota"
                                error={""}
                                disabled={false}
                                register={register}
                                required
                            />
                        </div>
                        <div className="w-1/4 p-2 self-end">
                            <button
                            type="submit"
                            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
                            >
                                {EquivalenceButton}
                            </button>
                        </div>
                        
                    </div>
                    
                    </fieldset>
                    </form>
                    </TabPanel>
                    <TabPanel>
                    <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSetInnerEquivalence)}
                    >
                    <fieldset className=" ">    
                    <div className="flex justify-between">

                    </div>
                    <div className="flex flex-wrap">
                        {/* <div className="w-1/4 p-2">
                            <CustomInput
                                type="text"
                                name="subject_id"
                                label="Código de Materia"
                                error={""}
                                disabled={false}
                                register={register}
                                required
                            />
                        </div> */}
                        {/* <div className="w-1/2 p-2">
                            <CustomInput
                                type="text"
                                name="institution"
                                label="Nombre de la Institución"
                                value="INSTITUTO TECNOLOGICO PADRE SEGUNDO MONTES"
                                error={""}
                                disabled={true}
                                register={register}
                                required
                            />
                        </div> */}
                        <div className="w-2/4 p-2">
                            <CustomCombobox
                              name="curriculum_id"
                              control={control}
                              placeholder="Plan 2019-2020 de la carrera Técnico Superior en Hostelería y Turismo"
                              initialValue={{}}
                              label="Plan de estudio"
                              error={errors?.curriculum_id}
                              options={curriculaOptions}
                              setValue={setValue}
                              clearErrors={clearErrors}
                              />
                          </div>
                          <div className="w-2/4 p-2">
                            <CustomCombobox
                              name="curriculum_subject_id"
                              control={control}
                              placeholder="Seleccionar Materia ..."
                              label="Modulo"
                              error={errors?.curriculum_subject_id}
                              options={curriculumSubjectsList}
                              setValue={setValue}
                              clearErrors={clearErrors}
                              initialValue={{}}
                              />
                          </div>
                        <div className="w-1/4 p-2"/>
                        <div className="w-1/4 p-2">
                            <CustomInput
                                type="text"
                                name="score"
                                label="Nota"
                                error={""}
                                disabled={false}
                                register={register}
                                required
                            />
                        </div>
                        <div className="w-1/4 p-2 self-end">
                            <button
                            type="submit"
                            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
                            >
                                {EquivalenceButton}
                            </button>
                        </div>
                        
                    </div>
                    
                    </fieldset>
                    </form>
                    </TabPanel>
                    </Tabs>
                </div>    
                
            </div>
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
  home_phone_number: yup.string()
    .nullable()
    .matches(/^\d{4}-\d{4}$/, {
      message: 'Formato incorrecto',
      excludeEmptyString: true,
    }),
  gender: yup.string()
    .required('Campo obligatorio'),
  relationship: yup.string()
    .required('Campo obligatorio'),
  status: yup.string()
    .required('Campo obligatorio'),
  blood_type: yup.string(),
  mother_name: yup.string()
    .nullable(),
  mother_phone_number: yup.string()
    .nullable(),
  father_name: yup.string()
    .nullable(),
  father_phone_number: yup.string()
    .nullable(),
  emergency_contact_name: yup.string()
    .nullable(),
  emergency_contact_phone: yup.string()
    .nullable(),
  diseases: yup.string()
    .nullable(),
  allergies: yup.string()
    .nullable(),
  entry_date: yup.number()
    .typeError('Campo obligatorio')
    .min(2010, 'Año mínimo 2010'),
  entry_period: yup.number()
    .typeError('Campo obligatorio')
    .positive('Periodo no valido')
    .max(2, 'Periodo entre 1 y 2'),
  date_high_school_degree: yup.number()
    .typeError('Campo obligatorio')
    .min(1980, 'Año mínimo 1980'),
  municipality_id: yup.string()
    .required('Campo obligatorio'),
  department_id: yup.string()
    .required('Campo obligatorio'),
  country_id: yup.string()
    .required('Campo obligatorio'),
  medicines: yup.string()
    .nullable(),
  is_live_in_rural_area: yup.number()
    .nullable(),
  is_private_high_school: yup.number()
    .nullable(),
  high_school_name: yup.string()
    .nullable(),
  high_school_option: yup.string()
    .nullable(),
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

export default EquivalenceV2Form
