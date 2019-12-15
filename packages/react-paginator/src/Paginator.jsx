import React, { memo, useMemo } from 'react';

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
  paginatorPropTypes,
} from './propTypes';

const Paginator = memo((props) => {
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

  const mergedComponents = useMemo(() => {
    if (componentsProp) {
      return {
        ...components,
        ...componentsProp,
      };
    }

    return components;
  }, [componentsProp]);

  const pages = useMemo(() => getPages({
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
      rootProps={props}
    >
      <PreviousLinkWrapper
        Link={Link}
        PreviousLink={PreviousLink}
        onPageChange={onPageChange}
        hrefBuilder={hrefBuilder}
        previousLabel={previousLabel}
        page={page}
        rootProps={props}
      />

      <Pages
        rootProps={props}
      >
        {
          pages.map((pagesItem, index) => {
            switch (pagesItem.type) {
              case BREAK:
                return (
                  <Break
                    previous={pagesItem.previous}
                    next={pagesItem.next}
                    hrefBuilder={hrefBuilder}
                    rootProps={props}
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
                    rootProps={props}
                    key={index}
                  />
                );

              default:
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
        rootProps={props}
      />
    </Container>
  );
});

Paginator.displayName = 'Paginator';

Paginator.propTypes = paginatorPropTypes;

Paginator.defaultProps = {
  pageRangeDisplayed: 5,
  marginPagesDisplayed: 2,
  previousLabel: 'previous',
  nextLabel: 'next',
  breakLabel: '...',
  hrefBuilder: null,
  getPages: defaultGetPages,

  styles: {},
};

export default Paginator;
