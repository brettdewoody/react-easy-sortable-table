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
        rows.push(<TableRowItem key={item.id} data={item} columns={columnNames}/>)
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

var TableHeader = React.createClass({
  render: function() {

    var columns = this.props.columns;

    var cell = function() {
        return columns.map(function(c, i) {
          return <th key={c}>{c}</th>;
        }, this);
      }.bind(this);

    return (
      <tr key="headerRow">{ cell(this.props.item) }</tr>
    )
  }
});

var TableRowItem = React.createClass({
  render: function() {

    var columns = this.props.columns;
    var data = this.props.data;

    var td = function(item) {
        return columns.map(function(c, i) {
          return <td key={item[c]}>{item[c]}</td>;
        }, this);
      }.bind(this);

    return (
      <tr key={data}>{ td(data) }</tr>
    )
  }
});

React.render(
  <TableComponent src="./data/data.json" />,
  document.getElementById('table')
)
