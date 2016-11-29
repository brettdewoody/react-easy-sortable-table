import React, { Component } from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';

export default class ReactTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      sortDir: {}
    }
  }

  componentWillMount() {
    var data = this.props.data
    this.setState({
      data: data
    })
  }

  getColumnNames() {
    var firstEl = this.state.data[0];
    return Object.keys(firstEl);
  }

  // Natural Language Comparison, for Alphanumeric strings
  // http://stackoverflow.com/questions/15478954/sort-array-elements-string-with-numbers-natural-sort
  // naturalCompare(a, b) {
  //   var ax = [], bx = [];
  //   console.log("a",a);
  //   console.log("b",b);
  //   // console.log("col", column);
  //   a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
  //   b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
  //
  //   while(ax.length && bx.length) {
  //       var an = ax.shift();
  //       var bn = bx.shift();
  //       var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
  //       if(nn) return nn;
  //   }
  //
  //   return ax.length - bx.length;
  // }

  sortByColumn(array, column, sortDir) {
    return array.sort((a,b) => {
      var x = a[column];
      var y = b[column];
      if (sortDir === 'asc') {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      } else {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
    })
  }

  sortColumn(column) {
    var sortDir = this.state.sortDir;
    var data = this.state.data;
    var sortedData = this.sortByColumn(data, column, sortDir[column]);
    this.setState({data: sortedData});
    sortDir[column] = (sortDir[column] === 'asc' ? 'dsc' : 'asc');
    this.setState({sortDir: sortDir});
  }

  render() {
    var columns = this.getColumnNames();
    var data = this.state.data;
    return (
      <table>
        <thead>
          <TableHeader onSort={this.sortColumn.bind(this)} columns={columns} />
        </thead>
        <TableBody data={data} columns={columns} filterText={this.props.filterText} />
      </table>
    )
  }
}

ReactTable.defaultProps = {
  data: [],
  filterText: ""
}
