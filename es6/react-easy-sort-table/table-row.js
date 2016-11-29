import React, { Component } from 'react';

export default class TableRow extends Component {
  render() {
    var columns = this.props.columns;
    var data = this.props.data;

    var td = function(datum) {
        return columns.map((column, index) => {
          return <td key={index}>{datum[column]}</td>
        }, this);
      }
    return <tr key={data}>{ td(data) }</tr>
  }
}

TableRow.defaultProps = {
  columns: [],
  data: []
}
