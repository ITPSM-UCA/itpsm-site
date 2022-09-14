import { useEffect, useState } from 'react'
import { getActiveSubjects, getEnrolledSubjects } from 'services/Enrollment'

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

  useEffect(() => {
    getData()
  }, [])

  return {
    errors,
    loading,
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
