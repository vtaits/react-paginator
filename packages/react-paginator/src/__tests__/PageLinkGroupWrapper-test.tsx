/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import {
  shallow,
} from 'enzyme';
import type {
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../__fixtures__/rootProps';

import PageLinkWrapper from '../PageLinkWrapper';
import PageLinkGroupWrapper from '../PageLinkGroupWrapper';

import type {
  LinkComponent,
  PageLinkComponent,
  PageLinkGroupComponent,
} from '../types';

const Link: LinkComponent = () => <div />;
const PageLink: PageLinkComponent = () => <div />;
const PageLinkGroup: PageLinkGroupComponent = () => <div />;

type PageObject = {
  getPageLink: () => ShallowWrapper;
  getPageLinkGroup: () => ShallowWrapper;
};

const defaultProps = {
  Link,
  PageLink,
  PageLinkGroup,
  onPageChange: (): void => {},
  start: 4,
  end: 10,
  page: 8,
  rootProps,
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <PageLinkGroupWrapper
      {...defaultProps}
      {...props}
    />,
  );

  const getPageLink = (): ShallowWrapper => wrapper.find(PageLinkWrapper);
  const getPageLinkGroup = (): ShallowWrapper => wrapper.find(PageLinkGroup);

  return {
    getPageLink,
    getPageLinkGroup,
  };
};

test('should render PageLinkGroup with correct props', () => {
  const page = setup({
    start: 4,
    end: 10,
  });

  const pageLinkGroupNode = page.getPageLinkGroup();

  expect(pageLinkGroupNode.prop('start')).toBe(4);
  expect(pageLinkGroupNode.prop('end')).toBe(10);
  expect(pageLinkGroupNode.prop('rootProps')).toBe(rootProps);
});

test('should render links', () => {
  const onPageChange = jest.fn();
  const hrefBuilder = jest.fn();

  const page = setup({
    onPageChange,
    hrefBuilder,
    start: 4,
    end: 10,
    page: 6,
  });

  const pageLinkNodes = page.getPageLink();

  expect(pageLinkNodes.length).toBe(7);
  pageLinkNodes.forEach((pageLinkNode, index) => {
    expect(pageLinkNode.prop('Link')).toBe(Link);
    expect(pageLinkNode.prop('PageLink')).toBe(PageLink);
    expect(pageLinkNode.prop('onPageChange')).toBe(onPageChange);
    expect(pageLinkNode.prop('hrefBuilder')).toBe(hrefBuilder);
    expect(pageLinkNode.prop('page')).toBe(6);
    expect(pageLinkNode.prop('pageForLink')).toBe(4 + index);
    expect(pageLinkNode.prop('rootProps')).toBe(rootProps);
  });
});
