import React from 'react';
import { render } from 'enzyme';
import 'jest-styled-components';

import Footer from './Footer';

describe('<Footer />', () => {
  it('matches snapshot', () => {
    const FooterWithTheme = withTheme(Footer);
    const wrapper = render(<FooterWithTheme />);

    expect(wrapper).toMatchSnapshot();
  });
});
