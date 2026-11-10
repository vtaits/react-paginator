import { jsx } from "react/jsx-runtime";
import { getStyle } from "./getStyle.js";

/**
 * @import { ContainerComponentProps } from "../types.js"
 */

/**
 * @template Payload
 * @param {ContainerComponentProps<Payload>} props
 */

export function Container({ rootProps, children }) {
	return jsx("div", {
		className: "react-paginator__container",
		style: getStyle(
			"container",

			{
				$rootProps: rootProps,
			},
		),
		children,
	});
}
