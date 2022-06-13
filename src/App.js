import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

import { OfflineAlert } from './Alert';

import { getEvents, extractLocations, checkToken, getAccessToken } from './api';

class App extends Component {

  state = {
    events: [],
    locations: [],
    showWelcomeScreen: undefined,
    locationSelected: 'all',
    numberOfEvents: 32
  };

  async componentDidMount() {
    this.mounted = true;
    if (navigator.onLine && !window.location.href.startsWith('http://localhost')) {
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events: [],
              locations: extractLocations(events),
              offlineText: ''
            });
          }
        });
      }
    } else {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
            offlineText: 'You are offline. The displayed event list may not be up to date.',
            showWelcomeScreen: false
          });
        }
      });
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
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <>
      <div className="topBar">
        <h2 className="appTitle">Meet App</h2>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
      </div>
      <div className='App'>
        <OfflineAlert text={this.state.offlineText} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
      </>
      
    );
  }
}

export default App;