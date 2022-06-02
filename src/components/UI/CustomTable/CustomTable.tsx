/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import { forwardRef } from 'react'
import MaterialTable, { Query, QueryResult, MTableToolbar } from 'material-table'
import SearchInput from './SearchInput'

interface Props {
  title: string,
  columns: any[],
  fetchData: (query:any) => Promise<any>,
  onCreatePDF?: any,
  onEditClickedAction?: any,
  onRefreshTableClicked?: () => void,
}

const CustomTable = forwardRef(({
  title,
  columns,
  fetchData,
  onCreatePDF,
  onEditClickedAction,
  onRefreshTableClicked,
}:Props, ref) => {
  const actions = []

  if (onRefreshTableClicked) {
    actions.push({
      icon: 'refresh',
      tooltip: 'Actualizar',
      isFreeAction: true,
      onClick: onRefreshTableClicked,
    })
  }

  if (onCreatePDF) {
    actions.push({
      icon: 'picture_as_pdf',
      tooltip: 'Generar PDF',
      onClick: onCreatePDF,
    })
  }

  if (onEditClickedAction) {
    actions.push({
      icon: 'edit',
      tooltip: 'Editar registro',
      onClick: onEditClickedAction,
    })
  }

  const getData = (query:Query<object>) : Promise<QueryResult<object>> => new Promise((resolve) => {
    fetchData(query).then((result:any) => {
      resolve({
        data: result.rows,
        page: result.page - 1,
        totalCount: result.records,
      })
    })
  })

  return (
    <MaterialTable
      title=""
      columns={columns}
      data={getData}
      tableRef={ref}
      actions={actions}
      options={{
        search: false,
        exportButton: true,
        actionsColumnIndex: -1,
        pageSizeOptions: [5, 8, 10, 20, 50],
        headerStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '0.5rem',
          zIndex: 0,
        },
        rowStyle: {
          padding: '4px',
          fontSize: '14px',
        },
      }}
      components={{
        Toolbar: (props:any) => (
          <div className="flex flex-row justify-between">
            <div className="p-4">
              <SearchInput
                value={props.searchText}
                onChanged={props.onSearchChanged}
              />
            </div>
            <div id="custom-table-buttons-container" className="flex flex-row grow justify-end">
              <MTableToolbar {...props} className="flex" />
            </div>
          </div>
        ),
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'No hay registros que mostrar',
        },
        toolbar: {
          searchTooltip: 'Buscar',
          searchPlaceholder: 'Buscar',
          exportTitle: 'Exportar',
          exportCSVName: 'Exportar a CSV',
          exportPDFName: 'Exportar a PDF',
        },
        header: {
          actions: '',
        },
        grouping: {
          placeholder: 'Arrastre las columnas que desea agrupar',
        },
        pagination: {
          labelRowsSelect: 'Registros',
          labelDisplayedRows: ' Mostrando {from}-{to} de {count}',
          firstTooltip: 'Primera página',
          previousTooltip: 'Página anterior',
          nextTooltip: 'Página siguiente',
          lastTooltip: 'Ultima página',
        },
      }}
    />
  )
})

export default CustomTable
