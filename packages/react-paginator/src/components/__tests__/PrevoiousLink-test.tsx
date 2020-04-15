/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import PreviousLink, {
  PreviousLinkComponent,
} from '../PreviousLink';

import {
  LinkComponent,
} from '../../types';

const Link: LinkComponent = () => <div />;

type PageObject = {
  getPreviousLinkComponentProp: (propName: string) => any;
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <PreviousLink
      rootProps={rootProps}
      {...props}
    />,
  );

  const getPreviousLinkComponent = (): ShallowWrapper => wrapper.find(PreviousLinkComponent);

  const getPreviousLinkComponentProp = (
    propName: string,
  ): any => getPreviousLinkComponent().prop(propName);

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
