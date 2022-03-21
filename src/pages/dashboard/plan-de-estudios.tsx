import Head from 'next/head'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'

const Students: NextPage = () => (
  <Layout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Plan de estudios
      </h1>
      <div>
        <p>Hola desde plan de estudios</p>
      </div>
    </div>
  </Layout>
)

export default Students
