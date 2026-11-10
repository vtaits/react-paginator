/**
 * @import { ComponentType, CSSProperties, ReactNode, SyntheticEvent } from "react"
 * @import { BREAK, PAGES } from "./constants.js"
 */

/**
 * @typedef {(params: GetPagesParams) => PagesBlock[]} GetPages
 */

/**
 * @typedef {(page: number) => string} HrefBuilder
 */

/**
 * @typedef {(nextPage: number) => void} OnPageChange
 */

/**
 * @typedef {Object} LinkInnerProps
 * @property {boolean} [disabled]
 * @property {(event: SyntheticEvent) => void} [onClick]
 * @property {string} [href]
 */

/**
 * @template Payload
 * @typedef {Object} StylingBreakProps
 * @property {RootProps<Payload>} $rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {Object} BreakComponentProps
 * @property {LinkComponent<Payload>} Link
 * @property {number} previous
 * @property {number} next
 * @property {OnPageChange} onPageChange
 * @property {HrefBuilder} [hrefBuilder]
 * @property {RootProps<Payload>} rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {ComponentType<BreakComponentProps<Payload>>} BreakComponent
 */

/**
 * @template Payload
 * @typedef {Object} StylingContainerProps
 * @property {RootProps<Payload>} $rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {Object} ContainerComponentProps
 * @property {RootProps<Payload>} rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {ComponentType<ContainerComponentProps<Payload>>} ContainerComponent
 */

/**
 * @template Payload
 * @typedef {Object} StylingPageLinkGroupComponentProps
 * @property {RootProps<Payload>} $rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {Object} PageLinkGroupProps
 * @property {RootProps<Payload>} rootProps
 * @property {ReactNode} [children]
 * @property {number} start
 * @property {number} end
 */

/**
 * @template Payload
 * @typedef {ComponentType<PageLinkGroupProps<Payload>>} PageLinkGroupComponent
 */

/**
 * @template Payload
 * @typedef {Object} StylingPagesComponentProps
 * @property {RootProps<Payload>} $rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {Object} PagesProps
 * @property {RootProps<Payload>} rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {ComponentType<PagesProps<Payload>>} PagesComponent
 */

/**
 * @template Payload
 * @typedef {Object} LinkComponentProps
 * @property {RootProps<Payload>} rootProps
 * @property {boolean} [disabled]
 * @property {string} [href]
 * @property {(event: SyntheticEvent) => void} [onClick]
 * @property {ReactNode} children
 * @property {string} [className]
 * @property {CSSProperties} [style]
 */

/**
 * @template Payload
 * @typedef {ComponentType<LinkComponentProps<Payload>>} LinkComponent
 */

/**
 * @template Payload
 * @typedef {Object} StylingNextLinkAdditionalProps
 * @property {boolean} [$isDisabled]
 * @property {RootProps<Payload>} $rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {LinkInnerProps & StylingNextLinkAdditionalProps<Payload>} StylingNextLinkComponentProps
 */

/**
 * @template Payload
 * @typedef {Object} NextLinkProps
 * @property {LinkComponent<Payload>} Link
 * @property {boolean} isDisabled
 * @property {LinkInnerProps} innerProps
 * @property {RootProps<Payload>} rootProps
 * @property {ReactNode} children
 */

/**
 * @template Payload
 * @typedef {ComponentType<NextLinkProps<Payload>>} NextLinkComponent
 */

/**
 * @template Payload
 * @typedef {Object} StylingPreviousLinkAdditionalProps
 * @property {boolean} [$isDisabled]
 * @property {RootProps<Payload>} $rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {LinkInnerProps & StylingPreviousLinkAdditionalProps<Payload>} StylingPreviousLinkComponentProps
 */

/**
 * @template Payload
 * @typedef {Object} PreviousLinkProps
 * @property {LinkComponent<Payload>} Link
 * @property {boolean} isDisabled
 * @property {LinkInnerProps} innerProps
 * @property {RootProps<Payload>} rootProps
 * @property {ReactNode} children
 */

/**
 * @template Payload
 * @typedef {ComponentType<PreviousLinkProps<Payload>>} PreviousLinkComponent
 */

