import React, { Component } from 'react'

export default class SearchPanel extends Component {
  
  state = {
    term: '',
  }

  onSearchChange = (e) => {
    const term = e.target.value,
          limit = 15;

    this.setState ({ term });
    this.props.onSearchChange(term);
    this.props.refreshLimit(limit);
  }

  render() {
    return (
      <input type="text"
            value={this.state.term}
            className="form-control search-input"
            onChange={this.onSearchChange}
            placeholder="type to search" />
    )
  }
}
