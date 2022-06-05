/* eslint-disable no-unused-vars */
import { AiOutlinePlus } from 'react-icons/ai'
import { RiMailDownloadFill } from 'react-icons/ri'
import CustomTable from 'components/UI/CustomTable/CustomTable'
import { useState } from 'react'
import Loader from 'components/UI/Loader'
import createPdf from 'services/CreatePdf'

interface Props {
  columns: any[],
  tableRef: any,
  editRowAction: any,
  toggleForm: () => void,
  onCreatePDF: any,
  refreshTableAction: () => void,
  fetchData: (query: any) => Promise<any>,
}

const StudentsTable = ({
  columns,
  tableRef,
  fetchData,
  toggleForm,
  onCreatePDF,
  editRowAction,
  refreshTableAction,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const onGenerateStudentsCredentials = (event: any) => {
    setLoading(true)
    event.stopPropagation()
    setLoading(false)
    createPdf('/students/generate-system-users', '')
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
        <h1 className="text-2xl font-semibold text-gray-900">Estudiantes</h1>
        <div>
          <button
            type="button"
            onClick={onGenerateStudentsCredentials}
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
            Nuevo Estudiante
          </button>
        </div>

      </div>

      {/* <div className="flex justify-between bg-white border shadow-md rounded-md p-2 mb-4">
        <p>Autocomplete de Carreras</p>
        <p>Autocomplete de Años de ingreso</p>
      </div> */}

      <div>
        <CustomTable
          fetchData={fetchData}
          ref={tableRef}
          columns={columns}
          title="Estudiantes"
          onEditClickedAction={editRowAction}
          onRefreshTableClicked={refreshTableAction}
          onCreatePDF={onCreatePDF}
        />
      </div>
    </>
  )
}
export default StudentsTable
