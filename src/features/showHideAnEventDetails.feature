Feature: Show and Hide an Event’s Details

    Scenario: An event element is collapsed by default.
        Given an event element is collapsed
        When the user hasn’t selected the event element
        Then the event element should remain collapsed

    Scenario: User can expand an event to see its details.
        Given a collapsed event element is displayed
        When the user selects the event
        Then the element expands to display the event details

    Scenario: User can collapse an event to hide its details.
        Given an expanded element is displaying its details
        When a user deselects/clicks back out of the event
        Then the event element should collapse to hide its details