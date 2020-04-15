import React, {
  memo,
  useMemo,
  FC,
} from 'react';

import components from './components';
import defaultGetPages from './getPages';

import NextLinkWrapper from './NextLinkWrapper';
import PreviousLinkWrapper from './PreviousLinkWrapper';
import PageLinkGroupWrapper from './PageLinkGroupWrapper';

import {
  PAGES,
  BREAK,
} from './constants';

import {
  PagesBlock,
  PaginatorProps,
  Components,
  RootProps,
} from './types';

const Paginator: FC<PaginatorProps> = memo((props) => {
  const {
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

    components: componentsProp,
  } = props;

  const mergedComponents: Components = useMemo(() => {
    if (componentsProp) {
      return {
        ...components,
        ...componentsProp,
      };
    }

    return components;
  }, [componentsProp]);

  const pages: PagesBlock[] = useMemo(() => getPages({
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
      rootProps={props as RootProps}
    >
      <PreviousLinkWrapper
        Link={Link}
        PreviousLink={PreviousLink}
        onPageChange={onPageChange}
        hrefBuilder={hrefBuilder}
        previousLabel={previousLabel}
        page={page}
        rootProps={props as RootProps}
      />

      <Pages
        rootProps={props as RootProps}
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
                    rootProps={props as RootProps}
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
                    rootProps={props as RootProps}
                    key={index}
                  />
                );

              default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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
        rootProps={props as RootProps}
      />
    </Container>
  );
});

Paginator.displayName = 'Paginator';

Paginator.defaultProps = {
  pageRangeDisplayed: 5,
  marginPagesDisplayed: 2,
  previousLabel: 'prev',
  nextLabel: 'next',
  breakLabel: '...',
  hrefBuilder: null,
  getPages: defaultGetPages,

  components: null,
  styles: {},
};

export default Paginator;
