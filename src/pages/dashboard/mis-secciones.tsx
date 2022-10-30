import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Layout from 'components/Layout/Layout'
import SectionsTable from 'components/Sections/SectionsTable'

import EvaluationsForm from 'components/Evaluations/EvaluationsForm'
import EvaluationsTable from 'components/Evaluations/EvaluationsTable'
import { getSectionsTeacher } from 'services/Sections'
import withAuth from 'HOC/withAuth'
import UserForm from 'components/Users/UserForm'


const secciones: NextPage = () => {
  const tableRef: any = useRef()
  const tableRef2: any = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentSubject, setcurrentSubject] = useState<any>(initialData)

  const refreshTableAction = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange()
    }
  }

  const fetchData = async (query: any) => {
    const customQuery = {
      query: [{
        field: 's.teacher_id',
        op: '=',
        data: 0,
      },{
        field: 'p.status',
        op: '=',
        data: 'A',
      }],
    }
    
    const { rows, page, records } = await getSectionsTeacher({}, customQuery)
    return {
      rows,
      page,
      records,
    }
  }

  const editRowAction = async (event: any, rowData: any) => {
    event.stopPropagation();
    
    console.log(rowData)
    setcurrentSubject(rowData)
    setShowForm(true)
  }

  const toggleForm = () => {
    setShowForm((prev: boolean) => !prev)
  }

  const clearData = () => {
    setcurrentSubject(initialData)
  }

  return (
    <Layout>
      <Head>
        <title>Secciones - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      {showForm ? (
          <>
            <EvaluationsForm
              clearData={clearData}
              data={currentSubject}
              tableRef={tableRef2}
              toggleForm={toggleForm}
           
            />
           
         
          </>
        ) : (
          <SectionsTable
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
const days=['Lunes','Martes','Miercoles','Jueves','Viernes']
const columns = [
  { field: 'id', hidden: true },
  { field: 'code', hidden: true },
  { title: 'Materia', field: 'curriculum_subject_label' },
  { title: 'Dia', field: 'day', render: (rowData:any) => <p>{days[rowData.day]}</p> },
  { title: 'Horario', field: 'horario' },

]

const initialData = {
  code: '',
  year: new Date().getFullYear(),
  status: 'E',
}

export default withAuth(secciones)
