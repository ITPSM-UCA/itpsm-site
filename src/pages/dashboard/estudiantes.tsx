import { useRef } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import CustomTable from 'components/UI/CustomTable/CustomTable'

const Students: NextPage = () => {
  const tableRef = useRef()

  const fetchData = () => new Promise((resolve) => {
    //const { rows, page, records } = await BaptismManagement.getBaptisms(query, token)

    resolve({
      data: [],
      page: 1,
      totalCount: 0,
    })
  })

  return (
    <Layout>
      <Head>
        <title>Estudiantes - Dashboard ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Estudiantes
        </h1>
        <div>
          <CustomTable
            title="Registro de bautismos"
            columns={columns}
            data={fetchData}
            ref={tableRef}
            confirmDeleteAction={() => {}}
            onEditClickedAction={() => {}}
            onRefreshTableClicked={() => {}}
          />
        </div>
      </div>
    </Layout>
  )
}

const defaultCellStyles = {
  padding: '5px 8px',
  fontSize: '14px',
  whiteSpace: 'nowrap',
}

const columns = [
  { field: 'id', hidden: true },
  { field: 'organization_id', hidden: true },
  { field: 'date', hidden: true },
  { field: 'birth_date', hidden: true },
  { title: 'Fecha', field: 'date_with_format', cellStyle: defaultCellStyles },
  { title: 'Libro N°', field: 'book_number', cellStyle:{ ...defaultCellStyles, textAlign: 'center' }, headerStyle: { ...defaultCellStyles } },
  { title: 'Folio N°', field: 'folio_number', cellStyle:{ ...defaultCellStyles }, headerStyle: defaultCellStyles },
  { title: 'Acta N°', field: 'record_number', cellStyle:{ ...defaultCellStyles }, headerStyle: defaultCellStyles },
  { title: 'Nombre', field: 'name', cellStyle: defaultCellStyles },
  { title: 'Fecha de nacimiento', field: 'birth_date_with_format', cellStyle: { padding: '8px', fontSize: '14px' } },
  { title: 'Padre', field: 'father_name', cellStyle: defaultCellStyles },
  { title: 'Madre', field: 'mother_name', cellStyle: defaultCellStyles },
  { title: 'Padrino', field: 'godfather_name', cellStyle: defaultCellStyles },
  { title: 'Madrina', field: 'godmother_name', cellStyle: defaultCellStyles },
  { title: 'Sacerdote', field: 'celebrating_priest', cellStyle: defaultCellStyles },
]

export default Students
