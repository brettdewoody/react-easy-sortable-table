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
        <table>
          <thead>
            <TableHeader onSort={this.sort} sortDir={this.sortDir} columns={columns} />
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
      var sortDir = this.props.sortDir;
      this.props.onSort(column, sortDir);
    }.bind(this);
  },

  render: function() {
    var columns = this.props.columns;
    var cell = function() {
        return columns.map(function(c, i) {
          return <th onClick={this.sort(c)} sortDir={this.props.sortDir} key={c}>{c}</th>;
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
