import type { ReactElement } from "react";

import type { LinkComponentProps } from "../types";

export function Link<Payload>({
	children,
	className = undefined,
	disabled = false,
	href = undefined,
	onClick = undefined,
	style = undefined,
}: LinkComponentProps<Payload>): ReactElement {
	if (disabled) {
		return (
			<button type="button" className={className} style={style} disabled>
				{children}
			</button>
		);
	}

	if (!href) {
		return (
			<button
				type="button"
				onClick={onClick}
				className={className}
				style={style}
			>
				{children}
			</button>
		);
	}

	return (
		// biome-ignore lint/a11y/useValidAnchor: support open in new tab
		<a href={href} onClick={onClick} className={className} style={style}>
			{children}
		</a>
	);
}
