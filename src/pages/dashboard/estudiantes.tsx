import { useState, useRef } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import StudentForm from 'components/Students/StudentForm'
import StudentsTable from 'components/Students/StudentsTable'

const Students: NextPage = () => {
  const tableRef = useRef()
  const [showForm, setShowForm] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(initialData)

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

  const toggleForm = () => setShowForm((prev: boolean) => !prev)

  return (
    <Layout>
      <Head>
        <title>Estudiantes - Dashboard ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {showForm ? (
          <StudentForm
            data={currentStudent}
            toggleForm={toggleForm}
          />
        ) : (
          <StudentsTable
            data={data}
            columns={columns}
            tableRef={tableRef}
            toggleForm={toggleForm}
            refreshTableAction={refreshTableAction}
          />
        )}
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

// const initialData = {
//   carnet: '999999999',
//   name: 'Alvaro',
//   last_name: 'Garcia',
//   email: 'alvaro1@gmail.com',
//   birth_date: '1998-09-10',
//   address: 'En Tepecoyo',
//   phone_number: '7777-5555',
//   home_phone_number: '2222-2222',
//   gender: 'M',
//   relationship: 'S',
//   status: 'A',
//   blood_type: 'RH+',
//   mother_name: 'Nombre de la madre',
//   mother_phone_number: '7777-7777',
//   father_name: '',
//   father_phone_number: '',
//   emergency_contact_name: 'Contacto de emergencia',
//   emergency_contact_phone: '7777-7777',
//   municipality_id: 3,
//   department_id: 14,
//   country_id: 1,
//   status_id: 1,
// }

const initialData = {
  carnet: '',
  name: '',
  last_name: '',
  email: '',
  birth_date: '',
  address: '',
  phone_number: '',
  home_phone_number: '',
  gender: 'M',
  relationship: 'S',
  status_id: '',
  blood_type: 'RH+',
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
  municipality_id: 3,
  department_id: 14,
  country_id: 1,
  medicines: '',
  current_school_cycle: '',
}

export default Students
