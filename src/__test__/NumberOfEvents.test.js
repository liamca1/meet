import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from "../mock-data";


describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    const numberOfEvents = NumberOfEventsWrapper.prop('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(numberOfEvents);
  });

  test('react to state change', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 16 });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(16);
});

  test('change numberOfEvents state when number input changes', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 16 });
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', { target: { value: 12 } });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(12);
});

})