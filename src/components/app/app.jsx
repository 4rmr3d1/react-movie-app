import React, { Component } from 'react';

import SearchPanel from '../search-panel';
import Tabs from '../tabs';
import TagPanel from '../tag-panel';
import FilmList from '../film-list';
import ShowMoreButton from '../show-more-button';

import films from '../../jsons/films';
import tags from '../../jsons/tags';

import './app.css';

export default class App extends Component {
  state = {
    films: films,
    tags: tags,
    limit: 15,
    term : '',
    bookmarks : '',
    selectedTags: [],
  }

  componentDidMount() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    this.setState({
      bookmarks : bookmarks
    })
  }

  refreshLimit = (limit) => {
    this.setState({ limit })
  }

  increaseLimit = (limit) => {
    const newLimit = limit + 15;
    return newLimit;
  }

  showMore = () => {
    this.setState(({ limit }) => {
      return {
        limit : this.increaseLimit(limit),
      }
    });
  };

  onSearchChange = (term) => {
    this.setState({ term })
  }

  onSearch = ( items, term ) => {
    if (term.length === 0) {
      return items;
    }
    
    return items.filter((item) => {
      return item.title
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    });
  };
  
  onTagSelect = ( tag ) => {
    this.setState(({ selectedTags }) => {
      if (selectedTags.indexOf(tag) !== -1) {
        selectedTags.splice(selectedTags.indexOf(tag, 0), 1);

        return {
          selectedTags: selectedTags,
        }

      } else {
        const newArray = [
          ...selectedTags,
          tag,
        ];

        return {
          selectedTags: newArray,
        };
      }
    });
  }

  onFilter = ( items, selectedTag ) => {
    if (tags.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return selectedTag.every((tag) => 
        item.tags
          .includes(tag)
        )
    });
  }

  onAddBookmark = ( title ) => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [],
        index = bookmarks.indexOf(title);

    if (index === -1){
      bookmarks.push(title);
    } else {
      bookmarks.splice(index, 1);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    this.setState ({
      bookmarks : bookmarks,
    });
  }

  render() {

    const { 
      films, limit, term, selectedTags, bookmarks 
    } = this.state;

    let showButton;

    const filteredList = this.onSearch (
      this.onFilter(films, selectedTags), term);

    Object.keys(filteredList).length > limit ? 
      showButton = true : showButton = false;

    return (
      <div className="app">
        <Tabs>
          <div label="Фильмы">
            <SearchPanel 
              onSearchChange={ this.onSearchChange }
              refreshLimit={ this.refreshLimit } 
            />
            <TagPanel 
              tags={ tags }
              selectedTags={ selectedTags }
              onTagSelect={ this.onTagSelect }
            />
            <FilmList 
              films={ filteredList }
              limit={ limit }
              bookmarkedItems={ bookmarks }
              onAddBookmark={ this.onAddBookmark }
            />
            { showButton ? (
              <ShowMoreButton showMore={ this.showMore }/>
            ) : (
              null
            )}  
          </div>
          <div label="Закладки">
            <FilmList 
              films={ bookmarks }
              limit={ limit }
              bookmarkedItems={ bookmarks }
              onAddBookmark={ this.onAddBookmark }
            />
          </div>
        </Tabs>
      </div>
    );
  };
};

