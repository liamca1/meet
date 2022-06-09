Feature: Specify Number of Events

    Scenario: When user hasn’t specified a number, 32 is the default number.

        Given the user hasn’t specified a number of events
        When displaying events to the user
        Then the default number of 32 events is displayed

    Scenario: User can change the number of events they want to see.

        Given the default displayed events
        When the user specifies the number of events
        Then the number of events displayed should change