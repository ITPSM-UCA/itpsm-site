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

const SectionsTable = ({
  columns,
  tableRef,
  fetchData,
  toggleForm,
  editRowAction,
  refreshTableAction,
}:Props) => (
  <>
    <div className="flex justify-between mb-12">
      <h1 className="text-2xl font-semibold text-gray-900">Secciones</h1>
     
    </div>

    <div>
      <CustomTable
       edit={false}
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

export default SectionsTable
