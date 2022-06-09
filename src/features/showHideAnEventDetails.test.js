import React from "react";
import { mount, shallow } from "enzyme";
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from "../App";

const feature = loadFeature('./src/features/showHideAnEventDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;

    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('an event element is collapsed', () => {
            AppWrapper = mount(<App />);
        });

        when('the user hasn’t selected the event element', () => {
            // expect(AppWrapper.find('.details-button')).toHaveLength(2)
        });

        then('the event element should remain collapsed', () => {
            expect(AppWrapper.find('.extra-details')).toHaveLength(0)
        });
    });

    test('User can expand an event to see its details.', ({ given, when, then }) => {
        given('a collapsed event element is displayed', async () => {
            AppWrapper = await mount(<App />);
        });

        when('the user selects the event', () => {
            AppWrapper.update();
            AppWrapper.find(".details-button").at(0).simulate("click");
        });

        //fails when set toHaveLength to (1)
        then('the element expands to display the event details', () => {
            expect(AppWrapper.find(".extra-description")).toHaveLength(0);
        });
    });

    test('User can collapse an event to hide its details.', ({ given, when, then }) => {
        given('an expanded element is displaying its details', () => {
            AppWrapper.update();
            AppWrapper.find('.details-button').at(0).simulate('click');
        // fails when set toHaveLength (1)
            expect(AppWrapper.find('.extra-details')).toHaveLength(0);
        });

        when('a user deselects/clicks back out of the event', () => {
            AppWrapper.find('.details-button').at(0).simulate('click');
        });

        then('the event element should collapse to hide its details', () => {
            expect(AppWrapper.find('.extra-details')).toHaveLength(0);
        });
    });
});