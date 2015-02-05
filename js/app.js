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

  sortByColumn: function(array, column) {
    return array.sort(function(a, b) {
      var x = a[column]; var y = b[column];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  },

  sort: function(column) {
    var sortedData = this.sortByColumn(this.state.data, column);
    this.replaceState({data: sortedData});
  },

  render: function() {
    var columns = this.getColumnNames();
    var data = this.state.data;

    if (this.isMounted()){

      return (
        <table>
          <thead>
            <TableHeader onSort={this.sort} columns={columns} />
          </thead>
          <TableBody columns={columns} data={data}/>
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
  sort: function(column) {
    return function(event) {
      this.props.onSort(column);
    }.bind(this);
  },

  render: function() {
    var columns = this.props.columns;
    var cell = function() {
        return columns.map(function(c, i) {
          return <th onClick={this.sort(c)} sort={"asc"} key={c}>{c}</th>;
        }, this);
      }.bind(this);

    return (
      <tr key="headerRow">{ cell(this.props.item) }</tr>
    )
  }
});

var TableBody = React.createClass({
  render: function(){
    var columns = this.props.columns;
    var data = this.props.data;

    return (
      <tbody>
        {data.map(function(item, idx){
          return <TableRow key={idx} data={item} columns={columns}/>;
        })}
      </tbody>
    )
  }

});

var TableRow = React.createClass({
  render: function() {
    var columns = this.props.columns;
    var data = this.props.data;
    var td = function(item) {

        return columns.map(function(c, i) {
          return <td key={i}>{item[c]}</td>;
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
