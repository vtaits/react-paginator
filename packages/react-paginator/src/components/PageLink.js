import { jsx } from "react/jsx-runtime";
import { getStyle } from "./getStyle.js";

/**
 * @import { PageLinkProps } from "../types.js"
 */

/**
 * @template Payload
 * @param {PageLinkProps<Payload>} props
 */
export function PageLink({ Link, isCurrent, rootProps, innerProps, children }) {
	return jsx(Link, {
		...innerProps,
		className: `react-paginator__page-link ${isCurrent ? "react-paginator__page-link_current" : ""}`,
		style: getStyle(
			"pageLink",

			{
				$isCurrent: isCurrent,
				$rootProps: rootProps,
			},
		),
		children,
	});
}
