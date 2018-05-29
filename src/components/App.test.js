import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import store from './../store'

it('renders without crashing', () => {
  shallow(<App store={store}/>);
});
