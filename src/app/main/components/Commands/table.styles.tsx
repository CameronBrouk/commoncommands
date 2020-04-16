import React from 'react'

import MaterialTable, {
  Column,
  MTableHeader,
  MTable,
  MTableAction,
  MTableActions,
  MTableBody,
  MTableBodyRow,
  MTableCell,
  MTablePagination,
  MTableEditField,
  MTableEditRow,
  MTableFilterRow,
  MTableGroupRow,
  MTableGroupbar,
  MTableToolbar,
} from 'material-table'

const style = {
  backgroundColor: '#2e1534',
  color: 'white',
}

export const componentOverrides = {
  Action: (props: any) => (
    <div style={style}>{/* <MTableAction {...props} /> */}</div>
  ),
  Actions: (props: any) => (
    <div style={style}>{/* <MTableActions {...props} /> */}</div>
  ),
  // Body: (props: any) => (
  //   <div style={style}>
  //     <MTableBody {...props} />
  //   </div>
  // ),
  // Cell: (props: any) => (
  //   <div style={style}>
  //     <MTableCell {...props} />
  //   </div>
  // ),
  // Container: props => (
  //   <div style={style}>
  //     <MTableContainer {...props} />
  //   </div>
  // ),
  // EditField: (props: any) => (
  //   <div style={style}>
  //     <MTableEditField {...props} />
  //   </div>
  // ),
  // EditRow: (props: any) => (
  //   <div style={style}>
  //     <MTableEditRow {...props} />
  //   </div>
  // ),
  // FilterRow: (props: any) => (
  //   <div style={style}>
  //     <MTableFilterRow {...props} />
  //   </div>
  // ),
  // GroupBar: (props: any) => (
  //   <div style={style}>
  //     <MTableGroupbar {...props} />
  //   </div>
  // ),
  // Header: (props: any) => (
  //   <div style={style}>
  //     <MTableHeader {...props} />
  //   </div>
  // ),
  // OverlayLoading: props => (
  //   <div style={style}>
  //     <MTable {...props} />
  //   </div>
  // ),
  // Pagination: (props: any) => (
  //   <div style={style}>
  //     <MTablePagination {...props} />
  //   </div>
  // ),
  // Row: (props: any) => (
  //   <div style={style}>
  //     <MTableBodyRow {...props} />
  //   </div>
  // ),
  Toolbar: (props: any) => (
    <div style={style}>
      <MTableToolbar {...props} />
    </div>
  ),
}