/**
 * @template Payload
 * @typedef {Object} StylingPageLinkAdditionalProps
 * @property {boolean} [$isCurrent]
 * @property {RootProps<Payload>} $rootProps
 * @property {ReactNode} [children]
 */

/**
 * @template Payload
 * @typedef {LinkInnerProps & StylingPageLinkAdditionalProps<Payload>} StylingPageLinkComponentProps
 */

/**
 * @template Payload
 * @typedef {Object} PageLinkProps
 * @property {LinkComponent<Payload>} Link
 * @property {boolean} isCurrent
 * @property {LinkInnerProps} innerProps
 * @property {RootProps<Payload>} rootProps
 * @property {number} page
 * @property {ReactNode} children
 */

/**
 * @template Payload
 * @typedef {ComponentType<PageLinkProps<Payload>>} PageLinkComponent
 */

/**
 * @template Payload
 * @typedef {Object} Components
 * @property {BreakComponent<Payload>} Break
 * @property {ContainerComponent<Payload>} Container
 * @property {LinkComponent<Payload>} Link
 * @property {NextLinkComponent<Payload>} NextLink
 * @property {PageLinkComponent<Payload>} PageLink
 * @property {PageLinkGroupComponent<Payload>} PageLinkGroup
 * @property {PagesComponent<Payload>} Pages
 * @property {PreviousLinkComponent<Payload>} PreviousLink
 */

/**
 * @template ComponentProps
 * @typedef {(componentProps: ComponentProps) => CSSProperties} GetComponentStyle
 */

/**
 * @template Payload
 * @typedef {Object} StylesParams
 * @property {StylingBreakProps<Payload>} break
 * @property {StylingContainerProps<Payload>} container
 * @property {StylingNextLinkComponentProps<Payload>} nextLink
 * @property {StylingPageLinkComponentProps<Payload>} pageLink
 * @property {StylingPageLinkGroupComponentProps<Payload>} pageLinkGroup
 * @property {StylingPagesComponentProps<Payload>} pages
 * @property {StylingPreviousLinkComponentProps<Payload>} previousLink
 */

/**
 * @template Payload
 * @typedef {Partial<{
 *   [Key in keyof StylesParams<Payload>]: GetComponentStyle<StylesParams<Payload>[Key]>
 * }>} Styles
 */

/**
 * @typedef {Object} GetPagesParams
 * @property {number} pageCount
 * @property {number} pageRangeDisplayed
 * @property {number} marginPagesDisplayed
 * @property {number} page
 */

/**
 * @typedef {Object} LinksBlock
 * @property {typeof PAGES} type
 * @property {number} start
 * @property {number} end
 */

/**
 * @typedef {Object} BreakBlock
 * @property {typeof BREAK} type
 * @property {number} previous
 * @property {number} next
 */

/**
 * @typedef {LinksBlock | BreakBlock} PagesBlock
 */

/**
 * @template Payload
 * @typedef {Object} PaginatorProps
 * @property {number} pageCount
 * @property {number} [pageRangeDisplayed]
 * @property {number} [marginPagesDisplayed]
 * @property {ReactNode} [previousLabel]
 * @property {ReactNode} [nextLabel]
 * @property {ReactNode} [breakLabel]
 * @property {number} page
 * @property {OnPageChange} onPageChange
 * @property {HrefBuilder} [hrefBuilder]
 * @property {GetPages} [getPages]
 * @property {Partial<Components<Payload>>} [components]
 * @property {Styles<Payload>} [styles]
 * @property {Payload} [payload]
 */

/**
 * @template Payload
 * @typedef {Object} RootProps
 * @property {number} pageCount
 * @property {number} [pageRangeDisplayed]
 * @property {number} [marginPagesDisplayed]
 * @property {ReactNode} [previousLabel]
 * @property {ReactNode} [nextLabel]
 * @property {ReactNode} [breakLabel]
 * @property {number} page
 * @property {OnPageChange} onPageChange
 * @property {HrefBuilder} [hrefBuilder]
 * @property {GetPages} [getPages]
 * @property {Partial<Components<Payload>>} [components]
 * @property {Styles<Payload>} [styles]
 * @property {Payload} [payload]
 */
export {};
