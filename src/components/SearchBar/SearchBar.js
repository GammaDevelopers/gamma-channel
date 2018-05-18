import React from 'react';
import {default as SearchBarUi} from 'material-ui-search-bar';
import SearchIcon from 'material-ui/svg-icons/action/search';
import './SearchBar.css';


export default class SearchBar extends React.Component {
  onSearchChange = (value) => {
    this.props.callback(value);
  }

  getHintText = () => {
    if (this.props.type === 'thread') {
      return 'Search thread contents...';
    } else if (this.props.type === 'board') {
      return 'Search board contents...';
    } else {
      return 'Search contents...';
    }
  }

  render() {
    return(
      <div className="searchBar">
        <SearchBarUi
        ref={input => this.search = input}
        onChange={(value) => this.onSearchChange(value)}
        onRequestSearch={() => this.pass}
        hintText={this.getHintText()}
        hintStyle={{color:"rgba(255, 255, 255, 0.54)"}}
        searchIcon={<SearchIcon color={"white"}/>}
        style = {{
          borderRadius: "8px",
          backgroundColor: "#222244"
        }}
        />
      </div>
    );
  }
}
