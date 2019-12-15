import React from 'react';
import { shallow } from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import PageLinkGroup, {
  PageLinkGroupComponent,
} from '../PageLinkGroup';

const setup = (props) => {
  const wrapper = shallow(
    <PageLinkGroup
      rootProps={rootProps}
      {...props}
    />,
  );

  const getPageLinkGroupComponent = () => wrapper.find(PageLinkGroupComponent);

  const getPageLinkGroupComponentProp = (propName) => getPageLinkGroupComponent().prop(propName);

  return {
    getPageLinkGroupComponentProp,
  };
};

test('should provide correct props to PageLinkGroupComponent', () => {
  const page = setup({
    children: 'test',
  });

  expect(page.getPageLinkGroupComponentProp('children')).toBe('test');
  expect(page.getPageLinkGroupComponentProp('rootProps')).toBe(rootProps);
});
