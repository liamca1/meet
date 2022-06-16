import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventGenre from './EventGenre';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
// import WelcomeScreen from './WelcomeScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { OfflineAlert } from './Alert';
import { Container, Col, Row, Navbar, NavDropdown, Nav, InputGroup, Form, Offcanvas, Button, FormControl, } from 'react-bootstrap';

import { getEvents, extractLocations, checkToken } from './api';
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
    <div>
      <Container>
        <Row className="header">
          <Col sm={12} md={6} lg={3} className="logo">
            <h1>Happenings</h1>
          </Col>
          <Col sm={12} md={6} lg={3} className="header-search-form">
            <form className="search-form">
              <button className="search-form-button"></button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
              <path d="M413.38 392.4a169.89 169.89 0 0 0 18.19-27.4c43-83 10.73-185.28-72.09-228.39a168.63 168.63 0 0 0-227.82 72.27c-43 83-10.74 185.28 72.09 228.39a168.49 168.49 0 0 0 183.35-18L461.62 494l26.56-26.62zm-194.25 15.16C152.67 373 126.77 290.9 161.28 224.28a135.43 135.43 0 0 1 182.82-58c66.46 34.6 92.36 116.66 57.85 183.28a135.43 135.43 0 0 1-182.82 58z"></path>
            </svg>
            <input placeholder='city search'></input>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
}

export default App;