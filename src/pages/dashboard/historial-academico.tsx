import Head from 'next/head'
import withAuth from 'HOC/withAuth'
import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import AcademicInformation from 'components/History/AcademicInformation'
import useSubjectsByHistory from 'hooks/History/useSubjectsByHistory'
import ApprovedSujects from 'components/History/ApprovedSujects'
import EquivalenceDTFormForStudents from 'components/History/EquivalenceDTFormForStudents'

const Enrollment: NextPage = () => {
  const { subjectsByCycles } = useSubjectsByHistory()
  const [dataForSubjectRegistration, setDataForSubjectRegistration] = useState({
    student_id: 5, entry_year: 5, graduation_year: 5 + 3, cum: 0, curriculum_id: '',
  })
  return (
    <Layout>
      <Head>
        <title>Estudiantes - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <AcademicInformation career={subjectsByCycles[0]?.subjects[0]?.career_label} />
        <ApprovedSujects subjectsByCycles={subjectsByCycles} />
        <EquivalenceDTFormForStudents  data={dataForSubjectRegistration}/>
      </div>
    </Layout>
  )
}

export default withAuth(Enrollment)
