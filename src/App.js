import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventGenre from './EventGenre';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { OfflineAlert } from './Alert';
import { Container, Col, Row, Navbar, NavDropdown, Nav, InputGroup, Form, Offcanvas, Button, FormControl, } from 'react-bootstrap';

import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { mockData } from './mock-data';

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
    <section className="layout">
      <div className="sidebar">
        <p className="marquee">HAPPENINGS</p>
      </div>
      <div className="body">
        <div className="comp-1">Use this progressive web application (PWA) to search for events happening in your city! It connects to the Google Calendar API to fetch events for a city as specified by the you!</div>
        <div className="comp-1">
        </div>

        <div className="comp-1">
          <CitySearch updateEvents={this.updateEvents} locations={locations} />
        </div>
        <div className="comp-1">
        <NumberOfEvents updateEvents={this.updateEvents} numberOfEvents={numberOfEvents} />
        </div>
        <div className="comp-1">
        <p className="p2">Visualising events by city</p>
        <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"/>
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
        <p className="p2">Visualising events by genre</p>
        <EventGenre events={this.state.events} />
        </div>
        <div className="comp-1">
          <EventList events={events} />
        </div>
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    </section> 
  );
}
}

export default App;