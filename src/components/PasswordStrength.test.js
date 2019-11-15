import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import PasswordStrength from './PasswordStrength';

describe('<PasswordStrength />', () => {
  it('displays the correct message based on score', () => {
    const wrapper = shallow(<PasswordStrength score={5} />);
    expect(wrapper.find('PasswordStrength__PasswordMessage').text()).toBe(
      'Really weak password',
    );

    wrapper.setProps({ score: 25 });
    expect(wrapper.find('PasswordStrength__PasswordMessage').text()).toBe(
      'Weak password',
    );

    wrapper.setProps({ score: 45 });
    expect(wrapper.find('PasswordStrength__PasswordMessage').text()).toBe(
      'Good password',
    );

    wrapper.setProps({ score: 65 });
    expect(wrapper.find('PasswordStrength__PasswordMessage').text()).toBe(
      'Strong password',
    );

    wrapper.setProps({ score: 85 });
    expect(wrapper.find('PasswordStrength__PasswordMessage').text()).toBe(
      'Very strong password',
    );
  });
});
