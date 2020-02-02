import React, { Component } from 'react';

export default class TabItem extends Component {
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const { 
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'btn btn-outline-info';

    if (activeTab === label) {
      className = 'btn btn-info';
    }

    return (
      <button 
        className={className}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}
