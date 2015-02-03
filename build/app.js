var TableComponent = React.createClass({displayName: 'TableComponent',

  getInitialState: function() {
    return {
      data: this.props.data || []
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

      var header = columnNames.map(function(c) {
        return React.createElement("th", null, c);
      }, this);

      var cell = function(x) {
        return columnNames.map(function(c) {
          return React.createElement("td", {onClick: ""}, x[c]);
        }, this);
      }.bind(this);

      this.state.data.forEach(function(item, idx) {
        rows.push(
          React.createElement("tr", {key: item.id}, 
             cell(item) 
          )
        );
      }.bind(this));

      return (
        React.createElement("table", null, 
          React.createElement("thead", null, 
          React.createElement("tr", null, 
            header 
          )
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

React.render(
  React.createElement(TableComponent, {src: "./data/data.json"}),
  document.getElementById('table')
)
