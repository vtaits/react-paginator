import { jsx } from "react/jsx-runtime";
import { getStyle } from "./getStyle.js";

/**
 * @import { PageLinkGroupProps } from "../types.js"
 */

/**
 * @template Payload
 * @param {PageLinkGroupProps<Payload>} props
 */

export function PageLinkGroup({ rootProps, children }) {
	return jsx("div", {
		className: "react-paginator__page-link-group",
		style: getStyle(
			"pageLinkGroup",

			{
				$rootProps: rootProps,
			},
		),
		children,
	});
}
