/* eslint-disable no-unused-vars */
import { AiOutlinePlus } from 'react-icons/ai'
import { RiMailDownloadFill } from 'react-icons/ri'
import CustomTable from 'components/UI/CustomTable/CustomTable'
import Loader from 'components/UI/Loader'
import createPdf from 'services/CreatePdf'
import { useState } from 'react'

interface Props {
  columns: any[],
  tableRef: any,
  editRowAction: any,
  toggleForm: () => void,
  refreshTableAction: () => void,
  fetchData: (query: any) => Promise<any>,
}

const TeachersTable = ({
  columns,
  tableRef,
  fetchData,
  toggleForm,
  editRowAction,
  refreshTableAction,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const onGenerateTeachersCredentials = (event: any) => {
    setLoading(true)
    event.stopPropagation()
    setLoading(false)
    createPdf('/teachers/generate-system-users', '')
  }

  let buttonText = <span>Generar Usuarios</span>

  if (loading) {
    buttonText = (
      <>
        <Loader className="h-4 w-4" />
        <span>
          Cargando...
        </span>
      </>
    )
  }
  return (
    <>
      <div className="flex justify-between mb-12">
        <h1 className="text-2xl font-semibold text-gray-900">Catedráticos</h1>
        <div>
          <button
            type="button"
            onClick={onGenerateTeachersCredentials}
            className="inline-flex items-center mx-5 px-3 py-2 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none gap-x-2"
          >
            <RiMailDownloadFill />
            {buttonText}
          </button>
          <button
            type="button"
            onClick={toggleForm}
            className="inline-flex items-center px-3 py-2 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
          >
            <AiOutlinePlus />
            Nuevo Catedrático
          </button>
        </div>

      </div>

      <div>
        <CustomTable
         edit={false}
          fetchData={fetchData}
          collapsable={false}
          ref={tableRef}
          columns={columns}
          title="Catedráticos"
          onEditClickedAction={editRowAction}
          onRefreshTableClicked={refreshTableAction}
        />
      </div>
    </>
  )
}

export default TeachersTable
