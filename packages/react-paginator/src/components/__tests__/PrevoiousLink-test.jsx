import React from 'react';
import { shallow } from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import PreviousLink, {
  PreviousLinkComponent,
} from '../PreviousLink';

const Link = () => <div />;

const setup = (props) => {
  const wrapper = shallow(
    <PreviousLink
      rootProps={rootProps}
      {...props}
    />,
  );

  const getPreviousLinkComponent = () => wrapper.find(PreviousLinkComponent);

  const getPreviousLinkComponentProp = (propName) => getPreviousLinkComponent().prop(propName);

  return {
    getPreviousLinkComponentProp,
  };
};

test('should provide correct props to PreviousLinkComponent', () => {
  const page = setup({
    Link,
    children: 'test',
    isDisabled: true,

    innerProps: {
      href: '/test/',
    },
  });

  expect(page.getPreviousLinkComponentProp('children')).toBe('test');
  expect(page.getPreviousLinkComponentProp('rootProps')).toBe(rootProps);
  expect(page.getPreviousLinkComponentProp('href')).toBe('/test/');
  expect(page.getPreviousLinkComponentProp('isDisabled')).toBe(true);
  expect(page.getPreviousLinkComponentProp('as')).toBe(Link);
});
