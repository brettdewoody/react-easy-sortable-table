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
    var columns = this.getColumnNames();
    var data = this.state.data;

    if (this.isMounted()){

      return (
        <table>
          <thead>
            <TableHeader columns={columns} />
          </thead>
          <TableRows columns={columns} data={data}/>
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
    return function(event){

    };
  },

  render: function() {
    var columns = this.props.columns;

    var cell = function() {
        return columns.map(function(c, i) {
          return <th onClick={this.sort(c)} key={c}>{c}</th>;
        }, this);
      }.bind(this);

    return (
      <tr key="headerRow">{ cell(this.props.item) }</tr>
    )
  }
});

var TableRows = React.createClass({
  render: function(){
    var columns = this.props.columns;
    var data = this.props.data;

    return (
      <tbody>
        {data.map(function(item, idx){
          return <TableRowItem key={idx} data={item} columns={columns}/>;
        })}
      </tbody>
    )
  }

});

var TableRowItem = React.createClass({
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
