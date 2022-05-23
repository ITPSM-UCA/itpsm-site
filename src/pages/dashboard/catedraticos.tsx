import { useState, useRef } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import TeachersTable from 'components/Teachers/TeachersTable'
import { getTeachers } from 'services/Teachers'
import TeacherForm from 'components/Teachers/TeacherForm'
import withAuth from 'HOC/withAuth'

const Teachers: NextPage = () => {
  const tableRef:any = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState(initialData)

  const refreshTableAction = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange()
    }
  }

  const fetchData = async (query:any) => {
    const { rows, page, records } = await getTeachers(query)
    return {
      rows,
      page,
      records,
    }
  }

  const editRowAction = (event:any, rowData:any) => {
    event.stopPropagation();
    setCurrentTeacher(rowData)
    setShowForm(true)
  }

  const toggleForm = () => setShowForm((prev: boolean) => !prev)

  return (
    <Layout>
      <Head>
        <title>Catedráticos - Dashboard ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {showForm ? (
          <TeacherForm
            data={currentTeacher}
            toggleForm={toggleForm}
          />
        ) : (
          <TeachersTable
            columns={columns}
            tableRef={tableRef}
            fetchData={fetchData}
            toggleForm={toggleForm}
            editRowAction={editRowAction}
            refreshTableAction={refreshTableAction}
          />
        )}
      </div>
    </Layout>
  )
}

const columns = [
  { title: 'DUI', field: 'dui' },
  { title: 'Nombre', field: 'name' },
  { title: 'Apellido', field: 'last_name' },
  { title: 'Correo Electrónico', field: 'email' },
  { title: 'Fecha de Nacimiento', field: 'birth_date_with_format' },
  { title: 'Teléfono', field: 'phone_number', width: 250 },
  { title: 'Municipio', field: 'municipality' },
  {
    title: 'Genero',
    field: 'gender',
    lookup: { M: 'Masculino', F: 'Femenino' },
    hidden: true,
  },
  {
    title: 'Estado',
    field: 'statues_type',
    lookup: { A: 'Activo', B: 'Inactivo' },
  },
]

const initialData = {
  name: '',
  last_name: '',
  birth_date: '',
  nit: '',
  dui: '',
  isss_number: '',
  nup_number: '',
  email: '',
  genre: '',
  address: '',
  phone_number: '',
  home_phone_number: '',
  municipality_id: '',
  department_id: '',
  country_id: '',
  status_id: '',
}

export default withAuth(Teachers)
