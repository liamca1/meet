import React, { Component } from 'react';
import { ErrorAlert } from './Alert';
class NumberOfEvents extends Component {

    state = {
        numberOfEvents : 1
    }

    changeNumberOfEvents = (event) => {
      let numberValue = parseInt(event.target.value);
      if ((numberValue > 33) || (numberValue < 1)) {
        this.setState({
          numberOfEvents: numberValue,
          errorText: 'Please choose a number between 1 and 32',
        })
      } else {
        this.setState({
          numberOfEvents: numberValue,
          errorText: ' ',
        })
      }
          this.props.updateEvents(undefined, numberValue);
    }

  render() {
    return (
      <>
      <div className="NumberOfEvents">How many events would you like to see?</div>
        <input 
          className="number-of-events"
          type="number"
          onChange={this.changeNumberOfEvents}
          value={this.props.numberOfEvents}>
        </input>
        <ErrorAlert text={this.state.errorText} />
      </>
    );
  }
}

export default NumberOfEvents;