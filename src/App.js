import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventGenre from './EventGenre';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
// import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { OfflineAlert } from './Alert';

import { getEvents, extractLocations, checkToken } from './api';

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

getData = () => {
  const {locations, events} = this.state;
  const data = locations.map((location)=>{
    const number = events.filter((event) => event.location === location).length
    const city = location.split(', ').shift()
    return {city, number};
  })
  return data;
};

render() {
  const { locations, numberOfEvents, events } = this.state;
  return (
    <div className="App">
      <OfflineAlert />
      <h1>Meet App</h1>
      <h4>Choose your nearest city</h4>
      <CitySearch updateEvents={this.updateEvents} locations={locations} />
      <NumberOfEvents
        updateEvents={this.updateEvents}
        numberOfEvents={numberOfEvents}
      />       
       <h4>Events in each city</h4>

    <div className='data-ivs-wrapper'>
      <EventGenre events={events} />
      <ResponsiveContainer height={400} >
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="city" />
          <YAxis
            allowDecimals={false}
            type="number"
            dataKey="number"
            name="number of events"
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={this.getData()} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
    <EventList events={events} />
    </div>
  );
}
}

export default App;