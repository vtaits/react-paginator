import {
  memo,
} from 'react';
import type {
  ReactElement,
  ReactNode,
} from 'react';

import { PageLinkWrapper } from './PageLinkWrapper';

import type {
  OnPageChange,
  HrefBuilder,
  RootProps,
  LinkComponent,
  PageLinkComponent,
  PageLinkGroupComponent,
} from './types';

export type PageLinkGroupWrapperProps<Payload> = {
  Link: LinkComponent<Payload>;
  PageLink: PageLinkComponent<Payload>;
  PageLinkGroup: PageLinkGroupComponent<Payload>;
  start: number;
  end: number;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  page: number;
  rootProps: RootProps<Payload>;
};

function PageLinkGroupWrapperInner<Payload>({
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  Link,
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  PageLink,
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  PageLinkGroup,
  start,
  end,
  onPageChange,
  hrefBuilder = undefined,
  page,
  rootProps,
}: PageLinkGroupWrapperProps<Payload>): ReactElement {
  const renderedPages: ReactNode[] = [];
  for (let pageForLink = start; pageForLink <= end; ++pageForLink) {
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
}

export const PageLinkGroupWrapper = memo(
  PageLinkGroupWrapperInner,
) as typeof PageLinkGroupWrapperInner;
