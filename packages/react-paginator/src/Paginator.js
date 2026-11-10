import { memo, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { components } from "./components/index.js";
import { BREAK, PAGES } from "./constants.js";
import { getPages as defaultGetPages } from "./getPages.js";
import { NextLinkWrapper } from "./NextLinkWrapper.js";
import { PageLinkGroupWrapper } from "./PageLinkGroupWrapper.js";
import { PreviousLinkWrapper } from "./PreviousLinkWrapper.js";

/**
 * @import { PaginatorProps, RootProps } from "./types.js"
 */

const emptyObj = {};

/**
 * @template Payload
 * @param {PaginatorProps<Payload>} props
 */
function PaginatorInner(props) {
	const {
		pageCount,
		pageRangeDisplayed = 5,
		marginPagesDisplayed = 2,
		previousLabel = "prev",
		nextLabel = "next",
		breakLabel = "...",
		page,
		onPageChange,
		hrefBuilder = undefined,
		getPages = defaultGetPages,
		components: componentsProp = undefined,
		styles = emptyObj,
		payload = undefined,
	} = props;

	const mergedProps = useMemo(
		() =>
			/** @type {RootProps<Payload>} */ ({
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
				styles,
				payload,
			}),
		[
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
			componentsProp,
			styles,
			payload,
		],
	);

	const mergedComponents = useMemo(() => {
		if (componentsProp) {
			return {
				...components,
				...componentsProp,
			};
		}

		return components;
	}, [componentsProp]);

	const pages = useMemo(
		() =>
			getPages({
				pageCount,
				pageRangeDisplayed,
				marginPagesDisplayed,
				page,
			}),
		[getPages, pageCount, pageRangeDisplayed, marginPagesDisplayed, page],
	);

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

	return jsxs(Container, {
		rootProps: mergedProps,
		children: [
			jsx(PreviousLinkWrapper, {
				Link,
				PreviousLink,
				onPageChange,
				hrefBuilder,
				previousLabel,
				page,
				rootProps: mergedProps,
			}),

			jsxs(Pages, {
				rootProps: mergedProps,
				children: pages.map((pagesItem, index) => {
					switch (pagesItem.type) {
						case BREAK:
							return jsx(
								Break,
								{
									Link,
									previous: pagesItem.previous,
									next: pagesItem.next,
									onPageChange,
									hrefBuilder,
									rootProps: mergedProps,
									children: breakLabel,
								},
								index,
							);

						case PAGES:
							return jsx(
								PageLinkGroupWrapper,
								{
									Link,
									PageLink,
									PageLinkGroup,
									start: pagesItem.start,
									end: pagesItem.end,
									onPageChange,
									hrefBuilder,
									page,
									rootProps: mergedProps,
								},
								index,
							);

						default:
							// @ts-expect-error
							throw new Error(`Unknown type "${pagesItem.type}"`);
					}
				}),
			}),

			jsx(NextLinkWrapper, {
				Link,
				NextLink,
				onPageChange,
				hrefBuilder,
				nextLabel,
				page,
				pageCount,
				rootProps: mergedProps,
			}),
		],
	});
}

export const Paginator = /** @type {typeof PaginatorInner} */ (
	memo(PaginatorInner)
);
