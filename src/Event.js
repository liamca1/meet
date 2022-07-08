import React, { Component } from "react";

class Event extends Component {
  state = {
    event: {},
    collapsed: true
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    
    return (
      <div className="event">
        <p className="start-date">
          {event.start.dateTime} <br></br>
          {event.location} <br></br>
          <button
          variant="outline-info"
          className={`details-button ${collapsed ? "show" : "hide"}-details`}
          onClick={this.handleClick}
        >
          {collapsed ? "Show Details" : "Hide Details"}
        </button>
        {!collapsed && (
          <div
            className={`extra-details ${
              this.state.collapsed ? "hide" : "show"
            }`}
          >
            <h3>About the event:</h3>
            <a href={event.htmlLink} rel="noreferrer" target="_blank">
              See details on Google Calendar
            </a>
            <p className="event-description">{event.description}</p>
          </div>
        )}
        </p>
      </div>
    );
  }
}

export default Event;