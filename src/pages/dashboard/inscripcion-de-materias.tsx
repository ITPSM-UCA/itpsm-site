import Head from 'next/head'
import withAuth from 'HOC/withAuth'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import SubjectToBeEnrolled from 'components/Enrollment/SubjectsToBeEnrolled'
import EnrolledSubjects from 'components/Enrollment/EnrolledSubjects'
import useEnrolled from 'hooks/Enrollment/useEnrolled'

const Enrollment: NextPage = () => {
  const {
    activeSubjects, enrolledSubjects, loading, errors,
  } = useEnrolled()

  if (loading) {
    return (
      <Layout>
        <Head>
          <title>Estudiantes - ITPSM</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          <h1 className="text-lg font-bold">Inscripcion de materias</h1>
          <p>Cargando...</p>
        </div>
      </Layout>
    )
  }

  if (!loading && errors) {
    return (
      <Layout>
        <Head>
          <title>Estudiantes - ITPSM</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          <h1 className="text-lg font-bold">Inscripcion de materias</h1>
          <p>Hubo un error</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Estudiantes - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <h1 className="text-lg font-bold">Inscripcion de materias</h1>
        <SubjectToBeEnrolled subjects={activeSubjects} />
        <EnrolledSubjects subjects={enrolledSubjects} />
      </div>
    </Layout>
  )
}
export default withAuth(Enrollment)
