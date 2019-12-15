import React from 'react';
import { shallow } from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import NextLink, {
  NextLinkComponent,
} from '../NextLink';

const Link = () => <div />;

const setup = (props) => {
  const wrapper = shallow(
    <NextLink
      rootProps={rootProps}
      {...props}
    />,
  );

  const getNextLinkComponent = () => wrapper.find(NextLinkComponent);

  const getNextLinkComponentProp = (propName) => getNextLinkComponent().prop(propName);

  return {
    getNextLinkComponentProp,
  };
};

test('should provide correct props to NextLinkComponent', () => {
  const page = setup({
    Link,
    children: 'test',
    isDisabled: true,

    innerProps: {
      href: '/test/',
    },
  });

  expect(page.getNextLinkComponentProp('children')).toBe('test');
  expect(page.getNextLinkComponentProp('rootProps')).toBe(rootProps);
  expect(page.getNextLinkComponentProp('href')).toBe('/test/');
  expect(page.getNextLinkComponentProp('isDisabled')).toBe(true);
  expect(page.getNextLinkComponentProp('as')).toBe(Link);
});
