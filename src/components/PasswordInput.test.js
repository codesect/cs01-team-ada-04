import React from 'react';
import { render } from 'enzyme';
import 'jest-styled-components';

import PasswordInput from './PasswordInput';

describe('<PasswordInput />', () => {
  it('matches snapshot', () => {
    const PasswordInputWithTheme = withTheme(PasswordInput);
    const wrapper = render(<PasswordInputWithTheme value="test value" />);

    expect(wrapper).toMatchSnapshot();
  });
});
