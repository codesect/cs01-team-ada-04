const colors = {
  black: '#1a051d',
  blue: '#0084f4',
  blueLight: '#66b5f8',
  blueLighter: '#d5e9fa',
  darkPurple: '#3f3355',
  green: '#00c48c',
  greenLight: '#7ddfc3',
  greenLighter: '#d5f2ea',
  grey: '#d0c9d6',
  greyLight: '#ece9f1',
  greyLighter: '#f7f5f9',
  orange: '#ffa26b',
  orangeLight: '#ffc7a6',
  orangeLighter: '#ffe8da',
  purple: '#8555c5',
  purpleLight: '#dba5f5',
  purpleLighter: '#eedff2',
  red: '#ff647c',
  redLight: '#fdafbb',
  redLighter: '#fbe4e8',
  white: '#fff',
};

const defaultTheme = {
  background: colors.greyLighter,
  border: colors.greyLight,
  borderRadius: '0.25rem',
  borderActive: colors.purple,
  boxShadow: '0 6px 64px 0 rgba(0, 0, 0, 0.07)',
  boxShadowHeader: '0 0 10px rgba(0, 0, 0, 0.07)',
  boxShadowSmall: '0 6px 24px rgba(0, 0, 0, 0.07)',
  breakpointS: '600px',
  button: colors.purple,
  buttonActive: colors.darkPurple,
  buttonText: colors.white,
  footerBackground: colors.purple,
  footerText: colors.white,
  headerBackground: colors.white,
  input: colors.white,
  logoText: colors.purple,
  text: colors.darkPurple,
  maxWidth: '832px',
  transition: '0.3s cubic-bezier(1, -0.65, 0, 2.25)',
  transitionEase: '0.3s ease-in-out',
  transitionEaseOut:
    ' 0.3s cubic-bezier(0.175, 1.03, 0.32, 1.366),padding 0.3s ease, margin 0.3s ease',
};

export default defaultTheme;
