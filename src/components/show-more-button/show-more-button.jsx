import React, { Component } from 'react'

 class ShowMoreButton extends Component {
  render() {
    const { showMore } = this.props;

    return (
      <div className="show-more-button">
        <button type="text"
                className="btn btn-outline-info"
                onClick={ showMore }>
        Show More
        </button>
      </div>
    )
  }
}

export default ShowMoreButton;