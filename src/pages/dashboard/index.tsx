import withAuth from 'HOC/withAuth'
import type { NextPage } from 'next'
import Layout from 'components/Layout/Layout'

const Dashboard: NextPage = () => (
  <Layout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Dashboard
      </h1>
      <div>
        <p>Panel para mostrar estadisticas del Instituto</p>
      </div>
    </div>
  </Layout>
)

export default withAuth(Dashboard)
