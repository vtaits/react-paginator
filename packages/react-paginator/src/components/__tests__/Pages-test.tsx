/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import Pages, {
  PagesComponent,
} from '../Pages';

type PageObject = {
  getPagesComponentProp: (propName: string) => any;
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <Pages
      rootProps={rootProps}
      {...props}
    />,
  );

  const getPagesComponent = (): ShallowWrapper => wrapper.find(PagesComponent);

  const getPagesComponentProp = (propName: string): any => getPagesComponent().prop(propName);

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
