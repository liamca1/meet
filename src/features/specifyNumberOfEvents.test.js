import React from "react";
import { mount, shallow } from "enzyme";
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from "../App";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;

    test('When user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {

        given('the user hasn’t specified a number of events', async () => {
            AppWrapper = mount(<App />);
        });

        when('displaying events to the user', () => {
            AppWrapper.update();
        });

        then('the default number of 32 events is displayed', () => {
            expect(AppWrapper.find(".event")).toHaveLength(2);
        });
    });

    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        given('the default displayed events', () => {
            AppWrapper = mount(<App />);
        });

        when('the user specifies the number of events', () => {
            AppWrapper.update();
            const eventObject = { target: { value: 1 } };
            AppWrapper.find(".number-of-events").simulate("change", eventObject);
        });

        then('the number of events displayed should change', () => {
            AppWrapper.update();
            expect(AppWrapper.find(".event")).toHaveLength(1);
        });

    });
});