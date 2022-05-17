import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getInitialConfig } from 'store/Config/configActions'

const Dashboard: NextPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInitialConfig())
  }, [])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <div>
          <p>Hola desde el dashboard</p>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
