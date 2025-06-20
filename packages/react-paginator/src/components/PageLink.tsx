import type { ReactElement } from "react";

import styled from "styled-components";
import type { PageLinkProps, StylingPageLinkComponentProps } from "../types";
import { getStyle } from "./getStyle";

export const PageLinkComponent = styled.a<StylingPageLinkComponentProps<any>>(
	(props) => {
		const { $isCurrent } = props;

		return getStyle(
			"pageLink",

			{
				boxSizing: "border-box",
				borderWidth: "1px",
				borderStyle: "solid",
				fontFamily:
					"Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif",
				fontSize: "14px",
				fontWeight: $isCurrent ? 700 : 400,
				lineHeight: "18px",
				padding: "7px",
				textDecoration: "none",
				outline: "none",
				minWidth: "36px",
				textAlign: "center",
				cursor: $isCurrent ? "default" : "pointer",
				backgroundColor: $isCurrent ? "#7ab4ff" : "#fff",
				borderColor: $isCurrent ? "#7ab4ff" : "#ccc",
				color: $isCurrent ? "#fff" : "#333",
				marginLeft: "-1px",
				position: $isCurrent ? "relative" : "static",

				"&:first-child": {
					borderTopLeftRadius: "4px",
					borderBottomLeftRadius: "4px",
					marginLeft: 0,
				},

				"&:last-child": {
					borderTopRightRadius: "4px",
					borderBottomRightRadius: "4px",
				},
			},

			props,
		);
	},
);

export function PageLink<Payload>({
	Link,
	isCurrent,
	rootProps,
	innerProps,
	children,
}: PageLinkProps<Payload>): ReactElement {
	return (
		<PageLinkComponent
			as={Link}
			{...innerProps}
			$isCurrent={isCurrent}
			$rootProps={rootProps}
			rootProps={rootProps}
		>
			{children}
		</PageLinkComponent>
	);
}
