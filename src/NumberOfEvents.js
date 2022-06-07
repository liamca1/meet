import React, { Component } from 'react';

class NumberOfEvents extends Component {

    state = {
        numberOfEvents : 32
    }

    changeNumberOfEvents = (e) => {
        //if no number is set, number value is set to 32 by default
        const numberValue = e.target.value;
        if (numberValue <= 0 || typeof numberValue === "number") {
            this.setState({
                errorText: "Please enter at least one event number",
                numberOfEvents: numberValue,
                warningText: null,
            });
        } else if (numberValue > this.props.totalResNumber) {
            return this.setState({
                numberOfEvents: this.props.totalResNumber,
                errorText: null,
                warningText: "There are only ${this.props.totalResNumber} events in this category!",
            });
        } else if (numberValue > 0) {
            this.setState({
                numberOfEvents: numberValue,
                warningText: null,
                errorText: null,
            });
        }
        this.props.updateEvents(undefined, numberValue);
    };


  render() {
    return (
      <div className="NumberOfEvents">
        <input 
          className="number-of-events"
          type="number"
          onChange={this.changeNumberOfEvents}
          value={this.props.numberOfEvents}>
        </input>
      </div>
    );
  }
}

export default NumberOfEvents;