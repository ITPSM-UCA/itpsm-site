import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Layout from 'components/Layout/Layout'
import UsersTable from 'components/Users/UsersTable'
import { getUsers } from 'services/User'
import withAuth from 'HOC/withAuth'
import UserForm from 'components/Users/UserForm'


const Users: NextPage = () => {
  const tableRef: any = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentCycle, setcurrentCycle] = useState<any>(initialData)

  const refreshTableAction = () => {
    if (tableRef.current) {
      tableRef.current.onQueryChange()
    }
  }

  const fetchData = async (query: any) => {
    const { rows, page, records } = await getUsers(query)
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
        <title>Usuarios - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {showForm ? (
          <>
            <UserForm
              clearData={clearData}
              data={currentCycle}
              toggleForm={toggleForm}
            />

          </>
        ) : (
          <UsersTable
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
  { title: 'Nombre', field: 'name' },
  { title: 'Correo', field: 'email' },
  {
    title: 'Tipo',
    field: 'system_reference_table',
  },
]

const initialData = {
  code: '',
  year: new Date().getFullYear(),
  status: 'E',
}

export default withAuth(Users)
