import type {
  ComponentType,
  ReactNode,
  SyntheticEvent,
} from 'react';

import type {
  PAGES,
  BREAK,
} from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CSSObject = Record<string, any>;

export type GetPages = (params: GetPagesParams) => PagesBlock[];

export type HrefBuilder = (page: number) => string;

export type OnPageChange = (nextPage: number) => void;

export type LinkInnerProps = {
  disabled?: boolean;
  onClick?: (event: SyntheticEvent) => void;
  href?: string;
};

export type BreakComponentProps = {
  Link: LinkComponent;
  previous: number;
  next: number;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  rootProps: RootProps;
  children?: ReactNode;
};

export type BreakComponent = ComponentType<BreakComponentProps>;

export type ContainerComponentProps = {
  rootProps: RootProps;
  children?: ReactNode;
};

export type ContainerComponent = ComponentType<ContainerComponentProps>;

export type PageLinkGroupProps = {
  rootProps: RootProps;
  children?: ReactNode;
  start: number;
  end: number;
};

export type PageLinkGroupComponent = ComponentType<PageLinkGroupProps>;

export type PagesProps = {
  rootProps: RootProps;
  children?: ReactNode;
};

export type PagesComponent = ComponentType<PagesProps>;

export type LinkComponentProps = {
  rootProps: RootProps;
  disabled?: boolean;
  href?: string;
  onClick?: (event: SyntheticEvent) => void;
  children: ReactNode;
  className?: string;
  style?: CSSObject;
};

export type LinkComponent = ComponentType<LinkComponentProps>;

export type NextLinkProps = {
  Link: LinkComponent;
  isDisabled: boolean;
  innerProps: LinkInnerProps;
  rootProps: RootProps;
  children: ReactNode;
};

export type NextLinkComponent = ComponentType<NextLinkProps>;

export type PreviousLinkProps = {
  Link: LinkComponent;
  isDisabled: boolean;
  innerProps: LinkInnerProps;
  rootProps: RootProps;
  children: ReactNode;
};

export type PreviousLinkComponent = ComponentType<PreviousLinkProps>;

export type PageLinkProps = {
  Link: LinkComponent;
  isCurrent: boolean;
  innerProps: LinkInnerProps;
  rootProps: RootProps;
  page: number;
  children: ReactNode;
};

export type PageLinkComponent = ComponentType<PageLinkProps>;

export type Components = {
  Break: BreakComponent;
  Container: ContainerComponent;
  Link: LinkComponent;
  NextLink: NextLinkComponent;
  PageLink: PageLinkComponent;
  PageLinkGroup: PageLinkGroupComponent;
  Pages: PagesComponent;
  PreviousLink: PreviousLinkComponent;
};

export type GetComponentStyle = (
  baseStyle: CSSObject,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentProps: Record<string, any>,
) => CSSObject;

export type Styles = {
  break?: GetComponentStyle;
  container?: GetComponentStyle;
  nextLink?: GetComponentStyle;
  pageLink?: GetComponentStyle;
  pageLinkGroup?: GetComponentStyle;
  pages?: GetComponentStyle;
  previousLink?: GetComponentStyle;
};

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

export type PaginatorProps = {
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

  components?: Partial<Components>;
  styles?: Styles;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type RootProps = {
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

  components?: Partial<Components>;
  styles: Styles;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
