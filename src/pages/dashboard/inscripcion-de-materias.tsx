import Head from 'next/head'
import withAuth from 'HOC/withAuth'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import SubjectToBeEnrolled from 'components/Enrollment/SubjectsToBeEnrolled'
import EnrolledSubjects from 'components/Enrollment/EnrolledSubjects'

const Enrollment: NextPage = () => (
  <Layout>
    <Head>
      <title>Estudiantes - ITPSM</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <h1 className="text-lg font-bold">Inscripcion de materias</h1>

      <SubjectToBeEnrolled />

      <EnrolledSubjects />
    </div>
  </Layout>
)

export default withAuth(Enrollment)
