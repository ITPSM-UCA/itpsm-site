import { useRef } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import CustomTable from 'components/UI/CustomTable/CustomTable'

const Students: NextPage = () => {
  const tableRef = useRef()

  const refreshTableAction = () => {
    console.log(tableRef.current)
    // tableRef.current && tableRef.current.onQueryChange()
  }

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
            data={data}
            ref={tableRef}
            columns={columns}
            title="Estudiantes"
            onRefreshTableClicked={refreshTableAction}
            onEditClickedAction={() => {}}
          />
          {/* <CustomTable
            title="Registro de bautismos"
            columns={columns}
            data={fetchData}
            ref={tableRef}
            confirmDeleteAction={() => {}}
            onEditClickedAction={() => {}}
            onRefreshTableClicked={() => {}}
          /> */}
        </div>
      </div>
    </Layout>
  )
}

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Surname', field: 'surname' },
  { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
  {
    title: 'Birth Place',
    field: 'birthCity',
    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
  },
]

const data = [
  { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
]

export default Students
