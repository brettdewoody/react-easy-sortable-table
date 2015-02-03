var TableComponent = React.createClass({

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
        return <th>{c}</th>;
      }, this);

      var cell = function(x) {
        return columnNames.map(function(c) {
          return <td onClick="">{x[c]}</td>;
        }, this);
      }.bind(this);

      this.state.data.forEach(function(item, idx) {
        rows.push(
          <tr key={item.id}>
            { cell(item) }
          </tr>
        );
      }.bind(this));

      return (
        <table>
          <thead>
          <tr>
            { header }
          </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      )
    } else {
      return (
        <table></table>
      )
    }
  }

});

React.render(
  <TableComponent src="./data/data.json" />,
  document.getElementById('table')
)
