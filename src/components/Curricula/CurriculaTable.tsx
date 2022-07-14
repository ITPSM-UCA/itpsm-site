/* eslint-disable no-unused-vars */
import { AiOutlinePlus } from 'react-icons/ai'
import CustomTable from 'components/UI/CustomTable/CustomTable'

interface Props {
  columns: any[],
  tableRef: any,
  editRowAction: any,
  toggleForm: () => void,
  refreshTableAction: () => void,
  fetchData: (query: any) => Promise<any>,
}

const CurriculaTable = ({
  columns,
  tableRef,
  fetchData,
  toggleForm,
  editRowAction,
  refreshTableAction,
}:Props) => (
  <>
    <div className="flex justify-between mb-12">
      <h1 className="text-2xl font-semibold text-gray-900">Plan de estudios</h1>
      <button
        type="button"
        onClick={toggleForm}
        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2"
      >
        <AiOutlinePlus />
        Nuevo plan de estudios
      </button>
    </div>

    <div>
      <CustomTable
        fetchData={fetchData}
        ref={tableRef}
        columns={columns}
        title="Estudiantes"
        onEditClickedAction={editRowAction}
        onRefreshTableClicked={refreshTableAction}
      />
    </div>
  </>
)

export default CurriculaTable
