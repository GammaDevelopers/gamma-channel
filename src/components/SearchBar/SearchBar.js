import React from 'react';
import './SearchBar.css';
import {default as SearchBarUi} from 'material-ui-search-bar';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
      }


    onSearchChange = (value) => {
        this.props.callback(value);
    }

    render() {
        return(
          <div className="searchBar">
            <SearchBarUi
            ref={input => this.search = input}
            onChange={(value) => this.onSearchChange(value)}
            hintText = "Seach thread contents..."
            style={{margin: '5 auto'}}
            />
          </div>
    );
    }
}
