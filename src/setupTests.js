import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withTheme from './utils/withTheme';

configure({ adapter: new Adapter() });

global.withTheme = withTheme;