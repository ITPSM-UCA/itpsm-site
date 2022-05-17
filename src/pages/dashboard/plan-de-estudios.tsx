import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Layout from 'components/Layout/Layout'
import CurriculaForm from 'components/Curricula/CurriculaForm'
import CurriculaTable from 'components/Curricula/CurriculaTable'
import SubjectsByCurricula from 'components/Curricula/SubjectsByCurricula'
import { getCurricula } from 'services/Curriculum'

const Students: NextPage = () => {
  const tableRef: any = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentCurricula, setcurrentCurricula] = useState<any>(initialData)

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
    setcurrentCurricula(rowData)
    setShowForm(true)
  }

  const toggleForm = () => {
    setShowForm((prev: boolean) => !prev)
  }

  const clearData = () => {
    setcurrentCurricula(initialData)
  }

  return (
    <Layout>
      <Head>
        <title>Plan de estudios - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {showForm ? (
          <>
            <CurriculaForm
              clearData={clearData}
              data={currentCurricula}
              toggleForm={toggleForm}
            />
            {currentCurricula?.id && (
              <SubjectsByCurricula
                data={currentCurricula}
              />
            )}
          </>
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
  name: '',
  career_id: '',
  year: new Date().getFullYear(),
  is_active: 1,
  is_approved: 0,
}

export default Students
