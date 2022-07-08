import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({showSuggestions:true});
        const suggestions = this.props.locations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
          this.setState({
            query: value,
            infoText: 'We can not find the city you are looking for. Please try another city',
          });
        } else {
          return this.setState({
            query: value,
            suggestions,
            infoText:''
          });
        }
      };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            suggestion: [],
            showSuggestions: false,
            infoText:''
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <>
            <div className="CitySearch">Search for events in different cities</div>
                <InfoAlert text={this.state.infoText} />
                <input
                    type="text"
                    className="city"
                    placeholder='Search here   ...   ...   ...'
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <div className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>
                    {this.state.suggestions.map((suggestion) => (
                        <div 
                            className="suggestion-1"
                            key={suggestion}
                            onClick={() => 
                        this.handleItemClicked(suggestion)}
                        ><p1>{suggestion}</p1></div>
                    ))}
                    <a onClick={() => this.handleItemClicked("all")}>
                        <div className="search-city">
                            <b1>Click to see all cities</b1>
                        </div>
                    </a>
                </div>
            </>
        );
    }
}

export default CitySearch;