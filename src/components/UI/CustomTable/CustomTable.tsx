/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import { forwardRef } from 'react'
import MaterialTable, { MTableToolbar, Query, QueryResult } from 'material-table'
import SearchInput from './SearchInput'
import PatchedPagination from './PatchedPagination'
import { Collapse } from '@material-ui/core'
import jsPDF from 'jspdf';
import { data } from 'cypress/types/jquery'

interface Props {
  title: string,
  edit:boolean,
  collapsable:boolean,
  columns: any[],
  fetchData: (query:any) => Promise<any>,
  onCreatePDF?: any,
  onEditClickedAction?: any,
  onDeleteClickedAction?: any,
  onRefreshTableClicked?: () => void,
  bulkedit?: any,
}

const CustomTable = forwardRef(({
  title,
  edit,
  collapsable,
  columns,
  fetchData,
  onCreatePDF,
  onEditClickedAction,
  onRefreshTableClicked,
  onDeleteClickedAction,
  bulkedit,
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
  if (onDeleteClickedAction && onDeleteClickedAction !== {}) {
    actions.push({
      icon: 'delete',
      tooltip: 'Borrar registro',
      onClick: onDeleteClickedAction,
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

  // const exportPDF =() =>{
  //   var doc = new jsPDF()
  //   var col = ["Principal","Descripcion","Fecha","Porcentaje"]
  //   var rows=[]
  //   var  datos= getData
      
    


  // }

  if (edit ) {
    return (
      <MaterialTable
        title=""
        
        columns={columns}
        data={getData}
        tableRef={ref}
        actions={actions}
        // parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        editable={{
          onBulkUpdate: (changes) => new Promise<void>((resolve, reject) => {
            bulkedit(changes)
            resolve()
          }),
        }}
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
            textAlign: 'center',
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
          Pagination: PatchedPagination,
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
  }
  // Nueva condición para tablas con subrows
  if (!edit && collapsable) {
    return (
      <MaterialTable
        title="Evaluaciones"
        data={getData}
        columns={columns}
        tableRef={ref}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        actions={actions}
        options={{
          defaultExpanded: true ,
          search: false,
          exportButton: true,
          actionsColumnIndex: -1,
          pageSizeOptions: [5, 8, 10, 20, 50],
          headerStyle: {
            fontWeight: 'cursive',
            textAlign: 'center',
            padding: '0.5rem',
            zIndex: 0,
          },
          rowStyle: {
            padding: '4px',
            fontSize: '14px',
            textAlign: 'center',
          },

        }}

        components={{
          Toolbar: (props:any) => (
            <div className="flex flex-row justify-between">
              <div className="p-4">
                {/* <SearchInput
                  value={props.searchText}
                  onChanged={props.onSearchChanged}
                /> */}
              </div>
              <div id="custom-table-buttons-container" className="flex flex-row grow justify-end">
                <MTableToolbar {...props} className="flex" />
              </div>
            </div>
          ),
          Pagination: PatchedPagination,
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
  }
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
          fontWeight: 'cursive',
          textAlign: 'center',
          padding: '0.5rem',
          zIndex: 0,
        },
        rowStyle: {
          padding: '4px',
          fontSize: '14px',
          textAlign: 'center',
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
        Pagination: PatchedPagination,
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
