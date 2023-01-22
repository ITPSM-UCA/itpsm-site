import { AiOutlinePlus } from 'react-icons/ai'
import CustomTable from 'components/UI/CustomTable/CustomTable'

const ModulesTable = ({
    columns, tableRef,
    fetchData, toggleForm,
    editRowAction, refreshTableAction
}: TableProps) => (
    <>
        <div className="flex justify-between mb-12">
            <h1 className="text-2xl font-semibold text-gray-900">Módulos</h1>
            <button
                type = "button"
                onClick = { toggleForm }
                className = "inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none gap-x-2">
                <AiOutlinePlus />
                Nuevo módulo
            </button>
        </div>

        <div>
            <CustomTable
                edit = { false }
                fetchData = { fetchData }
                ref = { tableRef }
                columns = { columns }
                title = "Módulos"
                onEditClickedAction = { editRowAction }
                onRefreshTableClicked = { refreshTableAction }/>
        </div>
    </>
)

export default ModulesTable