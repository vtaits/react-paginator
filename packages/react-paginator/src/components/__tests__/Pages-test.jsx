import React from 'react';
import { shallow } from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import Pages, {
  PagesComponent,
} from '../Pages';

const setup = (props) => {
  const wrapper = shallow(
    <Pages
      rootProps={rootProps}
      {...props}
    />,
  );

  const getPagesComponent = () => wrapper.find(PagesComponent);

  const getPagesComponentProp = (propName) => getPagesComponent().prop(propName);

  return {
    getPagesComponentProp,
  };
};

test('should provide correct props to PagesComponent', () => {
  const page = setup({
    children: 'test',
  });

  expect(page.getPagesComponentProp('children')).toBe('test');
  expect(page.getPagesComponentProp('rootProps')).toBe(rootProps);
});
