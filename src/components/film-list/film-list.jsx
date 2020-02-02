import React from 'react'

import FilmListItem from '../film-list-item'

import './film-list.css';

const FilmList = ({
   films, limit, bookmarkedItems, onAddBookmark 
}) => {

  const filmItem = films
    .slice(0, limit)
    .map((item) => {
      const { title } = item;
    
    if ( title !== undefined ) {
      return (
        <li key={ title } className="list-group-item">
          <FilmListItem 
            title={title}
            onAddBookMark={() => onAddBookmark(title)} 
            bookmarked={ bookmarkedItems }
          />
        </li>
      ) 
    } else {
      return (
        <li key={ item } className="list-group-item">
          <FilmListItem 
            title={item}
            onAddBookMark={() => onAddBookmark(item)} 
            bookmarked={ bookmarkedItems }
          />
        </li>
      )
    }
  });

  return (
    <ul className="list-group film-list">
      { filmItem }
    </ul>
  )
}

export default FilmList;
