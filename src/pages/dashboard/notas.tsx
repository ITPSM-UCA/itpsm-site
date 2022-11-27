import Head from 'next/head'
import withAuth from 'HOC/withAuth'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import GradesForm from 'components/Grades/GradesForm'

import GradesEvaluations from 'components/Grades/GradesEvaluations'
import { useState } from 'react'
import { getEvaluationsStudent, getSubjects } from 'services/Evaluation'

const Enrollment: NextPage = () => {
  const [Subjects, setSubjects] = useState<any[]>([])
  const [Evaluations, setEvaluations] = useState<any[]>([])

  async function evaluationsbycycles(formData: any) {
    console.log(formData.code)

    const response = await getSubjects(formData.code)
    const response2 = await getEvaluationsStudent(formData.code)
    setSubjects(response)
    setEvaluations(response2)
    console.log(response)
    if (response.error) {

    }
  }

  return (
    <Layout>
      <Head>
        <title>Estudiantes - ITPSM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <GradesForm fetchdata={evaluationsbycycles} />
        {Subjects.map((j) => (
          <GradesEvaluations subjectsByCycles={Evaluations.filter((e) => e.section_id == j.code)} subjectName={j.curriculum_subject_label} />
        ))}

      </div>
    </Layout>
  )
}

export default withAuth(Enrollment)
