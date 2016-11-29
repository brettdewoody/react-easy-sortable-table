import React, { Component } from 'react';
import TableRow from './table-row';

export default class TableBody extends Component {
  render() {
    var columns = this.props.columns;
    var data = this.props.data;
    var filterText = this.props.filterText

    var tableHeaders = data.map((item, idx) => {
      // currently have to add item.value(s) with an || to add to filter
      if ((filterText) && ((item.content.indexOf(filterText) > -1) || item.id.toString().indexOf(filterText) > -1 )) {
        return <TableRow key={idx} data={item} columns={columns} filterText={filterText} />;
      } else if (!filterText) {
        return <TableRow key={idx} data={item} columns={columns} filterText={filterText} />;
      } else {
        return null
      }
    })

    return (
      <tbody>
        {tableHeaders}
      </tbody>
    )
  }
}

TableBody.defaultProps = {
  columns: [],
  data: [],
  filterText: ""
}
