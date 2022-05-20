import { useState, useRef } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import StudentForm from 'components/Students/StudentForm'
import StudentsTable from 'components/Students/StudentsTable'
import getStudents from 'services/Students/getStudents'
import createPdf from 'services/CreatePdf'
// import { empty } from 'utils/helpers'

const Students: NextPage = () => {
  const tableRef: any = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(initialData)

  const refreshTableAction = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange()
    }
  }

  const fetchData = async (query: any) => {
    const { rows, page, records } = await getStudents(query)
    return {
      rows,
      page,
      records,
    }
  }

  const editRowAction = (event:any, rowData:any) => {
    event.stopPropagation()
    setCurrentStudent(rowData)
    setShowForm(true)
  }

  const toggleForm = () => {
    setCurrentStudent(initialData)
    setShowForm((prev: boolean) => !prev)
  }

  const onCreatePDF = (event:any, rowData:any) => {
    event.stopPropagation()

    createPdf('/students/create-default-pdf', { id: rowData.id })
  }

  return (
    <Layout>
      <Head>
        <title>Estudiantes - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {showForm ? (
          <StudentForm
            data={currentStudent}
            toggleForm={toggleForm}
          />
        ) : (
          <StudentsTable
            columns={columns}
            tableRef={tableRef}
            fetchData={fetchData}
            toggleForm={toggleForm}
            onCreatePDF={onCreatePDF}
            editRowAction={editRowAction}
            refreshTableAction={refreshTableAction}
          />
        )}
      </div>
    </Layout>
  )
}

const columns = [
  { title: 'Carnet', field: 'carnet' },
  { title: 'Nombre', field: 'name' },
  { title: 'Apellido', field: 'last_name' },
  { title: 'Correo Electrónico', field: 'email' },
  { title: 'Fecha de Nacimiento', field: 'birth_date_with_format' },
  { title: 'Teléfono', field: 'phone_number', width: 250 },
  { title: 'Municipio', field: 'municipality', hidden: true },
  {
    title: 'Genero',
    field: 'gender',
    lookup: { M: 'Masculino', F: 'Femenino' },
    hidden: true,
  },
  {
    title: 'Estado',
    field: 'status',
    lookup: { A: 'Activo', X: 'Graduado', R: 'Egresado' },
  },
]

// const initialData = {
//   carnet: '999999999',
//   name: 'Alvaro',
//   last_name: 'Garcia',
//   email: 'alvaro1@gmail.com',
//   birth_date: '1998-09-10',
//   address: 'En Tepecoyo',
//   phone_number: '7777-5555',
//   home_phone_number: '2222-2222',
//   gender: 'M',
//   relationship: 'S',
//   status: 'A',
//   blood_type: 'RH+',
//   mother_name: 'Nombre de la madre',
//   mother_phone_number: '7777-7777',
//   father_name: '',
//   father_phone_number: '',
//   emergency_contact_name: 'Contacto de emergencia',
//   emergency_contact_phone: '7777-7777',
//   municipality_id: 3,
//   department_id: 14,
//   country_id: 1,
//   status_id: 1,
// }

const initialData = {
  carnet: '',
  name: '',
  last_name: '',
  email: '',
  birth_date: '',
  address: '',
  phone_number: '',
  home_phone_number: '',
  gender: '',
  relationship: '',
  status: '',
  blood_type: '',
  mother_name: '',
  mother_phone_number: '',
  father_name: '',
  father_phone_number: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  diseases: '',
  allergies: '',
  entry_date: '',
  entry_period: '',
  date_high_school_degree: '',
  municipality_id: '',
  department_id: '',
  country_id: '',
  medicines: '',
}

export default Students
