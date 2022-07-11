<h1>Gathering</h2>

Use this progressive web application (PWA) to search for events happening in your city! It connects to the Google Calendar API to fetch events for a city as specified by the you!

![Screen Shot 2022-07-10 at 12 28 45 PM](https://user-images.githubusercontent.com/88624211/178236186-4f85d878-91e1-4583-be54-2ec740653c32.png)

<h2>Key Features</h2>
<ul>
<li>Filter events by city.</li>
<li>Show/hide event details.</li>
<li>Specify number of events.</li>
<li>Use app offline.</li>
<li>Add app shortcut to the home screen.</li>
<li>View charts visualizing number of events by city.</li>
</ul>

Built with
<ul>
<li>Javascript</li>
<li>HTML</li>
<li>CSS</li>
<li>React</li>
<li>Jest, Cucumber and Puppeteer</li>
<li>Google Calendar API and OAuth2</li>
<li>AWS Lambda</li>
</ul>

<h2>User Stories / App Features</h2>

<h2>1 — Filter Events by City</h2>
As a user
I should be able to “filter events by city”
So that I can see the list of events that take place in that city

<u>Scenario 1:</u>
When user hasn’t searched for a city, show upcoming events from all cities.

Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

<u>Scenario 2:</u>
User should see a list of suggestions when they search for a city.

Given the main page is open
When user starts typing in the cirt textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

<u>Scenario 3:</u>
User can select a city from the suggested list

Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”)
Then their city should be changed to that city (i.e., “Berlin, Germany”). And the user should receive a list of upcoming events in that city.

---

<h2>2 — Show/Hide an Event’s Details.</h2>
As a user
I should be able to “show/hide an event’s details ”
So that the details of an event can displayed or hidden

<u>Scenario 1:</u>
An event element is collapsed by default.

Given an event element is collapsed
When the user hasn’t selected the event element
Then the event element should remain collapsed

<u>Scenario 2:</u>
User can expand an event to see its details.

Given a collapsed event element is displayed
When the user selects the event
Then the element expands to display the event details

<u>Scenario 3:</u>
User can collapse an event to hide its details.

Given an expanded element is displaying its details
When a user deselects/clicks back out of the event
Then the event element should collapse to hide its details

<h2>3 — Specify Number of Events</h2>
As a user
I should be able to specify the number of events that are displayed
So that I can keep track of the events I’m interested in.

<u>Scenario 1:</u>
When user hasn’t specified a number, 32 is the default number.

Given the user hasn’t specified a number of events
When displaying events to the user
Then 32 is the default number of events displayed

<u>Scenario 2:</u>
User can change the number of events they want to see.

Given the default displayed events
When the user specifies the number of events
Then the number of events displayed should change

<h2>4 — Use the App when Offline</h2>
As a user
I should be able to use the app offline
So that I can access and find out about events from the last time I used the app

<u>Scenario 1:</u>
Show cached data when there’s no internet connection.

Given there is no internet connection
When the user opens the app
Then cached data is displayed/accessible

<u>Scenario 2:</U
Show error when user changes the settings (city, time range).

Given that the app is being used offline
When the user changes the settings (city, time range)
Then show an error message

<h2>5 — Data Visualisation</h2>
As a user
I should be able to see visualisations of data
So that I can better understand what is happening around me and when.

<u>Scenario 1:</u>
Show a chart with the number of upcoming events in each city.

Given that there are upcoming events in the users saved cities
When in the upcoming events element
Then show a chart with the number of upcoming events in each city.

<h2>Geting Started</h2>

<b>Clone the repository</b>

git clone https://github.com/Manja-030/cf_meet-app.git

<b>Change directory</b>

cd meet

<b>Install NPM dependencies</b>

npm install

<b>Start the server</b>

npm run start

<b>Build and deploy the app to gh-pages</b>

npm run deploy
