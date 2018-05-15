import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    

    onSearchChange = () => {
        this.props.callback(this.search.value)
    }
    
    render() {
        return(
            <div>
            <input
            ref={input => this.search = input}
            placeholder="Search thread..."
            onChange={this.onSearchChange}
            />
        </div>
    );
    }
}
