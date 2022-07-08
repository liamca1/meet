import React, { Component } from 'react';
import './EventList.css';
import Event from './Event';

class EventList extends Component {
    render() {
        const { events } = this.props;
        return (
          <div className="EventList" >
            {events.map(event =>
              <li key={event.id}>
                <Event event={event} />
              </li>
            )}
          </div>
        );
      }
}

export default EventList;