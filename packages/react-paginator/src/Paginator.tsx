import {
  memo,
  useMemo,
} from 'react';
import type {
  ReactElement,
} from 'react';

import { components } from './components';
import { getPages as defaultGetPages } from './getPages';

import { NextLinkWrapper } from './NextLinkWrapper';
import { PreviousLinkWrapper } from './PreviousLinkWrapper';
import { PageLinkGroupWrapper } from './PageLinkGroupWrapper';

import {
  PAGES,
  BREAK,
} from './constants';

import type {
  PagesBlock,
  PaginatorProps,
  Components,
  RootProps,
} from './types';

const emptyObj = {};

function PaginatorInner<Payload>(props: PaginatorProps<Payload>): ReactElement {
  const {
    pageCount,
    pageRangeDisplayed = 5,
    marginPagesDisplayed = 2,
    previousLabel = 'prev',
    nextLabel = 'next',
    breakLabel = '...',
    page,
    onPageChange,
    hrefBuilder = undefined,
    getPages = defaultGetPages,
    components: componentsProp = undefined,
    styles = emptyObj,
    payload = undefined,
  } = props;

  const mergedProps = useMemo<RootProps<Payload>>(() => ({
    pageCount,
    pageRangeDisplayed,
    marginPagesDisplayed,
    previousLabel,
    nextLabel,
    breakLabel,
    page,
    onPageChange,
    hrefBuilder,
    getPages,
    components,
    styles,
    payload,
  }), [
    pageCount,
    pageRangeDisplayed,
    marginPagesDisplayed,
    previousLabel,
    nextLabel,
    breakLabel,
    page,
    onPageChange,
    hrefBuilder,
    getPages,
    components,
    styles,
    payload,
  ]);

  const mergedComponents = useMemo<Components<Payload>>(() => {
    if (componentsProp) {
      return {
        ...components,
        ...componentsProp,
      };
    }

    return components;
  }, [componentsProp]);

  const pages = useMemo<PagesBlock[]>(() => getPages({
    pageCount,
    pageRangeDisplayed,
    marginPagesDisplayed,
    page,
  }), [
    pageCount,
    pageRangeDisplayed,
    marginPagesDisplayed,
    page,
  ]);

  const {
    Break,
    Container,
    Link,
    NextLink,
    PageLink,
    PageLinkGroup,
    Pages,
    PreviousLink,
  } = mergedComponents;

  return (
    <Container
      rootProps={mergedProps}
    >
      <PreviousLinkWrapper
        Link={Link}
        PreviousLink={PreviousLink}
        onPageChange={onPageChange}
        hrefBuilder={hrefBuilder}
        previousLabel={previousLabel}
        page={page}
        rootProps={mergedProps}
      />

      <Pages
        rootProps={mergedProps}
      >
        {
          pages.map((pagesItem: PagesBlock, index) => {
            switch (pagesItem.type) {
              case BREAK:
                return (
                  <Break
                    Link={Link}
                    previous={pagesItem.previous}
                    next={pagesItem.next}
                    onPageChange={onPageChange}
                    hrefBuilder={hrefBuilder}
                    rootProps={mergedProps}
                    key={index}
                  >
                    {breakLabel}
                  </Break>
                );

              case PAGES:
                return (
                  <PageLinkGroupWrapper
                    Link={Link}
                    PageLink={PageLink}
                    PageLinkGroup={PageLinkGroup}
                    start={pagesItem.start}
                    end={pagesItem.end}
                    onPageChange={onPageChange}
                    hrefBuilder={hrefBuilder}
                    page={page}
                    rootProps={mergedProps}
                    key={index}
                  />
                );

              default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new Error(`Unknown type "${pagesItem.type}"`);
            }
          })
        }
      </Pages>

      <NextLinkWrapper
        Link={Link}
        NextLink={NextLink}
        onPageChange={onPageChange}
        hrefBuilder={hrefBuilder}
        nextLabel={nextLabel}
        page={page}
        pageCount={pageCount}
        rootProps={mergedProps}
      />
    </Container>
  );
}

export const Paginator = memo(PaginatorInner) as typeof PaginatorInner;
