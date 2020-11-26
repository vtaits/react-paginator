import {
  memo,
} from 'react';
import type {
  FC,
  ReactNode,
} from 'react';

import PageLinkWrapper from './PageLinkWrapper';

import type {
  OnPageChange,
  HrefBuilder,
  RootProps,
  LinkComponent,
  PageLinkComponent,
  PageLinkGroupComponent,
} from './types';

type Props = {
  Link: LinkComponent;
  PageLink: PageLinkComponent;
  PageLinkGroup: PageLinkGroupComponent;
  start: number;
  end: number;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  page: number;
  rootProps: RootProps;
};

const PageLinkGroupWrapper: FC<Props> = memo(({
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  Link,
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  PageLink,
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  PageLinkGroup,
  start,
  end,
  onPageChange,
  hrefBuilder,
  page,
  rootProps,
}) => {
  const renderedPages: ReactNode[] = [];
  for (let pageForLink: number = start; pageForLink <= end; ++pageForLink) {
    renderedPages.push(
      <PageLinkWrapper
        Link={Link}
        PageLink={PageLink}
        onPageChange={onPageChange}
        hrefBuilder={hrefBuilder}
        page={page}
        pageForLink={pageForLink}
        rootProps={rootProps}
        key={pageForLink}
      />,
    );
  }

  return (
    <PageLinkGroup
      start={start}
      end={end}
      rootProps={rootProps}
    >
      {renderedPages}
    </PageLinkGroup>
  );
});

PageLinkGroupWrapper.defaultProps = {
  hrefBuilder: null,
};

export default PageLinkGroupWrapper;
