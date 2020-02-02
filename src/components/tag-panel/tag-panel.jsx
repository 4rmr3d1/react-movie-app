import React, { Component } from 'react'

export default class TagPanel extends Component {

  onSelect = (e) => {
    const tagItem = e.target.innerHTML;

    this.props.onTagSelect(tagItem);
  }

  render () {
    const { tags, selectedTags } = this.props;

    const tagItem = tags.map((item) => {
      const tagName = item;
      const isActive = selectedTags.includes(tagName);
      const btnClass = isActive ? 'btn-info' : 'btn-outline-info';

      return (
        <button key={ tagName } 
                className={`btn m-1 ${btnClass}`}
                onClick={ this.onSelect }
                >
          { tagName }
        </button>
      )
    });

    return (
      <div className="tag-list">
        { tagItem }
      </div>
    )
  }
}


