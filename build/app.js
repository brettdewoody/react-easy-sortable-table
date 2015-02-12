var TableComponent = React.createClass({displayName: "TableComponent",

  getInitialState: function() {
    return {
      data: [],
      sortDir: {}
    };
  },

  componentDidMount: function(){
    $.getJSON(this.props.src, {
      format: "json"
    }).done(function(data) {

      for (var key in data) {
        var item = data[key];
        var diff = Date.now() - Date.parse(item.birthday);
        var diffdays = diff / 1000 / (60 * 60 * 24);
        var age = Math.floor(diffdays / 365.25);
        item.age = age;
      }


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

  sortByColumn: function(array, column, sortDir) {
    return array.sort(function(a, b) {
      var x = a[column];
      var y = b[column];
      if (sortDir === 'asc') {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      } else {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
    });
  },

  sort: function(column) {
    var sortDir = this.state.sortDir;
    var data = this.state.data;
    var sortedData = this.sortByColumn(data, column, sortDir[column]);
    this.setState({data: sortedData});
    sortDir[column] = (sortDir[column] === 'asc' ? 'dsc' : 'asc');
    this.setState({sortDir: sortDir});
  },

  render: function() {
    var columns = this.getColumnNames();
    var data = this.state.data;

    if (this.isMounted()){
      return (
        React.createElement("table", null, 
          React.createElement("thead", null, 
            React.createElement(TableHeader, {onSort: this.sort, columns: columns})
          ), 
          React.createElement(TableBody, {data: data, columns: columns})
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
          return React.createElement("th", {onClick: this.sort(c), key: c}, c);
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
