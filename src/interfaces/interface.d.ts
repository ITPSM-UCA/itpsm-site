export {}

declare global {
    interface TableProps {
        columns: any[],
        tableRef: any,
        // Data
        fetchData: (query: any) => Promise<any>
        // States
        toggleForm: () => void,
        // Actions
        editRowAction: any,
        refreshTableAction: () => void,
    }

    interface FormProps {
        data: any,
        clearData: () => void,
        toggleForm: () => void,
    }
}