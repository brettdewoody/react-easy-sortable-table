import React, { Component } from 'react';

export default class TableHeader extends Component {

  sortHeader(column) {
    return (event) => {
      var sortDir = this.props.sortDir;
      this.props.onSort(column, sortDir)
    }
  }

  render() {
    var columns = this.props.columns;
    var cell = () => {
        return columns.map((c, i) => {
          return <th onClick={this.sortHeader(c)} key={i}>{c}</th>;
        }, this);
      }

    return (
      <tr className="headerRow">{ cell(this.props.item) }</tr>
    )
  }
}
