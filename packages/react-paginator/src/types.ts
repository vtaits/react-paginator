import type {
  CSSProperties,
  ComponentType,
  ReactNode,
  SyntheticEvent,
} from 'react';

import type {
  PAGES,
  BREAK,
} from './constants';
import type {
  CSSObject,
  StyledProps,
} from './types.styled';

export type GetPages = (params: GetPagesParams) => PagesBlock[];

export type HrefBuilder = (page: number) => string;

export type OnPageChange = (nextPage: number) => void;

export type LinkInnerProps = {
  disabled?: boolean;
  onClick?: (event: SyntheticEvent) => void;
  href?: string;
};

export type StylingBreakProps<Payload> = {
  $rootProps: RootProps<Payload>;
  children?: ReactNode;
};

export type BreakComponentProps<Payload> = {
  Link: LinkComponent<Payload>;
  previous: number;
  next: number;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  rootProps: RootProps<Payload>;
  children?: ReactNode;
};

export type BreakComponent<Payload> = ComponentType<BreakComponentProps<Payload>>;

export type StylingContainerProps<Payload> = {
  $rootProps: RootProps<Payload>;
  children?: ReactNode;
};

export type ContainerComponentProps<Payload> = {
  rootProps: RootProps<Payload>;
  children?: ReactNode;
};

export type ContainerComponent<Payload> = ComponentType<ContainerComponentProps<Payload>>;

export type StylingPageLinkGroupComponentProps<Payload> = {
  $rootProps: RootProps<Payload>;
  children?: ReactNode;
};

export type PageLinkGroupProps<Payload> = {
  rootProps: RootProps<Payload>;
  children?: ReactNode;
  start: number;
  end: number;
};

export type PageLinkGroupComponent<Payload> = ComponentType<PageLinkGroupProps<Payload>>;

export type StylingPagesComponentProps<Payload> = {
  $rootProps: RootProps<Payload>;
  children?: ReactNode;
};

export type PagesProps<Payload> = {
  rootProps: RootProps<Payload>;
  children?: ReactNode;
};

export type PagesComponent<Payload> = ComponentType<PagesProps<Payload>>;

export type LinkComponentProps<Payload> = {
  rootProps: RootProps<Payload>;
  disabled?: boolean;
  href?: string;
  onClick?: (event: SyntheticEvent) => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export type LinkComponent<Payload> = ComponentType<LinkComponentProps<Payload>>;

export type StylingNextLinkComponentProps<Payload> =
  & LinkInnerProps
  & {
    $isDisabled?: boolean;
    $rootProps: RootProps<Payload>;
    children?: ReactNode;
  };

export type NextLinkProps<Payload> = {
  Link: LinkComponent<Payload>;
  isDisabled: boolean;
  innerProps: LinkInnerProps;
  rootProps: RootProps<Payload>;
  children: ReactNode;
};

export type NextLinkComponent<Payload> = ComponentType<NextLinkProps<Payload>>;

export type StylingPreviousLinkComponentProps<Payload> =
  & LinkInnerProps
  & {
    $isDisabled?: boolean;
    $rootProps: RootProps<Payload>;
    children?: ReactNode;
  };

export type PreviousLinkProps<Payload> = {
  Link: LinkComponent<Payload>;
  isDisabled: boolean;
  innerProps: LinkInnerProps;
  rootProps: RootProps<Payload>;
  children: ReactNode;
};

export type PreviousLinkComponent<Payload> = ComponentType<PreviousLinkProps<Payload>>;

export type StylingPageLinkComponentProps<Payload> =
  & LinkInnerProps
  & {
    $isCurrent?: boolean;
    $rootProps: RootProps<Payload>;
    children?: ReactNode;
  };

export type PageLinkProps<Payload> = {
  Link: LinkComponent<Payload>;
  isCurrent: boolean;
  innerProps: LinkInnerProps;
  rootProps: RootProps<Payload>;
  page: number;
  children: ReactNode;
};

export type PageLinkComponent<Payload> = ComponentType<PageLinkProps<Payload>>;

export type Components<Payload> = {
  Break: BreakComponent<Payload>;
  Container: ContainerComponent<Payload>;
  Link: LinkComponent<Payload>;
  NextLink: NextLinkComponent<Payload>;
  PageLink: PageLinkComponent<Payload>;
  PageLinkGroup: PageLinkGroupComponent<Payload>;
  Pages: PagesComponent<Payload>;
  PreviousLink: PreviousLinkComponent<Payload>;
};

export type GetComponentStyle<ComponentProps> = (
  baseStyle: CSSObject,
  componentProps: StyledProps<ComponentProps>,
) => CSSObject;

export type StylesParams<Payload> = {
  break: StylingBreakProps<Payload>;
  container: StylingContainerProps<Payload>;
  nextLink: StylingNextLinkComponentProps<Payload>;
  pageLink: StylingPageLinkComponentProps<Payload>;
  pageLinkGroup: StylingPageLinkGroupComponentProps<Payload>;
  pages: StylingPagesComponentProps<Payload>;
  previousLink: StylingPreviousLinkComponentProps<Payload>;
};

export type Styles<Payload> = Partial<{
  [Key in keyof StylesParams<Payload>]: GetComponentStyle<StylesParams<Payload>[Key]>;
}>;

export type GetPagesParams = {
  pageCount: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  page: number;
};

export type LinksBlock = {
  type: typeof PAGES;
  start: number;
  end: number;
};

export type BreakBlock = {
  type: typeof BREAK;
  previous: number;
  next: number;
};

export type PagesBlock = LinksBlock | BreakBlock;

export type PaginatorProps<Payload> = {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
  breakLabel?: ReactNode;
  page: number;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  getPages?: GetPages;

  components?: Partial<Components<Payload>>;
  styles?: Styles<Payload>;

  payload?: Payload;
};

export type RootProps<Payload> = {
  pageCount: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  previousLabel: ReactNode;
  nextLabel: ReactNode;
  breakLabel: ReactNode;
  page: number;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  getPages?: GetPages;

  components?: Partial<Components<Payload>>;
  styles: Styles<Payload>;

  payload?: Payload;
};
