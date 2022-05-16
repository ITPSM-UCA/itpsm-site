import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Layout from 'components/Layout/Layout'
import CurriculaForm from 'components/Curricula/CurriculaForm'
import CurriculaTable from 'components/Curricula/CurriculaTable'
import { getCurricula, getSubjectsByCurriculumId } from 'services/Curriculum'

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
    const { rows, page, records } = await getCurricula(query)
    return {
      rows,
      page,
      records,
    }
  }

  const editRowAction = async (event: any, rowData: any) => {
    event.stopPropagation();
    // setCurrentStudent(rowData)
    console.log(rowData)
    // setShowForm(true)
    const customQuery = {
      query: [{
        field: 'curriculum_id',
        op: '=',
        data: rowData.id,
      }],
    }
    const query = {
      pageSize: 40,
      page: 0,
    }
    const response = await getSubjectsByCurriculumId(query, customQuery)
    console.log(response)
  }

  const toggleForm = () => setShowForm((prev: boolean) => !prev)
  return (
    <Layout>
      <Head>
        <title>Plan de estudios - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {showForm ? (
          <CurriculaForm
            data={currentStudent}
            toggleForm={toggleForm}
          />
        ) : (
          <CurriculaTable
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
  date_high_school_degree: '',
  municipality_id: '',
  department_id: '',
  country_id: '',
  medicines: '',
}

export default Students
