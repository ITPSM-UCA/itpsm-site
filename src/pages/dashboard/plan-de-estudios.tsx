import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Layout from 'components/Layout/Layout'
import { AiOutlinePlus } from 'react-icons/ai'
import { getCurricula } from 'services/Curriculum'
import CustomTable from 'components/UI/CustomTable/CustomTable'

const Students: NextPage = () => {
  const tableRef:any = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(initialData)

  const refreshTableAction = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange()
    }
  }

  const fetchData = async (query:any) => {
    const { rows, page, records } = await getCurricula(query)
    console.log(rows)
    return {
      rows,
      page,
      records,
    }
  }

  const editRowAction = (event:any, rowData:any) => {
    event.stopPropagation();
    setCurrentStudent(rowData)
    setShowForm(true)
  }

  const toggleForm = () => setShowForm((prev: boolean) => !prev)
  return (
    <Layout>
      <Head>
        <title>Plan de estudios - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex justify-between mb-12">
          <h1 className="text-2xl font-semibold text-gray-900">Plan de estudios</h1>
          <button
            type="button"
            onClick={() => {}}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
          >
            <AiOutlinePlus />
            Nuevo Plan de estudio
          </button>
        </div>
        <div>
          <CustomTable
            fetchData={fetchData}
            ref={tableRef}
            columns={columns}
            title="Planes de estudios"
            onEditClickedAction={editRowAction}
            onRefreshTableClicked={refreshTableAction}
          />
        </div>
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
