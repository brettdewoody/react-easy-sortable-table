import React, { Component } from 'react';
import ReactTable from '../react-table/table';

// Parent component where table will be rendered
export default class ExampleParent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterText: ""
    }
  }

  handleChange(evt) {
    evt.preventDefault();
    this.setState({
      filterText: evt.target.value
    })
  }

  render() {

    // need to load the data, picked an arbitrary number for length
    if (this.props.data.length < 6) {
      return (<div>Loading...</div>)
    }
    return(
      <div>
        <input type="text" value={this.state.filterText} onChange={(evt, value) => this.handleChange(evt)} placeholder="Filter" />

        // pass down data from wherever and the filter text
        <ReactTable data={this.props.data} filterText={this.state.filterText} />
      </div>
    )
  }
}

BlabsList.defaultProps = {
  data: []
}
