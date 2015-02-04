var TableComponent = React.createClass({

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
        rows.push(
          <TableRowItem key={item.id} data={item} columns={columnNames}/>
        );
      }.bind(this));

      return (
        <table>
          <thead>
            <TableHeader columns={columnNames}/>
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

var TableRowItem = React.createClass({
  render: function() {

    var cell = function() {
        return this.props.columns.map(function(c) {
          return <td key={this.props.data[c]}>{this.props.data[c]}</td>;
        }, this);
      }.bind(this);

    return (
      <tr>{ cell(this.props.item) }</tr>
    )
  }
});

var TableHeader = React.createClass({
  render: function() {

    var cell = function() {
        return this.props.columns.map(function(c) {
          return <th key={c}>{c}</th>;
        }, this);
      }.bind(this);

    return (
      <tr>{ cell(this.props.item) }</tr>
    )
  }
});

React.render(
  <TableComponent src="./data/data.json" />,
  document.getElementById('table')
)
