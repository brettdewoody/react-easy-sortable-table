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

  render: function() {
    var rows = [];
    var columnNames = this.getColumnNames();

    if (this.isMounted()){

      this.state.data.forEach(function(item, idx) {
        rows.push(React.createElement(TableRowItem, {key: item.id, data: item, columns: columnNames}))
      }.bind(this));

      return (
        React.createElement("table", null, 
          React.createElement("thead", null, 
            React.createElement(TableHeader, {columns: columnNames})
          ), 
          React.createElement("tbody", null, 
            rows 
          )
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
  render: function() {

    var columns = this.props.columns;

    var cell = function() {
        return columns.map(function(c, i) {
          return React.createElement("th", {key: c}, c);
        }, this);
      }.bind(this);

    return (
      React.createElement("tr", {key: "headerRow"},  cell(this.props.item) )
    )
  }
});

var TableRowItem = React.createClass({displayName: "TableRowItem",
  render: function() {

    var columns = this.props.columns;
    var data = this.props.data;

    var td = function(item) {
        return columns.map(function(c, i) {
          return React.createElement("td", {key: item[c]}, item[c]);
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
