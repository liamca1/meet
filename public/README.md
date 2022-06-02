● Objective
To build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

● Context
Serverless and PWAs have grown in popularity over the last few years, and they’re both considered to
be the future of web development. By combining these two concepts, your app will not only work as a
normal web application, but it will also reap the benefits of both serverless architecture and PWAs:

- Serverless: No backend maintenance, easy to scale, always available, no cost for idle time.
- PWAs: Instant loading, offline support, push notifications, “add to home screen” prompt,
  responsive design, and cross-platform compatibility.

For this app, you’ll be using a TDD approach, where you write tests before writing the actual
functionality for your app in code. Writing tests forces you to focus on the requirements of your
application before jumping into the code. TDD relies on the repetition of a very short development
cycle, allowing you to get immediate feedback and deliver high-quality code

Key Features:

● 1 — Filter Events by City
As a user
I should be able to “filter events by city”
So that I can see the list of events that take place in that city

    Scenario 1:
        When user hasn’t searched for a city, show upcoming events from all cities.

        Given user hasn’t searched for any city
        When the user opens the app
        Then the user should see a list of all upcoming events

    Scenario 2:
        User should see a list of suggestions when they search for a city.

        Given the main page is open
        When user starts typing in the cirt textbox
        Then the user should see a list of cities (suggestions) that match what they’ve typed

    Scenario 3:
        User can select a city from the suggested list

        Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
        When the user selects a city (e.g., “Berlin, Germany”)
        Then their city should be changed to that city (i.e., “Berlin, Germany”). And the user should receive a list of upcoming events in that city.

---

● 2 — Show/Hide an Event’s Details.
As a user
I should be able to “show/hide an event’s details ”
So that the details of an event can displayed or hidden

    Scenario 1:
        An event element is collapsed by default.

        Given an event element is collapsed
        When the user hasn’t selected the event element
        Then the event element should remain collapsed

    Scenario 2:
        User can expand an event to see its details.

        Given a collapsed event element is displayed
        When the user selects the event
        Then the element expands to display the event details

    Scenario 3:
        User can collapse an event to hide its details.

        Given an expanded element is displaying its details
        When a user deselects/clicks back out of the event
        Then the event element should collapse to hide its details

---

● 3 — Specify Number of Events
As a user
I should be able to specify the number of events that are displayed
So that I can keep track of the events I’m interested in.

    Scenario 1:
        When user hasn’t specified a number, 32 is the default number.

        Given the user hasn’t specified a number of events
        When displaying events to the user
        Then 32 is the default number of events displayed

    Scenario 2:
        User can change the number of events they want to see.

        Given the default displayed events
        When the user specifies the number of events
        Then the number of events displayed should change

---

● 4 — Use the App when Offline
As a user
I should be able to use the app offline
So that I can access and find out about events from the last time I used the app

    Scenario 1:
        Show cached data when there’s no internet connection.

        Given there is no internet connection
        When the user opens the app
        Then cached data is displayed/accessible

    Scenario 2:
        Show error when user changes the settings (city, time range).

        Given that the app is being used offline
        When the user changes the settings (city, time range)
        Then show an error message

---

● 5 — Data Visualisation
As a user
I should be able to see visualisations of data
So that I can better understand what is happening around me and when.

    Scenario 1:
        Show a chart with the number of upcoming events in each city.

        Given that there are upcoming events in the users saved cities
        When in the upcoming events element
        Then show a chart with the number of upcoming events in each city.
