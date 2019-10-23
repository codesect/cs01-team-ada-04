import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

it('renders without crashing', () => {
  const AppWithTheme = withTheme(App);
  const wrapper = shallow(<AppWithTheme />);

  expect(wrapper.exists()).toBe(true);
});
