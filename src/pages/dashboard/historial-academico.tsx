import Head from 'next/head'
import withAuth from 'HOC/withAuth'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'

const Enrollment: NextPage = () => (
  <Layout>
    <Head>
      <title>Estudiantes - ITPSM</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <p>Historial academico</p>
    </div>
  </Layout>
)

export default withAuth(Enrollment)
