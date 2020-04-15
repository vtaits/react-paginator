import {
  ComponentType,
  ReactNode,
  SyntheticEvent,
} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CSSObject = Record<string, any>;

export type PAGES = 'PAGES';
export type BREAK = 'BREAK';

export type GetPages = (params: GetPagesParams) => PagesBlock[];

export type HrefBuilder = (page: number) => string;

export type OnPageChange = (nextPage: number) => void;

export type LinkInnerProps = {
  disabled?: boolean;
  onClick?: (event: SyntheticEvent) => void;
  href?: string;
};

export type BreakComponent = ComponentType<{
  Link: LinkComponent;
  previous: number;
  next: number;
  onPageChange: OnPageChange;
  hrefBuilder: HrefBuilder;
  rootProps: RootProps;
  children?: ReactNode;
}>;

export type ContainerComponent = ComponentType<{
  rootProps: RootProps;
  children?: ReactNode;
}>;

export type PageLinkGroupComponent = ComponentType<{
  rootProps: RootProps;
  children?: ReactNode;
  start: number;
  end: number;
}>;

export type PagesComponent = ComponentType<{
  rootProps: RootProps;
  children?: ReactNode;
}>;

export type LinkComponent = ComponentType<{
  disabled?: boolean;
  href?: string;
  onClick?: (event: SyntheticEvent) => void;
  children: ReactNode;
  className?: string;
  style: CSSObject;
}>;

export type NextLinkComponent = ComponentType<{
  Link: LinkComponent;
  isDisabled: boolean;
  innerProps: LinkInnerProps;
  rootProps: RootProps;
  children: ReactNode;
}>;

export type PreviousLinkComponent = ComponentType<{
  Link: LinkComponent;
  isDisabled: boolean;
  innerProps: LinkInnerProps;
  rootProps: RootProps;
  children: ReactNode;
}>;

export type PageLinkComponent = ComponentType<{
  Link: LinkComponent;
  isCurrent: boolean;
  innerProps: LinkInnerProps;
  rootProps: RootProps;
  page: number;
  children: ReactNode;
}>;

export type WeakComponents = {
  Break?: BreakComponent;
  Container?: ContainerComponent;
  Link?: LinkComponent;
  NextLink?: NextLinkComponent;
  PageLink?: PageLinkComponent;
  PageLinkGroup?: PageLinkGroupComponent;
  Pages?: PagesComponent;
  PreviousLink?: PreviousLinkComponent;
};

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
  type: PAGES;
  start: number;
  end: number;
};

export type BreakBlock = {
  type: BREAK;
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

  components?: Components;
  styles?: Styles;
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

  components?: WeakComponents;
  styles: Styles;
};
