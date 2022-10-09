import { useEffect, useState } from 'react'
import { enrollSubjects, getActiveSubjects, getEnrolledSubjects } from 'services/Enrollment'
import { showMessage } from 'utils/alerts'
import { empty } from 'utils/helpers'

const useEnrolled = () => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeSubjects, setActiveSubjects] = useState<any[]>([])
  const [enrolledSubjects, setEnrolledSubjects] = useState<any[]>([])

  const getData = async () => {
    setLoading(true)
    const requestList = [getActiveSubjects(), getEnrolledSubjects()]
    const resolvedPromises = await Promise.allSettled(requestList)
    const [activeSubjectsResponse, enrolledResponse] = mapPromisesResponse(resolvedPromises)

    if (activeSubjectsResponse.errors) {
      setErrors(activeSubjectsResponse.errors)
      setLoading(false)
      return
    }

    setActiveSubjects(activeSubjectsResponse?.rows)
    setEnrolledSubjects(enrolledResponse)

    setLoading(false)
  }

  const enrolledSubject = async (subjects:any) => {
    const response = await enrollSubjects(subjects)

    if (!empty(response.notEnrolled)) {
      showMessage('Oops!', 'Algunas materias no fueron inscritas', 'error')
    }

    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    errors,
    loading,
    enrolledSubject,
    activeSubjects,
    enrolledSubjects,
  }
}

const mapPromisesResponse = (resolvedPromises:any) => {
  const responses = resolvedPromises
    .filter(({ status }:any) => status === 'fulfilled')
    .map((promise:any) => promise.value)

  return responses
}

export default useEnrolled