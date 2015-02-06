var TableComponent = React.createClass({displayName: "TableComponent",

  getInitialState: function() {
    return {
      data: []
    };
  },

  componentDidMount: function(){
    $.getJSON('./data/data.json', {
      format: "json"
    }).done(function(data) {
      if (this.isMounted()) {
        this.setState({
          data: data
         });
      }
    }.bind(this));
  },

  getColumnNames: function() {
    if (this.isMounted()){
      var firstEl = this.state.data[0];
      return Object.keys(firstEl);
    }
  },

  sortByColumn: function(array, column) {
    return array.sort(function(a, b) {
      var x = a[column]; 
      var y = b[column];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  },

  sort: function(column, sortDir) {
    var sortedData = this.sortByColumn(this.state.data, column);  
    this.replaceState({data: sortedData});  
    this.sortDir(this.props.sortDir);
  },

  sortDir: function(sortDir){
    var sortDir = (sortDir === 'asc' ? 'dsc' : 'asc');
    this.replaceProps({sortDir: sortDir});
    console.log(this.props.sortDir);
  },

  render: function() {
    var columns = this.getColumnNames();
    var data = this.state.data;

    if (this.isMounted()){
      return (
        React.createElement("table", null, 
          React.createElement("thead", null, 
            React.createElement(TableHeader, {onSort: this.sort, sortDir: this.sortDir, columns: columns})
          ), 
          React.createElement(TableBody, {columns: columns, data: data})
        )
      )
    } else {
      return (
        React.createElement("table", null)
      )
    }
  }
});


var TableHeader = React.createClass({displayName: "TableHeader",
  sort: function(column) {
    return function(event) {
      var sortDir = this.props.sortDir;
      this.props.onSort(column, sortDir);
    }.bind(this);
  },

  render: function() {
    var columns = this.props.columns;
    var cell = function() {
        return columns.map(function(c, i) {
          return React.createElement("th", {onClick: this.sort(c), sortDir: this.props.sortDir, key: c}, c);
        }, this);
      }.bind(this);

    return (
      React.createElement("tr", {key: "headerRow"},  cell(this.props.item) )
    )
  }
});


var TableBody = React.createClass({displayName: "TableBody",
  render: function(){
    var columns = this.props.columns;
    var data = this.props.data;

    return (
      React.createElement("tbody", null, 
        data.map(function(item, idx){
          return React.createElement(TableRow, {key: idx, data: item, columns: columns});
        })
      )
    )
  }
});


var TableRow = React.createClass({displayName: "TableRow",
  render: function() {
    var columns = this.props.columns;
    var data = this.props.data;
    var td = function(item) {

        return columns.map(function(c, i) {
          return React.createElement("td", {key: i}, item[c]);
        }, this);
      }.bind(this);

    return (

      React.createElement("tr", {key: data},  td(data) )
    )
  }
});


React.render(
  React.createElement(TableComponent, {src: "./data/data.json"}),
  document.getElementById('table')
)
