import {
  memo,
} from 'react';
import type {
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from 'react';

import type {
  OnPageChange,
  HrefBuilder,
  RootProps,
  LinkInnerProps,
  LinkComponent,
  NextLinkComponent,
} from './types';

export type NextLinkWrapperProps<Payload> = {
  Link: LinkComponent<Payload>;
  NextLink: NextLinkComponent<Payload>;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  nextLabel: ReactNode;
  page: number;
  pageCount: number;
  rootProps: RootProps<Payload>;
};

function NextLinkWrapperInner<Payload>({
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  Link,
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  NextLink,
  onPageChange,
  hrefBuilder = undefined,
  nextLabel,
  page,
  pageCount,
  rootProps,
}: NextLinkWrapperProps<Payload>): ReactElement {
  const isDisabled = page === pageCount;

  const onClick = (event: SyntheticEvent): void => {
    event.preventDefault();
    onPageChange(page + 1);
  };

  const innerProps: LinkInnerProps = {};

  if (isDisabled) {
    innerProps.disabled = true;
  } else {
    innerProps.onClick = onClick;

    if (hrefBuilder) {
      innerProps.href = hrefBuilder(page + 1);
    }
  }

  return (
    <NextLink
      Link={Link}
      isDisabled={isDisabled}
      innerProps={innerProps}
      rootProps={rootProps}
    >
      {nextLabel}
    </NextLink>
  );
}

export const NextLinkWrapper = memo(NextLinkWrapperInner) as typeof NextLinkWrapperInner;
