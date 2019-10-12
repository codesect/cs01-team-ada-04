import React from 'react';
import { render } from 'enzyme';
import 'jest-styled-components';

import Header from './Header';

describe('<Header />', () => {
  it('matches snapshot', () => {
    const HeaderWithTheme = withTheme(Header);
    const wrapper = render(<HeaderWithTheme />);

    expect(wrapper).toMatchSnapshot();
  });
});
