import React from 'react';
import { mount, render } from 'enzyme';
import 'jest-styled-components';

import PasswordInput from './PasswordInput';

describe('<PasswordInput />', () => {
  it('matches snapshot', () => {
    const PasswordInputWithTheme = withTheme(PasswordInput);
    const wrapper = render(
      <PasswordInputWithTheme generate={f => f} value="test value" />,
    );

    expect(wrapper.find('input')).toMatchSnapshot('input field');
    expect(wrapper.find('button').first()).toMatchSnapshot('regenerate button');
    expect(wrapper.find('button').last()).toMatchSnapshot('copy button');
  });

  it('copies password to clipboard when copy button is clicked', () => {
    const spy = jest.fn();
    const PasswordInputWithTheme = withTheme(PasswordInput);
    const wrapper = mount(
      <PasswordInputWithTheme generate={f => f} value="test value" />,
    );
    Object.defineProperty(global.document, 'execCommand', { value: spy });

    wrapper
      .find('button[aria-label="Copy password to clipboard"]')
      .simulate('click');

    expect(spy).toBeCalledWith('copy');
  });

  it('calls callback function when generate new pass button is clicked', () => {
    const spy = jest.fn();
    const PasswordInputWithTheme = withTheme(PasswordInput);
    const wrapper = mount(
      <PasswordInputWithTheme generate={spy} value="test value" />,
    );

    wrapper
      .find('button')
      .first()
      .simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
