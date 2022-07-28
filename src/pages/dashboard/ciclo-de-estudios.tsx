import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Layout from 'components/Layout/Layout'
import CurriculaForm from 'components/Curricula/CurriculaForm'
import PeriodTable from 'components/Period/PeriodTable'
import SubjectsByCurricula from 'components/Curricula/SubjectsByCurricula'
import { getPeriods } from 'services/Period'
import withAuth from 'HOC/withAuth'

const Curricula: NextPage = () => {
  const tableRef: any = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentCurricula, setcurrentCurricula] = useState<any>(initialData)

  const refreshTableAction = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange()
    }
  }

  const fetchData = async (query: any) => {
    const { rows, page, records } = await getPeriods(query)
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
        <title>Ciclo de estudios - ITPSM</title>
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
          <PeriodTable
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
  { field: 'code', hidden: true },
  { title: 'Nombre', field: 'label' },
  { title: 'Año', field: 'year' },
  {
    title: 'Estado',
    field: 'is_active',
    lookup: { 1: 'Activo', 0: 'Desactivado' },
  },
]

const initialData = {
  code: '',
  year: new Date().getFullYear(),
  is_active: 1,
}

export default withAuth(Curricula)
