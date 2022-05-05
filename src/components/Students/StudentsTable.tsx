import { AiOutlinePlus } from 'react-icons/ai'
import CustomTable from 'components/UI/CustomTable/CustomTable'

interface Props {
  data: any,
  columns: any[],
  tableRef: any,
  toggleForm: () => void,
  refreshTableAction: () => void,
}

const StudentsTable = ({
  data,
  columns,
  tableRef,
  toggleForm,
  refreshTableAction,
}:Props) => {
  console.log('StudentsTable')
  return (
    <>
      <div className="flex justify-between mb-12">
        <h1 className="text-2xl font-semibold text-gray-900">Estudiantes</h1>
        <button
          type="button"
          onClick={toggleForm}
          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 gap-x-2">
          <AiOutlinePlus />
          Nuevo Estudiante
        </button>
      </div>

      <div>
        <CustomTable
          data={data}
          getData={data}
          ref={tableRef}
          columns={columns}
          title="Estudiantes"
          onRefreshTableClicked={refreshTableAction}
          onEditClickedAction={() => {}}
        />
      </div>
    </>
  )
}

export default StudentsTable
