/**
 * @import { RootProps } from "../types.js"
 */

function Break() {
	return null;
}

function Container() {
	return null;
}

function Link() {
	return null;
}

function NextLink() {
	return null;
}

function PageLink() {
	return null;
}

function PageLinkGroup() {
	return null;
}

function Pages() {
	return null;
}

function PreviousLink() {
	return null;
}

/** @type {RootProps<any>} */
export const rootProps = {
	pageCount: 10,
	pageRangeDisplayed: 5,
	marginPagesDisplayed: 2,
	previousLabel: "previous",
	nextLabel: "next",
	breakLabel: "break",
	page: 3,
	onPageChange: () => undefined,
	hrefBuilder: undefined,

	components: {
		Break,
		Container,
		Link,
		NextLink,
		PageLink,
		PageLinkGroup,
		Pages,
		PreviousLink,
	},

	styles: {},
};
