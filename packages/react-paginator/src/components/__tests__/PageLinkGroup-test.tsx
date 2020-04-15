/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import PageLinkGroup, {
  PageLinkGroupComponent,
} from '../PageLinkGroup';

type PageObject = {
  getPageLinkGroupComponentProp: (propName: string) => any;
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <PageLinkGroup
      rootProps={rootProps}
      {...props}
    />,
  );

  const getPageLinkGroupComponent = (): ShallowWrapper => wrapper.find(PageLinkGroupComponent);

  const getPageLinkGroupComponentProp = (
    propName: string,
  ): any => getPageLinkGroupComponent().prop(propName);

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
