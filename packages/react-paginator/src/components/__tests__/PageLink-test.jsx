import React from 'react';
import { shallow } from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import PageLink, {
  PageLinkComponent,
} from '../PageLink';

const Link = () => <div />;

const setup = (props) => {
  const wrapper = shallow(
    <PageLink
      rootProps={rootProps}
      Link={Link}
      {...props}
    />,
  );

  const getPageLinkComponent = () => wrapper.find(PageLinkComponent);

  const getPageLinkComponentProp = (propName) => getPageLinkComponent().prop(propName);

  return {
    getPageLinkComponentProp,
  };
};

test('should provide correct props to PageLinkComponent', () => {
  const page = setup({
    children: 'test',
    isCurrent: true,

    innerProps: {
      href: '/test/',
    },
  });

  expect(page.getPageLinkComponentProp('children')).toBe('test');
  expect(page.getPageLinkComponentProp('rootProps')).toBe(rootProps);
  expect(page.getPageLinkComponentProp('href')).toBe('/test/');
  expect(page.getPageLinkComponentProp('isCurrent')).toBe(true);
  expect(page.getPageLinkComponentProp('as')).toBe(Link);
});
