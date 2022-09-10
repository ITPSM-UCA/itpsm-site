import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Layout from 'components/Layout/Layout'
import PeriodTable from 'components/Period/PeriodTable'
import { getPeriods } from 'services/Period'
import withAuth from 'HOC/withAuth'
import PeriodForm from 'components/Period/PeriodForm'
import SectionsByPeriod from 'components/Period/SectionsByPeriod'

const Curricula: NextPage = () => {
  const tableRef: any = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentCycle, setcurrentCycle] = useState<any>(initialData)

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
    setcurrentCycle(rowData)
    setShowForm(true)
  }

  const toggleForm = () => {
    setShowForm((prev: boolean) => !prev)
  }

  const clearData = () => {
    setcurrentCycle(initialData)
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
            <PeriodForm
              clearData={clearData}
              data={currentCycle}
              toggleForm={toggleForm}
            />
            {currentCycle?.id && (
              <SectionsByPeriod
                data={currentCycle}
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
    field: 'status',
    lookup: {
      A: 'En curso',
      E: 'En edición',
      C: 'Cerrado',
      I: 'En inscripción',
    },
  },
]

const initialData = {
  code: '',
  year: new Date().getFullYear(),
  status: 'E',
}

export default withAuth(Curricula)
