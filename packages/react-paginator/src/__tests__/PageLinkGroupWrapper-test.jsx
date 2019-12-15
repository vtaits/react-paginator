import React from 'react';
import { shallow } from 'enzyme';

import rootProps from '../__fixtures__/rootProps';

import PageLinkWrapper from '../PageLinkWrapper';
import PageLinkGroupWrapper from '../PageLinkGroupWrapper';

const Link = () => <div />;
const PageLink = () => <div />;
const PageLinkGroup = () => <div />;

const defaultProps = {
  Link,
  PageLink,
  PageLinkGroup,
  onPageChange: Function.prototype,
  start: 4,
  end: 10,
  page: 8,
  rootProps,
};

const setup = (props) => {
  const wrapper = shallow(
    <PageLinkGroupWrapper
      {...defaultProps}
      {...props}
    />,
  );

  const getPageLink = () => wrapper.find(PageLinkWrapper);
  const getPageLinkGroup = () => wrapper.find(PageLinkGroup);

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
