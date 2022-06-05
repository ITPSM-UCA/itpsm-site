import { useState, useRef } from 'react'
import Head from 'next/head'
import withAuth from 'HOC/withAuth'
import type { NextPage } from 'next'
import createPdf from 'services/CreatePdf'
import Layout from 'components/Layout/Layout'
import StudentForm from 'components/Students/StudentForm'
import StudentsTable from 'components/Students/StudentsTable'
import getStudents from 'services/Students/getStudents'

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

  const editRowAction = (event: any, rowData: any) => {
    event.stopPropagation()
    setCurrentStudent(rowData)
    setShowForm(true)
  }

  const toggleForm = () => {
    setCurrentStudent(initialData)
    setShowForm((prev: boolean) => !prev)
  }

  const onCreatePDF = (event: any, rowData: any) => {
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
    lookup: {
      A: 'Activo', G: 'Graduado', E: 'Egresado', I: 'Inactivo',
    },
  },
]

const initialData = {
  carnet: '',
  name: '',
  last_name: '',
  email: '',
  institutional_email: '',
  birth_date: '',
  address: '',
  phone_number: '',
  home_phone_number: '',
  gender: '',
  relationship: '',
  status: 'A',
  blood_type: '',
  mother_name: '',
  mother_phone_number: '',
  father_name: '',
  father_phone_number: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  diseases: '',
  allergies: '',
  entry_date: new Date().getFullYear(),
  entry_period: '',
  date_high_school_degree: '',
  municipality_id: '',
  department_id: '',
  country_id: '',
  medicines: '',
  is_live_in_rural_area: 0,
  is_private_high_school: 0,
  high_school_name: '',
  high_school_option: '',
}

export default withAuth(Students)
