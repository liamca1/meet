import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';

import { getEvents, extractLocations } from './api';

class App extends Component {

  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: 32
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      this.setState({
        locations: extractLocations(events),
        events: events
      });
    });
    if (!navigator.onLine) {
      this.setState({
        offlineText: 'Hello, you are offline. The events you are viewing may not be up-to-date'
      })
    } else {
      this.setState({
        offlineText: null
      })
    }
  }
  

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else(
      this.setState({
        numberOfEvents: eventCount
      })
    )
    if (location === undefined) {
      location = this.state.locationSelected;
    }
    console.log(eventCount, location)
    getEvents().then((events) => {
      let locationEvents = location === "all" ?
          events :
          events.filter((event) => event.location === location);
      this.setState({
          events: locationEvents.slice(0, eventCount),
          numberOfEvents: eventCount,
          locationSelected: location,
      });
  })
}

  render() {
    return (
      <div className="App">
        <OfflineAlert text={this.state.offlineText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;