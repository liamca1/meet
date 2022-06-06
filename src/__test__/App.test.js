import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

  test('render list of events', () => {

    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {

    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});

// The first step is always to simply test that the required component (in this case, CitySearch) exists.
// Only then can you also test whether it provides the required functionality.