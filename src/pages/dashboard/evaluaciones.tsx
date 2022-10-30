import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Layout from 'components/Layout/Layout'
import SectionsTable from 'components/Sections/SectionsTable'

import GradesForm from 'components/Evaluations/GradesForm'
import EvaluationsTable from 'components/Evaluations/EvaluationsTable'
import {  getEvaluations } from 'services/Evaluation'
import withAuth from 'HOC/withAuth'
import UserForm from 'components/Users/UserForm'


const evaluaciones: NextPage = () => {
  const tableRef: any = useRef()
  const tableRef2: any = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentSubject, setcurrentSubject] = useState<any>(initialData)

  const refreshTableAction = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange()
    }
  }
  const fetchData = async (query:any) => {
    const customQuery = {
   
    }
    const { rows, page, records } = await getEvaluations(query,customQuery)
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
        <title>Notas - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      {showForm ? (
          <>
            <GradesForm
              clearData={clearData}
              data={currentSubject}
              tableRef={tableRef2}
              toggleForm={toggleForm}
           
            />
           
         
          </>
        ) : (
          <EvaluationsTable
            columns={columns}
            tableRef={tableRef}
            fetchData={fetchData}
            toggleForm={toggleForm}
            editRowAction={editRowAction}
            clearData={clearData}
            refreshTableAction={refreshTableAction}
          />
          )}
      </div>
    </Layout>
  )
}
const days=['Lunes','Martes','Miercoles','Jueves','Viernes']

const columns = [
  { title: 'id', field: 'section_id',hidden:true},
  { title: 'Materia', field: 'materia' },
  { title: 'Seccion', field: 'code'},
  { title: 'Nombre', field: 'name' },
  { title: 'Fecha', field: 'date' },
  { title: 'Porcentaje', field: 'percentage' },
  { title: 'Visibilidad de Evaluacion', field: 'is_public',  lookup: { 0: 'Oculto', 1: 'Publico' }, },
  { title: 'Visibilidad de Notas', field: 'status',  lookup: { null:'Sin carga',0: 'Notas cargadas', 1: 'Notas Publicadas' }, },

]

const initialData = {
  code: '',
  year: new Date().getFullYear(),
  status: 'E',
}

export default withAuth(evaluaciones)
