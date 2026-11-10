import { jsx } from "react/jsx-runtime";

/**
 * @import { LinkComponentProps } from "../types.js"
 */

/**
 * @template Payload
 * @param {LinkComponentProps<Payload>} props
 */
export function Link({
	children,
	className = undefined,
	disabled = false,
	href = undefined,
	onClick = undefined,
	style = undefined,
}) {
	if (disabled) {
		return jsx("button", {
			type: "button",
			className,
			style,
			disabled: true,
			children,
		});
	}

	if (!href) {
		return jsx("button", {
			type: "button",
			onClick,
			className,
			style,
			children,
		});
	}

	return jsx("a", {
		href,
		onClick,
		className,
		style,
		children,
	});
}
