import React, { Component } from 'react'

import './film-list-item.css';

export default class FilmListItem extends Component {

  render() {

    const { title, bookmarked, onAddBookMark } = this.props;

    const isBookmarked = bookmarked.includes(title);
    const bookmarkClass = isBookmarked ?  'btn-secondary' : 'btn-outline-secondary';

    return (
      <span className="film-list-item">
        { title }
        <button type="button"
                className={`btn ${bookmarkClass} btn-sm float-right`}
                onClick={ onAddBookMark }>
          <i className="fa fa-bookmark" />
        </button>
      </span>
    )
  }
}
